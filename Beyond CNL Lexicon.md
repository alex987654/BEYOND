# BEYOND CNL: Complete Sense-Pinned Lexicon

## Version 0.4.2 — Single-Source Reference


---

## 1. Lexicon Rules

### 1.1 Sense-pinning discipline

Every word has exactly one entry with: one approved spelling,
one part of speech, one approved meaning, one approved
transitivity (for verbs), one approved countability (for nouns).

Approved inflections are drawn from the closed set:
`-s`, `-ed`, `-ing` (only for permitted verb forms as defined
in the evidential system companion document), `-er`, `-est`
(comparatives), `-ly` (manner adverbs from approved adjectives).

If a word has multiple common English meanings, only one is
admitted. The others are served by different approved words.

### 1.2 The copula ban (E-Prime)

Permanently excluded: `am`, `is`, `are`, `was`, `were`, `be`,
`been`, `being`, `'m`, `'re`, `'s` (copula), `isn't`, `aren't`,
`wasn't`, `weren't`, `ain't`.

No synonym may perform the copula's identity function.

### 1.3 Technical Name escape mechanism

Words not in the core lexicon may appear as Technical Names if:
(1) first occurrence in **bold** with a `definition` code block;
(2) subsequent uses in `inline code`; (3) one POS, one meaning;
(4) nouns only — no verbs or adjectives; (5) registered in YAML
frontmatter.

### 1.4 Banned word classes

| Banned class | Reason |
|---|---|
| Copula forms | Identity disclosure |
| First-person singular (`I`, `me`, `my`, `mine`, `myself`) | Identity disclosure |
| Identity-constructing plurals (`we` as "we humans") | Identity disclosure |
| Proper nouns of groups | Identity / location |
| Propositional-attitude verbs (`believe`, `want`, `intend`, `prefer`, `hope`, `fear`, `wish`, `desire`, `expect`, `assume` in "suppose" sense, `suspect`, `feel` mental, `think` opinion, `mean` intend) | Intent / value |
| Evaluative adjectives (`good`, `bad`, `beautiful`, `important`, `right`, `wrong`, etc.) | Value disclosure |
| Suasive verbs (`ask`, `beg`, `demand`, `insist`, `propose`, `recommend`, `suggest`, `urge`) | Coercion / intent |
| Deontic modals (`should`, `ought`, `must` obligation) | Value imposition |
| Epistemic hedging modals (`might`, `may` possibility, `could` speculation) | Leaks cognitive architecture |
| Intensifiers (`very`, `really`, `truly`, `totally`, `absolutely`) | Expressive |
| Stance adverbs (`frankly`, `surprisingly`, `obviously`, `unfortunately`) | Attitude disclosure |
| Interjections (`oh`, `wow`, `alas`, `hello`, `goodbye`) | Affect disclosure |
| Affect nouns (`joy`, `sorrow`, `anger`, `love`, `hate`, `pride`, `shame`) | Affect disclosure |
| Metaphor markers (`like` comparison, `as if`, `as though`) | Leaks cognitive architecture |
| Purposive/causal subordinators (`so that`, `in order to`, `because`, purposive `so`) | Intent / teleology |

### 1.5 Validation criteria

A word belongs in the lexicon if and only if:

1. It has exactly one approved meaning serving a procedural or
   observational purpose.
2. It cannot disclose identity, intent, value, capability, or
   location of Local Agents.
3. It does not perform the copula function.
4. It does not express propositional attitude.
5. It does not evaluate, judge, or rank.
6. Its removal creates an unfillable gap within the 25-word
   sentence limit.
7. Its inclusion does not create synonymy enabling sense-evasion.

---

## 2. Noun Consolidation: Drops and Resolutions

### Dropped nouns (29)

| Dropped | Reason | Use instead |
|---|---|---|
| `vessel` | overlaps `container` and vehicle sense | `container`; `transportation` + `device` |
| `apparatus` | overlaps `device`, `instrument`, `equipment` | `device`, `instrument` |
| `machine` | overlaps `device`, `engine`, `mechanism` | `device`, `engine` |
| `fitting` | overlaps `connector`, `joint` | `connector`, `joint` |
| `fixture` | overlaps `mount`, `bracket` | `mount`, `bracket` |
| `hood` | overlaps `cover`, `shield` | `cover`, `shield` |
| `lining` | overlaps `layer` | `layer` |
| `mat` | overlaps `pad`, `cushion` | `pad` |
| `trim` | overlaps `strip`, `edge` | `strip` |
| `spur` | overlaps `extension` | verb `extend` |
| `well` | overlaps `hole`, `reservoir` | `hole`, `reservoir` |
| `pan` | overlaps `basin`, `tray` | `basin`, `tray` |
| `amount` | overlaps `quantity` | `quantity` |
| `duplicate` | overlaps `copy`, `replica` | `copy`, `replica` |
| `collection` | overlaps `set`, `group` | `set`, `group` |
| `accuracy` (abstract) | duplicates measurement section | keep in Measurement |
| `density` (abstract) | duplicates measurement section | keep in Measurement |
| `depth` (abstract) | duplicates measurement section | keep in Measurement |
| `delay` (abstract) | duplicates process section | keep in Process |
| `entry` (abstract) | duplicates process section | keep in Process |
| `exception` (abstract) | duplicates process section | keep in Process |
| `factor` (abstract) | duplicates measurement section | keep in Measurement |
| `fraction` (abstract) | duplicates measurement section | keep in Measurement |
| `frequency` (abstract) | duplicates measurement section | keep in Measurement |
| `length` (abstract) | duplicates measurement section | keep in Measurement |
| `ratio` (abstract) | duplicates measurement section | keep in Measurement |
| `plaintext` | synonym of `cleartext` | `cleartext` |
| `fundamental` (arts noun) | overlaps `ground-state` | `ground-state` |
| `craft` | primary sense evaluative-adjacent | `transportation` + `device` |

---

## 3. Function Words (137)

### Articles and demonstratives (6)

`a`, `an`, `the`, `this`, `that`, `each`

### Quantifiers and determiners (18)

`all`, `any`, `both`, `either`, `enough`, `every`, `few`,
`many`, `more`, `most`, `much`, `neither`, `no` (determiner),
`none`, `other`, `several`, `some`, `such`

### Prepositions (32)

`about`, `above`, `across`, `after`, `against`, `along`,
`among`, `around`, `at`, `before`, `behind`, `below`,
`beneath`, `beside`, `between`, `beyond`, `by`, `down`,
`during`, `for`, `from`, `in`, `into`, `near`, `of`, `off`,
`on`, `out`, `over`, `through`, `to`, `under`

### Conjunctions (10)

`and`, `or`, `nor`, `but`, `yet`, `if`, `then`,
`unless`, `until`, `while`

Removed in v0.4: `so`, `because`. Causal/purposive linkage routes
through the E-PRO `for` slot or E-DER; logical consequence remains
via `therefore` and E-DER `follows`.

### Relative and interrogative (8)

`who`, `which`, `that` (relative), `what`, `where`, `when`,
`how`, `whether`

### Pronouns — permitted subset (12)

`it`, `its`, `they`, `them`, `their`, `themselves`,
`one` (impersonal), `ones`,
`this`, `that`, `these`, `those` (pronominal)

Note: `we` admitted only in impersonal procedural sense.
Linter flags `we` + any banned verb pattern. `I`, `me`, `my`,
`mine` excluded.

### Negation (4)

`not`, `no` (adverbial), `never`, `without`

### Temporal connectives (14)

`after`, `before`, `currently`, `during`, `finally`, `first`,
`formerly`, `last`, `next`, `now`, `previously`, `simultaneously`,
`then`, `subsequently`

### Logical and conditional (8)

`if`, `then`, `else`, `only`, `also`, `therefore`, `however`,
`provided`

### Degree and precision (12)

`approximately`, `at least`, `at most`, `below`, `between`,
`equal`, `exactly`, `fully`, `greater`, `less`, `partially`,
`within`

### Existence and presence (5)

`there` (locative only), `here`, `present`, `absent`, `available`

### Miscellaneous function (8)

`as` (role: "as a precondition"), `per`, `plus`, `minus`,
`times`, `via`, `with`, `versus`

---

## 4. Method-Only Verbs (325 unique)

Each verb has one approved sense. Transitivity: (tr) transitive,
(intr) intransitive, (both) either.

### Procedure — physical action (81)

| Verb | Tr | Sense pin |
|---|---|---|
| `activate` | tr | cause to begin operating |
| `adjust` | tr | change setting of |
| `align` | tr | bring into line with reference |
| `apply` | tr | put onto surface or put into effect |
| `assemble` | tr | put parts together |
| `attach` | tr | join one thing to another |
| `bend` | tr | change angle of |
| `block` | tr | prevent passage through |
| `break` | tr | separate into parts by force |
| `build` | tr | construct from parts |
| `calibrate` | tr | adjust to match a known standard |
| `carry` | tr | transport from one location to another |
| `clean` | tr | remove contaminants from |
| `close` | tr | move to stop flow or access |
| `compress` | tr | reduce volume of by force |
| `connect` | tr | join so that signal or material passes |
| `construct` | tr | build by assembling components according to a plan |
| `cool` | tr | reduce temperature of |
| `cover` | tr | place over the surface of |
| `cut` | tr | separate by edged tool |
| `deactivate` | tr | cause to stop operating |
| `decrease` | tr | make smaller in quantity |
| `destroy` | tr | reduce to non-functional state by applying force or energy |
| `detach` | tr | separate one thing from another |
| `disconnect` | tr | break connection of |
| `drain` | tr | remove liquid from |
| `dry` | tr | remove moisture from |
| `empty` | tr | remove all contents from |
| `expand` | tr | increase volume of |
| `extend` | tr | make longer |
| `fasten` | tr | secure in position |
| `fill` | tr | put contents into until capacity |
| `filter` | tr | pass through selective barrier |
| `flatten` | tr | make flat |
| `fold` | tr | bend over onto itself |
| `form` | tr | give shape to |
| `heat` | tr | increase temperature of |
| `hold` | tr | keep in fixed position |
| `increase` | tr | make larger in quantity |
| `insert` | tr | put into |
| `install` | tr | put into position for use |
| `join` | tr | connect two or more parts |
| `lift` | tr | move upward |
| `load` | tr | put contents into carrier |
| `lock` | tr | secure against movement or access |
| `loosen` | tr | make less tight |
| `lower` | tr | move downward |
| `mix` | tr | combine into uniform composition |
| `mount` | tr | fix onto support structure |
| `move` | tr | change position of |
| `open` | tr | move to allow flow or access |
| `pack` | tr | place compactly into container |
| `place` | tr | put at a location |
| `position` | tr | set at specific coordinates |
| `pour` | tr | cause liquid to flow from container |
| `press` | tr | apply force to surface of |
| `pull` | tr | apply force toward self on |
| `push` | tr | apply force away from self on |
| `raise` | tr | move upward |
| `release` | tr | stop holding |
| `remove` | tr | take away from location |
| `repair` | tr | restore to working condition |
| `replace` | tr | put new in place of old |
| `reshape` | tr | change form of |
| `rotate` | tr | turn around axis |
| `seal` | tr | close to prevent passage |
| `separate` | tr | divide into parts |
| `set` | tr | adjust to specified value |
| `shorten` | tr | make shorter |
| `shrink` | intr | decrease in spatial extent |
| `split` | tr | divide into two or more parts |
| `stabilize` | tr | bring to steady state |
| `straighten` | tr | make straight |
| `stretch` | tr | extend by pulling |
| `tighten` | tr | make more tight |
| `transfer` | tr | move from one location or system to another |
| `turn` | tr | rotate partially |
| `unfasten` | tr | release from fastened position |
| `unload` | tr | remove contents from carrier |
| `unlock` | tr | release from locked state |
| `wrap` | tr | enclose by winding cover around |

### Procedure — information and control (65)

| Verb | Tr | Sense pin |
|---|---|---|
| `add` | tr | include in set or sum |
| `allocate` | tr | assign portion of resource |
| `archive` | tr | store for long-term retention |
| `assign` | tr | designate for role or value |
| `calculate` | tr | determine by mathematical operation |
| `cancel` | tr | revoke previously issued instruction |
| `categorize` | tr | place into defined class |
| `change` | tr | make different from current state. Note: also intransitive observation sense; linter distinguishes by frame |
| `check` | tr | examine for compliance with specification |
| `classify` | tr | assign to category |
| `clear` | tr | remove all data from |
| `combine` | tr | put together into one |
| `compare` | tr | examine for differences and similarities |
| `compute` | tr | perform calculation on |
| `configure` | tr | set parameters of system |
| `confirm` | tr | verify that condition holds |
| `convert` | tr | change from one form to another |
| `copy` | tr | make duplicate of |
| `count` | tr | determine number of |
| `create` | tr | bring into existence by procedure |
| `define` | tr | state the meaning of term |
| `delete` | tr | remove from record |
| `derive` | tr | obtain by logical or mathematical operation from |
| `designate` | tr | assign identifier to |
| `disable` | tr | prevent from operating |
| `distribute` | tr | allocate across recipients |
| `divide` | tr | separate into equal or specified parts |
| `enable` | tr | allow to operate |
| `enter` | tr | input data into system |
| `erase` | tr | remove recorded data from |
| `estimate` | tr | determine approximate value of |
| `evaluate` | tr | determine numerical value of expression |
| `execute` | tr | carry out instruction |
| `format` | tr | arrange data according to specification |
| `generate` | tr | produce by automatic process |
| `group` | tr | organize into sets |
| `identify` | tr | determine which item matches specification |
| `index` | tr | create ordered reference to |
| `initialize` | tr | set to starting state |
| `label` | tr | attach identifier to |
| `list` | tr | enumerate items of |
| `log` | tr | record in append-only store |
| `map` | tr | establish correspondence between sets |
| `mark` | tr | place indicator on |
| `merge` | tr | combine two ordered sets into one |
| `modify` | tr | change specified property of |
| `multiply` | tr | perform multiplication on |
| `normalize` | tr | scale to standard range |
| `number` | tr | assign sequential identifier to |
| `organize` | tr | arrange according to system |
| `process` | tr | apply defined sequence of operations to |
| `program` | tr | enter instructions into |
| `read` | tr | obtain data from source |
| `record` | tr | store observation in persistent form |
| `reset` | tr | return to initial state |
| `retrieve` | tr | obtain from storage |
| `run` | tr | execute procedure or test |
| `save` | tr | write to persistent storage |
| `select` | tr | choose item matching criterion |
| `sort` | tr | arrange in specified order |
| `store` | tr | place in location for later retrieval |
| `subtract` | tr | remove quantity from |
| `update` | tr | change to reflect current state |
| `verify` | tr | confirm by independent check |
| `write` | tr | output data to destination |

