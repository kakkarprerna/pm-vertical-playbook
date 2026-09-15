-- PM Vertical Playbook: seed data
-- Run after schema.sql. Populates the four verticals, six stages, starter
-- checklist recommendations, vertical + cross-functional resources, and
-- the cross-cutting AI toolkit, all pulled from the spec.

-- 1. Verticals -----------------------------------------------------------

insert into verticals (name, slug, description, accent) values
  ('Conversational AI/Voice Agents', 'conversational-ai', 'Enterprise chatbots and voice agents.', 'conversational'),
  ('API-first Analytics SaaS', 'api-analytics-saas', 'API-first, developer-facing analytics products.', 'api'),
  ('InsurTech', 'insurtech', 'Insurance product, underwriting, and claims technology.', 'insurtech'),
  ('HR Tech/Recruitment', 'hr-tech', 'HR platforms, ATS, and recruitment technology.', 'hrtech');

-- 2. Lifecycle stages ------------------------------------------------------

insert into lifecycle_stages (name, slug, "order", description) values
  ('Discovery', 'discovery', 1, 'Understanding the problem and the user.'),
  ('Definition/Strategy', 'definition', 2, 'Defining success metrics and strategic framing.'),
  ('Build/Spec', 'build', 3, 'PRDs, specs, and prototypes.'),
  ('Launch/GTM', 'launch', 4, 'Rollout planning and go-to-market.'),
  ('Growth/Iteration', 'growth', 5, 'Analytics, feedback loops, and iteration.'),
  ('Sunset/Pivot', 'sunset', 6, 'Deprecation, retirement, and retrospectives.');

-- 3. Vertical-specific resources -------------------------------------------

insert into resource_items (vertical_id, stage_id, title, type, url, source, notes)
select v.id, null, 'Conversation Design Institute — CxD1, CxD2, Agentic Experience Design', 'certification',
  'https://www.conversationdesigninstitute.com/courses/conversation-designer',
  'Conversation Design Institute',
  'Industry-recognised, most directly relevant given Jinn Live background.'
from verticals v where v.slug = 'conversational-ai';

insert into resource_items (vertical_id, stage_id, title, type, url, source, notes)
select v.id, null, 'AI Product Manager Nanodegree', 'course',
  'https://www.udacity.com/course/ai-product-manager-nanodegree--nd088',
  'Udacity', 'Covers conversational AI, NLP proficiency, model bias, GenAI strategy.'
from verticals v where v.slug = 'conversational-ai';

insert into resource_items (vertical_id, stage_id, title, type, url, source, notes)
select v.id, null, 'AI PM Bootcamp & Certification', 'course',
  'https://maven.com/marily-nika/ai-pm-bootcamp',
  'Maven — Dr Marily Nika, with Anthropic''s Constantinos Neo',
  'GenAI features, agentic experiences, evals.'
from verticals v where v.slug = 'conversational-ai';

insert into resource_items (vertical_id, stage_id, title, type, url, source, notes)
select v.id, null, 'API Fundamentals for Product Managers', 'course',
  'https://maven.com/emmanuel/api-pm-fundamentals',
  'Maven — Emmanuel Paraskakis', 'Entry point for non-technical PMs moving into API PM.'
from verticals v where v.slug = 'api-analytics-saas';

insert into resource_items (vertical_id, stage_id, title, type, url, source, notes)
select v.id, null, 'API Product Mastery for Experienced PMs', 'course',
  'https://maven.com/emmanuel/api-pm-mastery',
  'Maven — Emmanuel Paraskakis', 'Governance, versioning, scaling an API portfolio.'
from verticals v where v.slug = 'api-analytics-saas';

insert into resource_items (vertical_id, stage_id, title, type, url, source, notes)
select v.id, null, 'Certified Technical Product Management Program', 'certification',
  'https://productdive.com/technicalproductmanagementprogram/',
  'ProductDive', '7-week program: APIs, systems, prototyping with AI tools.'
from verticals v where v.slug = 'api-analytics-saas';

insert into resource_items (vertical_id, stage_id, title, type, url, source, notes)
select v.id, null, 'Professional InsurTech Certificate', 'certification',
  'https://training.fintech.global/courses/professional-insurtech-certificate',
  'FinTech.Global training arm', 'Most comprehensive, self-paced, 10-20 hours.'
