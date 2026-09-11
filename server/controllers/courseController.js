import pool from '../config/db.js';

const normalizeCategory = (category) => {
  if (!category || typeof category !== 'string') return '';
  const clean = category.trim().toLowerCase().replace(/[^a-z0-9]/g, '');
  if (clean === 'aiml' || clean === 'aimachinelearning' || clean.includes('machinelearning') || clean === 'ai') {
    return 'AI & Machine Learning';
  }
  if (clean.includes('webdev') || clean.includes('webdevelopment')) return 'Web Development';
  if (clean.includes('cloud') || clean.includes('devops')) return 'Cloud & DevOps';
  if (clean.includes('uiux') || clean.includes('design')) return 'UI/UX Design';
  if (clean.includes('systems') || clean.includes('programming')) return 'Systems & Programming';
  return category.trim();
};

let mockCourses = [
  // Web Development
  {
    id: 'course-1',
    title: 'Full-Stack Modern Web Development Masterclass',
    category: 'Web Development',
    level: 'Intermediate',
    instructor: 'Alex Morgan',
    rating: 4.95,
    reviewsCount: 1420,
    duration: '32.5 Hours',
    price: 3499,
    enrolledCount: 3840,
    thumbnail: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80',
    description: 'Master React 19, Node.js, Express microservices, relational MySQL schemas, and Tailwind CSS v4 design systems.'
  },
  {
    id: 'course-2',
    title: 'React 19 & Next.js Full-Stack Architecture',
    category: 'Web Development',
    level: 'Advanced',
    instructor: 'David K. Vance',
    rating: 4.92,
    reviewsCount: 1180,
    duration: '28.0 Hours',
    price: 3699,
    enrolledCount: 2950,
    thumbnail: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&w=800&q=80',
    description: 'Deep-dive into Server Components, Server Actions, streaming SSR, Edge middleware, and state architecture in Next.js.'
  },
  {
    id: 'course-3',
    title: 'Spring Boot 3 Microservices & Cloud APIs',
    category: 'Web Development',
    level: 'Intermediate',
    instructor: 'Priya Sharma',
    rating: 4.87,
    reviewsCount: 890,
    duration: '30.0 Hours',
    price: 3299,
    enrolledCount: 2410,
    thumbnail: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=800&q=80',
    description: 'Build enterprise-grade REST APIs and event-driven microservices using Spring Boot 3, Spring Cloud, Kafka, and Docker.'
  },
  {
    id: 'course-4',
    title: 'Advanced Node.js & Distributed Backend Engineering',
    category: 'Web Development',
    level: 'Advanced',
    instructor: 'Julian Richter',
    rating: 4.93,
    reviewsCount: 960,
    duration: '26.5 Hours',
    price: 3199,
    enrolledCount: 2180,
    thumbnail: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800&q=80',
    description: 'Master Node.js event loop internals, libuv thread pools, worker threads, Redis caching layers, and clustering.'
  },
  {
    id: 'course-5',
    title: 'TypeScript Production Engineering & Clean Architecture',
    category: 'Web Development',
    level: 'Intermediate',
    instructor: 'Emily Thorne',
    rating: 4.91,
    reviewsCount: 780,
    duration: '22.0 Hours',
    price: 2899,
    enrolledCount: 1890,
    thumbnail: 'https://images.unsplash.com/photo-1516116211227-bbc13c200424?auto=format&fit=crop&w=800&q=80',
    description: 'Write bulletproof, scalable TypeScript code using advanced type gymnastics, conditional types, and Clean Architecture.'
  },

  // AI & Machine Learning
  {
    id: 'course-6',
    title: 'Machine Learning with Python & Scikit-Learn',
    category: 'AI & Machine Learning',
    level: 'Beginner',
    instructor: 'Dr. Elena Rostova',
    rating: 4.88,
    reviewsCount: 1120,
    duration: '26.0 Hours',
    price: 2999,
    enrolledCount: 2680,
    thumbnail: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?auto=format&fit=crop&w=800&q=80',
    description: 'Learn NumPy, Pandas, Scikit-Learn algorithms, exploratory data analysis, regression, classification, and clustering.'
  },
  {
    id: 'course-7',
    title: 'Deep Learning Foundations with PyTorch',
    category: 'AI & Machine Learning',
    level: 'Intermediate',
    instructor: 'Dr. Aaron Chen',
    rating: 4.94,
    reviewsCount: 840,
    duration: '34.0 Hours',
    price: 3599,
    enrolledCount: 1980,
    thumbnail: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=800&q=80',
    description: 'Build neural networks from scratch using PyTorch tensors, backpropagation, CNNs, RNNs, and model optimization on GPUs.'
  },
  {
    id: 'course-8',
    title: 'Generative AI & Production LLM Applications',
    category: 'AI & Machine Learning',
    level: 'Advanced',
    instructor: 'Maya Lin',
    rating: 4.97,
    reviewsCount: 1650,
    duration: '28.5 Hours',
    price: 3999,
    enrolledCount: 3420,
    thumbnail: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=800&q=80',
    description: 'Build enterprise RAG pipelines, autonomous agent workflows, LangChain / LlamaIndex orchestrations, and vector databases.'
  },
  {
    id: 'course-9',
    title: 'Prompt Engineering & Autonomous AI Systems',
    category: 'AI & Machine Learning',
    level: 'Beginner',
    instructor: 'Devraj Patil',
    rating: 4.85,
    reviewsCount: 720,
    duration: '18.0 Hours',
    price: 2499,
    enrolledCount: 1650,
    thumbnail: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80',
    description: 'Master Chain-of-Thought prompting, Tree-of-Thoughts, ReAct frameworks, system prompt hardening, and agent evaluation.'
  },
  {
    id: 'course-10',
    title: 'NLP with Transformers & Hugging Face',
    category: 'AI & Machine Learning',
    level: 'Advanced',
    instructor: 'Dr. Clara Beauchamp',
    rating: 4.91,
    reviewsCount: 650,
    duration: '24.0 Hours',
    price: 3399,
    enrolledCount: 1540,
    thumbnail: 'https://images.unsplash.com/photo-1509228468518-180dd4864904?auto=format&fit=crop&w=800&q=80',
    description: 'Understand Self-Attention, BERT, RoBERTa, T5, causal decoders, tokenizers, LoRA fine-tuning, and model quantization.'
  },

  // Cloud & DevOps
  {
    id: 'course-11',
    title: 'AWS Certified Solutions Architect Masterclass',
    category: 'Cloud & DevOps',
    level: 'Intermediate',
    instructor: 'Marcus Vance',
    rating: 4.93,
    reviewsCount: 1580,
    duration: '35.0 Hours',
    price: 3799,
    enrolledCount: 3910,
    thumbnail: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800&q=80',
    description: 'Design highly available, fault-tolerant, and scalable systems on AWS: VPC, EC2, ECS, Lambda, S3, RDS, DynamoDB, and IAM.'
  },
  {
    id: 'course-12',
    title: 'Docker & Kubernetes Cloud-Native Orchestration',
    category: 'Cloud & DevOps',
    level: 'Advanced',
    instructor: 'David Okafor',
    rating: 4.91,
    reviewsCount: 810,
    duration: '28.0 Hours',
    price: 3899,
    enrolledCount: 1940,
    thumbnail: 'https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?auto=format&fit=crop&w=800&q=80',
    description: 'Containerize microservices with Docker, manage Kubernetes clusters, configure Helm charts, and handle zero-downtime rolling updates.'
  },
  {
    id: 'course-13',
    title: 'CI/CD Automation Pipelines with GitHub Actions',
    category: 'Cloud & DevOps',
    level: 'Intermediate',
    instructor: 'Sarah Jenkins',
    rating: 4.86,
    reviewsCount: 640,
    duration: '19.5 Hours',
    price: 2699,
    enrolledCount: 1720,
    thumbnail: 'https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?auto=format&fit=crop&w=800&q=80',
    description: 'Build enterprise continuous integration and deployment pipelines using GitHub Actions, matrix builds, and artifact caches.'
  },
  {
    id: 'course-14',
    title: 'Terraform Infrastructure as Code (IaC) Masterclass',
    category: 'Cloud & DevOps',
    level: 'Advanced',
    instructor: 'Marcus Vance',
    rating: 4.92,
    reviewsCount: 710,
    duration: '22.0 Hours',
    price: 3199,
    enrolledCount: 1610,
    thumbnail: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=800&q=80',
    description: 'Provision multi-cloud infrastructure with Terraform HCL, modular state backends, remote state locking with DynamoDB, and Terragrunt.'
  },
  {
    id: 'course-15',
    title: 'Cloud-Native Architecture & Microservice Resilience',
    category: 'Cloud & DevOps',
    level: 'Advanced',
    instructor: 'Dr. Elena Rostova & Team',
    rating: 4.96,
    reviewsCount: 590,
    duration: '25.0 Hours',
    price: 3499,
    enrolledCount: 1380,
    thumbnail: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=800&q=80',
    description: 'Master distributed systems design: circuit breakers, bulkheads, rate limiters, distributed tracing with OpenTelemetry, and chaos engineering.'
  },

  // UI/UX Design
  {
    id: 'course-16',
    title: 'Design Systems & Enterprise Product Design',
    category: 'UI/UX Design',
    level: 'Advanced',
    instructor: 'Sophia Chen',
    rating: 4.96,
    reviewsCount: 930,
    duration: '21.0 Hours',
    price: 2799,
    enrolledCount: 2150,
    thumbnail: 'https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?auto=format&fit=crop&w=800&q=80',
    description: 'Architect scalable multi-tier design tokens, accessible component libraries, interactive Figma prototypes, and WCAG AA compliance.'
  },
  {
    id: 'course-17',
    title: 'Figma for Advanced Product Designers',
    category: 'UI/UX Design',
    level: 'Intermediate',
    instructor: 'Liam Hemsworth',
    rating: 4.92,
    reviewsCount: 1040,
    duration: '18.5 Hours',
    price: 2499,
    enrolledCount: 2310,
    thumbnail: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&w=800&q=80',
    description: 'Master Auto-Layout 5.0, component properties, smart animations, interactive variables, and developer handoff.'
  },
  {
    id: 'course-18',
    title: 'UX Research, Usability Testing & Prototyping',
    category: 'UI/UX Design',
    level: 'Beginner',
    instructor: 'Claire Dubois',
    rating: 4.88,
    reviewsCount: 670,
    duration: '19.0 Hours',
    price: 2399,
    enrolledCount: 1510,
    thumbnail: 'https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?auto=format&fit=crop&w=800&q=80',
    description: 'Conduct user interviews, synthesize qualitative and quantitative insights, create journey maps, and measure SUS scores.'
  },
  {
    id: 'course-19',
    title: 'Accessibility-First UI Design & WCAG Compliance',
    category: 'UI/UX Design',
    level: 'Intermediate',
    instructor: 'Sophia Chen',
    rating: 4.95,
    reviewsCount: 520,
    duration: '16.0 Hours',
    price: 2199,
    enrolledCount: 1220,
    thumbnail: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=800&q=80',
    description: 'Design digital products accessible to all users. Master WCAG 2.2 guidelines, color contrast, and keyboard navigation flows.'
  },

  // Systems & Programming
  {
    id: 'course-20',
    title: 'Java Backend Engineering & High-Throughput Systems',
    category: 'Systems & Programming',
    level: 'Intermediate',
    instructor: 'Priya Sharma',
    rating: 4.89,
    reviewsCount: 880,
    duration: '31.0 Hours',
    price: 3399,
    enrolledCount: 2240,
    thumbnail: 'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&w=800&q=80',
    description: 'Master modern Java 21 features: Virtual Threads, pattern matching, records, ZGC tuning, and Netty.'
  },
  {
    id: 'course-21',
    title: 'Data Structures & Algorithms for FAANG Interviews',
    category: 'Systems & Programming',
    level: 'Intermediate',
    instructor: 'Julian Richter',
    rating: 4.97,
    reviewsCount: 2150,
    duration: '40.0 Hours',
    price: 3999,
    enrolledCount: 5120,
    thumbnail: 'https://images.unsplash.com/photo-1504639725590-34d0984388bd?auto=format&fit=crop&w=800&q=80',
    description: 'Conquer technical coding interviews: dynamic programming, graph algorithms, trees, heaps, and monotonic stacks.'
  },
  {
    id: 'course-22',
    title: 'Operating Systems & Systems Programming in C/C++',
    category: 'Systems & Programming',
    level: 'Advanced',
    instructor: 'Dr. Henrik Lindqvist',
    rating: 4.91,
    reviewsCount: 680,
    duration: '32.0 Hours',
    price: 3699,
    enrolledCount: 1420,
    thumbnail: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80',
    description: 'Deep dive into OS kernels: virtual memory, page tables, POSIX system calls, process scheduling, and socket programming.'
  },
  {
    id: 'course-23',
    title: 'Go Programming for High-Concurrency Systems',
    category: 'Systems & Programming',
    level: 'Intermediate',
    instructor: 'Alex Morgan',
    rating: 4.94,
    reviewsCount: 1150,
    duration: '24.5 Hours',
    price: 3199,
    enrolledCount: 2780,
    thumbnail: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=800&q=80',
    description: 'Master Golang: Goroutines, buffered channels, select statements, context package, mutexes, and pprof profiling.'
  },
  {
    id: 'course-24',
    title: 'Distributed Systems & Consensus Protocols',
    category: 'Systems & Programming',
    level: 'Advanced',
    instructor: 'Dr. Henrik Lindqvist',
    rating: 4.98,
    reviewsCount: 790,
    duration: '30.0 Hours',
    price: 3899,
    enrolledCount: 1650,
    thumbnail: 'https://images.unsplash.com/photo-1526374879817-457c0a1459df?auto=format&fit=crop&w=800&q=80',
    description: 'Master the theory and implementation of distributed systems: CAP theorem, Raft consensus protocol, Paxos, and vector clocks.'
  }
];