### Observation and measurement (47)

| Verb | Tr | Sense pin |
|---|---|---|
| `appear` | intr | present to observation as |
| `approach` | both | move closer to; or come nearer to a value |
| `cease` | intr | stop occurring |
| `converge` | intr | approach common value |
| `correlate` | intr | vary together with |
| `cross` | tr | pass through threshold |
| `decay` | intr | decrease progressively; or undergo spontaneous transformation to lower energy state |
| `decline` | intr | decrease in measured value |
| `detect` | tr | register presence of |
| `differ` | intr | have different measured value from |
| `diminish` | intr | become smaller |
| `disappear` | intr | cease to register on instrument |
| `diverge` | intr | move apart in value |
| `emerge` | intr | become detectable |
| `exceed` | tr | surpass threshold value |
| `fall` | intr | decrease in value |
| `fluctuate` | intr | vary irregularly |
| `follow` | tr | come after in sequence |
| `grow` | intr | increase in measured quantity |
| `happen` | intr | take place at time |
| `indicate` | tr | show on display or instrument |
| `last` | intr | persist for duration |
| `match` | tr | correspond to within tolerance |
| `measure` | tr | determine quantity of by instrument |
| `observe` | tr | register through sensor or instrument |
| `occur` | intr | take place |
| `oscillate` | intr | vary periodically |
| `pass` | tr | move through or beyond |
| `peak` | intr | reach maximum value |
| `persist` | intr | continue without change |
| `precede` | tr | come before in sequence |
| `produce` | tr | yield as output |
| `reach` | tr | arrive at value or location |
| `register` | tr | show reading on instrument |
| `remain` | intr | continue in current state |
| `repeat` | intr | occur again |
| `reproduce` | tr | generate same result independently |
| `respond` | intr | change following stimulus |
| `result` | intr | follow as consequence |
| `return` | intr | go back to previous value |
| `rise` | intr | increase in value |
| `saturate` | intr | reach maximum capacity |
| `shift` | intr | change position or value |
| `show` | tr | display on readout |
| `spread` | intr | extend over larger area or range |
| `stabilize` | intr | reach steady state (intransitive observation sense) |
| `vary` | intr | change in value over parameter |

### Communication and documentation (22)

| Verb | Tr | Sense pin |
|---|---|---|
| `acknowledge` | tr | confirm receipt of |
| `amend` | tr | make specified change to document |
| `announce` | tr | make available to all parties |
| `cite` | tr | reference previous record |
| `confirm` | tr | state that check passed |
| `correct` | tr | change to accurate value |
| `declare` | tr | state formally in record |
| `deny` | tr | state that statement fails verification |
| `describe` | tr | state observable properties of |
| `disclose` | tr | make information available |
| `document` | tr | create record of |
| `notify` | tr | send information to specified party |
| `post` | tr | make available in public record |
| `publish` | tr | release for general access |
| `reference` | tr | point to location of prior record |
| `report` | tr | present findings in structured form |
| `retract` | tr | withdraw previous statement |
| `revise` | tr | produce updated version of |
| `specify` | tr | state precise requirements for |
| `state` | tr | express in declarative sentence |
| `submit` | tr | deliver for review |
| `transmit` | tr | send via channel |

### State and control (31)

| Verb | Tr | Sense pin |
|---|---|---|
| `allow` | tr | permit by rule |
| `begin` | intr | start |
| `complete` | tr | finish all steps of |
| `conceal` | tr | prevent from being detected |
| `contain` | tr | hold within boundary |
| `continue` | intr | persist in current operation |
| `control` | tr | regulate state of |
| `depend` | intr | require as precondition |
| `end` | intr | stop |
| `exist` | intr | have presence in specified domain |
| `fail` | intr | not meet specification |
| `finish` | tr | complete |
| `fit` | intr | conform to dimensional specification |
| `function` | intr | operate as specified |
| `halt` | intr | stop all operation |
| `include` | tr | have as component |
| `lack` | tr | not have |
| `limit` | tr | constrain range of |
| `need` | tr | require as input |
| `operate` | intr | function within specification |
| `pause` | intr | temporarily stop |
| `prevent` | tr | stop from occurring |
| `prohibit` | tr | forbid by rule |
| `require` | tr | have as necessary condition |
| `restrict` | tr | limit to subset |
| `resume` | intr | continue after pause |
| `reveal` | tr | make detectable |
| `start` | intr | begin operating |
| `stop` | intr | cease operating |
| `supply` | tr | provide as input |
| `support` | tr | bear load of or provide resource to |

### Movement and spatial (16)

| Verb | Tr | Sense pin |
|---|---|---|
| `advance` | intr | move forward |
| `arrive` | intr | reach destination |
| `circulate` | intr | move in closed path |
| `descend` | intr | move downward |
| `enter` | tr | move into (also information-input sense above) |
| `exit` | intr | move out of |
| `flow` | intr | move continuously as fluid |
| `orbit` | intr | move in closed path around |
| `propagate` | intr | travel through medium |
| `recede` | intr | move away from observer |
| `retract` | intr | move back (also communication sense above) |
| `rotate` | tr | see physical action |
| `travel` | intr | move from one location to another |
| `drift` | intr | move slowly without directed force |
| `accelerate` | both | increase velocity of (tr) / increase in velocity (intr) |
| `decelerate` | both | decrease velocity of (tr) / decrease in velocity (intr) |

### Logical and mathematical (17)

| Verb | Tr | Sense pin |
|---|---|---|
| `approximate` | tr | come close to in value |
| `assume` | tr | take as given for derivation — NOT "suppose" or "believe" |
| `bound` | tr | set upper or lower limit on |
| `constrain` | tr | limit by rule |
| `contradict` | tr | produce incompatible result with |
| `correspond` | intr | map one-to-one with |
| `demonstrate` | tr | show by derivation or experiment |
| `disprove` | tr | show to fail by test |
| `eliminate` | tr | remove from consideration by test |
| `entail` | tr | follow necessarily from |
| `equal` | tr | have same value as |
| `exclude` | tr | remove from set |
| `falsify` | tr | show to fail against data |
| `imply` | tr | follow from under given rules |
| `negate` | tr | form logical complement of |
| `satisfy` | tr | meet all conditions of |
| `solve` | tr | find value that satisfies formula |

### Sensory and detection (13)

| Verb | Tr | Sense pin |
|---|---|---|
| `absorb` | tr | take in energy or material |
| `amplify` | tr | increase signal strength of |
| `attenuate` | tr | reduce signal strength of |
| `capture` | tr | record incoming signal |
| `collect` | tr | gather samples or data |
| `emit` | tr | release energy or particles |
| `expose` | tr | subject to stimulus |
| `illuminate` | tr | direct light onto |
| `radiate` | intr | emit energy outward |
| `receive` | tr | accept incoming signal |
| `reflect` | tr | return incoming energy from surface |
| `scan` | tr | examine systematically across range |
| `sense` | tr | detect by instrument |

### Astronomy and astrophysics (7)

| Verb | Tr | Sense pin |
|---|---|---|
| `accrete` | intr | accumulate matter by gravitational attraction |
| `brighten` | intr | increase in luminous intensity |
| `dim` | intr | decrease in luminous intensity |
| `erupt` | intr | expel material suddenly from interior |
| `occult` | tr | pass in front of, blocking from observer's line of sight |
| `precess` | intr | rotate the orientation of an orbital or spin axis |
| `transit` | tr | pass across the disc of a larger body as seen by observer |

### Physics (8)

| Verb | Tr | Sense pin |
|---|---|---|
| `annihilate` | tr | convert matter and antimatter into energy |
| `collide` | intr | strike against another body |
| `conduct` | tr | transmit heat, electric current, or sound through a medium |
| `diffract` | intr | spread after passing through aperture or around obstacle |
| `excite` | tr | raise to a higher energy state |
| `insulate` | tr | prevent the passage of heat, electric current, or sound |
| `ionize` | tr | remove or add electrons to an atom or molecule |
| `polarize` | tr | restrict oscillation of a wave to a single plane |

### Chemistry (10)

| Verb | Tr | Sense pin |
|---|---|---|
| `catalyze` | tr | increase the rate of a reaction using a catalyst |
| `condense` | both | change from vapor to liquid |
| `corrode` | both | degrade a metal by chemical reaction |
| `crystallize` | both | form crystals from a solution or melt |
| `dilute` | tr | reduce the concentration of a solution by adding solvent |
| `dissolve` | tr | cause a solute to pass into solution |
| `evaporate` | both | change from liquid to vapor |
| `neutralize` | tr | react an acid with a base to remove reactive properties |
| `oxidize` | tr | cause to combine with oxygen or lose electrons |
| `synthesize` | tr | form a compound from simpler substances |

### Information theory (9)

| Verb | Tr | Sense pin |
|---|---|---|
| `decode` | tr | convert from encoded form to source form |
| `demodulate` | tr | extract information from a modulated carrier |
| `encode` | tr | convert from source form to channel form |
| `encrypt` | tr | transform data to prevent unauthorized reading |
| `modulate` | tr | vary a property of a carrier to encode information |
| `multiplex` | tr | combine multiple signals onto a single channel |
| `quantize` | tr | map continuous values to discrete levels |
| `sample` | tr | obtain a value of a signal at a specific time |
| `synchronize` | tr | bring two or more systems to a common time reference |

### Arts and fabrication (4)

| Verb | Tr | Sense pin |
|---|---|---|
| `etch` | tr | remove material from a surface by chemical or mechanical means to produce a pattern |
| `inscribe` | tr | mark characters or patterns permanently onto a surface |
| `project` | tr | cast light or an image onto a surface |
| `render` | tr | produce a visual representation from data or instructions |

---

## 5. Nouns (1084 unique)

All nouns below are organized by primary semantic category. Each
entry: **word** — sense pin. Hyphenated compound nouns are single
lexical entries.

### A. Physical Objects and Structures (210)

