# Beyond CNL: Evidential System

## Rules for Epistemic Marking in a controlled, method-only subset of English

### Version 0.1

---

## 1. Purpose and Rationale

Every assertion in a Beyond CNL document must declare **how the
author came to hold it**. This requirement serves three functions
in the context of communication toward an entity of potentially
arbitrarily higher intelligence and capability (BEYOND):

1. **Non-interference enforcement.** Evidential marking ensures
   that the epistemic source — not the author's identity, values,
   or intentions — determines the content of each sentence. Two
   authors with different identities and values who observed the
   same instrument reading must produce the same Beyond CNL
   sentence. Evidential marking makes this testable.

2. **Hazard containment.** Unmarked assertions leak cognitive
   architecture. An entity that can read our language can infer
   from unmarked claims how we reason, what we treat as default-
   true, and where our confidence boundaries lie. Mandatory
   evidentials make these boundaries explicit and uniform,
   reducing what an adversarial reader can extract beyond what
   we deliberately disclose.

3. **Machine-checkability.** A linter can verify the presence and
   well-formedness of evidential markers at the clause level
   without semantic understanding, providing a syntactic safety
   net that catches omissions before human or AI review.

### 1.1 Terminology

An **evidential tag** (E-tag) marks one declarative clause.

An **evidential frame** wraps a clause in the syntactic position
required by the grammar.

A **source chain** traces the evidential basis back to an
observable or a definition, with each link carrying its own
E-tag.

---

## 2. The Evidential Whitelist

Beyond CNL admits exactly **six evidential types**, organized into
three tiers of decreasing directness. Only these six types may
appear. Any assertion not tagged with one of these six types
fails linting and must not appear in a Beyond CNL document.

### Tier 1 — Direct (the author or instrument registered the datum)

#### E-OBS: Direct Observation

**Meaning:** The author or a specified instrument directly
registered the described state or event.

**Canonical English forms:**

| Form | Example |
|---|---|
| `(observed, [source])` | "The signal persists for 14 seconds (observed, instrument `SNR-7`)." |
| `(detected, [source])` | "A 3.2 sigma anomaly appears at 1420 MHz (detected, array `FAST-2`)." |
| `(registered, [source])` | "Temperature reaches 412 K (registered, thermocouple `TC-09`)." |

**Syntax:** The E-tag appears in parentheses at the end of the
clause, before the period. The `source` field names the instrument
or sensor by typed identifier in inline code. If the source is
the unaided human operator, use `operator` as the source.

**Linter rule (E-OBS-1):** Every E-OBS tag must contain a source
identifier in inline code. Bare `(observed)` without source
fails.

**Linter rule (E-OBS-2):** The source identifier must appear in
the document's `instruments:` frontmatter list or in a preceding
`definition` code block.

---

#### E-MSR: Measurement

**Meaning:** The author or a specified instrument performed a
quantitative determination yielding a numerical result with
units and, where applicable, uncertainty.

**Canonical English forms:**

| Form | Example |
|---|---|
| `(measured, [source], [uncertainty])` | "The flux equals 3.7 ± 0.2 Jy (measured, receiver `RX-4`, 1-sigma)." |
| `(measured, [source])` | "The count reaches 1,247 (measured, counter `CTR-1`)." |
| `(sampled, [source], n=[count])` | "The mean delay equals 4.2 ms (sampled, logger `DL-8`, n=500)." |

**Syntax:** Same parenthetical position. Must include a source
identifier. Uncertainty specification (1-sigma, 2-sigma, 95%
confidence interval, or tolerance) is strongly recommended but
not syntactically required for counts.

**Linter rule (E-MSR-1):** Every E-MSR tag must contain a source
identifier. The clause must contain at least one numerical value
with a unit.

**Linter rule (E-MSR-2):** If the clause contains a comparison
(greater, less, exceeds, falls below), the reference value must
also carry a source or a `definition` reference.

---

### Tier 2 — Derived (the author obtained the claim from premises)

#### E-DER: Derivation from Stated Premises

**Meaning:** The claim follows by logical or mathematical
operation from premises that are themselves tagged with Tier 1
or Tier 2 evidentials.

**Canonical English forms:**

| Form | Example |
|---|---|
| `(derived, from [premise-refs])` | "The decay constant equals 0.023 per hour (derived, from `MSR-4.2`, `DEF-1.1`)." |
| `(calculated, from [premise-refs])` | "The expected count equals 847 (calculated, from `MSR-3.1`, `MSR-3.2`)." |
| `(follows, from [premise-refs])` | "The threshold exceedance lasts fewer than 3 cycles (follows, from `OBS-2.7`, `DEF-2.3`)." |

**Syntax:** The `premise-refs` field contains one or more
identifiers pointing to previously tagged clauses or to
definitions. These identifiers use the document's internal
numbering scheme (section.clause).