export const getAllCourses = async (req, res) => {
  const { category, level, search } = req.query;
  let results = [...mockCourses];

  if (category && category !== 'All') {
    const targetCat = normalizeCategory(category).toLowerCase();
    results = results.filter(c => normalizeCategory(c.category).toLowerCase() === targetCat);
  }
  if (level && level !== 'All') {
    results = results.filter(c => c.level.toLowerCase() === level.toLowerCase());
  }
  if (search) {
    results = results.filter(c => 
      c.title.toLowerCase().includes(search.toLowerCase()) || 
      c.instructor.toLowerCase().includes(search.toLowerCase()) ||
      c.description.toLowerCase().includes(search.toLowerCase())
    );
  }

  res.json({ success: true, count: results.length, data: results });
};

export const getCourseById = async (req, res) => {
  const { id } = req.params;
  const course = mockCourses.find(c => c.id === id) || mockCourses[0];
  res.json({ success: true, data: course });
};

export const createCourse = async (req, res) => {
  const { title, category, level, price, description, thumbnail } = req.body;
  if (!title || !category || !price) {
    return res.status(400).json({ success: false, error: 'Title, category, and price required' });
  }
  const newCourse = {
    id: `course-${Date.now()}`,
    title,
    category,
    level: level || 'Beginner',
    instructor: req.user?.name || 'Instructor',
    rating: 5.0,
    reviewsCount: 0,
    duration: '10 Hours',
    price: Number(price),
    enrolledCount: 0,
    thumbnail: thumbnail || 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=800&q=80',
    description
  };
  mockCourses.unshift(newCourse);
  res.status(201).json({ success: true, data: newCourse });
};
