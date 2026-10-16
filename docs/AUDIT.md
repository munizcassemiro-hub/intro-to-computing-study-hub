# Intro to Computing Study Hub — second-pass audit

> Historical audit: this report predates the lecturer-file uploads. See [the subsequent lecturer-material review](TEACHER_MATERIAL_REVIEW.md) for the comparison and [the completed integration report](TEACHER_INTEGRATION.md) for current implementation and validation results.

Scope: the original Intro to Computing request and its corrected audit request. The accidentally sent Maths request was excluded. No publication or deployment was performed.

Reviewed all application source, HTML, styles, package scripts and lockfile, README, repository status and Git history. There were no AGENTS.md files, lecturer documents, authentic assessment questions or additional course repositories under /workspace. The only committed baseline was the initial README; useful work from the preceding implementation was present as local files and preserved.

## A. Requirements already correctly implemented

These were present and functional before this pass, although related omissions below still required changes:

- Seven main destinations: Dashboard, Learn, Flashcards, Practice, Exam Mode, Mistake Notebook and Glossary.
- Twelve module outlines with most requested English definitions and simple Portuguese explanations.
- The four requested Computational Thinking definitions, general Pseudocode explanation and literal-instructions Human Robot concept.
- Introductory GDPR, DSA, AI Act/GPAI and ACM material and the five requested MediMind scenarios.
- Basic MCQ, true/false, fill-in, ordering and dropdown matching controls with practice feedback.
- A mixed exam that withheld feedback during the run and scored submitted answers.
- Automatic mistake creation and retry; localStorage for lesson completion, answers, card ratings and language preference.
- Searchable glossary, responsive layout foundation, default Bilingual Mode and a language switch.

The presence of these features did not establish that all content or all states were correct.

## B. Requirements missing or incomplete and fixed

### Content integrity and learning design

1. **Delimiter corruption:** semicolons inside prose produced 12 false concept entries, missing definitions and misleading totals. Replaced runtime delimiter parsing with structured source data. Preserved the complete explanations and valid old concept/question IDs. The previous 181 count represented 169 valid concepts plus 12 fragments.
2. **Missing module-local lessons:** added Algorithm in Module 4, NIC in Module 5 and Algorithm (cryptography) in Module 9. Final count: **172 lessons**.
3. **Superficial examples:** many examples simply repeated definitions or used Portuguese even in English Only. Every lesson now has a distinct concrete English example and Portuguese explanation, a concise big idea, term meaning, reminder and scored recall question.
4. **Bilingual practice:** added Portuguese reasoning throughout practice, review and case explanations while retaining English prompts, definitions and technical keywords. English Only hides generated Portuguese content, including examples and comparison notes; it does not delete a student's own notes.
5. **Comparison material:** explicit tables for RAM/Storage, four cornerstones, Type/Topology, TCP/UDP, symmetric/asymmetric cryptography, three responsibilities and Provider/Deployer.
6. **OSI and topologies:** explicit layer number/function/keywords; five distinct diagrams. Old Bus/Tree renderings were effectively star-like. Every topology has how it works, advantage, disadvantage and practical example in English with Portuguese support.
7. **Course organisation:** Network Types advanced material is a named subsection. ACM is grouped into its four requested sections. Protocol full names are shown explicitly. Official reference links are provided without claiming that generated exercises are authentic course questions.

### Requirement matrix

The term-by-term fixture in `tests/content.test.js` verifies every originally requested concept. The following groups were also reviewed against the original request:

