---
tags:
  - javascript
  - demo
  - interactive
---

# Interactive JavaScript test

This post tests whether a static MkDocs blog (served from GitHub Pages, no server)
can host interactive content that runs entirely in the reader's browser.

The widget below is rendered by `docs/javascripts/widget.js`, loaded globally via
`extra_javascript`. It activates wherever a marker `<div data-interactive="calc"></div>`
appears, so the same widget can be reused in any post without extra setup.

<style>
.calc-box {
  border: 1px solid var(--md-primary-fg-color, #eee);
  border-radius: 8px;
  padding: 1rem 1.25rem;
  margin: 1rem 0;
  background: var(--md-code-bg-color, #f6f8fa);
}
.calc-box h4 { margin: 0 0 .25rem; }
.calc-sub { margin: 0 0 .75rem; opacity: .8; font-size: .9rem; }
.calc-row { display: flex; gap: 1rem; flex-wrap: wrap; margin-bottom: .75rem; }
.calc-row label { display: flex; flex-direction: column; font-size: .85rem; }
.calc-row input { width: 6rem; padding: .25rem; }
.calc-out { font-family: var(--md-code-font, monospace); font-weight: 600; }
</style>

<div data-interactive="calc"></div>

Try changing the coefficients above — the roots update instantly, with no round-trip
to any server. This confirms that client-side JavaScript works fine on a static
GitHub Pages deployment.
