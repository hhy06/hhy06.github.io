document.addEventListener("DOMContentLoaded", function () {
  function buildCalc(host) {
    host.classList.add("interactive-calc");
    host.innerHTML = `
      <div class="calc-box">
        <h4>Interactive quadratic solver</h4>
        <p class="calc-sub">Solve <code>ax² + bx + c = 0</code> live in your browser.</p>
        <div class="calc-row">
          <label>a <input type="number" step="any" value="1" data-coef="a"></label>
          <label>b <input type="number" step="any" value="-3" data-coef="b"></label>
          <label>c <input type="number" step="any" value="2" data-coef="c"></label>
        </div>
        <div class="calc-out" data-out></div>
      </div>`;

    var inputs = host.querySelectorAll("input[data-coef]");
    var out = host.querySelector("[data-out]");

    function update() {
      var a = parseFloat(host.querySelector('[data-coef="a"]').value);
      var b = parseFloat(host.querySelector('[data-coef="b"]').value);
      var c = parseFloat(host.querySelector('[data-coef="c"]').value);

      if ([a, b, c].some(function (v) { return isNaN(v); })) {
        out.textContent = "Please enter numeric coefficients.";
        return;
      }
      if (a === 0) {
        if (b === 0) {
          out.textContent = (c === 0) ? "Infinite solutions." : "No solution.";
        } else {
          out.textContent = "Linear: x = " + (-c / b).toFixed(4);
        }
        return;
      }

      var d = b * b - 4 * a * c;
      if (d > 0) {
        var r1 = (-b + Math.sqrt(d)) / (2 * a);
        var r2 = (-b - Math.sqrt(d)) / (2 * a);
        out.textContent = "Δ = " + d.toFixed(4) + "  →  x₁ = " + r1.toFixed(4) + ",  x₂ = " + r2.toFixed(4);
      } else if (d === 0) {
        var r = -b / (2 * a);
        out.textContent = "Δ = 0  →  x = " + r.toFixed(4);
      } else {
        var re = (-b / (2 * a)).toFixed(4);
        var im = (Math.sqrt(-d) / (2 * a)).toFixed(4);
        out.textContent = "Δ = " + d.toFixed(4) + "  →  x = " + re + " ± " + im + " i";
      }
    }

    inputs.forEach(function (el) {
      el.addEventListener("input", update);
    });
    update();
  }

  document.querySelectorAll('[data-interactive="calc"]').forEach(buildCalc);
});
