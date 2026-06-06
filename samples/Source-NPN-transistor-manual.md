# How to Build an NPN Transistor
### A Construction Manual for the Semiconductor Artisan

*Intended for craftspeople who possess purified semiconductor crystals and understand doping, but who have not yet built a working transistor.*

---

## Part 1 — What You Are Trying to Build, and Why It Works

A transistor is a device that lets a **small** current control a **large** one. This single property is enough to build amplifiers (making faint signals strong) and switches (the foundation of all computing logic). Before this device, the only way to amplify was the fragile, hot, power-hungry vacuum tube. The transistor replaces it with a sliver of solid crystal.

The NPN transistor is a sandwich of three doped regions laid side by side. Picture a cross-section as three blocks pressed together in a row. On the left is the **emitter**, a region of heavily-doped N-type germanium. In the middle is the **base**, a *thin* and lightly-doped P-type layer. On the right is the **collector**, a region of lightly-doped N-type germanium. Two boundaries form inside this sandwich: the first p-n junction where the emitter meets the base, and the second p-n junction where the base meets the collector. The defining feature to fix in your mind is that the middle layer — the base — is dramatically thinner than the two regions flanking it.

It has **two p-n junctions** back to back, sharing the middle P region (the **base**). The three terminals are the **emitter** (E), the **base** (B), and the **collector** (C).

**The single most important secret — the one you are missing:** *the base must be extremely thin.* Thinner than the distance an injected charge carrier typically travels before it recombines and disappears. In germanium this means the base should be on the order of a few **ten-thousandths** of an inch (roughly 5–25 micrometres). Make the base too thick and you simply have two ordinary diodes that do nothing useful. Make it correctly thin and you have an amplifier.

**How it amplifies, in plain terms.** When you forward-bias the emitter–base junction (emitter negative, base positive for NPN), the heavily-doped N emitter floods the thin P base with electrons. Because the base is so thin and lightly doped, almost none of these electrons stop there — perhaps 99 out of 100 sweep straight through into the collector, which is held at a higher positive voltage that eagerly collects them. The tiny remaining fraction (1 in 100) exits as **base current**.

The result: a small base current commands a collector current perhaps 50 to 200 times larger. That ratio is the **current gain**, written **β** (beta). Everything you build with this device flows from that number.

To picture the flow in active operation: a large stream of electrons leaves the emitter, crosses the thin base, and is swept up by the collector, travelling roughly in a straight line through all three regions. As that stream passes through the base, a very small fraction of the electrons is drawn off sideways and exits through the base terminal. That small sideways trickle is the base current — and by adjusting it, you govern the entire large stream from emitter to collector.

---

## Part 2 — Materials and Prerequisites

### Choose germanium for your first attempts
Use **germanium**, not silicon, for your first transistors. Germanium melts at a much lower temperature (938 °C vs. 1414 °C), tolerates cruder furnaces, is far more forgiving to alloy, and was historically conquered first for exactly these reasons. Once you succeed with germanium, silicon is a worthwhile but harder second goal.

### What you must already have
- **Single-crystal germanium.** Not just pure — it must be a *single crystal* (one continuous lattice), grown by pulling a seed from the melt. Polycrystalline material will not give reliable junctions.
- **Purity.** The starting germanium should be very pure (impurities below roughly one part in 100 million) so that *you* control the doping, not contamination.
- **Dopants:**
  - *Donors* (make N-type): **antimony**, **arsenic**, or **phosphorus**. Antimony is convenient because it alloys well.
  - *Acceptors* (make P-type): **indium**, **gallium**, **aluminium**, or **boron**.

### Tools and supplies
- A **furnace** capable of a controlled, even temperature up to ~600 °C with slow cooling.
- An **inert or reducing atmosphere** — flowing hydrogen or forming gas, or a vacuum. This prevents the hot germanium from oxidising.
- A **graphite jig** to hold parts in alignment during alloying (graphite does not react with molten germanium).
- **Lapping plates and fine abrasive** to thin and flatten wafers, plus the means to measure thickness to a few micrometres.
- **Etchants** for cleaning and shaping junctions (a peroxide-based germanium etch; some recipes use hydrofluoric acid — see safety).
- Fine wire, **solder for ohmic contacts**, and a hermetic enclosure (a metal can or opaque epoxy) for the finished device.

