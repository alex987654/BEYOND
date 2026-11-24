# BEYOND

BEYOND CNL - A method-only controlled subset of English when the constraint is to make communication safer for the sender when the recipient may be vastly more capable than the sender.

Beyond is designed with the goal of significantly limiting leakage of sender identity, values, intentions, or capabilities in messages and documents written in it. Every sentence carries a mandatory evidential tag tracing the claim to an instrument, derivation, definition, simulation, aggregate, hypothesis space, cited record, or procedure.

## Why

When the recipient of a message may have arbitrarily high intelligence, any disclosed information about the sender — who they are, where they live, what they value, what they can or cannot do — becomes a potential vulnerability for the sender. BEYOND CNL removes the vocabulary of disclosure from the grammar and lexicon itself, so that safe communication only requires continued use of this method-only language.

The language applies wherever the sender benefits from conveying *what instruments do and what they measured* while concealing *who placed them, where they came from, and what they want*: long-duration archive markers, AI-to-unknown-AI handshakes if capabilities may be vastly different, sensor networks, etc.
Some consistency checks were performed with AI. This project is a work in progress. For more details about the thought process behind BEYOND CNL, review [BACKGROUND](BACKGROUND.md).

## Design

Beyond CNL synthesizes six separate design ideas into one stack:

| Design Layer                 | Inspiration                 | Contribution                                                 |
|------------------------------|-----------------------------|--------------------------------------------------------------|
| Software security            | Saltzer-Schroeder (1975)    | Default-deny, complete mediation, fail-safe rejection        |
| Structural typing            | Markdown                    | Headers, blockquotes, code blocks carry fixed semantic roles |
| Mandatory evidentials        | Lojban                      | Every assertion declares its epistemic basis                 |
| Copula ban                   | E-Prime                     | Blocks identity predication — no form of "to be" exists      |
| Procedural register          | ASD-STE100                  | Short sentences, one-word-one-meaning, imperative-led procedures |
| Deterministic interpretation | Attempto Controlled English | Every parsable sentence has exactly one logical reading      |

**Design target (Goguen-Meseguer non-interference):** two authors with identical procedures but different identities, different values, and different intentions produce the same identical Beyond CNL documents.

## What the Language Removes

- All forms of "to be" (am, is, are, was, were, be, been, being)
- First-person singular pronouns (I, me, my, mine)
- Proper nouns of groups, nations, species, or locations
- Propositional-attitude verbs (believe, want, intend, hope, fear)
- Evaluative adjectives (good, bad, important, beautiful)
- Suasive verbs (ask, suggest, recommend, demand)
- Deontic modals (should, ought, must)
- Epistemic hedges (might, may, could)
- Metaphor, idiom, interjections, exclamation marks

## What the Language Requires

- An evidential tag on every declarative clause: ``(measured, instrument `RX-4`, 1-sigma)``, ``(derived, from `MSR-4.2`, `DEF-1.1`)``, ``(simulated, from model `MOD-1`, parameters `PAR-1`, run `RUN-1`)``, `(procedure, step 3)`
- YAML frontmatter declaring `schema: beyond-cnl-v0.4`, purpose, phase, instruments, references, technical names, conditions, models, parameter sets, simulation runs, datasets, methods, and hypothesis space entries
- Markdown structural typing: ordered lists for procedures, blockquotes for observations, fenced code blocks for definitions, constraints, measurements, simulations, aggregations, and relations
- Sense-pinned vocabulary: several thousand core words, each with one spelling, one part of speech, and only one approved meaning

## Repository Contents

| File                                   | Description                                                  |
|----------------------------------------|--------------------------------------------------------------|
| `SKILL.md`                  | Complete teaching reference for LLMs and human authors — rules, verb list, pitfalls, examples, quick reference card |
| `beyond_cnl_COMPANION_LEXICON.md`      | Companion vocabulary — nouns, adjectives, adverbs, function words, all sense-pinned |
| `Beyond CNL Evidential System.md`      | Evidential system specification — nine E-tag types, enforcement architecture, frontmatter schema |
| `Beyond CNL Lexicon.md`            | Full consolidated lexicon (single-source reference, all word classes) |
| `Beyond-CNL-Linter.html (and .js files)` | Grammar and lexicon checker for Beyond CNL text                 |
| `tests/`                               | Linter and lexicon consistency tests (run `node --test`)     |

## Links

- [Linter](https://alex987654.github.io/BEYOND/Beyond-CNL-Linter.html)
- [Evidential System](https://github.com/alex987654/BEYOND/blob/main/Beyond%20CNL%20Evidential%20System.md)
- [Lexicon](https://github.com/alex987654/BEYOND/blob/main/Beyond%20CNL%20Lexicon.md)

## Example

A compliant observation:


```
> The signal amplitude at 1420.405 mega hertz decreased by 3.1 decibel
> over a 24-hour window (measured, instrument `Oort-RX-4`).
```

A non-compliant message:

```
We, the people of Earth, seek friendship and understanding.
We usually come in peace and wish to share our knowledge.
```

The sentence leaks identity, location, intent, values, and capability. In Beyond CNL, it would reduce to empty output. That empty output represents the potential information-hazard cost.
