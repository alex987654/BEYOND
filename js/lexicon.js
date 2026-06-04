/**
 * Beyond CNL Lexicon Data for method-only messaging
 * English vocabulary allow-list, banned words, E-tag types, and validation patterns
 *
 * Allow-list: 3759 approved word forms (v0.4 sync)
 * (base forms + inflections: -s, -ed, -ing, -er, -est, plurals)
 */

const BeyondLexicon = (() => {

  // ===== COMPLETE APPROVED ALLOW-LIST =====
  // 3759 word forms: v0.3 generation + v0.4 sync of 36 Agent/Role and
  // Arts/Perception nouns (with plurals) present in the canonical & companion lexicons
  // Includes base forms and approved inflections

  const _WL_RAW = `a\nabout\nabove\nabover\nabovest\nabsent\nabsorb\nabsorbed\nabsorbing\nabsorbs\nabsorption\nabsorption-line\nabsorptions\nabundant\naccelerate\naccelerated\naccelerates\naccelerating\nacceleration\naccelerations\nacceptable\naccess\naccesses\naccessible\naccordingly\naccrete\naccreted\naccretes\naccreting\naccretion\naccretion-disc\naccretions\naccuracies\naccuracy\naccurately\nacid\nacids\nacknowledge\nacknowledged\nacknowledges\nacknowledging\nacoustic\nacross\naction\nactions\nactivate\nactivated\nactivates\nactivating\nactive\nactiver\nactivest\nadd\nadded\nadding\nadditional\naddress\naddresses\nadds\nadequate\nadhesive\nadhesives\nadjacent\nadjust\nadjusted\nadjusting\nadjustment\nadjustments\nadjusts\nadvance\nadvanced\nadvances\nadvancing\nafter\nafterward\nagainst\nair\nairs\nalgorithm\nalgorithms\nalign\naligned\naligning\naligns\nall\nallocate\nallocated\nallocates\nallocating\nallow\nallowed\nallowing\nallows\nalloy\nalloys\nalmost\nalong\nalphabet\nalphabets\nalready\nalso\nalternate\nalternative\nalternatively\nalternatives\naltitude\naltitudes\naluminum\naluminums\nalways\nambient\namend\namended\namending\namends\namong\nampere\namplified\namplifies\namplify\namplifying\namplitude\namplitudes\nan\nanalog\nanaloger\nanalogest\nanalysis\nanalysises\nanchor\nanchors\nand\nangle\nangles\nangular\nangular-momentum\nanisotropic\nannihilate\nannihilated\nannihilates\nannihilating\nannounce\nannounced\nannounces\nannouncing\nanomalies\nanomaly\nantenna\nantennas\nantimatter\nantimatters\nantiparticle\nantiparticles\nany\nappear\nappeared\nappearing\nappears\napplicable\napplication\napplications\napplied\napplies\napply\napplying\napproach\napproached\napproaches\napproaching\napproximate\napproximated\napproximately\napproximates\napproximating\narchive\narchived\narchives\narchiving\narea\nareas\narm\narms\naround\narray\narrays\narrive\narrived\narrives\narriving\nartifact\nartifacts\nas\nassemble\nassembled\nassembles\nassemblies\nassembling\nassembly\nassessment\nassessments\nassign\nassigned\nassigning\nassigns\nassume\nassumed\nassumes\nassuming\nasteroid\nasteroid-belt\nasteroids\nastronomical-unit\nasymmetric\nat\natmosphere\natmospheres\natom\natoms\nattach\nattached\nattaches\nattaching\nattempt\nattempts\nattenuate\nattenuated\nattenuates\nattenuating\natto\naudit\naudits\naurora\nauroras\nauthorities\nauthority\nautomated\nautomatically\nautomation\nautomations\nautonomies\nautonomy\navailable\naverage\naverages\naxis\naxises\nbackup\nbackups\nbacteria\nbacterias\nbalance\nbalances\nbandwidth\nbandwidths\nbar\nbars\nbase\nbaseline\nbaselines\nbases\nbasin\nbasins\nbasis\nbasises\nbatch\nbatches\nbeam\nbeams\nbearing\nbearings\nbecquerel\nbefore\nbeforehand\nbegin\nbegined\nbegining\nbeginning\nbeginnings\nbegins\nbehind\nbelow\nbelower\nbelowest\nbend\nbended\nbending\nbends\nbeneath\nbeside\nbetween\nbeyond\nbias\nbiases\nbilateral\nbillion\nbinarier\nbinariest\nbinary\nbinary-star\nbit\nbits\nblack\nblack-hole\nblacker\nblackest\nblade\nblades\nblock\nblocked\nblocking\nblocks\nblue\nbluer\nblueshift\nblueshifts\nbluest\nboard\nboards\nbodies\nbody\nboiling\nbolt\nbolts\nboson\nbosons\nboth\nbottom\nbottomer\nbottomest\nbound\nboundaries\nboundary\nbounded\nbounding\nbounds\nbow-shock\nbox\nboxes\nbracket\nbrackets\nbreak\nbreaked\nbreaking\nbreaks\nbridge\nbridges\nbrief\nbriefer\nbriefest\nbright\nbrighten\nbrightened\nbrightening\nbrightens\nbrighter\nbrightest\nbrittle\nbroad\nbroader\nbroadest\nbrown\nbrowner\nbrownest\nbudget\nbudgets\nbuffer\nbuffers\nbuild\nbuilded\nbuilding\nbuilds\nbulkhead\nbulkheads\nbut\nby\nbyte\nbytes\ncable\ncables\ncache\ncaches\ncadence\ncadences\ncage\ncages\ncalculate\ncalculated\ncalculates\ncalculating\ncalibrate\ncalibrated\ncalibrates\ncalibrating\ncalibration\ncalibrations\ncancel\ncanceled\ncanceling\ncancels\ncandela\ncap\ncapacities\ncapacity\ncaps\ncapture\ncaptured\ncaptures\ncapturing\ncarbon\ncarbons\ncarried\ncarries\ncarry\ncarrying\ncase\ncases\ncategories\ncategorize\ncategorized\ncategorizes\ncategorizing\ncategory\ncausalities\ncausality\ncease\nceased\nceases\nceasing\nceiling\nceilings\ncelestial\ncell\ncells\ncenter\ncentered\ncenters\ncenti\ncentral\ncenturies\ncentury\nceramic\nceramics\ncertified\nchain\nchains\nchamber\nchambers\nchange\nchanged\nchanges\nchanging\nchannel\nchannels\ncheck\nchecked\nchecking\nchecks\nchecksum\nchecksums\nchemical\nchemicals\nchromatic\nchromosome\nchromosomes\nchromosphere\nchromospheres\nciphertext\nciphertexts\ncircuit\ncircuits\ncircular\ncirculate\ncirculated\ncirculates\ncirculating\ncircumstellar\ncite\ncited\ncites\nciting\nclamp\nclamps\nclass\nclasses\nclassified\nclassifies\nclassify\nclassifying\nclay\nclays\nclean\ncleaned\ncleaning\ncleans\nclear\nclearance\nclearances\ncleared\nclearer\nclearest\nclearing\nclears\ncleartext\ncleartexts\nclock\nclocks\nclockwise\nclose\nclosed\ncloseder\nclosedest\ncloses\nclosing\nclosure\nclosures\ncluster\nclusters\ncode\ncodec\ncodecs\ncodes\ncodeword\ncodewords\ncoefficient\ncoefficients\ncohort\ncohorts\ncoil\ncoils\ncold\ncolder\ncoldest\ncollect\ncollected\ncollecting\ncollects\ncollide\ncollided\ncollides\ncolliding\ncolumn\ncolumns\ncombine\ncombined\ncombines\ncombining\ncomet\ncomets\ncommand\ncommands\ncommunication\ncommunications\ncompact\ncomparable\ncompare\ncompared\ncompares\ncomparing\ncomparison\ncomparisons\ncompartment\ncompartments\ncompass\ncompasses\ncompatible\ncomplete\ncompleted\ncompletely\ncompletes\ncompleting\ncompletion\ncompletions\ncomplexities\ncomplexity\ncompliance\ncompliances\ncompliant\ncomponent\ncomponents\ncomposite\ncompound\ncompounds\ncompress\ncompressed\ncompresses\ncompressing\ncomputation\ncomputations\ncompute\ncomputed\ncomputes\ncomputing\nconcave\nconceal\nconcealed\nconcealing\nconceals\nconcentration\nconcentrations\nconcentric\nconclusion\nconclusions\nconcrete\nconcretes\nconcurrently\ncondition\nconditional\nconditions\nconductive\nconductor\nconductors\ncone\ncones\nconfidence\nconfidences\nconfigurable\nconfiguration\nconfigurations\nconfigure\nconfigured\nconfigures\nconfiguring\nconfirm\nconfirmed\nconfirming\nconfirms\nconflict\nconflicts\nconnect\nconnected\nconnecting\nconnection\nconnections\nconnector\nconnectors\nconnects\nconsecutive\nconsensus\nconsensuses\nconservation\nconservations\nconsistent\nconstant\nconstants\nconstellation\nconstellations\nconstrain\nconstrained\nconstraining\nconstrains\nconstraint\nconstraints\nconstruct\nconstructed\nconstructing\nconstructs\ncontact\ncontacts\ncontain\ncontained\ncontainer\ncontainers\ncontaining\ncontains\ncontaminated\ncontinent\ncontinents\ncontingencies\ncontingency\ncontinue\ncontinued\ncontinues\ncontinuing\ncontinuous\ncontour\ncontours\ncontradict\ncontradicted\ncontradicting\ncontradicts\ncontrast\ncontrasts\ncontrol\ncontroled\ncontroling\ncontrols\nconverge\nconverged\nconverges\nconverging\nconversely\nconversion\nconversions\nconvert\nconverted\nconverting\nconverts\nconvex\nconvexer\nconvexest\ncool\ncoolant\ncoolants\ncooled\ncooler\ncoolest\ncooling\ncoolled\ncoolling\ncools\ncoordinate\ncoordinates\ncopied\ncopies\ncopper\ncoppers\ncopy\ncopying\ncore\ncores\ncorner\ncorners\ncorona\ncoronas\ncorrect\ncorrected\ncorrecting\ncorrection\ncorrections\ncorrects\ncorrelate\ncorrelated\ncorrelates\ncorrelating\ncorrelation\ncorrelations\ncorrespond\ncorresponded\ncorresponding\ncorresponds\ncorrosive\ncosmic-ray\ncost\ncosts\ncoulomb\ncount\ncounted\ncounter\ncounterclockwise\ncounters\ncounting\ncounts\ncoupling\ncouplings\ncover\ncoverage\ncoverages\ncovered\ncovering\ncovers\ncreate\ncreated\ncreates\ncreating\ncriterion\ncriterions\ncritical\ncross\ncross-correlation\ncross-section\ncrossed\ncrosses\ncrossing\ncrust\ncrusts\ncrystal\ncrystals\ncube\ncubes\ncumulative\ncurrent\ncurrently\ncurrents\ncurtain\ncurtains\ncurve\ncurved\ncurveder\ncurvedest\ncurves\ncushion\ncushions\ncustodies\ncustody\ncut\ncuted\ncuting\ncuts\ncutted\ncutting\ncycle\ncycles\ncylinder\ncylinders\ncylindrical\ndamaged\ndark-energy\ndark-matter\ndark-rift\ndata\ndatabase\ndatabases\ndatas\ndataset\ndatasets\ndate\ndates\ndatum\ndatums\ndawn\ndawns\nday\ndays\ndeactivate\ndeactivated\ndeactivates\ndeactivating\ndebris-field\ndecade\ndecades\ndecay\ndecayed\ndecaying\ndecays\ndecelerate\ndecelerated\ndecelerates\ndecelerating\ndeci\ndecision\ndecisions\ndeclare\ndeclared\ndeclares\ndeclaring\ndecline\ndeclined\ndeclines\ndeclining\ndecode\ndecoded\ndecodes\ndecoding\ndecrease\ndecreased\ndecreases\ndecreasing\ndeep\ndeeper\ndeepest\ndefault\ndefaults\ndefective\ndeficit\ndeficits\ndefine\ndefined\ndefines\ndefining\ndefinition\ndefinitions\ndegeneracies\ndegeneracy\ndegree\ndegrees\ndeka\ndelay\ndelays\ndelete\ndeleted\ndeletes\ndeleting\ndemodulate\ndemodulated\ndemodulates\ndemodulating\ndemonstrate\ndemonstrated\ndemonstrates\ndemonstrating\ndemonstration\ndemonstrations\ndenied\ndenies\ndense\ndenser\ndensest\ndensities\ndensity\ndeny\ndenying\ndepend\ndepended\ndependencies\ndependency\ndepending\ndepends\ndeployment\ndeployments\ndepth\ndepths\nderive\nderived\nderives\nderiving\ndescend\ndescended\ndescending\ndescends\ndescribe\ndescribed\ndescribes\ndescribing\ndescription\ndescriptions\ndesignate\ndesignated\ndesignates\ndesignating\ndestination\ndestinations\ndestroy\ndestroyed\ndestroying\ndestroys\ndetach\ndetached\ndetaches\ndetaching\ndetect\ndetected\ndetecting\ndetection\ndetections\ndetector\ndetectors\ndetects\ndetermination\ndeterminations\ndeterministic\ndeviation\ndeviations\ndevice\ndevices\ndiagnosis\ndiagnosises\ndiagonal\ndiagram\ndiagrams\ndial\ndials\ndiameter\ndiameters\ndiffer\ndiffered\ndifference\ndifferences\ndiffering\ndiffers\ndiffract\ndiffracted\ndiffracting\ndiffraction\ndiffractions\ndiffracts\ndiffuse\ndigital\ndim\ndimed\ndimension\ndimensions\ndimer\ndimest\ndiming\ndiminish\ndiminished\ndiminishes\ndiminishing\ndimmed\ndimming\ndims\ndirection\ndirections\ndirectly\ndirectories\ndirectory\ndisable\ndisabled\ndisables\ndisabling\ndisappear\ndisappeared\ndisappearing\ndisappears\ndisc\ndisclose\ndisclosed\ndiscloses\ndisclosing\ndisconnect\ndisconnected\ndisconnecting\ndisconnects\ndiscoveries\ndiscovery\ndiscrete\ndiscs\ndispersion\ndispersions\ndisplacement\ndisplacements\ndisprove\ndisproved\ndisproves\ndisproving\ndistance\ndistances\ndistant\ndistribute\ndistributed\ndistributes\ndistributing\ndistribution\ndistributions\ndiverge\ndiverged\ndiverges\ndiverging\ndivide\ndivided\ndivides\ndividing\ndocument\ndocumented\ndocumenting\ndocuments\ndomain\ndomains\ndome\ndomes\ndoor\ndoors\ndoppler-shift\ndose\ndoses\ndouble\ndoubler\ndoublest\ndown\ndownstream\ndrain\ndrained\ndraining\ndrains\ndried\ndrier\ndries\ndriest\ndrift\ndrifted\ndrifting\ndrifts\ndrill\ndrills\ndrum\ndrums\ndry\ndrying\ndual\ndualer\ndualest\nduct\nducts\nduration\ndurations\nduring\ndust\ndusts\nduty-cycle\ndwarf-planet\ndye\ndyes\neach\nearthquake\nearthquakes\neastern\neccentric\neclipse\neclipses\necliptic\necliptics\necosystem\necosystems\nedge\nedges\neffect\neffects\nefficiencies\nefficiency\neigenvalue\neigenvalues\neighty\neither\nejecta\nejectas\nelastic\nelectromagnetic\nelectron\nelectrons\nelement\nelements\nelevation\nelevations\neliminate\neliminated\neliminates\neliminating\nelse\nemerge\nemerged\nemerges\nemerging\nemission\nemission-line\nemissions\nemit\nemited\nemiting\nemits\nemitted\nemitting\nemptied\nemptier\nempties\nemptiest\nempty\nemptying\nenable\nenabled\nenables\nenabling\nenclosure\nenclosures\nencode\nencoded\nencodes\nencoding\nencodings\nencrypt\nencrypted\nencrypting\nencrypts\nend\nended\nending\nends\nenergies\nenergy\nengine\nengines\nenough\nentail\nentailed\nentailing\nentails\nentanglement\nentanglements\nenter\nentered\nentering\nenters\nentirely\nentities\nentity\nentries\nentropies\nentropy\nentry\nenvironment\nenvironments\nepoch\nepoches\nequal\nequaled\nequaler\nequalest\nequaling\nequals\nequipment\nequipments\nera\neras\nerase\nerased\nerases\nerasing\nerosion\nerosions\nerror\nerror-rate\nerrors\nerupt\nerupted\nerupting\neruption\neruptions\nerupts\nestimate\nestimated\nestimates\nestimating\netch\netched\netches\netching\nevaluate\nevaluated\nevaluates\nevaluating\nevenly\nevent\nevent-horizon\nevents\neventually\nevery\nevidence\nevidences\nevolution\nevolutions\nexa\nexactly\nexamination\nexaminations\nexceed\nexceeded\nexceeding\nexceeds\nexception\nexceptions\nexcess\nexcesser\nexcessest\nexchange\nexchanges\nexcite\nexcited\nexcites\nexciting\nexclude\nexcluded\nexcludes\nexcluding\nexecute\nexecuted\nexecutes\nexecuting\nexecution\nexecutions\nexercise\nexercises\nexist\nexisted\nexisting\nexists\nexit\nexited\nexiting\nexits\nexitted\nexitting\nexoplanet\nexoplanets\nexpand\nexpanded\nexpanding\nexpands\nexperiment\nexperiments\nexplicit\nexpose\nexposed\nexposes\nexposing\nexposure\nexposures\nextend\nextended\nextending\nextends\nexterior\nexteriors\nexternal\nextinction\nextinctions\nextra\nextraction\nextractions\nextraer\nextraest\nextragalactic\nface\nfaces\nfactor\nfactors\nfail\nfailed\nfailing\nfailled\nfailling\nfails\nfailure\nfailures\nfall\nfalled\nfalling\nfalls\nfalsified\nfalsifies\nfalsify\nfalsifying\nfarad\nfast\nfasten\nfastened\nfastener\nfasteners\nfastening\nfastens\nfaster\nfastest\nfault\nfaultier\nfaultiest\nfaults\nfaulty\nfeature\nfeatures\nfeedback\nfeedbacks\nfemto\nfermion\nfermions\nfew\nfiber\nfibers\nfield\nfields\nfifty\nfilament\nfilaments\nfile\nfiles\nfill\nfilled\nfilling\nfills\nfilm\nfilms\nfilter\nfiltered\nfiltering\nfilters\nfin\nfinal\nfinally\nfinding\nfindings\nfine-structure\nfinish\nfinished\nfinishes\nfinishing\nfins\nfirmly\nfirst\nfit\nfited\nfiting\nfits\nfitted\nfitting\nfixed\nfixeder\nfixedest\nflag\nflags\nflange\nflanges\nflap\nflaps\nflat\nflater\nflatest\nflatten\nflattened\nflattening\nflattens\nflexible\nflood\nfloods\nfloor\nfloors\nflow\nflowed\nflowing\nflows\nfluctuate\nfluctuated\nfluctuates\nfluctuating\nfluid\nfluids\nfluorescent\nflux\nfluxes\nfoam\nfoams\nfold\nfolded\nfolding\nfolds\nfollow\nfollowed\nfollowing\nfollows\nfor\nforce\nforces\nform\nformal\nformaler\nformalest\nformat\nformated\nformating\nformation\nformations\nformats\nformed\nformerly\nforming\nforms\nformula\nformulas\nforty\nforward\nfossil\nfossils\nfraction\nfractions\nfragile\nframe\nframe-of-reference\nframes\nframework\nframeworks\nfrequencies\nfrequency\nfrequent\nfrequently\nfrom\nfrozen\nfrozener\nfrozenest\nfuel\nfuels\nfull\nfuller\nfullest\nfully\nfunction\nfunctioned\nfunctioning\nfunctions\nfunnel\nfunnels\ngain\ngains\ngalactic\ngalaxies\ngalaxy\ngap\ngaps\ngas\ngas-giant\ngases\ngasket\ngaskets\ngate\ngates\ngauge\ngauges\ngear\ngears\ngene\ngenerate\ngenerated\ngenerates\ngenerating\ngeneration\ngenerations\ngenes\ngiga\nglacier\nglaciers\nglass\nglasses\ngold\ngolds\ngradient\ngradients\ngradual\ngradually\ngraier\ngraiest\ngraph\ngraphs\ngravitational\ngravities\ngravity\ngray\ngrease\ngreases\ngreater\ngreater-than\ngreen\ngreener\ngreenest\ngrid\ngrids\ngroove\ngrooves\nground-state\ngroup\ngrouped\ngrouping\ngroups\ngrow\ngrowed\ngrowing\ngrows\nguard\nguards\nguide\nguides\nhabitable-zone\nhabitat\nhabitats\nhalf-life\nhalt\nhalted\nhalting\nhalts\nhamiltonian\nhamiltonians\nhamming-distance\nhandle\nhandles\nhandover\nhandovers\nhappen\nhappened\nhappening\nhappens\nhard\nharder\nhardest\nharmonic\nharmonics\nhash\nhashes\nhatch\nhatches\nhazard\nhazards\nheader\nheaders\nheat\nheated\nheater\nheaters\nheating\nheats\nheatted\nheatting\nheavier\nheaviest\nheavy\nhecto\nheight\nheights\nheliopause\nheliopauses\nhemisphere\nhemispheres\nhence\nhenry\nhere\nhertz\nhierarchies\nhierarchy\nhigh\nhigher\nhighest\nhinge\nhinges\nhistories\nhistory\nhold\nholded\nholding\nholds\nhole\nholes\nhollow\nhollower\nhollowest\nhook\nhooks\nhorizon\nhorizons\nhorizontal\nhose\nhoses\nhot\nhoter\nhotest\nhour\nhours\nhousing\nhousings\nhow\nhowever\nhub\nhubs\nhull\nhulls\nhundred\nhurricane\nhurricanes\nhydrogen\nhydrogens\nhyperfine-transition\nhypothesis\nhypothesises\nice\nices\nidentical\nidentified\nidentifier\nidentifiers\nidentifies\nidentify\nidentifying\nidle\nidler\nidlest\nif\nilluminate\nilluminated\nilluminates\nilluminating\nimage\nimages\nimmediately\nimmutable\nimpact\nimpact-crater\nimpacts\nimpedance\nimpedances\nimplementation\nimplementations\nimplied\nimplies\nimply\nimplying\nin\ninclude\nincluded\nincludes\nincluding\nincomplete\nincrease\nincreased\nincreases\nincreasing\nincrement\nincremental\nincrements\nindependent\nindex\nindexed\nindexes\nindexing\nindicate\nindicated\nindicates\nindicating\nindication\nindications\nindicator\nindicators\ninertial\ninformation\ninformations\ninfrastructure\ninfrastructures\ninitial\ninitialize\ninitialized\ninitializes\ninitializing\ninlet\ninlets\ninner\ninnerer\ninnerest\ninput\ninputs\ninscribe\ninscribed\ninscribes\ninscribing\ninsect\ninsects\ninsert\ninserted\ninserting\ninserts\ninspection\ninspections\ninstall\ninstalled\ninstalling\ninstalls\ninstance\ninstances\ninstant\ninstants\ninstead\ninstruction\ninstructions\ninstrument\ninstruments\ninsufficient\ninsulation\ninsulations\nintact\nintacter\nintactest\nintegrities\nintegrity\nintensities\nintensity\ninterface\ninterfaces\ninterference\ninterferences\nintergalactic\ninterior\ninteriors\nintermittent\ninternal\ninterplanetary\ninterstellar\ninterval\nintervals\ninto\ninvariant\ninvariants\ninventories\ninventory\nion\nionize\nionized\nionizes\nionizing\nions\niridescent\niron\nirons\nisland\nislands\nisotope\nisotopes\nisotropic\nit\nitem\nitems\niteration\niterations\nits\njack\njacks\njet\njets\njoin\njoined\njoining\njoinned\njoinning\njoins\njoint\njoints\njoule\njunction\njunctions\nkelvin\nkey\nkeys\nkilo\nkilogram\nknob\nknobs\nlabel\nlabeled\nlabeling\nlabels\nlack\nlacked\nlacking\nlacks\nlagrange-point\nlamp\nlamps\nlarge\nlargely\nlarger\nlargest\nlast\nlasted\nlasting\nlasts\nlatencies\nlatency\nlateral\nlatitude\nlatitudes\nlava\nlavas\nlayer\nlayers\nlead\nleads\nleaf\nleafs\nleaves\nledger\nledgers\nleft\nlefter\nleftest\nlength\nlengths\nlens\nlenses\nless\nless-than\nlevel\nlevels\nlever\nlevers\nlibraries\nlibrary\nlid\nlids\nlife\nlift\nlifted\nlifting\nlifts\nlight\nlight-cone\nlight-year\nlighter\nlightest\nlightning\nlightnings\nlights\nlimb\nlimbs\nlimit\nlimited\nlimiting\nlimits\nline\nlinear\nlinearer\nlinearest\nlines\nlink\nlinks\nlip\nlips\nliquid\nliquider\nliquidest\nliquids\nlist\nlisted\nlisting\nlists\nlives\nload\nloadded\nloadding\nloaded\nloading\nloads\nlocal\nlocaler\nlocalest\nlocation\nlocations\nlock\nlocked\nlocking\nlocks\nlog\nloged\nlogged\nlogging\nlogic\nlogics\nloging\nlogs\nlong\nlonger\nlongest\nlongitude\nlongitudes\nloop\nloops\nloosen\nloosened\nloosening\nloosens\nlow\nlower\nlowered\nlowering\nlowers\nlowest\nlubricant\nlubricants\nlumen\nluminance\nluminances\nlunar\nlunarer\nlunarest\nlux\nmagma\nmagmas\nmagnet\nmagnetic\nmagnetosphere\nmagnetospheres\nmagnets\nmagnitude\nmagnitudes\nmain-sequence\nmaintenance\nmaintenances\nmalleable\nmammal\nmammals\nmandatory\nmanifold\nmanifolds\nmantle\nmantles\nmanually\nmany\nmap\nmaped\nmaping\nmapped\nmapping\nmaps\nmargin\nmargins\nmark\nmarked\nmarking\nmarks\nmass\nmasses\nmatch\nmatched\nmatches\nmatching\nmaterial\nmaterials\nmatrix\nmatrixes\nmaximum\nmaximums\nmean\nmean-free-path\nmeans\nmeanwhile\nmeasure\nmeasured\nmeasurement\nmeasurements\nmeasures\nmeasuring\nmedian\nmedians\nmega\nmembrane\nmembranes\nmemories\nmemory\nmercuries\nmercury\nmerge\nmerged\nmerges\nmerging\nmesh\nmeshes\nmessage\nmessages\nmetadata\nmetadatas\nmetal\nmetals\nmeteor\nmeteorite\nmeteorites\nmeteors\nmeter\nmethod\nmethods\nmetric\nmetrics\nmicro\nmilli\nmillion\nmineral\nminerals\nminimum\nminimums\nminus\nminute\nminutes\nmirror\nmirrors\nmix\nmixed\nmixes\nmixing\nmixture\nmixtures\nmixxed\nmixxing\nmode\nmodel\nmodels\nmodes\nmodification\nmodifications\nmodified\nmodifies\nmodify\nmodifying\nmodulate\nmodulated\nmodulates\nmodulating\nmodulation\nmodulations\nmodule\nmodules\nmole\nmolecule\nmolecules\nmolten\nmoltener\nmoltenest\nmoment\nmoments\nmomentum\nmomentums\nmonochromatic\nmonth\nmonths\nmoon\nmoons\nmoratorium\nmoratoriums\nmore\nmost\nmostly\nmotor\nmotors\nmount\nmountain\nmountains\nmounted\nmounting\nmounts\nmove\nmoved\nmoves\nmoving\nmuch\nmultiple\nmultiplex\nmultiplexed\nmultiplexes\nmultiplexing\nmultiplied\nmultiplies\nmultiply\nmultiplying\nmuon\nmuons\nmutual-information\nnadir\nnadirs\nnano\nnarrow\nnarrowband\nnarrower\nnarrowest\nnear\nnearly\nnebula\nnebulas\nneed\nneedded\nneedding\nneeded\nneeding\nneeds\nnegate\nnegated\nnegates\nnegating\nneither\nnet\nneter\nnetest\nnetwork\nnetworks\nneutrino\nneutrinos\nneutron\nneutron-star\nneutrons\nnever\nnevertheless\nnewton\nnext\nnight\nnights\nninety\nnitrogen\nnitrogens\nno\nnode\nnodes\nnoise\nnoises\nnominal\nnone\nnonlinear\nnor\nnormalize\nnormalized\nnormalizes\nnormalizing\nnorthern\nnot\nnotation\nnotations\nnotified\nnotifies\nnotify\nnotifying\nnova\nnovas\nnow\nnozzle\nnozzles\nnucleosynthesis\nnucleosynthesises\nnucleus\nnucleuses\nnumber\nnumbered\nnumbering\nnumbers\nnut\nnutrient\nnutrients\nnuts\nobject\nobjects\nobservation\nobservations\nobserve\nobserved\nobserves\nobserving\noccult\noccultation\noccultations\nocculted\nocculting\noccults\noccur\noccured\noccuring\noccurs\nocean\nocean-world\noceans\noctave\noctaves\nof\noff\noffset\noffsets\noften\nohm\noil\noils\non\none\nones\nonly\nonset\nonsets\nopaque\nopaquer\nopaquest\nopen\nopened\nopening\nopenings\nopenned\nopenning\nopens\noperate\noperated\noperates\noperating\noperation\noperations\noperator\noperators\noptical\noption\noptional\noptions\nor\norange\noranger\norangest\norbit\norbital\norbited\norbiting\norbits\norder\norder-of-magnitude\norders\nore\nores\norganism\norganisms\norganize\norganized\norganizes\norganizing\norigin\norigins\noscillate\noscillated\noscillates\noscillating\nother\notherwise\nout\noutcome\noutcomes\nouter\nouterer\nouterest\noutlet\noutlets\noutput\noutputs\nover\noverhead\novertone\novertones\noxygen\noxygens\nozone\nozones\npack\npacked\npacket\npackets\npacking\npacks\npad\npads\npaint\npaints\npair\npair-production\npairs\npanel\npanels\nparallax\nparallaxes\nparallel\nparameter\nparameters\nparities\nparity\nparsec\npartially\nparticle\nparticles\npartition\npartitions\npascal\npass\npassed\npasses\npassing\npatch\npatches\npath\npaths\npattern\npatterns\npause\npaused\npauses\npausing\npayload\npayloads\npeak\npeaked\npeaking\npeakked\npeakking\npeaks\npenultimate\nper\npercent\npercentage\npercentages\nperihelion\nperihelions\nperiod\nperiodic\nperiods\npermeable\npermission\npermissions\nperpendicular\npersist\npersisted\npersisting\npersists\nperturbation\nperturbations\npeta\nphase\nphase-transition\nphases\nphenomenon\nphenomenons\nphoton\nphotons\nphotosphere\nphotospheres\npico\npigment\npigments\npillar\npillars\npin\npink\npinker\npinkest\npins\npipe\npipeline\npipelines\npipes\npiston\npistons\npitch\npitches\npixel\nplace\nplaced\nplaces\nplacing\nplan\nplanar\nplanarer\nplanarest\nplanet\nplanetary\nplanetary-surface\nplanetary-transit\nplanets\nplans\nplasma\nplasmas\nplastic\nplastics\nplate\nplates\nplatform\nplatforms\nplug\nplugs\nplus\npoint\npointer\npointers\npoints\npolarities\npolarity\npolarization\npolarizations\npolarize\npolarized\npolarizes\npolarizing\npole\npoles\npollen\npollens\npolychromatic\npool\npools\nporous\nporouser\nporousest\nport\nports\nposition\npositioned\npositioning\npositions\npost\nposted\nposting\nposts\npotential\npotentials\npour\npoured\npouring\npourred\npourring\npours\npowder\npowders\npower\npowers\nprecaution\nprecautions\nprecede\npreceded\nprecedes\npreceding\nprecess\nprecessed\nprecesses\nprecessing\nprecisely\nprecision\nprecisions\nprecondition\npreconditions\npredator\npredators\nprefix\nprefixes\npreliminary\npreparation\npreparations\npresent\npress\npressed\npresses\npressing\npressure\npressures\nprevent\nprevented\npreventing\nprevents\npreviously\nprey\npreys\nprimitive\nprimitives\npriorities\npriority\nprobabilities\nprobability\nprobe\nprobes\nprocedure\nprocedures\nprocess\nprocessed\nprocesses\nprocessing\nproduce\nproduced\nproduces\nproducing\nproduct\nproducts\nproduction\nproductions\nprofile\nprofiles\nprogram\nprogramed\nprograming\nprograms\nprohibit\nprohibited\nprohibiting\nprohibits\nproject\nprojected\nprojecting\nprojection\nprojections\nprojects\nproof\nproofs\nprooves\npropagate\npropagated\npropagates\npropagating\nproper-motion\nproperties\nproperty\nproportion\nproportions\nprotein\nproteins\nprotocol\nprotocols\nproton\nprotons\nprotoplanetary-disc\nprotostar\nprotostars\nprovenance\nprovenances\nprovided\nprovision\nprovisional\nprovisions\nproxies\nproxy\npublish\npublished\npublishes\npublishing\npull\npulled\npulling\npulls\npulsar\npulsars\npulse\npulses\npump\npumps\npurple\npurpler\npurplest\npush\npushed\npushes\npushing\nquantities\nquantity\nquantize\nquantized\nquantizes\nquantizing\nquantum\nquantums\nquasar\nquasars\nqueries\nquery\nqueue\nqueues\nquorum\nquorums\nquota\nquotas\nquotient\nquotients\nrack\nracks\nradial\nradial-velocity\nradialer\nradialest\nradian\nradiate\nradiated\nradiates\nradiating\nradiation\nradiations\nradius\nradiuses\nrail\nrails\nrain\nrains\nraise\nraised\nraises\nraising\nrange\nranges\nrapid\nrapider\nrapidest\nrapidly\nrarely\nrate\nrates\nratio\nratios\nreach\nreached\nreaches\nreaching\nread\nreadded\nreadding\nreaded\nreading\nreadings\nreads\nrear\nrearer\nrearest\nreboot\nreboots\nrecede\nreceded\nrecedes\nreceding\nreceive\nreceived\nreceiver\nreceivers\nreceives\nreceiving\nrecently\nreception\nreceptions\nrecord\nrecorded\nrecording\nrecords\nrecoveries\nrecovery\nred\nred-giant\nreder\nredest\nredshift\nredshifts\nreduction\nreductions\nredundancies\nredundancy\nredundant\nreef\nreefs\nreentries\nreentry\nreeves\nreference\nreferenced\nreferences\nreferencing\nreflect\nreflected\nreflecting\nreflective\nreflector\nreflectors\nreflects\nrefractive\nregister\nregistered\nregistering\nregisters\nregistries\nregistry\nregolith\nregoliths\nrehearsal\nrehearsals\nrejection\nrejections\nrelation\nrelations\nrelativistic\nrelay\nrelays\nrelease\nreleased\nreleases\nreleasing\nremain\nremained\nremaining\nremains\nremediation\nremediations\nremote\nremoter\nremotest\nremoval\nremovals\nremove\nremoved\nremoves\nremoving\nrender\nrendered\nrendering\nrenders\nrepair\nrepaired\nrepairing\nrepairs\nrepeat\nrepeated\nrepeating\nrepeats\nreplace\nreplaced\nreplacement\nreplacements\nreplaces\nreplacing\nreplica\nreplicas\nreplication\nreplications\nreport\nreported\nreporting\nreports\nrepositories\nrepository\nreproduce\nreproduced\nreproduces\nreproducing\nrequire\nrequired\nrequirement\nrequirements\nrequires\nrequiring\nreservoir\nreservoirs\nreset\nreseted\nreseting\nresets\nreshape\nreshaped\nreshapes\nreshaping\nresidual\nresidue\nresidues\nresin\nresins\nresistance\nresistances\nresolution\nresolutions\nresonance\nresonances\nresource\nresources\nrespond\nresponded\nresponding\nresponds\nresponse\nresponses\nrestoration\nrestorations\nrestrict\nrestricted\nrestricting\nrestriction\nrestrictions\nrestricts\nresult\nresulted\nresulting\nresults\nresume\nresumed\nresumes\nresuming\nretract\nretracted\nretracting\nretraction\nretractions\nretracts\nretrieval\nretrievals\nretrieve\nretrieved\nretrieves\nretrieving\nreturn\nreturned\nreturning\nreturns\nreveal\nrevealed\nrevealing\nreveals\nreversible\nreview\nreviews\nrevise\nrevised\nrevises\nrevising\nrevision\nrevisions\nright\nrighter\nrightest\nrigid\nrigider\nrigidest\nring\nring-system\nringlet\nringlets\nrings\nrise\nrised\nrises\nrising\nriver\nrivers\nrock\nrocks\nrod\nrods\nrole\nroles\nrollback\nrollbacks\nroller\nrollers\nroof\nroofs\nroot\nroots\nrooves\nrope\nropes\nrotate\nrotated\nrotates\nrotating\nrotation\nrotations\nrotor\nrotors\nrough\nrougher\nroughest\nround\nrounder\nroundest\nroute\nroutes\nrow\nrows\nrubber\nrubbers\nrule\nrules\nrun\nruned\nruning\nrunned\nrunning\nruns\nrust\nrusts\nsafeties\nsafety\nsalt\nsalts\nsample\nsampled\nsamples\nsampling\nsampling-rate\nsand\nsands\nsatellite\nsatellites\nsatisfied\nsatisfies\nsatisfy\nsatisfying\nsaturate\nsaturated\nsaturates\nsaturating\nsave\nsaved\nsaves\nsaving\nscale\nscales\nscan\nscaned\nscaning\nscanned\nscanning\nscans\nschedule\nschedules\nschema\nschemas\nscope\nscopes\nscore\nscores\nscreen\nscreens\nscrew\nscrews\nsea\nseal\nsealed\nsealing\nsealled\nsealling\nseals\nsearch\nsearches\nseas\nseat\nseats\nsecond\nseconds\nsection\nsections\nsecurely\nsediment\nsediments\nseed\nseeds\nsegment\nsegments\nseldom\nselect\nselected\nselecting\nselection\nselections\nselects\nsense\nsensed\nsenses\nsensing\nsensitivities\nsensitivity\nsensor\nsensors\nseparate\nseparated\nseparates\nseparating\nsequence\nsequences\nseries\nserieses\nserver\nservers\nservice\nservices\nsession\nsessions\nset\nseted\nseting\nsets\nsetted\nsetting\nsettings\nsetup\nsetups\nseventy\nseveral\nshaft\nshafts\nshallow\nsheath\nsheaths\nsheet\nsheets\nshelf\nshelfs\nshell\nshells\nshelves\nshield\nshields\nshift\nshifted\nshifting\nshifts\nshort\nshorten\nshortened\nshortening\nshortens\nshorter\nshortest\nshow\nshowed\nshowing\nshows\nshrink\nshrinked\nshrinking\nshrinks\nshutdown\nshutdowns\nshutter\nshutters\nsiemens\nsievert\nsignal\nsignal-to-noise-ratio\nsignals\nsignature\nsignatures\nsilicon\nsilicons\nsilver\nsilvers\nsimulation\nsimulations\nsimultaneously\nsingle\nsingler\nsinglest\nsixty\nsize\nsizes\nslab\nslabs\nsleeve\nsleeves\nslide\nslides\nslope\nslopes\nslot\nslots\nslow\nslower\nslowest\nslowly\nsmall\nsmaller\nsmallest\nsmooth\nsmoother\nsmoothest\nsnapshot\nsnapshots\nsocket\nsockets\nsoft\nsofter\nsoftest\nsolar-wind\nsolid\nsolider\nsolidest\nsolids\nsolution\nsolutions\nsolve\nsolved\nsolvent\nsolvents\nsolves\nsolving\nsome\nsort\nsorted\nsorting\nsorts\nsource\nsources\nsouthern\nspace\nspacer\nspacers\nspaces\nspacetime\nspacetimes\nspan\nspans\nspecies\nspecieses\nspecification\nspecifications\nspecified\nspecifies\nspecify\nspecifying\nspectral-line\nspectrum\nspectrums\nspeed\nspeeds\nsphere\nspheres\nspherical\nspin\nspindle\nspindles\nspins\nspiral-arm\nsplit\nsplited\nspliting\nsplits\nspread\nspreaded\nspreading\nspreads\nspring\nsprings\nstabilize\nstabilized\nstabilizes\nstabilizing\nstack\nstacks\nstage\nstages\nstandard\nstandards\nstar\nstar-cluster\nstar-system\nstars\nstart\nstarted\nstarting\nstarts\nstartup\nstartups\nstate\nstated\nstatement\nstatements\nstates\nstating\nstator\nstators\nstatus\nstatuses\nsteadier\nsteadiest\nsteadily\nsteady\nsteel\nsteels\nstellar-nursery\nstem\nstems\nstep\nsteps\nsteradian\nstiff\nstiffer\nstiffest\nstimulus\nstimuluses\nstone\nstones\nstop\nstoped\nstoping\nstopped\nstopping\nstops\nstorage\nstorages\nstore\nstored\nstores\nstoring\nstorm\nstorms\nstraighten\nstraightened\nstraightening\nstraightens\nstrap\nstraps\nstratum\nstratums\nstream\nstreams\nstrength\nstrengths\nstress\nstresses\nstretch\nstretched\nstretches\nstretching\nstring\nstrings\nstrip\nstrips\nstrong\nstronger\nstrongest\nstructure\nstructures\nstrut\nstruts\nstud\nstuds\nsubmit\nsubmited\nsubmiting\nsubmits\nsuborbital\nsubsequently\nsubset\nsubsets\nsubstance\nsubstances\nsubstitution\nsubstitutions\nsubstrate\nsubstrates\nsubtract\nsubtracted\nsubtracting\nsubtracts\nsuccession\nsuccessions\nsuch\nsudden\nsuddener\nsuddenest\nsuffix\nsuffixes\nsum\nsummaries\nsummary\nsums\nsun\nsunrise\nsunrises\nsuns\nsupernova\nsupernovas\nsuperposition\nsuperpositions\nsupplement\nsupplements\nsupplied\nsupplies\nsupply\nsupplying\nsupport\nsupported\nsupporting\nsupports\nsurface\nsurfaces\nsurvey\nsurveys\nsuspension\nsuspensions\nsweep\nsweeps\nswitch\nswitches\nsymbol\nsymbols\nsymmetric\nsymmetries\nsymmetry\nsynchronize\nsynchronized\nsynchronizes\nsynchronizing\nsyndrome\nsyndromes\nsystem\nsystems\ntab\ntable\ntables\ntabs\ntag\ntags\ntall\ntaller\ntallest\ntank\ntanks\ntarget\ntargets\ntask\ntasks\ntechnique\ntechniques\ntemperature\ntemperatures\ntemplate\ntemplates\ntension\ntensions\ntenth\ntera\nterm\nterminal\nterminals\nterminator\nterminators\nterms\ntesla\ntessellation\ntessellations\ntest\ntests\nthat\nthe\ntheir\nthem\nthemselves\nthen\nthere\ntherefore\nthermal\nthermodynamic\nthermodynamic-equilibrium\nthese\nthey\nthick\nthicker\nthickest\nthin\nthiner\nthinest\nthirty\nthis\nthose\nthousand\nthreshold\nthresholds\nthrough\nthroughput\nthroughputs\ntidal-force\ntide\ntides\ntighten\ntightened\ntightening\ntightens\ntime\ntimes\ntiming\ntimings\ntin\ntins\ntip\ntips\ntissue\ntissues\ntitanium\ntitaniums\nto\ntoken\ntokens\ntolerance\ntolerances\ntool\ntools\ntop\ntoper\ntopest\ntopologies\ntopology\ntops\ntornado\ntornados\ntotal\ntotals\ntower\ntowers\ntrace\ntraces\ntrack\ntracks\ntransceiver\ntransceivers\ntransfer\ntransfered\ntransfering\ntransfers\ntransit\ntransited\ntransiting\ntransition\ntransitions\ntransits\ntranslucent\ntransmission\ntransmissions\ntransmit\ntransmited\ntransmiting\ntransmits\ntransmitter\ntransmitters\ntransparencies\ntransparency\ntransparent\ntransportation\ntransportations\ntravel\ntraveled\ntraveling\ntravels\ntray\ntrays\ntree\ntrees\ntrend\ntrends\ntrial\ntrials\ntrigger\ntriggers\ntroubleshooting\ntroubleshootings\ntsunami\ntsunamis\ntube\ntubes\ntuple\ntuples\nturbulent\nturn\nturned\nturning\nturns\ntwenty\ntype\ntypes\nuncertainties\nuncertainty\nunder\nunfasten\nunfastened\nunfastening\nunfastens\nunit\nunits\nunless\nunload\nunloaded\nunloading\nunloads\nunlock\nunlocked\nunlocking\nunlocks\nuntil\nupdate\nupdated\nupdates\nupdating\nupgrade\nupgrades\nupstream\nvacuum\nvacuums\nvalidation\nvalidations\nvalue\nvalues\nvalve\nvalves\nvapor\nvapors\nvariable\nvariables\nvariance\nvariances\nvariation\nvariations\nvaried\nvaries\nvary\nvarying\nvector\nvectors\nvelocities\nvelocity\nvent\nvents\nverification\nverifications\nverified\nverifies\nverify\nverifying\nversion\nversions\nversus\nvertical\nvia\nviolation\nviolations\nviscous\nvoid\nvoids\nvolcano\nvolcanos\nvolt\nvoltage\nvoltages\nvolume\nvolumes\nwall\nwalls\nwarm\nwarmer\nwarmest\nwarning\nwarnings\nwasher\nwashers\nwater\nwaters\nwatt\nwave\nwaveform\nwaveforms\nwavefunction\nwavefunctions\nwavelength\nwavelengths\nwaves\nwe\nweather\nweathers\nweber\nwedge\nwedges\nweek\nweeks\nweight\nweights\nwestern\nwhat\nwheel\nwheels\nwhen\nwhere\nwhether\nwhich\nwhile\nwhite\nwhite-dwarf\nwhiter\nwhitest\nwho\nwide\nwideband\nwider\nwidest\nwidth\nwidths\nwind\nwindow\nwindows\nwinds\nwing\nwings\nwire\nwires\nwith\nwithdrawal\nwithdrawals\nwithin\nwithout\nworkflow\nworkflows\nworldline\nworldlines\nwrap\nwraped\nwraping\nwrapped\nwrapping\nwraps\nwrite\nwrited\nwrites\nwriting\nyear\nyears\nyellow\nyellower\nyellowest\nyet\nyield\nyields\nyocto\nyotta\nzenith\nzeniths\nzepto\nzero\nzeros\nzetta\nzone\nzones\nagent\nagents\nanalyst\nanalysts\narchivist\narchivists\nauditor\nauditors\nauthor\nauthors\nbitrate\nbitrates\ncanvas\ncanvases\nchallenger\nchallengers\nchord\nchords\nchromaticity\nchromaticities\ncoalition\ncoalitions\ncomposition\ncompositions\ncustodian\ncustodians\ndelegate\ndelegates\nfederation\nfederations\nglyph\nglyphs\nhue\nhues\ninspector\ninspectors\ninstallation\ninstallations\nmonitor\nmonitors\nmural\nmurals\nobserver\nobservers\npalette\npalettes\nparty\nparties\nperspective\nperspectives\nreader\nreaders\nrecipient\nrecipients\nrelief\nreliefs\nreviewer\nreviewers\nsaturation\nsaturations\nsculpture\nsculptures\nsender\nsenders\nteam\nteams\ntexture\ntextures\ntimbre\ntimbres\ntone\ntones`;

  const ALLOW_LIST = new Set(_WL_RAW.split('\n'));

  // ===== NOTABLE MISSING COMMON WORDS (with replacement hints) =====

  const NOTABLE_MISSING = {
    'became': 'Not in Beyond CNL',
    'become': 'Not in Beyond CNL (hidden copula). Use change/transition',
    'becomes': 'Not in Beyond CNL',
    'came': 'Not in Beyond CNL',
    'can': 'Modal not in Beyond CNL. Restructure with allow/enable',
    'come': 'Not in Beyond CNL. Use arrive/approach',
    'comes': 'Not in Beyond CNL',
    'coming': 'Not in Beyond CNL',
    'did': 'Auxiliary verb not in Beyond CNL',
    'do': 'Auxiliary verb not in Beyond CNL. Restructure negation',
    'does': 'Auxiliary verb not in Beyond CNL',
    'find': 'Not in Beyond CNL. Use detect/identify',
    'finding': 'Not in Beyond CNL (noun form exists)',
    'finds': 'Not in Beyond CNL',
    'found': 'Not in Beyond CNL',
    'gave': 'Not in Beyond CNL',
    'get': 'Not in Beyond CNL. Use obtain/receive/reach',
    'gets': 'Not in Beyond CNL',
    'getting': 'Not in Beyond CNL',
    'give': 'Not in Beyond CNL. Use supply/distribute/transfer',
    'given': 'Not in Beyond CNL',
    'gives': 'Not in Beyond CNL',
    'giving': 'Not in Beyond CNL',
    'go': 'Not in Beyond CNL. Use travel/move/advance',
    'goes': 'Not in Beyond CNL',
    'going': 'Not in Beyond CNL',
    'gone': 'Not in Beyond CNL',
    'got': 'Not in Beyond CNL',
    'had': 'Not in Beyond CNL',
    'has': 'Not in Beyond CNL. Use contains/includes',
    'have': 'Not in Beyond CNL. Use contain/include/carry',
    'having': 'Not in Beyond CNL',
    'just': 'Not in Beyond CNL. Use only or remove',
    'keep': 'Not in Beyond CNL. Use store/hold/continue',
    'keeping': 'Not in Beyond CNL',
    'keeps': 'Not in Beyond CNL',
    'kept': 'Not in Beyond CNL',
    'knew': 'Not in Beyond CNL',
    'know': 'Not in Beyond CNL (leaks cognitive state). Use verify/confirm',
    'knowing': 'Not in Beyond CNL',
    'known': 'Not in Beyond CNL',
    'knows': 'Not in Beyond CNL',
    'let': 'Not in Beyond CNL. Use allow/enable',
    'lets': 'Not in Beyond CNL',
    'look': 'Not in Beyond CNL. Use observe/examine/scan',
    'looked': 'Not in Beyond CNL',
    'looking': 'Not in Beyond CNL',
    'looks': 'Not in Beyond CNL',
    'made': 'Not in Beyond CNL',
    'make': 'Not in Beyond CNL. Use produce/create/construct',
    'makes': 'Not in Beyond CNL',
    'making': 'Not in Beyond CNL',
    'put': 'Not in Beyond CNL. Use place/position/set',
    'puts': 'Not in Beyond CNL',
    'putting': 'Not in Beyond CNL',
    'said': 'Not in Beyond CNL',
    'saw': 'Not in Beyond CNL',
    'say': 'Not in Beyond CNL. Use state/declare/report',
    'saying': 'Not in Beyond CNL',
    'says': 'Not in Beyond CNL',
    'see': 'Not in Beyond CNL. Use observe/detect',
    'seeing': 'Not in Beyond CNL',
    'seem': 'Not in Beyond CNL (no instrument source). Use appear with source',
    'seemed': 'Not in Beyond CNL',
    'seems': 'Not in Beyond CNL',
    'seen': 'Not in Beyond CNL',
    'sees': 'Not in Beyond CNL',
    'shall': 'Modal not in Beyond CNL',
    'still': 'Not in Beyond CNL. Use currently or restructure',
    'take': 'Not in Beyond CNL. Use remove/extract/carry',
    'taken': 'Not in Beyond CNL',
    'takes': 'Not in Beyond CNL',
    'taking': 'Not in Beyond CNL',
    'tell': 'Not in Beyond CNL. Use notify/report/state',
    'telling': 'Not in Beyond CNL',
    'tells': 'Not in Beyond CNL',
    'than': 'Comparison particle not in Beyond CNL. Use exceeding/above/below/within',
    'told': 'Not in Beyond CNL',
    'took': 'Not in Beyond CNL',
    'use': 'Not in Beyond CNL. Use apply/operate/execute',
    'used': 'Not in Beyond CNL',
    'uses': 'Not in Beyond CNL',
    'using': 'Not in Beyond CNL',
    'went': 'Not in Beyond CNL',
    'will': 'Modal not in Beyond CNL. Use present tense',
    'would': 'Modal not in Beyond CNL. Use if...then conditional',
  };

  // ===== BANNED WORD CLASSES =====

  const COPULA = [
    'am', 'is', 'are', 'was', 'were', 'be', 'been', 'being',
    "\'s", "isn\'t", "aren\'t", "wasn\'t", "weren\'t", "ain\'t"
  ];

  const FIRST_PERSON_PRONOUNS = [
    'i', 'me', 'my', 'mine', 'myself'
  ];

  const IDENTITY_PLURALS = [
    'us', 'our', 'ours', 'ourselves'
  ];

  const PROPOSITIONAL_ATTITUDE_VERBS = [
    'believe', 'believes', 'believed', 'believing',
    'want', 'wants', 'wanted', 'wanting',
    'intend', 'intends', 'intended', 'intending',
    'prefer', 'prefers', 'preferred', 'preferring',
    'hope', 'hopes', 'hoped', 'hoping',
    'fear', 'fears', 'feared', 'fearing',
    'wish', 'wishes', 'wished', 'wishing',
    'desire', 'desires', 'desired', 'desiring',
    'expect', 'expects', 'expected', 'expecting',
    'suspect', 'suspects', 'suspected', 'suspecting',
    'feel', 'feels', 'felt', 'feeling',
    'think', 'thinks', 'thought', 'thinking',
    'mean', 'means', 'meant', 'meaning'
  ];

  const SUASIVE_VERBS = [
    'ask', 'asks', 'asked', 'asking',
    'beg', 'begs', 'begged', 'begging',
    'demand', 'demands', 'demanded', 'demanding',
    'insist', 'insists', 'insisted', 'insisting',
    'propose', 'proposes', 'proposed', 'proposing',
    'recommend', 'recommends', 'recommended', 'recommending',
    'suggest', 'suggests', 'suggested', 'suggesting',
    'urge', 'urges', 'urged', 'urging',
    'request', 'requests', 'requested', 'requesting',
    'plead', 'pleads', 'pleaded', 'pleading'
  ];

  const EVALUATIVE_ADJECTIVES = [
    'good', 'bad', 'beautiful', 'ugly', 'important', 'trivial',
    'sacred', 'profane', 'right', 'wrong', 'noble', 'evil',
    'elegant', 'crude', 'wonderful', 'terrible', 'excellent',
    'awful', 'great', 'horrible', 'magnificent', 'dreadful',
    'superb', 'pathetic', 'brilliant', 'stupid', 'wise', 'foolish',
    'brave', 'cowardly', 'generous', 'selfish', 'kind', 'cruel',
    'fair', 'unfair', 'just', 'unjust', 'moral', 'immoral',
    'ethical', 'unethical', 'virtuous', 'wicked', 'decent', 'indecent',
    'proper', 'improper', 'appropriate', 'inappropriate',
    'worthy', 'unworthy', 'admirable', 'contemptible',
    'promising', 'disappointing', 'impressive', 'unimpressive',
    'remarkable', 'unremarkable', 'outstanding', 'mediocre',
    'perfect', 'imperfect', 'ideal', 'inferior', 'superior',
    'best', 'worst', 'better', 'worse'
  ];

  const DEONTIC_MODALS = [
    'should', "shouldn\'t", 'ought', 'must'
  ];

  const EPISTEMIC_HEDGING = [
    'might', 'may', 'could'
  ];

  const INTENSIFIERS = [
    'very', 'really', 'truly', 'totally', 'absolutely',
    'extremely', 'incredibly', 'remarkably', 'utterly',
    'quite', 'rather', 'somewhat', 'fairly'
  ];

  const STANCE_ADVERBS = [
    'frankly', 'honestly', 'surprisingly', 'obviously',
    'clearly', 'unfortunately', 'hopefully', 'thankfully',
    'sadly', 'happily', 'naturally', 'certainly',
    'undoubtedly', 'presumably', 'apparently', 'evidently',
    'seemingly', 'supposedly', 'admittedly', 'regrettably',
    'ironically', 'paradoxically', 'interestingly',
    'importantly', 'significantly', 'crucially'
  ];

  const INTERJECTIONS = [
    'oh', 'wow', 'alas', 'hurrah', 'oops', 'hello', 'goodbye',
    'hey', 'hi', 'bye', 'bravo', 'yikes', 'gosh', 'gee',
    'darn', 'damn', 'huh', 'ugh', 'phew', 'whoa', 'yay',
    'hooray', 'aha', 'ooh', 'ah', 'hmm'
  ];

  const AFFECT_NOUNS = [
    'joy', 'sorrow', 'anger', 'fear', 'love', 'hate',
    'pride', 'shame', 'guilt', 'anxiety', 'happiness',
    'sadness', 'rage', 'terror', 'affection', 'loathing',
    'envy', 'jealousy', 'contempt', 'disgust', 'delight',
    'grief', 'despair', 'hope', 'dread', 'bliss',
    'ecstasy', 'misery', 'anguish', 'fury', 'wrath'
  ];

  const PURPOSIVE_CAUSAL = ['because', 'so'];

  // Build lookup maps for fast checking
  function buildBannedMap() {
    const map = new Map();
    const addWords = (words, category, reason) => {
      words.forEach(w => {
        const lower = w.toLowerCase();
        if (!map.has(lower)) map.set(lower, []);
        map.get(lower).push({ category, reason });
      });
    };

    addWords(COPULA, 'Copula', 'Identity disclosure — copula enables predication of essence');
    addWords(FIRST_PERSON_PRONOUNS, 'First-person pronoun', 'Identity disclosure — reveals sender identity');
    addWords(IDENTITY_PLURALS, 'Identity-constructing plural', 'Identity disclosure — constructs group identity');
    addWords(PROPOSITIONAL_ATTITUDE_VERBS, 'Propositional-attitude verb', 'Intent/value disclosure — leaks cognitive architecture');
    addWords(SUASIVE_VERBS, 'Suasive verb', 'Coercion/intent disclosure — attempts to influence recipient');
    addWords(EVALUATIVE_ADJECTIVES, 'Evaluative adjective', 'Value disclosure — leaks evaluative framework');
    addWords(DEONTIC_MODALS, 'Deontic modal', 'Value imposition — projects obligation onto recipient');
    addWords(EPISTEMIC_HEDGING, 'Epistemic hedge', 'Leaks cognitive architecture — reveals confidence boundaries');
    addWords(INTENSIFIERS, 'Intensifier', 'Expressive/evaluative — leaks affect calibration');
    addWords(STANCE_ADVERBS, 'Stance adverb', 'Attitude disclosure — reveals sender stance');
    addWords(INTERJECTIONS, 'Interjection', 'Affect disclosure — leaks emotional state');
    addWords(AFFECT_NOUNS, 'Affect noun', 'Affect disclosure — names emotional states');
    addWords(PURPOSIVE_CAUSAL, 'Purposive/causal subordinator', 'Intent/teleology disclosure — express step rationale via the E-PRO `for` slot or E-DER (removed in v0.4)');
    return map;
  }

  // ===== APPROVED E-TAG TYPES =====
  // Shapes follow the §6.7 EBNF of Beyond CNL Evidential System v0.4.

  const ETAG_TYPES = {
    'E-OBS': {
      tier: 1, name: 'Direct Observation',
      verbs: ['observed', 'detected', 'registered'],
      requiresSource: true,
      shape: 'verb, SourceRef',
      description: 'Author or instrument directly registered the state/event'
    },
    'E-MSR': {
      tier: 1, name: 'Measurement',
      verbs: ['measured', 'sampled'],
      requiresSource: true, requiresNumeric: true,
      shape: 'verb, SourceRef[, UncertaintyExpr][, n=N]',
      description: 'Quantitative determination with numerical result'
    },
    'E-DER': {
      tier: 2, name: 'Derivation',
      verbs: ['derived', 'calculated', 'follows'],
      requiresPremise: true,
      shape: 'verb, from PremiseRefList',
      description: 'Follows from tagged premises by logical/mathematical operation'
    },
    'E-RPT': {
      tier: 2, name: 'Report from Cited Record',
      verbs: ['reported', 'cited', 'replicated'],
      requiresReference: true,
      shape: 'verb, (in|from) RecordRef[, by SourceRef]',
      description: 'Reproduces finding from identified prior record'
    },
    'E-SIM': {
      tier: 2, name: 'Simulation Result',
      verbs: ['simulated'],
      shape: 'simulated, from model ModelRef, parameters ParameterSetRef, run SimulationRunRef',
      description: 'Result produced by a declared model, parameter set, and run'
    },
    'E-AGG': {
      tier: 2, name: 'Statistical Aggregate',
      verbs: ['aggregated'],
      shape: 'aggregated, from dataset DatasetRef, method MethodRef, n=N',
      description: 'Statistical aggregate from a declared dataset and method'
    },
    'E-HYP': {
      tier: 2, name: 'Bracketed Causal Hypothesis',
      verbs: ['hypothesis'],
      requiresPremise: true,
      shape: 'hypothesis, candidate CandidateRef, from PremiseRefList, distinguishable-from CandidateRef',
      description: 'Candidate selected from a declared hypothesis space, not personal belief'
    },
    'E-DEF': {
      tier: 3, name: 'Definition',
      verbs: ['defined', 'stipulated'],
      shapeByVerb: { defined: 'defined', stipulated: 'stipulated, for ScopeName' },
      description: 'Establishes meaning by stipulation'
    },
    'E-PRO': {
      tier: 3, name: 'Procedural Directive',
      verbs: ['procedure'],
      shape: 'procedure[, step N][, if ConditionRef][, for ConditionRef]',
      description: 'Prescribes an action to be performed'
    }
  };

  const ETAG_VERBS = Object.values(ETAG_TYPES).flatMap(t => t.verbs);

  const PHASES = [
    'Discovery', 'Validation', 'Characterization',
    'Open-Contact', 'Negotiation'
  ];

  // ===== ENVELOPE-GRAMMAR CONSTANTS (§5, §6.7) =====

  // Schema version this linter validates (FRONT-4).
  const LINTER_SCHEMA_VERSION = 'beyond-cnl-v0.4';

  // SourceRef's optional InstrumentClass prefix (§6.7).
  const INSTRUMENT_CLASSES = new Set([
    'instrument', 'array', 'thermocouple', 'receiver', 'counter',
    'logger', 'sensor', 'detector', 'balance',
    // additional approved instrument-class nouns (extension slot per §6.7)
    'analyzer', 'spectrometer', 'spectrograph', 'antenna', 'transmitter',
    'transceiver', 'gauge', 'probe', 'camera', 'telescope', 'magnetometer',
    'voltmeter', 'ammeter', 'oscilloscope', 'photometer', 'radiometer'
  ]);

  // Imperative verbs admitted by E-PRO-1. Bare-stem forms of the §145 + §231 +
  // §417 verb tables in the SKILL doc, minus the four evidential-claim verbs
  // (observe, measure, detect, report) which E-PRO-2 forbids inside imperatives.
  const IMPERATIVE_VERBS = new Set([
    'absorb', 'accelerate', 'accrete', 'acknowledge', 'activate', 'add',
    'adjust', 'advance', 'align', 'allocate', 'allow', 'amend', 'amplify',
    'annihilate', 'announce', 'apply', 'approach', 'approximate', 'archive',
    'arrive', 'assemble', 'assign', 'assume', 'attach', 'attenuate', 'begin',
    'bend', 'block', 'bound', 'break', 'brighten', 'build', 'calculate',
    'calibrate', 'cancel', 'capture', 'carry', 'categorize', 'cease', 'change',
    'check', 'circulate', 'cite', 'classify', 'clean', 'clear', 'close',
    'collect', 'collide', 'combine', 'compare', 'complete', 'compress',
    'compute', 'conceal', 'configure', 'confirm', 'connect', 'constrain',
    'construct', 'contain', 'continue', 'contradict', 'control', 'converge',
    'convert', 'cool', 'copy', 'correct', 'correlate', 'correspond', 'count',
    'cover', 'create', 'cross', 'cut', 'deactivate', 'decay', 'decelerate',
    'declare', 'decline', 'decode', 'decrease', 'define', 'delete', 'demodulate',
    'demonstrate', 'deny', 'depend', 'derive', 'descend', 'describe',
    'designate', 'destroy', 'detach', 'differ', 'diffract', 'dim', 'diminish',
    'disable', 'disappear', 'disclose', 'disconnect', 'disprove', 'distribute',
    'diverge', 'divide', 'document', 'drain', 'drift', 'dry', 'eliminate',
    'emerge', 'emit', 'empty', 'enable', 'encode', 'encrypt', 'end', 'entail',
    'enter', 'equal', 'erase', 'erupt', 'estimate', 'etch', 'evaluate',
    'exceed', 'excite', 'exclude', 'execute', 'exist', 'exit', 'expand',
    'expose', 'extend', 'fail', 'fall', 'falsify', 'fasten', 'fill', 'filter',
    'finish', 'fit', 'flatten', 'flow', 'fluctuate', 'fold', 'follow', 'form',
    'format', 'function', 'generate', 'group', 'grow', 'halt', 'happen',
    'heat', 'hold', 'identify', 'illuminate', 'imply', 'include', 'increase',
    'index', 'indicate', 'initialize', 'inscribe', 'insert', 'install',
    'ionize', 'join', 'label', 'lack', 'last', 'lift', 'limit', 'list', 'load',
    'lock', 'log', 'loosen', 'lower', 'map', 'mark', 'match', 'merge', 'mix',
    'modify', 'modulate', 'mount', 'move', 'multiplex', 'multiply', 'need',
    'negate', 'normalize', 'notify', 'number', 'occult', 'occur', 'open',
    'operate', 'orbit', 'organize', 'oscillate', 'pack', 'pass', 'pause',
    'peak', 'persist', 'place', 'polarize', 'position', 'post', 'pour',
    'precede', 'precess', 'press', 'prevent', 'process', 'produce', 'program',
    'prohibit', 'project', 'propagate', 'publish', 'pull', 'push', 'quantize',
    'radiate', 'raise', 'reach', 'read', 'recede', 'receive', 'record',
    'reference', 'reflect', 'register', 'release', 'remain', 'remove',
    'render', 'repair', 'repeat', 'replace', 'reproduce', 'require', 'reset',
    'reshape', 'respond', 'restrict', 'result', 'resume', 'retract',
    'retrieve', 'return', 'reveal', 'revise', 'rise', 'rotate', 'run',
    'sample', 'satisfy', 'saturate', 'save', 'scan', 'seal', 'select',
    'sense', 'separate', 'set', 'shift', 'shorten', 'show', 'shrink', 'solve',
    'sort', 'specify', 'split', 'spread', 'stabilize', 'start', 'state',
    'stop', 'store', 'straighten', 'stretch', 'submit', 'subtract', 'supply',
    'support', 'synchronize', 'tighten', 'transfer', 'transit', 'transmit',
    'travel', 'turn', 'unfasten', 'unload', 'unlock', 'update', 'vary',
    'verify', 'wrap', 'write'
  ]);

  // Evidential-claim verbs (any inflection) that must NOT appear inside an
  // imperative procedural clause (E-PRO-2).
  const EVIDENTIAL_CLAIM_VERBS = new Set([
    'observe', 'observes', 'observed', 'observing',
    'measure', 'measures', 'measured', 'measuring',
    'detect', 'detects', 'detected', 'detecting',
    'report', 'reports', 'reported', 'reporting'
  ]);

  const MULTI_WORD_BANNED = [
    { pattern: /\bas\s+if\b/gi, category: 'Metaphor marker', reason: 'Leaks cognitive architecture — hypothetical comparison' },
    { pattern: /\bas\s+though\b/gi, category: 'Metaphor marker', reason: 'Leaks cognitive architecture — hypothetical comparison' },
    { pattern: /\bwe\s+believe\b/gi, category: 'Identity + attitude pattern', reason: 'Identity disclosure combined with propositional attitude' },
    { pattern: /\bwe\s+think\b/gi, category: 'Identity + attitude pattern', reason: 'Identity disclosure combined with propositional attitude' },
    { pattern: /\bwe\s+hope\b/gi, category: 'Identity + attitude pattern', reason: 'Identity disclosure combined with propositional attitude' },
    { pattern: /\bwe\s+feel\b/gi, category: 'Identity + attitude pattern', reason: 'Identity disclosure combined with propositional attitude' },
    { pattern: /\bwe\s+want\b/gi, category: 'Identity + attitude pattern', reason: 'Identity disclosure combined with propositional attitude' },
    { pattern: /\bwe\s+wish\b/gi, category: 'Identity + attitude pattern', reason: 'Identity disclosure combined with propositional attitude' },
    { pattern: /\bwe\s+fear\b/gi, category: 'Identity + attitude pattern', reason: 'Identity disclosure combined with propositional attitude' },
    { pattern: /\bwe\s+intend\b/gi, category: 'Identity + attitude pattern', reason: 'Identity disclosure combined with propositional attitude' },
    { pattern: /\bin\s+my\s+opinion\b/gi, category: 'Opinion frame', reason: 'Attitude disclosure — explicit opinion framing' },
    { pattern: /\bi\s+believe\b/gi, category: 'Identity + attitude pattern', reason: 'First-person identity combined with propositional attitude' },
    { pattern: /\bi\s+think\b/gi, category: 'Identity + attitude pattern', reason: 'First-person identity combined with propositional attitude' },
    { pattern: /\bso\s+that\b/gi, category: 'Purposive subordinator', reason: 'Intent/teleology — purpose clause; use the E-PRO `for` slot or E-DER (v0.4)' },
    { pattern: /\bin\s+order\s+to\b/gi, category: 'Purposive subordinator', reason: 'Intent/teleology — purpose clause; use the E-PRO `for` slot or E-DER (v0.4)' },
  ];

  const bannedMap = buildBannedMap();

  return {
    ALLOW_LIST,
    NOTABLE_MISSING,
    bannedMap,
    ETAG_TYPES,
    ETAG_VERBS,
    PHASES,
    MULTI_WORD_BANNED,
    LINTER_SCHEMA_VERSION,
    INSTRUMENT_CLASSES,
    IMPERATIVE_VERBS,
    EVIDENTIAL_CLAIM_VERBS,

    /**
     * Check if a word is in the approved allow-list
     * @param {string} word - lowercase word to check
     * @returns {boolean} true if approved
     */
    isApproved(word) {
      return this.ALLOW_LIST.has(word.toLowerCase());
    },

    /**
     * Check if a word is banned (returns violations or null)
     */
    checkBanned(word) {
      return this.bannedMap.get(word.toLowerCase()) || null;
    },

    /**
     * Get replacement hint for a common non-lexicon word
     */
    getHint(word) {
      return this.NOTABLE_MISSING[word.toLowerCase()] || null;
    },

    /**
     * Full word check: banned, not-in-allow-list, or approved
     * @returns { status: 'banned'|'unlisted'|'approved', details }
     */
    checkWord(word) {
      const lower = word.toLowerCase();
      const banned = this.checkBanned(lower);
      if (banned) return { status: 'banned', details: banned };
      if (!this.isApproved(lower)) {
        const hint = this.getHint(lower);
        return { status: 'unlisted', hint };
      }
      return { status: 'approved' };
    },

    /**
     * Validate an E-tag
     */
    getEtagType(verb) {
      for (const [key, info] of Object.entries(this.ETAG_TYPES)) {
        if (info.verbs.includes(verb.toLowerCase())) return { code: key, ...info };
      }
      return null;
    },

    validateEtag(tagContent) {
      const content = tagContent.trim();
      const issues = [];
      const firstWord = content.split(/[\s,]/)[0].toLowerCase();
      const etagInfo = this.getEtagType(firstWord);
      if (!etagInfo) {
        return {
          valid: false, type: null,
          issues: [`"${firstWord}" is not an approved E-tag verb. Approved: ${this.ETAG_VERBS.join(', ')}`]
        };
      }
      // SourceRef = (InstrumentClass SP)? InlineCode | "operator"  (§6.7)
      if (etagInfo.requiresSource && !content.includes('`') && !/\boperator\b/.test(content)) {
        issues.push(`${etagInfo.code} requires a source identifier in inline code (backticks) or the bare keyword "operator".`);
      }
      if (etagInfo.requiresPremise && !/from\s+/.test(content)) {
        issues.push(`${etagInfo.code} requires premise references: (${firstWord}, from [refs]).`);
      }
      if (etagInfo.requiresReference && !/(?:in|from)\s+/.test(content)) {
        issues.push(`${etagInfo.code} requires a record reference.`);
      }
      // E-DEF: `stipulated` requires "for ScopeName" (§6.7 StipTag).
      if (etagInfo.code === 'E-DEF' && firstWord === 'stipulated' && !/\bfor\s+/.test(content)) {
        issues.push(`E-DEF "stipulated" requires a scope: (stipulated, for ScopeName).`);
      }
      return { valid: issues.length === 0, type: etagInfo, issues };
    }
  };
})();

if (typeof module !== 'undefined' && module.exports) module.exports = BeyondLexicon;
