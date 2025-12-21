(function () {
  function init() {
    const deltaVInput = document.getElementById("deltaV");
    const efficiencyInput = document.getElementById("efficiency");
    const accessibleInput = document.getElementById("accessible");

    const deltaVValue = document.getElementById("deltaVValue");
    const efficiencyValue = document.getElementById("efficiencyValue");
    const accessibleValue = document.getElementById("accessibleValue");

    if (!deltaVInput || !efficiencyInput || !accessibleInput) {
      setTimeout(init, 50);
      return;
    }

    const asteroidMassKg = 5e8;
    const usefulMaterialFraction = 0.3;
    const baseMissionCostUSD = 5_000_000_000;
    const deltaVCostFactor = 0.12;

    // Create floating sidebar
    let output = document.getElementById("cost-output-floating");
    if (!output) {
      output = document.createElement("div");
      output.id = "cost-output-floating";
      document.body.appendChild(output);
    }

    // Sidebar styling
    Object.assign(output.style, {
      position: "fixed",
      top: "100px",
      left: "20px",
      width: "280px",
      padding: "1em 1.2em",
      backgroundColor: "#ffffff",
      borderRadius: "12px",
      border: "1px solid #e0e0e0",
      boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
      fontFamily: "Inter, sans-serif",
      fontSize: "0.95em",
      lineHeight: "1.4em",
      color: "#111827",
      zIndex: "1000"
    });

    // Compute cost function
    function computeCost(deltaV, efficiency, accessibleFraction) {
      const grossExtractableMass =
        asteroidMassKg * accessibleFraction * usefulMaterialFraction;
      const deliveredMassKg = grossExtractableMass * efficiency;
      const adjustedMissionCostUSD =
        baseMissionCostUSD * Math.exp(deltaVCostFactor * deltaV);
      return { deliveredMassKg, costPerKgUSD: adjustedMissionCostUSD / deliveredMassKg };
    }

    // Render horizontal bar
    function renderBar(label, value, max, color) {
      const width = Math.min((value / max) * 100, 100);
      return `
        <div style="margin:0.3em 0;">
          <div style="display:flex; justify-content:space-between; font-weight:600; font-size:0.85em;">${label}<span>${value.toLocaleString()}</span></div>
          <div style="height:8px; background:#e5e7eb; border-radius:4px; margin-top:0.15em;">
            <div style="width:${width}%; height:100%; background:${color}; border-radius:4px;"></div>
          </div>
        </div>
      `;
    }

    function update() {
      const deltaV = parseFloat(deltaVInput.value);
      const efficiency = parseFloat(efficiencyInput.value);
      const accessible = parseFloat(accessibleInput.value);

      deltaVValue.textContent = deltaV.toFixed(1);
      efficiencyValue.textContent = efficiency.toFixed(2);
      accessibleValue.textContent = accessible.toFixed(2);

      const result = computeCost(deltaV, efficiency, accessible);
      const deliveredMass = result.deliveredMassKg;
      const costPerKg = result.costPerKgUSD;

      output.innerHTML = `
        <h3 style="margin-top:0; margin-bottom:0.5em; font-size:1.1em; border-bottom:1px solid #d1d5db; padding-bottom:0.3em;">Asteroid Mining</h3>

        ${renderBar("Delta-v (km/s)", deltaV, 9, "#3b82f6")}
        ${renderBar("Efficiency", efficiency, 1, "#10b981")}
        ${renderBar("Accessible fraction", accessible, 0.5, "#f59e0b")}

        <hr style="margin:0.5em 0; border-color:#d1d5db;">

        <div style="font-weight:600; margin-bottom:0.3em;">Delivered Mass</div>
        <div style="margin-bottom:0.5em;">${deliveredMass.toLocaleString()} kg</div>

        <div style="font-weight:600; margin-bottom:0.3em;">Cost per kg</div>
        <div>$${costPerKg.toLocaleString(undefined, { maximumFractionDigits: 0 })}</div>
      `;
    }

    // Wire events
    deltaVInput.addEventListener("input", update);
    efficiencyInput.addEventListener("input", update);
    accessibleInput.addEventListener("input", update);

    // Initial render
    update();
  }

  init();
})();
