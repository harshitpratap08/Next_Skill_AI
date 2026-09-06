# STAT-SKILL AI

**AI-Powered Official Statistics Skill Intelligence & Adaptive Learning Platform**
_"From Skill Gaps to Workforce Readiness"_

Built for **Smart India Hackathon 2026** — Problem Statement **SIH26101**
Organization: **MoSPI** (Data Informatics & Innovation Division) · Theme: **Smart Education** · Category: **Software**

## Problem Statement

> Develop an AI enabled learning platform that identifies competency gaps, recommends personalized
> training through integration with the iGOT Karmayogi ecosystem, and is capable of generating
> Quizzes and MCQs from uploaded learning materials to strengthen capacity building in India's
> Official Statistical System.

## What this prototype demonstrates

A closed loop:

```
ROLE → COMPETENCY → SKILL GAP → PERSONALIZED LEARNING → ASSESSMENT → EVIDENCE → COMPETENCY UPDATE → NEXT LEARNING ACTION
```

### Core features implemented

- **Demo authentication** with 3 personas (Statistical Officer, Training Manager, Administrator)
- **Dashboard**: competency readiness, skill gaps, learning progress, competency radar chart, learning journey timeline, upcoming training
- **Profile**: editable official profile, persisted locally
- **Competency model**: 4 domains (Statistical, Technical, Digital Governance, Behavioural/Managerial), 25 competencies with current/target/confidence/evidence
- **Competency dependency graph**: interactive Survey Design → Sampling → Data Collection → Data Quality → Official Statistics chain
- **Baseline Assessment wizard**: role → domains → original demo questions → AI analysis → skill-gap report
- **Skill Gap Engine**: severity-filtered gap cards with evidence, prerequisite, recommended action
- **Explainable Recommendation Engine**: scored recommendations with a "Why recommended?" modal (role relevance, gap severity, prerequisite fit, learning history)
- **Learning Path**: visual timeline + iGOT/NSSTA recommendations
- **Course Catalog**: mock iGOT Karmayogi courses + NSSTA/TPAC training programs, searchable
- **Materials upload**: drag-and-drop, simulated multi-stage processing (extraction → concept ID → knowledge map → assessment generation), detected concepts + competency mapping
- **MCQ Generator**: configurable competency/difficulty/count, visual generation pipeline, original demo question bank (not from any copyrighted source)
- **Quiz interface**: progress bar, flagging, previous/next, scoring, strong/weak concept detection
- **Adaptive remediation**: 5-question remediation quiz targeting weak concepts
- **Illustrative competency update**: quiz evidence nudges the competency's current level
- **AI Copilot**: contextual mock chat aware of the user's profile, gaps, and quiz history
- **Progress page**: learning hours, accuracy trend chart, competency current-vs-target chart
- **Admin Analytics**: workforce heatmap, skill gap distribution, emerging skill readiness, department comparison, searchable/filterable workforce directory with drill-down
- **Notifications**, **Reset Demo Data**, **DEMO MODE** indicator, responsive layout

## Tech stack

- **Frontend**: React 18 + TypeScript + Vite + Tailwind CSS
- **Charts**: Recharts
- **Icons**: lucide-react
- **Routing**: react-router-dom
- **Persistence**: browser `localStorage` (see `src/services/storage.ts`) — swap for a real backend/DB without touching UI code
- **AI**: `src/services/aiService.ts` — a provider-agnostic abstraction. Works fully offline with deterministic mock logic. Flip `HAS_EXTERNAL_AI` and implement a real provider call (routed through your own backend — **never** call an LLM API directly from the frontend with an embedded key) to upgrade without rewriting any page/component.

### Design substitution note
The original brief suggested shadcn/ui. This prototype uses hand-built Tailwind components instead (Badge, Modal, ProgressBar, MetricCard, etc. in `src/components/common/`) to keep the project dependency-light and immediately runnable with `npm install` — visually it follows the same card/chip/ring/heatmap/stepper language requested.

## Mock ecosystem connectors — important

`src/services/igotService.ts` and `src/services/nsstaService.ts` are **clearly labelled prototype connectors**. The UI displays "iGOT Karmayogi — Prototype Connector" / "NSSTA / TPAC — Prototype Connector" badges. **No live government API is connected.** Production integration is subject to official API access, authentication and authorization from MoSPI/NSSTA. The connector functions (`getCourses`, `searchCourses`, `enrollCourse`, `getTrainingPrograms`, etc.) are shaped so a real API client can be dropped in later without changing calling code.

