# BEYOND: Background and Rationale

*More details about the problem BEYOND CNL was inspired by, the ideas used to reason about that problem, and how many of the rules of the language follow from them.*

The [README](README.md) outlines the core of Beyond CNL: a method-only subset of English with a mandatory evidential tag on every claim and a vocabulary from which disclosure has been removed. This file explains why the language looks the way it does.

This file is intended to be commentary, and the verbiage was created in part with AI. Where it and the specification files ever disagree, the specification governs. Most sections end with a note headed **In Beyond CNL** that ties the idea to a rule of the language. Where the repository states its own rationale, the note quotes it. The rest is this file's reading of the design.

> **Names.** **BEYOND**, in capitals, is the label for whatever lies upstream of us and outside our control. The repository and the language take their name from it. **Beyond CNL** is the language (the README sometimes shortens it to "Beyond"). **Local Agents** are everyone and everything agentic on our side of the boundary, AI systems included.

## The argument in brief

1. Something upstream sets the conditions we live under, and we cannot influence it. Call that a **one-way boundary**.
2. Suppose the boundary cracks, so that some action of ours has an effect upstream. What should the first action or message be?
3. Nobody can know what is upstream. It could be a planner, a process, an observer or a polity, and its stance could be benevolent, indifferent, adversarial or plural. No probabilities can be assigned to these cases.
4. Across all of them, one kind of first move does as well as any alternative, or nearly so: a move that is **sparse, verifiable, reversible and method-first**. It states what the senders do and how to check it, and nothing about who they are or what they want.
5. Beyond CNL builds that posture into a grammar. The vocabulary of identity, values, intentions and requests is absent, and every claim has to name its basis.

---

## 1. The question

Picture a laboratory team toggling an oscillator at chosen times at some point in the future. A team member notices that the toggling correlates with a tiny shift in a macroscopic observable at a very distant location, far outside anything the laboratory's instruments could influence or measure. Furthermore assume it turns out the correlation is reproducible.

Present physics gives no reason to expect this, and the case is counterfactual by design. It asks what should be done if a constraint taken to be absolute turned out to have an exception.

Whatever sets the conditions of our existence has so far influenced us in one direction only. We are on the receiving end of a **one-way boundary**. The project starts from the question of what follows if that boundary develops a crack, so that a dial on our side can move a needle on the other:

> *What would you say to something you cannot control or influence at all, at the moment you might first be able to?*

The picture is undramatic on purpose: no voice from the sky, only a small dial in our world that now moves a needle far away. Two questions follow. Should anything be said or done at all? And if something is said, what should come first?

**Why ask now.** There is no evidence that such a crack exists and no known method that would reveal one ahead of time. That is the reason to think about it in advance. Abrupt shifts from one regime to another are hard to predict even in systems that can be measured (Scheffer et al. 2009), so a question that can only be asked after the surprise will be answered in a hurry, by whoever happens to be in the room.

**Not only about AI.** The scenario does not have to be about artificial intelligence, although AI is the most familiar case of a counterpart that could become far more capable than its makers and move beyond their control. Good (1966) argued that a machine able to surpass humans in every intellectual activity could design still better machines, and there is a formal argument that a sufficiently capable system could not be fully contained even in principle (Alfonseca et al. 2021). The framework abstracts from what the counterpart is. Its subject is the transition from no influence to some influence.

**A conditional claim.** Nothing here asserts that such an entity exists or that such an opening will occur. The claim is that if an opening of this kind occurred, some first moves would be better than others, and that the better ones can be worked out ahead of time. Beyond CNL is part of that advance work: a way of writing that keeps the better first moves available and makes the worse ones hard to express.

## 2. Vocabulary

**Local Agents** are everyone and everything agentic on the near side of the boundary: people and institutions, software and AI systems, other animals, and any other minds able to set goals and act on them, including minds we do not yet have words for. "Agent" carries its minimal computer-science sense: a system that operates with some autonomy, responds to its environment and takes initiative toward goals (Wooldridge and Jennings 1995). The definition is inclusive for a practical reason: a plan that works for only one kind of mind fails when another kind acts.

**BEYOND** is whatever lies on the far side: out of reach, outside control and vastly more capable. It is not an acronym and not a character. It is capitalized to signal a category rather than a personality, and it covers many possibilities: a process woven into physics, a planner that anticipates us, a polity with factions, an observer that attends to how we decide, or simply the part of the universe that influences us while staying outside our practical reach.

The neutral label guards against a predictable error. People attribute humanlike minds most readily when human experience is the only model they have for the thing in front of them and when they are strongly motivated to explain or predict it (Epley, Waytz, and Cacioppo 2007). Both conditions would hold here. The two names do different jobs: "Local Agents" keeps responsibility on our side, and "BEYOND" keeps presumption out.

A **one-way boundary** is a relation in which BEYOND influences Local Agents and Local Agents do not influence BEYOND. A **crack**, or **path of influence**, is any physical, computational or logical means by which an action of Local Agents changes something upstream.

A **phase transition in the causal graph** is the appearance of such a path. It means an abrupt step change; gradual shifts in relative power are out of scope. Causal diagrams draw direct causal dependence as arrows and so make assumptions explicit (Pearl 1995). In those terms the transition is one new arrow:

```text
Before:   BEYOND ------> Local Agents

After:    BEYOND ------> Local Agents
          BEYOND <- - -  Local Agents     (new, and possibly very faint)
```

The new arrow has three immediate consequences.

1. **Actions become messages,** whether or not they are meant as messages.
2. **Inaction becomes a policy.** In standard models of disclosure, a party that is known to be able to speak and stays silent is taken to be withholding something unfavorable (Milgrom 1981).
3. **The order of moves starts to matter.** Local Agents can now move first by publicly committing to a rule. But in Bagwell's (1995) model of commitment, the advantage of moving first disappears if the other side observes the first move with even slight noise. A commitment counts only to the extent that it can be verified.

All three bear on the language. The first means that any document may be read upstream. The second means that saying nothing is not neutral either. The third is one reason why every claim in Beyond CNL has to name a basis that can be checked.

## 3. How a crack could appear: three channels

A crack in a one-way boundary could take at least three forms. Each defines a slightly different decision problem.

**A single bit.** Local Agents make one controlled difference, and it takes effect upstream: one bit, the smallest unit of information (Shannon 1948). Information theory measures how much is sent and deliberately sets aside what it means. Meaning depends on a code that both ends share, and here the code is unknown. Something would have been said, and the senders would not know what. A single toggle could prove that the channel exists and, in the eyes of whoever is watching, commit Local Agents to a meaning nobody chose.

**A visible, high-capacity channel.** Local Agents can send anything they like, and the sending itself can be seen. The situation resembles a microphone on a stage that is already live: sing, whisper or cough, and the audience learns something about you. The first transmission reveals capability and disposition as well as content, and it reveals them to every watcher, including other Local Agents.

**Prediction, a logical lever.** No signal is sent at all. If BEYOND can predict Local Agents so reliably that predicting them is easier than interacting with them, a published policy functions as a message. Decision theory has studied this structure since Nozick (1969) set out Newcomb's problem, in which a reliable predictor arranges matters according to its forecast of an agent's choice. Later work treats a decision as the output of a procedure that another party may be running or modeling, so that the two are linked for logical rather than causal reasons (Levinstein and Soares 2020). In this form, choices are messages.

