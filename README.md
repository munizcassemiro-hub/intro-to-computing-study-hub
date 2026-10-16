# Intro to Computing Study Hub

A responsive bilingual study tool for a Portuguese-speaking Higher Diploma student studying computing in English in Ireland.

## Run locally

Requires Node.js 20.19+ or 22.12+ (validated on Node.js 24).

```sh
npm ci
npm run dev -- --port 5173
```

If the default npm cache is unavailable in a restricted cloud machine, use `npm ci --cache /tmp/study-hub-npm-cache`.

```sh
npm run build
npm run preview -- --port 4173
```

No backend, credentials or database are required. Fonts use local system fallbacks; the app does not need a font CDN.

## Study workflow

- 12 modules and 209 concept lessons, each with an English definition, Portuguese support, English terms and meaning, a concrete bilingual example, an exam reminder and a scored recall check. Bilingual Mode is the default; English Only is saved separately.
- Dashboard: lesson completion, module progress, accuracy, recent mistakes, due cards and topics needing review. Mastery requires at least five distinct questions with at least 80% latest-answer accuracy; completing reading alone does not establish mastery.
- Flashcards: Again (1 minute), Hard (10 minutes), Good (1 day), Easy (4 days). Missed concepts are prioritised; cards not yet due are excluded from Daily Review. Browse All remains available.
- 264 clearly labelled Generated Practice questions: multiple choice, true/false, fill-in, matching, ordering, diagram recognition, scenario and classification activities, and tea-algorithm builders. Filter by module and format or choose a named activity.
- Nine separately labelled Lecturer Material / Course Activities preserve original prompts, file references and requirements: tea decomposition (at least eight tasks), abstraction, patterns, algorithm design with START/STOP and milk decision, debugging with three errors, Human Robot, reflections, app decomposition and the MediMind board debrief. Written work is saved and self-assessed; structural checks do not claim to grade the meaning of prose.
- OSI ordering, five distinct topology diagrams, topology-diagram matching, hardware identification/matching, RAM/Storage classification, Computational Thinking classification, Debugging, relevant/irrelevant Abstraction classification and cryptography exercises.
- Five-question Quick Quiz and 12-question mixed mock exams, including interactive formats. Exam answers remain hidden until final submission. In-progress exams resume after refresh; submitted results are not counted twice.
- Mistake Notebook groups errors by module and retains incorrect answers, explanations, retries and an archive. Two consecutive correct retries archive a mistake; a subsequent error reopens it. Manual mark/restore is available.
- Searchable bilingual glossary, full protocol names, comparison tables and the five-stage original MediMind / MindCheck case study. Each stage requires the lecturer's two role questions plus four study reflections before revealing the tutor notes and separately identified supplementary reasoning.

## Persistence

Browser localStorage key: `computing-hub` (schema 3). Saves lesson progress, last lesson, recall checks, practice drafts and answer history, card scheduling, mistakes and archive status, language mode, lecturer activity drafts/review status, MediMind role answers/reflections/completed stages, exam drafts/results and exam history. Hash routes support refresh, links and browser back/forward. Open course work has its own review tracking and does not inflate scored quiz accuracy.

Valid identifiers from the first implementation are preserved. Malformed fragments created by its old delimiter parser are no longer counted as concepts or attributed to new content. Corrupt or unavailable browser storage is handled without crashing; a visible warning appears when saving fails. An Export Progress Backup button downloads JSON. Progress is local to that browser/origin; there is no account sync or backup-import UI. Clearing site data removes local progress. An active Quick Quiz session is temporary, while its submitted answers remain saved.

## Content and source boundaries

The 20 uploaded lecturer files are the primary course sources. Their extracted text, source hashes, duplicate mapping and selected original diagrams are preserved in [course-materials](course-materials/README.md). T12 duplicates T11, so content is not counted twice. The Course Materials screen provides provenance without previewing tutor answers. See [the integration report](docs/TEACHER_INTEGRATION.md) for the changes implemented from the [existing teacher-material comparison](docs/TEACHER_MATERIAL_REVIEW.md).

Original lecturer prompts, lecturer example answers, tutor notes and generated support are explicitly distinguished. Answers are not rendered in the activity until a complete attempt passes the relevant structural checks. These materials are not past papers. Existing useful generated practice and the full ACM section were retained; the full ACM Code is a separately identified official supplementary source because it was not among the uploads.

Articles 50, 53 and 55 are taught separately. Dates, proposals, guidelines, exceptions and sanctions quoted in lecturer material are identified as course claims requiring official/current verification, never definitive date-based answer keys. Legal explanations link to official texts but do not establish current legal advice or verify every source claim.

## Validation

```sh
npm test
npm run test:e2e
npm run build
```

`npm test` runs 21 content/state tests covering syllabus coverage, bilingual lesson data, examples, source-text fidelity, stable IDs, question grading, activity validation, mistake lifecycle, mastery, scheduling, legacy-state migration and storage failure handling.

Browser tests use Playwright. With no installed Chromium, run `npx playwright install chromium`. The config uses `/usr/bin/chromium` when available; `CHROMIUM_PATH` overrides it. Downloading a browser may require allowing the Playwright download destination in your environment.

The 20 Chromium browser tests visit all 209 lessons in both modes and test required activities, saved drafts, navigation, flashcards, an interactive-format exam with refresh, mistakes, every original course activity and MediMind role, answer gating, glossary, Quick Quiz, storage errors and layout widths of 320, 390, 768 and 1440 pixels. The lecturer flows were also checked against the production preview. No deployment is required to run these checks.

See [the historical second-pass audit](docs/AUDIT.md) for the original requirement matrix and [the integration report](docs/TEACHER_INTEGRATION.md) for current lecturer alignment and validation evidence.
