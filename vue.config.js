module.exports = {
  publicPath: process.env.NODE_ENV === "production" ? "/characters/" : "/",
  pages: {
    index: {
      entry: "src/index.js",
      title: "The Reaper's Game Character Sheets",
      weeks: { // [path]: [display name]
        W17: "Week 17",
        haunted: "Haunted Weekend",
        seoul: "Seoul Weekend (1)",
        W18: "Week 18",
        lyoko: "Code Lyoko Weekend",
        seoul2: "Seoul Weekend (2)",
        W19: "Week 19",
        midtown: "Midtown, Manhattan",
        W20: "Week 20",
        teyvat: "Teyvat/Genshin Weekend",
        seoul3: "Seoul Weekend (3)"
      }
    },
    "Test Page": {
      entry: "src/main.js",
      title: "Test Page",
      filename: "test/index.html",
      sheetKeys: [
        "2PACX-1vSWTyHAq5Ek0l3DIxWx8my7nBq4QPEBYeJ59NqZPYKUfuBBDY3JCabXwCZo4Sf7B0fxVmvLzd5VT_CQ"
      ]
    },
    "W17 Characters": {
      entry: "src/main.js",
      title: "W17 Characters",
      filename: "W17/index.html",
      sheetKeys: [
        "2PACX-1vQ9mahGpwePTKAx8tV8qAM43iY-2VgxPFSG_gL-seTTifV-HNxcOrHm8FYvm8a4gU02HLULbnCwvzhp",
        "2PACX-1vQykYWNZ5q269yQrpIj3Ai6wJ2HM2qvu_1CC53LDl-gJOfki72Vq28DYP-mcz-6RXbKBnNrSlflcugI",
      ],
      legacyItemImages: true
    },
    "Haunted Weekend": {
      entry: "src/main.js",
      title: "Haunted Weekend Characters",
      filename: "haunted/index.html",
      sheetKeys: [
        "2PACX-1vS3o5WiIoMItBrst1IIqHae4PWiqo4OZmL7TcnjmO0oeFhweV0X5N6gyGw9frt1exL7YQYwYjh5i0Wh"
      ],
      legacyItemImages: true
    },
    "Seoul Weekend": {
      entry: "src/main.js",
      title: "Seoul Characters",
      filename: "seoul/index.html",
      sheetKeys: [
        "2PACX-1vTQLr_2U1IFu0fN-JVBNLcBJt9Aja_2jMHk7k6qiqaWRNqGOsalTe-F-Bq8_ttbZyvXdmcsIE-ci7Ey"
      ],
      overrides: {
        Yen: { name: "₩" }
      },
      legacyItemImages: true
    },
    "Week 18": {
      entry: "src/main.js",
      title: "Week 18 (Chicago) Characters",
      filename: "W18/index.html",
      sheetKeys: [
        "2PACX-1vTDCzoqPnaSogrZxgnSUxRAgFzNMRbog9w9UArI132tBXYAR0PwTNII0ge4NTpiAWxyvfvavZDcDzlA"
      ],
      overrides: {
        Yen: { name: "$" }
      },
      legacyItemImages: true
    },
    "Code Lyoko": {
      entry: "src/main.js",
      title: "Code Lyoko Characters",
      filename: "lyoko/index.html",
      sheetKeys: [
        "2PACX-1vR1jiRpXTIuuNHmV4GwcAQA7UcgUN-sW-jm5Lc3jResxRRQKc8Diop4f2ivJ0CQAigUYtjym4MKUAbT"
      ],
      overrides: {
        SYNC: { name: "SPD" },
        Yen: { name: "$" },
        PP: { name: "EXP" },
        hidePlayerBlock: true,
        enableNoiseBlockForPlayers: true
      }
    },
    "Seoul Weekend 2": {
      entry: "src/main.js",
      title: "Seoul Characters (2)",
      filename: "seoul2/index.html",
      sheetKeys: [
        "2PACX-1vQtgjd9RGFEd2p9wYQd7kFpVW2DYpAzPGL5b5xtzybeO0m7pSonBJSKcWt3-IBI-4HDqmO0F9kzPkJ2"
      ],
      overrides: {
        Yen: { name: "₩" }
      }
    },
    "Week 19": {
      entry: "src/main.js",
      title: "Week 19 Characters",
      filename: "W19/index.html",
      sheetKeys: [
        "2PACX-1vQ-xmqo11pUYYzajjyjmOZoTKuVPRDlDWjXX4pfBcnbYkGslslONfXCC9DrztCIUhCGsa1Sz6Rgbr5Y"
      ],
      additionalLinks: {
        "Data": "https://docs.google.com/spreadsheets/d/1Ot8C6djwjiUK204VCdaUrSa1IoiTvQneqmiEylq134g",
        "Rank-up Objectives": "https://soseido.carrd.co",
        "White Weaver Shop": "https://whiteweaver.carrd.co",
        "Cotton Candy Ca-fey Shop": "https://cottoncandycafey.carrd.co/",
        "Kinzoku Torii Gacha": "https://docs.google.com/document/d/1M2BVlMDzMrwE8NkXEgvr6YMxZ6XVXdxG4mRaVqnSnsk/",
        "The Pigpen Shop": "https://docs.google.com/document/d/1xEfdqemHpvjU4m4oXCcT_sk52Lxp5cbtcl9_uBgffQM/",
      }
    },
    "Midtown": {
      entry: "src/main.js",
      title: "Midtown Manhattan Characters",
      filename: "midtown/index.html",
      sheetKeys: [
        "2PACX-1vTe0SwrQWArGFTzDrkTjd1dsDtZfWDowbgaZ_UwT90lSW6GKuUljUxhinSNspD1WGL379XK7HklmMhE"
      ],
      additionalLinks: {
        "Data": "https://docs.google.com/spreadsheets/d/1rDWhguSzJt8orQcreStkadsWmYcAgeZ2gziQGumofbs/"
      },
      overrides: {
        Yen: { name: "$"}
      }
    },
    "Week 20": {
      entry: "src/main.js",
      title: "Week 20 Characters",
      filename: "W20/index.html",
      sheetKeys: [
        "2PACX-1vTkIQFyu_wFzSQ1MmDlrOso85KGBz7lTDT818jtpeQEpRTk77uoMqRkW7UG3Ajjvad3nNcXEQ3H76ac"
      ],
      additionalLinks: {
        "Data": "https://docs.google.com/spreadsheets/d/1R2qeDpJh7Xnoi8bpPlTpLYbgbgBo0ogF-zMBpAjnGKE/",
        "Story Log": "https://docs.google.com/document/d/1iBO3ntEkd54DIxWrVxaqKlApbrLy0pd2UYppg6HSi88/edit?usp=sharing"
      }
    },
    "Teyvat": {
      entry: "src/main.js",
      title: "Teyvat Characters",
      filename: "teyvat/index.html",
      sheetKeys: [
        "2PACX-1vSHMZ6y4aOyruqLy3LrUKu3umHOYiehrmVvV5hIvB8qSLVHYp-JVt9riyAI6yfYg9rj2pHrtZMitrDV",
      ],
      overrides: {
        SYNC: { name: "CDMG" },
        Yen: { name: "MORA" },
        PP: { name: "AP" },
      },
      additionalLinks: {
        Data: "https://docs.google.com/spreadsheets/d/1WQhPYz4bQEvuQbmg41DwIUVanwX56wDzQV2Q5N0YDgI/",
        "Teyvat Info": "https://docs.google.com/document/d/1hhYn85pWp3rHYVaVOePE88e9wOSiz1K7j6x796uXICE/edit",
      }
     },
     "Seoul Weekend 3": {
      entry: "src/main.js",
      title: "Seoul Weekend (3) Characters",
      filename: "seoul3/index.html",
      sheetKeys: [
        "2PACX-1vSUdj3RuBLCoB0uYek-GOehP3I8zeRWxys8UhOxDAxI8Bif0WPNuuvboCgm4jKx9BlXPmChLPv2yQFK"
      ],       
      overrides: {
        Yen: { name: "₩" }
      },
      additionalLinks: {
        "Data": "https://docs.google.com/spreadsheets/d/1Bjep6T34qtzCdr3jrBrZIHHm-mYJek3YrL0GTR3zXwY/edit?usp=sharing"
        "Seoul Survival Guide": "https://docs.google.com/document/d/1olbrE6_biujp3K7OU5-vGdLbtYVQR9rodqdXgj_5N3Q/edit?usp=sharing"
      },
    },
  },
};