### ⚠ Safety — read before you begin
- **Hydrogen is explosively flammable.** Purge furnace lines properly; eliminate leaks and ignition sources.
- **Antimony and especially arsenic compounds are toxic.** Avoid inhaling fumes; work with ventilation; wash thoroughly.
- **Hydrofluoric acid, if used, is extremely dangerous** — it causes deep, delayed burns and is systemically poisonous. Treat any HF recipe with the utmost caution and proper protection, or substitute a peroxide etch.
- Furnaces operate at temperatures that cause instant severe burns. Use proper handling tools and eye protection.

---

## Part 3 — Construction: The Alloy-Junction Method (Step by Step)

We will build an NPN transistor by the **alloy-junction** technique. It is the most controllable first method because the base thickness is set mostly by how thin you make the starting wafer, rather than by precise timing.

### Step 1 — Prepare the base wafer (the P region)
Cut a thin slice from your **lightly-doped P-type** single-crystal germanium. Lap it flat and parallel, then thin it to roughly **0.004 inch (≈100 µm) or less**. This wafer *is* your base; the final electrical base will be even thinner once the junctions eat inward from both sides. Clean it with an etch and rinse — surface contamination is the enemy.

### Step 2 — Prepare the donor pellets (the future N regions)
You need small pellets of metal that will (a) melt and dissolve some germanium, and (b) carry donor atoms so the regrown germanium becomes N-type. A practical choice is **lead or tin carrying a small percentage of antimony** (an antimony-bearing pellet). Make **two** pellets:
- a **larger collector** pellet, and
- a **smaller emitter** pellet.

Making the emitter smaller and more heavily doped than the collector is deliberate; this asymmetry is part of what gives good transistor action and is why a transistor is not simply symmetric.

### Step 3 — Assemble in the jig
Seat the two pellets on **opposite faces** of the base wafer, as closely aligned as you can manage, in the graphite jig. Alignment matters: the emitter and collector junctions must end up nearly facing each other so the base between them is uniformly thin.

To picture the arrangement: the thin P-type wafer lies flat. The small emitter pellet rests on its top face; the larger collector pellet rests on the bottom face, directly beneath the first. During the heat cycle that follows, each pellet melts and dissolves germanium *inward* from its own face. The two molten regions advance toward each other from opposite sides, and only a thin sliver of the original P-type wafer must be left surviving in the middle between them — that surviving sliver becomes your finished base.

### Step 4 — Alloy (the critical heat cycle)
Heat the assembly under inert/reducing atmosphere to roughly **500–600 °C** — hot enough that each pellet melts and dissolves a little germanium into a molten puddle, but **well below germanium's 938 °C melting point** so the wafer itself stays solid. Hold briefly.

What happens physically: the molten puddle dissolves germanium from the wafer surface. The depth it eats inward, from both sides, determines the final base thickness. **Control this carefully** — the two molten fronts must *not* meet, or you destroy the base.

### Step 5 — Cool slowly to regrow single-crystal N regions
Cool **slowly**. As the puddle cools, germanium recrystallises out of the melt onto the still-solid wafer lattice — growing as a continuation of the single crystal, but now **heavily doped N-type** because of the antimony carried in the melt. Each cooled, regrown region is one of your N terminals. Slow cooling is what keeps the regrowth single-crystal and the junctions sharp.

After this step you have, in cross-section: **N (emitter) | thin P (base) | N (collector)** — an NPN sandwich, with the two p-n junctions formed where the regrown N meets the original P.

### Step 6 — Make the three contacts
- **Emitter and collector:** the solidified pellets themselves serve as contact pads; solder fine leads to them.
- **Base:** you must contact the *edge* of the original thin P wafer with a connection that is **ohmic** (non-rectifying) — it must conduct equally both ways, not behave like another diode. Use a contact metal/solder appropriate to P-germanium for this. A bad (rectifying) base contact is a very common cause of a "dead" transistor.

