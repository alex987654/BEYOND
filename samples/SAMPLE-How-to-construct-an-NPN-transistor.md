---
schema: beyond-cnl-v0.4
purpose: Describe `NPN-DEVICE` construction by `ALLOY-JUNCTION-METHOD`.
phase: Validation
conditions:
  - id: COND-BASE-THIN
    statement: "`P-BASE` width remains within 5 to 25 micro meter after alloy."
  - id: COND-FRONT-SEPARATION
    statement: "`EMITTER-FRONT` and `COLLECTOR-FRONT` remain separated after heat."
  - id: COND-SEAL
    statement: Opaque enclosure prevents light and water access.
  - id: COND-SINGLE-CRYSTAL
    statement: Single crystal structure remains across `GERMANIUM` material.
  - id: COND-OHMIC-BASE
    statement: "`BASE-CONTACT` passes current in both polarities."
technical_names:
  - term: NPN-DEVICE
    pos: noun
    definition: device with `N-EMITTER`, thin `P-BASE`, and `N-COLLECTOR` in series
  - term: ALLOY-JUNCTION-METHOD
    pos: noun
    definition: method that forms `P-N-JUNCTION` surfaces by molten metal alloy on `GERMANIUM`
  - term: GROWN-JUNCTION-METHOD
    pos: noun
    definition: method that forms `P-BASE` during crystal pull from `MELT`
  - term: SILICON-DIFFUSION-METHOD
    pos: noun
    definition: method that forms junctions in silicon by gas phase dopant diffusion
  - term: GERMANIUM
    pos: noun
    definition: semiconductor material for first device trials
  - term: HIGH-PURITY-GERMANIUM
    pos: noun
    definition: "`GERMANIUM` with impurity concentration below one part in 100 million"
  - term: P-TYPE-GERMANIUM
    pos: noun
    definition: "`GERMANIUM` with `ACCEPTOR` excess"
  - term: P-TYPE
    pos: noun
    definition: semiconductor region with electron deficit from `ACCEPTOR` concentration
  - term: N-TYPE
    pos: noun
    definition: semiconductor region with electron excess from `DONOR` concentration
  - term: DONOR
    pos: noun
    definition: material that supplies electron excess
  - term: ACCEPTOR
    pos: noun
    definition: material that supplies electron deficit
  - term: ANTIMONY
    pos: noun
    definition: "`DONOR` material for first trials"
  - term: ARSENIC
    pos: noun
    definition: "`DONOR` material"
  - term: PHOSPHORUS
    pos: noun
    definition: "`DONOR` material"
  - term: INDIUM
    pos: noun
    definition: "`ACCEPTOR` material"
  - term: GALLIUM
    pos: noun
    definition: "`ACCEPTOR` material"
  - term: BORON
    pos: noun
    definition: "`ACCEPTOR` material"
  - term: P-WAFER
    pos: noun
    definition: thin slice cut from `P-TYPE-GERMANIUM`
  - term: N-EMITTER
    pos: noun
    definition: "`N-TYPE` layer with high `DONOR` concentration and small contact area"
  - term: N-COLLECTOR
    pos: noun
    definition: "`N-TYPE` layer with lower `DONOR` concentration and larger contact area"
  - term: P-BASE
    pos: noun
    definition: thin `P-TYPE` layer between `N-EMITTER` and `N-COLLECTOR`
  - term: PELLET
    pos: noun
    definition: small metal body that carries `DONOR` concentration for alloy
  - term: EMITTER-PELLET
    pos: noun
    definition: small `PELLET` for `N-EMITTER` formation
  - term: COLLECTOR-PELLET
    pos: noun
    definition: large `PELLET` for `N-COLLECTOR` formation
  - term: PELLET-CENTER
    pos: noun
    definition: center point of a `PELLET` contact face
  - term: MELT
    pos: noun
    definition: molten `GERMANIUM` pool
  - term: DIODE
    pos: noun
    definition: device with one `P-N-JUNCTION`
  - term: P-N-JUNCTION
    pos: noun
    definition: surface between `P-TYPE` region and `N-TYPE` region
  - term: EMITTER-BASE-JUNCTION
    pos: noun
    definition: "`P-N-JUNCTION` between `N-EMITTER` and `P-BASE`"
  - term: COLLECTOR-BASE-JUNCTION
    pos: noun
    definition: "`P-N-JUNCTION` between `N-COLLECTOR` and `P-BASE`"
  - term: EMITTER-FRONT
    pos: noun
    definition: alloy boundary that advances inward from `EMITTER-PELLET`
  - term: COLLECTOR-FRONT
    pos: noun
    definition: alloy boundary that advances inward from `COLLECTOR-PELLET`
  - term: EMITTER-COLLECTOR-PATH
    pos: noun
    definition: current path from `N-EMITTER` to `N-COLLECTOR`
  - term: CHARGE-CARRIER-PATH
    pos: noun
    definition: average distance an electron travels before `RECOMBINATION` in `P-BASE` material
  - term: RECOMBINATION
    pos: noun
    definition: loss of an electron and a hole as a pair in `P-BASE` material
  - term: BASE-CONTACT
    pos: noun
    definition: ohmic contact to the `P-WAFER` edge
  - term: BASE-CURRENT
    pos: noun
    definition: current into `BASE-CONTACT`
  - term: COLLECTOR-CURRENT
    pos: noun
    definition: current into `N-COLLECTOR`
  - term: LEAKAGE-CURRENT
    pos: noun
    definition: current across a junction under `REVERSE-BIAS`
  - term: CURRENT-GAIN
    pos: noun
    definition: ratio of `COLLECTOR-CURRENT` to `BASE-CURRENT`
  - term: FORWARD-BIAS
    pos: noun
    definition: voltage polarity that lowers a junction barrier and passes current
  - term: REVERSE-BIAS
    pos: noun
    definition: voltage polarity that raises a junction barrier and blocks current
  - term: EMITTER-RESISTOR
    pos: noun
    definition: resistor in series with the `E` terminal supply
  - term: BASE-RESISTOR
    pos: noun
    definition: resistor in series with the `B` terminal supply
  - term: LOAD-RESISTOR
    pos: noun
    definition: resistor in series with the `C` terminal supply
  - term: BASE-WIRE
    pos: noun
    definition: wire from `BASE-CONTACT` to the `B` terminal
  - term: OHMIC-CONTACT-METAL
    pos: noun
    definition: contact metal for current in both polarities on `P-TYPE` material
  - term: GRAPHITE-JIG
    pos: noun
    definition: graphite fixture that aligns top and bottom contacts
  - term: FURNACE
    pos: noun
    definition: heated chamber with controlled temperature and slow cooling
  - term: FORMING-GAS
    pos: noun
    definition: reducing gas mix of nitrogen and hydrogen
  - term: INERT-GAS
    pos: noun
    definition: gas with low chemical reaction rate
  - term: PEROXIDE-ETCH
    pos: noun
    definition: peroxide based etch solution for `GERMANIUM`
  - term: HYDROFLUORIC-ACID
    pos: noun
    definition: acid with deep delayed burn hazard
  - term: RINSE-WATER
    pos: noun
    definition: clean water for rinse after etch
  - term: ACID-RESIDUE
    pos: noun
    definition: acid waste after etch
  - term: ABRASIVE-POWDER
    pos: noun
    definition: fine powder for surface preparation on a flat plate
  - term: VENT-SYSTEM
    pos: noun
    definition: system that removes vapor from the work area
  - term: HYDROGEN-LINE-VENT
    pos: noun
    definition: vent on the hydrogen supply line
  - term: GAS-LEAK
    pos: noun
    definition: escape of gas from chamber or hose
  - term: OPEN-FLAME
    pos: noun
    definition: exposed combustion source
  - term: E
    pos: noun
    definition: emitter terminal label
  - term: B
    pos: noun
    definition: base terminal label
  - term: C
    pos: noun
    definition: collector terminal label
