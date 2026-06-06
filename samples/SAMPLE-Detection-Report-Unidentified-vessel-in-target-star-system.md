---
schema: beyond-cnl-v0.4
purpose: Describe and bound the temperature, the acceleration, the line, and the periodic flux of source SRC-1 within system TS-1.
phase: Discovery
instruments:
  - id: IR-1
    type: thermal sensor
    calibration: against reference standard, per window
  - id: AS-2
    type: position sensor
    calibration: against catalogue standards, daily
  - id: DR-3
    type: velocity receiver
    calibration: against reference standard, daily
  - id: RR-4
    type: signal receiver
    calibration: against reference standard, hourly
  - id: PH-5
    type: flux sensor
    calibration: dark count subtracted hourly
references:
  - id: REF-CAT-1
    title: Bodies and signals within range
    access: restricted
technical_names:
  - term: TS-1-DET
    pos: noun
    definition: the detection protocol for system TS-1
  - term: TS-1
    pos: noun
    definition: the observed system
  - term: SRC-1
    pos: noun
    definition: the compact source within system TS-1
  - term: L-1
    pos: noun
    definition: the narrow spectral line of source SRC-1
  - term: BLACKBODY-FIT
    pos: noun
    definition: the relation that sets the spectral peak of a thermal body from its temperature
conditions:
  - id: COND-1
    statement: Source SRC-1 diverges from the gravitational path.
  - id: COND-2
    statement: The line width falls below one in a million of the frequency.
hypothesis_space:
  - id: H-1
    statement: A source with internal power produces the high temperature, the acceleration, the narrow line, and the periodic flux.
    discriminates_via: MSR-1.3.7
  - id: H-2
    statement: A body with no internal power produces the high temperature and some of the acceleration.
    discriminates_via: MSR-1.3.7
  - id: H-3
    statement: A fault in one instrument produces some of the measurements.
    discriminates_via: OBS-1.4.4
---

# Protocol `TS-1-DET`: compact source within system `TS-1`

## Definitions

```definition
gravitational path: the path that the system masses produce with no other force (defined).
```

## Summary

5 instruments registered one compact source within system `TS-1` (observed, operator). Source `SRC-1` reaches 291 kelvin without a star near source `SRC-1` (measured, sensor `IR-1`, ± 4 kelvin). Source `SRC-1` accelerates at 0.028 meter per second per second (measured, sensor `AS-2`, ± 0.002 meter-per-second-per-second). Receiver `RR-4` measured one narrow line at 203 giga hertz (measured, receiver `RR-4`). The flux of source `SRC-1` peaked every 3.9 seconds (measured, sensor `PH-5`).

## Measurements

```measurement
sensor `IR-1` measured a temperature of 291 kelvin for source `SRC-1` (measured, sensor `IR-1`, ± 4 kelvin).
```

```measurement
the black body spectrum of source `SRC-1` peaks near 10 micro meter (measured, sensor `IR-1`).
```

```measurement
source `SRC-1` radiates 600 mega watt (measured, sensor `IR-1`, ± 50 megawatts).
```

```measurement
source `SRC-1` accelerates at 0.028 meter per second per second (measured, sensor `AS-2`, ± 0.002 meter-per-second-per-second).
```

```measurement
source `SRC-1` changed acceleration direction 2 times across the window (measured, sensor `AS-2`).
```

```measurement
receiver `RR-4` measured one line `L-1` at 203 giga hertz (measured, receiver `RR-4`, ± 0.01 gigahertz).
```

```measurement
line `L-1` remained below 0.2 hertz in width (measured, receiver `RR-4`).
```

```measurement
the center of line `L-1` shifted at 0.03 hertz per second (measured, receiver `RR-4`).
```

```measurement
the flux of source `SRC-1` peaked every 3.9 seconds (measured, sensor `PH-5`).
```

```measurement
each flux peak reached fifty times the baseline flux (measured, sensor `PH-5`). Each flux peak lasted below 40 milli second (measured, sensor `PH-5`).
```

