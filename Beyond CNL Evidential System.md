# Beyond CNL: Evidential System and Envelope Grammar

## Rules for Epistemic Marking and Formal Structure in a controlled, method-only subset of English

### Version 0.2

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

This document specifies both the **evidential system** (which
E-tags exist, what they mean, what they require) and the **envelope
grammar** (the formal structure a document must derive from in
order to be machine-checkable). The two pieces are
complementary: the evidential system answers *what* a clause
asserts and *how the author came to hold it*, and the envelope
grammar answers *how that assertion is structurally arranged on
the page* in a way a parser can verify.

### 1.1 Terminology

An **evidential tag** (E-tag) marks one declarative clause.

An **evidential frame** wraps a clause in the syntactic position
required by the grammar.

A **source chain** traces the evidential basis back to an
observable or a definition, with each link carrying its own
E-tag.

The **envelope** of a document is everything the envelope grammar
in §6 recognizes: document-level frontmatter and body structure,
Markdown block boundaries, clause boundaries, the E-tag slot, and
the syntactic shape of each E-tag. The **interior** of a clause —
its actual English content between subject and E-tag — is not
formalized by the envelope grammar; it is constrained by the
lexicon layer (presence in the approved word list, absence of
banned constructions).

---

## 2. The Evidential Allow-list

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

**Linter rule (E-RPT-3):** Hearsay chains are limited to depth 1. 
A claim tagged `(reported, in X)` where X itself only
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

## 3. The Evidential Deny-list

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

The deny-list is enforced not by explicit tagging but by
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
enclosed in parentheses, before the period — a fixed slot that a
parser can locate without semantic analysis.

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

The prose templates in §§4.1–4.4 are the human-readable form of
the formal grammar specified in §6. Where the two appear to
disagree, the formal grammar in §6 governs.

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
five declared protocol phases. Future protocol-phase additions
are made by revising this schema, not by ad-hoc additions in
documents.

**Linter rule (FRONT-4):** The `schema:` field must declare a
schema version no newer than the linter implements. A document
declaring a future schema version is rejected; this prevents
silent downgrade of compliance checks.

**Field constraints:**

- `instruments[].id`, `references[].id`, and `conditions[].id` must
  match the `Identifier` production in §6.3.
- `references[].access` must be one of `public`, `restricted`, or
  `private`.
- `technical_names[].term` is a multi-word noun phrase, sense-pinned.
- `technical_names[].definition` and `conditions[].statement` are
  single Beyond CNL clauses, copula-free, with the period and
  E-tag omitted in YAML value position.

---

## 6. Envelope Grammar

This section specifies the **formal envelope grammar** of Beyond
CNL: the syntactic structure a document must derive from. The
envelope covers document-level structure, Markdown block types
and their permitted contents, clause boundaries, the canonical
end-of-clause E-tag slot, the formal shape of each E-tag, and the
identifier conventions linking the body to the frontmatter.

The envelope grammar does **not** validate the interior of a
clause (the natural-English content between subject and E-tag);
that work is done by the lexicon layer (Layer 1 of §7.1). The
two layers compose: a clause is well-formed if its envelope
derives from this grammar AND every token in its interior passes
the lexicon check.

### 6.1 Notation

The grammar uses a near-ISO-14977 EBNF dialect:

- `=` separates a nonterminal from its production
- `;` terminates a production
- `"..."` denotes a terminal string
- `?...?` denotes a special sequence whose recognition is delegated
  (e.g., to the lexicon or to a standard YAML parser)
- `*` zero or more repetitions
- `+` one or more repetitions
- `?` zero or one (optional)
- `|` alternation
- `(...)` grouping
- `(* ... *)` comment

Nonterminals are written in `PascalCase`. `SP` denotes a single
space; `NL` denotes a line terminator. Multiple consecutive
spaces within a clause interior are normalized to a single space
before recognition.

### 6.2 Lexical conventions