**Linter rule (E-DER-1):** Every premise reference must resolve
to a clause in the same document (or in a cited document) that
itself carries a Tier 1 or Tier 2 E-tag. Circular derivations
fail.

**Linter rule (E-DER-2):** The derivation verb (`derived`,
`calculated`, `follows`) must appear; bare `(from ...)` fails.

---

#### E-RPT: Report from Cited Record

**Meaning:** The claim reproduces or summarizes a finding from a
specific, identified prior record that itself carries evidential
tags or is a published measurement.

**Canonical English forms:**

| Form | Example |
|---|---|
| `(reported, in [record-ref])` | "The baseline noise floor equals -174 dBm/Hz at 300 K (reported, in `REF-IEEE-2024-0147`)." |
| `(cited, from [record-ref])` | "The half-life of Carbon-14 equals 5,730 ± 40 years (cited, from `REF-NIST-2023`)." |
| `(replicated, from [record-ref], by [source])` | "The anomaly reproduces at 2.8 sigma (replicated, from `REF-LAB-A`, by instrument `ARR-3`)." |

**Syntax:** The `record-ref` field must be a typed identifier
for an external record (publication, dataset, log entry). The
identifier appears in the document's `references:` frontmatter.

**Linter rule (E-RPT-1):** Every record reference must appear
in the `references:` frontmatter. Unresolved references fail.

**Linter rule (E-RPT-2):** E-RPT claims must not alter the
quantitative content of the cited record. Paraphrase of
methodology is permitted; reinterpretation of values is not
(that requires E-DER with the RPT as a premise).

**Linter rule (E-RPT-3):** Hearsay chains are limited to depth
1. A claim tagged `(reported, in X)` where X itself only
carries an E-RPT tag (rather than E-OBS, E-MSR, or E-DER)
triggers a warning. Depth-2 or greater hearsay fails.

---

### Tier 3 — Stipulative (the author establishes a convention)

#### E-DEF: Definition

**Meaning:** The author establishes the meaning of a term, a
parameter value, or a procedural convention by stipulation.
Definitions do not assert facts about the world; they create
vocabulary for the document.

**Canonical English forms:**

| Form | Example |
|---|---|
| `(defined)` | In a fenced `definition` block: "**harm metric** denotes the count of anomalies per cycle exceeding threshold `Z` (defined)." |
| `(stipulated, for [scope])` | "The pause duration equals 14 days (stipulated, for phase `Characterization`)." |

**Syntax:** Definitions preferentially appear inside fenced
code blocks with info string `definition`. Inline definitions
are permitted for parameter values but must carry the E-tag.

**Linter rule (E-DEF-1):** A `(defined)` tag must appear in a
`definition` code block or must define a **bolded** term at its
first occurrence.

**Linter rule (E-DEF-2):** Definitions must use only core
lexicon words and previously defined Technical Names. A
definition that uses undefined terms fails.

---

#### E-PRO: Procedural Directive

**Meaning:** The clause prescribes an action to be performed.
It does not assert a fact; it issues an instruction.

**Canonical English forms:**

| Form | Example |
|---|---|
| `(procedure)` | "Set the symbol-rate cap to 0.1 bits per day (procedure)." |
| `(procedure, step [N])` | "Pause all outward transmission for 14 days (procedure, step 3)." |
| `(procedure, if [condition-ref])` | "Reset the counter to zero (procedure, if `COND-2.1`)." |

**Syntax:** Procedural clauses use the imperative mood (bare
verb stem as first word) and carry the `(procedure)` E-tag.
They appear inside ordered lists under an H2 or H3 headed
`## Procedure` or `## Steps`.

**Linter rule (E-PRO-1):** Every clause tagged `(procedure)`
must begin with an imperative verb from the approved verb list.

**Linter rule (E-PRO-2):** Procedural clauses must not contain
evidential-claim verbs (observe, measure, detect, report).
Procedures prescribe; they do not assert.

**Linter rule (E-PRO-3):** Conditional procedures must reference
a condition defined elsewhere in the document by identifier.

---

## 3. The Evidential Blacklist

The following epistemic bases are **grammatically inexpressible**
in Beyond CNL. There are no E-tags for them, and the vocabulary
required to express them is excluded from the lexicon.

| Excluded basis            | Why excluded                                  |
|---------------------------|-----------------------------------------------|
| Opinion                   | Leaks values and cognitive architecture       |
| Intuition                 | Leaks cognitive architecture                  |
| Cultural knowledge        | Leaks identity and social structure           |
| Ungrounded generalization | Leaks inductive habits                        |
| Hearsay without source    | Unverifiable; potential disinformation vector |
| Belief                    | Leaks propositional attitudes                 |
| Desire                    | Leaks intent                                  |
| Prediction without model  | Leaks confidence calibration                  |