from verticals v where v.slug = 'insurtech';

insert into resource_items (vertical_id, stage_id, title, type, url, source, notes)
select v.id, null, 'Introduction to InsurTech', 'course',
  'https://corporatefinanceinstitute.com/course/intro-to-insurtech/',
  'Corporate Finance Institute', 'Beginner-friendly: pricing, underwriting, claims metrics.'
from verticals v where v.slug = 'insurtech';

insert into resource_items (vertical_id, stage_id, title, type, url, source, notes)
select v.id, null, 'Advanced Certificate in InsurTech', 'certification',
  'https://academy.smu.edu.sg/courses/advanced-certificate-insurtech',
  'SMU Academy', 'More structured, academic grounding.'
from verticals v where v.slug = 'insurtech';

insert into resource_items (vertical_id, stage_id, title, type, url, source, notes)
select v.id, null, 'HR Tech Product Manager Bootcamp', 'course',
  'https://www.udemy.com/course/hr-tech-product-manager-bootcamp-for-hris-hr-techpeople/',
  'Udemy', 'Tool-agnostic across Workday, ServiceNow, ATS, LMS.'
from verticals v where v.slug = 'hr-tech';

insert into resource_items (vertical_id, stage_id, title, type, url, source, notes)
select v.id, null, 'Product Management in Human Resource Management', 'course',
  'https://emeritus.org/blog/product-management-in-hr/',
  'Emeritus', 'AI adoption and user-centric design applied to HR software.'
from verticals v where v.slug = 'hr-tech';

-- 4. Cross-functional resources (vertical_id and stage_id both null) -------

insert into resource_items (vertical_id, stage_id, title, type, url, source, notes) values
  (null, null, 'Claude 101', 'certification', 'https://anthropic.skilljar.com/claude-101', 'Anthropic (free)', 'Start here: core features, best practices, real-world use.'),
  (null, null, 'AI Fluency: Framework & Foundations', 'certification', 'https://anthropic.skilljar.com/ai-fluency-framework-foundations', 'Anthropic (free)', 'Foundational thinking course for collaborating with AI.'),
  (null, null, 'Introduction to Agent Skills', 'certification', 'https://anthropic.skilljar.com/introduction-to-agent-skills', 'Anthropic (free)', 'Build, configure, and share Skills in Claude Code.'),
  (null, null, 'Building with the Claude API', 'course', 'https://anthropic.skilljar.com/claude-with-the-anthropic-api', 'Anthropic (free)', 'Function calling, tool use, streaming, SDKs, production patterns.'),
  (null, null, 'Claude Code in Action', 'course', 'https://anthropic.skilljar.com/claude-code-in-action', 'Anthropic (free)', 'Hands-on, ship-focused integration of Claude Code into your workflow.'),
  (null, null, 'Introduction to Model Context Protocol', 'course', 'https://anthropic.skilljar.com/introduction-to-model-context-protocol', 'Anthropic (free)', 'Build MCP servers and clients from scratch.'),
  (null, null, 'AI Product Management Certification', 'certification', 'https://maven.com/marily-nika/ai-pm-bootcamp', 'Maven — Dr Marily Nika, with Anthropic''s Constantinos Neo', '6 weeks, ship a real AI product. Webby-nominated.'),
  (null, null, 'AI Product Manager Expert Certification', 'certification', 'https://www.pragmaticinstitute.com/product/ai-product-management-expert-certification/', 'Pragmatic Institute', 'AI literacy, hands-on skills, strategic judgement.'),
  (null, null, 'Certified AI Product Manager', 'certification', 'https://www.agile36.com/courses/certified-ai-product-manager', 'Agile36', '2-day intensive, builds a functional prototype during the course.'),
  (null, null, 'Product Management Certification', 'certification', 'https://www.pragmaticinstitute.com/product/product-management-certification/', 'Pragmatic Institute', 'Three courses, built around the Pragmatic Framework.'),
  (null, null, 'Certified Product Manager (CPM)', 'certification', 'https://aipmm.com/cpm', 'AIPMM', 'Long-standing credential covering the full product lifecycle.'),
  (null, null, 'Product Management Foundations Certification', 'certification', 'https://productschool.com/certifications/product-manager-certification', 'Product School', 'Core product development, strategy, and skills.'),
  (null, null, 'SQL for Product Managers', 'course', 'https://www.sqlhabit.com/sql-for-product-managers', 'SQL Habit', 'Scenario-based, built around PM and growth use cases.'),
  (null, null, 'SQL Course for Product Managers', 'course', 'https://gopractice.io/course/sql/', 'GoPractice', 'Simulator-based, retention/LTV/unit economics framed for PMs.'),
  (null, null, 'Intermediate SQL for Marketers and Product Managers', 'course', 'https://www.codecademy.com/learn/sql-marketing', 'Codecademy', 'Real-world applications: funnels, churn, attribution.'),
  (null, null, 'Claude Code for Product Managers Certificate', 'certification', 'https://www.institutepm.com/certificates/claude-code-for-product-managers', 'Institute of AI Product Management', 'Prototype, analyse data, and write PRDs by directing Claude Code, not writing code. Closest match to how you already work.'),
  (null, null, 'AI Prototyping for Product Managers', 'course', 'https://maven.com/tech-for-product/ai-prototyping-for-product-managers', 'Maven — Colin Matthews', '5-week cohort on using current AI tools to build prototypes.'),
  (null, null, 'AI Product Management Certification: Vibe Coding AI Studio & Claude Code Live', 'course', 'https://maven.com/marily-nika/ai-product-management-vibe-coding-certification', 'Maven — Dr Marily Nika & Diego Granados', '4-hour intensive: research to PRD to working prototype in one session.');

