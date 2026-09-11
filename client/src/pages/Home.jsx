import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  ArrowRight, 
  BookOpen, 
  CheckCircle2, 
  Award, 
  PlayCircle, 
  Star, 
  Search, 
  Code, 
  Cpu, 
  Palette, 
  Cloud, 
  Terminal,
  Briefcase,
  Sparkles
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { SAMPLE_COURSES } from '../data/coursesData';
import { getUserLearningState } from '../services/enrollmentService';
import CourseCard from '../components/CourseCard';
import Button from '../components/ui/Button';

const FALLBACK_THUMBNAIL = 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=800&q=80';

export default function Home() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [heroSearch, setHeroSearch] = useState('');
  
  const userState = getUserLearningState(user);
  const activeCourse = userState.enrolledCourses.length > 0 ? userState.enrolledCourses[0] : null;

  const handleHeroSearch = (e) => {
    e.preventDefault();
    if (heroSearch.trim()) {
      navigate(`/courses?search=${encodeURIComponent(heroSearch.trim())}`);
    } else {
      navigate('/courses');
    }
  };

  const categories = [
    { name: 'AI & Machine Learning', icon: Cpu, count: '5 Masterclasses', desc: 'Python, PyTorch, LLMs, Vector RAG & NLP', color: 'bg-purple-50 text-purple-700 border-purple-200', surfaceHover: 'hover:border-purple-300 hover:bg-purple-50/30' },
    { name: 'Cloud & DevOps', icon: Cloud, count: '5 Masterclasses', desc: 'AWS Solutions, Docker, Kubernetes, CI/CD, Terraform', color: 'bg-sky-50 text-sky-700 border-sky-200', surfaceHover: 'hover:border-sky-300 hover:bg-sky-50/30' },
    { name: 'UI/UX Design', icon: Palette, count: '4 Masterclasses', desc: 'Design Tokens, Advanced Figma, UX Research & WCAG', color: 'bg-amber-50 text-amber-800 border-amber-200', surfaceHover: 'hover:border-amber-300 hover:bg-amber-50/30' },
    { name: 'Systems & Programming', icon: Terminal, count: '5 Masterclasses', desc: 'Java 21, DSA, POSIX OS, Go CSP & Distributed Raft', color: 'bg-emerald-50 text-emerald-700 border-emerald-200', surfaceHover: 'hover:border-emerald-300 hover:bg-emerald-50/30' }
  ];

  const testimonials = [
    {
      quote: 'Eduvia provided the exact structure I needed to transition into full-stack engineering. The curriculum gets straight into building resilient services with verified credentials that employers value.',
      name: 'Maya Lin',
      role: 'Software Engineer at CloudScale',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80',
      course: 'Full-Stack Web Development'
    },
    {
      quote: 'The modular course player and end-of-unit quizzes made studying manageable alongside my full-time job. Having an authentic verified credential URL on LinkedIn helped me secure interview requests.',
      name: 'David Okafor',
      role: 'DevOps & SRE Specialist',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80',
      course: 'Cloud Native Kubernetes'
    },
    {
      quote: 'As an instructor, Eduvia offers the most intuitive course authoring studio I have used. Organizing modules and monitoring student engagement analytics is fast, professional, and rewarding.',
      name: 'Dr. Elena Rostova',
      role: 'Staff AI Researcher & Educator',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=120&q=80',
      course: 'AI & Machine Learning'
    }
  ];

  return (
    <div className="w-full flex flex-col">
      
      {/* 1. HERO: Warm Ivory Full-Width Section (~560-640px height, wide bounds) */}
      <section className="w-full bg-[#FAF9F5] border-b border-stone-200/80 pt-5 pb-10 sm:pt-8 sm:pb-12 lg:pt-10 lg:pb-14">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 xl:gap-16 items-center">
            
            {/* Left Column: Eyebrow, Headline, Value Prop, Search & CTAs (~54%) */}
            <div className="lg:col-span-7 space-y-4 sm:space-y-5 text-center lg:text-left">
              
              {/* Short non-brand eyebrow */}
              <div>
                <span className="text-[11px] sm:text-xs font-bold tracking-widest text-blue-600 uppercase font-mono">
                  LEARN • BUILD • ADVANCE
                </span>
              </div>

              {/* Headline */}
              <h1 className="text-[38px] sm:text-[48px] lg:text-[56px] xl:text-[62px] font-black text-slate-900 tracking-tight leading-[1.03] font-heading">
                Master skills that move your{' '}
                <span className="text-blue-600">career forward.</span>
              </h1>

              {/* Supporting Copy */}
              <p className="text-sm sm:text-base text-slate-600 max-w-xl mx-auto lg:mx-0 leading-relaxed">
                Learn practical skills through structured courses, real projects, and credentials built for career growth.
              </p>

              {/* Premium Search Bar (52-58px height) */}
              <form onSubmit={handleHeroSearch} className="max-w-xl mx-auto lg:mx-0 pt-1">
                <div className="h-[54px] bg-white rounded-xl border border-slate-300 shadow-xs flex items-center px-3 gap-2 focus-within:border-blue-600 focus-within:ring-2 focus-within:ring-blue-100 transition-all">
                  <Search className="w-5 h-5 text-slate-400 shrink-0 ml-1" />
                  <input
                    type="text"
                    placeholder="What do you want to learn? (e.g., React, Python, Cloud...)"
                    value={heroSearch}
                    onChange={(e) => setHeroSearch(e.target.value)}
                    className="flex-1 text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 bg-transparent focus:outline-none"
                  />
                  <button
                    type="submit"
                    className="h-[38px] px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs sm:text-sm rounded-lg flex items-center gap-1.5 transition-colors shrink-0 cursor-pointer shadow-2xs"
                  >
                    <span>Search</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>

                {/* Trending Topics */}
                <div className="flex items-center gap-2 mt-2.5 text-[11px] text-slate-500 justify-center lg:justify-start flex-wrap">
                  <span className="font-semibold text-slate-700">Trending:</span>
                  <button type="button" onClick={() => navigate('/courses?category=Web+Development')} className="hover:text-blue-600 font-medium cursor-pointer">React 19</button>
                  <span>•</span>
                  <button type="button" onClick={() => navigate('/courses?category=AI%20%26%20Machine%20Learning')} className="hover:text-blue-600 font-medium cursor-pointer">Python & LLMs</button>
                  <span>•</span>
                  <button type="button" onClick={() => navigate('/courses?category=UI%2FUX+Design')} className="hover:text-blue-600 font-medium cursor-pointer">Design Systems</button>
                  <span>•</span>
                  <button type="button" onClick={() => navigate('/courses?category=Cloud+%26+DevOps')} className="hover:text-blue-600 font-medium cursor-pointer">Kubernetes</button>
                </div>
              </form>

              {/* Primary & Secondary CTAs (Clear visual hierarchy) */}
              <div className="pt-2 flex flex-wrap items-center justify-center lg:justify-start gap-3">
                <Link to="/courses">
                  <Button variant="primary" size="lg" icon={BookOpen} className="font-semibold px-6 shadow-xs">
                    Explore Courses
                  </Button>
                </Link>
                <Link to={user ? "/student-dashboard" : "/register"}>
                  <Button variant="outline" size="lg" className="font-medium text-slate-700 border-slate-300 hover:bg-white/80">
                    {user ? "Go to Dashboard" : "Start Learning Free"}
                  </Button>
                </Link>
              </div>
            </div>

            {/* Right Column: Large Authentic Education Image Anchor (~46%) */}
            <div className="lg:col-span-5 relative mt-6 lg:mt-0">
              <div className="relative mx-auto max-w-md lg:max-w-none">
                
                {/* Large Education Photo occupying most of hero height */}
                <div className="rounded-2xl overflow-hidden shadow-md border border-slate-200/60 bg-slate-100 aspect-[4/5] sm:aspect-square lg:aspect-[4/5] max-h-[500px] relative">
                  <img
                    src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=800&q=80"
                    alt="Students learning collaboratively"
                    onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = FALLBACK_THUMBNAIL; }}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent" />
                  
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <div className="text-sm font-bold tracking-wide">Interactive Technical Curriculum</div>
                    <div className="text-xs text-slate-200">50,000+ graduates advancing tech careers</div>
                  </div>
                </div>

                {/* Micro-Card 1: Active Progress (Top Left) with Restrained Glassmorphism */}
                <div className="hidden sm:flex absolute -top-3 -left-3 eduvia-glass rounded-xl p-2.5 items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-blue-50 border border-blue-100 text-blue-600 flex items-center justify-center shrink-0">
                    <PlayCircle className="w-4 h-4" />
                  </div>
                  <div className="text-left pr-1">
                    <div className="text-[11px] font-bold text-slate-900 leading-tight">React 19 Architecture</div>
                    <div className="text-[10px] text-emerald-700 font-semibold mt-0.5">75% Complete • Module 3</div>
                  </div>
                </div>

                {/* Micro-Card 2: Verified Certificate Pill (Bottom Right) with Restrained Glassmorphism */}
                <div className="hidden sm:flex absolute -bottom-3 -right-3 eduvia-glass rounded-xl p-2.5 items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-amber-50 border border-amber-200 text-amber-600 flex items-center justify-center shrink-0">
                    <Award className="w-3.5 h-3.5" />
                  </div>
                  <div className="text-left pr-1">
                    <div className="text-[10px] font-bold text-slate-900">Verified Certificate</div>
                    <div className="text-[9px] text-slate-500">Accredited by Eduvia</div>
                  </div>
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. TRUST & STAT RIBBON: Crisp White Full-Width Section */}
      <section className="w-full bg-white border-b border-slate-200/80 py-7 sm:py-8">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:divide-x md:divide-slate-200/80 text-center">
            <div className="space-y-0.5">
              <div className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight font-heading">50K+</div>
              <div className="text-xs font-semibold text-slate-600">Active Learners</div>
            </div>
            <div className="space-y-0.5 md:pl-4">
              <div className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight font-heading">24</div>
              <div className="text-xs font-semibold text-slate-600">Masterclasses</div>
            </div>
            <div className="space-y-0.5 md:pl-4">
              <div className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight font-heading">4.9/5</div>
              <div className="text-xs font-semibold text-slate-600">Average Rating</div>
            </div>
            <div className="space-y-0.5 md:pl-4">
              <div className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight font-heading">94%</div>
              <div className="text-xs font-semibold text-slate-600">Career Outcomes</div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. CONTINUE LEARNING: Soft Cool Blue/Gray Full-Width Section (Rendered for enrolled learners) */}
      {user && activeCourse && (
        <section className="w-full bg-[#F1F5F9] border-b border-slate-200/70 py-8 sm:py-10">
          <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12 space-y-3.5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse" />
                <h2 className="text-base font-bold text-slate-900">
                  Continue where you left off
                </h2>
              </div>
              <Link to="/student-dashboard" className="text-xs font-semibold text-blue-600 hover:text-blue-700 hover:underline">
                My Learning Hub →
              </Link>
            </div>

            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 sm:p-5 rounded-2xl bg-white border border-slate-200/90 shadow-xs">
              <div className="flex items-center gap-4 min-w-0 flex-1">
                <img 
                  src={activeCourse.thumbnail || FALLBACK_THUMBNAIL} 
                  alt={activeCourse.title} 
                  onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = FALLBACK_THUMBNAIL; }}
                  className="w-24 h-16 rounded-xl object-cover border border-slate-200 shrink-0" 
                />
                <div className="min-w-0 flex-1 space-y-1">
                  <div className="font-bold text-sm sm:text-base text-slate-900 truncate">
                    {activeCourse.title}
                  </div>
                  <div className="text-xs text-slate-500 truncate">
                    Current lesson: <span className="font-medium text-slate-700">{activeCourse.lastLesson || 'In Progress'}</span>
                  </div>
                  <div className="flex items-center gap-3 max-w-sm pt-0.5">
                    <div className="flex-1 bg-slate-100 h-2 rounded-full overflow-hidden">
                      <div className="bg-emerald-600 h-full rounded-full transition-all duration-500" style={{ width: `${activeCourse.progress || 10}%` }} />
                    </div>
                    <span className="text-xs font-semibold text-emerald-700 shrink-0">{activeCourse.progress || 10}%</span>
                  </div>
                </div>
              </div>

              <Link to={`/player/${activeCourse.id}`} className="shrink-0 w-full sm:w-auto">
                <Button variant="primary" size="md" icon={PlayCircle} className="w-full sm:w-auto px-5 font-semibold">
                  Resume Lesson
                </Button>
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* 4. POPULAR CATEGORIES: Warm Ivory Full-Width Section */}
      <section className="w-full bg-[#FAF9F5] py-14 sm:py-20 border-b border-stone-200/70">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12 space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2">
            <div>
              <span className="text-xs font-bold text-blue-600 uppercase tracking-wider font-mono">Academic Disciplines</span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight font-heading mt-0.5">
                Explore Popular Categories
              </h2>
            </div>
            <Link to="/courses" className="text-xs font-semibold text-blue-600 hover:text-blue-700 hover:underline">
              View All 24 Masterclasses →
            </Link>
          </div>

          {/* Asymmetric Grid: 1 Featured Track (Deep Navy) + 4 Supporting Tiles */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-6">
            
            {/* Featured Large Tile: Web Development (Deep Navy Editorial) */}
            <Link
              to="/courses?category=Web+Development"
              className="lg:col-span-5 bg-[#0F172A] text-white rounded-2xl p-7 sm:p-8 shadow-sm hover:shadow-md transition-all flex flex-col justify-between group border border-slate-800"
            >
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-xl bg-white/10 border border-white/15 flex items-center justify-center text-white">
                  <Code className="w-6 h-6 text-blue-400" />
                </div>
                <div className="space-y-1.5">
                  <span className="text-[11px] font-bold text-blue-400 uppercase tracking-wider font-mono">Core Engineering Track</span>
                  <h3 className="text-2xl font-black font-heading leading-snug">
                    Web Development & Software Architecture
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed pt-1">
                    Master modern React 19, Next.js, Spring Boot microservices, high-performance Node.js, and enterprise TypeScript.
                  </p>
                </div>
              </div>

              <div className="pt-6 flex items-center justify-between text-xs font-semibold text-slate-300 border-t border-white/10 mt-6">
                <span>5 Comprehensive Masterclasses</span>
                <span className="flex items-center gap-1 text-blue-400 group-hover:translate-x-1 transition-transform">
                  Explore Track <ArrowRight className="w-4 h-4" />
                </span>
              </div>
            </Link>

            {/* 4 Supporting Tiles in 2x2 Grid */}
            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-5">
              {categories.map((cat, idx) => {
                const Icon = cat.icon;
                return (
                  <Link
                    key={idx}
                    to={`/courses?category=${encodeURIComponent(cat.name)}`}
                    className={`bg-white rounded-2xl p-5 sm:p-6 border border-slate-200/90 shadow-xs hover:shadow-md ${cat.surfaceHover} transition-all flex flex-col justify-between space-y-3 group`}
                  >
                    <div className="flex items-start justify-between">
                      <div className={`w-11 h-11 rounded-xl border flex items-center justify-center ${cat.color}`}>
                        <Icon className="w-5 h-5" />
                      </div>
                      <span className="text-xs font-semibold text-slate-500 bg-slate-50 px-2.5 py-1 rounded-full border border-slate-200/60 font-mono">{cat.count}</span>
                    </div>

                    <div>
                      <h4 className="font-bold text-slate-900 text-base group-hover:text-blue-600 transition-colors">
                        {cat.name}
                      </h4>
                      <p className="text-xs text-slate-500 mt-1 line-clamp-1">{cat.desc}</p>
                    </div>

                    <div className="pt-2.5 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-blue-600">
                      <span>View Masterclasses</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </Link>
                );
              })}
            </div>

          </div>
        </div>
      </section>

      {/* 5. IN-DEMAND MASTERCLASSES: Clean White Full-Width Section (6 Courses Grid) */}
      <section className="w-full bg-white py-16 sm:py-20 border-b border-slate-200/80">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12 space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2">
            <div>
              <span className="text-xs font-bold text-blue-600 uppercase tracking-wider font-mono">Curated Selection</span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight font-heading mt-0.5">
                Featured Technical Masterclasses
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
                Highest-rated masterclasses curated for career advancement and engineering excellence.
              </p>
            </div>
            <Link to="/courses">
              <Button variant="outline" size="sm" icon={ArrowRight}>
                View All 24 Courses
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
            {SAMPLE_COURSES.slice(0, 6).map((course) => (
              <CourseCard 
                key={course.id} 
                course={course} 
                isEnrolled={userState.enrolledCourses.some(c => c.id === course.id)} 
              />
            ))}
          </div>
        </div>
      </section>

      {/* 6. WHY EDUVIA: Warm Cream Full-Width Section (Refined Border-Free Editorial Layout) */}
      <section className="w-full bg-[#F5F3EC] py-16 sm:py-20 border-b border-stone-200/80">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            
            {/* Left Column: Authentic Education Image */}
            <div className="lg:col-span-5">
              <div className="rounded-2xl overflow-hidden shadow-sm border border-stone-300/80 aspect-[4/3] bg-stone-200">
                <img
                  src="https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=800&q=80"
                  alt="Students collaborating with instructor"
                  onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = FALLBACK_THUMBNAIL; }}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Right Column: Editorial Principles */}
            <div className="lg:col-span-7 space-y-6">
              <div className="space-y-2">
                <span className="text-xs font-bold text-blue-600 uppercase tracking-wider font-mono">The Eduvia Standard</span>
                <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight font-heading leading-tight">
                  Learning designed around your career goals.
                </h2>
                <p className="text-sm text-slate-600 leading-relaxed max-w-2xl">
                  We combine structured curricula, hands-on video syllabi, and verifiable digital certificates so your study translates directly into workplace momentum.
                </p>
              </div>

              {/* 4 Concise Principles with Typographic Numbers & Dividers */}
              <div className="divide-y divide-stone-200 space-y-3 pt-2">
                <div className="pt-3 flex items-start gap-4">
                  <span className="text-sm font-black font-mono text-blue-600 mt-0.5 shrink-0">01</span>
                  <div>
                    <h3 className="font-bold text-base text-slate-900">Structured Curriculum</h3>
                    <p className="text-xs sm:text-sm text-slate-600 mt-0.5 leading-relaxed">Clear learning tracks from fundamentals to complex production deployment.</p>
                  </div>
                </div>

                <div className="pt-3 flex items-start gap-4">
                  <span className="text-sm font-black font-mono text-blue-600 mt-0.5 shrink-0">02</span>
                  <div>
                    <h3 className="font-bold text-base text-slate-900">Hands-on Projects</h3>
                    <p className="text-xs sm:text-sm text-slate-600 mt-0.5 leading-relaxed">Real coding exercises, architectural checkpoints, and downloadable starter repos.</p>
                  </div>
                </div>

                <div className="pt-3 flex items-start gap-4">
                  <span className="text-sm font-black font-mono text-blue-600 mt-0.5 shrink-0">03</span>
                  <div>
                    <h3 className="font-bold text-base text-slate-900">Expert Instructors</h3>
                    <p className="text-xs sm:text-sm text-slate-600 mt-0.5 leading-relaxed">Learn from verified software architects and active tech practitioners.</p>
                  </div>
                </div>

                <div className="pt-3 flex items-start gap-4">
                  <span className="text-sm font-black font-mono text-blue-600 mt-0.5 shrink-0">04</span>
                  <div>
                    <h3 className="font-bold text-base text-slate-900">Recognized Certificates</h3>
                    <p className="text-xs sm:text-sm text-slate-600 mt-0.5 leading-relaxed">Cryptographically authenticated credentials with unique verification URLs.</p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 7. LEARNER STORIES: Soft Cool Surface Full-Width Section (3 Testimonial Cards) */}
      <section className="w-full bg-[#F1F5F9] py-16 sm:py-20 border-b border-slate-200/80">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12 space-y-8">
          <div className="text-center max-w-xl mx-auto space-y-1.5">
            <span className="text-xs font-bold text-blue-600 uppercase tracking-wider font-mono">Learner Stories</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight font-heading">
              Trusted by 50,000+ ambitious learners
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-7">
            {testimonials.map((t, idx) => (
              <div key={idx} className="bg-white p-6 sm:p-7 rounded-2xl border border-slate-200 shadow-2xs flex flex-col justify-between space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center gap-1 text-amber-500">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed italic">
                    "{t.quote}"
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center gap-3">
                  <img
                    src={t.avatar}
                    alt={t.name}
                    onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80'; }}
                    className="w-10 h-10 rounded-full object-cover border border-slate-200 shrink-0"
                  />
                  <div className="min-w-0">
                    <div className="font-bold text-xs sm:text-sm text-slate-900 truncate">{t.name}</div>
                    <div className="text-xs text-slate-500 truncate">{t.role}</div>
                    <div className="text-[11px] text-blue-600 font-semibold truncate mt-0.5">{t.course}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. BECOME AN INSTRUCTOR: Deep Navy Full-Width Banner with REAL EDUCATOR Photo */}
      <section className="w-full bg-[#0F172A] text-white py-16 sm:py-20 border-b border-slate-800">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
            <div className="lg:col-span-7 space-y-4 text-center lg:text-left">
              <span className="inline-block px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 text-xs font-semibold font-mono">
                Eduvia Instructor Studio
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight font-heading">
                Turn your expertise into impact.
              </h2>
              <p className="text-sm text-slate-300 leading-relaxed max-w-xl">
                Join our network of verified industry instructors. Publish comprehensive curricula, host certified assessments, and build a rewarding global following.
              </p>
              <div className="pt-2">
                <Link to="/instructor-dashboard">
                  <Button variant="primary" size="md" icon={Briefcase} className="font-semibold">
                    Become an Instructor
                  </Button>
                </Link>
              </div>
            </div>

            <div className="lg:col-span-5 h-64 lg:h-80 rounded-2xl overflow-hidden relative shadow-md hidden sm:block border border-slate-800">
              <img
                src="https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=800&q=80"
                alt="Educator lecturing students in university classroom"
                onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = FALLBACK_THUMBNAIL; }}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-[#0F172A]/40 via-transparent to-transparent" />
            </div>
          </div>
        </div>
      </section>

      {/* 9. FINAL CTA: Soft Blue / Lavender Tint Full-Width Section */}
      <section className="w-full bg-gradient-to-b from-[#EFF6FF] to-[#F5F3FF] py-16 sm:py-20 border-b border-blue-100 text-center">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-8 space-y-4">
          <div className="max-w-xl mx-auto space-y-2">
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 font-heading">
              Your next skill starts here.
            </h2>
            <p className="text-sm text-slate-600">
              Join thousands of professionals leveling up their technical skills today with Eduvia.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <Link to="/courses">
              <Button variant="primary" size="lg" icon={BookOpen} className="font-semibold px-6 shadow-xs">
                Explore All Courses
              </Button>
            </Link>
            <Link to={user ? "/student-dashboard" : "/register"}>
              <Button variant="outline" size="lg" className="font-medium text-slate-700 border-slate-300 hover:bg-white">
                {user ? "View Learning Hub" : "Create Free Account"}
              </Button>
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