```ebnf
SP              = " " ;
NL              = "\n" | "\r\n" ;
BlankLine       = NL ;

Letter          = "A" | ... | "Z" | "a" | ... | "z" ;
Digit           = "0" | ... | "9" ;
Number          = ( "+" | "-" )? ( Digit+ ( "." Digit+ )? ) ;

Identifier      = ( Letter | "_" ) ( Letter | Digit | "-" | "_" | "." )* ;
```

### 6.3 Inline code (typed identifiers)

All references to instruments, references, premises, scopes,
and conditions appear as **inline code** (backtick-delimited) in
clause text:

```ebnf
InlineCode      = "`" IdentifierBody "`" ;
IdentifierBody  = ( Letter | Digit | "-" | "_" | "." )+ ;
```

This is a deliberate design constraint: typed identifiers are
visually distinct from natural-English content, the grammar can
locate them without lexical analysis of surrounding text, and
the linter can resolve them against the frontmatter without
scanning prose.

### 6.4 Document-level grammar

```ebnf
Document        = Frontmatter Body ;

Frontmatter     = "---" NL FrontmatterContent "---" NL ;
FrontmatterContent
                = ?valid YAML 1.2, conforming to the schema in §5? ;

Body            = ( Block | BlankLine )* ;

Block           = Heading
                | Paragraph
                | Blockquote
                | OrderedList
                | CodeBlock ;
```

A document with no frontmatter, or with frontmatter that fails
the schema in §5, is rejected. A body with zero blocks is
accepted (the empty compliant document) — this matches the
language's design behavior that non-compliant content reduces to
empty output.

### 6.5 Block-level grammar

```ebnf
(* ---- Headings ---- *)
Heading         = HeadingMarker SP HeadingText NL ;
HeadingMarker   = "#" | "##" | "###" | "####" ;
HeadingText     = ?one line of lexicon-valid tokens, no E-tag required? ;

(* ---- Paragraphs ---- *)
Paragraph       = TaggedClause+ ;

(* ---- Blockquotes ---- *)
Blockquote      = BlockquoteLine+ ;
BlockquoteLine  = ">" SP TaggedClause ;

(* ---- Ordered lists ---- *)
OrderedList     = OrderedListItem+ ;
OrderedListItem = Digit+ "." SP ImperativeClause NL ;

(* ---- Fenced code blocks ---- *)
CodeBlock       = "```" InfoString NL CodeContent "```" NL ;
InfoString      = "definition" | "constraint" | "measurement" | Identifier ;
CodeContent     = TaggedClause+ ;
```

Headings do not carry E-tags (they are not declarative clauses).
Their text is still validated by the lexicon layer.

### 6.6 Clause-level grammar

```ebnf
TaggedClause    = ClauseInterior SP ETagFrame "." NL ;

ImperativeClause
                = ImperativeVerb SP ClauseInterior SP ProcETagFrame "." NL ;

ImperativeVerb  = ?bare-stem verb from the approved imperative verb list? ;

ClauseInterior  = Token ( SP Token )* ;

Token           = LexicalWord | InlineCode | Number | InClauseComma
                | UnitToken ;

LexicalWord     = ?word form present in the approved lexicon,
                   with banned-construction check applied (see §3)? ;
InClauseComma   = "," ;
UnitToken       = ?SI unit symbol or approved domain-specific unit? ;
```

### 6.7 E-tag grammar

The six E-tag types defined in §2 have the following formal
shapes.