---

# protocol `NPN-DEVICE`

## definitions

```definition
`NPN-DEVICE`: device with `N-EMITTER`, thin `P-BASE`, and `N-COLLECTOR` in series (defined).
`ALLOY-JUNCTION-METHOD`: method that forms `P-N-JUNCTION` surfaces by molten metal alloy on `GERMANIUM` (defined).
`P-BASE`: thin `P-TYPE` layer between `N-EMITTER` and `N-COLLECTOR` (defined).
`N-EMITTER`: `N-TYPE` layer with high `DONOR` concentration and small contact area (defined).
`N-COLLECTOR`: `N-TYPE` layer with lower `DONOR` concentration and larger contact area (defined).
`CURRENT-GAIN`: ratio of `COLLECTOR-CURRENT` to `BASE-CURRENT` (defined).
`CHARGE-CARRIER-PATH`: average distance an electron travels before `RECOMBINATION` in `P-BASE` material (defined).
```

## constraints

```constraint
Condition `COND-BASE-THIN` requires `P-BASE` width within 5 to 25 micro meter after alloy (defined).
Condition `COND-FRONT-SEPARATION` requires distance between `EMITTER-FRONT` and `COLLECTOR-FRONT` above zero (defined).
Condition `COND-SEAL` requires opaque sealed enclosure around the completed device (defined).
Condition `COND-SINGLE-CRYSTAL` requires single crystal structure across `GERMANIUM` material (defined).
Condition `COND-OHMIC-BASE` requires `BASE-CONTACT` current in both polarities (defined).
```