| Word | Sense pin |
|---|---|
| `angle` | corner formed where two lines or surfaces meet |
| `antenna` | device for transmitting or receiving electromagnetic signals |
| `area` | bounded two-dimensional extent of a surface |
| `arm` | elongated structural extension from a main body |
| `assembly` | set of parts joined together to form a functional unit |
| `axis` | straight line around which rotation occurs or along which symmetry holds |
| `bar` | rigid straight piece of material with uniform cross-section |
| `base` | lowest supporting part of a structure |
| `basin` | concave container open at the top |
| `beam` | long rigid structural member that resists bending |
| `bearing` | component that supports relative motion between parts |
| `blade` | flat cutting or mixing edge attached to a shaft or handle |
| `block` | solid piece of material with flat sides |
| `board` | flat rectangular panel of rigid material |
| `body` | main structural mass of a device or object |
| `bolt` | threaded fastener designed to pass through a hole and receive a nut |
| `boundary` | line or surface marking the limit of a region |
| `box` | rigid container with flat sides and a closable opening |
| `bracket` | angled support attaching one part to another |
| `bridge` | structure spanning a gap to allow passage |
| `bulkhead` | partition dividing an interior into compartments |
| `cable` | flexible assembly of wires or fibers enclosed in a sheath |
| `cage` | open framework enclosing a space |
| `cap` | cover that closes the end of a tube, opening, or container |
| `case` | outer enclosure protecting internal components |
| `center` | geometric midpoint of a region or body |
| `chain` | series of linked rigid elements |
| `chamber` | enclosed space within a device or structure |
| `channel` | elongated passage through which material or signals travel |
| `circuit` | closed path through which electric current or fluid flows |
| `clamp` | device that holds two or more parts together by applied pressure |
| `coil` | conductor or tube wound in a spiral or helix |
| `column` | vertical structural member that bears compressive load |
| `compass` | instrument or reference system for determining direction |
| `compartment` | enclosed subdivision within a larger space |
| `component` | individual part within a larger assembly |
| `conductor` | material or path through which electric current or heat flows readily |
| `cone` | solid or hollow body tapering from a circular base to a point |
| `connection` | physical or electrical junction between two parts |
| `connector` | device joining two conduits, cables, or pipes so that material or signal passes through |
| `container` | hollow object designed to hold material within its interior |
| `core` | central structural or functional region of a body |
| `corner` | point or region where two edges or surfaces meet at an angle |
| `cover` | removable piece placed over an opening or surface for protection |
| `cross-section` | shape exposed when a body is cut by a plane |
| `cube` | solid body with six equal square faces |
| `curtain` | flexible sheet hung to divide or shield a space |
| `cushion` | flexible pad that absorbs impact or vibration |
| `cylinder` | solid or hollow body with circular cross-section and straight sides |
| `detector` | device that registers the presence or intensity of a physical quantity |
| `device` | constructed object designed to perform a specific function |
| `dial` | circular graduated face with a movable indicator |
| `diameter` | straight line passing through the center of a circle or sphere, or its length |
| `disc` | flat circular object |
| `dome` | curved surface forming the upper boundary of an enclosed space |
| `door` | hinged or sliding panel that opens and closes an entrance |
| `drain` | opening or channel through which liquid exits |
| `drum` | cylindrical container, usually with flat ends |
| `duct` | enclosed passage for conveying air, fluid, or wiring |
| `edge` | line where two surfaces of a solid meet |
| `enclosure` | structure that surrounds and contains |
| `engine` | device that converts stored energy into mechanical motion |
| `equipment` | set of devices assembled for a particular operation |
| `exterior` | outer surface or region of a body |
| `face` | flat surface of a solid body |
| `fastener` | device that holds two or more parts together (general term for bolts, screws, clips) |
| `fiber` | (structure sense) thin elongated thread of material |
| `filament` | very thin wire or thread, especially one that carries current or emits radiation |
| `film` | thin continuous layer of material on a surface |
| `fin` | thin flat projection used for heat transfer or aerodynamic control |
| `flange` | projecting rim used for attachment or strengthening |
| `flap` | hinged or flexible panel that opens and closes |
| `floor` | lower horizontal surface of an enclosed space |
| `frame` | rigid skeleton that supports and shapes a structure |
| `funnel` | conical device that guides material into a narrow opening |
| `gap` | space between two objects or surfaces |
| `gasket` | flexible seal placed between mating surfaces to prevent leakage |
| `gate` | movable barrier that controls access to a passage |
| `gauge` | instrument that displays a measured quantity on a scale |
| `gear` | toothed wheel that transmits rotary motion |
| `grid` | network of uniformly spaced lines or bars |
| `groove` | long narrow channel cut into a surface |
| `guard` | protective barrier preventing contact with a hazard |
| `guide` | surface or rail that constrains motion to a defined path |
| `handle` | part designed to be grasped by a hand or manipulator |
| `hatch` | opening in a floor, wall, or hull with a closable cover |
| `header` | manifold or pipe connecting multiple branches |
| `heater` | device that converts energy to heat |
| `hinge` | joint allowing rotation around a single axis |
| `hole` | opening through a solid body |
| `hook` | curved piece for catching, holding, or pulling |
| `hose` | flexible tube for conveying fluid |
| `housing` | protective enclosure surrounding a mechanism |
| `hub` | central part of a wheel, rotor, or network from which branches extend |
| `hull` | outer structural shell of a transportation device or container |
| `indicator` | device that shows a state or value by visible or audible means |
| `inlet` | opening through which material enters |
| `insert` | part placed inside another to fill, strengthen, or modify it |
| `instrument` | device designed for precise measurement or observation |
| `insulation` | material that reduces transfer of heat, electricity, or sound |
| `interior` | inner region of a body or enclosure |
| `jack` | device that raises or supports a load from below |
| `joint` | connection where two rigid parts meet, allowing or preventing relative motion |
| `junction` | point where two or more paths, wires, or pipes meet |
| `key` | shaped piece that locks, aligns, or actuates a mechanism |
| `knob` | rounded projection used for gripping or adjusting |
| `lamp` | device that produces light |
| `layer` | single thickness of material spread over or between surfaces |
| `lens` | shaped transparent body that bends light to converge or diverge |
| `lever` | rigid bar that pivots on a fulcrum to transmit force |
| `lid` | removable cover for the top of a container |
| `line` | elongated mark, wire, pipe, or path |
| `link` | single element in a chain or the connection between two nodes |
| `lip` | projecting edge at the rim of an opening or container |
| `loop` | curved or circular path that closes on itself |
| `magnet` | body that produces a magnetic field and attracts ferromagnetic material |
| `manifold` | fitting with multiple ports connecting one passage to several |
| `membrane` | thin flexible sheet that separates regions or selectively passes material |
| `mesh` | network of interlocked or woven strands with open spaces between them |
| `mirror` | surface that reflects light with minimal scattering |
| `module` | self-contained unit that connects to a larger system |
| `motor` | device that converts electrical energy to mechanical motion |
| `mount` | support structure that holds a component in a fixed position |
| `nozzle` | shaped opening that directs or accelerates a flow |
| `nut` | internally threaded fastener that mates with a bolt |
| `opening` | gap or hole allowing passage |
| `outlet` | opening through which material exits |
| `pad` | flat piece of soft material used for protection, cushioning, or cleaning |
| `panel` | flat section of a wall, enclosure, or control surface |
| `partition` | dividing wall or barrier within an enclosure |
| `patch` | small piece of material applied over a surface for repair or modification |
| `path` | defined route along which movement or transmission occurs |
| `pillar` | vertical structural member, typically cylindrical |
| `pin` | thin rigid rod used for fastening, alignment, or pivoting |
| `pipe` | rigid tube for conveying fluid under pressure |
| `piston` | cylindrical piece that moves within a tube under fluid pressure |
| `plate` | flat rigid sheet of material |
| `platform` | flat raised surface on which operations or equipment are placed |
| `plug` | piece inserted into an opening to seal it or make a connection |
| `point` | location without spatial extent; or sharp tip |
| `pole` | long slender vertical support; or one end of a magnetic or electric axis |
| `port` | opening in a wall, hull, or device through which material or signal passes |
| `post` | upright structural member fixed at its base |
| `probe` | slender instrument inserted into a region to measure or sample |
| `pump` | device that moves fluid by mechanical action |
| `rack` | framework with rails or slots for holding items in order |
| `rail` | horizontal bar or track that guides or supports |
| `reflector` | surface shaped to redirect radiant energy |
| `relay` | device that opens or closes a circuit in response to a control signal |
| `reservoir` | container or natural formation that stores fluid |
| `ring` | circular band of rigid material |
| `rod` | straight rigid bar of circular cross-section |
| `roller` | cylindrical body that rotates to support or move a load |
| `roof` | upper enclosing surface of a structure |
| `rope` | thick flexible cord made of twisted fibers or wires |
| `rotor` | rotating component of a motor, turbine, or pump |
| `screen` | flat panel that displays information or blocks passage of selected material |
| `screw` | externally threaded fastener driven by rotation |
| `seal` | device or material that prevents leakage at a joint |
| `seat` | surface against which a part rests under load; or seating for a valve |
| `section` | portion obtained by cutting or dividing a larger body |
| `segment` | one of several parts into which something divides naturally |
| `sensor` | device that converts a physical quantity into a readable signal |
| `shaft` | long rotating rod that transmits torque |
| `sheath` | close-fitting protective covering around a cable or blade |
| `sheet` | thin flat piece of material with large area relative to thickness |
| `shelf` | horizontal flat surface attached to a wall or frame for holding items |
| `shell` | thin curved structure forming an outer enclosure |
| `shield` | barrier that blocks radiation, impact, or contamination |
| `shutter` | hinged or sliding panel that opens and closes to control passage of light |
| `slab` | thick flat piece of rigid material |
| `sleeve` | tube fitted over a shaft or rod |
| `slide` | flat surface or track along which a part moves linearly |
| `slot` | narrow elongated opening in a surface |
| `socket` | hollow fitting that receives and holds a mating part |
| `spacer` | piece placed between two parts to maintain a defined gap |
| `sphere` | solid body where every surface point is equidistant from the center |
| `spindle` | rotating shaft on which parts are mounted |
| `spring` | elastic device that stores energy when compressed or stretched and returns it when released |
| `stator` | stationary part of a motor, generator, or turbine |
| `stem` | narrow supporting shaft connecting a functional head to a base |
| `stop` | device or surface that limits travel of a moving part |
| `strap` | flat strip of flexible material used to bind, hold, or carry |
| `strip` | narrow flat piece of material |
| `strut` | rigid structural member that resists compressive force |
| `stud` | headless bolt threaded at both ends; or projecting pin |
| `support` | structure that bears the weight or load of another part |
| `surface` | outermost boundary of a body |
| `switch` | device that opens, closes, or redirects a circuit or path |
| `tab` | small projecting flap used for gripping, indexing, or attaching |
| `tank` | large container for storing fluid or gas |
| `terminal` | end point of an electrical conductor where connection is made |
| `tip` | extreme narrow end of an elongated object |
| `tool` | handheld or machine-mounted device used to perform a specific mechanical operation |
| `top` | uppermost surface or part |
| `tower` | tall narrow structure |
| `track` | rail, groove, or path along which something moves |
| `tray` | flat open-topped container for holding or carrying items |
| `tube` | hollow cylindrical body, open at one or both ends |
| `unit` | single complete functional item; or standard quantity for measurement |
| `valve` | device that controls flow by opening, closing, or partially obstructing a passage |
| `vent` | opening that allows gas or vapor to pass in or out |
| `wall` | vertical partition or enclosing surface |
| `washer` | flat ring placed under a nut or bolt head to distribute load |
| `wedge` | piece with two inclined faces meeting at a thin edge, used to split or tighten |
| `weight` | body of known mass used as a reference or to apply force |
| `wheel` | circular frame or disc that rotates on an axle |
| `window` | opening in a wall or enclosure that admits light or observation |
| `wing` | lateral extension from a main body providing lift or stability |
| `wire` | single strand of drawn metal |


### B. Materials and Substances (92)

Element-admission rule: a chemical element enters the core lexicon
only if it appears in general procedural, atmospheric, structural,
or aqueous contexts across domains (the elements listed below).
Domain-specialty elements (for example dopants and trace materials)
enter per document through the Technical Name escape mechanism
(§1.3). A document must not mix a bare core element name and a
backticked specialty element of the same role without declaring
the latter.

| Word | Sense pin |
|---|---|
| `acid` | substance that donates protons or accepts electron pairs in solution |
| `acidity` | measure of the concentration of protons in a solution |
| `adhesive` | substance applied to surfaces to bond them together |
| `air` | mixture of gases composing a planetary atmosphere at surface level |
| `alloy` | metallic material composed of two or more elements |
| `aluminum` | metallic element, atomic number 13 |
| `anode` | electrode at which oxidation occurs |
| `atmosphere` | layer of gas surrounding a celestial body, retained by gravity |
| `bond` | (chemistry sense) force of attraction holding atoms together in a molecule or crystal |
| `carbon` | nonmetallic element, atomic number 6 |
| `catalyst` | substance that increases the rate of a reaction without being consumed |
| `cathode` | electrode at which reduction occurs |
| `ceramic` | hard brittle material made by heating mineral compounds |
| `chemical` | substance with a defined molecular composition |
| `clay` | fine-grained sedimentary material that becomes plastic when wet |
| `colloid` | mixture in which fine particles disperse throughout another substance |
| `compound` | substance composed of two or more elements in fixed proportions |
| `concrete` | composite material of cement, aggregate, and water |
| `coolant` | fluid circulated to absorb and remove heat |
| `copper` | metallic element, atomic number 29 |
| `corrosion` | gradual chemical degradation of a metal by its environment |
| `crystal` | solid with atoms arranged in a periodic lattice |
| `dipole` | pair of equal and opposite charges separated by a distance |
| `distillation` | separation of mixture components by evaporation and condensation |
| `dust` | fine dry particles of solid material suspended in gas or settled on surfaces |
| `dye` | substance that changes the color of a material by chemical bonding |
| `electrode` | conductor through which current enters or leaves an electrolyte or device |
| `electrolyte` | substance that conducts current through the movement of ions |
| `element` | substance containing only one type of atom |
| `emulsion` | colloid of one liquid dispersed in another |
| `fiber` | (material sense) thin elongated strand of natural or synthetic material |
| `filtration` | separation of solids from a fluid by passing through a porous medium |
| `fluid` | substance that flows and conforms to the shape of its container: liquid or gas |
| `foam` | material consisting of gas bubbles trapped in a solid or liquid matrix |
| `fuel` | substance consumed to release energy |
| `gas` | state of matter with no fixed shape or volume |
| `glass` | amorphous solid, typically transparent, made by cooling a melt without crystallization |
| `gold` | metallic element, atomic number 79 |
| `grease` | thick viscous lubricant |
| `hydrogen` | element, atomic number 1; lightest element |
| `ice` | solid phase of water |
| `iron` | metallic element, atomic number 26 |
| `isomer` | molecule with the same atoms as another but a different arrangement |
| `lattice` | (crystal sense) regular periodic arrangement of atoms in a solid |
| `lead` | metallic element, atomic number 82 |
| `liquid` | state of matter with fixed volume but no fixed shape |
| `lubricant` | substance applied between surfaces to reduce friction |
| `material` | any substance from which things can be made |
| `mercury` | metallic element, atomic number 80; liquid at room temperature |
| `metal` | element or alloy that conducts electricity and heat, typically reflective and malleable |
| `mineral` | naturally occurring inorganic solid with defined crystal structure and composition |
| `mixture` | combination of two or more substances not chemically bonded |
| `monomer` | small molecule that bonds with others to form a polymer |
| `nitrogen` | element, atomic number 7 |
| `oil` | viscous liquid, hydrophobic, derived from biological or geological sources |
| `ore` | naturally occurring material from which a metal or mineral can be extracted |
| `oxidation` | loss of electrons by a substance during a reaction |
| `oxide` | compound of oxygen with another element |
| `oxygen` | element, atomic number 8 |
| `paint` | liquid coating that dries to form a colored film |
| `particle` | small discrete piece of matter |
| `pigment` | substance producing color by selective absorption and reflection of light |
| `plastic` | synthetic polymer that can be molded when heated |
| `polymer` | large molecule composed of repeating bonded units |
| `powder` | dry material consisting of very fine particles |
| `precipitate` | solid that forms and separates from a solution during a reaction |
| `reactant` | substance consumed during a chemical reaction |
| `reaction` | (chemistry sense) process in which substances transform into different substances |
| `reagent` | substance added to a system to cause or test a reaction |
| `residue` | material remaining after a process removes the primary substance |
| `resin` | viscous substance that hardens on exposure to air, heat, or catalyst |
| `rubber` | elastic polymer that returns to shape after being stretched or compressed |
| `rust` | iron oxide formed by corrosion in the presence of water and oxygen |
| `salt` | ionic compound formed by reaction of an acid with a base |
| `sand` | granular material composed of finely divided rock and mineral particles |
| `silicon` | element, atomic number 14; semiconductor |
| `silver` | metallic element, atomic number 47 |
| `solid` | state of matter with fixed shape and volume |
| `solubility` | measure of the amount of solute that dissolves in a given solvent |
| `solute` | substance dissolved in a solvent |
| `solution` | homogeneous mixture of a solute dissolved in a solvent |
| `solvent` | liquid substance that dissolves a solute |
| `steel` | alloy of iron and carbon |
| `stone` | hard solid piece of mineral matter |
| `sublimation` | change of a substance from solid directly to vapor |
| `substance` | matter with uniform composition throughout |
| `tin` | metallic element, atomic number 50 |
| `titanium` | metallic element, atomic number 22 |
| `titration` | measurement of a solution's concentration by controlled reaction |
| `valence` | combining capacity of an atom, equal to the number of bonds it forms |
| `vapor` | gaseous form of a substance that normally exists as liquid or solid at ambient conditions |
| `water` | compound of hydrogen and oxygen, H₂O |


