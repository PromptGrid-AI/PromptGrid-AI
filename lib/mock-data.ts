export interface Post {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  category: 'prompts' | 'alternatives' | 'fixes';
  categoryLabel: string;
  featured_image: string;
  author: {
    name: string;
    role: string;
    avatar: string;
  };
  created_at: string;
  reading_time: string;
  quick_answer?: {
    summary: string;
    takeaways: string[];
  };
  prompt_to_copy?: string;
  content: string;
}

export const CATEGORIES = [
  { slug: 'prompts', name: 'AI Prompts', label: 'Guides', desc: 'Production-ready system prompts and templates' },
  { slug: 'alternatives', name: 'Free Alternatives', label: 'Tools', desc: 'Open-source and free AI tool comparisons' },
  { slug: 'fixes', name: 'AI Errors & Fixes', label: 'Troubleshooting', desc: 'Troubleshoot API and model hallucination issues' },
];

export const MOCK_POSTS: Post[] = [
  {
    id: '1',
    slug: 'mastering-the-power-of-ai-prompts-and-free-tools',
    title: 'Mastering the Power of AI Prompts & Free Tools',
    excerpt: 'Learn how to streamline prompt engineering workflows with vetted formula templates that elevate generative output quality.',
    category: 'prompts',
    categoryLabel: 'Guides',
    featured_image: '/images/card-1-brain.jpg',
    author: {
      name: 'Author Samer',
      role: 'Prompt Engineer',
      avatar: '/images/author-avatar.jpg',
    },
    created_at: 'Jan 18, 2023',
    reading_time: '3 min read',
    quick_answer: {
      summary: 'Mastering AI prompts relies on strict modular framing: define the Persona, specify precise Output Constraints, supply 1-shot Examples, and lock temperature parameters between 0.2 and 0.7.',
      takeaways: [
        'Use conversational descriptive prose instead of comma-separated keyword stuffing.',
        'Lock character consistency using --cref parameter for generative images.',
        'Always validate API outputs with deterministic JSON schemas.',
      ],
    },
    prompt_to_copy: `Act as a Principal AI Prompt Architect. Craft a production-ready system prompt for an autonomous code reviewer that flags security vulnerabilities in Next.js 15 apps. Format the response strictly in JSON adhering to schema {"issues": [{"file": string, "line": number, "fix": string}]}.`,
    content: `## 1. Understanding Prompt Structure

Modern Large Language Models prioritize semantic context over keyword frequency. Structuring prompts into designated sections ensures deterministic adherence and minimizes hallucination risk across production workflows.

## 2. Style References & Parameters

When engineering visual or text prompts, calibrating parameters like stylize weights and temperature values makes the difference between erratic output and repeatable high-converting assets.

- **Persona Specification:** Define the exact domain expertise and tone.
- **Negative Constraints:** Explicitly list what the model must never produce.
- **Output Schema:** Force strict JSON, Markdown, or tabular layout.`,
  },
  {
    id: '2',
    slug: 'how-to-monitor-ai-prompt-metrics-and-tools',
    title: 'How to Monitor AI Prompt Metrics & Free Tools',
    excerpt: 'Learn how to track token expenditure, latency, and telemetry using modern developer observability toolkits.',
    category: 'alternatives',
    categoryLabel: 'Tools',
    featured_image: '/images/card-2-analytics.jpg',
    author: {
      name: 'Author Samer',
      role: 'AI Operations Lead',
      avatar: '/images/author-avatar.jpg',
    },
    created_at: 'Jun 18, 2023',
    reading_time: '4 min read',
    quick_answer: {
      summary: 'Observability tools like Helicone and Langfuse help developers monitor latency, cost, and cache hit rates in production AI apps.',
      takeaways: [
        'Instrument edge calls with distributed trace IDs for end-to-end observability.',
        'Cache identical prompt completions with Redis at edge nodes.',
        'Set automated alerts on sudden TPM (Tokens Per Minute) threshold spikes.',
      ],
    },
    prompt_to_copy: `import { observe } from '@helicone/next';
export const POST = observe(async (req) => {
  // Edge runtime telemetry handler
});`,
    content: `## 1. Why Observability Matters

Unmonitored LLM pipelines quickly compound costs and suffer silent failures. Telemetry headers give immediate visibility into latency distribution and prompt token efficiency.

## 2. Recommended Open-Source Stacks

Tracking semantic drift across model iterations prevents silent quality degradation:

- **Langfuse:** Self-hostable telemetry with detailed token usage charts.
- **Helicone:** Proxy-based caching that cuts duplicate prompt API bills by up to 40%.
- **Ollama Local:** Zero-cost local embedding and evaluation tests.`,
  },
  {
    id: '3',
    slug: 'optimizing-content-workflows-with-colocated-ai-tools',
    title: 'Optimizing the Power of AI Prompts & Free Tools',
    excerpt: 'Discover automated programmatic architectures that sync multi-agent generation with instant edge caching.',
    category: 'prompts',
    categoryLabel: 'Guides',
    featured_image: '/images/card-3-dashboard.jpg',
    author: {
      name: 'Author Samer',
      role: 'Pipeline Architect',
      avatar: '/images/author-avatar.jpg',
    },
    created_at: 'Jun 18, 2023',
    reading_time: '5 min read',
    quick_answer: {
      summary: 'Colocating your automation orchestrator with database webhooks prevents payload timeout failures and ensures cache invalidation occurs immediately.',
      takeaways: [
        'Secure incoming webhook endpoints with HMAC SHA-256 signatures.',
        'Use on-demand revalidateTag() instead of full site rebuilds.',
        'Store featured image metadata alongside raw markdown articles.',
      ],
    },
    prompt_to_copy: `curl -X POST https://promptgridai.com/api/revalidate \\
  -H "Authorization: Bearer SECRET_TOKEN" \\
  -d '{"slug": "article-slug", "category": "prompts"}'`,
    content: `## 1. Automating at Scale

Programmatic SEO requires strict consistency between database mutations and edge cache invalidation. Next.js App Router enables sub-second revalidation without full rebuilds.

## 2. Multi-Agent Pipeline Synchronization

When deploying automated generation pipelines with n8n and Supabase, separating the Researcher agent from the Writer and Reviewer agents creates an autonomous quality check loop.

- **Researcher:** Pulls live search queries and Google PAA questions.
- **Writer:** Generates clean markdown adhering to strict SEO word count and subheadings.
- **Reviewer:** Scores readability and triggers automatic retry if score is under 8/10.`,
  },
  {
    id: '4',
    slug: 'how-to-connect-colocated-ai-prompt-tools',
    title: 'How to Connect Colocated AI Prompt Tools',
    excerpt: 'Learn how about prompt analytics and toolchains to appear craft-quality articles and generative output.',
    category: 'alternatives',
    categoryLabel: 'Tools',
    featured_image: '/images/card-4-terminal.jpg',
    author: {
      name: 'Author Samer',
      role: 'Prompt Engineer',
      avatar: '/images/author-avatar.jpg',
    },
    created_at: 'Jun 18, 2023',
    reading_time: '4 min read',
    quick_answer: {
      summary: 'Connecting developer toolchains directly to model APIs removes human copy-paste bottlenecks and stabilizes prompt regression testing.',
      takeaways: [
        'Use CI/CD prompt evaluation suites before pushing new templates.',
        'Version control prompt strings with Git commit tags.',
        'Test prompts against multiple model checkpoints.',
      ],
    },
    prompt_to_copy: `// Test suite for prompt evaluation
describe('Prompt Regression', () => {
  it('should return valid JSON schema', async () => {
    const res = await runPrompt(prompt);
    expect(res.status).toBe(200);
  });
});`,
    content: `## 1. Tooling Integration

Modern prompt engineering requires software engineering discipline: version control, test harnesses, and automated regression checks.

## 2. Eliminating Siloed Workflows

Connecting developer CLI tools directly to OpenAI and Anthropic SDKs reduces cycle time and enforces schema validation before strings reach client apps.`,
  },
  {
    id: '5',
    slug: 'creating-ai-power-of-ai-prompts-and-fixes',
    title: 'Creating AI-Power of AI Prompts Focused',
    excerpt: 'Step-by-step blueprints for building self-correcting prompt workflows and handling edge-case validation.',
    category: 'fixes',
    categoryLabel: 'Troubleshooting',
    featured_image: '/images/card-5-brain2.jpg',
    author: {
      name: 'Author Samer',
      role: 'Research Engineer',
      avatar: '/images/author-avatar.jpg',
    },
    created_at: 'Jun 19, 2023',
    reading_time: '4 min read',
    quick_answer: {
      summary: 'Self-correcting prompts utilize reflection loops where a critic agent reviews intermediate output before final generation.',
      takeaways: [
        'Set reflection loop count to a maximum of 2 iterations to balance speed and accuracy.',
        'Provide explicit rubrics for the critic agent.',
        'Fail gracefully to human review if validation criteria are not met.',
      ],
    },
    prompt_to_copy: `Review the above response against these 3 criteria: 1) Accuracy, 2) Tone, 3) Constraints adherence. If all pass, output APPROVED. Otherwise output list of required corrections.`,
    content: `## 1. Self-Correction Architecture

By splitting generation and validation into separate steps, error rates drop significantly across programmatic content generation tasks.

## 2. Implementing Reflection Loops

When an LLM evaluates its own draft with clear scoring rubrics, it catches missing constraints, formatting bugs, and false assertions before publishing.`,
  },
  {
    id: '6',
    slug: 'mastering-the-power-of-ai-prompts-and-free-tools-guide',
    title: 'Mastering the Power of AI Prompts & Free Tools',
    excerpt: 'Learn how about prompt analysis with tools to elevate output and connect expansive community knowledge.',
    category: 'alternatives',
    categoryLabel: 'Tools',
    featured_image: '/images/card-6-tools.jpg',
    author: {
      name: 'Author Samer',
      role: 'Prompt Engineer',
      avatar: '/images/author-avatar.jpg',
    },
    created_at: 'Jun 18, 2023',
    reading_time: '3 min read',
    quick_answer: {
      summary: 'A curated toolbox of free alternatives allows developers to build production-ready applications with zero subscription overhead.',
      takeaways: [
        'Leverage open-weights models for high-volume background tasks.',
        'Reserve commercial APIs for high-reasoning user-facing endpoints.',
        'Combine local Ollama inference with cloud vector databases.',
      ],
    },
    prompt_to_copy: `ollama run deepseek-r1:8b "Provide a structured breakdown of programmatic SEO architecture using Next.js and Supabase."`,
    content: `## 1. Building the Modern AI Stack

Combining free developer tooling with open models enables scalable workflows without proportional cost scaling.

## 2. Cost Optimization Strategies

Deploying self-hosted quantized models for classification and simple extractions frees up budget for frontier models where reasoning depth is essential.`,
  },
];