| Requirement group | Coverage and correction | Verification |
| --- | --- | --- |
| Computer Fundamentals | Input / Processing / Storage / Output; seven device types; Hardware/Software; all eleven classifications | Term fixture; lesson render loop |
| Computer Components | All seventeen requested terms; particularly clear RAM/Storage comparison | Term fixture; hardware identification and matching; classification |
| Computational Thinking | Exact four definitions, everyday examples, comparisons and scenario classification | Lesson loop; classify activity, MCQs and matching |
| Algorithms/Pseudocode/Debugging | Sequence, clear instructions, endpoints, INPUT/OUTPUT, IF/THEN, flow diagram, Human Robot; debugging and tea creation | Ordering, fill-in, error identification and builder validation |
| Networking Fundamentals | Network, Node, NIC, MAC/IP, Router/Switch, Ethernet/Wi-Fi, Packet, transmission, routing and Protocol; five communication stages | Term fixture; module detail; networking questions |
| Network Types and Topologies | Scope/layout distinction; PAN/LAN/WLAN/WAN/MAN/VPN; advanced CAN/EPN/DCN/SAN/cluster; five diagrams and tradeoffs | Term fixture; campus scenario; recognition and diagram matching |
| OSI/Security | Seven numbered layers, main functions, English keywords, Portuguese support; access/interception/manipulation/interruption risks | Term fixture; layer-order validation |
| Protocols | IP/TCP/UDP/HTTP/FTP/SMTP, full names, purpose, example, differences | Protocol lesson loop; matching; TCP/UDP questions |
| Cryptography | Plaintext/Ciphertext, Encryption/Decryption, Algorithm/Key, Symmetric/Asymmetric, Public/Private | Table, bilingual examples and classification |
| Legal/Ethical/Professional | Distinctions; GDPR, DSA, codes, whistleblowing, public interest, privacy, confidentiality, bias and breach | Term fixture; scenarios and comparison |
| EU AI Act | Risk categories; Provider/Deployer; GPAI/provider/systemic risk; documentation, training summaries, copyright, security, risk management, oversight and conformity; all six transparency topics | Term fixture; Provider/Deployer, GPAI and deepfake scenarios |
| ACM | Four sections; all seven requested general principles; quality, competence, rules, risk assessment, public understanding, authorised access and secure systems | Term fixture; scenario and matching activities |
| MediMind | All five issues; four responsibilities/actions per stage; delayed explanations | All five stages, required reflections and persistence tested |
| Lesson structure | BIG IDEA, ENGLISH DEFINITION, Portuguese explanation, KEY ENGLISH TERMS, EXAMPLE, REMEMBER THIS, CHECK YOUR UNDERSTANDING | All 172 lessons visited in both modes |
| Flashcards | Every concept; English front, bilingual back; four ratings; missed-card priority | Scheduling tests; all ratings; no-due and Browse All |
| Practice | All seven requested formats plus classifications, diagrams and builder; correct/incorrect result, full answer, why and English keywords; module filtering | Content grading + browser activity tests |
| Exam | Mixed questions, no live answers, score/percentage/correct/incorrect, topic performance, weakest topics, full review and mistakes button | Full interactive-format exam + reload + submission idempotence |
| Mistakes | Automatic capture, topic grouping, retry, explanations, mark understood, repeated-correct archive | Incorrect → two correct → archive → restore |
| Glossary | Searchable English definitions and Portuguese explanations; English term always visible | Full-name and Portuguese search; filtering; mode switch |
| Dashboard | Continue, overall/module progress, questions, accuracy, mastery, weak topics, recent mistakes, Daily Review and finite Quick Quiz | Progress/navigation, weak-topic recovery, five-question quiz |
| Responsive/accessibility | Desktop/tablet/phone navigation, readable text, focus, labels, keyboard ordering, skip link, reduced motion and contrast | Browser widths + selected-page accessibility checks |
| Persistence | LocalStorage, migration, drafts, mode, notes, due dates, mistakes, exam session/history | Storage unit tests + reload/browser flow tests |

### Interaction, state and usability defects