```ebnf
ETagFrame       = "(" ETagBody ")" ;

ETagBody        = ObsTag | MsrTag | DerTag | RptTag | DefTag | StipTag ;

ProcETagFrame   = "(" ProcTag ")" ;

(* ---- E-OBS ---- *)
ObsTag          = ObsVerb "," SP SourceRef ;
ObsVerb         = "observed" | "detected" | "registered" ;

(* ---- E-MSR ---- *)
MsrTag          = MsrVerb "," SP SourceRef
                  ( "," SP UncertaintyExpr )?
                  ( "," SP "n=" Digit+ )? ;
MsrVerb         = "measured" | "sampled" ;
UncertaintyExpr = ( "1-sigma" | "2-sigma" | "3-sigma" )
                | ( Number "%" SP "CI" )
                | ( "±" SP Number SP UnitToken )
                | ( "tolerance" SP Number SP UnitToken ) ;

(* ---- E-DER ---- *)
DerTag          = DerVerb "," SP "from" SP PremiseRefList ;
DerVerb         = "derived" | "calculated" | "follows" ;
PremiseRefList  = PremiseRef ( "," SP PremiseRef )* ;
PremiseRef      = InlineCode ;

(* ---- E-RPT ---- *)
RptTag          = RptVerb "," SP RptPrep SP RecordRef
                  ( "," SP "by" SP SourceRef )? ;
RptVerb         = "reported" | "cited" | "replicated" ;
RptPrep         = "in" | "from" ;
RecordRef       = InlineCode ;

(* ---- E-DEF ---- *)
DefTag          = "defined" ;
StipTag         = "stipulated" "," SP "for" SP ScopeName ;
ScopeName       = ?one of the document's declared scopes (e.g., a phase name)? ;

(* ---- E-PRO ---- *)
ProcTag         = "procedure"
                  ( "," SP "step" SP Digit+ )?
                  ( "," SP "if" SP ConditionRef )? ;
ConditionRef    = InlineCode ;

(* ---- Source reference (shared) ---- *)
SourceRef       = ( InstrumentClass SP )? InlineCode
                | "operator" ;
InstrumentClass = "instrument" | "array" | "thermocouple"
                | "receiver" | "counter" | "logger"
                | "sensor" | "detector" | "balance"
                | ?other approved instrument-class noun? ;
```

### 6.8 Register constraints (type rules)

After a document is parsed by the grammar above, the structural
type checker enforces the following rules. A document that
passes the grammar but fails any type rule is rejected. These
rules formalize the integration described narratively in §9.

| Block type              | Permitted E-tag types                 | Rule ID |
|-------------------------|----------------------------------------|---------|
| Paragraph               | any                                    | —       |
| Blockquote              | E-OBS, E-MSR                           | B-1     |
| OrderedList             | E-PRO                                  | O-1     |
| OrderedList placement   | Must follow a heading whose text begins with `Procedure` or `Steps` | O-2     |
| CodeBlock(definition)   | E-DEF (`defined` or `stipulated`)      | C-1     |
| CodeBlock(constraint)   | E-DEF or E-DER                         | C-2     |
| CodeBlock(measurement)  | E-MSR                                  | C-3     |
| CodeBlock(other)        | unrestricted, flagged for review       | C-4     |
| Heading                 | E-tag not permitted                    | H-1     |

### 6.9 Reference resolution

| Reference appearing in body | Must resolve in                                    | Rule ID |
|-----------------------------|-----------------------------------------------------|---------|
| SourceRef InlineCode        | `instruments:` in frontmatter                       | R-1     |
| RecordRef InlineCode        | `references:` in frontmatter                        | R-2     |
| ConditionRef InlineCode     | `conditions:` in frontmatter                        | R-3     |
| PremiseRef InlineCode       | a tagged clause in the same document, or in a document cited via `references:` | R-4     |

**Premise-tag eligibility (extends R-4):**

| PremiseRef target carries | Eligible as premise? | Rule ID |
|---------------------------|----------------------|---------|
| E-OBS                     | yes                  | P-1     |
| E-MSR                     | yes                  | P-2     |
| E-DER                     | yes                  | P-3     |
| E-DEF                     | yes (for definitional premises) | P-4 |
| E-RPT only                | yes at depth 1; warning at depth 1; rejection at depth 2+ (matches E-RPT-3) | P-5 |
| E-PRO                     | no — procedural clauses are not premises | P-6 |

### 6.10 Compound and conditional sentences (normalization)

The grammar treats compound and conditional sentences as
**multiple TaggedClauses in sequence**, not as a single
multi-clause construct. A "compound sentence" in §4.3's sense
is normalized before parsing: a coordinating conjunction (`,
and`, `, or`, `, but`, `, so`) between two ETagFrames is split
into two clauses, each carrying its own E-tag and ending in its
own period.