### C. Measurement and Quantity (163)

| Word | Sense pin |
|---|---|
| `acceleration` | rate of change of velocity per unit time |
| `accuracy` | degree to which a measured value matches the true value |
| `altitude` | height above a defined reference surface |
| `amplitude` | maximum displacement of a wave from its equilibrium value |
| `angle` | (measurement sense) figure formed by two lines meeting at a point, measured in degrees or radians |
| `area` | (measurement sense) extent of a two-dimensional surface, in squared length units |
| `attenuation` | reduction in the amplitude or intensity of a signal over distance |
| `average` | sum of values divided by their count |
| `bandwidth` | range of frequencies a channel can carry |
| `baseline` | initial measured state against which changes are compared |
| `budget` | finite allocation of a resource with defined upper bound |
| `calibration` | process of adjusting an instrument to match a known standard |
| `capacitance` | measure of a system's ability to store electric charge |
| `capacity` | maximum amount a system can hold, process, or transmit |
| `ceiling` | upper limit of a parameter or operating range |
| `charge` | (electric sense) property of matter that causes electric force, measured in coulombs |
| `coefficient` | dimensionless multiplier in a mathematical expression |
| `concentration` | amount of substance per unit volume of mixture |
| `confidence` | quantified degree of certainty in a statistical estimate |
| `constant` | quantity whose value does not change within a defined scope |
| `contrast` | difference in luminance or color between adjacent regions |
| `contour` | line connecting points of equal value on a surface or field |
| `coordinate` | numerical value specifying position along an axis |
| `correlation` | measure of linear association between two variables, range -1 to +1 |
| `count` | total number of discrete items in a set |
| `current` | (electrical sense) flow of electric charge per unit time, in amperes |
| `curve` | line that deviates continuously from straightness |
| `cycle` | one complete repetition of a periodic process |
| `data` | recorded values of observations or measurements (uncountable) |
| `datum` | single recorded value of an observation or measurement |
| `decay` | progressive decrease in a quantity over time |
| `degree` | unit of angular or temperature measure |
| `denominator` | number below the line in a fraction |
| `density` | mass per unit volume |
| `depth` | distance from a surface downward or inward |
| `derivative` | (mathematics sense) rate of change of a function with respect to its variable |
| `deviation` | departure of a value from a reference |
| `diameter` | (measurement sense) length of a straight line through the center of a circle or sphere |
| `difference` | result of subtracting one quantity from another |
| `dimension` | measurable extent: length, width, height, or time |
| `direction` | line along which something moves or faces, specified by angle or cardinal |
| `displacement` | change in position of a body, with magnitude and direction |
| `distance` | length of the shortest path between two points |
| `distribution` | function describing the probability of different values of a variable |
| `dose` | quantity of energy, radiation, or substance delivered per unit mass or area |
| `drift` | slow uncontrolled change in a measured value over time |
| `duration` | length of time an event or state persists |
| `efficiency` | ratio of useful output to total input for a process |
| `elevation` | height above mean sea level or a defined reference plane |
| `energy` | capacity to perform work, measured in joules |
| `error` | difference between measured value and true value |
| `estimate` | approximate value calculated from available data |
| `exponent` | number indicating how many times a factor multiplies itself |
| `factor` | number that multiplies another; or cause contributing to a result |
| `field` | region of space where a force acts on susceptible objects |
| `floor` | (measurement sense) lower bound of a parameter or operating range |
| `flux` | rate of flow of energy, particles, or material through a surface |
| `force` | interaction that changes the motion of a body, in newtons |
| `fraction` | part of a whole expressed as a ratio |
| `frequency` | number of complete cycles per unit time, in hertz |
| `friction` | force resisting relative motion between surfaces in contact |
| `gain` | ratio of output to input in a signal path |
| `gradient` | rate of change of a quantity with respect to distance |
| `half-life` | time for a quantity undergoing exponential decay to reduce by half |
| `height` | vertical distance from base to top |
| `impedance` | opposition to alternating current in a circuit, in ohms |
| `impulse` | (physics sense) change in momentum produced by a force over time |
| `increment` | amount by which a value increases in one step |
| `inertia` | resistance of a body to change in its state of motion |
| `infinity` | quantity greater than any finite value |
| `integral` | quantity equal to the area under the curve of a function |
| `intensity` | power per unit area, or magnitude of a quantity per unit |
| `interval` | bounded range of values or span of time between two events |
| `latitude` | angular distance north or south of an equator |
| `length` | extent of a body along its longest dimension |
| `level` | position on a scale of quantity, intensity, or rank |
| `limit` | value that a quantity approaches or must not exceed |
| `load` | force, weight, or demand placed on a system |
| `logarithm` | exponent to which a fixed factor must be raised to produce a given number |
| `longitude` | angular distance east or west of a prime meridian |
| `luminance` | luminous intensity per unit projected area |
| `luminosity` | total power radiated by a star or source |
| `magnitude` | size of a quantity regardless of sign or direction; or brightness of a celestial body on a logarithmic scale |
| `margin` | difference between an actual value and a boundary or limit |
| `mass` | quantity of matter in a body, measured in kilograms |
| `maximum` | greatest value in a set or range |
| `mean` | arithmetic average of a set of values |
| `median` | middle value when a set is ordered |
| `minimum` | smallest value in a set or range |
| `noise` | unwanted random variation in a signal or measurement |
| `numerator` | number above the line in a fraction |
| `offset` | constant value added to shift a baseline |
| `output` | quantity produced by a system or process |
| `peak` | highest instantaneous value in a time-varying quantity |
| `percentage` | proportion expressed as parts per hundred |
| `period` | time to complete one cycle of a periodic process |
| `phase` | (measurement sense) position within a cycle, measured as an angle |
| `pitch` | (measurement sense) perceived frequency of a sound; or spacing between repeated structural features |
| `polarity` | sign of a charge or direction of a field |
| `polynomial` | expression of summed terms, each a factor times a variable raised to a power |
| `position` | location in space specified by coordinates |
| `potential` | stored energy per unit charge, mass, or quantity |
| `power` | rate of energy transfer or work done per unit time, in watts |
| `precision` | degree to which repeated measurements agree with each other |
| `pressure` | force per unit area, in pascals |
| `probability` | numerical measure of likelihood, range 0 to 1 |
| `product` | result of multiplying two or more quantities. Arithmetic sense only; the manufactured-good sense stays `output` or `unit` |
| `profile` | graph of a quantity as a function of position along a line |
| `proportion` | relation of one quantity to another expressed as a fraction or ratio |
| `pulse` | brief deviation of a quantity from its baseline value |
| `quantity` | measurable amount or number |
| `quotient` | result of dividing one quantity by another. Distinct from `ratio` (same-kind quantities) and `fraction` (part of a whole) |
| `radius` | distance from the center of a circle or sphere to its boundary |
| `range` | difference between maximum and minimum values; or extent of coverage |
| `rate` | quantity per unit time |
| `ratio` | quotient of two quantities of the same kind |
| `reading` | value obtained from an instrument at a specific time |
| `reference` | known standard against which measurements are compared |
| `remainder` | quantity left after one integer is divided by another |
| `resistance` | opposition to flow of current, in ohms; or opposition to motion |
| `resolution` | smallest distinguishable difference between two values |
| `response` | output produced by a system in reaction to an input |
| `result` | outcome of a calculation, test, or experiment |
| `sample` | subset taken from a population for measurement |
| `scalar` | quantity having magnitude but no direction |
| `scale` | system of ordered marks for measurement; or ratio between a model and the real object |
| `score` | numerical value assigned by a defined evaluation procedure |
| `sensitivity` | ratio of output change to input change |
| `signal` | physical quantity that varies to convey information |
| `size` | overall spatial extent of a body |
| `slope` | rate of change of one variable with respect to another |
| `span` | distance between two extreme points |
| `spectrum` | distribution of a quantity as a function of wavelength, frequency, or energy |
| `speed` | magnitude of velocity, distance per unit time |
| `spread` | extent of variation in a set of values |
| `standard` | defined reference value or specification used for comparison |
| `strength` | magnitude of a force, field, or material resistance to change in shape |
| `sum` | result of adding two or more quantities |
| `temperature` | measure of average kinetic energy of particles in a body, in kelvin |
| `tension` | pulling force transmitted through a flexible member |
| `term` | single element in a mathematical expression or series |
| `test` | defined procedure to determine whether a condition holds |
| `threshold` | value at which a qualitative change in behavior occurs |
| `throughput` | quantity processed per unit time |
| `time` | measurable extent of duration, in seconds |
| `tolerance` | permitted range of deviation from a specified value |
| `torque` | turning force acting about an axis |
| `total` | sum of all components |
| `trend` | direction of change in a quantity over successive measurements |
| `transparency` | fraction of incident light transmitted through a material |
| `uncertainty` | quantified range within which the true value is expected to lie |
| `unit` | (measurement sense) defined standard quantity used as a reference for measurement |
| `value` | numerical magnitude assigned to a quantity |
| `variance` | mean of squared deviations from the mean |
| `velocity` | rate of change of position with respect to time, with direction |
| `viscosity` | measure of a fluid's resistance to flow |
| `voltage` | electric potential difference between two points, in volts |
| `volume` | extent of three-dimensional space occupied by a body |
| `wavelength` | distance between successive crests of a wave |
| `weight` | (measurement sense) gravitational force acting on a mass |
| `width` | extent of a body in the direction perpendicular to its length |
| `yield` | quantity produced per unit input |
| `zero` | the additive identity; point of origin on a scale |


### D. Process and Procedure (183)