- Added named activity selection and format filters; required activities are reachable directly rather than hidden among random definition questions.
- Added real Debugging, relevant/irrelevant Abstraction, RAM/Storage and cryptography classifiers; a simplified motherboard identification diagram; topology-diagram matching; GPAI/deepfake and additional ACM scenarios. Final bank: **225 original study questions**.
- Tea algorithm builder enforces prerequisites while accepting independent valid preparation orders. Fixed the old tea-order question's ambiguity by stating its chosen recipe explicitly.
- Matching/classification feedback and notebook/exam reviews display the complete mapping. Ordering reviews show all steps, not just the first answer.
- Quick Quiz now ends after five questions with a result.
- Flashcard review uses due times and missed-concept priority. Previously future cards remained in the review stream and index changes could skip the intended priority.
- Mastery now needs five distinct questions and ≥80% latest-question accuracy; reading completion alone no longer claims mastery. Correcting a question repairs weak-topic status instead of retaining every historical error forever.
- Added an archive/restore view and corrected recent-mistake ordering.
- Saved exam drafts, progression, final results/history and submission guard; all interactive formats are eligible. Results survive refresh and are counted only once.
- MediMind saves all four reflections per stage, requires an attempt before revealing structured legal/ethical/professional/action reasoning, and states that written reasoning is self-assessed.
- Added safe state normalisation and warnings for corrupt/unavailable storage. Export backup is available. Valid legacy progress stays associated with the same questions; corrupt phantom entries are not assigned to new content.
- Added URL routes and browser back/forward support. Mode switches preserve form drafts. Added keyboard skip link, accessible form labels, menu state and inert offscreen mobile navigation.
- Increased study text and control sizes, kept weak topics/recent mistakes visible on mobile, removed the external font request, and corrected secondary-text contrast.

## C. Features tested

- `npm test`: **11 passing tests** covering syllabus terms, all lesson fields/examples, unique stable IDs, every grading format, mistake lifecycle, mastery/weak-topic recovery, card intervals and priority, legacy normalisation, storage errors and exam selection; including valid and unsafe tea algorithms.
- `npm run test:e2e`: **12 passing Chromium tests**. All 172 lessons were visited in Bilingual Mode and English Only (344 lesson visits). Required activities were submitted incorrectly and correctly. Incomplete input is blocked.
- Browser coverage includes OSI order; five topology recognition diagrams; topology-diagram, hardware and protocol matching; component identification; RAM/Storage; Computational Thinking; algorithm ordering/builder; Debugging; Abstraction relevance; cryptography; ACM; GPAI scenarios.
- Full twelve-module exam with ordering, matching and classification; hidden feedback, mid-exam refresh, final score/topic review, mistakes, result persistence and duplicate-submission protection.
- Four flashcard ratings, no-due state, Browse All; saved checks and completion; mode preference; full-name/Portuguese glossary search; all five MediMind stages; mistake archive/retry/restore; finite Quick Quiz.
- Navigation, browser back and layout checks at **320, 390, 768 and 1440 px**; desktop/mobile screenshots visually inspected.
- A local production preview passed the three browser groups covering required activities, the complete interactive-format exam and responsive layouts.
- Axe WCAG 2 A/AA automated checks reported **zero violations on eight selected rendered views** after contrast corrections: Dashboard, protocol lesson, topology-matching practice, MediMind, Glossary, Flashcards, Exam introduction and Network Types module. This is not a certification of every possible UI state.
- Development server running; production build and preview functional validation performed. This is JavaScript, not TypeScript; no TypeScript source or compiler is present.

## D. Remaining limitations

- No lecturer files or authentic assessment questions were present to verify fidelity to a particular lecturer. Existing useful content was retained and no questions were represented as authentic. The app states this source boundary.
- MediMind accepts written reflections for comparison with model reasoning; it does not automatically grade prose or determine legal compliance. Statutory applicability, exceptions and commencement dates require current course/official sources.
- Progress is local to a browser/origin, with a JSON export. There is no account/cloud sync or backup-import UI; clearing site data loses local data. Storage refusal is reported visibly. Quick Quiz session position is temporary; submitted answers are persisted.
- Chromium desktop/mobile-emulation testing is evidence for those tested conditions, not a claim of exhaustive Safari/Firefox, assistive-technology or real-device certification.
- No publication or deployment was performed.
