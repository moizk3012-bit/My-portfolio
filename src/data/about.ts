import type { Achievement, Service, Stat, TimelineEntry } from './types';

export const intro = {
  statement:
    'Helping teams turn data and language models into products people actually use. From training the model to shipping it on the web.',
  side: 'The mix of deep learning, generative AI and full-stack engineering puts me where research ideas become working software.',
};

export const aboutText = {
  title: ['Building AI that ships,', 'not just demos'],
  lead: 'I’m Moiz Azad, an AI Engineer at Mergestack. I train models, build retrieval and agent pipelines on top of large language models, and wrap them in products people can actually use.',
  more: 'From a CNN that reads retina scans to WannaModel — my own live AI product — I like owning the whole path: data, model, API and interface.',
};

export const services: Service[] = [
  {
    n: '01',
    title: 'Generative AI',
    text: 'LLM-powered features, retrieval-augmented generation (RAG), agentic workflows with tool-calling, and prompt engineering backed by real evaluation.',
  },
  {
    n: '02',
    title: 'Deep Learning',
    text: 'Computer vision with CNNs, NLP with embeddings, and time-series forecasting — from data pipeline and training to honest model evaluation.',
  },
  {
    n: '03',
    title: 'AI in Production',
    text: 'Turning models into products: Python inference APIs, React and Next.js front-ends, accounts, payments and deployment that real users rely on.',
  },
];

export const experience: TimelineEntry[] = [
  {
    role: 'AI Engineer',
    org: 'Mergestack',
    period: '2025 — Now',
    points: [
      'Build LLM-powered product features and integrate LLM APIs into production web apps.',
      'Design retrieval-augmented generation (RAG) pipelines with vector databases.',
      'Develop agentic workflows with tool-calling, plus prompt engineering and evaluation.',
    ],
  },
];

export const education: TimelineEntry[] = [
  {
    role: 'B.S. Software Engineering',
    org: 'COMSATS University Islamabad, Lahore',
    period: '2021 — 2025',
    points: ['Final-year project: Retinopathy Detection with deep learning.'],
  },
];

// Dummy values (requested) — replace with real ones.
export const stats: Stat[] = [
  { value: 20, suffix: '+', label: 'ML models trained', placeholder: true }, // PLACEHOLDER
  { value: 94, suffix: '%', label: 'Best model accuracy', placeholder: true }, // PLACEHOLDER
  { value: 12, suffix: '+', label: 'AI features shipped', placeholder: true }, // PLACEHOLDER
  { value: 5, label: 'Workshops led', placeholder: true }, // PLACEHOLDER
];

export const certificates: Achievement[] = [
  { title: 'Supervised Machine Learning: Regression & Classification', by: 'DeepLearning.AI · Stanford', year: '2025' },
  { title: 'Advanced Learning Algorithms', by: 'DeepLearning.AI · Stanford', year: '2026' },
];

export const awards: Achievement[] = [
  { title: '2nd Place — Intra-University Hackathon', by: 'COMSATS Lahore', year: '2023' },
  { title: 'React.js & Machine Learning workshops', by: 'Instructor for junior students' },
];

export const stack: string[] = [
  'Python', 'TensorFlow', 'Keras', 'Scikit-learn', 'NumPy', 'Pandas', 'LLM APIs', 'RAG',
  'LangChain', 'Vector DBs', 'Prompt Engineering', 'AI Agents', 'CNNs', 'NLP',
  'React', 'Next.js', 'JavaScript', 'Firebase', 'Git', 'Jupyter',
];