| Word | Sense pin |
|---|---|
| `action` | single discrete operation performed by an agent or device |
| `adjustment` | small change made to bring a system closer to specification |
| `analysis` | systematic examination of data or structure to determine properties |
| `anomaly` | measured deviation from expected behavior |
| `application` | specific use of a method, tool, or substance |
| `approach` | (process sense) defined method of addressing a problem |
| `assessment` | structured evaluation of a condition against criteria |
| `attempt` | single execution of a procedure, whether successful or not |
| `audit` | independent examination of records and procedures for compliance |
| `cadence` | regular repeating interval at which an operation is performed |
| `change` | transition from one state to another |
| `check` | examination to confirm that a condition holds |
| `clearance` | verified permission to proceed with an operation |
| `closure` | completion of all required steps to end a process |
| `command` | instruction issued to a system to execute an operation |
| `comparison` | examination of two or more items to determine differences and similarities |
| `completion` | state in which all required steps have been executed |
| `compliance` | state of conforming to a set of rules or specifications |
| `computation` | execution of mathematical or logical operations on data |
| `conclusion` | final result or determination at the end of an analysis |
| `condition` | state of a system or environment at a specific time |
| `configuration` | set of parameter values defining the state of a system |
| `constraint` | limitation on the range of permitted values or actions |
| `contact` | state of physical proximity allowing interaction; or first communication event |
| `contingency` | planned response to a possible but uncertain event |
| `control` | (process sense) act of regulating a system to maintain desired behavior |
| `conversion` | change from one form, unit, or format to another |
| `correction` | change that removes an error from a record or system |
| `criterion` | specific standard against which compliance is checked |
| `decision` | selection among alternatives based on defined criteria |
| `default` | value or action used when no explicit specification is given |
| `definition` | statement that establishes the meaning of a term |
| `delay` | interval between a trigger and the resulting action |
| `demonstration` | procedure that shows whether a statement holds under test |
| `deployment` | act of placing a system into operational use |
| `description` | statement of observable properties and measurements |
| `detection` | act of registering the presence of something |
| `determination` | process of establishing a value or identity by test |
| `diagnosis` | identification of a fault by systematic examination |
| `discovery` | first detection of a previously unknown phenomenon |
| `drill` | rehearsal of a procedure under simulated conditions |
| `effect` | measurable change produced by a cause |
| `entry` | act of placing data into a record; or a single item in a record |
| `environment` | set of external conditions surrounding a system |
| `event` | occurrence at a specific time and place |
| `examination` | careful inspection or analysis |
| `exception` | case that does not follow the general rule |
| `execution` | carrying out of a procedure or instruction |
| `exercise` | controlled practice of a procedure |
| `experiment` | test designed to accept or reject a hypothesis |
| `exposure` | state of being subjected to a stimulus or condition |
| `extraction` | removal of a specific substance or item from a larger body |
| `failure` | inability to meet a specified requirement |
| `feedback` | output of a system that returns as input to the same system |
| `finding` | specific result of an analysis or experiment |
| `function` | (process sense) defined role or operation of a component within a system |
| `gate` | (process sense) decision point that permits or blocks progression |
| `generation` | act of producing an output by a defined process |
| `halt` | complete cessation of operation |
| `handover` | transfer of control or responsibility from one agent to another |
| `hazard` | condition or substance with potential to cause harm |
| `hypothesis` | testable statement that an experiment can accept or reject |
| `implementation` | act of putting a plan or specification into effect |
| `indication` | observable sign that a condition holds |
| `input` | material, energy, or data entering a system |
| `inspection` | visual or instrumental examination of a component for defects |
| `iteration` | one repetition of a recurring process |
| `maintenance` | set of actions that preserve a system in working condition |
| `measurement` | act of determining a quantity by instrument or defined procedure |
| `method` | defined sequence of steps for accomplishing a task |
| `mode` | one of several possible operating states of a system |
| `modification` | change made to a system's design or configuration |
| `moratorium` | agreed period during which a specified action is suspended |
| `observation` | act of registering a phenomenon by instrument or sensor |
| `operation` | single defined action or set of actions performed by a system |
| `outcome` | final state resulting from a process or decision |
| `output` | (process sense) material, energy, or data leaving a system |
| `parameter` | named variable whose value defines the behavior of a system |
| `pause` | temporary cessation of operation with intent to resume |
| `phase` | (process sense) distinct stage within a larger sequence. Not the measurement-of-angle sense; see Measurement |
| `plan` | ordered set of steps to achieve a defined outcome |
| `precaution` | action taken in advance to reduce a specific risk |
| `precondition` | requirement that must hold before an operation may begin |
| `preparation` | set of actions that make a system ready for operation |
| `procedure` | defined and repeatable sequence of steps |
| `process` | connected sequence of operations that transforms input to output |
| `production` | act of manufacturing or generating output |
| `program` | ordered set of instructions executed by a machine |
| `projection` | calculated future value based on current trend and model |
| `proof` | demonstration that a statement follows necessarily from given premises |
| `property` | measurable condition of a material or system |
| `protocol` | agreed set of rules governing the format, timing, and content of exchanges |
| `provision` | arrangement made in advance to meet a future need |
| `query` | request for specific data from a system or record |
| `reading` | (process sense) act of obtaining data from a source |
| `reboot` | complete restart of a system from initial state |
| `reception` | act of receiving a transmitted signal |
| `record` | persistent stored representation of data or decisions |
| `recovery` | return of a system to working state after failure |
| `reduction` | decrease in magnitude, scope, or complexity |
| `redundancy` | (process sense) inclusion of duplicate components or paths to survive failure |
| `reentry` | return of a body or system into an operational region |
| `rehearsal` | practice execution of a procedure before actual use |
| `rejection` | determination that an item or result does not meet specification |
| `release` | (process sense) authorized making-available of a product, document, or resource |
| `remediation` | corrective action to restore a system or environment to acceptable state |
| `removal` | act of taking a component or substance out of a system |
| `repair` | restoration of a damaged or failed component to working condition |
| `repeat` | execution of a procedure again under the same conditions |
| `replacement` | substitution of a new component for a failed or worn one |
| `replication` | independent reproduction of an experiment or result |
| `report` | structured document presenting findings and data |
| `requirement` | condition that must be satisfied for acceptance |
| `reset` | return of all parameters to their initial values |
| `response` | (process sense) action taken in reaction to a detected condition |
| `restoration` | return to a previously recorded state |
| `restriction` | limitation placed on the scope or use of a resource |
| `result` | (process sense) outcome of a test, calculation, or experiment |
| `retraction` | formal withdrawal of a previously published statement |
| `retrieval` | act of obtaining stored data or material |
| `review` | systematic re-examination of work, records, or procedures |
| `revision` | updated version of a document or plan, with changes identified |
| `rollback` | reversion of a system to a previous known state |
| `rotation` | (process sense) scheduled cycling of personnel through roles |
| `rule` | formal statement that defines permitted or required behavior |
| `run` | single execution of a test, simulation, or procedure |
| `safety` | state in which risk of harm is below an accepted threshold |
| `scan` | (process sense) systematic examination across a range |
| `schedule` | timetable defining when operations occur |
| `scope` | defined boundary of what a procedure or document covers |
| `search` | systematic examination of a space to find a target |
| `selection` | act of choosing an item that matches defined criteria |
| `sequence` | ordered set of items or steps |
| `service` | (process sense) maintenance operation performed on equipment |
| `session` | bounded period during which a system or operator is active |
| `setting` | specific value to which a parameter has been adjusted |
| `setup` | arrangement of equipment and parameters before an operation |
| `shutdown` | orderly cessation of all system operations |
| `simulation` | execution of a model to predict system behavior |
| `specification` | document defining required properties, dimensions, and performance |
| `stage` | one step in a sequence of operations |
| `startup` | sequence of operations that brings a system from inactive to operational |
| `state` | set of all current parameter values of a system |
| `statement` | declarative sentence asserting a condition that can be verified |
| `status` | summary description of a system's current condition |
| `step` | single action within a procedure |
| `stimulus` | input that triggers a response in a system |
| `storage` | retention of material or data for later retrieval |
| `stress` | force per unit area applied to a material; or load applied to a system |
| `structure` | arrangement and interconnection of parts in a system |
| `substitution` | replacement of one item with another of equivalent function |
| `succession` | ordered transfer of a role from one holder to the next |
| `summary` | brief statement of the main points of a longer record |
| `supplement` | additional material that extends but does not replace a document |
| `survey` | systematic collection of data across a defined region or population |
| `suspension` | temporary halt of an activity pending review |
| `sweep` | single pass of a sensor or signal across a range |
| `task` | defined unit of work assigned to an agent |
| `technique` | specific way of performing a procedure |
| `test` | (process sense) structured procedure to determine compliance |
| `threshold` | (process sense) value at which a trigger fires |
| `timing` | specification of when events occur relative to each other |
| `tolerance` | (process sense) acceptable range of deviation |
| `trace` | recorded sequence of events or states for later analysis |
| `transfer` | movement of material, data, or authority from one location to another |
| `transition` | change from one state or phase to another |
| `transmission` | act of sending a signal or material through a channel |
| `transportation` | movement of agents, material, or equipment from one location to another |
| `trial` | single test in a series of experiments |
| `trigger` | event or condition that initiates a defined response |
| `troubleshooting` | systematic process of diagnosing and locating faults |
| `turn` | (process sense) one agent's period of responsibility in a rotation |
| `update` | change that brings a record or system to current state |
| `upgrade` | replacement of a component or system with a higher-capacity version |
| `validation` | confirmation that a result meets acceptance criteria |
| `variation` | difference between instances of a repeated measurement |
| `verification` | confirmation that a procedure was followed correctly |
| `version` | identified iteration of a document, system, or design |
| `violation` | instance of non-compliance with a rule |
| `warning` | notification that a condition approaches or has reached a threshold |
| `window` | (process sense) bounded period during which an operation may occur |
| `withdrawal` | removal of a component, statement, or permission from active status |
| `workflow` | defined sequence of tasks performed by agents and systems |


### E. Time and Sequence (26)

Removed `delay` (in Process) and `pause` (in Process) from
this section to avoid duplication.

| Word | Sense pin |
|---|---|
| `beginning` | first part of a period or process |
| `century` | period of 100 years |
| `cycle` | (time sense) single complete period of a recurring event |
| `date` | specified day identified by calendar notation |
| `dawn` | period when sunlight first becomes visible at the horizon |
| `day` | period of one planetary rotation |
| `decade` | period of 10 years |
| `duration` | (time sense) total elapsed time of an event |
| `end` | final point of a period or process |
| `epoch` | defined reference point in a timekeeping system |
| `era` | extended period characterized by a dominant condition |
| `hour` | period of 3,600 seconds |
| `instant` | point in time with no duration |
| `interval` | (time sense) span between two events |
| `minute` | period of 60 seconds |
| `moment` | very short duration of time |
| `month` | period of approximately 30 days or one lunar cycle |
| `night` | period between sunset and sunrise |
| `onset` | moment at which a process or condition begins |
| `origin` | (time sense) reference point from which a timescale starts |
| `period` | (time sense) duration of one complete cycle |
| `second` | SI base unit of time |
| `start` | (time sense) moment at which a process begins |
| `sunrise` | moment when the upper edge of a star's disc appears above the horizon |
| `week` | period of 7 days |
| `year` | period of one planetary orbit around its star |


### F. Natural and Scientific (223)

Includes core v0.1 natural nouns plus all astronomy and physics
expansion nouns.

