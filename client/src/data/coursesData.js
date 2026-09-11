/**
 * Comprehensive Course Catalog for Eduvia LMS
 * 24 Production-Grade Courses across 5 Core Disciplines:
 * - Web Development (5)
 * - AI & Machine Learning (5)
 * - Cloud & DevOps (5)
 * - UI/UX Design (4)
 * - Systems & Programming (5)
 */

export const normalizeCategory = (category) => {
  if (!category || typeof category !== 'string') return '';
  const clean = category.trim().toLowerCase().replace(/[^a-z0-9]/g, '');
  
  if (clean === 'aiml' || clean === 'aimachinelearning' || clean.includes('machinelearning') || clean === 'ai') {
    return 'AI & Machine Learning';
  }
  if (clean.includes('webdev') || clean.includes('webdevelopment') || clean === 'frontend' || clean === 'backend') {
    return 'Web Development';
  }
  if (clean.includes('cloud') || clean.includes('devops') || clean === 'kubernetes' || clean === 'aws') {
    return 'Cloud & DevOps';
  }
  if (clean.includes('uiux') || clean.includes('design') || clean === 'figma') {
    return 'UI/UX Design';
  }
  if (clean.includes('systems') || clean.includes('programming') || clean === 'dsa' || clean === 'os') {
    return 'Systems & Programming';
  }
  return category.trim();
};

