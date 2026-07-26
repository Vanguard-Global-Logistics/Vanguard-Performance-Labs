import type { Compound, RoleCard } from "@/types";

export const NAV = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About Vanguard" },
  { href: "/products", label: "Research Products" },
  { href: "/education", label: "Peptide Education Library" },
  { href: "/research", label: "Scientific Research" },
  { href: "/articles", label: "Articles" },
  { href: "/videos", label: "Video Library" },
  { href: "/peptastic", label: "Peptastic" },
  { href: "/professionals", label: "Medical Professionals" },
  { href: "/wholesale", label: "Wholesale" },
  { href: "/specialty-request", label: "Specialty Sourcing" },
  { href: "/partnerships", label: "Partnerships" },
  { href: "/contact", label: "Contact" },
];

export const DISCLAIMER =
  "Educational only. Not medical advice, diagnosis, or treatment. For research and educational purposes. Consult a licensed medical professional.";

// Seed compounds — honest evidence levels. References are marked for editorial
// review; real PMIDs/DOIs are supplied by the owner's review process (never fabricated).
export const COMPOUNDS: Compound[] = [
  {
    slug: "bpc-157",
    listPrice: 55,
    variants: [{ size: "10mg", price: 55 }],
    strength: "10mg",
    name: "BPC-157",
    aliases: ["Body Protection Compound 157"],
    category: "Recovery",
    evidence: "limited",
    researchStatus: "Investigational — not approved for human use",
    overview:
      "A synthetic peptide derived from a sequence identified in gastric juice, studied in preclinical models for tissue and tendon repair.",
    mechanism:
      "Research explores effects on angiogenesis and growth-factor signaling in animal models; human mechanistic data is limited.",
    areasOfStudy: ["Tendon/ligament healing (animal)", "GI models (animal)"],
    safety: "Human safety is not established. Sold as research material without pharmaceutical manufacturing oversight.",
    faq: [
      { q: "Is BPC-157 approved?", a: "No. It is investigational and not approved for human use." },
      { q: "Is there human evidence?", a: "Controlled human trials are essentially absent; most data is animal or in vitro." },
    ],
    references: [
      {
        citation: "Chang CH, Tsai WC, Lin MS, Hsu YH, Pang JS. J Appl Physiol. 2011;110(3):774-80.",
        pmid: "21030672",
        finding:
          "In cultured rat tendon fibroblasts, BPC-157 accelerated explant outgrowth and increased cell migration and survival under oxidative stress. Cell proliferation itself was not directly affected.",
        model: "in-vitro",
        verified: true,
      },
      {
        citation: "Krivic A, Anic T, Seiwerth S, Huljev D, Sikiric P. J Orthop Res. 2006;24(5):982-9.",
        pmid: "16583442",
        finding:
          "In rats with surgically detached Achilles tendon, BPC-157 improved functional, biomechanical and histological healing markers, and reduced the healing impairment caused by corticosteroid co-treatment.",
        model: "animal",
        verified: true,
      },
      {
        citation: "Staresinic M, et al. Biomedicines. 2021;9(11):1547.",
        pmid: "34829776",
        finding:
          "In a rat myotendinous junction defect that does not heal spontaneously, BPC-157 treatment was associated with recovered tissue organisation and reduced inflammatory infiltrate at 28 and 42 days.",
        model: "animal",
        verified: true,
      },
      {
        citation: "Vasireddi N, Hahamyan H, Salata MJ, et al. HSS Journal. 2025.",
        doi: "10.1177/15563316251355551",
        finding:
          "A systematic review of 36 studies published 1993-2024 concluded that BPC-157 improved outcomes in animal models of muscle, tendon, ligament and bone injury, while noting it is not FDA approved and is banned in some sports.",
        model: "systematic-review",
        verified: true,
      },
    ],
    lastReviewed: "2026-06-01",
    reviewStatus: "draft",
    regulatory: "wholesale_review",
  },
  {
    slug: "tb-500",
    listPrice: 58,
    variants: [{ size: "10mg", price: 58 }],
    strength: "10mg",
    name: "TB-500",
    aliases: ["Thymosin beta-4 fragment"],
    category: "Recovery",
    evidence: "limited",
    researchStatus: "Investigational — not approved for human use",
    overview: "A synthetic fragment related to thymosin beta-4, studied in animal and laboratory models for tissue repair.",
    mechanism: "Preclinical research explores actin regulation and cell migration; human data is minimal.",
    areasOfStudy: ["Wound/tissue models (animal)"],
    safety: "Human safety not established. Banned in competitive sport.",
    faq: [{ q: "Is TB-500 studied in humans?", a: "Controlled human evidence is essentially absent." }],
    references: [
      {
        citation: "Malinda KM, Sidhu GS, Mani H, et al. J Invest Dermatol. 1999;113(3):364-8.",
        pmid: "10469335",
        finding:
          "Topical and intraperitoneal thymosin beta-4 increased re-epithelialisation and wound contraction across several rodent wound models, including steroid-impaired, diabetic and aged animals.",
        model: "animal",
        verified: false,
      },
      {
        citation: "Philp D, Nguyen M, Scheremeta B, et al. FASEB J. 2004;18(2):385-7.",
        pmid: "15037013",
        finding:
          "Thymosin beta-4 promoted hair follicle growth and follicle stem cell differentiation in mice. No corresponding human data exists.",
        model: "animal",
        verified: false,
      },
      {
        citation: "Xing Y, Ye Y, Zuo H, Li Y. Front Endocrinol. 2021;12:767785.",
        finding:
          "A review of thymosin beta-4 function describing actin sequestration, cell migration, angiogenesis and anti-inflammatory signalling as its principal studied mechanisms.",
        model: "review",
        verified: false,
      },
      {
        citation: "Thymosin Beta-4 and TB-500 in Tissue Healing, Regeneration, and Musculoskeletal Repair: A Scoping Review. Appl Sci. 2026;16(12):6202.",
        finding:
          "A 2026 scoping review found human evidence concentrated in ocular and dermal wound settings, with musculoskeletal categories comparatively sparse and direct TB-500 evidence limited to a single included study. The literature remains largely preclinical.",
        model: "systematic-review",
        verified: true,
      },
    ],
    lastReviewed: "2026-06-01",
    reviewStatus: "draft",
    regulatory: "wholesale_review",
  },
  {
    slug: "ghk-cu",
    listPrice: 30,
    variants: [{ size: "50mg", price: 30 }],
    strength: "50mg",
    name: "GHK-Cu",
    aliases: ["Copper peptide"],
    category: "Skin / Hair",
    evidence: "moderate",
    researchStatus: "Cosmetic and research use",
    overview: "A copper-binding tripeptide studied primarily in topical/cosmetic contexts for skin.",
    mechanism: "Research explores roles in skin remodeling and antioxidant signaling; strongest data is topical.",
    areasOfStudy: ["Topical skin studies (human)", "Wound models (animal)"],
    safety: "Topical cosmetic use is common; systemic/injected use is less studied.",
    faq: [{ q: "Is GHK-Cu in skincare?", a: "Yes, copper peptides appear in many topical cosmetic products." }],
    references: [
      {
        citation: "Pickart L, Margolina A. Int J Mol Sci. 2018;19(7):1987.",
        pmid: "29986520",
        doi: "10.3390/ijms19071987",
        finding:
          "A review of gene-expression data describing GHK-Cu's studied effects on collagen, elastin and glycosaminoglycan synthesis and on dermal fibroblast function.",
        model: "review",
        verified: true,
      },
      {
        citation: "Watson REB, Ogden S, Cotterell LF, et al. Br J Dermatol. 2009;161(2):419-26.",
        pmid: "19438432",
        doi: "10.1111/j.1365-2133.2009.09216.x",
        finding:
          "A double-blind randomised controlled trial of a cosmetic anti-ageing product reporting improvement in photoaged skin. Note that the product was a multi-ingredient formulation, so the effect cannot be attributed to GHK-Cu alone.",
        model: "human-rct",
        verified: false,
      },
      {
        citation: "Topical GHK-Cu Gel for Acute Skin Wound Healing. ClinicalTrials.gov.",
        nct: "NCT07437586",
        finding:
          "A registered randomised vehicle-controlled trial evaluating topical GHK-Cu gel on standardised punch-biopsy wounds in healthy adults. Registration confirms the trial exists; results are not yet reported.",
        model: "human-rct",
        verified: true,
      },
    ],
    lastReviewed: "2026-06-01",
    reviewStatus: "draft",
    regulatory: "wholesale_review",
  },
  {
    slug: "cjc-1295",
    listPrice: 30,
    variants: [{ size: "5mg", price: 30 }],
    strength: "5mg",
    name: "CJC-1295",
    aliases: ["GHRH analogue"],
    category: "Growth",
    evidence: "limited",
    researchStatus: "Investigational",
    overview: "A growth-hormone-releasing hormone analogue studied for its effect on GH and IGF-1.",
    mechanism: "Stimulates GH secretion in small studies; long-term outcomes and safety in healthy adults are unknown.",
    areasOfStudy: ["GH/IGF-1 response (small human studies)"],
    safety: "Long-term safety unknown. Often discussed alongside ipamorelin.",
    faq: [{ q: "Does it raise GH?", a: "Small studies show GH/IGF-1 increases; outcome data is limited." }],
    references: [{ label: "[Editorial review required]", note: "Insert verified reference." }],
    lastReviewed: "2026-06-01",
    reviewStatus: "draft",
    regulatory: "wholesale_review",
  },
  {
    slug: "ipamorelin",
    listPrice: 41,
    variants: [{ size: "5mg", price: 41 }, { size: "10mg", price: 65 }],
    strength: "5mg",
    name: "Ipamorelin",
    aliases: ["GH secretagogue"],
    category: "Growth",
    evidence: "moderate",
    researchStatus: "Investigational",
    overview: "A growth-hormone secretagogue studied for its selective GH-releasing effect.",
    mechanism: "Acts on the ghrelin/GH secretagogue receptor to raise GH in studies; long-term data is limited.",
    areasOfStudy: ["GH response (human studies)"],
    safety: "Long-term outcome and safety data in healthy adults is limited.",
    faq: [{ q: "Is it selective?", a: "It is described as a relatively selective GH secretagogue in studies." }],
    references: [{ label: "[Editorial review required]", note: "Insert verified reference." }],
    lastReviewed: "2026-06-01",
    reviewStatus: "draft",
    regulatory: "wholesale_review",
  },
  {
    slug: "retatrutide",
    name: "Retatrutide",
    strength: "10mg",
    listPrice: 80,
    variants: [{ size: "10mg", price: 80 }, { size: "20mg", price: 160 }, { size: "30mg", price: 220 }],
    aliases: ["GLP3-Reta", "Triple agonist (GLP-1/GIP/glucagon)"],
    category: "Metabolic",
    evidence: "moderate",
    researchStatus: "Investigational — Phase 3 (not approved; anticipated ~2027)",
    overview:
      "An investigational triple-agonist studied in large trials for weight and metabolic outcomes. Not FDA-approved and has no legal compounding pathway.",
    mechanism: "Agonism at GLP-1, GIP, and glucagon receptors; studied in the manufacturer's Phase 3 program.",
    areasOfStudy: ["Weight reduction (Phase 3 human trials)", "Metabolic endpoints"],
    safety: "Investigational. Efficacy signals in trials are strong, but it is not approved and not legally available outside trials.",
    faq: [
      { q: "Can I buy approved retatrutide?", a: "No. It is investigational; there is no approved or legal compounded version." },
    ],
    references: [
      {
        citation: "Jastreboff AM, Kaplan LM, Frias JP, et al. N Engl J Med. 2023;389(6):514-526.",
        doi: "10.1056/NEJMoa2301972",
        nct: "NCT04881760",
        finding:
          "A phase 2 double-blind placebo-controlled trial in 338 adults reported least-squares mean body-weight change at 24 weeks of -17.5% in the 12mg group versus -1.6% with placebo. Gastrointestinal effects were the most common adverse events, mostly during dose escalation.",
        model: "human-rct",
        verified: true,
      },
    ],
    lastReviewed: "2026-06-01",
    reviewStatus: "draft",
    regulatory: "wholesale_review",
  },
  {
    slug: "kpv",
    listPrice: 45,
    variants: [{ size: "10mg", price: 45 }],
    strength: "10mg",
    name: "KPV",
    aliases: ["Lys-Pro-Val", "alpha-MSH fragment"],
    category: "Immune / Skin",
    evidence: "limited",
    researchStatus: "Investigational — not approved for human use",
    overview: "A short tripeptide fragment of alpha-MSH studied in preclinical models for inflammatory signalling.",
    mechanism: "Preclinical work explores anti-inflammatory signalling pathways; controlled human data is minimal.",
    areasOfStudy: ["Inflammatory models (animal)", "Skin and gut models (preclinical)"],
    safety: "Human safety is not established. Research material only.",
    faq: [{ q: "Is KPV studied in humans?", a: "Controlled human evidence is essentially absent; most work is preclinical." }],
    references: [{ label: "[Editorial review required]", note: "Insert verified reference." }],
    lastReviewed: "2026-06-01",
    reviewStatus: "draft",
    regulatory: "wholesale_review",
  },
  {
    slug: "mots-c",
    listPrice: 45,
    variants: [{ size: "10mg", price: 45 }],
    strength: "10mg",
    name: "MOTS-c",
    aliases: ["Mitochondrial ORF of the 12S rRNA type-c"],
    category: "Metabolic",
    evidence: "limited",
    researchStatus: "Investigational — not approved for human use",
    overview: "A mitochondria-derived peptide studied for roles in metabolic regulation and exercise physiology.",
    mechanism: "Research explores AMPK-related metabolic signalling; human outcome data is very limited.",
    areasOfStudy: ["Metabolic models (animal)", "Exercise physiology (early research)"],
    safety: "Human safety and long-term effects are not established.",
    faq: [{ q: "Is MOTS-c proven?", a: "No. It is an active research area with limited controlled human evidence." }],
    references: [{ label: "[Editorial review required]", note: "Insert verified reference." }],
    lastReviewed: "2026-06-01",
    reviewStatus: "draft",
    regulatory: "wholesale_review",
  },
  {
    slug: "ss-31",
    strength: "10mg",
    name: "SS-31",
    aliases: ["Elamipretide"],
    category: "Mitochondrial",
    evidence: "moderate",
    researchStatus: "Investigational — studied in clinical trials, not approved",
    overview: "A mitochondria-targeting peptide that has been evaluated in human clinical trials for mitochondrial disease indications.",
    mechanism: "Associates with cardiolipin in the inner mitochondrial membrane; studied for effects on mitochondrial function.",
    areasOfStudy: ["Primary mitochondrial myopathy (human trials)", "Cardiac and renal models"],
    safety: "Has undergone clinical study, but is not approved. Trial outcomes have been mixed.",
    faq: [{ q: "Has SS-31 been in human trials?", a: "Yes — elamipretide has been studied in clinical trials, with mixed results and no approval." }],
    references: [{ label: "[Editorial review required]", note: "Insert verified trial citation." }],
    lastReviewed: "2026-06-01",
    reviewStatus: "draft",
    regulatory: "inquiry_only",
  },
  {
    slug: "nad-plus",
    listPrice: 59,
    variants: [{ size: "500mg", price: 59 }],
    strength: "500mg",
    name: "NAD+",
    aliases: ["Nicotinamide adenine dinucleotide"],
    category: "Longevity",
    evidence: "moderate",
    researchStatus: "Sold as a supplement/research material; IV and injectable use is not FDA-approved",
    overview: "A coenzyme central to cellular energy metabolism. Precursors are widely studied; direct NAD+ administration is less well characterised.",
    mechanism: "Central to redox reactions and sirtuin/PARP activity. Most human data concerns oral precursors (NR, NMN) rather than injected NAD+.",
    areasOfStudy: ["Precursor supplementation (human trials)", "Ageing biology (preclinical)"],
    safety: "Oral precursors are generally well tolerated in studies. Injectable/IV NAD+ is not an approved therapy and is less studied.",
    faq: [{ q: "Does NAD+ reverse ageing?", a: "No. Research is active and interesting, but claims of reversing ageing outrun the human evidence." }],
    references: [{ label: "[Editorial review required]", note: "Insert verified reference." }],
    lastReviewed: "2026-06-01",
    reviewStatus: "draft",
    regulatory: "wholesale_review",
  },
  {
    slug: "aod-9604",
    name: "AOD-9604",
    aliases: ["Anti-Obesity Drug 9604", "hGH fragment 176-191"],
    category: "Metabolic",
    strength: "5mg",
    listPrice: 45,
    variants: [{ size: "5mg", price: 45 }],
    evidence: "limited",
    researchStatus: "Investigational — not approved for human use",
    overview:
      "A modified fragment of the human growth hormone molecule, studied in preclinical models for effects on fat metabolism without the full growth-signalling profile of intact hGH.",
    mechanism:
      "Research describes activity on lipolytic pathways in adipose tissue models. Human mechanistic data is limited and clinical trials have not established efficacy.",
    areasOfStudy: ["Adipose metabolism (preclinical)", "Cartilage models"],
    safety:
      "Human safety is not established. The FDA has stated this substance is not eligible for use in compounded drug products. Supplied as research material only.",
    faq: [
      { q: "Is this approved for human use?", a: "No. This material is supplied for laboratory research use only by qualified businesses and institutions. It is not a medicine and is not for human or veterinary consumption." },
      { q: "Do you provide purity documentation?", a: "Certificates of analysis are available to approved accounts. Contact our team for batch-specific documentation." }
    ],
    references: [
      { label: "[Editorial review required]", note: "Peer-reviewed citations to be verified and added by a qualified reviewer before publication." }
    ],
    lastReviewed: "2026-07-23",
    reviewStatus: "in_review",
    regulatory: "wholesale_review",
  },
  {
    slug: "bpc-157-tb-500",
    name: "BPC-157 + TB-500",
    aliases: ["Blend", "BPC157/TB500"],
    category: "Recovery",
    strength: "20mg",
    listPrice: 84,
    variants: [{ size: "20mg", price: 84 }],
    evidence: "limited",
    researchStatus: "Investigational blend — not approved for human use",
    overview:
      "A combination preparation containing two peptides studied separately in preclinical tissue-repair models. Blends are supplied for research convenience; combination effects have not been characterised in controlled human trials.",
    mechanism:
      "Each constituent has its own proposed mechanism in animal models. Interaction effects between them are not established in published human research.",
    areasOfStudy: ["Combination tissue-repair models (preclinical)"],
    safety:
      "Human safety is not established for either constituent individually or in combination. Research material only.",
    faq: [
      { q: "Is this approved for human use?", a: "No. This material is supplied for laboratory research use only by qualified businesses and institutions. It is not a medicine and is not for human or veterinary consumption." },
      { q: "Do you provide purity documentation?", a: "Certificates of analysis are available to approved accounts. Contact our team for batch-specific documentation." }
    ],
    references: [
      { label: "[Editorial review required]", note: "Peer-reviewed citations to be verified and added by a qualified reviewer before publication." }
    ],
    lastReviewed: "2026-07-23",
    reviewStatus: "in_review",
    regulatory: "wholesale_review",
  },
  {
    slug: "cagrilintide",
    name: "Cagrilintide",
    aliases: ["AM833"],
    category: "Metabolic",
    strength: "5mg",
    listPrice: 78,
    variants: [{ size: "5mg", price: 78 }, { size: "10mg", price: 110 }],
    evidence: "moderate",
    researchStatus: "Investigational — in clinical trials, not approved",
    overview:
      "A long-acting amylin analogue under clinical investigation for metabolic and appetite-regulation research, studied both alone and alongside GLP-1 receptor agonists.",
    mechanism:
      "Amylin receptor agonism is studied for effects on satiety signalling and gastric emptying. Trial data exists but the compound has not completed regulatory approval.",
    areasOfStudy: ["Appetite regulation (clinical trials)", "Combination metabolic research"],
    safety:
      "Investigational. Not approved by the FDA for any indication. Human use outside a supervised clinical trial is not supported. Research material only.",
    faq: [
      { q: "Is this approved for human use?", a: "No. This material is supplied for laboratory research use only by qualified businesses and institutions. It is not a medicine and is not for human or veterinary consumption." },
      { q: "Do you provide purity documentation?", a: "Certificates of analysis are available to approved accounts. Contact our team for batch-specific documentation." }
    ],
    references: [
      { label: "[Editorial review required]", note: "Peer-reviewed citations to be verified and added by a qualified reviewer before publication." }
    ],
    lastReviewed: "2026-07-23",
    reviewStatus: "in_review",
    regulatory: "wholesale_review",
  },
  {
    slug: "cagrisema",
    name: "CagriSema",
    aliases: ["Cagrilintide + Semaglutide"],
    category: "Metabolic",
    strength: "10mg",
    listPrice: 127,
    variants: [{ size: "10mg", price: 127 }],
    evidence: "moderate",
    researchStatus: "Investigational combination — not approved; contains an analogue of an approved drug class",
    overview:
      "A combination preparation of an amylin analogue with a GLP-1 receptor agonist, under clinical investigation for metabolic research.",
    mechanism:
      "Combines amylin and GLP-1 receptor pathways studied for additive effects on satiety and glycaemic signalling in trial settings.",
    areasOfStudy: ["Combination metabolic trials"],
    safety:
      "Investigational combination. Semaglutide is the active ingredient of FDA-approved products; compounded and research-supplied versions are NOT approved and are not interchangeable with approved medicines. Research material only.",
    faq: [
      { q: "Is this approved for human use?", a: "No. This material is supplied for laboratory research use only by qualified businesses and institutions. It is not a medicine and is not for human or veterinary consumption." },
      { q: "Do you provide purity documentation?", a: "Certificates of analysis are available to approved accounts. Contact our team for batch-specific documentation." }
    ],
    references: [
      { label: "[Editorial review required]", note: "Peer-reviewed citations to be verified and added by a qualified reviewer before publication." }
    ],
    lastReviewed: "2026-07-23",
    reviewStatus: "in_review",
    regulatory: "wholesale_review",
  },
  {
    slug: "cjc-1295-no-dac-ipamorelin",
    name: "CJC-1295 no DAC + Ipamorelin",
    aliases: ["Blend"],
    category: "Growth Hormone Secretagogue",
    strength: "10mg",
    listPrice: 64,
    variants: [{ size: "10mg", price: 64 }],
    evidence: "limited",
    researchStatus: "Investigational blend — not approved for human use",
    overview:
      "A combination preparation of a GHRH analogue and a ghrelin-receptor agonist, supplied together for research convenience.",
    mechanism:
      "The constituents act on distinct receptors studied in GH-axis research. Combination effects are not established in controlled human trials.",
    areasOfStudy: ["Combination GH-axis research (preclinical)"],
    safety:
      "Human safety is not established for the combination. Research material only.",
    faq: [
      { q: "Is this approved for human use?", a: "No. This material is supplied for laboratory research use only by qualified businesses and institutions. It is not a medicine and is not for human or veterinary consumption." },
      { q: "Do you provide purity documentation?", a: "Certificates of analysis are available to approved accounts. Contact our team for batch-specific documentation." }
    ],
    references: [
      { label: "[Editorial review required]", note: "Peer-reviewed citations to be verified and added by a qualified reviewer before publication." }
    ],
    lastReviewed: "2026-07-23",
    reviewStatus: "in_review",
    regulatory: "wholesale_review",
  },
  {
    slug: "dsip",
    name: "DSIP",
    aliases: ["Delta Sleep-Inducing Peptide"],
    category: "Neuro",
    strength: "15mg",
    listPrice: 58,
    variants: [{ size: "15mg", price: 58 }],
    evidence: "insufficient",
    researchStatus: "Investigational — not approved for human use",
    overview:
      "A nonapeptide first isolated in the 1970s from cerebral venous blood in animal studies, investigated for possible relationships to sleep-phase regulation.",
    mechanism:
      "Proposed central nervous system activity remains poorly characterised. Published research is sparse and largely dated.",
    areasOfStudy: ["Sleep-phase research (preclinical, historical)"],
    safety:
      "Human safety is not established. Evidence base is notably thin. Research material only.",
    faq: [
      { q: "Is this approved for human use?", a: "No. This material is supplied for laboratory research use only by qualified businesses and institutions. It is not a medicine and is not for human or veterinary consumption." },
      { q: "Do you provide purity documentation?", a: "Certificates of analysis are available to approved accounts. Contact our team for batch-specific documentation." }
    ],
    references: [
      { label: "[Editorial review required]", note: "Peer-reviewed citations to be verified and added by a qualified reviewer before publication." }
    ],
    lastReviewed: "2026-07-23",
    reviewStatus: "in_review",
    regulatory: "wholesale_review",
  },
  {
    slug: "epithalon",
    name: "Epithalon",
    aliases: ["Epitalon", "AEDG peptide"],
    category: "Longevity",
    strength: "50mg",
    listPrice: 92,
    variants: [{ size: "50mg", price: 92 }],
    evidence: "insufficient",
    researchStatus: "Investigational — not approved for human use",
    overview:
      "A synthetic tetrapeptide studied primarily in Russian-language literature for reported effects on telomerase activity and pineal function in animal models.",
    mechanism:
      "Proposed effects on telomerase expression are described in a limited body of research that has not been widely replicated in independent controlled human trials.",
    areasOfStudy: ["Telomere biology (preclinical)", "Pineal/circadian models"],
    safety:
      "Human safety is not established. Independent replication of key findings is limited. Research material only.",
    faq: [
      { q: "Is this approved for human use?", a: "No. This material is supplied for laboratory research use only by qualified businesses and institutions. It is not a medicine and is not for human or veterinary consumption." },
      { q: "Do you provide purity documentation?", a: "Certificates of analysis are available to approved accounts. Contact our team for batch-specific documentation." }
    ],
    references: [
      { label: "[Editorial review required]", note: "Peer-reviewed citations to be verified and added by a qualified reviewer before publication." }
    ],
    lastReviewed: "2026-07-23",
    reviewStatus: "in_review",
    regulatory: "wholesale_review",
  },
  {
    slug: "glow-blend",
    name: "Glow Blend",
    aliases: ["Blend"],
    category: "Recovery",
    strength: "70mg",
    listPrice: 117,
    variants: [{ size: "70mg", price: 117 }],
    evidence: "limited",
    researchStatus: "Investigational blend — not approved for human use",
    overview:
      "A multi-peptide research preparation combining compounds studied individually in tissue and dermal research models.",
    mechanism:
      "Constituents have separate proposed mechanisms in preclinical research. Combination effects are not characterised in controlled human studies.",
    areasOfStudy: ["Dermal and tissue research (preclinical)"],
    safety:
      "Human safety is not established for the blend. Research material only.",
    faq: [
      { q: "Is this approved for human use?", a: "No. This material is supplied for laboratory research use only by qualified businesses and institutions. It is not a medicine and is not for human or veterinary consumption." },
      { q: "Do you provide purity documentation?", a: "Certificates of analysis are available to approved accounts. Contact our team for batch-specific documentation." }
    ],
    references: [
      { label: "[Editorial review required]", note: "Peer-reviewed citations to be verified and added by a qualified reviewer before publication." }
    ],
    lastReviewed: "2026-07-23",
    reviewStatus: "in_review",
    regulatory: "wholesale_review",
  },
  {
    slug: "glp2-tirz",
    name: "GLP2-Tirz",
    aliases: ["Tirzepatide analogue"],
    category: "Metabolic",
    strength: "10mg",
    listPrice: 75,
    variants: [{ size: "10mg", price: 75 }, { size: "20mg", price: 120 }, { size: "30mg", price: 165 }, { size: "40mg", price: 190 }, { size: "60mg", price: 240 }],
    evidence: "strong",
    researchStatus: "Analogue of an approved drug substance — research supply is NOT an approved medicine",
    overview:
      "A dual GIP/GLP-1 receptor agonist analogue. The reference molecule has been extensively studied in large controlled trials and is the active ingredient of FDA-approved prescription products.",
    mechanism:
      "Dual agonism at GIP and GLP-1 receptors affects insulin secretion, gastric emptying, and satiety signalling — among the best-characterised mechanisms in this catalog.",
    areasOfStudy: ["Glycaemic control (clinical)", "Body-weight regulation (clinical)"],
    safety:
      "IMPORTANT: research-supplied material is not an approved medicine, is not manufactured to pharmaceutical standards, and is not interchangeable with prescription products. Not for human use. Research material only.",
    faq: [
      { q: "Is this approved for human use?", a: "No. This material is supplied for laboratory research use only by qualified businesses and institutions. It is not a medicine and is not for human or veterinary consumption." },
      { q: "Do you provide purity documentation?", a: "Certificates of analysis are available to approved accounts. Contact our team for batch-specific documentation." }
    ],
    references: [
      { label: "[Editorial review required]", note: "Peer-reviewed citations to be verified and added by a qualified reviewer before publication." }
    ],
    lastReviewed: "2026-07-23",
    reviewStatus: "in_review",
    regulatory: "wholesale_review",
  },
  {
    slug: "igf-1-lr3",
    name: "IGF-1 LR3",
    aliases: ["Long R3 IGF-1"],
    category: "Growth Factor",
    strength: "1mg",
    listPrice: 97,
    variants: [{ size: "1mg", price: 97 }],
    evidence: "limited",
    researchStatus: "Investigational — not approved for human use",
    overview:
      "A modified insulin-like growth factor analogue with reduced binding-protein affinity, used widely as a cell-culture supplement in laboratory research.",
    mechanism:
      "Signals through IGF-1 receptors affecting cell proliferation and differentiation in culture. Its proliferative activity is precisely why human use is not supported.",
    areasOfStudy: ["Cell culture research", "Growth-factor signalling (in vitro)"],
    safety:
      "Human safety is not established. Growth-factor signalling carries theoretical proliferative risk. Prohibited in competitive sport. Research material only.",
    faq: [
      { q: "Is this approved for human use?", a: "No. This material is supplied for laboratory research use only by qualified businesses and institutions. It is not a medicine and is not for human or veterinary consumption." },
      { q: "Do you provide purity documentation?", a: "Certificates of analysis are available to approved accounts. Contact our team for batch-specific documentation." }
    ],
    references: [
      { label: "[Editorial review required]", note: "Peer-reviewed citations to be verified and added by a qualified reviewer before publication." }
    ],
    lastReviewed: "2026-07-23",
    reviewStatus: "in_review",
    regulatory: "wholesale_review",
  },
  {
    slug: "pt-141",
    name: "PT-141",
    aliases: ["Bremelanotide"],
    category: "Neuro",
    strength: "10mg",
    listPrice: 45,
    variants: [{ size: "10mg", price: 45 }],
    evidence: "moderate",
    researchStatus: "Analogue of an approved drug substance — research supply is NOT an approved medicine",
    overview:
      "A melanocortin receptor agonist. The reference molecule completed clinical trials and is the active ingredient of an FDA-approved prescription product for a specific indication.",
    mechanism:
      "Acts on central melanocortin receptors rather than the vascular pathways targeted by other compounds studied in the same area.",
    areasOfStudy: ["Melanocortin signalling (clinical)"],
    safety:
      "Research-supplied material is not an approved medicine and is not interchangeable with prescription products. Not for human use. Research material only.",
    faq: [
      { q: "Is this approved for human use?", a: "No. This material is supplied for laboratory research use only by qualified businesses and institutions. It is not a medicine and is not for human or veterinary consumption." },
      { q: "Do you provide purity documentation?", a: "Certificates of analysis are available to approved accounts. Contact our team for batch-specific documentation." }
    ],
    references: [
      { label: "[Editorial review required]", note: "Peer-reviewed citations to be verified and added by a qualified reviewer before publication." }
    ],
    lastReviewed: "2026-07-23",
    reviewStatus: "in_review",
    regulatory: "wholesale_review",
  },
  {
    slug: "reconstitution-solution",
    name: "Reconstitution Solution",
    aliases: ["Bacteriostatic diluent"],
    category: "Laboratory Supply",
    strength: "30mL",
    listPrice: 27,
    variants: [{ size: "30mL", price: 27, onSale: true, percentOff: 30.77 }],
    evidence: "strong",
    researchStatus: "Laboratory supply — not a therapeutic product",
    overview:
      "A sterile diluent used in laboratory settings to reconstitute lyophilised research materials for in-vitro work and analysis.",
    mechanism:
      "Provides a buffered, preserved medium suitable for dissolving lyophilised powders under laboratory conditions.",
    areasOfStudy: ["Laboratory sample preparation"],
    safety:
      "Laboratory supply for research use. Not for human or veterinary administration.",
    faq: [
      { q: "Is this approved for human use?", a: "No. This material is supplied for laboratory research use only by qualified businesses and institutions. It is not a medicine and is not for human or veterinary consumption." },
      { q: "Do you provide purity documentation?", a: "Certificates of analysis are available to approved accounts. Contact our team for batch-specific documentation." }
    ],
    references: [
      { label: "[Editorial review required]", note: "Peer-reviewed citations to be verified and added by a qualified reviewer before publication." }
    ],
    lastReviewed: "2026-07-23",
    reviewStatus: "in_review",
    regulatory: "wholesale_review",
  },
  {
    slug: "selank",
    name: "Selank",
    aliases: ["TP-7"],
    category: "Neuro",
    strength: "11mg",
    listPrice: 56,
    variants: [{ size: "11mg", price: 56 }],
    evidence: "insufficient",
    researchStatus: "Investigational — not approved for human use",
    overview:
      "A synthetic heptapeptide derived from tuftsin, studied primarily in Russian research literature for effects on anxiety-related behaviour in animal models.",
    mechanism:
      "Proposed interaction with GABAergic and monoamine systems is described in a limited literature that lacks broad independent replication.",
    areasOfStudy: ["Anxiolytic behaviour models (preclinical)"],
    safety:
      "Human safety is not established. Evidence base is limited and geographically concentrated. Research material only.",
    faq: [
      { q: "Is this approved for human use?", a: "No. This material is supplied for laboratory research use only by qualified businesses and institutions. It is not a medicine and is not for human or veterinary consumption." },
      { q: "Do you provide purity documentation?", a: "Certificates of analysis are available to approved accounts. Contact our team for batch-specific documentation." }
    ],
    references: [
      { label: "[Editorial review required]", note: "Peer-reviewed citations to be verified and added by a qualified reviewer before publication." }
    ],
    lastReviewed: "2026-07-23",
    reviewStatus: "in_review",
    regulatory: "wholesale_review",
  },
  {
    slug: "semax",
    name: "Semax",
    aliases: ["ACTH(4-10) analogue"],
    category: "Neuro",
    strength: "11mg",
    listPrice: 54,
    variants: [{ size: "11mg", price: 54 }],
    evidence: "insufficient",
    researchStatus: "Investigational — not approved for human use",
    overview:
      "A synthetic peptide derived from a fragment of adrenocorticotropic hormone, studied largely in Russian literature for neuroprotective and cognitive endpoints in animal models.",
    mechanism:
      "Proposed effects on BDNF expression and monoamine systems appear in preclinical research that has not been widely replicated in independent controlled human trials.",
    areasOfStudy: ["Neuroprotection models (preclinical)", "Cognitive endpoints (preclinical)"],
    safety:
      "Human safety is not established. Research material only.",
    faq: [
      { q: "Is this approved for human use?", a: "No. This material is supplied for laboratory research use only by qualified businesses and institutions. It is not a medicine and is not for human or veterinary consumption." },
      { q: "Do you provide purity documentation?", a: "Certificates of analysis are available to approved accounts. Contact our team for batch-specific documentation." }
    ],
    references: [
      { label: "[Editorial review required]", note: "Peer-reviewed citations to be verified and added by a qualified reviewer before publication." }
    ],
    lastReviewed: "2026-07-23",
    reviewStatus: "in_review",
    regulatory: "wholesale_review",
  },
  {
    slug: "sermorelin",
    name: "Sermorelin",
    aliases: ["GRF 1-29"],
    category: "Growth Hormone Secretagogue",
    strength: "5mg",
    listPrice: 48,
    variants: [{ size: "5mg", price: 48 }],
    evidence: "moderate",
    researchStatus: "Previously approved for a specific indication; research supply is NOT an approved medicine",
    overview:
      "A growth-hormone-releasing hormone analogue comprising the first 29 amino acids of GHRH. Historically used diagnostically before withdrawal from the US market for commercial reasons.",
    mechanism:
      "Stimulates pituitary GHRH receptors to promote endogenous growth hormone release — a comparatively well-characterised mechanism.",
    areasOfStudy: ["GH-axis diagnostics (historical clinical)", "GH signalling research"],
    safety:
      "Research-supplied material is not an approved medicine. Not for human use. Research material only.",
    faq: [
      { q: "Is this approved for human use?", a: "No. This material is supplied for laboratory research use only by qualified businesses and institutions. It is not a medicine and is not for human or veterinary consumption." },
      { q: "Do you provide purity documentation?", a: "Certificates of analysis are available to approved accounts. Contact our team for batch-specific documentation." }
    ],
    references: [
      { label: "[Editorial review required]", note: "Peer-reviewed citations to be verified and added by a qualified reviewer before publication." }
    ],
    lastReviewed: "2026-07-23",
    reviewStatus: "in_review",
    regulatory: "wholesale_review",
  },
  {
    slug: "tesamorelin",
    name: "Tesamorelin",
    aliases: ["TH9507"],
    category: "Growth Hormone Secretagogue",
    strength: "10mg",
    listPrice: 69,
    variants: [{ size: "10mg", price: 69 }],
    evidence: "strong",
    researchStatus: "Analogue of an approved drug substance — research supply is NOT an approved medicine",
    overview:
      "A stabilised GHRH analogue. The reference molecule completed controlled clinical trials and is the active ingredient of an FDA-approved prescription product for a specific, narrow indication.",
    mechanism:
      "Binds pituitary GHRH receptors with greater stability than native GHRH, studied for effects on visceral adipose tissue in controlled trials.",
    areasOfStudy: ["Visceral adiposity (clinical trials)", "GH-axis research"],
    safety:
      "Research-supplied material is not an approved medicine, is not manufactured to pharmaceutical standards, and is not interchangeable with prescription products. Not for human use.",
    faq: [
      { q: "Is this approved for human use?", a: "No. This material is supplied for laboratory research use only by qualified businesses and institutions. It is not a medicine and is not for human or veterinary consumption." },
      { q: "Do you provide purity documentation?", a: "Certificates of analysis are available to approved accounts. Contact our team for batch-specific documentation." }
    ],
    references: [
      { label: "[Editorial review required]", note: "Peer-reviewed citations to be verified and added by a qualified reviewer before publication." }
    ],
    lastReviewed: "2026-07-23",
    reviewStatus: "in_review",
    regulatory: "wholesale_review",
  },
  {
    slug: "thymosin-alpha-1",
    name: "Thymosin Alpha-1",
    aliases: ["Ta1", "Thymalfasin"],
    category: "Immune",
    strength: "10mg",
    listPrice: 86,
    variants: [{ size: "10mg", price: 86 }],
    evidence: "moderate",
    researchStatus: "Approved in some countries; NOT approved in the US — research supply is not a medicine",
    overview:
      "A 28-amino-acid peptide derived from prothymosin alpha, studied for immunomodulatory activity. Approved for certain indications in some jurisdictions but not by the FDA.",
    mechanism:
      "Studied for effects on T-cell maturation and innate immune signalling in both preclinical and clinical research settings.",
    areasOfStudy: ["Immune modulation (clinical, non-US)", "Adjuvant research"],
    safety:
      "Not FDA-approved. The FDA has placed this substance on its list of compounds difficult to compound, and it is not permitted in US compounded drug products. Research material only.",
    faq: [
      { q: "Is this approved for human use?", a: "No. This material is supplied for laboratory research use only by qualified businesses and institutions. It is not a medicine and is not for human or veterinary consumption." },
      { q: "Do you provide purity documentation?", a: "Certificates of analysis are available to approved accounts. Contact our team for batch-specific documentation." }
    ],
    references: [
      { label: "[Editorial review required]", note: "Peer-reviewed citations to be verified and added by a qualified reviewer before publication." }
    ],
    lastReviewed: "2026-07-23",
    reviewStatus: "in_review",
    regulatory: "wholesale_review",
  },
  {
    slug: "ahk-cu",
    name: "AHK-Cu",
    aliases: ["Alanine-Histidine-Lysine copper"],
    category: "Skin / Hair",
    strength: "100mg",
    availableSizes: ["100mg"],
    evidence: "limited",
    researchStatus: "Cosmetic and research use",
    overview:
      "A copper-binding tripeptide related to GHK-Cu, studied primarily in topical and cosmetic research contexts for hair and scalp applications.",
    mechanism:
      "Copper-peptide complexes are studied for roles in tissue remodelling signalling. Most published work is topical rather than systemic.",
    areasOfStudy: ["Topical hair/scalp research", "Dermal models (preclinical)"],
    safety:
      "Topical cosmetic use of copper peptides is common; systemic use is not established. Research material only.",
    faq: [
      { q: "Is this approved for human use?", a: "No. This material is supplied for laboratory research use only by qualified businesses and institutions. It is not a medicine and is not for human or veterinary consumption." },
      { q: "How do I get pricing?", a: "Request a quote and our team will respond with current pricing and available sizes for your account." },
      { q: "Do you provide purity documentation?", a: "Certificates of analysis are available to approved accounts. Contact our team for batch-specific documentation." }
    ],
    references: [
      { label: "[Editorial review required]", note: "Peer-reviewed citations to be verified and added by a qualified reviewer before publication." }
    ],
    lastReviewed: "2026-07-23",
    reviewStatus: "in_review",
    regulatory: "inquiry_only",
  },
  {
    slug: "klow-blend",
    name: "KLOW Blend",
    aliases: ["GHK-Cu + TB-500 + BPC-157 + KPV"],
    category: "Recovery",
    strength: "80mg",
    availableSizes: ["80mg"],
    evidence: "limited",
    researchStatus: "Investigational blend — not approved for human use",
    overview:
      "A four-component research preparation combining copper peptide, thymosin fragment, gastric pentadecapeptide, and a tripeptide studied in inflammation models.",
    mechanism:
      "Each constituent has separate proposed mechanisms in preclinical research. Combination effects are not characterised in controlled human studies.",
    areasOfStudy: ["Combination tissue-repair research (preclinical)"],
    safety:
      "Human safety is not established for any constituent individually or in combination. Research material only.",
    faq: [
      { q: "Is this approved for human use?", a: "No. This material is supplied for laboratory research use only by qualified businesses and institutions. It is not a medicine and is not for human or veterinary consumption." },
      { q: "How do I get pricing?", a: "Request a quote and our team will respond with current pricing and available sizes for your account." },
      { q: "Do you provide purity documentation?", a: "Certificates of analysis are available to approved accounts. Contact our team for batch-specific documentation." }
    ],
    references: [
      { label: "[Editorial review required]", note: "Peer-reviewed citations to be verified and added by a qualified reviewer before publication." }
    ],
    lastReviewed: "2026-07-23",
    reviewStatus: "in_review",
    regulatory: "inquiry_only",
  },
  {
    slug: "cjc-1295-with-dac",
    name: "CJC-1295 with DAC",
    aliases: ["CJC-1295 DAC", "Drug Affinity Complex GHRH analogue"],
    category: "Growth Hormone Secretagogue",
    strength: "5mg",
    availableSizes: ["5mg"],
    evidence: "limited",
    researchStatus: "Investigational — not approved for human use",
    overview:
      "A GHRH analogue incorporating a drug affinity complex that substantially extends its half-life compared with the non-DAC form.",
    mechanism:
      "Binds albumin via the DAC moiety, prolonging exposure. Studied in research settings for sustained GH-axis signalling.",
    areasOfStudy: ["GH-axis signalling (preclinical)", "Half-life extension research"],
    safety:
      "Human safety is not established. The extended half-life means exposure cannot be quickly reversed. Research material only.",
    faq: [
      { q: "Is this approved for human use?", a: "No. This material is supplied for laboratory research use only by qualified businesses and institutions. It is not a medicine and is not for human or veterinary consumption." },
      { q: "How do I get pricing?", a: "Request a quote and our team will respond with current pricing and available sizes for your account." },
      { q: "Do you provide purity documentation?", a: "Certificates of analysis are available to approved accounts. Contact our team for batch-specific documentation." }
    ],
    references: [
      { label: "[Editorial review required]", note: "Peer-reviewed citations to be verified and added by a qualified reviewer before publication." }
    ],
    lastReviewed: "2026-07-23",
    reviewStatus: "in_review",
    regulatory: "inquiry_only",
  },
  {
    slug: "snap-8",
    name: "SNAP-8",
    aliases: ["Acetyl Octapeptide-3"],
    category: "Skin / Hair",
    strength: "10mg",
    availableSizes: ["10mg"],
    evidence: "moderate",
    researchStatus: "Cosmetic ingredient",
    overview:
      "An eight-amino-acid peptide used widely as a topical cosmetic ingredient, studied for effects on expression-line appearance.",
    mechanism:
      "Studied for interaction with the SNARE complex involved in vesicle docking, described in cosmetic-science literature.",
    areasOfStudy: ["Topical cosmetic studies"],
    safety:
      "Established as a topical cosmetic ingredient. Injected or systemic use is not studied or supported. Research material only.",
    faq: [
      { q: "Is this approved for human use?", a: "No. This material is supplied for laboratory research use only by qualified businesses and institutions. It is not a medicine and is not for human or veterinary consumption." },
      { q: "How do I get pricing?", a: "Request a quote and our team will respond with current pricing and available sizes for your account." },
      { q: "Do you provide purity documentation?", a: "Certificates of analysis are available to approved accounts. Contact our team for batch-specific documentation." }
    ],
    references: [
      { label: "[Editorial review required]", note: "Peer-reviewed citations to be verified and added by a qualified reviewer before publication." }
    ],
    lastReviewed: "2026-07-23",
    reviewStatus: "in_review",
    regulatory: "inquiry_only",
  },
  {
    slug: "pinealon",
    name: "Pinealon",
    aliases: ["EDR peptide"],
    category: "Longevity",
    strength: "5mg",
    availableSizes: ["5mg", "10mg", "20mg"],
    evidence: "insufficient",
    researchStatus: "Investigational — not approved for human use",
    overview:
      "A synthetic tripeptide studied primarily in Russian-language literature for reported neuroprotective effects in animal models.",
    mechanism:
      "Proposed effects on neuronal gene expression appear in a limited body of research lacking broad independent replication.",
    areasOfStudy: ["Neuroprotection models (preclinical)"],
    safety:
      "Human safety is not established. Evidence base is thin and geographically concentrated. Research material only.",
    faq: [
      { q: "Is this approved for human use?", a: "No. This material is supplied for laboratory research use only by qualified businesses and institutions. It is not a medicine and is not for human or veterinary consumption." },
      { q: "How do I get pricing?", a: "Request a quote and our team will respond with current pricing and available sizes for your account." },
      { q: "Do you provide purity documentation?", a: "Certificates of analysis are available to approved accounts. Contact our team for batch-specific documentation." }
    ],
    references: [
      { label: "[Editorial review required]", note: "Peer-reviewed citations to be verified and added by a qualified reviewer before publication." }
    ],
    lastReviewed: "2026-07-23",
    reviewStatus: "in_review",
    regulatory: "inquiry_only",
  },
  {
    slug: "mt-1",
    name: "MT-1",
    aliases: ["Melanotan 1", "Afamelanotide analogue"],
    category: "Other",
    strength: "10mg",
    availableSizes: ["10mg"],
    evidence: "moderate",
    researchStatus: "Analogue of a compound approved in limited territories — research supply is not a medicine",
    overview:
      "An alpha-MSH analogue studied for effects on melanogenesis. A related molecule holds narrow regulatory approval in some jurisdictions for a rare photosensitivity condition.",
    mechanism:
      "Acts on melanocortin-1 receptors involved in pigmentation signalling.",
    areasOfStudy: ["Melanogenesis research", "Photoprotection (clinical, narrow indication)"],
    safety:
      "Research-supplied material is not an approved medicine. Unapproved melanocortin analogues have been associated in case reports with changes to pigmented lesions; dermatological monitoring concerns are documented. Research material only.",
    faq: [
      { q: "Is this approved for human use?", a: "No. This material is supplied for laboratory research use only by qualified businesses and institutions. It is not a medicine and is not for human or veterinary consumption." },
      { q: "How do I get pricing?", a: "Request a quote and our team will respond with current pricing and available sizes for your account." },
      { q: "Do you provide purity documentation?", a: "Certificates of analysis are available to approved accounts. Contact our team for batch-specific documentation." }
    ],
    references: [
      { label: "[Editorial review required]", note: "Peer-reviewed citations to be verified and added by a qualified reviewer before publication." }
    ],
    lastReviewed: "2026-07-23",
    reviewStatus: "in_review",
    regulatory: "inquiry_only",
  },
  {
    slug: "mt-2",
    name: "MT-2",
    aliases: ["Melanotan 2"],
    category: "Other",
    strength: "10mg",
    availableSizes: ["10mg"],
    evidence: "limited",
    researchStatus: "Investigational — not approved for human use",
    overview:
      "A non-selective melanocortin receptor agonist studied for pigmentation effects. Never approved by any regulator.",
    mechanism:
      "Non-selective agonism across melanocortin receptor subtypes, which accounts for its broader and less predictable effect profile than selective analogues.",
    areasOfStudy: ["Melanogenesis research (preclinical)"],
    safety:
      "Human safety is not established. Non-selective receptor activity and case reports concerning pigmented lesions are documented in the literature. Regulators in several countries have issued consumer warnings. Research material only.",
    faq: [
      { q: "Is this approved for human use?", a: "No. This material is supplied for laboratory research use only by qualified businesses and institutions. It is not a medicine and is not for human or veterinary consumption." },
      { q: "How do I get pricing?", a: "Request a quote and our team will respond with current pricing and available sizes for your account." },
      { q: "Do you provide purity documentation?", a: "Certificates of analysis are available to approved accounts. Contact our team for batch-specific documentation." }
    ],
    references: [
      { label: "[Editorial review required]", note: "Peer-reviewed citations to be verified and added by a qualified reviewer before publication." }
    ],
    lastReviewed: "2026-07-23",
    reviewStatus: "in_review",
    regulatory: "inquiry_only",
  },
  {
    slug: "ace-031",
    name: "ACE-031",
    aliases: ["ActRIIB-Fc", "Activin receptor fusion protein"],
    category: "Growth Factor",
    strength: "1mg",
    availableSizes: ["1mg"],
    evidence: "moderate",
    researchStatus: "Investigational — clinical development discontinued",
    overview:
      "A soluble activin receptor fusion protein studied as a myostatin pathway inhibitor. Clinical development was discontinued after adverse findings in trials.",
    mechanism:
      "Acts as a decoy receptor binding myostatin and related ligands, studied for effects on muscle mass in trial settings.",
    areasOfStudy: ["Myostatin pathway research", "Muscle biology (clinical trials, discontinued)"],
    safety:
      "Clinical development was halted following reports of adverse vascular events including epistaxis and telangiectasia in trial participants. Human use is not supported. Research material only.",
    faq: [
      { q: "Is this approved for human use?", a: "No. This material is supplied for laboratory research use only by qualified businesses and institutions. It is not a medicine and is not for human or veterinary consumption." },
      { q: "How do I get pricing?", a: "Request a quote and our team will respond with current pricing and available sizes for your account." },
      { q: "Do you provide purity documentation?", a: "Certificates of analysis are available to approved accounts. Contact our team for batch-specific documentation." }
    ],
    references: [
      { label: "[Editorial review required]", note: "Peer-reviewed citations to be verified and added by a qualified reviewer before publication." }
    ],
    lastReviewed: "2026-07-23",
    reviewStatus: "in_review",
    regulatory: "inquiry_only",
  },
  {
    slug: "aicar",
    name: "AICAR",
    aliases: ["Acadesine", "AICA ribonucleotide"],
    category: "Metabolic",
    strength: "50mg",
    availableSizes: ["50mg"],
    evidence: "moderate",
    researchStatus: "Investigational — not approved for human use",
    overview:
      "A nucleoside analogue widely used as a laboratory tool compound to study AMP-activated protein kinase signalling.",
    mechanism:
      "Acts as an AMPK activator, making it a standard reagent in metabolic and exercise-physiology research.",
    areasOfStudy: ["AMPK signalling (in vitro and preclinical)", "Metabolic research"],
    safety:
      "Human safety is not established. Prohibited in competitive sport by WADA. Research material only.",
    faq: [
      { q: "Is this approved for human use?", a: "No. This material is supplied for laboratory research use only by qualified businesses and institutions. It is not a medicine and is not for human or veterinary consumption." },
      { q: "How do I get pricing?", a: "Request a quote and our team will respond with current pricing and available sizes for your account." },
      { q: "Do you provide purity documentation?", a: "Certificates of analysis are available to approved accounts. Contact our team for batch-specific documentation." }
    ],
    references: [
      { label: "[Editorial review required]", note: "Peer-reviewed citations to be verified and added by a qualified reviewer before publication." }
    ],
    lastReviewed: "2026-07-23",
    reviewStatus: "in_review",
    regulatory: "inquiry_only",
  },
  {
    slug: "adipotide",
    name: "Adipotide",
    aliases: ["FTPP", "Prohibitin-targeting peptide"],
    category: "Metabolic",
    strength: "2mg",
    availableSizes: ["2mg", "5mg"],
    evidence: "limited",
    researchStatus: "Investigational — not approved for human use",
    overview:
      "A peptidomimetic studied in preclinical models for targeted effects on adipose tissue vasculature.",
    mechanism:
      "Designed to bind prohibitin on adipose vasculature and trigger apoptosis of the supporting blood supply in animal models.",
    areasOfStudy: ["Adipose vasculature (preclinical)"],
    safety:
      "Human safety is not established. Renal toxicity signals were reported in primate studies. Research material only.",
    faq: [
      { q: "Is this approved for human use?", a: "No. This material is supplied for laboratory research use only by qualified businesses and institutions. It is not a medicine and is not for human or veterinary consumption." },
      { q: "How do I get pricing?", a: "Request a quote and our team will respond with current pricing and available sizes for your account." },
      { q: "Do you provide purity documentation?", a: "Certificates of analysis are available to approved accounts. Contact our team for batch-specific documentation." }
    ],
    references: [
      { label: "[Editorial review required]", note: "Peer-reviewed citations to be verified and added by a qualified reviewer before publication." }
    ],
    lastReviewed: "2026-07-23",
    reviewStatus: "in_review",
    regulatory: "inquiry_only",
  },
  {
    slug: "ghrp-2",
    name: "GHRP-2",
    aliases: ["Pralmorelin"],
    category: "Growth Hormone Secretagogue",
    strength: "5mg",
    availableSizes: ["5mg", "10mg", "15mg"],
    evidence: "moderate",
    researchStatus: "Investigational in most territories — not FDA approved",
    overview:
      "A growth-hormone-releasing peptide studied for its GH secretagogue activity; used diagnostically in some jurisdictions.",
    mechanism:
      "Acts on the ghrelin/GH secretagogue receptor to stimulate pituitary GH release.",
    areasOfStudy: ["GH-axis research", "Diagnostic use (non-US)"],
    safety:
      "Not FDA approved. Also stimulates cortisol and prolactin release to a degree, unlike more selective secretagogues. Prohibited in competitive sport. Research material only.",
    faq: [
      { q: "Is this approved for human use?", a: "No. This material is supplied for laboratory research use only by qualified businesses and institutions. It is not a medicine and is not for human or veterinary consumption." },
      { q: "How do I get pricing?", a: "Request a quote and our team will respond with current pricing and available sizes for your account." },
      { q: "Do you provide purity documentation?", a: "Certificates of analysis are available to approved accounts. Contact our team for batch-specific documentation." }
    ],
    references: [
      { label: "[Editorial review required]", note: "Peer-reviewed citations to be verified and added by a qualified reviewer before publication." }
    ],
    lastReviewed: "2026-07-23",
    reviewStatus: "in_review",
    regulatory: "inquiry_only",
  },
  {
    slug: "ghrp-6",
    name: "GHRP-6",
    aliases: [],
    category: "Growth Hormone Secretagogue",
    strength: "5mg",
    availableSizes: ["5mg", "10mg"],
    evidence: "moderate",
    researchStatus: "Investigational — not approved for human use",
    overview:
      "One of the earliest studied growth-hormone-releasing peptides, notable in research for pronounced appetite-stimulating effects alongside GH release.",
    mechanism:
      "Ghrelin receptor agonism driving both GH secretion and appetite signalling in study models.",
    areasOfStudy: ["GH-axis research", "Appetite signalling (preclinical)"],
    safety:
      "Human safety is not established. Prohibited in competitive sport. Research material only.",
    faq: [
      { q: "Is this approved for human use?", a: "No. This material is supplied for laboratory research use only by qualified businesses and institutions. It is not a medicine and is not for human or veterinary consumption." },
      { q: "How do I get pricing?", a: "Request a quote and our team will respond with current pricing and available sizes for your account." },
      { q: "Do you provide purity documentation?", a: "Certificates of analysis are available to approved accounts. Contact our team for batch-specific documentation." }
    ],
    references: [
      { label: "[Editorial review required]", note: "Peer-reviewed citations to be verified and added by a qualified reviewer before publication." }
    ],
    lastReviewed: "2026-07-23",
    reviewStatus: "in_review",
    regulatory: "inquiry_only",
  },
  {
    slug: "hexarelin",
    name: "Hexarelin",
    aliases: ["Examorelin"],
    category: "Growth Hormone Secretagogue",
    strength: "2mg",
    availableSizes: ["2mg", "5mg"],
    evidence: "moderate",
    researchStatus: "Investigational — not approved for human use",
    overview:
      "A synthetic hexapeptide GH secretagogue studied for both pituitary and cardiac-tissue effects in research models.",
    mechanism:
      "Ghrelin receptor agonism; also studied for CD36-mediated activity in cardiac tissue, distinguishing it from other secretagogues.",
    areasOfStudy: ["GH-axis research", "Cardiac tissue models (preclinical)"],
    safety:
      "Human safety is not established. Receptor desensitisation with repeated exposure is described in the literature. Research material only.",
    faq: [
      { q: "Is this approved for human use?", a: "No. This material is supplied for laboratory research use only by qualified businesses and institutions. It is not a medicine and is not for human or veterinary consumption." },
      { q: "How do I get pricing?", a: "Request a quote and our team will respond with current pricing and available sizes for your account." },
      { q: "Do you provide purity documentation?", a: "Certificates of analysis are available to approved accounts. Contact our team for batch-specific documentation." }
    ],
    references: [
      { label: "[Editorial review required]", note: "Peer-reviewed citations to be verified and added by a qualified reviewer before publication." }
    ],
    lastReviewed: "2026-07-23",
    reviewStatus: "in_review",
    regulatory: "inquiry_only",
  },
  {
    slug: "mgf",
    name: "MGF",
    aliases: ["Mechano Growth Factor", "IGF-1Ec splice variant"],
    category: "Growth Factor",
    strength: "2mg",
    availableSizes: ["2mg"],
    evidence: "limited",
    researchStatus: "Investigational — not approved for human use",
    overview:
      "A splice variant of IGF-1 expressed in response to mechanical loading, studied in muscle-repair research models.",
    mechanism:
      "Studied for effects on satellite cell activation and local muscle repair signalling in preclinical work.",
    areasOfStudy: ["Muscle repair (preclinical)", "Satellite cell biology"],
    safety:
      "Human safety is not established. Growth-factor signalling carries theoretical proliferative risk. Prohibited in sport. Research material only.",
    faq: [
      { q: "Is this approved for human use?", a: "No. This material is supplied for laboratory research use only by qualified businesses and institutions. It is not a medicine and is not for human or veterinary consumption." },
      { q: "How do I get pricing?", a: "Request a quote and our team will respond with current pricing and available sizes for your account." },
      { q: "Do you provide purity documentation?", a: "Certificates of analysis are available to approved accounts. Contact our team for batch-specific documentation." }
    ],
    references: [
      { label: "[Editorial review required]", note: "Peer-reviewed citations to be verified and added by a qualified reviewer before publication." }
    ],
    lastReviewed: "2026-07-23",
    reviewStatus: "in_review",
    regulatory: "inquiry_only",
  },
  {
    slug: "peg-mgf",
    name: "PEG-MGF",
    aliases: ["PEGylated Mechano Growth Factor"],
    category: "Growth Factor",
    strength: "2mg",
    availableSizes: ["2mg"],
    evidence: "limited",
    researchStatus: "Investigational — not approved for human use",
    overview:
      "A PEGylated form of mechano growth factor with extended stability compared with the unmodified peptide.",
    mechanism:
      "PEGylation slows clearance, extending exposure in study models relative to native MGF.",
    areasOfStudy: ["Muscle repair (preclinical)"],
    safety:
      "Human safety is not established. Extended half-life means exposure cannot be quickly reversed. Prohibited in sport. Research material only.",
    faq: [
      { q: "Is this approved for human use?", a: "No. This material is supplied for laboratory research use only by qualified businesses and institutions. It is not a medicine and is not for human or veterinary consumption." },
      { q: "How do I get pricing?", a: "Request a quote and our team will respond with current pricing and available sizes for your account." },
      { q: "Do you provide purity documentation?", a: "Certificates of analysis are available to approved accounts. Contact our team for batch-specific documentation." }
    ],
    references: [
      { label: "[Editorial review required]", note: "Peer-reviewed citations to be verified and added by a qualified reviewer before publication." }
    ],
    lastReviewed: "2026-07-23",
    reviewStatus: "in_review",
    regulatory: "inquiry_only",
  },
  {
    slug: "kisspeptin-10",
    name: "KissPeptin-10",
    aliases: ["Metastin fragment", "KP-10"],
    category: "Neuro",
    strength: "5mg",
    availableSizes: ["5mg", "10mg"],
    evidence: "moderate",
    researchStatus: "Investigational — not approved for human use",
    overview:
      "A fragment of the kisspeptin protein studied for its central role in reproductive-axis signalling, including in published human research settings.",
    mechanism:
      "Acts on KISS1R to stimulate GnRH release, positioning it upstream of the reproductive hormone cascade.",
    areasOfStudy: ["Reproductive-axis signalling (clinical research)", "Neuroendocrine studies"],
    safety:
      "Not approved for human use. Effects on the reproductive hormone axis are the subject of ongoing research. Research material only.",
    faq: [
      { q: "Is this approved for human use?", a: "No. This material is supplied for laboratory research use only by qualified businesses and institutions. It is not a medicine and is not for human or veterinary consumption." },
      { q: "How do I get pricing?", a: "Request a quote and our team will respond with current pricing and available sizes for your account." },
      { q: "Do you provide purity documentation?", a: "Certificates of analysis are available to approved accounts. Contact our team for batch-specific documentation." }
    ],
    references: [
      { label: "[Editorial review required]", note: "Peer-reviewed citations to be verified and added by a qualified reviewer before publication." }
    ],
    lastReviewed: "2026-07-23",
    reviewStatus: "in_review",
    regulatory: "inquiry_only",
  },
  {
    slug: "thymalin",
    name: "Thymalin",
    aliases: ["Thymus peptide complex"],
    category: "Immune",
    strength: "10mg",
    availableSizes: ["10mg"],
    evidence: "insufficient",
    researchStatus: "Investigational — not approved for human use",
    overview:
      "A thymus-derived peptide preparation studied largely in Russian-language literature for immunomodulatory endpoints.",
    mechanism:
      "Proposed effects on T-cell maturation appear in a limited body of research lacking broad independent replication.",
    areasOfStudy: ["Immune modulation (preclinical)"],
    safety:
      "Human safety is not established. Evidence base is limited and geographically concentrated. Research material only.",
    faq: [
      { q: "Is this approved for human use?", a: "No. This material is supplied for laboratory research use only by qualified businesses and institutions. It is not a medicine and is not for human or veterinary consumption." },
      { q: "How do I get pricing?", a: "Request a quote and our team will respond with current pricing and available sizes for your account." },
      { q: "Do you provide purity documentation?", a: "Certificates of analysis are available to approved accounts. Contact our team for batch-specific documentation." }
    ],
    references: [
      { label: "[Editorial review required]", note: "Peer-reviewed citations to be verified and added by a qualified reviewer before publication." }
    ],
    lastReviewed: "2026-07-23",
    reviewStatus: "in_review",
    regulatory: "inquiry_only",
  },
  {
    slug: "ara-290",
    name: "ARA-290",
    aliases: ["Cibinetide", "Helix B surface peptide"],
    category: "Neuro",
    strength: "10mg",
    availableSizes: ["10mg"],
    evidence: "moderate",
    researchStatus: "Investigational — completed clinical trials, not approved",
    overview:
      "An 11-amino-acid peptide derived from erythropoietin's helix B, engineered to retain tissue-protective signalling without erythropoietic activity.",
    mechanism:
      "Acts on the innate repair receptor rather than the classical EPO receptor — the design intent being tissue protection without effects on red cell production.",
    areasOfStudy: ["Small-fibre neuropathy (clinical trials)", "Tissue-protective signalling"],
    safety:
      "Investigational. Completed trials for specific indications but is not approved. Research material only.",
    faq: [
      { q: "Is this approved for human use?", a: "No. This material is supplied for laboratory research use only by qualified businesses and institutions. It is not a medicine and is not for human or veterinary consumption." },
      { q: "How do I get pricing?", a: "Request a quote and our team will respond with current pricing and available sizes for your account." },
      { q: "Do you provide purity documentation?", a: "Certificates of analysis are available to approved accounts. Contact our team for batch-specific documentation." }
    ],
    references: [
      { label: "[Editorial review required]", note: "Peer-reviewed citations to be verified and added by a qualified reviewer before publication." }
    ],
    lastReviewed: "2026-07-23",
    reviewStatus: "in_review",
    regulatory: "inquiry_only",
  },
  {
    slug: "vip-peptide",
    name: "VIP Peptide",
    aliases: ["Vasoactive Intestinal Peptide", "Aviptadil analogue"],
    category: "Immune",
    strength: "5mg",
    availableSizes: ["5mg", "10mg"],
    evidence: "moderate",
    researchStatus: "Investigational — not approved for general use",
    overview:
      "A 28-amino-acid neuropeptide with broad signalling roles, studied in pulmonary and immune research contexts.",
    mechanism:
      "Acts on VPAC receptors involved in smooth-muscle relaxation, vasodilation, and immune modulation.",
    areasOfStudy: ["Pulmonary research (clinical trials)", "Immune signalling"],
    safety:
      "Not approved for general use. Systemic vasoactive effects are documented. Research material only.",
    faq: [
      { q: "Is this approved for human use?", a: "No. This material is supplied for laboratory research use only by qualified businesses and institutions. It is not a medicine and is not for human or veterinary consumption." },
      { q: "How do I get pricing?", a: "Request a quote and our team will respond with current pricing and available sizes for your account." },
      { q: "Do you provide purity documentation?", a: "Certificates of analysis are available to approved accounts. Contact our team for batch-specific documentation." }
    ],
    references: [
      { label: "[Editorial review required]", note: "Peer-reviewed citations to be verified and added by a qualified reviewer before publication." }
    ],
    lastReviewed: "2026-07-23",
    reviewStatus: "in_review",
    regulatory: "inquiry_only",
  },
  {
    slug: "dihexa",
    name: "Dihexa",
    aliases: ["N-hexanoic-Tyr-Ile-(6) aminohexanoic amide"],
    category: "Neuro",
    strength: "10mg",
    availableSizes: ["10mg"],
    evidence: "insufficient",
    researchStatus: "Investigational — not approved for human use",
    overview:
      "A small-molecule angiotensin IV analogue studied in preclinical models for effects on synaptic connectivity.",
    mechanism:
      "Studied for hepatocyte growth factor / c-Met pathway activity in neural tissue models.",
    areasOfStudy: ["Synaptogenesis (preclinical)", "Cognitive models (animal)"],
    safety:
      "Human safety is not established. Growth-factor pathway activity carries theoretical proliferative risk. Research material only.",
    faq: [
      { q: "Is this approved for human use?", a: "No. This material is supplied for laboratory research use only by qualified businesses and institutions. It is not a medicine and is not for human or veterinary consumption." },
      { q: "How do I get pricing?", a: "Request a quote and our team will respond with current pricing and available sizes for your account." },
      { q: "Do you provide purity documentation?", a: "Certificates of analysis are available to approved accounts. Contact our team for batch-specific documentation." }
    ],
    references: [
      { label: "[Editorial review required]", note: "Peer-reviewed citations to be verified and added by a qualified reviewer before publication." }
    ],
    lastReviewed: "2026-07-23",
    reviewStatus: "in_review",
    regulatory: "inquiry_only",
  },
  {
    slug: "hgh-fragment-176-191",
    name: "HGH Fragment 176-191",
    aliases: ["AOD-related fragment", "Lipolytic fragment"],
    category: "Metabolic",
    strength: "5mg",
    availableSizes: ["5mg"],
    evidence: "limited",
    researchStatus: "Investigational — not approved for human use",
    overview:
      "A C-terminal fragment of the growth hormone molecule studied in preclinical models for effects on fat metabolism without the growth-signalling activity of intact hGH.",
    mechanism:
      "Studied for lipolytic activity in adipose models; the fragment lacks the receptor-binding regions responsible for hGH's growth effects.",
    areasOfStudy: ["Adipose metabolism (preclinical)"],
    safety:
      "Human safety is not established. Research material only.",
    faq: [
      { q: "Is this approved for human use?", a: "No. This material is supplied for laboratory research use only by qualified businesses and institutions. It is not a medicine and is not for human or veterinary consumption." },
      { q: "How do I get pricing?", a: "Request a quote and our team will respond with current pricing and available sizes for your account." },
      { q: "Do you provide purity documentation?", a: "Certificates of analysis are available to approved accounts. Contact our team for batch-specific documentation." }
    ],
    references: [
      { label: "[Editorial review required]", note: "Peer-reviewed citations to be verified and added by a qualified reviewer before publication." }
    ],
    lastReviewed: "2026-07-23",
    reviewStatus: "in_review",
    regulatory: "inquiry_only",
  },
  {
    slug: "ll-37",
    name: "LL-37",
    aliases: ["Cathelicidin", "hCAP-18 fragment"],
    category: "Immune",
    strength: "5mg",
    availableSizes: ["5mg"],
    evidence: "moderate",
    researchStatus: "Investigational — not approved for human use",
    overview:
      "The only known human cathelicidin antimicrobial peptide, studied extensively in innate immunity and wound research.",
    mechanism:
      "Amphipathic structure disrupts microbial membranes; also studied for immunomodulatory and chemotactic signalling.",
    areasOfStudy: ["Antimicrobial research", "Innate immunity", "Wound models"],
    safety:
      "Human safety as a supplied material is not established. Cytotoxicity at higher concentrations is documented in vitro. Research material only.",
    faq: [
      { q: "Is this approved for human use?", a: "No. This material is supplied for laboratory research use only by qualified businesses and institutions. It is not a medicine and is not for human or veterinary consumption." },
      { q: "How do I get pricing?", a: "Request a quote and our team will respond with current pricing and available sizes for your account." },
      { q: "Do you provide purity documentation?", a: "Certificates of analysis are available to approved accounts. Contact our team for batch-specific documentation." }
    ],
    references: [
      { label: "[Editorial review required]", note: "Peer-reviewed citations to be verified and added by a qualified reviewer before publication." }
    ],
    lastReviewed: "2026-07-23",
    reviewStatus: "in_review",
    regulatory: "inquiry_only",
  },
  {
    slug: "5-amino-1mq",
    name: "5-Amino-1MQ",
    aliases: ["5-amino-1-methylquinolinium"],
    category: "Metabolic",
    strength: "5mg",
    availableSizes: ["5mg", "10mg", "50mg"],
    evidence: "limited",
    researchStatus: "Investigational — not approved for human use",
    overview:
      "A small-molecule NNMT inhibitor studied in preclinical metabolic models. Not a peptide despite frequently appearing in peptide catalogs.",
    mechanism:
      "Inhibits nicotinamide N-methyltransferase, studied for effects on cellular NAD+ salvage and adipocyte metabolism in animal models.",
    areasOfStudy: ["NNMT inhibition (preclinical)", "Adipocyte metabolism"],
    safety:
      "Human safety is not established. Research material only.",
    faq: [
      { q: "Is this approved for human use?", a: "No. This material is supplied for laboratory research use only by qualified businesses and institutions. It is not a medicine and is not for human or veterinary consumption." },
      { q: "How do I get pricing?", a: "Request a quote and our team will respond with current pricing and available sizes for your account." },
      { q: "Do you provide purity documentation?", a: "Certificates of analysis are available to approved accounts. Contact our team for batch-specific documentation." }
    ],
    references: [
      { label: "[Editorial review required]", note: "Peer-reviewed citations to be verified and added by a qualified reviewer before publication." }
    ],
    lastReviewed: "2026-07-23",
    reviewStatus: "in_review",
    regulatory: "inquiry_only",
  },
  {
    slug: "pe-22-28",
    name: "PE-22-28",
    aliases: ["Spadin analogue"],
    category: "Neuro",
    strength: "10mg",
    availableSizes: ["10mg"],
    evidence: "insufficient",
    researchStatus: "Investigational — not approved for human use",
    overview:
      "A spadin-derived peptide studied in animal models for effects on TREK-1 channel activity.",
    mechanism:
      "Studied as a TREK-1 potassium channel blocker in preclinical neurological research.",
    areasOfStudy: ["TREK-1 channel research (preclinical)"],
    safety:
      "Human safety is not established. Evidence is limited to animal models. Research material only.",
    faq: [
      { q: "Is this approved for human use?", a: "No. This material is supplied for laboratory research use only by qualified businesses and institutions. It is not a medicine and is not for human or veterinary consumption." },
      { q: "How do I get pricing?", a: "Request a quote and our team will respond with current pricing and available sizes for your account." },
      { q: "Do you provide purity documentation?", a: "Certificates of analysis are available to approved accounts. Contact our team for batch-specific documentation." }
    ],
    references: [
      { label: "[Editorial review required]", note: "Peer-reviewed citations to be verified and added by a qualified reviewer before publication." }
    ],
    lastReviewed: "2026-07-23",
    reviewStatus: "in_review",
    regulatory: "inquiry_only",
  },
  {
    slug: "bam15",
    name: "BAM15",
    aliases: [],
    category: "Metabolic",
    strength: "10mg",
    availableSizes: ["10mg", "50mg"],
    evidence: "limited",
    researchStatus: "Investigational — not approved for human use",
    overview:
      "A mitochondrial uncoupling agent studied in preclinical metabolic research as a more selective alternative to older uncouplers.",
    mechanism:
      "Uncouples oxidative phosphorylation from ATP synthesis in mitochondria, studied for effects on energy expenditure in animal models.",
    areasOfStudy: ["Mitochondrial uncoupling (preclinical)", "Metabolic research"],
    safety:
      "Human safety is not established. Mitochondrial uncouplers as a class carry serious toxicity concerns — the related compound DNP has caused fatalities. Research material only.",
    faq: [
      { q: "Is this approved for human use?", a: "No. This material is supplied for laboratory research use only by qualified businesses and institutions. It is not a medicine and is not for human or veterinary consumption." },
      { q: "How do I get pricing?", a: "Request a quote and our team will respond with current pricing and available sizes for your account." },
      { q: "Do you provide purity documentation?", a: "Certificates of analysis are available to approved accounts. Contact our team for batch-specific documentation." }
    ],
    references: [
      { label: "[Editorial review required]", note: "Peer-reviewed citations to be verified and added by a qualified reviewer before publication." }
    ],
    lastReviewed: "2026-07-23",
    reviewStatus: "in_review",
    regulatory: "inquiry_only",
  },
  {
    slug: "pnc-27",
    name: "PNC-27",
    aliases: ["p53-derived peptide"],
    category: "Other",
    strength: "5mg",
    availableSizes: ["5mg", "10mg"],
    evidence: "limited",
    researchStatus: "Investigational — not approved for human use",
    overview:
      "A peptide derived from a p53 domain fused to a membrane-penetrating sequence, studied in cancer cell-line research.",
    mechanism:
      "Studied for selective membrane disruption of cells overexpressing HDM-2 in in-vitro cancer models.",
    areasOfStudy: ["Cancer cell-line research (in vitro)"],
    safety:
      "Human safety is not established. No controlled human evidence exists. This material must not be represented as a cancer treatment. Research material only.",
    faq: [
      { q: "Is this approved for human use?", a: "No. This material is supplied for laboratory research use only by qualified businesses and institutions. It is not a medicine and is not for human or veterinary consumption." },
      { q: "How do I get pricing?", a: "Request a quote and our team will respond with current pricing and available sizes for your account." },
      { q: "Do you provide purity documentation?", a: "Certificates of analysis are available to approved accounts. Contact our team for batch-specific documentation." }
    ],
    references: [
      { label: "[Editorial review required]", note: "Peer-reviewed citations to be verified and added by a qualified reviewer before publication." }
    ],
    lastReviewed: "2026-07-23",
    reviewStatus: "in_review",
    regulatory: "inquiry_only",
  },
  {
    slug: "foxo4",
    name: "FOXO4",
    aliases: ["FOXO4-DRI", "Senolytic peptide"],
    category: "Longevity",
    strength: "10mg",
    availableSizes: ["10mg"],
    evidence: "limited",
    researchStatus: "Investigational — not approved for human use",
    overview:
      "A retro-inverso peptide studied in preclinical senescence research as a senolytic tool compound.",
    mechanism:
      "Studied for disrupting the FOXO4-p53 interaction in senescent cells, promoting their selective clearance in animal models.",
    areasOfStudy: ["Cellular senescence (preclinical)", "Senolytic research"],
    safety:
      "Human safety is not established. Research material only.",
    faq: [
      { q: "Is this approved for human use?", a: "No. This material is supplied for laboratory research use only by qualified businesses and institutions. It is not a medicine and is not for human or veterinary consumption." },
      { q: "How do I get pricing?", a: "Request a quote and our team will respond with current pricing and available sizes for your account." },
      { q: "Do you provide purity documentation?", a: "Certificates of analysis are available to approved accounts. Contact our team for batch-specific documentation." }
    ],
    references: [
      { label: "[Editorial review required]", note: "Peer-reviewed citations to be verified and added by a qualified reviewer before publication." }
    ],
    lastReviewed: "2026-07-23",
    reviewStatus: "in_review",
    regulatory: "inquiry_only",
  },
  {
    slug: "slu-pp-332",
    name: "SLU-PP-332",
    aliases: [],
    category: "Metabolic",
    strength: "5mg",
    availableSizes: ["5mg"],
    evidence: "limited",
    researchStatus: "Investigational — not approved for human use",
    overview:
      "A small-molecule ERR agonist studied in preclinical models as an exercise-mimetic tool compound.",
    mechanism:
      "Pan-agonist of estrogen-related receptors, studied for effects on oxidative metabolism in animal models.",
    areasOfStudy: ["Exercise-mimetic research (preclinical)", "Mitochondrial biogenesis"],
    safety:
      "Human safety is not established. No human data exists. Research material only.",
    faq: [
      { q: "Is this approved for human use?", a: "No. This material is supplied for laboratory research use only by qualified businesses and institutions. It is not a medicine and is not for human or veterinary consumption." },
      { q: "How do I get pricing?", a: "Request a quote and our team will respond with current pricing and available sizes for your account." },
      { q: "Do you provide purity documentation?", a: "Certificates of analysis are available to approved accounts. Contact our team for batch-specific documentation." }
    ],
    references: [
      { label: "[Editorial review required]", note: "Peer-reviewed citations to be verified and added by a qualified reviewer before publication." }
    ],
    lastReviewed: "2026-07-23",
    reviewStatus: "in_review",
    regulatory: "inquiry_only",
  },
  {
    slug: "gdf-8",
    name: "GDF-8",
    aliases: ["Myostatin", "Growth Differentiation Factor 8"],
    category: "Growth Factor",
    strength: "1mg",
    availableSizes: ["1mg"],
    evidence: "strong",
    researchStatus: "Research protein — not for human use",
    overview:
      "The myostatin protein itself, a well-characterised negative regulator of muscle mass, supplied as a research protein for laboratory study.",
    mechanism:
      "Signals through ActRIIB to limit muscle growth — one of the best-characterised pathways in muscle biology.",
    areasOfStudy: ["Muscle biology research", "Myostatin pathway (in vitro)"],
    safety:
      "Supplied as a laboratory research protein. Not for human or veterinary administration.",
    faq: [
      { q: "Is this approved for human use?", a: "No. This material is supplied for laboratory research use only by qualified businesses and institutions. It is not a medicine and is not for human or veterinary consumption." },
      { q: "How do I get pricing?", a: "Request a quote and our team will respond with current pricing and available sizes for your account." },
      { q: "Do you provide purity documentation?", a: "Certificates of analysis are available to approved accounts. Contact our team for batch-specific documentation." }
    ],
    references: [
      { label: "[Editorial review required]", note: "Peer-reviewed citations to be verified and added by a qualified reviewer before publication." }
    ],
    lastReviewed: "2026-07-23",
    reviewStatus: "in_review",
    regulatory: "inquiry_only",
  },
  {
    slug: "follistatin",
    name: "Follistatin",
    aliases: ["FST"],
    category: "Growth Factor",
    strength: "1mg",
    availableSizes: ["1mg"],
    evidence: "moderate",
    researchStatus: "Research protein — not for human use",
    overview:
      "A glycoprotein that binds and neutralises members of the TGF-beta family including myostatin, studied in muscle and reproductive biology.",
    mechanism:
      "Binds activin and myostatin, preventing receptor engagement — studied as a natural counter-regulator of the myostatin pathway.",
    areasOfStudy: ["Muscle biology research", "Reproductive endocrinology"],
    safety:
      "Supplied as a laboratory research protein. Systemic manipulation of TGF-beta signalling carries theoretical risk. Not for human use.",
    faq: [
      { q: "Is this approved for human use?", a: "No. This material is supplied for laboratory research use only by qualified businesses and institutions. It is not a medicine and is not for human or veterinary consumption." },
      { q: "How do I get pricing?", a: "Request a quote and our team will respond with current pricing and available sizes for your account." },
      { q: "Do you provide purity documentation?", a: "Certificates of analysis are available to approved accounts. Contact our team for batch-specific documentation." }
    ],
    references: [
      { label: "[Editorial review required]", note: "Peer-reviewed citations to be verified and added by a qualified reviewer before publication." }
    ],
    lastReviewed: "2026-07-23",
    reviewStatus: "in_review",
    regulatory: "inquiry_only",
  },
  {
    slug: "igf-des",
    name: "IGF-DES",
    aliases: ["IGF-1 DES(1-3)"],
    category: "Growth Factor",
    strength: "0.1mg",
    availableSizes: ["0.1mg"],
    evidence: "limited",
    researchStatus: "Investigational — not approved for human use",
    overview:
      "A truncated IGF-1 variant lacking the first three amino acids, giving markedly reduced binding-protein affinity.",
    mechanism:
      "Reduced IGFBP binding results in higher free-fraction activity in study models compared with intact IGF-1.",
    areasOfStudy: ["Cell culture research", "Growth-factor signalling (in vitro)"],
    safety:
      "Human safety is not established. Growth-factor signalling carries theoretical proliferative risk. Prohibited in sport. Research material only.",
    faq: [
      { q: "Is this approved for human use?", a: "No. This material is supplied for laboratory research use only by qualified businesses and institutions. It is not a medicine and is not for human or veterinary consumption." },
      { q: "How do I get pricing?", a: "Request a quote and our team will respond with current pricing and available sizes for your account." },
      { q: "Do you provide purity documentation?", a: "Certificates of analysis are available to approved accounts. Contact our team for batch-specific documentation." }
    ],
    references: [
      { label: "[Editorial review required]", note: "Peer-reviewed citations to be verified and added by a qualified reviewer before publication." }
    ],
    lastReviewed: "2026-07-23",
    reviewStatus: "in_review",
    regulatory: "inquiry_only",
  },
  {
    slug: "survodutide",
    name: "Survodutide",
    aliases: ["BI 456906"],
    category: "Metabolic",
    strength: "10mg",
    availableSizes: ["10mg"],
    evidence: "moderate",
    researchStatus: "Investigational — in clinical trials, not approved",
    overview:
      "A dual GLP-1 and glucagon receptor agonist under clinical investigation for metabolic research. Not approved by any regulator.",
    mechanism:
      "Dual agonism combining GLP-1 satiety signalling with glucagon-receptor effects on energy expenditure, studied in trial settings.",
    areasOfStudy: ["Metabolic regulation (clinical trials)"],
    safety:
      "Investigational. No approved human indication anywhere. Research-supplied material is not a medicine and is not manufactured to pharmaceutical standards. Research material only.",
    faq: [
      { q: "Is this approved for human use?", a: "No. This material is supplied for laboratory research use only by qualified businesses and institutions. It is not a medicine and is not for human or veterinary consumption." },
      { q: "How do I get pricing?", a: "Request a quote and our team will respond with current pricing and available sizes for your account." },
      { q: "Do you provide purity documentation?", a: "Certificates of analysis are available to approved accounts. Contact our team for batch-specific documentation." }
    ],
    references: [
      { label: "[Editorial review required]", note: "Peer-reviewed citations to be verified and added by a qualified reviewer before publication." }
    ],
    lastReviewed: "2026-07-23",
    reviewStatus: "in_review",
    regulatory: "inquiry_only",
  },
  {
    slug: "mazdutide",
    name: "Mazdutide",
    aliases: ["IBI362", "LY3305677"],
    category: "Metabolic",
    strength: "5mg",
    availableSizes: ["5mg", "10mg"],
    evidence: "moderate",
    researchStatus: "Investigational — in clinical trials, not approved",
    overview:
      "A GLP-1 and glucagon receptor dual agonist based on oxyntomodulin, under clinical investigation primarily in Asian markets.",
    mechanism:
      "Dual receptor agonism studied for combined effects on satiety signalling and energy expenditure.",
    areasOfStudy: ["Metabolic regulation (clinical trials)"],
    safety:
      "Investigational. Not approved by the FDA. Research-supplied material is not a medicine. Research material only.",
    faq: [
      { q: "Is this approved for human use?", a: "No. This material is supplied for laboratory research use only by qualified businesses and institutions. It is not a medicine and is not for human or veterinary consumption." },
      { q: "How do I get pricing?", a: "Request a quote and our team will respond with current pricing and available sizes for your account." },
      { q: "Do you provide purity documentation?", a: "Certificates of analysis are available to approved accounts. Contact our team for batch-specific documentation." }
    ],
    references: [
      { label: "[Editorial review required]", note: "Peer-reviewed citations to be verified and added by a qualified reviewer before publication." }
    ],
    lastReviewed: "2026-07-23",
    reviewStatus: "in_review",
    regulatory: "inquiry_only",
  },
  {
    slug: "melatonin",
    name: "Melatonin",
    aliases: ["N-acetyl-5-methoxytryptamine"],
    category: "Longevity",
    strength: "10mg",
    availableSizes: ["10mg"],
    evidence: "strong",
    researchStatus: "Research material — oral supplements are separately regulated",
    overview:
      "A well-characterised hormone central to circadian regulation. Oral forms are widely available as regulated dietary supplements; this is supplied as research material.",
    mechanism:
      "Acts on MT1 and MT2 receptors involved in circadian phase signalling — among the best-characterised mechanisms in this catalog.",
    areasOfStudy: ["Circadian biology", "Chronobiology research"],
    safety:
      "Oral melatonin is well studied as a supplement. Injectable or research-supplied forms are not approved and not for human use.",
    faq: [
      { q: "Is this approved for human use?", a: "No. This material is supplied for laboratory research use only by qualified businesses and institutions. It is not a medicine and is not for human or veterinary consumption." },
      { q: "How do I get pricing?", a: "Request a quote and our team will respond with current pricing and available sizes for your account." },
      { q: "Do you provide purity documentation?", a: "Certificates of analysis are available to approved accounts. Contact our team for batch-specific documentation." }
    ],
    references: [
      { label: "[Editorial review required]", note: "Peer-reviewed citations to be verified and added by a qualified reviewer before publication." }
    ],
    lastReviewed: "2026-07-23",
    reviewStatus: "in_review",
    regulatory: "inquiry_only",
  },
];