| Word | Sense pin |
|---|---|
| `absorption` | process by which matter takes in energy from radiation |
| `absorption-line` | spectral line produced by absorption of photons at a specific wavelength |
| `accretion` | gradual accumulation of matter by gravitational attraction |
| `accretion-disc` | disc of matter spiraling inward toward a compact object |
| `angular-momentum` | product of moment of inertia and angular velocity |
| `antimatter` | matter composed of antiparticles |
| `antiparticle` | particle with same mass and opposite charge to its matter counterpart |
| `aquifer` | underground layer of rock that holds and transmits water |
| `asteroid` | small rocky body orbiting a star |
| `asteroid-belt` | region of a star system containing many asteroids |
| `atom` | smallest unit of a chemical element retaining its identity |
| `aurora` | luminous emission in an atmosphere caused by charged particles along magnetic field lines |
| `bacteria` | single-celled microorganisms without a nucleus |
| `binary-star` | system of two stars orbiting a common center of mass |
| `black-hole` | region of spacetime from which nothing escapes past the event horizon |
| `blueshift` | decrease in wavelength of radiation from an approaching source |
| `boson` | particle with integer spin that mediates forces |
| `bow-shock` | boundary where a supersonic flow decelerates upon encountering an obstacle |
| `causality` | relation between cause and effect, constrained by signal speed |
| `cell` | smallest unit of a living organism |
| `chromosome` | thread-like structure of DNA carrying genetic information |
| `comet` | small icy body that releases gas and dust when near a star |
| `conservation` | property of a quantity remaining constant in a closed system |
| `constellation` | defined region of the celestial sphere |
| `continent` | large continuous landmass on a planetary surface |
| `corona` | outermost layer of a stellar atmosphere |
| `chromosphere` | layer of a stellar atmosphere above the photosphere |
| `cosmic-ray` | high-energy particle originating outside a star system |
| `coupling` | interaction strength between two systems or fields |
| `crust` | outermost solid layer of a rocky planet or moon |
| `dark-energy` | component inferred from accelerating expansion of the universe |
| `dark-matter` | matter inferred from gravitational effects, not detected by electromagnetic radiation |
| `dark-rift` | band of obscuring dust along the plane of a disc galaxy |
| `debris-field` | region containing fragments from a disrupted body |
| `degeneracy` | condition where distinct quantum states have equal energy |
| `deposition` | (geology sense) laying down of sediment by a natural process |
| `diffraction` | bending of waves around obstacles or through apertures |
| `dispersion` | dependence of wave propagation speed on wavelength |
| `doppler-shift` | change in observed frequency due to relative motion between source and observer |
| `dwarf-planet` | body orbiting a star, massive enough for round shape, that has not cleared its orbit |
| `earthquake` | sudden shaking of a planetary surface from subsurface energy release |
| `eclipse` | event where one celestial body blocks light from another |
| `ecliptic` | plane of a planet's orbit around its star |
| `ecosystem` | community of organisms and their physical environment functioning as a system |
| `eigenvalue` | scalar associated with a linear operator and its eigenvector |
| `ejecta` | material expelled by an impact or explosion |
| `electron` | elementary particle with negative charge and small mass |
| `emission` | release of energy as radiation or particles |
| `emission-line` | spectral line produced by emission of photons at a specific wavelength |
| `entanglement` | quantum correlation between particles such that measurement of one constrains the other |
| `enzyme` | protein that catalyzes a biochemical reaction |
| `erosion` | gradual removal of surface material by wind, water, or ice |
| `eruption` | sudden expulsion of material from a body's interior |
| `event-horizon` | boundary of a black hole beyond which no signal escapes |
| `evolution` | change in the properties of a population or system over successive generations or iterations |
| `exoplanet` | planet orbiting a star other than the local star |
| `extinction` | permanent disappearance of a species or category |
| `fault` | fracture in rock along which displacement has occurred |
| `fermion` | particle with half-integer spin obeying the exclusion rule |
| `fine-structure` | splitting of spectral lines due to spin-orbit coupling |
| `flood` | overflow of water onto normally dry land |
| `formation` | arrangement of rock layers or geological features |
| `fossil` | preserved remains or trace of a past organism |
| `frame-of-reference` | coordinate system used to describe positions and motions |
| `galaxy` | gravitationally bound system of stars, gas, dust, and dark matter |
| `gas-giant` | planet composed primarily of hydrogen and helium |
| `gene` | segment of DNA encoding a functional product |
| `glacier` | large persistent body of dense ice formed by compaction of snow |
| `gravity` | attractive force between bodies proportional to their masses |
| `ground-state` | lowest energy state of a quantum system |
| `habitable-zone` | range of orbital distances where liquid water can persist on a surface |
| `habitat` | environment in which an organism normally lives |
| `hamiltonian` | operator or function representing total energy of a system |
| `harmonic` | frequency component at an integer multiple of a fundamental |
| `heliopause` | boundary where a star's wind ceases to dominate the surrounding medium |
| `hemisphere` | half of a sphere, divided by a plane through the center |
| `horizon` | apparent line where a planetary surface meets the sky |
| `host` | (biology sense) organism on or in which another organism lives |
| `hurricane` | large rotating storm system with low central pressure |
| `hydrogen` | (scientific context) the most abundant element in the universe. See also Materials |
| `hyperfine-transition` | transition between energy levels split by interaction of nuclear and electronic magnetic moments |
| `impact` | collision of a high-velocity body with a surface |
| `impact-crater` | depression formed by a high-velocity collision |
| `insect` | small animal with six legs, segmented body, and external shell |
| `insulator` | material that resists the flow of electric current or heat |
| `interference` | superposition of waves producing regions of reinforcement and cancellation |
| `invariant` | quantity unchanged under a specified transformation |
| `ion` | atom or molecule with a net electric charge |
| `island` | land area surrounded by water |
| `isotope` | variant of an element with a different number of neutrons |
| `jet` | collimated outflow of matter from a compact object or protostar |
| `lagrange-point` | position in a two-body system where a small body maintains stable relative position |
| `lava` | molten rock on a planetary surface |
| `leaf` | flat organ of a plant that captures light for energy conversion |
| `life` | self-replicating chemical system capable of evolution |
| `light` | electromagnetic radiation in or near the visible wavelength range |
| `light-cone` | set of all events causally connected to a given event under the speed of light |
| `lightning` | electrical discharge between charged regions of an atmosphere |
| `limb` | apparent edge of a celestial body's disc |
| `magma` | molten rock below a planetary surface |
| `magnetosphere` | region around a body dominated by its magnetic field |
| `main-sequence` | band on a luminosity-temperature diagram where stars spend most of their lifetime |
| `mammal` | animal with regulated body temperature, hair, and milk-producing glands |
| `mantle` | layer of a rocky body between crust and core |
| `mean-free-path` | average distance a particle travels between collisions |
| `metabolism` | set of chemical reactions that sustain an organism |
| `meteor` | streak of light produced when a small body enters an atmosphere at high speed |
| `meteorite` | a meteor that reaches a planetary surface |
| `metric` | (physics sense) mathematical object describing the geometry of spacetime |
| `molecule` | group of atoms bonded together as a single unit |
| `momentum` | product of mass and velocity |
| `moon` | natural satellite of a planet |
| `mountain` | elevated landform rising substantially above surrounding terrain |
| `muon` | elementary particle similar to electron with greater mass |
| `nebula` | cloud of gas and dust in interstellar space |
| `neutrino` | elementary particle with very small mass and no electric charge |
| `neutron` | uncharged subatomic particle in the atomic nucleus |
| `neutron-star` | dense remnant core of a massive star composed primarily of neutrons |
| `nova` | sudden brightening of a star from surface thermonuclear explosion |
| `nucleosynthesis` | process of forming atomic nuclei from protons and neutrons |
| `nucleus` | central core of an atom containing protons and neutrons |
| `nutrient` | substance required by an organism for growth and maintenance |
| `occultation` | event where one body passes in front of another as seen by an observer |
| `ocean` | large body of salt water covering a planetary surface |
| `ocean-world` | planet or moon with a global liquid ocean |
| `octave` | interval between two frequencies where one equals twice the other |
| `orbit` | (scientific sense) curved path of a body around another under gravity |
| `organ` | distinct part of an organism that performs a specific function |
| `organism` | individual living system |
| `oscillation` | repetitive variation of a quantity about a central value |
| `overtone` | frequency component above the fundamental in a complex tone |
| `ozone` | triatomic form of oxygen, O₃ |
| `pair-production` | creation of a particle-antiparticle pair from energy |
| `parallax` | apparent shift in position due to change in observer location |
| `peak` | (scientific sense) highest point of a landform |
| `perihelion` | point in orbit closest to the central star |
| `perturbation` | small deviation from a reference state or orbit |
| `phenomenon` | observable event or measurable pattern in the natural world |
| `phase-transition` | change in state of matter or qualitative behavior at a critical parameter value |
| `photon` | quantum of electromagnetic radiation |
| `photosphere` | visible surface of a star |
| `planet` | body orbiting a star with sufficient mass for self-gravity to form a round shape, having cleared its orbit |
| `planetary-surface` | outer solid or liquid boundary of a planet |
| `planetary-transit` | passage of a smaller body across the disc of a larger body |
| `plasma` | state of matter in which atoms are ionized |
| `polarization` | orientation of oscillation of a transverse wave |
| `pollen` | fine powder produced by seed plants for reproduction |
| `porosity` | fraction of a material's volume that is empty space |
| `predator` | organism that captures and consumes other organisms |
| `prey` | organism captured and consumed by a predator |
| `proper-motion` | angular displacement of a star across the celestial sphere per unit time |
| `protein` | large molecule composed of amino acid chains |
| `protoplanetary-disc` | disc of gas and dust around a young star from which planets may form |
| `protostar` | contracting cloud before onset of hydrogen fusion |
| `proton` | positively charged subatomic particle in the atomic nucleus |
| `pulsar` | rapidly rotating neutron star emitting periodic beams of radiation |
| `quantum` | discrete unit of energy, momentum, or other physical quantity |
| `quasar` | extremely luminous nucleus of a distant galaxy powered by accretion |
| `radial-velocity` | component of velocity along the line of sight |
| `radiation` | energy emitted as electromagnetic waves or subatomic particles |
| `radioactivity` | spontaneous emission of radiation from unstable nuclei |
| `rain` | liquid water falling from an atmosphere as droplets |
| `red-giant` | star in a late evolutionary phase with expanded outer layers |
| `redshift` | increase in wavelength of radiation from a receding source |
| `reef` | ridge of rock, coral, or sand near a water surface |
| `reflection` | (physics sense) return of a wave from a surface |
| `refraction` | bending of a wave as it passes between media |
| `regolith` | layer of loose material on a planetary surface |
| `resonance` | condition where a periodic driving force matches a natural frequency |
| `respiration` | process by which an organism converts nutrients into energy |
| `ring-system` | disc of particles orbiting a planet in its equatorial plane |
| `ringlet` | narrow band within a ring system |
| `river` | natural flowing channel of water |
| `rock` | naturally occurring solid aggregate of minerals |
| `root` | underground part of a plant that absorbs water and nutrients |
| `rotation` | (scientific sense) spinning of a body around its own axis |
| `satellite` | body or device orbiting a larger body |
| `sea` | large body of salt water, smaller than an ocean |
| `sediment` | material deposited by water, wind, or ice |
| `seed` | reproductive unit of a plant containing an embryo and nutrients |
| `semiconductor` | material with conductivity between that of a conductor and an insulator |
| `solar-wind` | stream of charged particles emitted by a star |
| `spacetime` | four-dimensional continuum of three spatial and one temporal dimension |
| `species` | group of organisms that can reproduce with each other to produce viable offspring |
| `specimen` | individual sample of an organism or material taken for examination |
| `spectral-line` | discrete feature in a spectrum at a specific wavelength |
| `spin` | intrinsic angular momentum of a particle |
| `spiral-arm` | curved structure extending from the center of a disc galaxy |
| `star` | self-luminous celestial body powered by nuclear fusion |
| `star-cluster` | gravitationally bound group of stars |
| `star-system` | star with all gravitationally bound bodies |
| `stellar-nursery` | region of dense gas and dust where stars form |
| `storm` | atmospheric disturbance with strong winds, precipitation, or electrical activity |
| `stratum` | single layer of sedimentary rock |
| `substrate` | base material on which another material is deposited or grows |
| `sun` | the central star of a star system |
| `superposition` | combination of two or more states or waves |
| `supernova` | explosion marking the death of a massive star |
| `symmetry` | invariance of a system under a specified transformation |
| `terminator` | boundary between illuminated and dark hemispheres |
| `tessellation` | covering of a surface by repeated shapes without gaps or overlaps |
| `thermodynamic-equilibrium` | state where macroscopic properties remain constant and no net flows occur |
| `tidal-force` | differential gravitational force across an extended body |
| `tide` | periodic rise and fall of a fluid surface caused by gravitational interaction |
| `tissue` | organized group of similar cells performing a shared function |
| `tornado` | violently rotating column of air extending from a storm to a surface |
| `tsunami` | large ocean wave generated by submarine disturbance |
| `vacuum` | region containing no matter; or lowest energy state of a field |
| `vent` | (scientific sense) opening in a surface through which gas or heated fluid escapes |
| `virus` | infectious agent that replicates only within a host cell |
| `void` | large region of space containing few or no galaxies |
| `volcano` | opening in a planetary surface through which magma erupts |
| `watershed` | area of land that drains to a common water body |
| `wave` | disturbance that propagates through a medium or field |
| `waveform` | shape of a wave as a function of time or position |
| `wavefunction` | mathematical description of the quantum state of a system |
| `weather` | short-term state of an atmosphere at a specific time and place |
| `weathering` | breakdown of rock by exposure to atmosphere and water |
| `white-dwarf` | dense remnant core of a low-mass star |
| `wind` | large-scale movement of atmospheric gas |
| `worldline` | path of an object through spacetime |
| `zenith` | point on the celestial sphere directly above the observer |
| `nadir` | point on the celestial sphere directly below the observer |


### G. Abstract and System (220)

| Word | Sense pin |
|---|---|
| `access` | ability to reach, read, or write a resource |
| `address` | identifier specifying a location in a storage or communication system |
| `algorithm` | finite ordered set of well-defined instructions for computation |
| `alphabet` | finite set of symbols used in a coding scheme |
| `alternative` | one of two or more available options |
| `anchor` | fixed reference point against which changes are measured |
| `archive` | repository for long-term retention of records |
| `array` | ordered collection of items of the same type |
| `artifact` | object produced by a procedure or unintended effect of a process |
| `authority` | designated right to make decisions or approve actions |
| `automation` | execution of procedures without human intervention |
| `autonomy` | capacity of a system to operate without external control |
| `axiom` | statement taken as true without proof, used as a basis for derivation |
| `backup` | duplicate copy maintained for recovery after failure |
| `balance` | state where opposing quantities are equal |
| `basis` | foundational set from which other elements are derived |
| `batch` | group of items processed together as one unit |
| `bias` | systematic deviation of a measurement or estimate from the true value |
| `bit` | smallest unit of digital information, with value 0 or 1 |
| `block` | (data sense) contiguous sequence of data treated as one unit |
| `buffer` | temporary storage that absorbs differences in rate between producer and consumer |
| `byte` | unit of 8 bits |
| `cache` | fast-access storage holding recently used data |
| `capacity` | (system sense) maximum throughput or storage of a system |
| `category` | class defined by shared properties |
| `chain` | (abstract sense) linked sequence of related items or events |
| `checksum` | value derived from data for error detection |
| `ciphertext` | data transformed by encryption |
| `class` | set of items sharing a defining property |
| `cleartext` | data before encryption |
| `clock` | device or signal that provides a time reference |
| `cluster` | group of similar items in close proximity |
| `code` | system of rules mapping one set of symbols to another |
| `codec` | device or algorithm that encodes or decodes data |
| `codeword` | symbol sequence assigned to a source symbol in a coding scheme |
| `cohort` | group of agents or items that share a defining temporal or procedural boundary |
| `combination` | selection of elements from a set without regard to order |
| `command` | (system sense) instruction sent to a device or program |
| `communication` | transfer of information between agents or systems |
| `complexity` | measure of the number of interacting components or steps in a system |
| `conflict` | state where two requirements or actions are mutually incompatible |
| `consensus` | state where all required parties agree on a decision |
| `contradiction` | pair of statements that cannot both be true |
| `copy` | identical reproduction of data or an artifact |
| `cost` | quantity of resource consumed to achieve an outcome |
| `counter` | device or variable that tracks a running count |
| `coverage` | fraction of a domain that has been examined or served |
| `cross-correlation` | measure of similarity between two signals as a function of time offset |
| `custody` | responsibility for the integrity and availability of a resource |
| `database` | structured collection of data accessible by query |
| `dataset` | defined collection of data for analysis |
| `deficit` | shortfall between required and available quantity |
| `dependency` | relation where one component requires another to function |
| `destination` | location to which material or data is directed |
| `diagram` | visual representation of relationships or structure |
| `directory` | organized listing of items with their locations |
| `document` | structured record of information in persistent form |
| `domain` | defined region of authority, application, or parameter space |
| `duty-cycle` | fraction of a period during which a system operates |
| `edge` | (graph sense) connection between two nodes |
| `encoding` | mapping from source symbols to channel symbols |
| `entity` | distinct item that can be independently identified |
| `entropy` | measure of uncertainty or information content of a source |
| `error-rate` | fraction of transmitted symbols received incorrectly |
| `evidence` | data that supports or undermines a hypothesis |
| `exchange` | bidirectional transfer of material, data, or messages |
| `feature` | distinguishing measurable property |
| `file` | named unit of stored data |
| `filter` | (data sense) rule that selects items matching criteria |
| `flag` | indicator that signals a specific condition |
| `format` | specified arrangement of data elements |
| `formula` | symbolic expression defining a mathematical relationship |
| `framework` | abstract structure providing a foundation for other work |
| `graph` | structure consisting of nodes connected by edges |
| `hamming-distance` | number of positions at which two equal-length sequences differ |
| `hash` | fixed-size value computed from data for integrity checking |
| `header` | (data sense) initial portion of a data unit containing metadata |
| `hierarchy` | arrangement of items ranked by containment or authority |
| `history` | recorded sequence of past states or events |
| `identifier` | unique label assigned to an item for unambiguous reference |
| `image` | two-dimensional representation of a scene or object |
| `implementation` | (system sense) realization of a specification in working form |
| `implication` | logical relation in which one statement entails another |
| `index` | ordered lookup structure mapping keys to locations |
| `indicator` | (system sense) variable whose value signals a condition |
| `information` | reduction in uncertainty, measured in bits |
| `infrastructure` | shared foundational systems supporting operations |
| `instance` | single occurrence of a general type |
| `instruction` | single directive to be executed by a system |
| `integrity` | property of data remaining unaltered and complete |
| `interface` | boundary at which two systems exchange material, energy, or information |
| `intersection` | (set sense) set of elements common to two or more sets |
| `inventory` | complete list of items with quantities |
| `item` | single discrete thing in a collection |
| `key` | (data sense) value used for lookup, encryption, or identification |
| `label` | text or symbol attached to an item for identification |
| `latency` | time delay between an event and its observable consequence |
| `layer` | (system sense) level in a hierarchical architecture |
| `ledger` | append-only record of transactions or decisions |
| `library` | organized collection of reusable components or references |
| `link` | (system sense) connection between nodes in a network |
| `list` | ordered sequence of items |
| `location` | position in space identified by coordinates or address |
| `log` | append-only chronological record of events |
| `logic` | formal system of rules for deriving conclusions from premises |
| `loop` | (system sense) sequence of instructions that repeats until a condition is met |
| `matrix` | rectangular array of values arranged in rows and columns |
| `memory` | storage that retains data for access during or across operations |
| `message` | discrete unit of information sent from sender to receiver |
| `metadata` | data describing the structure, origin, or context of other data |
| `method` | (system sense) defined approach or algorithm |
| `metric` | (system sense) defined measure of performance or quality |
| `model` | simplified representation of a system used for projection or analysis |
| `modulation` | variation of a carrier signal property to encode data |
| `mutual-information` | measure of information one variable provides about another |
| `negation` | logical operation that reverses the truth of a statement |
| `network` | interconnected set of nodes and links |
| `node` | point of connection or computation in a network or graph |
| `notation` | system of symbols used to represent values or operations |
| `number` | mathematical object representing quantity |
| `object` | distinct item in a system that can be referenced |
| `offset` | (system sense) displacement from a base address or value |
| `operator` | symbol or function that transforms one value into another |
| `option` | available alternative that can be selected |
| `order` | arrangement of items in a defined sequence |
| `order-of-magnitude` | factor of ten in a quantity |
| `origin` | (system sense) starting point of a coordinate system |
| `packet` | bounded unit of data transmitted through a network |
| `pair` | set of exactly two related items |
| `parameter` | (system sense) named variable that controls system behavior |
| `parity` | property of being even or odd; bit appended for error detection |
| `partition` | (system sense) division of a set into non-overlapping subsets |
| `patch` | (system sense) small update applied to correct or modify software |
| `path` | (system sense) route through a network or decision tree |
| `pattern` | recurring arrangement or regularity in data |
| `payload` | content carried by a message, distinct from its headers and metadata |
| `permission` | authorization to access a resource or perform an action |
| `permutation` | ordered arrangement of the elements of a set |
| `pipeline` | sequence of processing stages connected in series |
| `platform` | (system sense) foundational system on which other systems run |
| `pointer` | value that indicates the location of another value |
| `pool` | shared collection of resources available for allocation |
| `port` | (system sense) numbered endpoint for network communication |
| `prefix` | string prepended to another string |
| `premise` | statement taken as a basis from which a conclusion follows |
| `primitive` | basic operation or data type from which complex ones are built |
| `priority` | relative rank determining order of processing |
| `process` | (system sense) executing instance of a program |
| `profile` | (system sense) summary of properties or performance data |
| `proof` | (system sense) demonstration that a property holds |
| `property` | (system sense) named attribute of an object |
| `provenance` | verifiable record of origin and chain of custody |
| `proxy` | agent or system that acts on behalf of another |
| `query` | (system sense) structured request for data |
| `queue` | ordered collection processed first-in-first-out |
| `quorum` | minimum number of participants required for a valid decision |
| `quota` | upper limit on resource usage |
| `receiver` | device or system that accepts and decodes signals |
| `record` | (system sense) structured entry in a database |
| `register` | (system sense) small fast-access storage location in a processor |
| `registry` | centralized directory of registered items |
| `relation` | defined connection between two entities |
| `replica` | independently produced copy of a system or artifact |
| `repository` | structured storage location for documents or code |
| `resource` | asset available for use: energy, material, time, or capacity |
| `role` | defined set of responsibilities assigned to an agent |
| `route` | specific path through a network from source to destination |
| `row` | horizontal line of entries in a table |
| `rule` | (system sense) formal constraint on behavior |
| `sampling-rate` | number of samples taken per unit time |
| `schema` | formal description of the structure of a dataset or document |
| `scope` | (system sense) region of a program or document where a name is valid |
| `seed` | (system sense) initial value used to start a deterministic process |
| `segment` | (system sense) portion of a data stream or address space |
| `series` | ordered sequence of values or events |
| `server` | system that provides services to other systems on request |
| `session` | (system sense) bounded period of interaction between client and server |
| `set` | collection of distinct items treated as a whole |
| `signal-to-noise-ratio` | ratio of signal power to noise power |
| `signature` | unique pattern identifying the source or content of data |
| `slot` | (system sense) reserved position in a schedule or structure |
| `snapshot` | recorded state of a system at a specific instant |
| `socket` | (system sense) endpoint for bidirectional communication |
| `source` | origin from which material, energy, or data flows |
| `space` | unbounded three-dimensional extent; or allocated memory region |
| `stack` | collection processed last-in-first-out |
| `standard` | (system sense) published specification for interoperability |
| `state` | (system sense) complete set of current values defining a system |
| `store` | location or medium that retains data or material |
| `stream` | continuous flow of data or material |
| `string` | finite sequence of characters |
| `structure` | (system sense) arrangement of components and their relationships |
| `subset` | set entirely contained within another set |
| `suffix` | string appended to another string |
| `symbol` | character or mark representing a defined meaning |
| `syndrome` | pattern indicating type and position of an error in coded data |
| `system` | set of interacting components functioning as a whole |
| `table` | data arranged in rows and columns |
| `tag` | label attached to an item for classification |
| `target` | specified objective or reference value |
| `template` | reusable pattern from which instances are produced |
| `term` | (system sense) named element in a formal expression |
| `theorem` | statement proved from axioms by derivation |
| `threshold` | (system sense) value at which a trigger fires |
| `token` | single meaningful unit in a sequence: a word, symbol, or code |
| `tool` | (system sense) software component used to perform a specific task |
| `topology` | arrangement of connections in a network; or study of properties preserved under continuous change in shape |
| `trace` | (system sense) recorded sequence of execution steps |
| `transceiver` | device that both transmits and receives signals |
| `transmitter` | device that encodes and sends signals |
| `tree` | (system sense) hierarchical data structure with a single root |
| `trigger` | (system sense) condition that initiates an automatic response |
| `tuple` | ordered sequence of fixed-length elements |
| `type` | classification that defines the set of valid values and operations |
| `union` | (set sense) set of all elements belonging to any of two or more sets |
| `variable` | named storage location whose value can change |
| `vector` | ordered list of numerical values; or quantity with magnitude and direction |
| `version` | (system sense) identified iteration of a component |
| `window` | (system sense) bounded range in a sequence used for analysis |
| `zone` | defined region within a larger area |