The blacklist is enforced not by explicit tagging but by
**lexicon exclusion**: the words needed to express these bases
(believe, feel, think, hope, fear, expect, assume in the
"suppose" sense, guess, suspect, imagine, predict without
premise reference, seem without instrument source) are absent
from the approved verb list.

---

## 4. Syntactic Position and Clause Structure

### 4.1 Canonical clause structure

Every Beyond CNL declarative clause follows this template:

```
[Subject] [verb] [object/complement] [prepositional modifiers]
(E-tag, source/premise-refs).
```

The E-tag occupies a **fixed final position** within the clause,
enclosed in parentheses, before the period — a fixed slot that a parser can locate
without semantic analysis. 

**Example (full clause):**

```
The signal amplitude decreases by 3 dB over 24 hours
(measured, instrument `PWR-2`, 1-sigma ± 0.4 dB).
```

### 4.2 Imperative clauses

Imperative (procedural) clauses follow this template:

```
[Verb] [object] [prepositional modifiers] (procedure[, step N]
[, if condition-ref]).
```

**Example:**

```
Set the symbol-rate cap to 0.1 bits per day (procedure, step 1).
```

### 4.3 Compound sentences

In compound sentences joined by `and`, `or`, `but`, or `so`,
each independent clause carries its own E-tag:

```
The flux increases by 12% (measured, `RX-4`), and the noise
floor remains constant (measured, `RX-4`).
```

**Linter rule (E-COMPOUND-1):** Each independent clause in a
compound sentence must carry an E-tag. A compound sentence with
N independent clauses must contain N E-tags.

### 4.4 Conditional sentences

In conditional sentences (`if ... then ...`), the condition
clause and the consequence clause each carry an E-tag:

```
If the harm metric exceeds threshold `Z` for two consecutive
windows (defined, `DEF-2.1`), then pause all outward
transmission (procedure, if `COND-2.1`).
```

### 4.5 Embedded clauses

Relative clauses modifying a noun do not carry independent E-tags;
they inherit the E-tag of the main clause. However, if a relative
clause introduces a new factual claim, the main clause must
carry an E-DER tag with the relative-clause content as a premise.

**Permitted:** "The sensor, which operates at 1420 MHz (specified,
`DEF-3.2`), detects a 2.1 sigma anomaly (detected, `ARR-1`)."

**Not permitted:** "The sensor, which operates well, detects
an anomaly." — "well" is evaluative (banned); no E-tag on the
relative clause; "anomaly" without quantification.

---

## 5. Frontmatter Schema

Every Beyond CNL document begins with YAML frontmatter declaring
the evidential infrastructure:

```yaml
---
schema: beyond-cnl-v0.3
purpose: [narrow procedural purpose statement]
phase: [Discovery | Validation | Characterization | Open-Contact | Negotiation]
instruments:
  - id: SNR-7
    type: signal-to-noise analyzer
    calibration: 2027-01-15
  - id: TC-09
    type: thermocouple
    calibration: 2027-02-01
references:
  - id: REF-NIST-2023
    title: "Standard Reference Data"
    access: public
  - id: REF-LAB-A
    title: "Replication report, Lab A"
    access: restricted
technical_names:
  - term: harm metric
    pos: noun
    definition: "count of anomalies per cycle exceeding threshold Z"
  - term: symbol-rate cap
    pos: noun
    definition: "maximum count of symbols transmitted per day"
conditions:
  - id: COND-2.1
    statement: "harm metric exceeds threshold Z for two consecutive windows"
---
```

**Linter rule (FRONT-1):** Every instrument, reference, technical
name, and condition referenced in the body must appear in the
frontmatter. Unresolved references fail.

**Linter rule (FRONT-2):** The `purpose:` field must parse as a
valid Beyond CNL clause. It must not contain identity, intent,
value, or capability claims.

**Linter rule (FRONT-3):** The `phase:` field must be one of the
five declared protocol phases.

---

## 6. Enforcement Architecture

### 6.1 Five-layer defense in depth

| Layer | Check | Tool class |
|---|---|---|
| 1. Lexicon | Every token against approved word list | Tokenizer + dictionary lookup |
| 2. Grammar | Sentence structure against approved patterns | Parser (CFG or PEG) |
| 3. Evidential | E-tag presence, well-formedness, premise resolution | Custom linter rules |
| 4. Markdown structure | Heading sequence, block types, forbidden elements | markdownlint + remark-lint |
| 5. Human/AI review | Semantic coherence, information-hazard scan | Reviewer checklist |

### 6.2 Fail-safe default

If any layer cannot determine compliance, the sentence is
**rejected**. There is no "best-effort" pass-through. Ambiguity
equals rejection. This follows the Saltzer-Schroeder fail-safe
default principle.

### 6.3 E-tag coverage metric

