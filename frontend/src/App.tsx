import { useState, useEffect } from 'react';
import ChatBox from './components/ChatBox';
import { Github, Linkedin, Mail, Phone, Sparkles, Code2, Brain, Cloud, GraduationCap, Award, Briefcase } from 'lucide-react';

function App() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const skills = [
    { icon: <Code2 size={24} />, name: "Web Development", items: ["React", "Flask", "Django", "REST APIs"], color: "from-blue-500 to-cyan-500" },
    { icon: <Brain size={24} />, name: "AI/ML", items: ["TensorFlow", "Scikit-learn", "Deep Learning", "NLP"], color: "from-purple-500 to-pink-500" },
    { icon: <Cloud size={24} />, name: "Cloud Services", items: ["AWS EC2", "S3", "Lambda", "Cloud Architecture"], color: "from-orange-500 to-yellow-500" },
  ];

  const certifications = [
    { title: "Machine Learning", issuer: "IBM", icon: "🤖" },
    { title: "AWS Cloud Foundations", issuer: "AWS Academy", icon: "☁️" },
    { title: "Python Programming", issuer: "Google", icon: "🐍" },
  ];

  const projects = [
    { 
      title: "Business Sentiment Analysis", 
      desc: "Flask web app analyzing real-time sentiment from news, Twitter & Reddit",
      tags: ["Flask", "APIs", "React", "AJAX"],
      color: "from-blue-600 to-blue-400"
    },
    { 
      title: "Agro-Vision", 
      desc: "AI-driven crop health monitoring & price forecasting system",
      tags: ["TensorFlow", "Python", "ML", "Dashboard"],
      color: "from-green-600 to-emerald-400"
    },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-white overflow-x-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-pink-500/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '4s' }} />
        
        {/* Gradient mesh */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-purple-900/20 to-pink-900/20" />
      </div>

      {/* Content */}
      <div className={`relative z-10 transition-all duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
        
        {/* Header/Hero Section */}
        <header className="container mx-auto px-4 pt-12 pb-8">
          <div className="text-center mb-12">
            {/* Profile Image */}
            <div className="inline-block mb-6 relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-full blur opacity-75 group-hover:opacity-100 transition duration-1000 animate-pulse" />
              <div className="relative w-32 h-32 rounded-full bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 flex items-center justify-center text-5xl font-bold shadow-2xl">
                JB
              </div>
            </div>

            {/* Name */}
            <h1 className="text-5xl md:text-7xl font-bold mb-4 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent animate-gradient">
              Juily Bagate
            </h1>
            
            {/* Subtitle */}
            <p className="text-xl md:text-2xl text-slate-300 mb-8 max-w-3xl mx-auto">
              Computer Science Engineering Student | AI/ML Enthusiast | Full Stack Developer
            </p>

            {/* Contact Buttons */}
            <div className="flex flex-wrap justify-center gap-4 mb-12">
              <a href="mailto:bagatejuily15@gmail.com" 
                 className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 rounded-xl font-medium transition-all duration-300 transform hover:scale-105 shadow-lg shadow-blue-500/25">
                <Mail size={20} />
                <span>Email</span>
              </a>
              <a href="tel:+919082123060" 
                 className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-purple-500 hover:from-purple-500 hover:to-purple-400 rounded-xl font-medium transition-all duration-300 transform hover:scale-105 shadow-lg shadow-purple-500/25">
                <Phone size={20} />
                <span>+91 9082123060</span>
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer"
                 className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-pink-600 to-pink-500 hover:from-pink-500 hover:to-pink-400 rounded-xl font-medium transition-all duration-300 transform hover:scale-105 shadow-lg shadow-pink-500/25">
                <Linkedin size={20} />
                <span>LinkedIn</span>
              </a>
              <a href="https://github.com" target="_blank" rel="noopener noreferrer"
                 className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-slate-700 to-slate-600 hover:from-slate-600 hover:to-slate-500 rounded-xl font-medium transition-all duration-300 transform hover:scale-105 shadow-lg">
                <Github size={20} />
                <span>GitHub</span>
              </a>
            </div>
          </div>
        </header>

        {/* Skills Section */}
        <section className="container mx-auto px-4 py-12 mb-8">
          <h2 className="text-3xl font-bold text-center mb-8 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Technical Skills
          </h2>
          <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {skills.map((skill, idx) => (
              <div key={idx} className="group relative">
                <div className={`absolute -inset-0.5 bg-gradient-to-r ${skill.color} rounded-2xl blur opacity-30 group-hover:opacity-75 transition duration-500`} />
                <div className="relative p-6 bg-slate-900/90 backdrop-blur-xl rounded-2xl border border-slate-700 hover:border-slate-600 transition-all duration-300 transform hover:-translate-y-1">
                  <div className={`inline-flex p-3 rounded-xl bg-gradient-to-r ${skill.color} mb-4`}>
                    {skill.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-3">{skill.name}</h3>
                  <div className="flex flex-wrap gap-2">
                    {skill.items.map((item, i) => (
                      <span key={i} className="px-3 py-1 bg-slate-800 rounded-lg text-sm text-slate-300">
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Certifications Section */}
        <section className="container mx-auto px-4 py-12 mb-8">
          <h2 className="text-3xl font-bold text-center mb-8 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            Certifications
          </h2>
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {certifications.map((cert, idx) => (
              <div key={idx} className="p-6 bg-slate-800/50 backdrop-blur-xl rounded-2xl border border-slate-700 hover:border-purple-500/50 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-xl hover:shadow-purple-500/10">
                <div className="text-4xl mb-3">{cert.icon}</div>
                <h3 className="font-bold text-lg mb-1">{cert.title}</h3>
                <p className="text-slate-400 text-sm">{cert.issuer}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Projects Section */}
        <section className="container mx-auto px-4 py-12 mb-8">
          <h2 className="text-3xl font-bold text-center mb-8 bg-gradient-to-r from-pink-400 to-orange-400 bg-clip-text text-transparent flex items-center justify-center gap-3">
            <Briefcase size={32} />
            Projects
          </h2>
          <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {projects.map((project, idx) => (
              <div key={idx} className="group relative">
                <div className={`absolute -inset-0.5 bg-gradient-to-r ${project.color} rounded-2xl blur opacity-30 group-hover:opacity-75 transition duration-500`} />
                <div className="relative p-6 bg-slate-900/90 backdrop-blur-xl rounded-2xl border border-slate-700 hover:border-slate-600 transition-all duration-300">
                  <h3 className="text-xl font-bold mb-3 bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
                    {project.title}
                  </h3>
                  <p className="text-slate-300 mb-4">{project.desc}</p>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag, i) => (
                      <span key={i} className={`px-3 py-1 bg-gradient-to-r ${project.color} rounded-lg text-sm font-medium`}>
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Education & Experience */}
        <section className="container mx-auto px-4 py-12 mb-8">
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            <div className="p-6 bg-slate-800/50 backdrop-blur-xl rounded-2xl border border-slate-700">
              <div className="flex items-center gap-3 mb-4">
                <GraduationCap size={28} className="text-blue-400" />
                <h3 className="text-xl font-bold">Education</h3>
              </div>
              <div className="space-y-4">
                <div>
                  <p className="font-semibold text-white">BTech in Computer Science</p>
                  <p className="text-slate-400">MIT ADT University, Pune</p>
                  <p className="text-sm text-slate-500">Expected 2026</p>
                </div>
              </div>
            </div>

            <div className="p-6 bg-slate-800/50 backdrop-blur-xl rounded-2xl border border-slate-700">
              <div className="flex items-center gap-3 mb-4">
                <Award size={28} className="text-purple-400" />
                <h3 className="text-xl font-bold">Experience</h3>
              </div>
              <div>
                <p className="font-semibold text-white">AI-ML Virtual Internship</p>
                <p className="text-slate-400">AICTE × EduSkills</p>
                <p className="text-sm text-slate-500">Jul–Sep 2025</p>
              </div>
            </div>
          </div>
        </section>

        {/* AI Chat Section */}
        <section className="container mx-auto px-4 py-12 mb-12">
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold mb-3 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent flex items-center justify-center gap-3">
              <Sparkles size={36} className="animate-pulse" />
              Juily's AI Assistant
            </h2>
            <p className="text-slate-400">Ask me anything about my skills, projects, and experience!</p>
          </div>
          
          <ChatBox />
        </section>

        {/* Footer */}
        <footer className="container mx-auto px-4 py-8 text-center text-slate-500 border-t border-slate-800">
          <p className="flex items-center justify-center gap-2 mb-2">
            <Sparkles size={16} className="text-blue-400" />
            Powered by AI • Built with Modern Tech
          </p>
          <p className="text-sm">© 2026 Juily Bagate. All rights reserved.</p>
        </footer>
      </div>
    </div>
  );
}

export default App;