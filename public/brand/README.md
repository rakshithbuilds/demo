# Brand assets

Drop the supplied ARVA Studios logo files here:

| File | Contents |
|---|---|
| `arva-wordmark-light.svg` | White glyph, **transparent** background — used on dark sections (header, splash, footer) |
| `arva-wordmark-dark.svg` | Black glyph, **transparent** background — used on cream sections |

SVG is strongly preferred: it stays crisp at every size and costs almost
nothing against the Lighthouse budget in spec §31.

If only PNG is available, trim the surrounding padding and keep the background
transparent. A black-on-**white** PNG will show a white box when placed on the
cream sections — the background must be alpha, not white.

Once the files are here, replace the typeset stand-in inside
`src/components/brand/Logo.tsx`. Every usage in the app goes through that one
component, so nothing else needs to change.