The first two forms would require new physics or a channel that may never exist. The third requires neither.

| Channel | Main risk | What it implies for a first message |
|---|---|---|
| One bit | Committing to a meaning nobody chose; changing baselines for others | Test for meaning without declaring one |
| Visible wire | Revealing identity, capability and intent to BEYOND and to third parties | Make the first payload calibration, not declaration |
| Logical lever | Mistaking pattern for coupling; leaking to anyone who reads the published artifact | Publish only commitments worth keeping whether or not anyone predicts them |

**Dials.** Every channel exposes the same control variables: bandwidth, visibility, timing, reversibility, attribution, observability, collateral leakage and auditability. Lowering bandwidth, for example, slows learning but reduces visibility, leakage and the chance of being misread.

**In Beyond CNL.** A one-bit channel carries no text to govern. On the other two channels, text is the channel or part of it: the first payload on a visible wire, the published policy under a logical lever. That is where a language can help. Of the eight dials, it bears on the three that live in the text itself: collateral leakage, attribution and auditability. Bandwidth, timing and visibility belong to the protocol (see [section 11](#11-what-beyond-cnl-does-not-do)).

## 4. Where one-wayness comes from

At least three kinds of one-way boundary are conceivable, and each has a precedent in established science.

- **Physics or causal structure.** General relativity already contains one-way boundaries. Rindler (1956) introduced the term "event horizon" for the frontier between the events an observer can ever see and those it never can, and Finkelstein (1958, 965) showed that the surface now called a black hole's event horizon acts as "a perfect unidirectional membrane."
- **Computation.** Some operations are easy to perform and infeasible to reverse. These one-way functions underpin modern cryptography (Diffie and Hellman 1976). What counts as infeasible depends on resources, so a party with vastly more computing power can invert, predict or simulate what others cannot.
- **Design.** A boundary can be built on purpose. Proposals to confine an advanced AI so that it can only answer questions are designs for exactly this asymmetry (Armstrong, Sandberg, and Bostrom 2012). The simulation argument describes makers who can monitor everything that happens in a simulated world and intervene in it at will (Bostrom 2003). From the inside, such a world would be a one-way boundary by design.

A real boundary could combine all three, and a transition could relax one constraint while leaving the others in place. A lever that works through prediction opens a path without any change in physics, while a light-cone barrier may stay closed forever. A working rule is to state which edge a plan opens by physics, which by computation and which by design, and what the plan does if a route closes.

**In Beyond CNL.** The language is cause-agnostic in the same way. Nothing in its grammar depends on how the boundary arose or which channel opened. The same rules apply to a document sent over a wire and to one posted where a predictor might read it.

## 5. Goal, function and purpose

No single view brings BEYOND into focus, so the project uses two perspectives and switches between them. The first is goal, function and purpose.

When people talk about purpose, they usually mean one of three things.

| Term | What it is | Example | Where it exists |
|---|---|---|---|
| **Goal** | A target state that a system pursues | A thermostat's goal is to hold a set temperature | In the system |
| **Function** | The role a thing plays in a system; no intent is needed | A heating coil's function is to heat | In how the system is organized |
| **Purpose** (narrow sense) | What an observer says a thing is for | A homeowner says that a certain bedroom is for the kids | In the observer |

Each term has a home in the literature. In the minimal, cybernetic sense, behavior is goal-directed when it is steered by feedback from the goal (Rosenblueth, Wiener, and Bigelow 1943). Philosophers of science explain function by history, where a thing is there because of what it does (Wright 1973), or by contribution, where what a thing does helps explain what the system containing it can do (Cummins 1975). And Dennett (1971) made the parallel point about beliefs and desires: a thing counts as an "intentional system" only in relation to someone who is trying to explain and predict it.

The short version: **agents *have* goals; observers *give* purposes.** A river has no goal of irrigating fields, yet a miller can truthfully say that the river is for the mill, which is a claim indexed to the miller. "A star wants to make iron" smuggles a goal into physics. "Stellar evolution tends to produce heavier elements under certain constraints" keeps the function and drops the agency.

**The purpose tuple.** Since purpose is ascribed, it is best treated as a relation whose places have to be filled:

> ⟨Thing *x*, Beneficiary *y*, Goal *g*, Time *t*, Context *c*, Values *v*⟩
>
> read as "*x* is for *g* for *y* at time *t*, under context *c*, given values *v*"

A shorter form, ⟨bearer, ascriber, context, timescale⟩, makes explicit that every purpose claim has someone who makes it. A statement of the form "*x* is for *g*" is incomplete until the other places are filled. Writing them out guards against **illicit universalization**: the slide from "this is its purpose for these agents, now" to "this is its purpose." A hurricane's "purpose" is explanatory to a meteorologist, existential to a coastal city and operational to a satellite operator. Change one entry and the story changes.

**Applied to BEYOND.** "BEYOND has a purpose for Local Agents" is an ascription made by Local Agents. "BEYOND has goals" is a hypothesis about BEYOND that would need evidence and cannot be assumed.

**In Beyond CNL.**

- **Purpose is inexpressible.** The Evidential System puts "purpose / teleological linkage" on its deny-list of epistemic bases, because it leaks intent and goal structure (§3). The lexicon contains no `goal`, `purpose`, `intent`, `aim` or `objective`, and `want` is a banned verb. A star cannot want anything in Beyond CNL.
- **Purposive and causal links are gone.** Version 0.4 removed `so` and `because` from the lexicon, and rule E-PRO-5 bans purpose and cause clauses such as `so that` and `in order to`.
- **Function survives.** What remains of "why" is carried in two ways. A procedural step can name, in its `for` slot, a declared condition that the step contributes to. Rule E-PRO-4 says the slot "asserts a structural contribution to that condition, not a purpose or intent." And a mechanism can be stated as a derivation from a definition or condition. Both appear in the transistor sample:

  ```text
  7. Limit the heat time (procedure, step 7, for `COND-FRONT-SEPARATION`).
  `N-COLLECTOR` voltage above `P-BASE` voltage pulls electrons through `P-BASE` (follows, from `REVERSE-BIAS`).
  ```

  Both lines above record a *function*: what a step does inside the procedure, and what a part does inside the device. Whose goal the device serves, and who values it, stay outside the document. Even the noun `function` is admitted only in its process sense: "defined role or operation of a component within a system."
- **The `purpose:` field is narrow by rule.** Every document declares a `purpose:` in its frontmatter, but rule FRONT-2 requires it to be a valid Beyond CNL clause that contains no identity, intent, value or capability claims. In the detection-report sample it reads "Describe and bound the temperature, the acceleration, the line, and the periodic flux of source `SRC-1` within system `TS-1`." Read through the tuple, that names a thing and a task, and the `phase:` field supplies part of the context. FRONT-2 rules out a statement of values, and neither sample names a beneficiary.

## 6. Agent or oracle

The same upstream phenomenon can be read as an **agent** or as an **oracle**. Agents plan, adapt to incentives and anticipate. An oracle only exposes things: it may predict, but it does not plan or adapt. Heraclitus said of the god whose oracle is at Delphi that he "neither declares nor conceals, but gives a sign" (fragment B93; trans. Kahn 1979, 43).

Compare a lighthouse and a tugboat. A lighthouse changes what you do by letting you predict where the shore is; a tugboat changes what you do by moving you. BEYOND may be one, both or neither, so the safe course is to post decisions and cadences that stay wise under either. The AI-safety literature draws the same line between a system that only answers questions and one that acts in the world (Armstrong, Sandberg, and Bostrom 2012).

**Why the reading matters.** It changes what a message is. If BEYOND is an agent, a public commitment by Local Agents is a move in a game: early messages carry strategic meaning, bluffing becomes dangerous and credible commitments matter. If BEYOND is an oracle, the same commitment is addressed, in effect, only to other Local Agents.

**Why it is hard to tell.** A response that stays the same across contexts suggests an oracle. A response that depends on what Local Agents have committed to suggests an agent. Neither inference is safe on thin evidence, because people readily over-attribute agency (section 2) and, when they lack control, perceive illusory patterns more readily (Whitson and Galinsky 2008). An apparent reaction should be treated as evidence that the local apparatus is *observable*, never as evidence of *intent*.

**The design rule.** Messages suited to an oracle are meta-technical: they characterize the channel. Messages suited to an agent are sparse, verifiable and procedural. Since the reading may be wrong, every message should be tolerable under both.

**In Beyond CNL.**

- **A compliant document is tolerable under both readings.** Everything the language can say is sparse, tied to a named basis and procedural, which is what this section asks of a message to an agent. The language is also stocked for the meta-technical content this section asks of a message to an oracle: measurements with named instruments and uncertainties, and the vocabulary of channel characterization (`parity`, `checksum`, `duty-cycle`, `bitrate`, `signal-to-noise-ratio`).
- **Agency is never presupposed.** The skill file lists "attributing agency to BEYOND" as a common pitfall:

  ```text
  Wrong: BEYOND responded to our signal.
  Right: The anomaly rate decreased by 40% during the low-cadence window (measured, `CTR-1`).
  ```

- **The copula ban blocks the verdict.** With no form of "to be" in the language, "BEYOND is a planner" cannot be written at all. The skill file's replacement shows what can be written instead: a statement about behavior, tied to an instrument, that leaves open the question of what BEYOND *is*.

  ```text
  BEYOND exhibits planning-consistent responses (observed, `ARR-3`).
  ```

- **A correlation is recorded as a correlation.** The Evidential System's compliant observational example describes a signal decrease that "correlates with the pre-announced non-use schedule at r = 0.87" and that "persists across three independent baselines." One is tagged as a calculation and the other as an observation. Neither is called a response.
- **Conversions drop inferred design.** The source text of the detection-report sample calls its leading explanation "an engineered object under propulsion." The Beyond CNL version states the same candidate as "a source with internal power," which keeps everything that was measured and drops the inference of a designer. The lexicon has no `engineered`, `artificial` or `propulsion`.

## 7. What could be upstream: four structures, four stances

Put the 2 perspectives together and 4 structural types appear. Add the stance BEYOND might take toward Local Agents, and the result is a grid of 16 cases. The grid is a tool for testing strategies. It makes no claim about what exists, and something upstream could fall between the table cells or outside them. Its use is to try to help check whether a selected move depends on which table cell is the real one.

### 7.1 Four structures

| Structure | What it is | Evidence that would favor it | What it asks of Local Agents |
|---|---|---|---|
| **Planner** | A structure with coherent goals that anticipates the actions of Local Agents | Reactions track declared policies | Small, verifiable, time-consistent commitments |
| **Process** | A structure without goals, but with inputs and outputs | Response curves that do not change with context | Low-risk probes; report responses, not meanings |
| **Observer** | A structure that may value *how* Local Agents decide | Reactions track procedure, not payload | Method and verification; no narrative |
| **Polity** | A structure with many actors whose aims may vary widely | Contradictory responses at different interfaces | Neutrality; nothing that favors a faction |

**Planner.** A planner that anticipates other agents needs their policy more than their individual moves, so its natural input is a rule set. It will also discount commitments that the committing party would later have reason to abandon, which is the problem of time consistency (Kydland and Prescott 1977). What it can use is a minimal, verifiable rule that binds the sender, of the form "no symbol rate above R before date D."

**Process.** Alignment is the wrong concept for a process. The right ones come from control theory: whether the available inputs can move the system's state, and whether that state can be inferred from the outputs (Kalman 1960). Local Agents would look for low-risk perturbations and publish estimates of how the system responds, without claiming meanings.

**Observer.** Consistency over time, care in representing others, and a willingness to demonstrate restraint and to correct errors in public would matter in themselves. Messages would carry method and verification. The risk is performative transparency, which says more than it shows.

**Polity.** An arrangement with a composite actor has to be acceptable to the constituencies behind whoever speaks for it (Putnam 1988), and Local Agents would know nothing about those constituencies. The safe statements are the ones that every faction can ignore without loss or benefit from equally.

### 7.2 Four stances

| Stance | What it means | Typical failure of Local Agents | Indicated posture |
|---|---|---|---|
| **Benevolent** | Effects tend to support Local Agents | Wishful reading; complacency | Truthful, procedural, restrained; safe if the reading is wrong |
| **Indifferent** | Local Agents are means or side effects | Becoming useful or visible in the wrong way | Minimal payload and attribution; internal resilience |
| **Adversarial** | Legibility or influence predictably brings harm | Escalation; bluffing; internal fracture | Non-use, containment, de-escalation |
| **Plural** | Several factions or processes upstream | Co-option; becoming a bargaining chip | Neutrality stated as procedure |

**Benevolent.** BEYOND's actions or regularities support the flourishing of Local Agents. This needs no single agent: a process can be benevolent in its effects. The reading is easy to project onto noise, and support that holds in one narrow domain may not hold elsewhere.

**Indifferent.** Local Agents are not ends for BEYOND. They are at most means or a side effect. Great capability does not make this less likely. Bostrom's (2012) orthogonality thesis holds, with some caveats, that intelligence and final goals can vary independently of each other; it was stated for artificial minds and is borrowed here as a warning against inferring aims from capability. Ocean tides are the analogy: they move your boat, but not because they care where you are going. The task is to design around forces instead of appealing to them.

**Adversarial.** Bold steps would be unwise and bluffing worse. A threat costs nothing to make, and costless, unverifiable talk is credible only when the speaker has no incentive to misrepresent (Farrell and Rabin 1996). A far more capable and possibly predictive counterpart would not take a bluff at face value. The options are no message at all, or very sparse and safely reversible steps.

**Plural.** Upstream consists of factions or competing processes, and an action welcomed by one may be resented by another. The danger is being drawn into a conflict that Local Agents cannot understand, let alone control.

### 7.3 Reading the evidence

Evidence is useful only if it moves belief among the cells without over-fitting. Three cautions apply.

- **Bias.** People seek and interpret evidence in ways that favor what they already believe (Nickerson 1998). The benevolent reading is the one most people would prefer, so it needs the strongest evidence. What would count against each reading should be stated in advance and treated as binding.
- **Discriminating tests.** A test is useful to the extent that the cells predict different results for it. A small public commitment separates planner from process, since only a planner would respond to a commitment as such. A change of cadence with content held fixed separates process from observer. Contradictory responses at different interfaces, if they replicate, favor a polity. A team that cannot say which test bears on which cell is not ready to escalate.
- **Selection.** The absence of catastrophic responses to past restraint does not show that restraint is rewarded. Catastrophes that are incompatible with the existence of observers cannot appear in the observers' own past (Ćirković, Sandberg, and Bostrom 2010). Null results should be expected and published, and not read as approval.

**In Beyond CNL.** The hypothesis machinery turns the rule about discriminating tests into grammar.

- Candidates are declared in advance in the `hypothesis_space:` frontmatter. Each has a `statement` and a non-empty `discriminates_via` that names the measurement, observation or derivation that would tell it apart (rule E-HYP-3).
- An E-HYP clause names one candidate, its premises and a rival that it is `distinguishable-from` (E-HYP-2). By definition, it "does not assert personal belief or commitment to truth."
- A hypothesis cannot rest on another hypothesis (E-HYP-4), and it may appear only under a heading that begins with `Hypothesis` (HYP-PLACE).

A hypothesis can therefore enter a document only together with a rival and a declared way of telling the two apart. The detection-report sample shows the pattern: three candidates, each with a declared discriminator, two of them eliminated by named derivations, and a further derivation recording that no measurement excludes those two to zero.

```text
A source with internal power produces the high temperature, the acceleration, the narrow line, and the periodic flux (hypothesis, candidate `H-1`, from `MSR-1.3.1`, distinguishable-from `H-2`).
```

## 8. Choosing when nothing can be estimated

Nobody can know in advance which cell holds, and there are no data from which to estimate the odds. Decision research calls this condition **deep uncertainty**: the parties to a decision do not know, or cannot agree on, the right model of the situation, the probabilities of its outcomes or how to value them (Lempert et al. 2006; Marchau et al. 2019). Expected-value calculation has nothing to work with. The standard advice is to look instead for robust strategies, which perform acceptably across many plausible cases instead of optimally for a single forecast (Lempert et al. 2006).

A couple of well established criteria can help with selecting:

- **Maximin** chooses the action whose worst case is least bad (Wald 1945).
- **Minimax regret** chooses the action that minimizes the largest regret, the gap between what an action yields and what the best action would have yielded (Savage 1951).
- **Satisficing** accepts any action that clears a stated threshold in every case, instead of maximizing a poorly known objective (Simon 1955).
- **Precaution, under conditions.** Gardiner (2006) argues that precaution of this kind is justified when reliable probabilities are unavailable, when the worst outcomes are unacceptable, and when little weight is placed on what is given up by playing safe. A first move across the boundary meets the first two conditions in every case. The third is where the argument is most open to challenge.
- **Dominance.** One action dominates another if it does at least as well in every possible world and better in at least one. This is the strongest form of robustness, and it needs no probabilities.
- **Option value.** When an action may be irreversible and more will be learned later, the ability to choose again has a value of its own, and that value counts against the irreversible option (Arrow and Fisher 1974). Waiting is then a choice with a rationale.

Set side by side, the two kinds of first messages or actions tied to messages compare as follows:

| Stance | Sparse, procedural, reversible first message | Expressive or coercive first message |
|---|---|---|
| Benevolent | Benefits arrive later; a second message remains possible | Benefits may arrive sooner |
| Indifferent | Tests the channel at low risk; reveals little | Reveals much to no purpose; effects unpredictable |
| Adversarial | Offers little to exploit; can be withdrawn | Exposes weaknesses; a bluff invites a response |
| Plural | Takes no side | May please one faction and provoke another |

In three of the four rows the cautious message does at least as well, and in the first it loses only time. The structures lead to the same place by another route. A planner can use predictable, verifiable commitments directly. A process is characterized by sparse probes. A polity cannot easily turn a statement of method into factional advantage. An observer, by hypothesis, values the method itself.

The posture is therefore **near-dominant**, not dominant. It costs delay if BEYOND is benevolent and slower learning if BEYOND is a process. Maximin selects it, and so does minimax regret, provided that a benefit delayed is not a benefit lost, which is to say provided that a second message remains possible. That assumption is the main condition on the whole result.

The convergence has a simple explanation. Each property of the cautious message reduces the cost of being wrong about which cell is real, and the cells differ mainly in what a wrong guess costs. The posture responds to the uncertainty itself.

## 9. A useful posture in deep uncertainty: sparse, verifiable, reversible, method-first

One posture tends to come out dominant or nearly so from every stance and every structure:

- **Sparse:** low bandwidth, minimal semantic content, and no more disclosure of identity or intent than an action requires.
- **Verifiable:** claims about conduct can be checked cheaply by parties who do not trust the claimant.
- **Reversible:** actions can be stopped or undone, and commitments carry a stated procedure for amendment.
- **Method-first:** procedures are published before content, and what is communicated is how Local Agents act.

A fifth requirement goes with them: **escalation should never be a best response.** The reason is the security dilemma. Many of the steps one party takes to make itself safer make others less safe, so a move meant as protection can be read as a threat (Jervis 1978).

Several further ideas support the posture.

**Publicity.** In *Toward Perpetual Peace*, Kant proposes that actions affecting the rights of others are wrong if their maxim is incompatible with publicity: a plan that would defeat its own purpose if it were announced fails the test (Kant [1795] 1996, 8:381). The test is negative only. Failing it condemns a maxim, and passing it does not vindicate one. Against a counterpart that may predict or read Local Agents, a plan that depends on concealment has already failed. The only acceptable first response is one that the senders would be content to have read by anyone, including whatever is upstream.

**Calibration before content.** A channel is characterized by its capacity and its noise (Shannon 1948), and both have to be measured before anything can be sent through it reliably. A first message would therefore not be a greeting. It would resemble calibration, and its content would be procedural: what the senders do, what they will not do, in what way they will do it, and how all of it can be verified by others.

**Sparse and verifiable are compatible.** Cryptography has shown that a claim can be made checkable while revealing nothing beyond the fact that it is true (Goldwasser, Micali, and Rackoff 1989). Arms control offers a worked example: a protocol that lets an inspector confirm that an object is a genuine warhead while learning nothing about its design (Glaser, Barak, and Goldston 2014). The short name for the principle is proofs in place of payloads.

**Conditional rules, not threats.** A rule of the form *if harm metric H exceeds Z for two consecutive windows, pause all outward traffic for P cycles* is safer than a threat, because it is automatic and measurable. A threat or a promise influences others only if it is credible, and credibility comes from visibly constraining one's own future choices (Schelling 1960). Some arrangements should be refused on principle. A rule that rewards restraint only because escalation was threatened makes threatening attractive, and such blackmail-like arrangements are best refused by design, before anyone asks.

**Method-only content.** This means statements of procedural properties and verifiability, with no identity, intent, requests or value-laden payloads. It should make prediction cheap and misinterpretation costly. A model is an operational notice of this kind:

> For Window W23 (2027-03-01–2027-03-31 UTC) this interface remains in non-use; symbol-rate cap ≤ 0.1 bits/day; automatic 14-day pause after two consecutive crossings of harm metric; verification via public anchors.

Two kinds of message are excluded:

- the **expressive greeting**, such as the README's "We, the people of Earth, seek friendship and understanding," which carries identity, location, intent and values;
- the **bargaining message**, such as "Acknowledge within 48 hours or we escalate," which embeds leverage, reveals capability and invites a contest.

Method-only content is also better than silence. Silence is read as withholding (section 2), whereas a statement of procedures discloses conduct and little else. Publishing methods before payloads does not avoid meaning. It earns the standing to convey it later.

The same restraint applies as a matter of ethics. Nobody knows whether BEYOND can be wronged, so the posture excludes coercion, deception and manipulation toward it, including manipulation that would probably work.

**In Beyond CNL.** The language has no suasive verbs (`ask`, `demand`, `urge`), no deontic modals (`should`, `must`) and no second person, so it has no words for asking, demanding or obliging a reader. What it can state is a procedure, with steps gated on conditions that the document declares. And every claim has to name its basis. That does not make deception impossible, since a reading can be fabricated, but it ties each claim to a named source that others can check. [Section 11](#11-what-beyond-cnl-does-not-do) notes the limit of this: the grammar removes the wording of a threat, not the possibility of a coercive rule.

## 10. From posture to grammar

The README lists what the language removes and what it requires. The table below shows which part of the argument each rule serves, and the subsections after it take up six of the connections in more detail.

| Idea in the framework | Where it shows up in Beyond CNL | Look in |
|---|---|---|
| Method-only content | Nine evidential tags and nothing else: observation, measurement, derivation, report, simulation, aggregate, bounded hypothesis, definition, procedure | Evidential System §2 |
| Disclosure hazards: identity, intent, capability, values, location | Banned word classes, each listed with the hazard it would leak; a heuristic hazard scan in the linter | Lexicon §1.4; `js/linter.js` |
| Sparse | A closed, sense-pinned lexicon of roughly two thousand core words; sentence limits of 25 words (declarative) and 20 (imperative); no intensifiers, affect words or exclamation marks | Lexicon §1, §10; SKILL.md |
| Verifiable | A tag on every declarative clause (coverage must equal 1.0); identifiers that must resolve to declared instruments, records, conditions or tagged clauses; no circular derivations; hearsay limited to depth 1 | Evidential System §2, §6.9, §7.3 |
| Reversible | Words for stop rules, pauses and amendments (`pause`, `resume`, `retract`, `amend`, `rollback`) and steps gated on conditions. The language can state reversibility; only a protocol can provide it | Lexicon §4, §5 |
| Method-first | Numbered imperative steps; conditions declared once and cited by identifier; a formal grammar and a linter | Evidential System §2, §6 |
| Conditional rules, not threats or requests | No suasive verbs or deontic modals; steps gated by `(procedure, if …)` | Lexicon §1.4; Evidential System §6.10 |
| Provenance by method, not by sender | Non-interference as the design target | Evidential System §7.4 |
| Publicity | Open design: the grammar, lexicon and linter are public | SKILL.md (Design Lineage) |
| Agent or oracle | The copula ban; the agency-attribution pitfall | SKILL.md |
| Goal, function and purpose | Purpose on the deny-list; no words for goals or intent; the `for` slot | Evidential System §3; E-PRO-4, E-PRO-5 |
| Discriminating tests | `hypothesis_space:` with `discriminates_via`; `distinguishable-from` in every hypothesis tag | Evidential System §2, §5 |
| A phased protocol | `phase:` limited to five named phases | Evidential System §5 (FRONT-3) |
| Triggers an outsider can check | `conditions:` entries cited by identifier | Evidential System §5 |
| Calibration before content | A `calibration:` entry for declared instruments; the vocabulary of channel characterization | Evidential System §5; Lexicon §5 (J) |
| Neutrality toward factions | No proper nouns of groups, nations, species or locations; no evaluative adjectives | Lexicon §1.4 |
| No home-world fingerprints | `earthquake` replaced by `quake`; 42 nouns admitted for worlds, organisms and systems unlike those of one home world | Lexicon §2; SKILL.md changelog |
| Fail-safe defaults | An allow-list lexicon; one rejected clause rejects the document | Evidential System §7.2 |

### 10.1 Evidential tags: method without mind

The Evidential System opens with the requirement that every assertion declare how the author came to hold it. An observer that values how decisions are made is shown exactly that. Any other kind of reader, and any skeptical Local Agent, can check it.

The tags do a second job as well. The specification argues that "unmarked assertions leak cognitive architecture": a capable reader could infer from unmarked claims how the author reasons, what it treats as true by default and where its confidence ends. Mandatory tags make those boundaries explicit and the same for every author. The result is disclosure of method without disclosure of mind. The deny-list follows from the same idea. Opinion, intuition, cultural knowledge, ungrounded generalization, hearsay without a source, belief, desire, prediction without a model, and purpose have no tag.

### 10.2 Non-interference: what the text must not depend on

Goguen and Meseguer (1982) defined non-interference for computer systems: one group of users does not interfere with another if what the second group can see is unaffected by what the first group does. Beyond CNL transposes the idea to authorship. The inputs that must not interfere are the author's identity, values and intentions; the output is the document. If two authors with the same instrument readings, definitions and procedure produce different documents, something about the authors has leaked into the text.

This target explains choices that might otherwise look pedantic. Each word has exactly one approved meaning, and a word is admitted only if its "inclusion does not create synonymy enabling sense-evasion" (Lexicon §1.5). Fewer ways to say the same thing leave less room for style, and a stylistic flourish can identify an author even when the content is sparse. Non-interference is also the grammatical counterpart of a rule for provenance: state it by method, never by sender. Even unaided human observation is tagged with the role `operator`, not with a name.

### 10.3 Safety through grammar

Why build the posture into a grammar instead of writing a style guide? Because restraint is least reliable when it matters most. A model of races to develop powerful AI predicts that competitors who each want to be first will cut back on precautions (Armstrong, Bostrom, and Shulman 2016), and an apparent discovery would create the same pressure to be first. A message that the grammar cannot express does not depend on anyone's restraint in the moment.

In the skill file's words, "the language achieves safety through grammar, not policy," and the README adds that "safe communication only requires continued use of this method-only language." The README credits this layer of the design to Saltzer and Schroeder (1975), whose principle is to base decisions on permission, not exclusion, so that a mistake fails toward refusal. The lexicon is an allow-list. By the specification's acceptance rule (§7.2), a single rejected clause rejects the whole document. And the skill file's quick reference ends with "expressiveness gap = correct behavior." The aim is to make good behavior the easy behavior.

The model throughout is a programming language: a formal envelope grammar in EBNF, typed identifiers that resolve against declared records, a type checker for registers, and a linter with tests.

### 10.4 The five phases

The `phase:` field refers to the contact protocol that the language is meant to serve. The protocol has five phases, Discovery, Validation, Characterization, Open Contact and Negotiation, each with entry criteria, dials that may be moved, and exit criteria. Discovery ends when two independent replications confirm a phenomenon and stress tests do not eliminate it. Characterization ends when capacity is mapped at low duty cycles with no sign of an adversarial response.

The gates tighten along the way. Before a phenomenon is even called a candidate channel, it has to climb a validation ladder: replication inside the team, replication by a distant group with different parts and different incentives, and conditions, deliberately created, under which a genuine effect must vanish. Open contact is worth considering only when cautious experiments have stabilized, when many communities have had time to weigh in, and when the likely readings across the grid are not catastrophic. Negotiation presupposes leverage: Local Agents should bargain only if BEYOND demonstrably depends on something they control and using that control would not destroy what they aim to protect.

Movement between phases is driven by triggers and thresholds that an outsider can check. "If harm metric H exceeds value Z for two consecutive windows, pause all outward traffic for P cycles" is such a trigger. "If we feel unsafe, we will pause" is not. In Beyond CNL, a trigger becomes an entry in `conditions:` that procedural steps cite by identifier, and every document states which of the five phases it belongs to.

### 10.5 An operational notice in Beyond CNL

Here is the operational notice from [section 9](#9-the-posture-sparse-verifiable-reversible-method-first), rendered as a complete Beyond CNL document. The repository's linter reports no errors and no warnings for it (checked at commit `3a0875b`).

```markdown
---
schema: beyond-cnl-v0.4
purpose: Limit the transmission rate of interface `IF-1` during window `W-23`.
phase: Open-Contact
references:
  - id: REF-LOG-1
    title: Record of interface settings with hash anchors
    access: public
technical_names:
  - term: IF-1-LIMITS
    pos: noun
    definition: the protocol that limits interface `IF-1`
  - term: IF-1
    pos: noun
    definition: the interface under this protocol
  - term: W-23
    pos: noun
    definition: the window of 31 days under this protocol
  - term: RATE-CAP
    pos: noun
    definition: the maximum symbol rate through interface `IF-1`
  - term: HARM-METRIC
    pos: noun
    definition: the count of anomalies per cycle above threshold `Z`
  - term: Z
    pos: noun
    definition: the threshold value for the anomaly count
conditions:
  - id: COND-HARM
    statement: "`HARM-METRIC` exceeds threshold `Z` in 2 consecutive windows."
---

# Protocol `IF-1-LIMITS`

## Procedure

1. Disable all transmission through interface `IF-1` during window `W-23` (procedure, step 1).
2. Set `RATE-CAP` to 0.1 bit per day (procedure, step 2).
3. Pause all transmission through interface `IF-1` for 14 days (procedure, step 3, if `COND-HARM`).
4. Log each setting of interface `IF-1` to record `REF-LOG-1` (procedure, step 4).
5. Publish the hash of each entry in record `REF-LOG-1` (procedure, step 5).
```

Each clause of the notice maps to a part of the document. "Remains in non-use" is step 1. The symbol-rate cap is step 2. The automatic pause is step 3, gated on a condition declared once in the frontmatter, so that anyone can check when it fires. "Verification via public anchors" is steps 4 and 5, together with a reference whose access is `public`. One thing does not carry over: the linter flags a calendar date in prose as an unrecognized token, so the window is defined here by its length.

The README's greeting has no compliant form. It carries no evidential tag, `wish` and `our` are banned, and `people`, `Earth`, `seek`, `friendship`, `peace` and `knowledge` are not in the lexicon. Under the filter mode that the specification describes (§7.2), it reduces to nothing, which is what the README means when it says the greeting "would reduce to empty output."

The Evidential System draws on the same notice in its own examples. Its sample frontmatter defines `COND-2.1` as a harm metric that exceeds threshold Z for two consecutive windows, and its procedural example sets "the symbol-rate cap to 0.1 bits per day" and pauses "all outward transmission for 14 days."

### 10.6 Questions for the fifth layer

The linter automates the lexicon, grammar and evidential checks and adds a heuristic hazard scan. The specification assigns the fifth enforcement layer, semantic coherence and the information-hazard scan, to human or AI review with a reviewer checklist (§7.1). Questions such a checklist can put to any Beyond CNL document:

1. What is the smallest true statement that improves safety?
2. If silence were safer, how would speaking be justified, and could silence itself be read as a message?
3. How will this read to agents unlike its authors, or to machines with different priors?
4. What will an unfriendly reader learn from this message that could not be learned from the published methods alone?
5. What can a hostile reader infer from the existence of the action, as distinct from its content?
6. How would the message be read if BEYOND is an oracle, and how if it is an agent? Is each reading tolerable?
7. When a sentence uses "for," does it describe a goal that an agent pursues, a function that a mechanism performs, or a purpose that an observer ascribes?
8. Does any conditional step work as a threat or a bargain?
9. Which commitments would be wise even if no one predicts them?
10. Which details would enable misuse if published, and what equally verifiable substitutes exist?

## 11. What Beyond CNL does not do

- **It governs what a document says, not whether, when, how often or by whom it is sent.** Some hazards come from the existence of information and not from its content: a high-rate transmission reveals capability whatever it says. Bandwidth, timing, visibility and duty cycle are dials of the protocol, not of the grammar.
- **It does not decide who may send.** When many parties can each take an action that affects all of them, and each acts on its own judgment, the action is taken more often than is optimal: the unilateralist's curse (Bostrom, Douglas, and Sandberg 2016). Dual control, quorums and moratoria belong to governance among Local Agents, outside any grammar.
- **It removes the wording of a threat, not the structure.** The bargaining message of section 9 cannot be written as it stands: `escalate` is not in the lexicon, there is no second person to address, and an imperative is admitted only as a tagged step of a procedure. But a rule with the same shape can be written. A condition declared as "No signal arrives at interface `IF-1` within 48 hours" and a step that raises a rate cap when that condition holds pass the linter without a warning. Whether a set of conditional steps amounts to a threat or a bargain is a question for review and for the protocol.
- **It does not check meaning.** The envelope grammar does not validate that a clause makes sense, does not detect contradictions between clauses and does not check values against an instrument's range. The information-hazard scan is a heuristic backed by review (Evidential System §6.11 and §7.1).
- **It does not make a message neutral.** Silence is read as withholding (Milgrom 1981), and a sparse document may read as evasive for the same reason. The framework's reply is that method-only content still beats no content, because a statement of procedures discloses conduct.
- **It cannot hide what measurements reveal.** The skill file forbids boasting about precision ("State the measurement. Precision speaks for itself."), but a measurement still shows what its instrument can resolve. Grammar can remove the explicit claim, not the implicit evidence.
- **Its verification serves Local Agents more than it constrains BEYOND.** A claim that is cheap to verify and hard to forge stays that way only against a forger with bounded resources, and a counterpart with vastly greater resources may not be bound in that way. Evidential tags and resolvable identifiers mainly make Local Agents accountable to one another and predictable to others. They are not a defense against BEYOND.

## 12. Open questions

From the repository itself:

- **Non-interference, tested.** The differential-authoring test described in the Evidential System (§7.4) "has not yet been run at scale." The protocol, the author profiles and the divergence metric are still to be designed, and they are what would make the non-interference claim empirical.
- **Self-description.** The lexicon aims to define itself using only its own words, which the Lexicon calls necessary for "communication with an entity of unknown capability and unknown access to external English dictionaries." For now, this is "a design goal, not yet fully enforced." It connects back to the one-bit problem in section 3: meaning needs a shared code, and a self-describing lexicon is an attempt to send part of the code along with the message.

From the framework:

- **The scenario may be impossible.** Gardiner's (2006) account restricts precaution to threats that are realistic, and no evidence suggests that such a crack exists. The argument is conditional, and it still stands as a worked case of choice under deep uncertainty.
- **The grid may be incomplete, and the comparison is qualitative.** A formal model with explicit actions, states and payoffs would test whether near-dominance survives. It has not been built.
- **A second message may not be possible.** Strong forms of precaution are criticized because risks lie on every side, including the side of inaction (Sunstein 2005). If the opening were a one-time opportunity, delay would forfeit it, and the main reply to the cost of caution would fail.
- **Would the posture be followed?** See [section 10.3](#103-safety-through-grammar).
- **Which world are we in?** Which tests move belief among the cells without over-fitting anecdotes, and which policies stay safe across cells while evidence is thin?
- **The moral status of BEYOND.** Which actions are acceptable whatever that status turns out to be, and which should wait until it is better understood?

## 13. Worth having even if no crack appears

The README lists uses that need no phase transition: long-duration archive markers, handshakes between AI systems whose capabilities may be vastly different, and sensor networks. More generally, the language fits any case where a document should convey what instruments do and what they measured without conveying who placed them, where they came from or what they want.

The discipline is also worth having for its own sake. Claims that name their basis, restraint that others can verify, and procedures stated before content reduce risks that already exist, whether or not anything upstream ever becomes reachable.

## 14. Reading map

| File | What it is |
|---|---|
| [README.md](README.md) | What the language is, on one page |
| [Beyond CNL Evidential System.md](Beyond%20CNL%20Evidential%20System.md) | The nine evidential tags, the deny-list, the frontmatter schema, the formal envelope grammar (EBNF), the five enforcement layers and the non-interference test |
| [Skill files for LLMs/SKILL.md](Skill%20files%20for%20LLMs/SKILL.md) | The working reference for authors and LLMs: rules, the 325 approved verbs, pitfalls, a conversion workflow and a quick-reference card |
| [Beyond CNL Lexicon.md](Beyond%20CNL%20Lexicon.md) and the [companion lexicon](Skill%20files%20for%20LLMs/beyond_cnl_COMPANION_LEXICON.md) | The sense-pinned vocabulary |
| [samples/](samples/) | Two ordinary-English source texts, a detection report and a transistor construction manual, next to their Beyond CNL conversions. Reading each pair side by side is the quickest way to see what the language keeps and what it drops |
| [Linter](https://alex987654.github.io/BEYOND/Beyond-CNL-Linter.html) | The grammar and lexicon checker; `node --test` runs the test suite |

## 15. Glossary

| Term | Meaning |
|---|---|
| **Agent / oracle** | An agent plans, adapts to incentives and anticipates. An oracle exposes regularities or responds in fixed ways, without planning or adapting |
| **BEYOND** | The label for whatever lies upstream, outside the control of Local Agents; a category, not a character |
| **Channel** | The form a crack takes: one bit, a visible wire or a logical lever |
| **Crack** | A path of influence from Local Agents to BEYOND where there was none |
| **Dials** | The controllable variables of a channel: bandwidth, visibility, timing, reversibility, attribution, observability, collateral leakage and auditability |
| **E-tag** | An evidential tag: the parenthetical at the end of a Beyond CNL clause that names its basis |
| **Goal / function / purpose** | A goal is a target state a system pursues. A function is the role a thing plays, with no intent required. A purpose is what an observer ascribes |
| **Local Agents** | Everyone and everything agentic on the near side of the boundary, AI systems included |
| **Method-only content** | Statements of procedure and verifiability, with no identity, intent, requests or values |
| **Non-interference** | The design target that a document must not depend on its author's identity, values or intentions |
| **Observer** (structure) | A possible kind of BEYOND that values how Local Agents decide. Not the same as the lexicon's `observer`, a role noun for a person or system that registers and reports measurements |
| **One-way boundary** | A relation in which BEYOND influences Local Agents and not the reverse |
| **Operational notice** | A model of method-only content: what an interface does, under which conditions, and how to verify it |
| **Phase** | One of the protocol's five stages: Discovery, Validation, Characterization, Open-Contact, Negotiation |
| **Phase transition** | The abrupt appearance of a path of influence toward BEYOND |
| **Planner, process, polity** | Possible structures of BEYOND: coherent and anticipatory; goal-free with inputs and outputs; many actors with contested aims |
| **Purpose tuple** | ⟨thing, beneficiary, goal, time, context, values⟩: the places a purpose claim has to fill |
| **Stance** | How BEYOND's behavior bears on Local Agents: benevolent, indifferent, adversarial or plural |
| **Technical Name** | The escape mechanism for a noun outside the core lexicon: bold at first use with a `definition` block, inline code afterwards, registered in the frontmatter |

## 16. References

Alfonseca, Manuel, Manuel Cebrian, Antonio Fernandez Anta, Lorenzo Coviello, Andrés Abeliuk, and Iyad Rahwan. 2021. "Superintelligence Cannot Be Contained: Lessons from Computability Theory." *Journal of Artificial Intelligence Research* 70: 65–76. https://doi.org/10.1613/jair.1.12202

Armstrong, Stuart, Nick Bostrom, and Carl Shulman. 2016. "Racing to the Precipice: A Model of Artificial Intelligence Development." *AI & Society* 31 (2): 201–206. https://doi.org/10.1007/s00146-015-0590-y

Armstrong, Stuart, Anders Sandberg, and Nick Bostrom. 2012. "Thinking Inside the Box: Controlling and Using an Oracle AI." *Minds and Machines* 22 (4): 299–324. https://doi.org/10.1007/s11023-012-9282-2

Arrow, Kenneth J., and Anthony C. Fisher. 1974. "Environmental Preservation, Uncertainty, and Irreversibility." *Quarterly Journal of Economics* 88 (2): 312–319. https://doi.org/10.2307/1883074

Bagwell, Kyle. 1995. "Commitment and Observability in Games." *Games and Economic Behavior* 8 (2): 271–280. https://doi.org/10.1016/S0899-8256(05)80001-6

Bostrom, Nick. 2003. "Are You Living in a Computer Simulation?" *Philosophical Quarterly* 53 (211): 243–255. https://doi.org/10.1111/1467-9213.00309

Bostrom, Nick. 2012. "The Superintelligent Will: Motivation and Instrumental Rationality in Advanced Artificial Agents." *Minds and Machines* 22 (2): 71–85. https://doi.org/10.1007/s11023-012-9281-3

Bostrom, Nick, Thomas Douglas, and Anders Sandberg. 2016. "The Unilateralist's Curse and the Case for a Principle of Conformity." *Social Epistemology* 30 (4): 350–371. https://doi.org/10.1080/02691728.2015.1108373

Ćirković, Milan M., Anders Sandberg, and Nick Bostrom. 2010. "Anthropic Shadow: Observation Selection Effects and Human Extinction Risks." *Risk Analysis* 30 (10): 1495–1506. https://doi.org/10.1111/j.1539-6924.2010.01460.x

Cummins, Robert. 1975. "Functional Analysis." *Journal of Philosophy* 72 (20): 741–765. https://doi.org/10.2307/2024640

Dennett, D. C. 1971. "Intentional Systems." *Journal of Philosophy* 68 (4): 87–106. https://doi.org/10.2307/2025382

Diffie, Whitfield, and Martin E. Hellman. 1976. "New Directions in Cryptography." *IEEE Transactions on Information Theory* 22 (6): 644–654. https://doi.org/10.1109/TIT.1976.1055638

Epley, Nicholas, Adam Waytz, and John T. Cacioppo. 2007. "On Seeing Human: A Three-Factor Theory of Anthropomorphism." *Psychological Review* 114 (4): 864–886. https://doi.org/10.1037/0033-295X.114.4.864

Farrell, Joseph, and Matthew Rabin. 1996. "Cheap Talk." *Journal of Economic Perspectives* 10 (3): 103–118. https://doi.org/10.1257/jep.10.3.103

Finkelstein, David. 1958. "Past-Future Asymmetry of the Gravitational Field of a Point Particle." *Physical Review* 110 (4): 965–967. https://doi.org/10.1103/PhysRev.110.965

Gardiner, Stephen M. 2006. "A Core Precautionary Principle." *Journal of Political Philosophy* 14 (1): 33–60. https://doi.org/10.1111/j.1467-9760.2006.00237.x

Glaser, Alexander, Boaz Barak, and Robert J. Goldston. 2014. "A Zero-Knowledge Protocol for Nuclear Warhead Verification." *Nature* 510 (7506): 497–502. https://doi.org/10.1038/nature13457

Goguen, J. A., and J. Meseguer. 1982. "Security Policies and Security Models." In *Proceedings of the 1982 IEEE Symposium on Security and Privacy*, 11–20. Oakland, CA: IEEE. https://doi.org/10.1109/SP.1982.10014

Goldwasser, Shafi, Silvio Micali, and Charles Rackoff. 1989. "The Knowledge Complexity of Interactive Proof Systems." *SIAM Journal on Computing* 18 (1): 186–208. https://doi.org/10.1137/0218012

Good, I. J. 1966. "Speculations Concerning the First Ultraintelligent Machine." *Advances in Computers* 6: 31–88. https://doi.org/10.1016/S0065-2458(08)60418-0

Jervis, Robert. 1978. "Cooperation under the Security Dilemma." *World Politics* 30 (2): 167–214. https://doi.org/10.2307/2009958

Kahn, Charles H. 1979. *The Art and Thought of Heraclitus: A New Arrangement and Translation of the Fragments with Literary and Philosophical Commentary*. Cambridge: Cambridge University Press. https://doi.org/10.1017/CBO9780511627392

Kalman, R. E. 1960. "On the General Theory of Control Systems." *IFAC Proceedings Volumes* 1 (1): 491–502. https://doi.org/10.1016/S1474-6670(17)70094-8

Kant, Immanuel. (1795) 1996. "Toward Perpetual Peace." In *Practical Philosophy*, edited and translated by Mary J. Gregor, 311–352. The Cambridge Edition of the Works of Immanuel Kant. Cambridge: Cambridge University Press. https://doi.org/10.1017/CBO9780511813306

Kydland, Finn E., and Edward C. Prescott. 1977. "Rules Rather than Discretion: The Inconsistency of Optimal Plans." *Journal of Political Economy* 85 (3): 473–491. https://doi.org/10.1086/260580

Lempert, Robert J., David G. Groves, Steven W. Popper, and Steve C. Bankes. 2006. "A General, Analytic Method for Generating Robust Strategies and Narrative Scenarios." *Management Science* 52 (4): 514–528. https://doi.org/10.1287/mnsc.1050.0472

Levinstein, Benjamin A., and Nate Soares. 2020. "Cheating Death in Damascus." *Journal of Philosophy* 117 (5): 237–266. https://doi.org/10.5840/jphil2020117516

Marchau, Vincent A. W. J., Warren E. Walker, Pieter J. T. M. Bloemen, and Steven W. Popper, eds. 2019. *Decision Making under Deep Uncertainty: From Theory to Practice*. Cham: Springer. https://doi.org/10.1007/978-3-030-05252-2

Milgrom, Paul R. 1981. "Good News and Bad News: Representation Theorems and Applications." *Bell Journal of Economics* 12 (2): 380–391. https://doi.org/10.2307/3003562

Nickerson, Raymond S. 1998. "Confirmation Bias: A Ubiquitous Phenomenon in Many Guises." *Review of General Psychology* 2 (2): 175–220. https://doi.org/10.1037/1089-2680.2.2.175

Nozick, Robert. 1969. "Newcomb's Problem and Two Principles of Choice." In *Essays in Honor of Carl G. Hempel*, edited by Nicholas Rescher, 114–146. Synthese Library 24. Dordrecht: Springer. https://doi.org/10.1007/978-94-017-1466-2_7

Pearl, Judea. 1995. "Causal Diagrams for Empirical Research." *Biometrika* 82 (4): 669–688. https://doi.org/10.1093/biomet/82.4.669

Putnam, Robert D. 1988. "Diplomacy and Domestic Politics: The Logic of Two-Level Games." *International Organization* 42 (3): 427–460. https://doi.org/10.1017/S0020818300027697

Rindler, W. 1956. "Visual Horizons in World Models." *Monthly Notices of the Royal Astronomical Society* 116 (6): 662–677. https://doi.org/10.1093/mnras/116.6.662

Rosenblueth, Arturo, Norbert Wiener, and Julian Bigelow. 1943. "Behavior, Purpose and Teleology." *Philosophy of Science* 10 (1): 18–24. https://doi.org/10.1086/286788

Saltzer, Jerome H., and Michael D. Schroeder. 1975. "The Protection of Information in Computer Systems." *Proceedings of the IEEE* 63 (9): 1278–1308. https://doi.org/10.1109/PROC.1975.9939

Savage, L. J. 1951. "The Theory of Statistical Decision." *Journal of the American Statistical Association* 46 (253): 55–67. https://doi.org/10.2307/2280094

Scheffer, Marten, Jordi Bascompte, William A. Brock, Victor Brovkin, Stephen R. Carpenter, Vasilis Dakos, Hermann Held, Egbert H. van Nes, Max Rietkerk, and George Sugihara. 2009. "Early-Warning Signals for Critical Transitions." *Nature* 461 (7260): 53–59. https://doi.org/10.1038/nature08227

Schelling, Thomas C. 1960. *The Strategy of Conflict*. Cambridge, MA: Harvard University Press.

Shannon, C. E. 1948. "A Mathematical Theory of Communication." *Bell System Technical Journal* 27 (3): 379–423 (concluded in 27 (4): 623–656). https://doi.org/10.1002/j.1538-7305.1948.tb01338.x

Simon, Herbert A. 1955. "A Behavioral Model of Rational Choice." *Quarterly Journal of Economics* 69 (1): 99–118. https://doi.org/10.2307/1884852

Sunstein, Cass R. 2005. *Laws of Fear: Beyond the Precautionary Principle*. Cambridge: Cambridge University Press. https://doi.org/10.1017/CBO9780511790850

Wald, Abraham. 1945. "Statistical Decision Functions Which Minimize the Maximum Risk." *Annals of Mathematics* 46 (2): 265–280. https://doi.org/10.2307/1969022

Whitson, Jennifer A., and Adam D. Galinsky. 2008. "Lacking Control Increases Illusory Pattern Perception." *Science* 322 (5898): 115–117. https://doi.org/10.1126/science.1159845

Wooldridge, Michael, and Nicholas R. Jennings. 1995. "Intelligent Agents: Theory and Practice." *Knowledge Engineering Review* 10 (2): 115–152. https://doi.org/10.1017/S0269888900008122

Wright, Larry. 1973. "Functions." *Philosophical Review* 82 (2): 139–168. https://doi.org/10.2307/2183766
