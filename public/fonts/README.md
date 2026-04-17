# Fonts

This site uses **two fonts only**:

| Role   | Family         | Source                                   |
| ------ | -------------- | ---------------------------------------- |
| Titles | Merriweather   | `next/font/google` (loaded automatically) |
| Body   | Proxima Nova   | Commercial — self-hosted here            |

## Adding Proxima Nova

Proxima Nova is a commercial typeface by Mark Simonson (via Adobe Fonts /
MyFonts). It cannot be redistributed freely. Once you have obtained a
valid web-font license, drop the `.woff2` files into this folder with the
exact filenames below (matching the `@font-face` rules in
`app/globals.css`):

```
public/fonts/
  proxima-nova-light.woff2            (300)
  proxima-nova-regular.woff2          (400)
  proxima-nova-regular-italic.woff2   (400 italic)
  proxima-nova-medium.woff2           (500)
  proxima-nova-semibold.woff2         (600)
  proxima-nova-bold.woff2             (700)
  proxima-nova-extrabold.woff2        (800)
```

Files load automatically — no code change required. Until the files are
added, the browser falls back to the system sans-serif stack
(`-apple-system, BlinkMacSystemFont, "Segoe UI", "Helvetica Neue", Arial`),
which is visually close enough for development.

## Alternative: Adobe Fonts kit

If you prefer Adobe Fonts (Typekit) embed:

1. Create a Web Project containing *Proxima Nova* at
   <https://fonts.adobe.com/my_fonts>.
2. Copy the kit ID and add a `<link>` tag in `app/[locale]/layout.tsx`
   `<head>`:
   ```tsx
   <link rel="stylesheet" href="https://use.typekit.net/XXXXXXX.css" />
   ```
3. Remove the `@font-face` block for Proxima Nova from
   `app/globals.css` — Typekit will provide it.