-- 5. Cross-cutting AI toolkit ------------------------------------------------

insert into toolkit_entries (name, category, best_for, stage_ids, url)
select 'NotebookLM', 'Research synthesis', 'Synthesising interview transcripts, free',
  array(select id from lifecycle_stages where slug in ('discovery')), 'https://notebooklm.google.com';

insert into toolkit_entries (name, category, best_for, stage_ids, url)
select 'Perplexity', 'Market research', 'Cited market and competitive research',
  array(select id from lifecycle_stages where slug in ('discovery')), 'https://perplexity.ai';

insert into toolkit_entries (name, category, best_for, stage_ids, url)
select 'Dovetail', 'Research synthesis', 'Turning interviews into a shared, searchable asset',
  array(select id from lifecycle_stages where slug in ('discovery')), 'https://dovetail.com';

insert into toolkit_entries (name, category, best_for, stage_ids, url)
select 'Sprig', 'User research', 'AI-powered in-product surveys and feedback',
  array(select id from lifecycle_stages where slug in ('discovery')), 'https://sprig.com';

insert into toolkit_entries (name, category, best_for, stage_ids, url)
select 'Maze', 'Usability testing', 'Prototype testing and research insights',
  array(select id from lifecycle_stages where slug in ('discovery')), 'https://maze.co';

insert into toolkit_entries (name, category, best_for, stage_ids, url)
select 'Claude', 'Strategy, specs, decisions', 'Strategy docs, PRD writing, decision logs, roadmap review',
  array(select id from lifecycle_stages where slug in ('definition','build','sunset')), 'https://claude.ai';

insert into toolkit_entries (name, category, best_for, stage_ids, url)
select 'Miro AI', 'Strategy visualisation', 'Journey mapping and brainstorming',
  array(select id from lifecycle_stages where slug in ('definition')), 'https://miro.com';

insert into toolkit_entries (name, category, best_for, stage_ids, url)
select 'Crayon', 'Competitive intelligence', 'Tracking competitor moves and positioning',
  array(select id from lifecycle_stages where slug in ('definition')), 'https://crayon.co';

insert into toolkit_entries (name, category, best_for, stage_ids, url)
select 'ChatPRD', 'PRD writing', 'Purpose-built PRD drafting co-pilot',
  array(select id from lifecycle_stages where slug in ('build')), 'https://chatprd.ai';