## method basis

`NPN-DEVICE` contains `N-EMITTER`, thin `P-BASE`, and `N-COLLECTOR` in series (follows, from `NPN-DEVICE`).

`N-EMITTER` supplies electron excess to `P-BASE` under `FORWARD-BIAS` (follows, from `FORWARD-BIAS`).

`P-BASE` width below `CHARGE-CARRIER-PATH` allows most electrons to cross into `N-COLLECTOR` (follows, from `CHARGE-CARRIER-PATH`).

`P-BASE` width above `CHARGE-CARRIER-PATH` produces 2 `DIODE` devices and zero gain (follows, from `CHARGE-CARRIER-PATH`).

`N-COLLECTOR` voltage above `P-BASE` voltage pulls electrons through `P-BASE` (follows, from `REVERSE-BIAS`).

`BASE-CURRENT` controls larger `COLLECTOR-CURRENT` during active operation (follows, from `CURRENT-GAIN`).

`CURRENT-GAIN` equals the ratio of `COLLECTOR-CURRENT` to `BASE-CURRENT` (follows, from `CURRENT-GAIN`).

## procedure precautions

1. Open `HYDROGEN-LINE-VENT` before heat (procedure, step 1).
2. Prohibit `OPEN-FLAME` near the hydrogen line (procedure, step 2).
3. Check chamber and hose for `GAS-LEAK` (procedure, step 3).
4. Install shield between operator and hot chamber surfaces (procedure, step 4).
5. Operate `VENT-SYSTEM` for `ARSENIC` and `ANTIMONY` vapor (procedure, step 5).
6. Select `PEROXIDE-ETCH` instead of `HYDROFLUORIC-ACID` (procedure, step 6).
7. Store acid in a compatible container (procedure, step 7).
8. Store `ACID-RESIDUE` in a sealed container (procedure, step 8).

## procedure materials

1. Select `HIGH-PURITY-GERMANIUM` with single crystal structure (procedure, step 1, for `COND-SINGLE-CRYSTAL`).
2. Exclude `GERMANIUM` with multiple crystal boundaries (procedure, step 2, for `COND-SINGLE-CRYSTAL`).
3. Select `ACCEPTOR` material from `INDIUM`, `GALLIUM`, aluminum, or `BORON` (procedure, step 3).
4. Select `DONOR` material from `ANTIMONY`, `ARSENIC`, or `PHOSPHORUS` (procedure, step 4).
5. Select `ANTIMONY` for first trials when available (procedure, step 5).
6. Configure `FURNACE` for 500 to 600 degree C (procedure, step 6).
7. Configure chamber for hydrogen, `FORMING-GAS`, or vacuum (procedure, step 7).
8. Install `GRAPHITE-JIG` to align top and bottom contacts (procedure, step 8).
9. Supply a flat plate and `ABRASIVE-POWDER` for surface preparation (procedure, step 9).
10. Supply `PEROXIDE-ETCH` and `RINSE-WATER` (procedure, step 10).
11. Install vent and shield for hydrogen, `ARSENIC`, `ANTIMONY`, and acid vapor (procedure, step 11).

