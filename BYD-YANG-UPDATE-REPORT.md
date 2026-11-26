# BYD Custom Price Estimator — Yang feedback implementation report

Date: 2026-11-26
Base: uploaded byd-customprice-estimator--main.zip
Scope: source ZIP only; no GitHub push and no live deployment.

1. bymos.dev: no matching URL/reference found in the supplied source. Removing or shutting down an external hosted site is outside this source-only change.
2. Rectangular MDF/Solid Wood: length max 260cm; MDF Standard Edge added using supplied standard-edge.webp, edge cards reduced in height. Existing Waterfall options preserved.
3. Above 180cm: Pro hidden; Custom Frame $649 selected automatically; Lite card remains visible but disabled beyond its existing 160cm limit. Custom Frame does not show the free Lite/Pro cup-and-headphone-holder notice; size note updated.
4. Selected option borders updated to #C8551F for active calculator choices, swatches, pills, grommets and add-ons.
5. Rectangular desk Circle and Rectangular grommets can both be selected with separate quantity, available size, position, colour, and optional cap quantity. Circle diameter stays fixed at the existing 6cm. Existing cap prices retained. L-shape grommet behavior preserved.
6. Rectangular material tabs: inactive MDF / Solid Wood has a white background.
7. Rectangular estimate and print SpecSheet list custom frame and both grommet types/quantities/prices; PDF table-top unit rate now uses the selected material rate.
8. Compact header; rectangular/L-shape desk names split into 2 lines, subtitles updated.

QA: TypeScript parser completed with no JSX syntax errors across src. Node smoke check for exported price constants and grommet price functions passed. Full npm install/build/Vitest/browser and printed PDF visual QA could not run because required npm dependencies were not available in this runtime. Before deployment: install dependencies, run npm run build and npm run test:run, preview mobile/desktop and print PDF, then publish only after approval.