insert into toolkit_entries (name, category, best_for, stage_ids, url)
select 'Notion AI', 'Documentation', 'Meeting summaries, documentation, async collaboration',
  array(select id from lifecycle_stages where slug in ('build','sunset')), 'https://notion.so';

insert into toolkit_entries (name, category, best_for, stage_ids, url)
select 'Claude Code', 'Prototyping', 'Directing autonomous build workflows without writing code yourself',
  array(select id from lifecycle_stages where slug in ('build')), 'https://claude.ai/code';

insert into toolkit_entries (name, category, best_for, stage_ids, url)
select 'Gamma', 'Communication', 'Executive decks and stakeholder updates',
  array(select id from lifecycle_stages where slug in ('launch')), 'https://gamma.app';

insert into toolkit_entries (name, category, best_for, stage_ids, url)
select 'Loom', 'Communication', 'Async video updates for rollout and enablement',
  array(select id from lifecycle_stages where slug in ('launch')), 'https://loom.com';

insert into toolkit_entries (name, category, best_for, stage_ids, url)
select 'Amplitude', 'Product analytics', 'Behavioural analytics and AI-driven insights',
  array(select id from lifecycle_stages where slug in ('growth')), 'https://amplitude.com';

insert into toolkit_entries (name, category, best_for, stage_ids, url)
select 'Mixpanel', 'Product analytics', 'Understanding what users actually do',
  array(select id from lifecycle_stages where slug in ('growth')), 'https://mixpanel.com';

insert into toolkit_entries (name, category, best_for, stage_ids, url)
select 'Productboard', 'Feedback to roadmap', 'Connecting feedback to roadmap decisions',
  array(select id from lifecycle_stages where slug in ('growth')), 'https://productboard.com';

insert into toolkit_entries (name, category, best_for, stage_ids, url)
select 'Hotjar', 'Behavioural insight', 'Watching real user sessions',
  array(select id from lifecycle_stages where slug in ('growth')), 'https://hotjar.com';

-- 6. Starter checklist items -------------------------------------------------
-- Two recommendations per vertical/stage cell (48 total). All are
-- pre-seeded (is_starter_item = true) and fully editable from the app.

-- Conversational AI/Voice Agents
insert into checklist_items (vertical_id, stage_id, title)
select v.id, s.id, x.title
from verticals v, lifecycle_stages s,
  (values
    ('discovery', 'Map user intents and entry points for a conversational flow'),
    ('discovery', 'Run 5 interviews on a current support/service journey to identify automation-worthy tasks'),
    ('definition', 'Define success metrics: containment rate, CSAT, escalation rate'),
    ('definition', 'Complete CxD1 and apply the framework to one flow'),
    ('build', 'Write a PRD for one voice/chat flow, including fallback and escalation paths'),
    ('build', 'Prototype a conversation flow end-to-end using an AI builder'),
    ('launch', 'Define a phased rollout plan: pilot cohort, gradual expansion'),
    ('launch', 'Draft enablement material for support/CX teams'),
    ('growth', 'Set up a weekly containment/escalation dashboard'),
    ('growth', 'Run a root-cause review on the top 5 failure or escalation patterns'),
    ('sunset', 'Document deprecation criteria for a flow or agent version'),
    ('sunset', 'Write a retrospective on what didn''t work and why')
  ) as x(stage_slug, title)
where v.slug = 'conversational-ai' and s.slug = x.stage_slug;

-- API-first Analytics SaaS
insert into checklist_items (vertical_id, stage_id, title)
select v.id, s.id, x.title
from verticals v, lifecycle_stages s,
  (values
    ('discovery', 'Interview 5 developers or integrators about current API pain points'),
    ('discovery', 'Audit a competitor''s API docs and developer experience'),
    ('definition', 'Define an API versioning and deprecation policy'),
    ('definition', 'Complete API Fundamentals for PMs and map it to your product'),
    ('build', 'Write an API PRD covering endpoints, auth model, and rate limits'),
    ('build', 'Draft an OpenAPI spec or contract for one endpoint'),
    ('launch', 'Build a developer onboarding flow: docs, sandbox, quickstart'),
    ('launch', 'Define API adoption and activation metrics'),
    ('growth', 'Set up an API usage analytics dashboard'),
    ('growth', 'Review the top support tickets tied to API friction'),
    ('sunset', 'Draft an API deprecation and migration guide'),
    ('sunset', 'Document a version-sunset communication plan')
  ) as x(stage_slug, title)