export const PEPTASTIC_FEATURES = [
  { title: "AI Concierge", desc: "Jessie guides patients and staff, answers FAQs, and routes work." },
  { title: "Clinic CRM", desc: "Unified patient records, engagement history, and pipelines." },
  { title: "Scheduling", desc: "Appointments, reminders, and provider calendars." },
  { title: "Memberships", desc: "Recurring plans, perks, and retention tracking." },
  { title: "Inventory", desc: "Stock levels, low-supply alerts, and reorder signals." },
  { title: "Analytics", desc: "Revenue, conversion, and operational KPIs at a glance." },
  { title: "Marketing", desc: "Campaigns, follow-ups, and automated outreach." },
  { title: "Automation", desc: "Workflow suggestions that reduce manual busywork." },
  { title: "Staff Management", desc: "Roles, coverage, cross-training, and knowledge capture." },
  { title: "Reporting", desc: "Executive dashboards and exportable reports." },
];

export const ROLE_CARDS: RoleCard[] = [
  { role: "Owner", blurb: "See the whole business — revenue, coverage, and AI-surfaced opportunities — in one command view." },
  { role: "Provider", blurb: "Spend less time on admin; the assistant preps context and handles follow-ups." },
  { role: "Nurse", blurb: "Fast access to approved workflows and consistent, up-to-date operational guidance." },
  { role: "Front Desk", blurb: "Scheduling, reminders, and answers to common questions, handled with less friction." },
  { role: "Inventory", blurb: "Low-supply alerts and reorder signals so nothing critical runs out." },
  { role: "Billing", blurb: "Cleaner records, fewer errors, and clear status on quotes and invoices." },
  { role: "Executive", blurb: "Board-ready reporting and trends without waiting on manual spreadsheets." },
];

export const INTEGRATIONS = [
  "QuickBooks", "Authorize.net", "Stripe", "Twilio",
  "Google Workspace", "Microsoft 365", "Zoom", "Future APIs",
];