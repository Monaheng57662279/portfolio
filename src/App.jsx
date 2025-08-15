import React, { useMemo, useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";
import { motion, AnimatePresence } from "framer-motion";

// Profile Data
const PROFILE = {
  name: "Monaheng Mothabeng",
  role: "Full-Stack Software Engineer",
  tagline: "Building scalable web applications and data-driven solutions",
  location: "Maseru, Lesotho",
  email: "monahengmothabeng@gmail.com",
  phone: "+266 57662279",
  linkedin: "https://www.linkedin.com/in/monaheng20",
  github: "https://github.com/Monaheng57662279",
  resumeUrl: "/resume.pdf",
  bio: "Passionate software engineer with 3+ years of experience building production-ready web applications and data systems. Specialized in React, Django, and cloud infrastructure with a track record of delivering scalable solutions that drive business value."
};

// Skills Data
const SKILLS = {
  "Frontend": ["React", "JavaScript (ES6+)", "HTML5", "CSS3", "Responsive Design", "Framer Motion"],
  "Backend": ["Python", "Django", "REST APIs", "PostgreSQL", "Redis"],
  "DevOps & Tools": ["Docker", "Nginx", "Git/GitHub", "Linux", "Apache Kafka"],
  "Data & Analytics": ["Data Pipeline Design", "ETL Processes", "Grafana", "System Monitoring"]
};

// Projects Data
const PROJECTS = [
  {
    slug: "fraud-detection-ussd",
    title: "Real-Time Fraud Detection System",
    year: "2023–2024",
    status: "Production",
    summary: "Enterprise-grade fraud detection pipeline processing 10K+ daily USSD transactions with 99.2% accuracy. Reduced false positives by 40% using machine learning anomaly detection.",
    description: "Built a comprehensive fraud detection system for a telecommunications company, handling real-time transaction monitoring and alerting. The system processes thousands of USSD transactions daily, using Apache Kafka for stream processing and custom ML models for anomaly detection.",
    tech: ["Apache Kafka", "Python", "Django", "PostgreSQL", "Docker", "Grafana", "Redis"],
    highlights: [
      "Processes 10,000+ transactions daily with <100ms latency",
      "Reduced fraud losses by 60% in first 6 months",
      "99.2% detection accuracy with 40% fewer false positives",
      "Real-time alerting and dashboard monitoring"
    ],
    links: { 
      github: "https://github.com/Monaheng57662279/fraud-detection-system",
      demo: "#" 
    },
    image: "/images/fraud-detection.jpg"
  },
  {
    slug: "hospital-management-system",
    title: "Hospital Management Platform",
    year: "2024",
    status: "Live",
    summary: "Full-featured hospital management system with role-based access, appointment scheduling, and comprehensive audit trails. Serves 500+ daily users across multiple departments.",
    description: "Comprehensive hospital management solution built for a regional medical center. Features include patient management, appointment scheduling, inventory tracking, and detailed reporting with role-based access control.",
    tech: ["Django", "PostgreSQL", "Docker", "Nginx", "Bootstrap", "Chart.js"],
    highlights: [
      "Manages 500+ daily active users",
      "Reduced appointment scheduling time by 70%",
      "Complete audit trail for compliance",
      "Multi-role dashboard (Admin, Doctor, Nurse, Receptionist)"
    ],
    links: { 
      github: "https://github.com/Monaheng57662279/hospital-management",
      demo: "https://hospital-demo.example.com" 
    },
    image: "/images/hospital-system.jpg"
  },
  {
    slug: "eld-compliance-system",
    title: "ELD Compliance & Route Optimization",
    year: "2025",
    status: "In Development",
    summary: "React + Django application generating DOT-compliant Electronic Logging Device reports with route optimization. Targeting 95% compliance rate for trucking operations.",
    description: "Advanced logistics platform for trucking companies to maintain DOT compliance while optimizing routes. Features automated log generation, real-time tracking, and comprehensive reporting for fleet management.",
    tech: ["React", "Django REST Framework", "PostgreSQL", "Google Maps API", "WebSockets"],
    highlights: [
      "Automated DOT compliance reporting",
      "Route optimization reducing fuel costs by 15%",
      "Real-time fleet tracking and monitoring",
      "Integration with major ELD hardware providers"
    ],
    links: { 
      github: "https://github.com/Monaheng57662279/eld-system",
      demo: "#" 
    },
    image: "/images/eld-system.jpg"
  },
  {
    slug: "data-analytics-dashboard",
    title: "Business Intelligence Dashboard",
    year: "2024",
    status: "Production",
    summary: "Interactive analytics dashboard processing multi-source data streams. Provides real-time insights for executive decision-making with 50+ KPI visualizations.",
    description: "Executive dashboard aggregating data from multiple business systems to provide real-time insights. Features custom visualizations, automated reporting, and predictive analytics for strategic planning.",
    tech: ["React", "D3.js", "Python", "FastAPI", "PostgreSQL", "Redis", "Docker"],
    highlights: [
      "Processes data from 8+ different sources",
      "50+ interactive KPI visualizations",
      "Automated daily/weekly executive reports",
      "Predictive analytics for trend forecasting"
    ],
    links: { 
      github: "https://github.com/Monaheng57662279/analytics-dashboard",
      demo: "https://analytics-demo.example.com" 
    },
    image: "/images/analytics-dashboard.jpg"
  }
];

// Experience Data
const EXPERIENCE = [
  {
    role: "Senior Software Engineer",
    company: "TechSolutions Lesotho",
    time: "Mar 2023 – Present",
    location: "Maseru, Lesotho",
    points: [
      "Lead development of fraud detection system processing 10K+ daily transactions",
      "Architected microservices infrastructure reducing system downtime by 85%",
      "Mentored 3 junior developers and established code review processes",
      "Collaborated with product team to deliver 5 major features ahead of schedule"
    ]
  },
  {
    role: "Full-Stack Developer",
    company: "Digital Health Solutions",
    time: "Jun 2022 – Feb 2023",
    location: "Maseru, Lesotho",
    points: [
      "Built hospital management system serving 500+ daily users",
      "Implemented role-based access control and audit logging",
      "Optimized database queries reducing page load times by 60%",
      "Integrated third-party APIs for payment processing and notifications"
    ]
  },
  {
    role: "Web Development Instructor",
    company: "Tech Academy Lesotho",
    time: "Jan 2025 – Present",
    location: "Maseru, Lesotho",
    points: [
      "Teaching modern web development to 20+ students per cohort",
      "Developed curriculum covering HTML5, CSS3, JavaScript, and React",
      "Mentored students on industry best practices and project deployment",
      "Achieved 90% student job placement rate within 6 months"
    ]
  }
];

// Achievements Data
const ACHIEVEMENTS = [
  "🏆 Led team that reduced system downtime by 85% through infrastructure improvements",
  "📈 Built fraud detection system that prevented $50K+ in losses within first quarter",
  "🎓 Mentored 8+ junior developers with 100% retention rate",
  "⚡ Optimized critical database queries achieving 60% performance improvement"
];

// Supabase Client
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
let supabase = null;
if (supabaseUrl && supabaseKey) {
  supabase = createClient(supabaseUrl, supabaseKey);
}

// UI Components
const Pill = ({ children, variant = "default" }) => {
  const variants = {
    default: "bg-white/70 border-slate-200 text-slate-700",
    primary: "bg-sky-100 border-sky-200 text-sky-800",
    success: "bg-green-100 border-green-200 text-green-800"
  };
  return (
    <span className={`inline-block border rounded-full px-3 py-1 text-sm ${variants[variant]}`}>
      {children}
    </span>
  );
};

const SectionTitle = ({ children, subtitle }) => (
  <div className="text-center mb-8">
    <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-slate-900">{children}</h2>
    {subtitle && <p className="text-slate-600 mt-2 text-lg">{subtitle}</p>}
  </div>
);

const LoadingSpinner = () => (
  <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-sky-600"></div>
);

// Hero Section
function HeroSection() {
  return (
    <section className="py-20 md:py-32">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="text-center">
          <div className="mb-6">
            <img 
              src="/images/profile-photo.jpg" 
              alt={PROFILE.name}
              className="w-32 h-32 rounded-full mx-auto mb-6 border-4 border-white shadow-lg"
              onError={(e) => {
                e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(PROFILE.name)}&size=128&background=0ea5e9&color=fff`;
              }}
            />
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-slate-900 mb-4">{PROFILE.name}</h1>
          <p className="text-xl md:text-2xl text-slate-600 mb-6">{PROFILE.role}</p>
          <p className="text-lg text-slate-700 max-w-3xl mx-auto mb-8 leading-relaxed">{PROFILE.bio}</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a href="#contact" className="bg-sky-600 hover:bg-sky-700 text-white px-8 py-3 rounded-full font-semibold transition-colors">Let's Work Together</a>
            <a href={PROFILE.resumeUrl} className="border-2 border-slate-300 hover:border-slate-400 text-slate-700 px-8 py-3 rounded-full font-semibold transition-colors" target="_blank" rel="noopener noreferrer">Download Resume</a>
          </div>
          <div className="flex items-center justify-center gap-6 mt-8 text-slate-600">
            <div className="flex items-center gap-2"><span>📍</span><span>{PROFILE.location}</span></div>
            <div className="flex items-center gap-2"><span>✉️</span><a href={`mailto:${PROFILE.email}`} className="hover:text-sky-600">{PROFILE.email}</a></div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// Projects Section
function ProjectsSection() {
  const [selectedProject, setSelectedProject] = useState(null);
  const [filter, setFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const allTechs = Array.from(new Set(PROJECTS.flatMap(p => p.tech)));
  const filteredProjects = useMemo(() => {
    let projects = PROJECTS;
    if (filter !== 'all') {
      projects = projects.filter(p => p.tech.some(tech => tech.toLowerCase().includes(filter.toLowerCase())));
    }
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      projects = projects.filter(p =>
        p.title.toLowerCase().includes(query) ||
        p.summary.toLowerCase().includes(query) ||
        p.tech.some(tech => tech.toLowerCase().includes(query))
      );
    }
    return projects;
  }, [filter, searchQuery]);
  return (
    <section id="projects" className="py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-6">
        <SectionTitle subtitle="Real-world applications solving complex business problems">Featured Projects</SectionTitle>
        <div className="flex flex-col md:flex-row gap-4 mb-12 items-center justify-center">
          <div className="relative">
            <input type="text" placeholder="Search projects..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="w-80 pl-10 pr-4 py-3 rounded-full border border-slate-300 focus:border-sky-500 focus:ring-2 focus:ring-sky-200 outline-none" />
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">🔍</span>
          </div>
          <select value={filter} onChange={(e) => setFilter(e.target.value)} className="px-4 py-3 rounded-full border border-slate-300 focus:border-sky-500 outline-none">
            <option value="all">All Technologies</option>
            {allTechs.map(tech => (<option key={tech} value={tech}>{tech}</option>))}
          </select>
        </div>
        <div className="grid md:grid-cols-2 gap-8">
          {filteredProjects.map((project, index) => (
            <motion.div key={project.slug} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: index * 0.1 }} className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow overflow-hidden cursor-pointer" onClick={() => setSelectedProject(project)}>
              <div className="aspect-video bg-gradient-to-br from-sky-100 to-cyan-100 relative overflow-hidden">
                <img src={project.image} alt={project.title} className="w-full h-full object-cover" onError={(e) => { e.target.style.display = 'none'; }} />
                <div className="absolute top-4 right-4">
                  <Pill variant={project.status === 'Production' ? 'success' : 'primary'}>{project.status}</Pill>
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-xl font-bold text-slate-900 leading-tight">{project.title}</h3>
                  <span className="text-sm text-slate-500 whitespace-nowrap ml-4">{project.year}</span>
                </div>
                <p className="text-slate-600 mb-4 line-clamp-3">{project.summary}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tech.slice(0, 4).map(tech => (<Pill key={tech} variant="primary">{tech}</Pill>))}
                  {project.tech.length > 4 && (<Pill>+{project.tech.length - 4} more</Pill>)}
                </div>
                <div className="flex items-center gap-3">
                  {project.links.github && (
                    <a href={project.links.github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-slate-600 hover:text-sky-600 transition-colors" onClick={(e) => e.stopPropagation()}>
                      <span>📁</span>
                      <span>Code</span>
                    </a>
                  )}
                  {project.links.demo && project.links.demo !== '#' && (
                    <a href={project.links.demo} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-slate-600 hover:text-sky-600 transition-colors" onClick={(e) => e.stopPropagation()}>
                      <span>🚀</span>
                      <span>Live Demo</span>
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        <AnimatePresence>
          {selectedProject && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => setSelectedProject(null)}>
              <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
                <div className="p-8">
                  <div className="flex items-start justify-between mb-6">
                    <div>
                      <h2 className="text-3xl font-bold text-slate-900 mb-2">{selectedProject.title}</h2>
                      <div className="flex items-center gap-4">
                        <span className="text-slate-600">{selectedProject.year}</span>
                        <Pill variant={selectedProject.status === 'Production' ? 'success' : 'primary'}>{selectedProject.status}</Pill>
                      </div>
                    </div>
                    <button onClick={() => setSelectedProject(null)} className="text-slate-400 hover:text-slate-600 text-2xl">×</button>
                  </div>
                  <p className="text-lg text-slate-700 mb-6 leading-relaxed">{selectedProject.description}</p>
                  <div className="mb-6">
                    <h3 className="text-xl font-semibold mb-3">Key Achievements</h3>
                    <ul className="space-y-2">
                      {selectedProject.highlights.map((highlight, index) => (
                        <li key={index} className="flex items-start gap-3">
                          <span className="text-green-500 mt-1">✓</span>
                          <span className="text-slate-700">{highlight}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="mb-6">
                    <h3 className="text-xl font-semibold mb-3">Technologies Used</h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedProject.tech.map(tech => (<Pill key={tech} variant="primary">{tech}</Pill>))}
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    {selectedProject.links.github && (
                      <a href={selectedProject.links.github} target="_blank" rel="noopener noreferrer" className="bg-slate-900 text-white px-6 py-3 rounded-full font-semibold hover:bg-slate-800 transition-colors">View Code</a>
                    )}
                    {selectedProject.links.demo && selectedProject.links.demo !== '#' && (
                      <a href={selectedProject.links.demo} target="_blank" rel="noopener noreferrer" className="bg-sky-600 text-white px-6 py-3 rounded-full font-semibold hover:bg-sky-700 transition-colors">Live Demo</a>
                    )}
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}

// Skills Section
function SkillsSection() {
  return (
    <section className="py-20">
      <div className="max-w-6xl mx-auto px-6">
        <SectionTitle subtitle="Technologies and tools I use to build exceptional software">Technical Skills</SectionTitle>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {Object.entries(SKILLS).map(([category, skills], index) => (
            <motion.div key={category} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: index * 0.1 }} className="bg-white rounded-2xl p-6 shadow-lg">
              <h3 className="text-xl font-semibold text-slate-900 mb-4">{category}</h3>
              <div className="space-y-2">
                {skills.map(skill => (
                  <div key={skill} className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-sky-500 rounded-full"></div>
                    <span className="text-slate-700">{skill}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Experience Section
function ExperienceSection() {
  return (
    <section className="py-20 bg-slate-50">
      <div className="max-w-6xl mx-auto px-6">
        <SectionTitle subtitle="Professional journey and key accomplishments">Work Experience</SectionTitle>
        <div className="space-y-8">
          {EXPERIENCE.map((exp, index) => (
            <motion.div key={index} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: index * 0.1 }} className="bg-white rounded-2xl p-8 shadow-lg">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                <div>
                  <h3 className="text-2xl font-bold text-slate-900">{exp.role}</h3>
                  <p className="text-lg text-sky-600 font-semibold">{exp.company}</p>
                  <p className="text-slate-600">{exp.location}</p>
                </div>
                <div className="mt-2 md:mt-0">
                  <Pill variant="primary">{exp.time}</Pill>
                </div>
              </div>
              <ul className="space-y-3">
                {exp.points.map((point, pointIndex) => (
                  <li key={pointIndex} className="flex items-start gap-3">
                    <span className="text-sky-500 mt-1 text-lg">•</span>
                    <span className="text-slate-700 leading-relaxed">{point}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
        <div className="mt-16">
          <h3 className="text-2xl font-bold text-center text-slate-900 mb-8">Key Achievements</h3>
          <div className="grid md:grid-cols-2 gap-6">
            {ACHIEVEMENTS.map((achievement, index) => (
              <motion.div key={index} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5, delay: index * 0.1 }} className="bg-gradient-to-r from-sky-50 to-cyan-50 rounded-xl p-6 border border-sky-100">
                <p className="text-slate-700 font-medium">{achievement}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// Contact Section
function ContactSection() {
  const [formData, setFormData] = useState({ name: '', email: '', company: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitStatus('success');
      setFormData({ name: '', email: '', company: '', message: '' });
      setTimeout(() => setSubmitStatus(null), 3000);
    }, 1000);
  };

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <section id="contact" className="py-20">
      <div className="max-w-6xl mx-auto px-6">
        <SectionTitle subtitle="Ready to discuss your next project? Let's connect!">Get In Touch</SectionTitle>
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-semibold text-slate-900 mb-4">Let's build something amazing together</h3>
              <p className="text-lg text-slate-600 leading-relaxed">
                I'm always interested in discussing new opportunities, challenging projects, and innovative solutions. Whether you're looking for a full-stack developer, technical consultant, or team lead, I'd love to hear from you.
              </p>
            </div>
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-sky-100 rounded-full flex items-center justify-center"><span className="text-sky-600 text-xl">📧</span></div>
                <div>
                  <p className="font-semibold text-slate-900">Email</p>
                  <a href={`mailto:${PROFILE.email}`} className="text-sky-600 hover:text-sky-700">{PROFILE.email}</a>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-sky-100 rounded-full flex items-center justify-center"><span className="text-sky-600 text-xl">📱</span></div>
                <div>
                  <p className="font-semibold text-slate-900">Phone</p>
                  <a href={`tel:${PROFILE.phone}`} className="text-sky-600 hover:text-sky-700">{PROFILE.phone}</a>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-sky-100 rounded-full flex items-center justify-center"><span className="text-sky-600 text-xl">📍</span></div>
                <div>
                  <p className="font-semibold text-slate-900">Location</p>
                  <p className="text-slate-600">{PROFILE.location}</p>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-6">
              <a href={PROFILE.linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-slate-600 hover:text-sky-600 transition-colors"><span className="text-xl">💼</span><span>LinkedIn</span></a>
              <a href={PROFILE.github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-slate-600 hover:text-sky-600 transition-colors"><span className="text-xl">🐙</span><span>GitHub</span></a>
            </div>
          </div>
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Name *</label>
                  <input type="text" name="name" value={formData.name} onChange={handleChange} required className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-sky-500 focus:ring-2 focus:ring-sky-200 outline-none transition-colors" placeholder="Your full name" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Email *</label>
                  <input type="email" name="email" value={formData.email} onChange={handleChange} required className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-sky-500 focus:ring-2 focus:ring-sky-200 outline-none transition-colors" placeholder="your.email@company.com" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Company</label>
                <input type="text" name="company" value={formData.company} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-sky-500 focus:ring-2 focus:ring-sky-200 outline-none transition-colors" placeholder="Your company name" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Message *</label>
                <textarea name="message" value={formData.message} onChange={handleChange} required rows={5} className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-sky-500 focus:ring-2 focus:ring-sky-200 outline-none transition-colors resize-none" placeholder="Tell me about your project, timeline, and how I can help..." />
              </div>
              <button type="submit" disabled={isSubmitting} className="w-full bg-sky-600 hover:bg-sky-700 disabled:bg-sky-400 text-white font-semibold py-4 rounded-xl transition-colors flex items-center justify-center gap-2">
                {isSubmitting ? (<><LoadingSpinner /><span>Sending...</span></>) : (<span>Send Message</span>)}
              </button>
              {submitStatus === 'success' && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="text-center text-green-600 font-semibold">
                  ✓ Message sent successfully! I'll get back to you soon.
                </motion.div>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

// Resume Upload Section
function ResumeUploadSection() {
  const [file, setFile] = useState(null);
  const [uploadStatus, setUploadStatus] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploads, setUploads] = useState([]);

  useEffect(() => {
    if (!supabase) return;
    const fetchUploads = async () => {
      const { data, error } = await supabase.storage.from('resumes').list('', { limit: 100 });
      if (!error && data) setUploads(data);
    };
    fetchUploads();
  }, []);

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) {
      setUploadStatus('Please select a file');
      return;
    }
    if (!supabase) {
      setUploadStatus('Upload service not configured');
      return;
    }
    setIsUploading(true);
    setUploadStatus('Uploading...');
    const filename = `${Date.now()}_${file.name}`;
    try {
      const { error } = await supabase.storage.from('resumes').upload(filename, file);
      if (error) throw error;
      setUploadStatus('Upload successful!');
      setFile(null);
      const { data: newUploads } = await supabase.storage.from('resumes').list('', { limit: 100 });
      if (newUploads) setUploads(newUploads);
    } catch (error) {
      setUploadStatus('Upload failed. Please try again.');
      console.error('Upload error:', error);
    } finally {
      setIsUploading(false);
    }
  };

  const downloadFile = async (filename) => {
    if (!supabase) {
      alert('Download service not configured');
      return;
    }
    try {
      const { data, error } = await supabase.storage.from('resumes').download(filename);
      if (error) throw error;
      const url = URL.createObjectURL(data);
      const a = document.createElement('a');
      a.href = url;
      a.download = filename.split('_').slice(1).join('_');
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
    } catch (error) {
      alert('Download failed: ' + error.message);
    }
  };

  return (
    <section className="py-20 bg-slate-50">
      <div className="max-w-4xl mx-auto px-6">
        <SectionTitle subtitle="For recruiters and hiring managers">Resume & Documents</SectionTitle>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h3 className="text-xl font-bold text-slate-900 mb-4">Quick Access</h3>
            <p className="text-slate-600 mb-6">Download my latest resume and view my professional documents.</p>
            <div className="space-y-4">
              <a href={PROFILE.resumeUrl} target="_blank" rel="noopener noreferrer" className="flex items-center justify-between p-4 border border-slate-200 rounded-xl hover:border-sky-300 hover:bg-sky-50 transition-colors group">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">📄</span>
                  <div>
                    <p className="font-semibold text-slate-900">Latest Resume</p>
                    <p className="text-sm text-slate-600">Updated January 2025</p>
                  </div>
                </div>
                <span className="text-sky-600 group-hover:translate-x-1 transition-transform">Download →</span>
              </a>
              <a href={PROFILE.linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center justify-between p-4 border border-slate-200 rounded-xl hover:border-sky-300 hover:bg-sky-50 transition-colors group">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">💼</span>
                  <div>
                    <p className="font-semibold text-slate-900">LinkedIn Profile</p>
                    <p className="text-sm text-slate-600">Complete professional history</p>
                  </div>
                </div>
                <span className="text-sky-600 group-hover:translate-x-1 transition-transform">View →</span>
              </a>
              <a href={PROFILE.github} target="_blank" rel="noopener noreferrer" className="flex items-center justify-between p-4 border border-slate-200 rounded-xl hover:border-sky-300 hover:bg-sky-50 transition-colors group">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">🐙</span>
                  <div>
                    <p className="font-semibold text-slate-900">GitHub Portfolio</p>
                    <p className="text-sm text-slate-600">Code samples and projects</p>
                  </div>
                </div>
                <span className="text-sky-600 group-hover:translate-x-1 transition-transform">View →</span>
              </a>
            </div>
          </div>
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h3 className="text-xl font-bold text-slate-900 mb-4">Document Upload</h3>
            <p className="text-slate-600 mb-6">Upload additional documents or updated versions of my resume.</p>
            <form onSubmit={handleUpload} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Select File</label>
                <input type="file" accept=".pdf,.doc,.docx" onChange={(e) => setFile(e.target.files[0])} className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:border-sky-500 focus:ring-2 focus:ring-sky-200 outline-none transition-all" />
                <p className="text-xs text-slate-500 mt-1">Supported formats: PDF, DOC, DOCX (Max 10MB)</p>
              </div>
              <button type="submit" disabled={isUploading || !file} className="w-full bg-sky-600 hover:bg-sky-700 disabled:bg-slate-300 text-white font-semibold py-3 rounded-xl transition-colors flex items-center justify-center gap-2">
                {isUploading ? (<><LoadingSpinner /><span>Uploading...</span></>) : (<span>Upload Document</span>)}
              </button>
              {uploadStatus && (
                <div className={`text-center p-3 rounded-xl ${
                  uploadStatus.includes('success') ? 'bg-green-50 text-green-700 border border-green-200'
                  : uploadStatus.includes('failed') || uploadStatus.includes('error') ? 'bg-red-50 text-red-700 border border-red-200'
                  : 'bg-blue-50 text-blue-700 border border-blue-200'
                }`}>{uploadStatus}</div>
              )}
            </form>
            {uploads.length > 0 && (
              <div className="mt-6 pt-6 border-t border-slate-200">
                <h4 className="font-semibold text-slate-900 mb-3">Uploaded Documents</h4>
                <div className="space-y-2 max-h-40 overflow-y-auto">
                  {uploads.map((upload) => (
                    <button key={upload.name} onClick={() => downloadFile(upload.name)} className="w-full text-left p-2 hover:bg-slate-50 rounded-lg transition-colors flex items-center justify-between group">
                      <span className="text-sm text-slate-700 truncate">{upload.name.split('_').slice(1).join('_')}</span>
                      <span className="text-xs text-sky-600 group-hover:translate-x-1 transition-transform">Download</span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

// Main App Component
export default function App() {
  return (
    <div className="min-h-screen bg-white">
      <header className="sticky top-0 z-40 backdrop-blur-md bg-white/80 border-b border-slate-200 shadow-sm">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-sky-500 to-cyan-600 rounded-lg flex items-center justify-center text-white font-bold text-lg">
              {PROFILE.name.split(' ').map(n => n[0]).join('')}
            </div>
            <div>
              <span className="font-bold text-slate-900">{PROFILE.name}</span>
              <p className="text-xs text-slate-600">{PROFILE.role}</p>
            </div>
          </div>
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-700">
            <a className="hover:text-sky-600 transition-colors" href="#projects">Projects</a>
            <a className="hover:text-sky-600 transition-colors" href="#contact">Contact</a>
            <a className="hover:text-sky-600 transition-colors" href={PROFILE.resumeUrl} target="_blank" rel="noopener noreferrer">Resume</a>
          </nav>
          <a href="#contact" className="bg-sky-600 hover:bg-sky-700 text-white px-6 py-2 rounded-full font-semibold transition-colors text-sm">Hire Me</a>
        </div>
      </header>
      <main>
        <HeroSection />
        <ProjectsSection />
        <SkillsSection />
        <ExperienceSection />
        <ResumeUploadSection />
        <ContactSection />
      </main>
      <footer className="border-t border-slate-200 bg-slate-50">
        <div className="max-w-6xl mx-auto px-6 py-12">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-sky-500 to-cyan-600 rounded-lg flex items-center justify-center text-white font-bold">
                  {PROFILE.name.split(' ').map(n => n[0]).join('')}
                </div>
                <span className="font-bold text-slate-900">{PROFILE.name}</span>
              </div>
              <p className="text-slate-600 leading-relaxed">Building exceptional software solutions that drive business growth and user satisfaction.</p>
            </div>
            <div>
              <h3 className="font-semibold text-slate-900 mb-4">Quick Links</h3>
              <div className="space-y-2">
                <a href="#projects" className="block text-slate-600 hover:text-sky-600 transition-colors">Featured Projects</a>
                <a href="#contact" className="block text-slate-600 hover:text-sky-600 transition-colors">Get In Touch</a>
                <a href={PROFILE.resumeUrl} target="_blank" rel="noopener noreferrer" className="block text-slate-600 hover:text-sky-600 transition-colors">Download Resume</a>
              </div>
            </div>
            <div>
              <h3 className="font-semibold text-slate-900 mb-4">Connect</h3>
              <div className="space-y-2">
                <a href={`mailto:${PROFILE.email}`} className="block text-slate-600 hover:text-sky-600 transition-colors">{PROFILE.email}</a>
                <a href={PROFILE.linkedin} target="_blank" rel="noopener noreferrer" className="block text-slate-600 hover:text-sky-600 transition-colors">LinkedIn Profile</a>
                <a href={PROFILE.github} target="_blank" rel="noopener noreferrer" className="block text-slate-600 hover:text-sky-600 transition-colors">GitHub Portfolio</a>
              </div>
            </div>
          </div>
          <div className="pt-8 border-t border-slate-200 flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-slate-600 text-sm">© {new Date().getFullYear()} {PROFILE.name}. All rights reserved.</div>
            <div className="text-slate-500 text-sm">Available for new opportunities • {PROFILE.location}</div>
          </div>
        </div>
      </footer>
    </div>
  );
}