Conditional sentences (§4.4) are realized using the `(procedure,
if `COND-X`)` form, which references a condition declared in the
frontmatter rather than stating the condition inline. This is
the canonical form; inline `if … then …` constructs are not
part of the grammar.

### 6.11 What the envelope grammar does not enforce

For clarity about scope, the envelope grammar does **not**:

- Validate that a clause's interior makes grammatical English
  sense (subject-verb agreement, tense, coreference, ellipsis).
- Detect semantic contradictions across clauses (e.g., one clause
  asserting `temperature = 248 K` and another asserting
  `temperature = 412 K` for the same time and instrument).
- Verify that an E-MSR clause's numerical value actually matches
  the instrument's stated operating range.
- Perform the information-hazard scan (Layer 5).

These are deliberate scope decisions: each one belongs to a
different layer (lexicon, evidential semantics, or human review).
The envelope grammar is the structural backbone; the other
layers do the content work.

---

## 7. Enforcement Architecture

### 7.1 Five-layer defense in depth

| Layer | Check | Tool class |
|---|---|---|
| 1. Lexicon | Every token against approved word list; banned-construction check | Tokenizer + dictionary lookup |
| 2. Envelope grammar | Document derives from §6 grammar; register and resolution rules pass | Hand-rolled recognizer (current) or PEG/Ohm (future); see §6.12 |
| 3. Evidential semantics | E-tag content well-formed beyond syntax: premise chains non-circular, hearsay depth bounded, etc. | Custom linter rules (E-OBS-*, E-MSR-*, E-DER-*, E-RPT-*, E-DEF-*, E-PRO-*) |
| 4. Markdown structure | Heading sequence, forbidden Markdown elements, info-string validity | markdownlint + remark-lint |
| 5. Human/AI review | Semantic coherence, information-hazard scan | Reviewer checklist |

### 7.2 Acceptance semantics (fail-safe default)

A document `D` is **accepted** by Beyond CNL if all of the
following hold:

1. `D` derives from the `Document` nonterminal in §6.4.
2. Every token in every clause interior, heading, or other text
   position passes Layer 1.
3. Every register constraint in §6.8 is satisfied.
4. Every reference in §6.9 resolves and every premise satisfies
   the eligibility rules.
5. The frontmatter satisfies the schema in §5.
6. The Evidential System semantic rules (Layer 3) pass.

Otherwise, `D` is **rejected**. There is no partial acceptance: a
single rejected clause rejects the document. This realizes the
Saltzer-Schroeder fail-safe default at the grammar level: the
parser either derives the document or does not, and
undeterminable cases derive to rejection rather than to
"best-effort."

**Filter mode (optional):** A linter implementation may offer a
*filter mode* in which rejected clauses are silently omitted
from the output rather than rejecting the whole document. This
is the operational realization of the language's design behavior
that non-compliant content reduces to empty output. Filter mode
is suitable for transmission scenarios (where the receiver
should not receive non-compliant content) but not for editing
scenarios (where the author must see what was rejected and why).

### 7.3 E-tag coverage metric

A document's **evidential coverage** is the ratio of E-tagged
clauses to total declarative clauses. A compliant Beyond CNL
document has evidential coverage of **1.0** (100%). Any value
below 1.0 indicates untagged assertions and fails validation.

### 7.4 Non-interference test

Goguen-Meseguer non-interference is the design target and should
be tested by **differential authoring**: two authors with
different identities, values, and intentions are given the same
observational data (instrument readings, definitions, procedure
specification) and asked to produce Beyond CNL documents. The
documents must be **identical** after normalization (whitespace,
identifier ordering).

Divergence indicates a leak in the evidential system, the
lexicon, or the envelope grammar. A graded variant of the test
measures divergence on the structured form emitted by the
envelope grammar parser (per-clause tuples) rather than on raw
byte sequences, which decouples genuine epistemic agreement from
incidental stylistic variation.

This test has not yet been run at scale. 
Designing the protocol, selecting author profiles, and defining 
the divergence metric are still to be done and are important 
to make the non-interference claim empirical.