## procedure base preparation

1. Cut `P-WAFER` from `P-TYPE-GERMANIUM` (procedure, step 1).
2. Flatten both faces until parallel (procedure, step 2).
3. Shorten `P-WAFER` width to 100 micro meter or less (procedure, step 3, for `COND-BASE-THIN`).
4. Etch `P-WAFER` surface with `PEROXIDE-ETCH` (procedure, step 4).
5. Clean `P-WAFER` with `RINSE-WATER` (procedure, step 5).
6. Dry `P-WAFER` completely (procedure, step 6).
7. Record `P-WAFER` width in the process log (procedure, step 7).

## procedure `PELLET` preparation

1. Mix lead or tin with a small `ANTIMONY` fraction (procedure, step 1).
2. Form 1 large `COLLECTOR-PELLET` (procedure, step 2).
3. Form 1 small `EMITTER-PELLET` (procedure, step 3).
4. Increase `DONOR` concentration in `EMITTER-PELLET` above `COLLECTOR-PELLET` (procedure, step 4).
5. Clean `EMITTER-PELLET` and `COLLECTOR-PELLET` (procedure, step 5).
6. Position `EMITTER-PELLET` on the top face of `P-WAFER` (procedure, step 6).
7. Position `COLLECTOR-PELLET` on the bottom face directly under `EMITTER-PELLET` (procedure, step 7).
8. Align both `PELLET-CENTER` points (procedure, step 8).
9. Hold the assembly in `GRAPHITE-JIG` (procedure, step 9).

## procedure alloy junction build

1. Load the assembly into the chamber (procedure, step 1).
2. Fill the chamber with hydrogen or `FORMING-GAS` (procedure, step 2).
3. Heat the assembly to 500 to 600 degree C (procedure, step 3).
4. Hold the temperature for a short time (procedure, step 4).
5. Allow each `PELLET` to form a molten metal pool (procedure, step 5).
6. Allow each molten pool to absorb `GERMANIUM` from the `P-WAFER` surface (procedure, step 6).
7. Limit the heat time (procedure, step 7, for `COND-FRONT-SEPARATION`).
8. Stop heat before the distance between `EMITTER-FRONT` and `COLLECTOR-FRONT` reaches zero (procedure, step 8, for `COND-FRONT-SEPARATION`).
9. Cool the assembly slowly (procedure, step 9, for `COND-SINGLE-CRYSTAL`).
10. Allow the absorbed `GERMANIUM` to form a single crystal `N-TYPE` layer at each face (procedure, step 10).
11. Stabilize the assembly at ambient temperature (procedure, step 11).
12. Verify the layer order as `N-EMITTER`, `P-BASE`, and `N-COLLECTOR` in series (procedure, step 12).
13. Eliminate the device when `EMITTER-FRONT` and `COLLECTOR-FRONT` contact (procedure, step 13).

## procedure contact and seal

1. Attach a wire to `EMITTER-PELLET` (procedure, step 1).
2. Attach a wire to `COLLECTOR-PELLET` (procedure, step 2).
3. Expose the edge of `P-WAFER` (procedure, step 3).
4. Attach `BASE-WIRE` to the exposed `P-WAFER` edge with `OHMIC-CONTACT-METAL` (procedure, step 4).
5. Verify `BASE-CONTACT` current in both polarities (procedure, step 5, for `COND-OHMIC-BASE`).
6. Replace `BASE-CONTACT` when current differs by polarity (procedure, step 6, for `COND-OHMIC-BASE`).
7. Etch the assembly around both junctions with `PEROXIDE-ETCH` (procedure, step 7).
8. Clean the assembly with `RINSE-WATER` (procedure, step 8).
9. Dry the assembly (procedure, step 9).
10. Place the device into an opaque enclosure (procedure, step 10, for `COND-SEAL`).
11. Fill the enclosure with dry nitrogen or dry `INERT-GAS` (procedure, step 11, for `COND-SEAL`).
12. Seal the enclosure (procedure, step 12, for `COND-SEAL`).
13. Label the terminals as `E`, `B`, and `C` (procedure, step 13).

