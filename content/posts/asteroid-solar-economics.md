---
title: "Asteroid Mining Economics: A Minimal Model"
date: 2025-01-01
math: true
---

## Purpose

This page is a minimal working demonstration of a browser-based
economic model for asteroid mining as an input to space-based
solar panel production.

At this stage, the model is intentionally simple.

---

## Layer One: Asteroid Resource Model

This layer estimates the cost per kilogram of usable material delivered
to cislunar space from a single asteroid mining mission.

### Key Assumptions

- Asteroid mass: 500,000 metric tons
- Accessible fraction: 20%
- Useful material fraction: 30%
- Extraction efficiency: 70%
- Baseline mission cost: $5 billion
- Delta-v (round trip): 6 km/s

These values are deliberately conservative and intended
to establish order-of-magnitude feasibility.

## Interactive Parameters

<div class="astro-dashboard">

  <div class="astro-slider">
    <label for="deltaV">Delta-v (km/s): <span id="deltaVValue">6</span></label>
    <input id="deltaV" type="range" min="3" max="9" step="0.5" value="6">
  </div>

  <div class="astro-slider">
    <label for="efficiency">Extraction efficiency: <span id="efficiencyValue">0.70</span></label>
    <input id="efficiency" type="range" min="0.3" max="0.9" step="0.05" value="0.7">
  </div>

  <div class="astro-slider">
    <label for="accessible">Accessible fraction: <span id="accessibleValue">0.20</span></label>
    <input id="accessible" type="range" min="0.05" max="0.5" step="0.05" value="0.2">
  </div>

</div>

<script src="/js/asteroid-demo.js"></script>