---

## 8. Examples

### 8.1 Compliant observational paragraph

> The signal amplitude at 1420.405 MHz decreases by 3.1 ± 0.4 dB
> over a 24-hour window (measured, instrument `RX-4`, 1-sigma).
> The decrease correlates with the pre-announced non-use schedule
> at r = 0.87 (calculated, from `MSR-4.2`, `MSR-4.3`).
> The correlation persists across three independent baselines
> (observed, instruments `RX-4`, `RX-7`, `RX-12`).

### 8.2 Compliant procedural section

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

### 8.3 Non-compliant examples (with failure reasons)

**Failure: missing E-tag.**
"The signal decreases over time." — No E-tag. Rejected at
Layer 2 (grammar): a TaggedClause requires an ETagFrame before
the period.

**Failure: banned vocabulary.**
"We believe the signal indicates benevolent intent." — `believe`
(propositional attitude, banned), `benevolent` (evaluative,
banned), `intent` (intent noun, banned). Rejected at Layer 1.

**Failure: copula.**
"The channel is reliable." — `is` (copula, banned), `reliable`
(evaluative, banned). Rejected at Layer 1.

**Failure: unresolved premise.**
"The decay constant equals 0.023 per hour (derived, from
`MSR-99.1`)." — `MSR-99.1` does not resolve to any clause.
Rejected at Layer 2 by rule R-4.

**Failure: wrong register.**
"> The reading equals 248 K (procedure, step 1)." — Derives
from the grammar, but a Blockquote permits only E-OBS or E-MSR
per rule B-1. Rejected at Layer 2 by register check.

**Failure: opinion E-tag attempted.**
"The results appear promising (opinion)." — `opinion` is not
an approved ETagBody alternative; the ETagFrame fails to derive.
Rejected at Layer 2. `promising` and `appear` would also fail
Layer 1.

**Failure: hearsay depth exceeded.**
"The half-life equals 5,730 years (reported, in `REF-X`)."
where `REF-X` itself only cites `REF-Y` with an E-RPT tag, and
`REF-Y` cites `REF-Z`. Hearsay chain depth = 2. Warning at
depth 1; rejection at depth 2 by rule P-5 (matches E-RPT-3).

**Failure: schema version mismatch.**
A document declaring `schema: beyond-cnl-v0.4` processed by a
linter implementing only v0.3. Rejected by rule FRONT-4.

---

## 9. Interaction with Markdown Semantic Roles

The evidential system integrates with the Markdown structural
layer as follows. This table is the narrative companion to the
formal register constraints in §6.8.

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

## 10. Extension Mechanism

Future versions of the evidential system may admit additional
E-tag types under these conditions:

1. The new type must structurally prevent the asserted content
   from being read as the author's personal commitment to truth.
   Opinion, intuition, cultural knowledge, belief, desire, and
   ungrounded generalization must remain inexpressible after the
   extension.
2. The new type must specify a verifiable source or premise chain.
3. The new type must pass the Goguen-Meseguer non-interference
   test: its introduction must not cause divergence
   between authors with different identities, values, or
   intentions given identical observational data and identical
   declared analytical infrastructure (instruments, references,
   model identifiers, candidate spaces).
4. The new type must be enforceable by deterministic linting at
   the clause level.
5. The new type's admissible value space must be enumerable in
   the document's frontmatter or in a published reference.
   Authors must select from the declared space; they must not
   generate new values in prose. This is what makes criterion 3
   testable.

### 10.1 Candidate extensions under consideration

The following extensions are not yet admitted but potentially planned for future versions. 
Each requires further analysis of its leak surface, and each must be argued
individually against all five criteria above; presence on this
list is not a commitment to admission. Upon admission, a
candidate migrates from §10 into §2 (with its own subsection),
gains formal grammar in §6.7, and the schema version bumps.

#### E-SIM: Simulation result

**Form:** `(simulated, from model `M`, parameters `P`, run `R`)`.