## procedure circuit test

1. Connect `E` to the minus supply through `EMITTER-RESISTOR` (procedure, step 1).
2. Connect `B` to the plus supply through `BASE-RESISTOR` (procedure, step 2).
3. Connect `C` to the higher plus supply through `LOAD-RESISTOR` (procedure, step 3).
4. Apply `FORWARD-BIAS` across `EMITTER-BASE-JUNCTION` (procedure, step 4).
5. Apply `C` voltage above `B` voltage (procedure, step 5).
6. Increase `BASE-CURRENT` in small increments (procedure, step 6).
7. Record `COLLECTOR-CURRENT` for each `BASE-CURRENT` value (procedure, step 7).
8. Calculate `CURRENT-GAIN` as the ratio of `COLLECTOR-CURRENT` to `BASE-CURRENT` (procedure, step 8).
9. Confirm `CURRENT-GAIN` reaches 10 or more (procedure, step 9).
10. Confirm `EMITTER-BASE-JUNCTION` passes current at 0.2 to 0.3 volt under `FORWARD-BIAS` (procedure, step 10).
11. Confirm `COLLECTOR-BASE-JUNCTION` passes current at 0.2 to 0.3 volt under `FORWARD-BIAS` (procedure, step 11).
12. Confirm each junction blocks current under `REVERSE-BIAS` (procedure, step 12).
13. Confirm `EMITTER-COLLECTOR-PATH` lacks current without `BASE-CURRENT` (procedure, step 13).
14. Decrease `BASE-CURRENT` and verify `COLLECTOR-CURRENT` decreases by factor `CURRENT-GAIN` (procedure, step 14).
15. Increase `BASE-CURRENT` and verify `COLLECTOR-CURRENT` increases by factor `CURRENT-GAIN` (procedure, step 15).

## procedure troubleshooting

1. Shorten the next `P-WAFER` when gain remains near zero and both junction tests pass (procedure, step 1, for `COND-BASE-THIN`).
2. Increase alloy depth when gain remains near zero (procedure, step 2, for `COND-BASE-THIN`).
3. Decrease heat time when `EMITTER-COLLECTOR-PATH` passes current without `BASE-CURRENT` (procedure, step 3, for `COND-FRONT-SEPARATION`).
4. Decrease temperature when `EMITTER-COLLECTOR-PATH` passes current without `BASE-CURRENT` (procedure, step 4, for `COND-FRONT-SEPARATION`).
5. Etch junction surfaces when `LEAKAGE-CURRENT` exceeds target (procedure, step 5).
6. Replace the enclosure seal when `LEAKAGE-CURRENT` drifts over days (procedure, step 6, for `COND-SEAL`).
7. Replace a transparent enclosure when light changes `COLLECTOR-CURRENT` (procedure, step 7, for `COND-SEAL`).
8. Replace `BASE-CONTACT` when current depends on polarity (procedure, step 8, for `COND-OHMIC-BASE`).
9. Cool more slowly when junction surfaces appear rough (procedure, step 9, for `COND-SINGLE-CRYSTAL`).
10. Select single crystal `GERMANIUM` when batch yield remains low (procedure, step 10, for `COND-SINGLE-CRYSTAL`).
11. Continue with silicon only after the `GERMANIUM` process repeats (procedure, step 11).
12. Execute `SILICON-DIFFUSION-METHOD` after the `GERMANIUM` alloy process produces repeated gain (procedure, step 12).

## procedure alternate `GROWN-JUNCTION-METHOD`

1. Pull an `N-TYPE` single crystal from molten `GERMANIUM` (procedure, step 1).
2. Add `ACCEPTOR` to the `MELT` for a short interval to form a thin `P-BASE` (procedure, step 2).
3. Add `DONOR` after the `P-BASE` interval to return to `N-TYPE` crystal (procedure, step 3).
4. Control pull speed and `ACCEPTOR` time within the `P-BASE` width target (procedure, step 4, for `COND-BASE-THIN`).
5. Select `ALLOY-JUNCTION-METHOD` before `GROWN-JUNCTION-METHOD` for first trials (procedure, step 5).