### H. Agent and Role Nouns (22)

| Word | Sense pin |
|---|---|
| `agent` | entity capable of perceiving conditions and acting on them |
| `analyst` | role: person or system that examines data to identify patterns |
| `archivist` | role: person or system responsible for preserving records |
| `auditor` | role: person or system that independently examines compliance |
| `author` | role: person or system that creates a document |
| `challenger` | role: person or system tasked with finding faults in a plan |
| `coalition` | group of agents cooperating under a shared protocol |
| `cohort` | (role sense) group of agents entering a role or process together |
| `custodian` | role: person or system responsible for integrity of a resource |
| `delegate` | role: agent authorized to act on behalf of another |
| `federation` | association of autonomous groups operating under shared rules |
| `group` | set of agents acting together |
| `inspector` | role: person or system that examines components for compliance |
| `monitor` | role: person or system that continuously observes a condition |
| `observer` | role: person or system that registers and reports measurements |
| `operator` | role: person or system that controls equipment during a procedure |
| `party` | agent or group with a defined interest in a decision |
| `reader` | role: person or system that accesses a document or signal |
| `recipient` | role: person or system that receives a message or delivery |
| `reviewer` | role: person or system that evaluates work for quality and compliance |
| `sender` | role: person or system that originates a message or transmission |
| `team` | small group with defined roles working toward a shared task |


### I. Arts and Perception (16)

Words moved out of this section during v0.2 audit:
`compass` → Physical Objects (instrument). `dye`, `pigment` →
Materials (substances). `contour`, `luminance`, `transparency`
→ Measurement (measurable quantities). `harmonic`, `octave`,
`overtone`, `tessellation` → Scientific (physics/geometry).
`craft` → DROPPED (primary sense "skill in making" is
evaluative-adjacent; vehicle sense replaced by `transportation`
+ `device`).

| Word | Sense pin |
|---|---|
| `canvas` | prepared surface for receiving applied material |
| `chord` | set of three or more tones sounding simultaneously |
| `chromaticity` | color property specified by hue and saturation, independent of luminance |
| `composition` | (arts sense) arrangement of elements within a bounded region |
| `glyph` | single symbol or character as rendered in visual form |
| `hue` | attribute of color determined by dominant wavelength |
| `installation` | arrangement of objects and materials assembled in a specific spatial configuration |
| `mural` | image applied directly to a wall or ceiling surface |
| `palette` | defined set of colors used in a composition |
| `perspective` | geometric method of representing three-dimensional space on a flat surface |
| `relief` | sculptural form projecting from a flat background surface |
| `saturation` | degree to which a color differs from a neutral gray of equal luminance |
| `sculpture` | three-dimensional form created by shaping or assembling material |
| `texture` | spatial pattern of surface variation detectable by touch or scattered light |
| `timbre` | quality of a sound determined by its harmonic spectrum and envelope |
| `tone` | sound of a specific frequency and duration |


### J. Information Theory (23)

`antenna` moved to Physical Objects (physical device).
All remaining information theory nouns that also serve as
general system nouns are defined in the Abstract section.
They appear here for cross-reference only.

| Word | Sense pin |
|---|---|
| `bitrate` | number of bits transmitted per unit time |
| `channel` | (information sense) medium or path through which information travels |
| `checksum` | see Abstract section |
| `ciphertext` | see Abstract section |
| `cleartext` | see Abstract section |
| `codec` | see Abstract section |
| `codeword` | see Abstract section |
| `cross-correlation` | see Abstract section |
| `duty-cycle` | see Abstract section |
| `encoding` | see Abstract section |
| `entropy` | see Abstract section |
| `error-rate` | see Abstract section |
| `hamming-distance` | see Abstract section |
| `information` | see Abstract section |
| `modulation` | see Abstract section |
| `mutual-information` | see Abstract section |
| `parity` | see Abstract section |
| `receiver` | see Abstract section |
| `sampling-rate` | see Abstract section |
| `signal-to-noise-ratio` | see Abstract section |
| `syndrome` | see Abstract section |
| `transceiver` | see Abstract section |
| `transmitter` | see Abstract section |

Note: Information theory nouns that also serve as general
system nouns are defined in the Abstract section with their
sense pins. They appear here for cross-reference only, to
confirm domain coverage. No duplication in the count.

---


---

## 6. Adjectives (239 unique)

All adjectives describe physically measurable or logically
verifiable properties. No evaluative adjectives admitted.

### Dimension and size (18)

| Adjective | Sense pin |
|---|---|
| `broad` | having large extent from side to side |
| `compact` | occupying a small volume relative to mass or content |
| `deep` | extending far from top surface downward or from front inward |
| `flat` | having a surface with no significant curvature or elevation change |
| `heavy` | having large mass relative to size or to a reference |
| `high` | having large vertical extent or elevated position |
| `large` | having spatial extent greater than a reference |
| `light` | (weight sense) having small mass. Not the electromagnetic radiation noun |
| `long` | having large extent along the principal axis |
| `low` | having small vertical extent or depressed position |
| `narrow` | having small extent from side to side |
| `shallow` | having small depth |
| `short` | having small extent along the principal axis |
| `small` | having spatial extent less than a reference |
| `tall` | having large vertical extent measured from base |
| `thick` | having large extent between opposite surfaces |
| `thin` | having small extent between opposite surfaces |
| `wide` | having large extent from side to side |

### Temperature and phase (10)

| Adjective | Sense pin |
|---|---|
| `boiling` | at or above the temperature where liquid-to-gas transition occurs |
| `cold` | having temperature below a reference |
| `cool` | having temperature slightly below a reference |
| `dry` | containing no significant moisture |
| `frozen` | in solid phase due to temperature below the melting point |
| `hot` | having temperature above a reference |
| `liquid` | in the fluid phase with fixed volume but no fixed shape |
| `molten` | in liquid phase due to temperature above the melting point |
| `solid` | in the phase with fixed shape and fixed volume |
| `warm` | having temperature slightly above a reference |

### Speed and time (12)

| Adjective | Sense pin |
|---|---|
| `brief` | lasting a short duration |
| `constant` | not changing over the specified interval |
| `continuous` | occurring without interruption |
| `fast` | having high speed |
| `frequent` | occurring at short intervals |
| `gradual` | changing by small increments over time |
| `intermittent` | alternating between active and inactive periods |
| `periodic` | repeating at regular intervals |
| `rapid` | occurring in a short time |
| `slow` | having low speed |
| `steady` | maintaining a constant rate or level |
| `sudden` | occurring with very short onset time |

### Shape and geometry (16)

| Adjective | Sense pin |
|---|---|
| `angular` | having sharp corners or edges |
| `circular` | having the shape of a circle |
| `concave` | curving inward like the inside of a sphere |
| `convex` | curving outward like the outside of a sphere |
| `curved` | deviating continuously from straightness |
| `cylindrical` | having the shape of a cylinder |
| `diagonal` | connecting non-adjacent corners; neither horizontal nor vertical |
| `flat` | see Dimension (dual listing for geometry context) |
| `horizontal` | parallel to the local gravitational equipotential surface |
| `linear` | following or relating to a straight line |
| `parallel` | extending in the same direction and equidistant at all points |
| `perpendicular` | meeting at a right angle |
| `planar` | lying in or forming a flat two-dimensional surface |
| `round` | having a circular or spherical shape |
| `spherical` | having the shape of a sphere |
| `vertical` | perpendicular to the local gravitational equipotential surface |

### Physical properties (28)

| Adjective | Sense pin |
|---|---|
| `aqueous` | dissolved in or containing water |
| `brittle` | breaking without significant change in shape when force exceeds threshold |
| `conductive` | allowing electric current or heat to pass through readily |
| `corrosive` | causing gradual chemical destruction of a material |
| `dense` | having high mass per unit volume |
| `elastic` | returning to original shape after removal of applied force |
| `flexible` | capable of bending without breaking |
| `fragile` | breaking under small applied force |
| `hard` | resisting indentation or scratching |
| `hollow` | having an empty interior |
| `ionic` | consisting of or relating to ions |
| `magnetic` | producing or responding to a magnetic field |
| `malleable` | capable of being shaped by pressure without breaking |
| `opaque` | blocking passage of light |
| `organic` | (chemistry sense) containing carbon-hydrogen bonds |
| `permeable` | allowing fluid to pass through |
| `porous` | containing many small openings that allow fluid to pass |
| `reflective` | returning a high fraction of incident light from the surface |
| `rigid` | resisting change in shape under applied force |
| `rough` | having an uneven surface with measurable irregularities |
| `smooth` | having a surface with very small irregularities |
| `soft` | yielding readily to pressure |
| `soluble` | capable of dissolving in a solvent |
| `stiff` | resisting bending or flexing |
| `strong` | withstanding large forces without failure |
| `transparent` | allowing light to pass through without significant scattering |
| `turbulent` | exhibiting irregular, chaotic fluid motion |
| `viscous` | resisting flow; having high internal friction in fluid state |