export const SAMPLE_COURSES = [
  // ==========================================
  // WEB DEVELOPMENT (5 Courses)
  // ==========================================
  {
    id: 'course-1',
    title: 'Full-Stack Modern Web Development Masterclass',
    category: 'Web Development',
    level: 'Intermediate',
    instructor: 'Alex Morgan',
    instructorTitle: 'Principal Software Architect & Lead Instructor',
    instructorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
    rating: 4.95,
    reviewsCount: 1420,
    duration: '32.5 Hours',
    totalLessons: 38,
    price: 3499,
    enrolledCount: 3840,
    thumbnail: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80',
    description: 'Master modern React 19 architecture, Node.js, Express microservices, relational MySQL schemas, and Tailwind CSS v4 design systems through production-level engineering workflows.',
    learningOutcomes: [
      'Architect robust React 19 single-page applications with concurrent rendering',
      'Build secure Express REST API servers with JWT authentication & role-based middleware',
      'Design normalized MySQL relational database schemas with transactions and indexing',
      'Implement enterprise design systems using Tailwind CSS tokens and atomic components'
    ],
    prerequisites: 'Foundational understanding of JavaScript (ES6+) and basic HTML/CSS.',
    modules: [
      {
        title: 'Module 1: React 19 Architecture & Component Systems',
        lessons: [
          { id: 'l1', title: 'Component Composition & Modern Hooks Architecture', duration: '24 min', videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4', completed: true },
          { id: 'l2', title: 'State Persistence & Context API Patterns', duration: '32 min', videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4', completed: true },
          { id: 'l3', title: 'Optimizing Render Cycles & Performance Profiling', duration: '18 min', videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4', completed: false }
        ]
      },
      {
        title: 'Module 2: RESTful Express Backend & Secure Architecture',
        lessons: [
          { id: 'l4', title: 'Building Scalable Node.js & Express API Routers', duration: '30 min', videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4', completed: false },
          { id: 'l5', title: 'JWT Token Lifecycles, Refresh Tokens & Role Guards', duration: '28 min', videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4', completed: false },
          { id: 'l6', title: 'Database Relational Schemas, Constraints & Foreign Keys', duration: '45 min', videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4', completed: false }
        ]
      },
      {
        title: 'Module 3: Full-Stack Integration & Production Deployment',
        lessons: [
          { id: 'l7', title: 'End-to-End API Interceptors & Error Boundaries', duration: '26 min', videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4', completed: false },
          { id: 'l8', title: 'Vite Production Bundling & Cloud Hosting Setup', duration: '35 min', videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4', completed: false }
        ]
      }
    ],
    quiz: {
      title: 'Full-Stack Development Certification Assessment',
      questions: [
        { q: 'Which hook is recommended for handling side effects and external subscriptions in React 19?', options: ['useEffect', 'useSideEffect', 'useAction', 'useLogic'], correct: 0 },
        { q: 'In Express.js, what does app.use(express.json()) accomplish?', options: ['Parses incoming HTML form submissions', 'Parses incoming application/json request payloads', 'Compresses HTTP response bodies with gzip'], correct: 1 },
        { q: 'What relational database paradigm characterizes MySQL tables with foreign key constraints?', options: ['Document-Oriented Store', 'Relational Database Management System (RDBMS)', 'Graph Key-Value Pair'], correct: 1 },
        { q: 'What is the primary benefit of JWT bearer authorization in stateless APIs?', options: ['Eliminates need for server-side session memory', 'Encrypts the whole database table', 'Avoids HTTPS requirement'], correct: 0 }
      ]
    }
  },
  {
    id: 'course-2',
    title: 'React 19 & Next.js Full-Stack Architecture',
    category: 'Web Development',
    level: 'Advanced',
    instructor: 'David K. Vance',
    instructorTitle: 'Frontend Architect & Core Contributor',
    instructorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
    rating: 4.92,
    reviewsCount: 1180,
    duration: '28.0 Hours',
    totalLessons: 34,
    price: 3699,
    enrolledCount: 2950,
    thumbnail: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&w=800&q=80',
    description: 'Deep-dive into Server Components, Server Actions, streaming SSR, Edge middleware, partial prerendering, and state architecture in Next.js.',
    learningOutcomes: [
      'Master React Server Components (RSC) and client boundary separation',
      'Implement zero-waterfall data fetching with streaming Suspense',
      'Build end-to-end type-safe forms with Server Actions and Zod validation',
      'Deploy high-availability edge applications on modern cloud infrastructure'
    ],
    prerequisites: 'Strong React fundamentals and TypeScript basics.',
    modules: [
      {
        title: 'Module 1: Server Components & Rendering Pipeline',
        lessons: [
          { id: 'l201', title: 'RSC Mental Model & Client Boundaries', duration: '28 min', videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4', completed: false },
          { id: 'l202', title: 'Streaming with Suspense & Loading UI States', duration: '34 min', videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4', completed: false }
        ]
      },
      {
        title: 'Module 2: Server Actions & Data Mutation',
        lessons: [
          { id: 'l203', title: 'Form Submissions & Optimistic Updates', duration: '31 min', videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4', completed: false },
          { id: 'l204', title: 'Cache Revalidation & Tag-Based Invalidation', duration: '27 min', videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4', completed: false }
        ]
      }
    ],
    quiz: {
      title: 'Next.js & React 19 Architectural Assessment',
      questions: [
        { q: 'Where do React Server Components execute?', options: ['Only on the server', 'Only in the browser', 'Both server and client simultaneously'], correct: 0 },
        { q: 'Which directive marks a file as containing interactive client-side React code?', options: ["'use client'", "'use interactive'", "'use dom'"], correct: 0 }
      ]
    }
  },
  {
    id: 'course-3',
    title: 'Spring Boot 3 Microservices & Cloud APIs',
    category: 'Web Development',
    level: 'Intermediate',
    instructor: 'Priya Sharma',
    instructorTitle: 'Enterprise Java Architect & Distributed Systems Engineer',
    instructorAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=150&q=80',
    rating: 4.87,
    reviewsCount: 890,
    duration: '30.0 Hours',
    totalLessons: 36,
    price: 3299,
    enrolledCount: 2410,
    thumbnail: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=800&q=80',
    description: 'Build enterprise-grade REST APIs and event-driven microservices using Spring Boot 3, Spring Cloud, Kafka, Docker, and PostgreSQL.',
    learningOutcomes: [
      'Implement secure RESTful microservices with Spring Security and OAuth2',
      'Integrate Apache Kafka for asynchronous event messaging',
      'Manage distributed transactions with the Saga pattern',
      'Monitor services with OpenTelemetry, Prometheus, and Grafana'
    ],
    prerequisites: 'Core Java programming proficiency and basic SQL knowledge.',
    modules: [
      {
        title: 'Module 1: Spring Boot 3 & JPA Architecture',
        lessons: [
          { id: 'l301', title: 'Spring Dependency Injection & Auto-Configuration', duration: '35 min', videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4', completed: false },
          { id: 'l302', title: 'Spring Data JPA, Hibernate & Flyway Migrations', duration: '40 min', videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4', completed: false }
        ]
      }
    ],
    quiz: {
      title: 'Spring Boot Architecture Assessment',
      questions: [
        { q: 'What is the primary purpose of Spring Cloud Config Server?', options: ['Centralized configuration management across microservices', 'Database indexing', 'Image compression'], correct: 0 }
      ]
    }
  },
  {
    id: 'course-4',
    title: 'Advanced Node.js & Distributed Backend Engineering',
    category: 'Web Development',
    level: 'Advanced',
    instructor: 'Julian Richter',
    instructorTitle: 'High-Performance Node.js Specialist',
    instructorAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80',
    rating: 4.93,
    reviewsCount: 960,
    duration: '26.5 Hours',
    totalLessons: 28,
    price: 3199,
    enrolledCount: 2180,
    thumbnail: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800&q=80',
    description: 'Master Node.js event loop internals, libuv thread pools, worker threads, Redis caching layers, clustering, and asynchronous streaming architecture.',
    learningOutcomes: [
      'Profile memory leaks and CPU bottlenecks using V8 diagnostics tools',
      'Implement multi-process clustering and multi-threaded background workers',
      'Build low-latency pub/sub streaming architectures with Redis and WebSockets',
      'Optimize database connection pools and resilient retry mechanisms'
    ],
    prerequisites: 'Solid experience with JavaScript and basic backend development.',
    modules: [
      {
        title: 'Module 1: V8 & Event Loop Mechanics',
        lessons: [
          { id: 'l401', title: 'Libuv Thread Pools, Microtasks, and Timers', duration: '38 min', videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4', completed: false }
        ]
      }
    ],
    quiz: {
      title: 'Node.js Engineering Assessment',
      questions: [
        { q: 'In Node.js, which phase executes process.nextTick callbacks?', options: ['Immediately after current operation before next phase', 'During poll phase only', 'After timers phase'], correct: 0 }
      ]
    }
  },
  {
    id: 'course-5',
    title: 'TypeScript Production Engineering & Clean Architecture',
    category: 'Web Development',
    level: 'Intermediate',
    instructor: 'Emily Thorne',
    instructorTitle: 'Senior TypeScript Architect',
    instructorAvatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&q=80',
    rating: 4.91,
    reviewsCount: 780,
    duration: '22.0 Hours',
    totalLessons: 26,
    price: 2899,
    enrolledCount: 1890,
    thumbnail: 'https://images.unsplash.com/photo-1516116211227-bbc13c200424?auto=format&fit=crop&w=800&q=80',
    description: 'Write bulletproof, scalable TypeScript code using advanced type gymnastics, conditional types, mapped types, branded types, and Clean Architecture principles.',
    learningOutcomes: [
      'Write complex generics, conditional types, and recursive mapped types',
      'Enforce domain-driven runtime validation using Zod and type guards',
      'Apply Clean Architecture layers (Entities, Use Cases, Adapters) in TypeScript',
      'Set up strict monorepos with Turborepo and enterprise linting pipelines'
    ],
    prerequisites: 'Foundational knowledge of TypeScript syntax.',
    modules: [
      {
        title: 'Module 1: Advanced Type System Mastery',
        lessons: [
          { id: 'l501', title: 'Branded Types, Discriminated Unions & Type Narrowing', duration: '29 min', videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4', completed: false }
        ]
      }
    ],
    quiz: {
      title: 'TypeScript Certification Assessment',
      questions: [
        { q: 'What is the purpose of branded types in TypeScript?', options: ['Prevent accidental interchange of nominally distinct primitives', 'Compile faster', 'Run code on GPU'], correct: 0 }
      ]
    }
  },

  // ==========================================
  // AI & MACHINE LEARNING (5 Courses)
  // ==========================================
  {
    id: 'course-6',
    title: 'Machine Learning with Python & Scikit-Learn',
    category: 'AI & Machine Learning',
    level: 'Beginner',
    instructor: 'Dr. Elena Rostova',
    instructorTitle: 'AI Research Scientist & Quantitative Analyst',
    instructorAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=150&q=80',
    rating: 4.88,
    reviewsCount: 1120,
    duration: '26.0 Hours',
    totalLessons: 30,
    price: 2999,
    enrolledCount: 2680,
    thumbnail: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?auto=format&fit=crop&w=800&q=80',
    description: 'Learn NumPy, Pandas, Scikit-Learn algorithms, exploratory data analysis, feature engineering, regression, classification, and clustering.',
    learningOutcomes: [
      'Clean, analyze, and preprocess real-world tabular datasets with Pandas',
      'Train supervised classification and regression models using Scikit-Learn',
      'Evaluate model performance with cross-validation and ROC-AUC metrics',
      'Deploy inference pipelines with FastAPI and Docker'
    ],
    prerequisites: 'Basic Python programming syntax and algebra fundamentals.',
    modules: [
      {
        title: 'Module 1: Python Data Processing & Exploratory Analysis',
        lessons: [
          { id: 'l601', title: 'NumPy Vectorization & Multi-Dimensional Arrays', duration: '22 min', videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4', completed: false },
          { id: 'l602', title: 'Pandas DataFrames, Missing Values & GroupBy Aggregations', duration: '35 min', videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4', completed: false }
        ]
      }
    ],
    quiz: {
      title: 'Python AI & Data Engineering Assessment',
      questions: [
        { q: 'Which Python library is primarily used for vectorized tabular data manipulation?', options: ['NumPy', 'Pandas', 'Flask', 'Matplotlib'], correct: 1 }
      ]
    }
  },
  {
    id: 'course-7',
    title: 'Deep Learning Foundations with PyTorch',
    category: 'AI & Machine Learning',
    level: 'Intermediate',
    instructor: 'Dr. Aaron Chen',
    instructorTitle: 'Deep Learning Researcher & PyTorch Ambassador',
    instructorAvatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=150&q=80',
    rating: 4.94,
    reviewsCount: 840,
    duration: '34.0 Hours',
    totalLessons: 38,
    price: 3599,
    enrolledCount: 1980,
    thumbnail: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=800&q=80',
    description: 'Build neural networks from scratch using PyTorch tensors, backpropagation, CNNs for computer vision, RNNs/LSTMs, and model optimization on GPUs.',
    learningOutcomes: [
      'Understand autograd mechanisms and custom loss function backpropagation',
      'Train Convolutional Neural Networks (ResNet, EfficientNet) for image classification',
      'Implement transfer learning and fine-tuning strategies',
      'Accelerate training workflows with PyTorch Lightning and mixed precision'
    ],
    prerequisites: 'Python proficiency and multivariate calculus basics.',
    modules: [
      {
        title: 'Module 1: Tensors, Autograd & Multi-Layer Perceptrons',
        lessons: [
          { id: 'l701', title: 'PyTorch Tensors, Computation Graphs & CUDA Devices', duration: '32 min', videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4', completed: false }
        ]
      }
    ],
    quiz: {
      title: 'PyTorch Foundations Assessment',
      questions: [
        { q: 'What method computes gradients of all leaf tensors in PyTorch?', options: ['loss.backward()', 'optimizer.step()', 'torch.grad()'], correct: 0 }
      ]
    }
  },
  {
    id: 'course-8',
    title: 'Generative AI & Production LLM Applications',
    category: 'AI & Machine Learning',
    level: 'Advanced',
    instructor: 'Maya Lin',
    instructorTitle: 'Staff AI Systems Architect',
    instructorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
    rating: 4.97,
    reviewsCount: 1650,
    duration: '28.5 Hours',
    totalLessons: 32,
    price: 3999,
    enrolledCount: 3420,
    thumbnail: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=800&q=80',
    description: 'Build enterprise RAG pipelines, autonomous agent workflows, LangChain / LlamaIndex orchestrations, vector databases, and fine-tune open-weights LLMs.',
    learningOutcomes: [
      'Architect robust Retrieval-Augmented Generation (RAG) systems with hybrid search',
      'Implement multi-agent orchestrations with function calling and tool execution',
      'Manage vector embeddings with Qdrant, Pinecone, and pgvector',
      'Evaluate LLM generation quality and prevent hallucinations using Ragas'
    ],
    prerequisites: 'Solid Python knowledge and familiarity with REST APIs.',
    modules: [
      {
        title: 'Module 1: Embeddings, Vector Search & RAG Architecture',
        lessons: [
          { id: 'l801', title: 'Chunking Strategies, Dense Embeddings & Vector Stores', duration: '36 min', videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4', completed: false }
        ]
      }
    ],
    quiz: {
      title: 'Generative AI Engineering Assessment',
      questions: [
        { q: 'What technique retrieves relevant external context to ground LLM responses?', options: ['Retrieval-Augmented Generation (RAG)', 'Data quantization', 'Batch normalization'], correct: 0 }
      ]
    }
  },
  {
    id: 'course-9',
    title: 'Prompt Engineering & Autonomous AI Systems',
    category: 'AI & Machine Learning',
    level: 'Beginner',
    instructor: 'Devraj Patil',
    instructorTitle: 'AI Solutions Engineer',
    instructorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
    rating: 4.85,
    reviewsCount: 720,
    duration: '18.0 Hours',
    totalLessons: 22,
    price: 2499,
    enrolledCount: 1650,
    thumbnail: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80',
    description: 'Master Chain-of-Thought prompting, Tree-of-Thoughts, ReAct frameworks, system prompt hardening, and agent evaluation for production systems.',
    learningOutcomes: [
      'Design reliable structured output schemas with JSON mode and Pydantic',
      'Implement few-shot examples and iterative refinement loops',
      'Protect AI pipelines against prompt injection and jailbreak exploits',
      'Benchmark model performance across diverse cognitive tasks'
    ],
    prerequisites: 'No prior coding experience required.',
    modules: [
      {
        title: 'Module 1: Advanced Prompting Paradigms',
        lessons: [
          { id: 'l901', title: 'Chain-of-Thought & Directional Stimulus Prompting', duration: '25 min', videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4', completed: false }
        ]
      }
    ],
    quiz: {
      title: 'Prompt Engineering Assessment',
      questions: [
        { q: 'What prompting technique encourages step-by-step reasoning?', options: ['Chain-of-Thought (CoT)', 'Zero-shot prompt', 'Greedy decoding'], correct: 0 }
      ]
    }
  },
  {
    id: 'course-10',
    title: 'NLP with Transformers & Hugging Face',
    category: 'AI & Machine Learning',
    level: 'Advanced',
    instructor: 'Dr. Clara Beauchamp',
    instructorTitle: 'NLP Research Director',
    instructorAvatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=150&q=80',
    rating: 4.91,
    reviewsCount: 650,
    duration: '24.0 Hours',
    totalLessons: 28,
    price: 3399,
    enrolledCount: 1540,
    thumbnail: 'https://images.unsplash.com/photo-1509228468518-180dd4864904?auto=format&fit=crop&w=800&q=80',
    description: 'Understand the Self-Attention mechanism, BERT, RoBERTa, T5, causal decoders, tokenizers, parameter-efficient fine-tuning (LoRA, QLoRA), and model quantization.',
    learningOutcomes: [
      'Dissect the Transformer self-attention mathematical formulation',
      'Fine-tune domain-specific models with LoRA using Hugging Face PEFT',
      'Deploy low-latency quantization pipelines with vLLM and TensorRT-LLM',
      'Benchmark classification and summarization accuracy'
    ],
    prerequisites: 'PyTorch experience and solid Python skills.',
    modules: [
      {
        title: 'Module 1: Attention Mechanisms & Transformer Architecture',
        lessons: [
          { id: 'l1001', title: 'Scaled Dot-Product Attention & Multi-Head Self-Attention', duration: '34 min', videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4', completed: false }
        ]
      }
    ],
    quiz: {
      title: 'Transformers & NLP Assessment',
      questions: [
        { q: 'What does LoRA stand for in parameter-efficient fine-tuning?', options: ['Low-Rank Adaptation', 'Logic Randomized Array', 'Linear Output Ratio'], correct: 0 }
      ]
    }
  },

  // ==========================================
  // CLOUD & DEVOPS (5 Courses)
  // ==========================================
  {
    id: 'course-11',
    title: 'AWS Certified Solutions Architect Masterclass',
    category: 'Cloud & DevOps',
    level: 'Intermediate',
    instructor: 'Marcus Vance',
    instructorTitle: 'Principal Cloud Architect & AWS APN Ambassador',
    instructorAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80',
    rating: 4.93,
    reviewsCount: 1580,
    duration: '35.0 Hours',
    totalLessons: 42,
    price: 3799,
    enrolledCount: 3910,
    thumbnail: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800&q=80',
    description: 'Design highly available, fault-tolerant, and scalable systems on AWS. Master VPC, EC2, ECS, Lambda, S3, RDS, DynamoDB, IAM, CloudFront, and Route 53.',
    learningOutcomes: [
      'Design multi-AZ and multi-region secure virtual private clouds (VPC)',
      'Deploy serverless microservices with AWS Lambda and API Gateway',
      'Configure auto-scaling groups and Application Load Balancers',
      'Pass the AWS Certified Solutions Architect Associate exam with confidence'
    ],
    prerequisites: 'Basic understanding of networking and web fundamentals.',
    modules: [
      {
        title: 'Module 1: Core Networking & IAM Security',
        lessons: [
          { id: 'l1101', title: 'VPCs, Subnets, Internet Gateways & Route Tables', duration: '36 min', videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4', completed: false }
        ]
      }
    ],
    quiz: {
      title: 'AWS Solutions Architecture Assessment',
      questions: [
        { q: 'Which AWS service provides low-latency content delivery via a global edge network?', options: ['CloudFront', 'S3 Glacier', 'Direct Connect', 'EFS'], correct: 0 }
      ]
    }
  },
  {
    id: 'course-12',
    title: 'Docker & Kubernetes Cloud-Native Orchestration',
    category: 'Cloud & DevOps',
    level: 'Advanced',
    instructor: 'David Okafor',
    instructorTitle: 'Staff SRE & Kubernetes Certified Administrator',
    instructorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
    rating: 4.91,
    reviewsCount: 810,
    duration: '28.0 Hours',
    totalLessons: 32,
    price: 3899,
    enrolledCount: 1940,
    thumbnail: 'https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?auto=format&fit=crop&w=800&q=80',
    description: 'Containerize microservices with Docker, manage Kubernetes clusters, configure Helm charts, handle zero-downtime rolling updates, and configure ingress controllers.',
    learningOutcomes: [
      'Package enterprise services with multi-stage Docker builds',
      'Deploy and scale resilient workloads in Kubernetes clusters',
      'Manage cluster state with ConfigMaps, Secrets, and Persistent Volumes',
      'Automate package deployments across environments using Helm 3'
    ],
    prerequisites: 'Linux terminal comfort and foundational networking concepts.',
    modules: [
      {
        title: 'Module 1: Docker Containers & Multi-Stage Builds',
        lessons: [
          { id: 'l1201', title: 'Containerization Fundamentals & Dockerfile Optimization', duration: '30 min', videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4', completed: false }
        ]
      }
    ],
    quiz: {
      title: 'DevOps & Cloud Architecture Assessment',
      questions: [
        { q: 'In Kubernetes, what resource manages stateful replication and rolling updates?', options: ['ReplicaSet', 'Deployment', 'ConfigMap', 'Daemon'], correct: 1 }
      ]
    }
  },
  {
    id: 'course-13',
    title: 'CI/CD Automation Pipelines with GitHub Actions',
    category: 'Cloud & DevOps',
    level: 'Intermediate',
    instructor: 'Sarah Jenkins',
    instructorTitle: 'DevOps Lead & Automation Specialist',
    instructorAvatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=150&q=80',
    rating: 4.86,
    reviewsCount: 640,
    duration: '19.5 Hours',
    totalLessons: 24,
    price: 2699,
    enrolledCount: 1720,
    thumbnail: 'https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?auto=format&fit=crop&w=800&q=80',
    description: 'Build enterprise continuous integration and deployment pipelines using GitHub Actions, matrix builds, artifact caches, self-hosted runners, and secret managers.',
    learningOutcomes: [
      'Construct automated test, lint, and security scanning workflows',
      'Implement multi-environment deployment approvals and rollbacks',
      'Optimize build speeds with composite actions and layer caching',
      'Integrate SonarQube, Trivy, and container image signing'
    ],
    prerequisites: 'Familiarity with Git and basic command line.',
    modules: [
      {
        title: 'Module 1: Workflow Triggers, Jobs & Matrix Strategies',
        lessons: [
          { id: 'l1301', title: 'GitHub Actions Syntax, Contexts & Secrets', duration: '28 min', videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4', completed: false }
        ]
      }
    ],
    quiz: {
      title: 'CI/CD Automation Assessment',
      questions: [
        { q: 'Which keyword allows testing across multiple Node.js versions simultaneously?', options: ['matrix', 'strategy-multi', 'parallel-run'], correct: 0 }
      ]
    }
  },
  {
    id: 'course-14',
    title: 'Terraform Infrastructure as Code (IaC) Masterclass',
    category: 'Cloud & DevOps',
    level: 'Advanced',
    instructor: 'Marcus Vance',
    instructorTitle: 'Principal Cloud Architect',
    instructorAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80',
    rating: 4.92,
    reviewsCount: 710,
    duration: '22.0 Hours',
    totalLessons: 26,
    price: 3199,
    enrolledCount: 1610,
    thumbnail: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=800&q=80',
    description: 'Provision multi-cloud infrastructure with Terraform HCL, modular state backends, remote state locking with DynamoDB, Terragrunt, and automated policy testing.',
    learningOutcomes: [
      'Write reusable production Terraform modules with semantic versioning',
      'Manage state drift, remote backends, and state migration operations',
      'Implement drift detection and automated CI/CD terraform plan execution',
      'Enforce security compliance with OPA (Open Policy Agent) and tfsec'
    ],
    prerequisites: 'Basic knowledge of cloud infrastructure (AWS/GCP/Azure).',
    modules: [
      {
        title: 'Module 1: Terraform Core Engine & State Management',
        lessons: [
          { id: 'l1401', title: 'HCL Syntax, Providers, State Files & Locking', duration: '32 min', videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4', completed: false }
        ]
      }
    ],
    quiz: {
      title: 'Terraform IaC Certification Assessment',
      questions: [
        { q: 'What prevents two team members from applying Terraform changes concurrently?', options: ['State Locking (e.g., via DynamoDB)', 'Local Git branch', 'SSH keys'], correct: 0 }
      ]
    }
  },
  {
    id: 'course-15',
    title: 'Cloud-Native Architecture & Microservice Resilience',
    category: 'Cloud & DevOps',
    level: 'Advanced',
    instructor: 'Dr. Elena Rostova & Team',
    instructorTitle: 'Distinguished Systems Engineers',
    instructorAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=150&q=80',
    rating: 4.96,
    reviewsCount: 590,
    duration: '25.0 Hours',
    totalLessons: 28,
    price: 3499,
    enrolledCount: 1380,
    thumbnail: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=800&q=80',
    description: 'Master distributed systems design: circuit breakers, bulkheads, rate limiters, distributed tracing with OpenTelemetry, event sourcing, and chaos engineering.',
    learningOutcomes: [
      'Implement fault tolerance with Envoy proxy and Istio Service Mesh',
      'Design event-driven architectures with CQRS and event sourcing',
      'Trace distributed transactions across dozens of microservices',
      'Execute chaos experiments using Chaos Mesh and LitmusChaos'
    ],
    prerequisites: 'Microservice experience and distributed backend background.',
    modules: [
      {
        title: 'Module 1: Service Meshes & Traffic Management',
        lessons: [
          { id: 'l1501', title: 'Istio Architecture, VirtualServices & Circuit Breaking', duration: '35 min', videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4', completed: false }
        ]
      }
    ],
    quiz: {
      title: 'Cloud-Native Resilience Assessment',
      questions: [
        { q: 'Which pattern isolates failing services to prevent cascading application crashes?', options: ['Circuit Breaker', 'Singleton', 'Factory Method'], correct: 0 }
      ]
    }
  },

  // ==========================================
  // UI/UX DESIGN (4 Courses)
  // ==========================================
  {
    id: 'course-16',
    title: 'Design Systems & Enterprise Product Design',
    category: 'UI/UX Design',
    level: 'Advanced',
    instructor: 'Sophia Chen',
    instructorTitle: 'Staff Product Designer & Design Token Evangelist',
    instructorAvatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=150&q=80',
    rating: 4.96,
    reviewsCount: 930,
    duration: '21.0 Hours',
    totalLessons: 24,
    price: 2799,
    enrolledCount: 2150,
    thumbnail: 'https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?auto=format&fit=crop&w=800&q=80',
    description: 'Architect scalable multi-tier design tokens, accessible component libraries, interactive Figma prototypes, and WCAG AA compliant design systems.',
    learningOutcomes: [
      'Construct a 3-tier token architecture (primitive, semantic, component)',
      'Design accessible layouts compliant with WCAG 2.1 AA standards',
      'Create production-ready Figma component variants and auto-layout structures',
      'Bridge the gap between design tokens and CSS variable implementations'
    ],
    prerequisites: 'Familiarity with Figma or basic digital interface design.',
    modules: [
      {
        title: 'Module 1: Design Tokens & Systematic Foundations',
        lessons: [
          { id: 'l1601', title: 'Three-Layer Token Architecture & Naming Conventions', duration: '26 min', videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4', completed: false }
        ]
      }
    ],
    quiz: {
      title: 'Design Systems Assessment',
      questions: [
        { q: 'What tier represents context-specific styling choices in a 3-tier token system?', options: ['Primitive tokens', 'Semantic tokens', 'Global constants'], correct: 1 }
      ]
    }
  },
  {
    id: 'course-17',
    title: 'Figma for Advanced Product Designers',
    category: 'UI/UX Design',
    level: 'Intermediate',
    instructor: 'Liam Hemsworth',
    instructorTitle: 'Senior UI/UX Director',
    instructorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
    rating: 4.92,
    reviewsCount: 1040,
    duration: '18.5 Hours',
    totalLessons: 22,
    price: 2499,
    enrolledCount: 2310,
    thumbnail: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&w=800&q=80',
    description: 'Master Auto-Layout 5.0, component properties, smart animations, interactive variables, advanced prototyping conditions, and developer handoff.',
    learningOutcomes: [
      'Build complex responsive layouts with nested auto-layout containers',
      'Utilize Figma variables for multi-theme dark/light mode switching',
      'Create high-fidelity interactive prototypes with conditional logic',
      'Streamline developer handoff with Dev Mode annotations and token specs'
    ],
    prerequisites: 'Basic knowledge of design tools.',
    modules: [
      {
        title: 'Module 1: Auto-Layout Mastery & Responsive Grids',
        lessons: [
          { id: 'l1701', title: 'Auto-Layout Alignment, Wrapping & Minimum/Maximum Bounds', duration: '30 min', videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4', completed: false }
        ]
      }
    ],
    quiz: {
      title: 'Figma Pro Certification Assessment',
      questions: [
        { q: 'What feature in Figma allows dynamic switching between light and dark themes?', options: ['Figma Variables (Color Modes)', 'Component Masks', 'Vector Networks'], correct: 0 }
      ]
    }
  },
  {
    id: 'course-18',
    title: 'UX Research, Usability Testing & Prototyping',
    category: 'UI/UX Design',
    level: 'Beginner',
    instructor: 'Claire Dubois',
    instructorTitle: 'Principal UX Researcher',
    instructorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
    rating: 4.88,
    reviewsCount: 670,
    duration: '19.0 Hours',
    totalLessons: 20,
    price: 2399,
    enrolledCount: 1510,
    thumbnail: 'https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?auto=format&fit=crop&w=800&q=80',
    description: 'Conduct user interviews, synthesize qualitative and quantitative insights, create journey maps, execute usability tests, and measure System Usability Scale (SUS).',
    learningOutcomes: [
      'Plan and execute moderated and unmoderated usability testing sessions',
      'Translate user friction into actionable affinity diagrams and personas',
      'Calculate SUS scores and time-on-task benchmark metrics',
      'Present research findings persuasively to executive stakeholders'
    ],
    prerequisites: 'None. Open to aspiring product researchers and designers.',
    modules: [
      {
        title: 'Module 1: Generative & Evaluative Research Methodologies',
        lessons: [
          { id: 'l1801', title: 'Interview Scripting, Active Listening & Cognitive Biases', duration: '28 min', videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4', completed: false }
        ]
      }
    ],
    quiz: {
      title: 'UX Research Assessment',
      questions: [
        { q: 'What does a System Usability Scale (SUS) score above 68 typically indicate?', options: ['Above-average usability', 'Severe usability failure', 'Broken code'], correct: 0 }
      ]
    }
  },
  {
    id: 'course-19',
    title: 'Accessibility-First UI Design & WCAG Compliance',
    category: 'UI/UX Design',
    level: 'Intermediate',
    instructor: 'Sophia Chen',
    instructorTitle: 'Staff Product Designer',
    instructorAvatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=150&q=80',
    rating: 4.95,
    reviewsCount: 520,
    duration: '16.0 Hours',
    totalLessons: 18,
    price: 2199,
    enrolledCount: 1220,
    thumbnail: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=800&q=80',
    description: 'Design digital products accessible to all users. Master WCAG 2.2 guidelines, color contrast, keyboard navigation flows, screen reader audits, and focus indicators.',
    learningOutcomes: [
      'Audit color palettes against 4.5:1 and 3:1 contrast ratios',
      'Design logical focus management and keyboard tab-stops',
      'Spec ARIA roles and accessible states for design-to-code handoff',
      'Prevent cognitive overload with clear typography and motion reductions'
    ],
    prerequisites: 'Basic UI design experience.',
    modules: [
      {
        title: 'Module 1: The WCAG 2.2 Standard & Perceivable Design',
        lessons: [
          { id: 'l1901', title: 'Contrast Ratios, Text Resizing & Color Blindness Simulations', duration: '26 min', videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4', completed: false }
        ]
      }
    ],
    quiz: {
      title: 'Digital Accessibility Certification Assessment',
      questions: [
        { q: 'What is the required minimum contrast ratio for normal body text under WCAG AA?', options: ['4.5:1', '3.0:1', '7.0:1'], correct: 0 }
      ]
    }
  },

  // ==========================================
  // SYSTEMS & PROGRAMMING (5 Courses)
  // ==========================================
  {
    id: 'course-20',
    title: 'Java Backend Engineering & High-Throughput Systems',
    category: 'Systems & Programming',
    level: 'Intermediate',
    instructor: 'Priya Sharma',
    instructorTitle: 'Enterprise Java Architect',
    instructorAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=150&q=80',
    rating: 4.89,
    reviewsCount: 880,
    duration: '31.0 Hours',
    totalLessons: 36,
    price: 3399,
    enrolledCount: 2240,
    thumbnail: 'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&w=800&q=80',
    description: 'Master modern Java 21 features: Virtual Threads (Project Loom), pattern matching, records, garbage collection tuning (ZGC), concurrency primitives, and Netty.',
    learningOutcomes: [
      'Harness Java 21 Virtual Threads for massive I/O throughput',
      'Tune JVM garbage collection parameters for sub-millisecond latencies',
      'Implement thread-safe concurrent algorithms using java.util.concurrent',
      'Build non-blocking asynchronous event loops with Netty'
    ],
    prerequisites: 'Foundational Java syntax and OOP principles.',
    modules: [
      {
        title: 'Module 1: Java 21 Modern Syntax & Virtual Threads',
        lessons: [
          { id: 'l2001', title: 'Platform Threads vs Virtual Threads & Structured Concurrency', duration: '34 min', videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4', completed: false }
        ]
      }
    ],
    quiz: {
      title: 'Java Concurrency Assessment',
      questions: [
        { q: 'What is the primary motivation for Virtual Threads in Java 21?', options: ['Lightweight threads reducing operating system thread overhead for I/O tasks', 'Faster GPU mining', 'Smaller compiled JAR files'], correct: 0 }
      ]
    }
  },
  {
    id: 'course-21',
    title: 'Data Structures & Algorithms for FAANG Interviews',
    category: 'Systems & Programming',
    level: 'Intermediate',
    instructor: 'Julian Richter',
    instructorTitle: 'Ex-Google Staff Engineer',
    instructorAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80',
    rating: 4.97,
    reviewsCount: 2150,
    duration: '40.0 Hours',
    totalLessons: 48,
    price: 3999,
    enrolledCount: 5120,
    thumbnail: 'https://images.unsplash.com/photo-1504639725590-34d0984388bd?auto=format&fit=crop&w=800&q=80',
    description: 'Conquer technical coding interviews: dynamic programming, graph algorithms (Dijkstra, Tarjan), binary trees, heaps, monotonic stacks, and time/space complexity analysis.',
    learningOutcomes: [
      'Master Big-O time and space complexity trade-offs',
      'Solve complex Dynamic Programming problems using memoization and tabulation',
      'Implement graph traversals (BFS, DFS, Topological Sort, Union-Find)',
      'Pattern-match interview problems within 5 minutes of prompt inspection'
    ],
    prerequisites: 'Comfortable with at least one programming language (Java, Python, C++, or JS).',
    modules: [
      {
        title: 'Module 1: Complexity Analysis & Sliding Window Patterns',
        lessons: [
          { id: 'l2101', title: 'Big-O Rigor, Two Pointers & Two-Pass Sliding Windows', duration: '38 min', videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4', completed: false }
        ]
      }
    ],
    quiz: {
      title: 'Algorithms & Data Structures Assessment',
      questions: [
        { q: 'What is the average time complexity of searching an element in a balanced Binary Search Tree?', options: ['O(log n)', 'O(n)', 'O(1)', 'O(n log n)'], correct: 0 }
      ]
    }
  },
  {
    id: 'course-22',
    title: 'Operating Systems & Systems Programming in C/C++',
    category: 'Systems & Programming',
    level: 'Advanced',
    instructor: 'Dr. Henrik Lindqvist',
    instructorTitle: 'Systems Research Fellow',
    instructorAvatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=150&q=80',
    rating: 4.91,
    reviewsCount: 680,
    duration: '32.0 Hours',
    totalLessons: 34,
    price: 3699,
    enrolledCount: 1420,
    thumbnail: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80',
    description: 'Deep dive into OS kernels: virtual memory, page tables, POSIX system calls, process scheduling, mutexes, condition variables, and socket programming.',
    learningOutcomes: [
      'Write safe, high-performance low-level C and C++ programs',
      'Understand MMU virtual memory translation and page fault lifecycles',
      'Build multi-threaded client-server network applications with epoll',
      'Debug memory bugs with Valgrind, AddressSanitizer, and GDB'
    ],
    prerequisites: 'C or C++ foundations and understanding of binary representations.',
    modules: [
      {
        title: 'Module 1: Virtual Memory & Process Address Spaces',
        lessons: [
          { id: 'l2201', title: 'Virtual Memory, Page Tables & TLB Mechanics', duration: '42 min', videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4', completed: false }
        ]
      }
    ],
    quiz: {
      title: 'Systems Programming Assessment',
      questions: [
        { q: 'Which POSIX system call creates a new child process in Linux?', options: ['fork()', 'exec()', 'spawn()', 'init()'], correct: 0 }
      ]
    }
  },
  {
    id: 'course-23',
    title: 'Go Programming for High-Concurrency Systems',
    category: 'Systems & Programming',
    level: 'Intermediate',
    instructor: 'Alex Morgan',
    instructorTitle: 'Principal Software Architect',
    instructorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
    rating: 4.94,
    reviewsCount: 1150,
    duration: '24.5 Hours',
    totalLessons: 30,
    price: 3199,
    enrolledCount: 2780,
    thumbnail: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=800&q=80',
    description: 'Master Golang: Goroutines, buffered channels, select statements, context package, mutexes, memory profiling with pprof, and building high-performance HTTP microservices.',
    learningOutcomes: [
      'Write idiomatic Go with clean interfaces and error handling',
      'Leverage Goroutines and Channels for lock-free communication (CSP)',
      'Manage request cancellations and timeouts using context.Context',
      'Benchmark code and diagnose data races with Go race detector'
    ],
    prerequisites: 'Experience with at least one procedural or object-oriented language.',
    modules: [
      {
        title: 'Module 1: Goroutines, Channels & Concurrency Patterns',
        lessons: [
          { id: 'l2301', title: 'CSP Concurrency, Worker Pools & Fan-Out/Fan-In', duration: '32 min', videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4', completed: false }
        ]
      }
    ],
    quiz: {
      title: 'Go Concurrency Certification Assessment',
      questions: [
        { q: 'What concurrency philosophy does Go famously champion?', options: ['Do not communicate by sharing memory; instead, share memory by communicating', 'Always use raw pointers', 'Single threaded event loop'], correct: 0 }
      ]
    }
  },
  {
    id: 'course-24',
    title: 'Distributed Systems & Consensus Protocols',
    category: 'Systems & Programming',
    level: 'Advanced',
    instructor: 'Dr. Henrik Lindqvist',
    instructorTitle: 'Systems Research Fellow',
    instructorAvatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=150&q=80',
    rating: 4.98,
    reviewsCount: 790,
    duration: '30.0 Hours',
    totalLessons: 32,
    price: 3899,
    enrolledCount: 1650,
    thumbnail: 'https://images.unsplash.com/photo-1526374879817-457c0a1459df?auto=format&fit=crop&w=800&q=80',
    description: 'Master the theory and implementation of distributed systems: CAP theorem, Raft consensus protocol, Paxos, vector clocks, gossip protocols, distributed locking, and 2PC.',
    learningOutcomes: [
      'Understand leader election and log replication in the Raft consensus protocol',
      'Analyze linearizability, eventual consistency, and split-brain scenarios',
      'Implement distributed rate limiters and leases with Redis / etcd',
      'Design partition-tolerant distributed data storage engines'
    ],
    prerequisites: 'Strong algorithms and networking foundations.',
    modules: [
      {
        title: 'Module 1: Time, Order & Consensus Mechanics',
        lessons: [
          { id: 'l2401', title: 'Lamport Timestamps, Vector Clocks & Raft Consensus', duration: '40 min', videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4', completed: false }
        ]
      }
    ],
    quiz: {
      title: 'Distributed Systems Assessment',
      questions: [
        { q: 'In the CAP theorem, what does the P stand for?', options: ['Partition Tolerance', 'Performance', 'Parallelism', 'Persistence'], correct: 0 }
      ]
    }
  }
];
