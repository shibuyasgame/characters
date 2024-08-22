import { read, utils } from "xlsx";

export async function processSpreadsheet(url) {
  return fetch(url)
    .then((resp) => {
      if (!resp.ok) throw new Error("Failed to load data.");
      return resp.arrayBuffer();
    })
    .then((buffer) => {
      const arrBuffer = new Uint8Array(buffer);
      return read(arrBuffer, { type: "array" }).Sheets;
    })
    .then((sheets) => {
      // Base data
      const sheetConfig = utils.sheet_to_json(sheets.Config);
      const Pins = keyData(sheets.Pins);
      const Threads = keyData(sheets.Threads);
      const Food = keyData(sheets.Foods);

      // Ignored sheet regex
      const partialMatch = sheetConfig[1].UNSEEN.split(",")
        .map((str) => str.trim())
        .join("|");
      const exactMatch = sheetConfig[0].UNSEEN.split(",")
        .map((str) => str.trim())
        .join("$|^");
      const ignoRe = new RegExp(`${partialMatch}|^${exactMatch}$`, "i");

      // Process the character sheets
      const cSheets = Object.keys(sheets)
        .filter((key) => !ignoRe.test(key))
        .map((key) =>
          processCharacterData(sheets[key], sheetConfig, {
            Pins,
            Threads,
            Food,
          })
        );
      return {
        Pins,
        Threads,
        Food,
        sheets: cSheets,
        mirror: !!sheetConfig[0].MIRROR,
      };
    });
}

function keyData(rawSheet) {
  let data = {};
  utils
    .sheet_to_json(rawSheet)
    .filter((row) => row["Name"])
    .forEach((row) => (data[row["Name"]] = row));
  return data;
}

function processCharacterData(sheet, config, lookup) {
  let data = { Noise: {} };
  // Initial field assignments
  config.forEach((field) => {
    const fieldData = processField(sheet, field, lookup);

    if (field.NAME.startsWith("Noise")) {
      data.Noise[field.NAME.substring(6)] = fieldData;
    } else {
      data[field.NAME] = fieldData;
    }

    if (field.CAP && !isNaN(field.CAP)) {
      data[field.NAME].cap = field.CAP;
    }
  });
  // Group items by equipped
  data.Pins = groupEquip(data.Pins);
  data.Threads = groupEquip(data.Threads);
  data.Food = data.Food.filter((datum) => datum.n > 0);

  // Calculate stat totals
  let eStats = equippedStats(data.Threads.equipped, data.Pronouns);
  ["HP", "ATK", "DEF"].forEach((stat) => {
    data[stat].threads = eStats[stat];
    data[stat].total = data[stat].raw + data[stat].misc + data[stat].threads;
    data.Noise[stat].total =
      data.Noise[stat].raw + data.Noise[stat].misc + data.Noise[stat].trained;

    // Insert overrides for the CP if applicable
    data[stat].name = window?.overrides?.[stat]?.name || stat;
  });

  // Additional color parsing
  let hex = data.Color;
  data.Color = {};
  if (hex) {
    hex = hex.match(/([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/);
    if (hex) {
      data.Color = { color: "#" + hex[0] };
    }
  }

  // Copy/paste
  let cp = `**${data.Name} | ${data.HP.current}/${data.HP.total} ` +
    `${data.HP.name} | ${data.ATK.total} ${data.ATK.name}`;
  if (data.DEF.total) {
    cp += ` | ${data.DEF.total > data.DEF.cap ? data.DEF.cap : data.DEF.total} ${data.DEF.name}`;
  }
  if (data.Role === "Player") {
    cp += ` | ${data.SYNC}% ${window?.overrides?.SYNC?.name ?? "SYNC"}`;
  }
  data.CP =
    cp +
    "**\n" +
    data.Pins.equipped
      .map((pin) => formatPinData(pin, data.ATK.total))
      .join(" | \n");

  return data;
}

function formatPinData(pin, atk) {
  let s = `${pin.ID} ${pin.Name}`;
  let cdATK = pin.d ? 10 : 0;
  if (pin.ATK) {
    let subtotal = pin.ATK + atk;
    if (pin.r) { subtotal += Math.ceil(subtotal / 2.0); }

    s += ` ${pin.ATK} (${subtotal + cdATK})`;
  }
  if (pin.Extras) {
    s += ` - *${pin.Extras.trim()}*`;
  }
  return s;
}

function equippedStats(equipment, pronouns) {
  return equipment.reduce(
    (total, thread) => {
      ["HP", "ATK", "DEF"].forEach((stat, index) => {
        let c =
          pronouns === "He/Him" ? "M" : pronouns === "She/Her" ? "F" : "N";
        let suffix = index ? `_${index}` : "";
        total[stat] += (thread[stat] || 0) + (thread[c + suffix] || 0);
      });
      return total;
    },
    { HP: 0, ATK: 0, DEF: 0 }
  );
}

function groupEquip(items) {
  let resonances =
    items.filter(item => item.n && (item.Name === item.Brand)).map(item => item.Name);
  return items.reduce(
    (acc, curr) => {
      if (curr.n) {
        acc["equipped"].push(curr);
        if (resonances.includes(curr.Brand)) { curr.r = true; }
      } else {
        acc["unequipped"].push(curr);
      }
      return acc;
    },
    { equipped: [], unequipped: [] }
  );
}

const coordRegex = new RegExp(/[a-z]+|\d+/gi);
function offsetCoord(coord, rowOffset, colOffset) {
  let [col, row] = coord.match(coordRegex);
  // WARNING: doesn't handle Z -> AA transition
  if (colOffset) {
    col = String.fromCharCode(col.charCodeAt(0) + colOffset);
  }
  if (rowOffset) {
    row = Number(row) + rowOffset;
  }
  return col + row;
}

function processField(sheet, field, lookup) {
  if (!field.LEN) {
    // standard processing
    return sheet[field.COORD] ? sheet[field.COORD].w : "";
  }
  // special processing
  let data;
  const num = Number(field.LEN);
  const coord = field.COORD;

  if (num) {
    // numeric LEN, so this is inventory
    const nOffset = Number(field.N);
    const dOffset = Number(field.D);
    data = [];
    for (let i = 0; i < num; i++) {
      const name = sheet[offsetCoord(coord, i, 0)];
      if (name) {
        let datum = { name: name.w };
        if (lookup[field.NAME]) {
          datum = { ...lookup[field.NAME][name.w] };
          if (!datum) {
            continue;
          }
        }
        if (nOffset) {
          const n = sheet[offsetCoord(coord, i, nOffset)];
          if (n) {
            datum.n = n.v;
          }
        }
        if (dOffset) {
          const d = sheet[offsetCoord(coord, i, dOffset)];
          if (d) {
            datum.d = d.v;
          }
        }
        data.push(datum);
      }
    }
  } else {
    // non-numeric LEN, so these are stats
    data = {
      raw: sheet[coord].v,
      misc: sheet[offsetCoord(coord, Number(field.N), 0)].v,
      trained: sheet[offsetCoord(coord, Number(field.D), 0)].v,
    };
    if (field.NAME === "HP") {
      data.current = data.trained;
    }
  }
  return data;
}