## Getting started (local)

```bash
npm install
npm run dev
```

Open the printed local URL (typically `http://localhost:5173`). Click **Demo Login** and pick a persona.

### Build for production

```bash
npm run build
npm run preview   # optional local check of the production build
```

### Deploy to Vercel

1. Push this project to a GitHub repo.
2. Import the repo in Vercel — it auto-detects Vite. Build command `npm run build`, output directory `dist` (Vercel's Vite preset sets this automatically).
3. A `vercel.json` is included with an SPA rewrite rule so client-side routes (e.g. `/dashboard`) work on refresh/direct link.
4. No environment variables are required for the mock/demo build.

## Demo credentials

Use **Demo Login** on the login screen — no password needed:

| Persona | Name |
|---|---|
| Statistical Officer | Arun Kumar |
| Training Manager | Priya Nair |
| Administrator | Rajesh Menon |

The manual Employee ID / Password form is present for visual completeness but is prototype-only and always signs in as the Statistical Officer persona on submit (no real government authentication is implemented).

## Suggested demo flow (matches the SIH storyline)

1. Log in as **Statistical Officer**.
2. **Dashboard** — note the readiness metrics and top skill gaps.
3. **Assessment** — run the baseline wizard; submit to generate a skill-gap report.
4. **Skill Gaps** — filter by severity; open **Learning Path** to see explainable recommendations ("Why recommended?").
5. **Materials** — upload any PDF/DOCX (try naming it `Sampling_Methodology.pdf`) and watch the processing pipeline; view detected concepts.
6. **Quiz** — generate a 10-question quiz on Sampling; complete it.
7. **Quiz results** — review strong/weak concepts; start the 5-question remediation quiz.
8. Return to **Dashboard** / **Skill Gaps** — competency levels have nudged based on quiz evidence.
9. **AI Copilot** — ask "What are my top skill gaps?" or "What should I learn next?".
10. Log out, log back in as **Administrator** — open **Admin Analytics** for the workforce heatmap and directory.

## Architecture

```
src/
  types/            TypeScript data models
  data/             Mock datasets (competencies, courses, training, question bank, workforce)
  services/         aiService, igotService, nsstaService, storage — swappable abstractions
  context/          AppContext — global demo state, backed by localStorage
  components/       layout, common, charts, competency, gaps, learning, materials, quiz, ai
  pages/            One file per route
```

Future production integration would replace:
- `storage.ts` → a real backend + database (PostgreSQL + pgvector suggested for concept/embedding search)
- `igotService.ts` / `nsstaService.ts` → authenticated calls to the real iGOT Karmayogi / NSSTA / TPAC APIs
- `aiService.ts` mock branch → a real LLM call routed through a backend proxy (never expose API keys client-side), plus real document parsing (e.g. `pdf-parse`, `mammoth` for docx) for material analysis

## Security & privacy notes (prototype)

- Demo/prototype authentication only — no real government identity is verified.
- No API secrets are present in frontend code.
- File type is restricted to PDF/PPT/PPTX/DOC/DOCX/TXT on upload.
- A visible notice states: **"Prototype — no real government employee data should be entered."**
- Role-based navigation (Officer / Training Manager / Administrator) demonstrates the RBAC concept; it is not a security boundary in this prototype.

## Known simplifications (for hackathon scope)

- Document parsing is simulated (filename-keyed mock extraction) rather than true PDF/DOCX text extraction — the pipeline UI, stages, and output shape match what real extraction would produce.
- The competency dependency graph is shown for the core Statistical chain (extendable to all 25 competencies the same way).
- Global command palette (Ctrl+K) is stubbed visually in the top bar search box; wiring it to full cross-entity search is a straightforward follow-up.
- Workforce analytics use a seeded-random demo dataset of 48 officials, not real MoSPI headcount data.

## Future integrations required for production

1. Official iGOT Karmayogi API access, auth (SSO/OAuth) and course-enrollment write access.
2. NSSTA/TPAC training-program API or data feed.
3. A backend service + database (replacing localStorage) with real RBAC and audit logging.
4. A real LLM provider (via backend proxy) for material analysis, MCQ generation, and the AI Copilot.
5. Real document parsing (PDF/PPT/DOC/DOCX) and OCR where needed.
6. Government-grade authentication (e.g. Parichay/SSO) replacing the demo login.

---
Prototype for Smart India Hackathon 2026 · Not affiliated with or endorsed by iGOT Karmayogi, NSSTA, or any live MoSPI system.