```measurement
sensor `AS-2` fixed source `SRC-1` on a bound path within system `TS-1` (measured, sensor `AS-2`).
```

```measurement
receiver `DR-3` measured the velocity of source `SRC-1` along the bound path (measured, receiver `DR-3`).
```

## Observations

> source `SRC-1` appeared as one point to sensor `IR-1` (observed, sensor `IR-1`).

> the 5 instruments registered source `SRC-1` at one position within their tolerances (observed, operator).

> the 5 instruments registered source `SRC-1` across a continuous window of 41 days (observed, operator).

> the 5 instruments operate on independent detection chains (observed, operator).

## Derived values

The range to system `TS-1` reaches 4.1 light years (cited, from `REF-CAT-1`). A body with no internal power reaches 40 kelvin at the distance of source `SRC-1` (derived, from `REF-CAT-1`). Source `SRC-1` reaches 291 kelvin, which exceeds 40 kelvin by a factor of 7 (derived, from `MSR-1.3.1`, `REF-CAT-1`). The spectrum peak of source `SRC-1` near 10 micro meter fits a temperature of 291 kelvin under `BLACKBODY-FIT` (derived, from `MSR-1.3.2`, `BLACKBODY-FIT`). The point response of sensor `IR-1` bounds the width of source `SRC-1` below 3 kilo meter (derived, from `OBS-1.4.1`).

Source `SRC-1` diverged from the gravitational path by 0.028 meter per second per second (derived, from `MSR-1.3.4`, `MSR-1.3.11`). A comet at the distance of source `SRC-1` accelerates below 0.00001 meter per second per second (cited, from `REF-CAT-1`). The line center shift matches the path acceleration within 2% (calculated, from `MSR-1.3.8`, `MSR-1.3.4`).

Line `L-1` at 203 giga hertz with a width below 0.2 hertz corresponds to a width below one in a thousand billion of the frequency (calculated, from `MSR-1.3.7`, `MSR-1.3.6`). A source with no internal power produces a line width at or above one in a million of the frequency (cited, from `REF-CAT-1`). The flat profile of each flux peak matches smooth flat surfaces that reflect within a narrow range of directions, and not a rough surface (derived, from `MSR-1.3.10`).

No body in `REF-CAT-1` matches this position (cited, from `REF-CAT-1`), and no source in `REF-CAT-1` matches this frequency, this shift, or this path (cited, from `REF-CAT-1`). The width of line `L-1` and the periodic flux eliminate `H-2` (derived, from `MSR-1.3.7`, `MSR-1.3.9`). The 5 instruments register source `SRC-1`, which eliminates `H-3` (derived, from `OBS-1.4.2`, `OBS-1.4.4`). `H-1` matches every measurement (derived, from `MSR-1.3.1`, `MSR-1.3.4`, `MSR-1.3.7`, `MSR-1.3.9`). No measurement excludes `H-2` or `H-3` to zero (derived, from `MSR-1.3.1`).

## Hypothesis space

A source with internal power produces the high temperature, the acceleration, the narrow line, and the periodic flux (hypothesis, candidate `H-1`, from `MSR-1.3.1`, distinguishable-from `H-2`).

A body with no internal power produces the high temperature and some of the acceleration (hypothesis, candidate `H-2`, from `MSR-1.3.1`, distinguishable-from `H-1`).

A fault in one instrument produces some of the measurements (hypothesis, candidate `H-3`, from `MSR-1.3.1`, distinguishable-from `H-1`).

## Procedure: reproduce the detection

1. Align sensor `IR-1` and receiver `RR-4` to the listed position (procedure, step 1).
2. Sample the flux of source `SRC-1` for one flux period at milli second cadence (procedure, step 2).
3. Map the flux values to phase across 3.9 seconds (procedure, step 3).
4. Compare the center of line `L-1` against the acceleration of source `SRC-1` (procedure, step 4).