where v.slug = 'api-analytics-saas' and s.slug = x.stage_slug;

-- InsurTech
insert into checklist_items (vertical_id, stage_id, title)
select v.id, s.id, x.title
from verticals v, lifecycle_stages s,
  (values
    ('discovery', 'Map the underwriting or claims journey end-to-end for one product line'),
    ('discovery', 'Complete Introduction to InsurTech (CFI)'),
    ('definition', 'Define the regulatory and compliance constraints for your product area'),
    ('definition', 'Complete the Professional InsurTech Certificate'),
    ('build', 'Write a PRD for a claims or underwriting feature, including compliance sign-off steps'),
    ('build', 'Map data requirements against actuarial or underwriting inputs'),
    ('launch', 'Draft a rollout plan that accounts for regulatory approval timelines'),
    ('launch', 'Define agent or broker enablement materials if distribution-dependent'),
    ('growth', 'Set up a loss ratio or combined ratio tracking view relevant to your product'),
    ('growth', 'Review policy or claims drop-off points'),
    ('sunset', 'Document a product or policy discontinuation plan, including regulatory notice requirements'),
    ('sunset', 'Write a retrospective on a discontinued feature or pilot')
  ) as x(stage_slug, title)
where v.slug = 'insurtech' and s.slug = x.stage_slug;

-- HR Tech/Recruitment
insert into checklist_items (vertical_id, stage_id, title)
select v.id, s.id, x.title
from verticals v, lifecycle_stages s,
  (values
    ('discovery', 'Interview 5 recruiters or hiring managers about current workflow gaps'),
    ('discovery', 'Complete the HR Tech Product Manager Bootcamp'),
    ('definition', 'Define success metrics: time-to-hire, quality-of-hire, adoption'),
    ('definition', 'Map integration requirements against common ATS/HRIS platforms'),
    ('build', 'Write a PRD for a recruitment or HR workflow feature'),
    ('build', 'Prototype a candidate- or recruiter-facing flow'),
    ('launch', 'Draft a change-management plan for HR/recruiting team adoption'),
    ('launch', 'Define rollout cohorts by department or region'),
    ('growth', 'Set up an adoption and usage view tied to business outcomes'),
    ('growth', 'Review the top friction points reported by recruiters'),
    ('sunset', 'Document a feature deprecation plan with recruiter/HR communication steps'),
    ('sunset', 'Write a retrospective on a discontinued HR tech pilot')
  ) as x(stage_slug, title)
where v.slug = 'hr-tech' and s.slug = x.stage_slug;

-- AI PM (cross-cutting) — vertical_id is null, so these show up under all
-- four verticals at the matching stage, tagged 'AI PM'.
insert into checklist_items (vertical_id, stage_id, title, tag)
select null, s.id, x.title, 'AI PM'
from lifecycle_stages s,
  (values
    ('discovery', 'Assess model capability boundaries and data quality/availability for the problem space'),
    ('discovery', 'Map user trust and explainability requirements for AI-driven outputs'),
    ('definition', 'Define AI-specific success metrics: accuracy, latency, cost per inference, hallucination rate'),
    ('definition', 'Decide on human-in-the-loop vs. full automation and set failure/fallback guardrails'),
    ('build', 'Write prompt and eval specs alongside the functional spec, including a golden dataset'),
    ('build', 'Define observability requirements: logging inputs/outputs, drift detection'),
    ('launch', 'Plan a phased rollout with kill switches or feature flags for the AI feature'),
    ('launch', 'Prepare user-facing messaging on AI limitations and an error escalation path'),
    ('growth', 'Run a continuous eval/feedback loop and monitor for model drift or vendor updates'),
    ('growth', 'A/B test a prompt or model change and track cost-per-outcome as usage scales'),
    ('sunset', 'Define deprecation criteria for an AI feature or model version'),
    ('sunset', 'Document a model/vendor migration plan and write a retrospective on performance')
  ) as x(stage_slug, title)
where s.slug = x.stage_slug;
