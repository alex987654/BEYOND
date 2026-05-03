# BEYOND
BEYOND CNL - A method-only controlled subset of English when the constraint is to make communication safer for the sender when the recipient may be vastly more capable than the sender.

Beyond is designed so that messages and documents written in it cannot leak identity, values, intentions, or capabilities. Every sentence carries a mandatory evidential tag tracing the claim to an instrument, a derivation, or a definition. 

## Why

When the recipient of a message may have arbitrarily high intelligence, any disclosed information about the sender — who they are, where they live, what they value, what they can or cannot do — becomes a potential vulnerability for the sender. Beyond CNL removes the vocabulary of disclosure from the grammar and lexicon itself, so that safe communication only requires continued use of this method-only language.

The language applies wherever the sender benefits from conveying *what instruments do and what they measured* while concealing *who placed them, where they came from, and what they want*: autonomous probe markers, first-contact protocols, deep-space beacons, AI-to-unknown-AI handshakes, long-duration archive markers, and perhaps sensor networks.

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

**Core property (Goguen-Meseguer non-interference):** two authors with identical procedures but different identities, different values, and different intentions produce the same identical Beyond CNL documents. 

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

- An evidential tag on every declarative clause: `(measured, instrument RX-4, 1-sigma)`, `(derived, from MSR-4.2, DEF-1.1)`, `(procedure, step 3)`
- YAML frontmatter declaring schema version, purpose, phase, instruments, references, and technical names
- Markdown structural typing: ordered lists for procedures, blockquotes for observations, fenced code blocks for definitions and constraints
- Sense-pinned vocabulary: several thousand core words, each with one spelling, one part of speech, and only one approved meaning

## Repository Contents

| File                                   | Description                                                  |
|----------------------------------------|--------------------------------------------------------------|
| `beyond_cnl_SKILL.md`                  | Complete teaching reference for LLMs and human authors — rules, verb list, pitfalls, examples, quick reference card |
| `beyond_cnl_COMPANION_LEXICON.md`      | Companion vocabulary — nouns, adjectives, adverbs, function words, all sense-pinned |
| `Beyond CNL Evidential System.md`      | Evidential system specification — six E-tag types, enforcement architecture, frontmatter schema |
| `beyond_cnl_lexicon_v03.md`            | Full consolidated lexicon (single-source reference, all word classes) |
| `Beyond-CNL-Linter.html (and .js files)` | Grammar and lexicon checker for Beyond CNL                   |

## Links

* [Linter](https://alex987654.github.io/BEYOND/Beyond-CNL-Linter.html)
* [Evidential System](https://github.com/alex987654/BEYOND/blob/main/Beyond%20CNL%20Evidential%20System.md)
* [Lexicon](https://github.com/alex987654/BEYOND/blob/main/beyond_cnl_lexicon_v03.md)

## Example

A compliant observation:

```
> The signal amplitude at 1420.405 MHz decreased by 3.1 ± 0.02 dB
> over a 24-hour window (measured, instrument Oort-RX-4).
```

A non-compliant message:

```
We, the people of Earth, seek friendship and understanding.
We usually come in peace and wish to share our knowledge.
```

The sentence leaks identity, location, intent, values, and capability. In Beyond CNL, it would reduce to empty output. That empty output represents the potential information-hazard cost.