A document's **evidential coverage** is the ratio of E-tagged
clauses to total declarative clauses. A compliant Beyond CNL
document has evidential coverage of **1.0** (100%). Any value
below 1.0 indicates untagged assertions and fails validation.

### 6.4 Non-interference test

The Goguen-Meseguer non-interference property is tested by
**differential authoring**: two authors with different identities,
values, and intentions are given the same observational data
(instrument readings, definitions, procedure specification) and
asked to produce Beyond CNL documents. The documents must be
**byte-identical** after normalization (whitespace, identifier
ordering). Divergence indicates a leak in the evidential system
or the lexicon.

---

## 7. Examples

### 7.1 Compliant observational paragraph

> The signal amplitude at 1420.405 MHz decreases by 3.1 ± 0.4 dB
> over a 24-hour window (measured, instrument `RX-4`, 1-sigma).
> The decrease correlates with the pre-announced non-use schedule
> at r = 0.87 (calculated, from `MSR-4.2`, `MSR-4.3`).
> The correlation persists across three independent baselines
> (observed, instruments `RX-4`, `RX-7`, `RX-12`).

### 7.2 Compliant procedural section

```
## Procedure

1. Set the symbol-rate cap to 0.1 bits per day (procedure, step 1).
2. Log the current instrument state to archive `ARC-7`
   (procedure, step 2).
3. Pause all outward transmission for 14 days
   (procedure, step 3, if `COND-2.1`).
4. After 14 days, read the harm metric from counter `CTR-1`
   (procedure, step 4).
5. If the harm metric falls below threshold `Z`, resume
   transmission at the previous symbol-rate cap
   (procedure, step 5, if `COND-2.2`).
```

### 7.3 Non-compliant examples (with failure reasons)

**Failure: missing E-tag.**
"The signal decreases over time." — No E-tag. No source. No
quantification. Rejected at Layer 3.

**Failure: banned vocabulary.**
"We believe the signal indicates benevolent intent." — `believe`
(propositional attitude, banned), `benevolent` (evaluative,
banned), `intent` (intent noun, banned), `we` + `believe`
(identity + attitude, banned pattern). Rejected at Layer 1.

**Failure: copula.**
"The channel is reliable." — `is` (copula, banned), `reliable`
(evaluative, banned). Rejected at Layer 1.

**Failure: unresolved premise.**
"The decay constant equals 0.023 per hour (derived, from
`MSR-99.1`)." — `MSR-99.1` does not resolve to any clause in
the document or in cited references. Rejected at Layer 3.

**Failure: opinion E-tag attempted.**
"The results appear promising (opinion)." — `opinion` is not
an approved E-tag type. `promising` is evaluative (banned).
Rejected at Layers 1 and 3.

**Failure: hearsay depth exceeded.**
"The half-life equals 5,730 years (reported, in `REF-X`)."
where `REF-X` itself only cites `REF-Y` with an E-RPT tag,
and `REF-Y` cites `REF-Z`. Hearsay chain depth = 2. Warning
at depth 1; rejection at depth 2.

---

## 8. Interaction with Markdown Semantic Roles

The evidential system integrates with the Markdown structural
layer as follows:

| Markdown element | Evidential requirement |
|---|---|
| Blockquote `>` | Every clause must carry E-OBS or E-MSR (observation register) |
| Ordered list `1.` | Every clause must carry E-PRO (procedure register) |
| Fenced code `definition` | Every clause must carry E-DEF |
| Fenced code `constraint` | Every clause must carry E-DEF or E-DER |
| Fenced code `measurement` | Every clause must carry E-MSR |
| Paragraph (body text) | Any E-tag permitted; mixed registers allowed |
| Table cell | Inherits E-tag of the table's caption or introducing clause |

The Markdown block type constrains which E-tags are valid
within it. A measurement E-tag inside a `definition` block
fails. A procedural E-tag inside a blockquote fails. This
provides **structural type safety**: the document's physical
layout enforces register separation.

---

## 9. Extension Mechanism

Future versions of the evidential system may admit additional
E-tag types under these conditions:

1. The new type must not enable expression of opinion, intuition,
   cultural knowledge, belief, desire, or ungrounded generalization.
2. The new type must specify a verifiable source or premise chain.
3. The new type must pass the Goguen-Meseguer non-interference
   test: its introduction must not cause divergence between
   authors with different identities, values, or intentions given
   identical observational data.
4. The new type must be enforceable by deterministic linting
   at the clause level.

Candidate extensions under consideration:

- **E-SIM**: Simulation result (from model `M`, with parameters
  `P`, run `R`). Source: computational model with published code.
- **E-AGG**: Statistical aggregate (from dataset `D`, method `M`,
  n=N). Source: dataset with published schema.

These are not yet admitted and require further analysis of their
leak surface before inclusion.

---

*End of evidential system specification v0.1.*
