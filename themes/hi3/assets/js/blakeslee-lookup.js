(function () {
  const BLAKESLEE_BUILDINGS = [
    { building: 2, min: 1, max: 8, sections: { L: { front: [1, 2], rear: [7, 8] }, R: { front: [3, 4], rear: [5, 6] } } },
    { building: 3, min: 9, max: 24, sections: { L: { front: [21, 22], rear: [19, 20] }, CL: { front: [23, 24], rear: [17, 18] }, CR: { front: [9, 10], rear: [15, 16] }, R: { front: [11, 12], rear: [13, 14] } } },
    { building: 4, min: 25, max: 40, sections: { L: { front: [37, 38], rear: [35, 36] }, CL: { front: [39, 40], rear: [33, 34] }, CR: { front: [25, 26], rear: [31, 32] }, R: { front: [27, 28], rear: [29, 30] } } },
    { building: 5, min: 41, max: 56, sections: { L: { front: [53, 54], rear: [51, 52] }, CL: { front: [55, 56], rear: [49, 50] }, CR: { front: [41, 42], rear: [47, 48] }, R: { front: [43, 44], rear: [45, 46] } } },
    { building: 6, min: 57, max: 72, sections: { L: { front: [69, 70], rear: [67, 68] }, CL: { front: [71, 72], rear: [65, 66] }, CR: { front: [57, 58], rear: [63, 64] }, R: { front: [59, 60], rear: [61, 62] } } },
    { building: 8, min: 73, max: 88, sections: { L: { front: [85, 86], rear: [83, 84] }, CL: { front: [87, 88], rear: [81, 82] }, CR: { front: [73, 74], rear: [79, 80] }, R: { front: [75, 76], rear: [77, 78] } } },
    { building: 14, min: 89, max: 104, sections: { L: { front: [101, 102], rear: [99, 100] }, CL: { front: [103, 104], rear: [97, 98] }, CR: { front: [89, 90], rear: [95, 96] }, R: { front: [91, 92], rear: [93, 94] } } },
    { building: 13, min: 105, max: 120, sections: { L: { front: [117, 118], rear: [115, 116] }, CL: { front: [119, 120], rear: [113, 114] }, CR: { front: [105, 106], rear: [111, 112] }, R: { front: [107, 108], rear: [109, 110] } } },
    { building: 12, min: 121, max: 136, sections: { L: { front: [133, 134], rear: [131, 132] }, CL: { front: [135, 136], rear: [129, 130] }, CR: { front: [121, 122], rear: [127, 128] }, R: { front: [123, 124], rear: [125, 126] } } },
    { building: 7, min: 137, max: 152, sections: { L: { front: [149, 150], rear: [147, 148] }, CL: { front: [151, 152], rear: [145, 146] }, CR: { front: [137, 138], rear: [143, 144] }, R: { front: [139, 140], rear: [141, 142] } } },
    { building: 9, min: 153, max: 168, sections: { L: { front: [165, 166], rear: [163, 164] }, CL: { front: [167, 168], rear: [161, 162] }, CR: { front: [153, 154], rear: [159, 160] }, R: { front: [155, 156], rear: [157, 158] } } },
    { building: 10, min: 169, max: 192, sections: { L: { front: [189, 190], rear: [187, 188] }, LC: { front: [191, 192], rear: [185, 186] }, CL: { front: [169, 170], rear: [183, 184] }, CR: { front: [171, 172], rear: [181, 182] }, RC: { front: [173, 174], rear: [179, 180] }, R: { front: [175, 176], rear: [177, 178] } } },
    { building: 11, min: 193, max: 208, sections: { L: { front: [205, 206], rear: [203, 204] }, CL: { front: [207, 208], rear: [201, 202] }, CR: { front: [193, 194], rear: [199, 200] }, R: { front: [195, 196], rear: [197, 198] } } },
    { building: 18, min: 209, max: 224, sections: { L: { front: [221, 222], rear: [219, 220] }, CL: { front: [223, 224], rear: [217, 218] }, CR: { front: [209, 210], rear: [215, 216] }, R: { front: [211, 212], rear: [213, 214] } } },
    { building: 15, min: 225, max: 244, sections: { L: { front: [241, 242], rear: [239, 240] }, CL: { front: [243, 244], rear: [237, 238] }, C: { front: [225, 226], rear: [235, 236] }, CR: { front: [227, 228], rear: [233, 234] }, R: { front: [229, 230], rear: [231, 232] } } },
    { building: 16, min: 245, max: 260, sections: { L: { front: [257, 258], rear: [255, 256] }, CL: { front: [259, 260], rear: [253, 254] }, CR: { front: [245, 246], rear: [251, 252] }, R: { front: [247, 248], rear: [249, 250] } } },
    { building: 17, min: 261, max: 280, sections: { L: { front: [277, 278], rear: [275, 276] }, CL: { front: [279, 280], rear: [273, 274] }, C: { front: [261, 262], rear: [271, 272] }, CR: { front: [263, 264], rear: [269, 270] }, R: { front: [265, 266], rear: [267, 268] } } }
  ];

  const BLAKESLEE_BUILDING_MAP_LINKS = {
    1: { unitRange: "Leasing office", lat: 41.672619, lng: -72.928928, url: "https://www.google.com/maps?q=41.672619,-72.928928" },
    2: { unitRange: "1-8", lat: 41.673231, lng: -72.928677, url: "https://www.google.com/maps?q=41.673231,-72.928677" },
    3: { unitRange: "9-24", lat: 41.673056, lng: -72.929192, url: "https://www.google.com/maps?q=41.673056,-72.929192" },
    4: { unitRange: "25-40", lat: 41.672440, lng: -72.929640, url: "https://www.google.com/maps?q=41.672440,-72.929640" },
    5: { unitRange: "41-56", lat: 41.672353, lng: -72.930130, url: "https://www.google.com/maps?q=41.672353,-72.930130" },
    6: { unitRange: "57-72", lat: 41.672326, lng: -72.930751, url: "https://www.google.com/maps?q=41.672326,-72.930751" },
    7: { unitRange: "137-152", lat: 41.672774, lng: -72.930909, url: "https://www.google.com/maps?q=41.672774,-72.930909" },
    8: { unitRange: "73-88", lat: 41.672943, lng: -72.929991, url: "https://www.google.com/maps?q=41.672943,-72.929991" },
    9: { unitRange: "153-168", lat: 41.673177, lng: -72.930717, url: "https://www.google.com/maps?q=41.673177,-72.930717" },
    10: { unitRange: "169-192", lat: 41.673318, lng: -72.931639, url: "https://www.google.com/maps?q=41.673318,-72.931639" },
    11: { unitRange: "193-208", lat: 41.673139, lng: -72.932483, url: "https://www.google.com/maps?q=41.673139,-72.932483" },
    12: { unitRange: "121-136", lat: 41.672944, lng: -72.931523, url: "https://www.google.com/maps?q=41.672944,-72.931523" },
    13: { unitRange: "105-120", lat: 41.672564, lng: -72.931518, url: "https://www.google.com/maps?q=41.672564,-72.931518" },
    14: { unitRange: "89-104", lat: 41.672229, lng: -72.931283, url: "https://www.google.com/maps?q=41.672229,-72.931283" },
    15: { unitRange: "225-244", lat: 41.672323, lng: -72.932018, url: "https://www.google.com/maps?q=41.672323,-72.932018" },
    16: { unitRange: "245-260", lat: 41.672074, lng: -72.932567, url: "https://www.google.com/maps?q=41.672074,-72.932567" },
    17: { unitRange: "261-280", lat: 41.672140, lng: -72.933211, url: "https://www.google.com/maps?q=41.672140,-72.933211" },
    18: { unitRange: "209-224", lat: 41.672440, lng: -72.932699, url: "https://www.google.com/maps?q=41.672440,-72.932699" },
    locker: { unitRange: "1-280", lat: 41.672336, lng: -72.929246, url: "https://www.google.com/maps?q=41.672336,-72.929246" }
  };

  function findLookupResult(unit) {
    const buildingData = BLAKESLEE_BUILDINGS.find((item) => unit >= item.min && unit <= item.max);
    if (!buildingData) {
      return null;
    }

    const mapLink = BLAKESLEE_BUILDING_MAP_LINKS[buildingData.building];
    const mapUrl = mapLink ? mapLink.url : null;

    for (const [section, placement] of Object.entries(buildingData.sections)) {
      if (placement.front.includes(unit)) {
        return {
          apartment: unit,
          building: buildingData.building,
          buildingRange: `${buildingData.min}-${buildingData.max}`,
          availableSections: Object.keys(buildingData.sections),
          section,
          side: "Front",
          floor: unit % 2 === 0 ? "Upper" : "Lower",
          positionCode: unit % 2 === 0 ? "FU" : "FL",
          mapUrl
        };
      }

      if (placement.rear.includes(unit)) {
        return {
          apartment: unit,
          building: buildingData.building,
          buildingRange: `${buildingData.min}-${buildingData.max}`,
          availableSections: Object.keys(buildingData.sections),
          section,
          side: "Rear",
          floor: unit % 2 === 0 ? "Upper" : "Lower",
          positionCode: unit % 2 === 0 ? "RU" : "RL",
          mapUrl
        };
      }
    }

    return null;
  }

  function renderLookupRows(rowsElement, data) {
    const sectionLabels = {
      L: "Left",
      LC: "Left Center",
      CL: "Center Left",
      C: "Center",
      CR: "Center Right",
      RC: "Right Center",
      R: "Right"
    };

    const positionLabels = {
      FL: "Front Lower",
      FU: "Front Upper",
      RL: "Rear Lower",
      RU: "Rear Upper"
    };

    const sectionText = sectionLabels[data.section] || data.section;
    const positionText = positionLabels[data.positionCode] || data.positionCode;

    const rows = [
      ["Apartment", `${data.apartment}`],
      ["Building", `${data.building} (${data.buildingRange})`],
      ["Section", `${data.section} (${sectionText})`],
      ["Position", `${data.positionCode} (${positionText})`],
      ["Navigation", `Building ${data.building} -> ${sectionText} -> ${positionText}`]
    ];

    const mapButton = data.mapUrl
      ? `<div class="col-span-full mt-1"><a href="${data.mapUrl}" target="_blank" rel="noopener noreferrer" class="inline-flex items-center gap-1.5 rounded-lg border border-[rgba(42,161,152,0.58)] bg-[rgba(42,161,152,0.22)] px-3 py-1.5 text-[0.85rem] font-bold text-base3 transition hover:bg-[rgba(42,161,152,0.3)]">Open Building ${data.building} in Google Maps</a></div>`
      : "";

    rowsElement.innerHTML = rows.map(([label, value]) => (
      `<div><dt class="text-[0.78rem] font-bold uppercase tracking-[0.04em] text-cyan">${label}</dt><dd class="text-base2">${value}</dd></div>`
    )).join("") + mapButton;
  }

  function renderLookupVisual(visualElement, data) {
    const sectionLabels = {
      L: "Left",
      LC: "Left Center",
      CL: "Center Left",
      C: "Center",
      CR: "Center Right",
      RC: "Right Center",
      R: "Right"
    };

    const positionLabels = {
      FL: "Front Lower",
      FU: "Front Upper",
      RL: "Rear Lower",
      RU: "Rear Upper"
    };

    const sectionOrder = ["L", "LC", "CL", "C", "CR", "RC", "R"];
    const positionGrid = [["FU", "RU"], ["FL", "RL"]];

    const sectionChips = sectionOrder.map((code) => {
      const isActive = code === data.section;
      const isAvailable = data.availableSections.includes(code);

      const stateClasses = isActive
        ? "border-[rgba(42,161,152,0.85)] bg-[rgba(42,161,152,0.25)] text-base3"
        : isAvailable
          ? "border-[rgba(88,110,117,0.55)] bg-[rgba(0,22,28,0.58)] text-base2"
          : "border-[rgba(88,110,117,0.25)] bg-[rgba(7,54,66,0.28)] text-[rgba(131,148,150,0.7)]";

      return `<span class="inline-flex min-w-0 flex-1 items-center justify-center rounded-md border px-1.5 py-1 text-[0.68rem] font-bold tracking-[0.01em] sm:text-[0.72rem] ${stateClasses}" title="${sectionLabels[code] || code}">${code}</span>`;
    }).join("");

    const positionRows = positionGrid.map((row) => {
      const rowChips = row.map((code) => {
        const isActive = code === data.positionCode;
        const stateClasses = isActive
          ? "border-[rgba(38,139,210,0.9)] bg-[rgba(38,139,210,0.25)] text-base3"
          : "border-[rgba(88,110,117,0.55)] bg-[rgba(0,22,28,0.58)] text-base2";

        return `<span class="inline-flex w-full items-center justify-center rounded-md border px-2 py-1 text-center text-[0.76rem] font-bold tracking-[0.02em] ${stateClasses}" title="${positionLabels[code]}">${positionLabels[code]} (${code})</span>`;
      }).join("");

      return `<div class="grid grid-cols-2 gap-1.5">${rowChips}</div>`;
    }).join("");

    visualElement.innerHTML = `
      <p class="mb-2 text-[0.78rem] font-bold uppercase tracking-[0.05em] text-cyan">Visual Location</p>
      <div class="mb-2">
        <div class="flex flex-nowrap gap-1">${sectionChips}</div>
      </div>
      <div>
        <div class="grid gap-1.5">${positionRows}</div>
      </div>
    `;
    visualElement.classList.remove("hidden");
  }

  function initBlakesleeLookup() {
    const root = document.getElementById("blakeslee-lookup-root");
    if (!root) {
      return;
    }

    const form = document.getElementById("blakeslee-lookup-form");
    const input = document.getElementById("blakeslee-unit-input");
    const clearButton = document.getElementById("blakeslee-lookup-clear");
    const error = document.getElementById("blakeslee-lookup-error");
    const result = document.getElementById("blakeslee-lookup-result");
    const rows = document.getElementById("blakeslee-lookup-rows");
    const visual = document.getElementById("blakeslee-lookup-visual");
    const note = document.getElementById("blakeslee-lookup-note");

    if (!form || !input || !clearButton || !error || !result || !rows || !visual || !note) {
      return;
    }

    function showError(message) {
      rows.innerHTML = "";
      visual.innerHTML = "";
      visual.classList.add("hidden");
      result.classList.add("hidden");
      note.classList.add("hidden");
      note.textContent = "";
      error.textContent = message;
      error.classList.remove("hidden");
    }

    function clearState() {
      input.value = "";
      error.textContent = "";
      error.classList.add("hidden");
      rows.innerHTML = "";
      visual.innerHTML = "";
      visual.classList.add("hidden");
      result.classList.add("hidden");
      note.classList.add("hidden");
      note.textContent = "";
      input.focus();
    }

    form.addEventListener("submit", function (event) {
      event.preventDefault();
      const value = input.value.trim();

      if (!/^\d+$/.test(value)) {
        showError("Enter a whole apartment number from 1 to 280.");
        return;
      }

      const apartment = Number(value);
      if (!Number.isInteger(apartment) || apartment < 1 || apartment > 280) {
        showError("Apartment must be between 1 and 280.");
        return;
      }

      const lookup = findLookupResult(apartment);
      if (!lookup) {
        showError("No section mapping found for that apartment number.");
        return;
      }

      error.textContent = "";
      error.classList.add("hidden");
      renderLookupRows(rows, lookup);
      renderLookupVisual(visual, lookup);
      result.classList.remove("hidden");

      if (apartment === 1) {
        note.textContent = "Note: Building 1 is the leasing office reference. Apartment lookup for unit 1 maps to Building 2.";
        note.classList.remove("hidden");
      } else {
        note.textContent = "";
        note.classList.add("hidden");
      }
    });

    clearButton.addEventListener("click", clearState);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initBlakesleeLookup);
  } else {
    initBlakesleeLookup();
  }
})();