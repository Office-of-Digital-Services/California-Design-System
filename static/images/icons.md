# Dev notes for icons.svg

The `icons.svg` file is a collection of `<symbol>` elements that can be referenced like so.

```html
<svg>
	<use href="/images/icons.svg#hambearger"></use>
</svg>
```

Think of each `<symbol>` as its own self-contained SVG. 

Some important dev notes follow.

## currentColor

Make sure to apply `currentColor` to `fill` or `stroke` attributes in the `<symbol>`. This ensures we can change the color via CSS later.

## Browser cache

When using `<use>`, the browser cache can be very sticky. Hard reloads don't seem to work. When you're editing the `icons.svg` file and trying to preview changes, this can be very frustrating. I've found the best way to get around this is to open the page in a new tab.

## Viewbox

The `viewBox` on each `<symbol>` should start with `"0 0 ..."`. I've found `<use>` becomes flaky across browsers when the first two values of the `viewBox` are non-zero. 

This is especially relevant because our main source of icons, Material Icons, does not honor this need. The best workaround is to import into Figma, then export back out from Figma. Figma will "reset" the `viewBox` in your export into something we can use.