**Source requirements:** Model `M` must be declared in a new
frontmatter `models:` field with an identifier, a specification
reference (published code, mathematical specification, or both),
and a parameter schema. Parameters `P` must conform to the
schema. Run identifier `R` must be reproducible from `M` and `P`.

**Status:** Strong case from the expressivity pilot (Documents 2,
4, and 5 all required this register). No remaining design
objection beyond the standard leak-surface review.

#### E-AGG: Statistical aggregate

**Form:** `(aggregated, from dataset `D`, method `M`, n=N)`.

**Source requirements:** Dataset `D` must be declared in a new
frontmatter `datasets:` field with a schema reference. Method
`M` must be a named statistical procedure from a published
catalogue. N is the sample size.

**Status:** Useful in surveillance and characterization
registers. Leak-surface review pending.

#### E-HYP: Bracketed causal hypothesis

**Form:**
`(hypothesis, candidate `H`, from `[premise-refs]`, distinguishable-from `[other-candidate]`)`.

**Source requirements:** Candidate `H` must be drawn from the
document's `hypothesis_space:` frontmatter field, which
enumerates the admissible candidates for the phenomenon under
discussion. Each candidate has an identifier, a short
declarative form (itself a valid Beyond CNL clause), and a
non-empty `discriminates_via:` field listing one or more
measurements or derivations that would distinguish it from at
least one other candidate.

**Linter rule (E-HYP-1):** Every E-HYP tag's candidate
identifier must resolve in `hypothesis_space:`. Bare candidate
text in prose fails.

**Linter rule (E-HYP-2):** Either the `distinguishable-from`
argument must name another candidate from the same space, OR
the document must contain at least one E-DER clause whose
premise list includes this E-HYP candidate and whose conclusion
is a falsifiable prediction (a measurement-class claim). Bare
hypothesis without either a sibling candidate or a derivable
prediction fails.

**Linter rule (E-HYP-3):** Hypothesis candidates must be declared
with non-overlapping discriminating tests where possible. Two
candidates with identical `discriminates_via:` lists trigger a
warning (they are operationally indistinguishable and the
hypothesis space is malformed).

**Discussion against the five criteria:**

- *Criterion 1 (no personal commitment):* The candidate is drawn
  from a published enumeration, not introduced by the author.
  The clause asserts that the candidate is *one of* the
  enumerated explanations supported by the cited premises, not
  that the author believes it. The natural-English reader may
  still parse it as belief; the structural marker discourages
  this and the linter prevents the language drift that would
  normalize it.
- *Criterion 2 (verifiable source/premise chain):* Premise
  references are mandatory and resolve through the same R-4
  mechanism as E-DER.
- *Criterion 3 (non-interference):* Two authors with identical
  data and identical `hypothesis_space:` declarations will
  produce the same set of compatible candidates (modulo
  enumeration order). If they select *different* candidates from
  the same space, the divergence reveals a measurement gap, not
  an identity leak. Free-form hypothesis generation would fail
  this criterion; the enumeration requirement is what saves it.
- *Criterion 4 (deterministic linting):* All checks are
  structural (frontmatter resolution, premise resolution,
  sibling/prediction presence). No semantic understanding is
  required of the linter.
- *Criterion 5 (enumerable value space):* The `hypothesis_space:`
  field is the enumeration. Authors cannot bypass it.

**Conjecture-and-test loop:** E-HYP alone enables authors to
state a hypothesis; the full conjecture-and-test cycle closes
only when E-HYP is combined with careful use of E-DER and E-MSR:
E-HYP declares the candidate, E-DER derives what each candidate
*predicts* about a future measurement, E-MSR records the test
outcome, and a further E-DER attributes the outcome back to the
supported candidate. E-HYP would therefore be a necessary but not
sufficient ingredient for the loop; the loop's closure would remain
a discipline of authorship rather than a language feature.

**To be determined**

- Whether E-HYP should be permitted only inside a dedicated
  `## Hypotheses` section (analogous to the `## Procedure`
  placement rule for E-PRO), so that hypothesis content is
  structurally segregated from observation and derivation.

---

*End of Evidential System and Grammar specification v0.2.*