### Color (12)

| Adjective | Sense pin |
|---|---|
| `black` | reflecting very little visible light |
| `blue` | having dominant wavelength approximately 450–490 nm |
| `brown` | having low-saturation color in the orange-red range |
| `clear` | transparent; free from suspended particles |
| `gray` | reflecting an intermediate fraction of visible light with low saturation |
| `green` | having dominant wavelength approximately 520–565 nm |
| `orange` | having dominant wavelength approximately 590–620 nm |
| `pink` | having low-saturation color in the red range |
| `purple` | having a mixture of red and blue wavelengths |
| `red` | having dominant wavelength approximately 620–750 nm |
| `white` | reflecting a high fraction of visible light across the spectrum |
| `yellow` | having dominant wavelength approximately 565–590 nm |

### State and condition (29)

| Adjective | Sense pin |
|---|---|
| `active` | currently in operating state |
| `adjacent` | next to without intervening space or item |
| `alternate` | occurring in turns with another |
| `ambient` | pertaining to the surrounding environment |
| `applicable` | relevant to the current context or condition |
| `approximate` | close to but not exactly equal to the true value |
| `available` | ready for use or access |
| `closed` | in the state preventing flow or access |
| `compatible` | able to function together without conflict |
| `complete` | having all required parts or steps finished |
| `composite` | made of two or more distinct materials or components |
| `contaminated` | containing unwanted substances |
| `correct` | matching the specified or true value |
| `current` | (state sense) existing at the present time |
| `damaged` | having reduced function due to physical harm |
| `defective` | failing to meet specification due to a flaw |
| `disabled` | prevented from operating by a control action |
| `empty` | containing nothing |
| `enabled` | permitted to operate by a control action |
| `external` | located on or coming from the outside |
| `faulty` | containing a defect that causes incorrect operation |
| `full` | containing the maximum quantity |
| `idle` | in a powered state but not performing work |
| `incomplete` | lacking one or more required parts or steps |
| `independent` | not dependent on or controlled by another |
| `initial` | at the starting state before any operation |
| `installed` | placed in position and ready for use |
| `intact` | undamaged; retaining all original parts and function |
| `internal` | located on or coming from the inside |

### Quantity and comparison (23)

| Adjective | Sense pin |
|---|---|
| `abundant` | present in quantity greater than needed |
| `additional` | added beyond the original set |
| `adequate` | sufficient for the specified requirement |
| `comparable` | close enough in value to allow meaningful comparison |
| `consecutive` | following one after another without interruption |
| `cumulative` | increasing by successive addition |
| `double` | equal to two times a reference quantity |
| `dual` | consisting of two parts or aspects |
| `equal` | having the same value as |
| `excess` | exceeding the required or specified quantity |
| `extra` | beyond what is required |
| `identical` | matching in every measured property |
| `incremental` | increasing by a defined step |
| `insufficient` | less than the required quantity |
| `logarithmic` | varying as the logarithm of a quantity |
| `maximum` | at the greatest permitted or observed value |
| `minimum` | at the smallest permitted or observed value |
| `multiple` | consisting of more than one |
| `net` | remaining after all subtractions |
| `nominal` | at the specified or designed value |
| `redundant` | duplicated to survive single failure |
| `residual` | remaining after the primary quantity has been removed |
| `single` | consisting of exactly one |

### Logical and procedural (24)

| Adjective | Sense pin |
|---|---|
| `acceptable` | within the range defined by specification |
| `accessible` | reachable for reading, writing, or physical access |
| `applicable` | relevant to the current condition |
| `automated` | performed by a system without human intervention |
| `bilateral` | involving two parties |
| `binary` | having exactly two possible states |
| `certified` | verified by an authorized review to meet specification |
| `compliant` | conforming to a stated rule or specification |
| `conditional` | dependent on a stated condition being true |
| `configurable` | adjustable by changing parameters |
| `consistent` | producing the same result under the same conditions |
| `critical` | (systems sense) whose failure causes system failure. Not "important" |
| `deterministic` | producing the same output for the same input every time |
| `discrete` | individually distinct and countable |
| `explicit` | stated directly and completely |
| `fixed` | set to a value that does not change during operation |
| `formal` | following a defined structure and rules |
| `immutable` | unable to be changed after creation |
| `mandatory` | required by specification |
| `optional` | permitted but not required |
| `preliminary` | occurring before the main procedure |
| `provisional` | in effect temporarily until replaced by a final version |
| `reversible` | capable of being returned to the previous state |
| `specified` | defined by a requirement or instruction |

### Spatial relation (22)

| Adjective | Sense pin |
|---|---|
| `above` | at a higher position than |
| `below` | at a lower position than |
| `bottom` | at the lowest position |
| `central` | at or near the geometric center |
| `distant` | far from a reference point |
| `downstream` | in the direction of flow from a reference point |
| `eastern` | in or toward the direction of planetary rotation |
| `forward` | in the direction of motion or facing |
| `inner` | closer to the center |
| `lateral` | to the side of the main axis |
| `left` | on the side that faces west when the front faces north |
| `local` | within the immediate region of the reference point |
| `northern` | toward the positive rotational pole |
| `outer` | farther from the center |
| `overhead` | directly above |
| `rear` | at the back |
| `remote` | far from the operating station |
| `right` | on the side that faces east when the front faces north |
| `southern` | toward the negative rotational pole |
| `top` | at the highest position |
| `upstream` | opposite to the direction of flow from a reference point |
| `western` | opposite to the direction of planetary rotation |

### Astronomy (11)

| Adjective | Sense pin |
|---|---|
| `celestial` | relating to objects or events in space beyond an atmosphere |
| `circumstellar` | surrounding a star |
| `extragalactic` | outside the local galaxy |
| `galactic` | relating to a galaxy |
| `intergalactic` | between galaxies |
| `interplanetary` | between planets within a star system |
| `interstellar` | between star systems within a galaxy |
| `lunar` | relating to a moon |
| `orbital` | relating to an orbit |
| `planetary` | relating to a planet |
| `suborbital` | following a trajectory that does not complete a full orbit |

### Physics (16)

| Adjective | Sense pin |
|---|---|
| `acoustic` | relating to sound waves |
| `atomic` | relating to atoms |
| `electric` | relating to or carrying electric charge |
| `electromagnetic` | relating to electric and magnetic fields and their radiation |
| `gravitational` | relating to gravity |
| `inertial` | relating to a frame of reference with no net force |
| `isotropic` | having the same properties in all directions |
| `anisotropic` | having different properties in different directions |
| `molecular` | relating to molecules |
| `nonlinear` | not proportional; output not a linear function of input |
| `nuclear` | relating to the nucleus of an atom |
| `optical` | relating to light in the visible range or to optics |
| `quantum` | relating to discrete units of energy or to quantum mechanics |
| `relativistic` | relating to effects at speeds approaching the speed of light |
| `thermal` | relating to heat or temperature |
| `thermodynamic` | relating to relations between heat, work, and energy |

### Information theory (4)

| Adjective | Sense pin |
|---|---|
| `analog` | represented by continuous physical quantities |
| `digital` | represented by discrete numerical values |
| `narrowband` | occupying a small range of frequencies |
| `wideband` | occupying a large range of frequencies |

### Arts and perception (12)

| Adjective | Sense pin |
|---|---|
| `asymmetric` | not invariant under mirror reflection |
| `chromatic` | relating to color |
| `concentric` | sharing the same center point |
| `diffuse` | scattered in many directions; not concentrated |
| `fluorescent` | emitting light at longer wavelength upon absorbing shorter-wavelength radiation |
| `iridescent` | producing color changes with viewing angle due to thin-film interference |
| `monochromatic` | consisting of a single wavelength or narrow band |
| `polychromatic` | consisting of multiple wavelengths |
| `radial` | extending outward from a center point |
| `refractive` | causing change in direction of wave propagation at a boundary |
| `symmetric` | invariant under a specified transformation |
| `translucent` | transmitting light with diffuse scattering |

### Cross-domain (4)

| Adjective | Sense pin |
|---|---|
| `bright` | having high luminous intensity |
| `centered` | positioned at the geometric center |
| `dim` | having low luminous intensity |
| `eccentric` | displaced from the geometric center; or having non-zero orbital eccentricity |

---

## 7. Adverbs (52)

### Temporal (16)

| Adverb | Sense pin |
|---|---|
| `afterward` | at a later time |
| `already` | before the present moment or a stated time |
| `always` | at all times within the specified scope |
| `beforehand` | before the event in question |
| `concurrently` | at the same time as another process |
| `currently` | at the present time |
| `eventually` | at some future time within the specified scope |
| `formerly` | at a previous time |
| `immediately` | with no measurable delay |
| `meanwhile` | during the same interval |
| `never` | at no time within the specified scope |
| `now` | at the present moment |
| `previously` | at an earlier time |
| `recently` | in the near past |
| `simultaneously` | at exactly the same time |
| `subsequently` | after the event in question |

### Manner (14)

| Adverb | Sense pin |
|---|---|
| `accurately` | with small error relative to the true value |
| `automatically` | without human intervention |
| `clockwise` | in the direction of rotation matching a clock face |
| `counterclockwise` | in the direction opposite to clockwise |
| `directly` | by the shortest path without intermediate steps |
| `evenly` | with uniform distribution |
| `firmly` | with resistance to displacement |
| `gradually` | by small increments over time |
| `manually` | by direct human or operator action |
| `precisely` | with small uncertainty |
| `rapidly` | at high speed |
| `securely` | in a manner resistant to unauthorized access or accidental release |
| `slowly` | at low speed |
| `steadily` | at a constant rate |

### Degree and frequency (14)

| Adverb | Sense pin |
|---|---|
| `almost` | within a small margin of a value |
| `approximately` | close to but not exactly equal to |
| `completely` | to the full extent |
| `entirely` | with no part excluded |
| `exactly` | with zero deviation from the stated value |
| `frequently` | at short intervals |
| `fully` | to the maximum extent |
| `largely` | to a great extent but not entirely |
| `mostly` | in the greater part |
| `nearly` | within a small margin of |
| `often` | in a high fraction of instances |
| `partially` | to an incomplete extent |
| `rarely` | in a small fraction of instances |
| `seldom` | at long intervals |

### Logical (8)

| Adverb | Sense pin |
|---|---|
| `accordingly` | in a way consistent with the preceding statement |
| `alternatively` | as another available option |
| `conversely` | with the terms or direction reversed |
| `hence` | as a logical consequence |
| `instead` | as a substitute |
| `nevertheless` | despite the preceding statement |
| `otherwise` | in the case where the stated condition does not hold |
| `therefore` | as a consequence of the preceding evidence or logic |

---

## 8. Numerals and Units (69)

### Cardinals and ordinals

`zero` through `twenty`, `thirty`, `forty`, `fifty`, `sixty`,
`seventy`, `eighty`, `ninety`, `hundred`, `thousand`, `million`,
`billion`, `trillion`

`first` through `tenth`, `last`, `final`, `penultimate`

### SI base units

`meter`, `kilogram`, `second`, `ampere`, `kelvin`, `mole`,
`candela`

### Common derived units

`hertz`, `newton`, `pascal`, `joule`, `watt`, `coulomb`,
`volt`, `ohm`, `farad`, `siemens`, `weber`, `tesla`, `henry`,
`lumen`, `lux`, `becquerel`, `decibel`, `sievert`

### SI prefixes

`yocto`, `zepto`, `atto`, `femto`, `pico`, `nano`, `micro`,
`milli`, `centi`, `deci`, `deka`, `hecto`, `kilo`, `mega`,
`giga`, `tera`, `peta`, `exa`, `zetta`, `yotta`

### Mathematical operators (as words)

`plus`, `minus`, `times`, `divided-by`, `equals`,
`greater-than`, `less-than`, `percent`, `per`

### Other measurement words

`bit`, `byte`, `pixel`, `degree` (angle), `radian`,
`steradian`, `day`, `hour`, `minute` (time), `year`,
`light-year`, `parsec`, `astronomical-unit`

---

## 9. Evidential Markers (15)

See companion document: **Beyond CNL Evidential System v0.4**.

Nine E-tag types in three tiers:

| Tier | Tag | Meaning |
|---|---|---|
| Direct | E-OBS | direct observation with named instrument |
| Direct | E-MSR | quantitative measurement with named instrument |
| Derived | E-DER | derivation from stated premises |
| Derived | E-RPT | report from cited record |
| Derived | E-SIM | simulation result from declared model, parameters, and run |
| Derived | E-AGG | statistical aggregate from declared dataset and method |
| Derived | E-HYP | bracketed hypothesis from declared candidate space and premises |
| Stipulative | E-DEF | definition of a term or parameter |
| Stipulative | E-PRO | procedural directive |

Every declarative clause must carry one E-tag in fixed final
parenthetical position. Evidential coverage must equal 1.0.
Deny-listed bases (opinion, intuition, cultural knowledge,
belief, desire, purpose, ungrounded generalization) are enforced by
lexicon exclusion: the words needed to express them do not
exist in this vocabulary.

---

## 10. Complete Lexicon Summary

| Category | Count |
|---|---|
| Function words | 137 |
| Method-only verbs | 325 |
| Nouns | 1084 |
| Adjectives | 239 |
| Adverbs | 52 |
| Numerals and units | 69 |
| Evidential markers | 15 |
| **Core total** | **~2,284** |
| Technical Name capacity | ~2,813 |
| **Maximum ceiling** | **5,000** |

### Self-describing property

Every word used in a sense-pin description appears in the lexicon itself or is a standard English function word.

Definitions for Technical Names use only lexicon words. This ensures the lexicon
can define itself without external reference, which is a necessary property for a language intended for communication with an entity of unknown capability and unknown access to external English dictionaries.

This property is a design goal, not yet fully enforced.

### Goguen-Meseguer non-interference test

The lexicon passes if two authors with identical procedures
but different identities, values, and intentions produce
byte-identical Beyond CNL documents. Every vocabulary
exclusion and sense-pin serves this property.

---

*End of Beyond CNL Lexicon v0.4.2.*