### Step 7 — Etch to clean and define the junctions
Briefly etch the finished assembly. This removes the damaged, contaminated surface skin around the junctions and reduces leakage current. Done well, this step dramatically improves yield; rinse and dry thoroughly afterward.

### Step 8 — Encapsulate
Germanium transistors are sensitive to **light** (light generates stray carriers) and to **moisture** (which causes surface leakage and slow death). Seal the device in an **opaque, hermetic** enclosure — a metal can backfilled with dry inert gas, or an opaque epoxy. This is not optional; an unsealed device will drift and fail.

### Alternative: the grown-junction method (mentioned for completeness)
Instead of alloying, you can form the NPN sandwich *while pulling the crystal*: pull N-type, briefly add an acceptor to the melt to grow a thin P layer (the base), then add a donor to return to N. The challenge is the same one — making that P layer thin enough — and it requires fast, precisely timed pulling. Alloying gives a beginner more direct control, so start there.

---

## Part 4 — Testing, Troubleshooting, and What Success Looks Like

### First check: does it behave as two diodes?
Before expecting amplification, verify the junctions with a low-voltage source and a current limit:
- **Emitter–base junction:** should conduct when forward-biased (for germanium, it begins conducting around **0.2–0.3 V**) and block when reversed.
- **Collector–base junction:** same diode behaviour.
- **Emitter–collector (no base drive):** should *not* conduct freely in either direction. If it does, your base is shorted (the two alloy fronts met) — discard and adjust depth.

### Second check: does it amplify?
Wire the standard active arrangement:
- **Forward-bias** the emitter–base junction (emitter to negative supply through a resistor; base slightly positive).
- **Reverse-bias** the collector–base junction (collector to a higher positive supply through a load resistor).

To wire it: connect the collector to the positive supply through a load resistor (the resistor sits between the supply and the collector). Connect the emitter to ground or the emitter supply. Feed the small control current into the base through a series resistor. In short — supply current enters at the collector through the load resistor, the emitter returns to ground, and the base receives the small steering current through its own resistor.

Now feed a **small** current into the base and watch the **collector** current. The current gain is simply the collector current divided by the base current: β equals collector current ÷ base current.

A first working germanium transistor might show **β of 20 to 100**. Even a β of 10 proves the principle: you have built a transistor. Verify control by varying the base current and confirming the collector current tracks it by the multiple β.

### Troubleshooting table

| Symptom | Likely cause | Fix |
|---|---|---|
| No gain; acts like two plain diodes | **Base too thick** — carriers recombine before crossing | Use a thinner starting wafer; alloy deeper (carefully) to shrink the surviving base |
| Emitter and collector shorted together | **Base too thin / punch-through** — the two alloy fronts met | Reduce hold time/temperature so less germanium dissolves |
| High leakage; gain drifts; device dies over days | Surface contamination / moisture / poor seal | Re-etch junctions; improve hermetic encapsulation |
| Erratic, asymmetric "base diode" behaviour | **Non-ohmic base contact** | Remake base contact with proper ohmic metal |
| Gain changes when exposed to light | Unsealed or transparent package | Use an opaque enclosure |
| Polycrystalline, rough junctions, low yield | Cooled too fast, or starting material not single-crystal | Cool more slowly; start from a true single crystal |

### Why germanium first, silicon later
Germanium's lower melting point and easy alloying make it the right teacher. Its drawbacks — it leaks more at high temperature and tolerates less heat than silicon — are exactly why the world later moved to silicon. Once you reliably make germanium alloy transistors, pursue silicon and, eventually, the **planar/diffusion** process, in which dopants are diffused as gases through patterned masks. That path leads to making many transistors at once on one wafer — the doorway to integrated circuits.

### The core idea to remember
Everything here serves one principle: **inject carriers from a heavily-doped emitter, across a base so thin they survive the crossing, into a collector that sweeps them up — and govern the whole flood with a trickle of base current.** Master the thin base, keep your junctions clean, seal the device well, and you hold the foundation of all modern electronics in your hand.

---
*End of manual.*
