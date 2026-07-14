# Pickup atlas prompt

Generated with the built-in image-generation tool on 2026-07-13.

```text
Use case: stylized-concept
Asset type: production 2D game pickup sprite atlas for FQYY
Primary request: exact 4-column by 4-row atlas, sixteen isolated frames, with one original four-frame animation per row. Row 1: a small pale-cyan Qi Orb breathing-light hover loop, round luminous core with irregular blue-white ink corona. Row 2: a compact rose-and-ivory ceramic Healing Pill or tiny medicine vial hover loop, unmistakably a healing pickup. Row 3: a gold-edged pale-jade Spirit Treasure charm hover loop, readable diamond/pendant silhouette, neutral enough for runtime color tinting. Row 4: a shared collection breath burst, expanding from compact inward glow to a bright radial ink splash and then sparse fading motes.
Style/medium: polished hand-painted 2D game cutouts matching an original xiuxian ink-and-watercolor action roguelite, slightly oblique top-down camera, pressure-sensitive dark ink edges, crisp silhouettes, restrained watercolor fill, luminous ivory/cyan highlights.
Composition/framing: exact four equal columns and four equal rows; each subject centered consistently inside its cell; generous padding; stable scale and visual center within each row; no overlap between cells.
Scene/backdrop: perfectly flat solid #00ff00 chroma-key background for local removal.
Constraints: the background must be one uniform color with no shadows, gradients, texture, reflections, floor plane, lighting variation, labels, gutters, or dividers. Do not use #00ff00 anywhere in the subjects. No cast shadows, contact shadows, text, runes, characters, weapons, logos, watermark, UI, or borrowed designs. Every one of the 16 cells must contain exactly one complete non-cropped animation frame.
```

The generator returned a near-green flat key sampled as `#0bf30a`. Production processing used border sampling, a soft matte, despill, and one-pixel edge contraction, then resized the complete sheet to a padded 1024 × 1024 RGBA atlas with 256 × 256 cells.
