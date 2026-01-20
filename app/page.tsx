/* Portfolio.jsx
   Single-file React component containing all sections.
   Requires React 18+.
*/
"use client";
// Portfolio.jsx
import { 
  FaCode, FaMobileAlt,  FaCheckCircle,FaRobot, FaPencilRuler, FaTasks }from 'react-icons/fa';
import emailjs from '@emailjs/browser';

import React, { useEffect, useRef, useState } from "react";
import "./globals.css";
import AnimatedBackground from "./AnimatedBackground";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Portfolio() {
 

  // Refs for reveal animations
  const sectionsRef = useRef([]);
  sectionsRef.current = [];

  const addSectionRef = el => {
    if (el && !sectionsRef.current.includes(el)) {
      sectionsRef.current.push(el);
    }
  };

  // Particle canvas ref
  const canvasRef = useRef(null);

  // State for project category filter
  const [projCategory, setProjCategory] = useState("Web");
  
  // State for image lightbox
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxImage, setLightboxImage] = useState(null);
  const [lightboxProject, setLightboxProject] = useState(null);

  // Example project pagination
 const allProjects = [
 

  {
    category: "Web",
    title: "Market Pro",
    desc: "Real-time financial dashboard for stock performance",
    tech: ["React", "Recharts", "Lucide", ],
    image: "/assets/marketpro.png",
    github: "https://github.com/Batoolsyedaz/MarketPro",
    live: "https://market-pro-phi.vercel.app/"
  },

  {
    category: "Web",
    title: "Beauty Diary ",
   desc: "A personal beauty diary app where users can log skincare routines, track product usage, save daily looks, and monitor skin progress with a clean and aesthetic UI.",

   tech: [
  "React.js",
  "React Hooks",
  "Local Storage",
  "Tailwind CSS",
  "Framer Motion"
],

    image: "/assets/beauty.png",
    github: "https://github.com/Batoolsyedaz/beauty-diary",
    live: "https://beauty-diary.vercel.app/"
  },
   {
    category: "Web",
    title: "StudyHub",
    desc: "Student dashboard web app",
    tech: [
  "React.js",
  "Express.js",
  "MongoDB",
  "JWT Auth",
  "Tailwind CSS",
  "Axios"
],

    image: "/assets/studyyhub.png",
    github: "https://github.com/Batoolsyedaz/StudyHub",
    live: "https://study-hub-ud7r.vercel.app/"
  },
 {
    category: "Mobile",
    title: "Coffee shop ",
  desc: "A React Native Expo app with modern navigation using Stack, Bottom Tabs, and Top Tabs. Explore coffee categories, shop products, and manage your profile with smooth UX and beautiful icons.",

 tech: [
  "React Native",
  "Expo",
  "React Navigation (Stack, Bottom Tabs, Top Tabs)",
  "Ionicons",
  "Context API",
  "AsyncStorage",
  "Styled Components "
],


    image: "/assets/coffee.png",
    github: "https://github.com/Batoolsyedaz/coffee-shop",
    live: "https://coffee-shop-two-green.vercel.app/"
  },

  {
    category: "AI/ML",
    title: "Nephronyx",
    desc: "Kidney disease detection",
    tech: ["Python", "TensorFlow","Resnet-50"],
    image: "/assets/kidney.png",
    github: "https://github.com/Batoolsyedaz/Nephronyx",
    live: "https://github.com/Batoolsyedaz/Nephronyx"
  },
 {
    category: "AI/ML",
    title: "Helper AI",
    desc: " React-based AI Chat Application featuring multi-conversation support, local/offline responses, dark mode, and OpenAI API integration",
  tech: [
  "React.js",
  "Next.js",
  "Tailwind CSS",
  "Node.js",
  "Express.js",
  "OpenAI API",
 
  "Axios",

  "Vercel Deployment"
],

    image: "/assets/aihelp.png",
    github: "https://github.com/Batoolsyedaz/Helper-AI",
    live: "https://helper-ai-k686.vercel.app/"
  },
  {
    category: "Graphic",
    title: "Brand Identity System",
    desc: "Complete branding design for Coffee startup",
    tech: ["Figma", "Illustrator"],
    image: "/assets/Branding.png",
    github: "#",
    live: "#"
  },
  {
    category: "Graphic",
    title: "Business Card Design",
    desc: "Professional business card layout for a lawyer",
    tech: ["Figma", "Illustrator"],
    image: "/assets/Lawyer.png",
    github: "#",
    live: "#"
  },
  {
    category: "Graphic",
    title: "Brochure Design",
    desc: "Creative brochure for marketing campaigns",
    tech: ["Figma", "Photoshop", "Illustrator"],
    image: "/assets/Brochure.png",
    github: "#",
    live: "#"
  },
  {
    category: "Graphic",
    title: "Volleyball Poster",
    desc: "Event flyer design for volleyball tournament",
    tech: ["Canva", "Photoshop", "Illustrator"],
    image: "/assets/Poster.png",
    github: "#",
    live: "#"
  },
  {
    category: "Graphic",
    title: "Dental Care Logo",
    desc: "Modern logo design for dental clinic branding",
    tech: ["Illustrator", "Figma"],
    image: "/assets/ModernDentalCareLogoInstagramPost.png",
    github: "#",
    live: "#"
  },
  {
    category: "Graphic",
    title: "Food Promotion Post",
    desc: "highlights discounts, special deals, or offers.",
    tech: ["Photoshop", "Illustrator", "Figma"],
    image: "/assets/FOOD.png",
    github: "#",
    live: "#"
  },
  {
    category: "Graphic",
    title: "Website UI Mockup",
    desc: "High-fidelity UI mockup for web applications",
    tech: ["Figma", "Adobe XD", "Illustrator"],
    image: "/assets/UI_Mockup.png",
    github: "#",
    live: "#"
  }
];

  // Open lightbox
  const openLightbox = (project) => {
    console.log('Opening lightbox for:', project.title);
    setLightboxImage(project.image);
    setLightboxProject(project);
    setLightboxOpen(true);
    document.body.style.overflow = 'hidden';
  };

  // Close lightbox
  const closeLightbox = () => {
    setLightboxOpen(false);
    setLightboxImage(null);
    setLightboxProject(null);
    document.body.style.overflow = 'auto';
  };

  // ESC key to close lightbox
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && lightboxOpen) {
        closeLightbox();
      }
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [lightboxOpen]);

  // On component mount: scroll animations & particle init
  useEffect(() => {
    // GSAP reveal animations
    sectionsRef.current.forEach((sec, idx) => {
      gsap.from(sec, {
        autoAlpha: 0,
        y: 40,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: sec,
          start: "top 80%",
          toggleActions: "play none none reverse"
        }
      });
    });

    // Particle canvas
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let w = (canvas.width = window.innerWidth);
    let h = (canvas.height = window.innerHeight);

    let particles = [];
    const colors = ["#00e0ff22", "#ff6bcb22", "#c792ea22", "#f8c29122"];
    function initParticles() {
      particles = [];
      for (let i = 0; i < Math.min(80, Math.floor(w / 14)); i++) {
        particles.push({
          x: Math.random() * w,
          y: Math.random() * h,
          vx: (Math.random() - 0.5) * 0.7,
          vy: (Math.random() - 0.5) * 0.7,
          r: Math.random() * 3 + 0.6,
          color: colors[Math.floor(Math.random() * colors.length)],
        });
      }
    }
    initParticles();
    const mouse = { x: -9999, y: -9999 };
    function resize() {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;

      initParticles();
    }
    window.addEventListener("resize", resize);
    canvas.addEventListener("mousemove", e => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    });
    canvas.addEventListener("mouseleave", () => {
      mouse.x = -9999;
      mouse.y = -9999;
    });

    let raf;
    function animate() {
      ctx.clearRect(0,0,w,h);
      particles.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < -10) p.x = w + 10;
        if (p.x > w + 10) p.x = -10;
        if (p.y < -10) p.y = h + 10;
        if (p.y > h + 10) p.y = -10;
        const dx = mouse.x - p.x;
        const dy = mouse.y - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 140) {
          p.vx += (dx * 0.0009);
          p.vy += (dy * 0.0009);
        }
        ctx.beginPath();
        ctx.fillStyle = p.color;
        ctx.shadowColor = p.color;
        ctx.shadowBlur = 5;
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      });
      raf = requestAnimationFrame(animate);
    }
    animate();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  // 3D tilt effect handlers
  const handleTilt = e => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const cx = rect.width/2;
    const cy = rect.height/2;
    const dx = (x - cx)/cx;
    const dy = (y - cy)/cy;
    card.style.transform = `perspective(900px) rotateX(${(-dy*6).toFixed(2)}deg) rotateY(${(dx*6).toFixed(2)}deg) scale(1.02)`;
    card.style.boxShadow = `${-dx*15}px ${dy*15}px 30px rgba(0,0,0,0.25)`;
  };
  const resetTilt = e => {
    const card = e.currentTarget;
    card.style.transform = `perspective(900px) rotateX(0) rotateY(0) scale(1)`;
    card.style.boxShadow = `0 0 12px rgba(0,0,0,0.1)`;
  };

  // Download CV handler (assuming file in /assets/Syedabatool_CV.pdf)
  const cvLink = "/assets/SyedaBatoolFatima_CV.pdf";

  // Contact form handler
const handleContactSubmit = (e) => {
  e.preventDefault();

  emailjs.sendForm(
    'service_hq2d1oa',   // Replace with your EmailJS service ID
    'template_lkc9p1b',  // Replace with your EmailJS template ID
    e.target,            // The form element
    'VHqNmrDRkrFAPKrQi'    // Replace with your EmailJS public key
  )
  .then((result) => {
    console.log('Email sent:', result.text);
    alert('Message sent successfully! 💌');
    e.target.reset(); // Reset the form after sending
  }, (error) => {
    console.error('Email sending error:', error.text);
    alert('Oops! Something went wrong... 😢');
  });
};

  return ( 
    
    <div >
        <AnimatedBackground />

      {/* <div class="animated-bg">
    <div class="orb orb1"></div>
    <div class="orb orb2"></div>
    <div class="orb orb3"></div>
  </div> */}
      {/* Canvas background for hero */}
      <canvas className="hero-canvas" ref={canvasRef} />

      {/* Navigation */}
      <nav className="navbar">
        <div className="brand">Syeda Batool</div>
        <ul className="nav-links">
          <li><a href="#home">Home</a></li>
          <li><a href="#about">About</a></li>
          <li><a href="#skills">Skills</a></li>
          <li><a href="#projects">Projects</a></li>
          <li><a href="#research">Research</a></li>
          <li><a href="#achievements">Achievements</a></li>
          <li><a href="#contact" className="cta">Contact</a></li>
        </ul>
        <button className="nav-toggle" aria-label="Toggle menu" onClick={()=>{
          document.querySelector('.nav-links').classList.toggle('open');
        }}>☰</button>
      </nav>

      {/* Hero */}
      <header id="home" className="hero section" ref={addSectionRef}>
        
        <div className="hero-inner">
          <h1 className="hero-title">Hi, I'm <span className="highlight">Syeda Batool</span></h1>
          <p className="hero-subtitle">Innovating with Technology, Design & Creativity.</p>
          <div className="hero-buttons">
            <a href={cvLink} className="btn primary" download>Download CV</a>
            <a href="#projects" className="btn secondary">View Projects</a>
          </div>
        </div>
      </header>

      {/* About */}
      <section id="about" className="section about" ref={addSectionRef}>
        <h2>About Me</h2>
        <div className="about-grid">
          <div className="about-text">
         <p>I'm a passionate Software Engineer, Graphic Designer & AI enthusiast with a Bachelor's in Software Engineering from <strong>COMSATS University Islamabad</strong> (CGPA 3.74), and currently pursuing an MS in Computer Science with a specialization in AI. I love blending technology and design to create user-friendly applications and intelligent digital experiences. Skilled in full-stack development, AI/ML, and UI/UX, I enjoy building solutions that are both functional and visually appealing.  

Driven by curiosity and creativity, I continuously explore emerging technologies and innovative approaches to solve real-world problems. I thrive on learning, collaborating, and delivering digital solutions that leave a lasting impact.</p>

          </div>
        <div className="about-timeline">
  <div className="tl-item">2025 – Currently pursuing MS in Computer Science (AI Specialization) at COMSATS University Islamabad</div>
  <div className="tl-item">2025 – Completed Bachelor's in Software Engineering at COMSATS University Islamabad</div>
  <div className="tl-item">2024 – Campus Honour Roll (CGPA 3.74)</div>
  <div className="tl-item">2022 – Freelance Projects: Web, Mobile & Graphic Design</div>
  <div className="tl-item">2020 – Built Personal Projects exploring AI & Web Development</div>
</div>


        </div>
      </section>

      {/* Skills */}
<section id="skills" className="section skills" ref={addSectionRef}>
  <h2 className="section-title">Skills & Expertise</h2>
  <p className="section-subtitle">
    Bridging design, development, and artificial intelligence with innovation ⚡
  </p>

  <div className="skills-container">
    {[
      {
        category: "Web Development",
        description: "Crafting responsive, performant, and elegant web apps.",
        icon: FaCode,
      color: "#007ACC",
      tools: ["React.js", "Next.js", "HTML", "CSS", "JavaScript", "Node.js","Express.js"],
      },
      {
        category: "Mobile Development",
        description: "Building seamless mobile experiences across platforms.",
       icon: FaMobileAlt,
      color: "#34D399",
       tools: ["React Native", "Axios", "Firebase", "App Deployment"],
      },
      {
        category: "AI / ML / NLP",
        description: "Leveraging data, models, and intelligence to power ideas.",
        icon: FaRobot,
      color: "#FF6F00",
      tools: ["TensorFlow", "Python","Keras", "NLP", "Zero-shot", "Few-shot Learning"],
      },
      {
        category: "UI / UX & Design",
        description: "Designing intuitive, aesthetic, and functional interfaces.",
        icon: FaPencilRuler,
      color: "#A259FF",
      tools: ["Figma", "Photoshop", "Illustrator", "Canva", "Brand Identity"],
      },
      {
  category: "Software Testing / SQA",
  description: "Ensuring quality, reliability, and flawless software delivery.",
  icon: FaCheckCircle,  // You can import this from react-icons/fa
  color: "#00BFFF",
  tools: ["Selenium", "Junit", "Sikuli", "Manual Testing", "Postman", "Bug Tracking"]
}
,
      {
        category: "Project Management",
        description: "Leading with structure, agility, and teamwork in focus.",
       icon: FaTasks,
      color: "#F05032",
       tools: ["Agile", "Scrum", "Jira","Leadership", "Collaboration"],
      },
    ].map((skillGroup, index) => (
            <div 
              className="skill-card" 
              key={index} 
              style={{ '--accent-color': skillGroup.color }}
            >
              <div className="skill-header">
                <skillGroup.icon className="category-icon" /> 
                <h3>{skillGroup.category}</h3>
                <p className="category-description">{skillGroup.description}</p>
              </div>
              
              <div className="skill-tools">
                {skillGroup.tools.map((tool, idx) => (
                  <span className="skill-tag" key={idx}>
                    {tool}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Projects */}
      <section id="projects" className="section projects" ref={addSectionRef}>
        <h2>Projects</h2>
        <div className="project-filter">
          {["Web","Mobile","AI/ML","Graphic"].map(cat => (
            <button key={cat} className={`filter-btn ${projCategory===cat?"active":""}`} onClick={()=>setProjCategory(cat)}>{cat}</button>
          ))}
        </div>
        <div className="projects-grid">
          {allProjects.filter(p=>p.category === projCategory).map(p=>(
            <div key={p.title} className="project-card" onMouseMove={handleTilt} onMouseLeave={resetTilt}>
              <div 
                className="project-image" 
                style={{
                  backgroundImage: `url(${p.image})`,
                  cursor: projCategory === "Graphic" ? "zoom-in" : "default"
                }}
                onClick={() => {
                  if (projCategory === "Graphic") {
                    openLightbox(p);
                  }
                }}
              />
              <div className="project-info">
                <h3>{p.title}</h3>
                <p>{p.desc}</p>
                <div className="project-tech">{p.tech.join(" • ")}</div>
                <div className="project-links">
                  {projCategory === "Graphic" ? (
                    <>
                      <button onClick={(e) => {
                        e.preventDefault();
                        openLightbox(p);
                      }} className="btn primary">View Full</button>
                     
                    </>
                  ) : (
                    <>
                      <a href={p.github} className="btn tiny">GitHub</a>
                      <a href={p.live} className="btn tiny ghost">Live</a>
                    </>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Research */}
     <section id="research" className="section research" ref={addSectionRef}>
  <h2>Research Interests</h2>
  <div className="research-grid">
    <div className="research-card" onMouseMove={handleTilt} onMouseLeave={resetTilt}>
      <h3>Human-AI Collaboration in Creative Systems</h3>
      <p>Exploring mixed-initiative workflows where humans and AI collaborate in creative processes, focusing on design assistance, co-creation tools, and intelligent systems that augment human creativity.</p>
    </div>
    <div className="research-card" onMouseMove={handleTilt} onMouseLeave={resetTilt}>
      <h3>NLP for Low-Resource Languages</h3>
      <p>Investigating zero-shot and few-shot learning techniques to improve natural language processing capabilities for underrepresented languages, particularly South Asian languages.</p>
    </div>
    <div className="research-card" onMouseMove={handleTilt} onMouseLeave={resetTilt}>
      <h3>Intelligent User Interfaces</h3>
      <p>Designing adaptive and context-aware interfaces that learn from user behavior to provide personalized experiences and improve interaction efficiency.</p>
    </div>
  </div>
</section>

      {/* Achievements */}
      <section id="achievements" className="section achievements" ref={addSectionRef}>
        <h2>Achievements & Awards</h2>
        <div className="achievements-grid">
          <div className="achievement-card">
            <strong>CGPA</strong><p>3.74</p>
          </div>
          <div className="achievement-card">
            <strong>Projects Completed</strong><p>15+</p>
          </div>
          <div className="achievement-card">
            <strong>Certifications</strong><p>8+</p>
          </div>
          <div className="achievement-card">
            <strong>Experience</strong><p>3 yrs</p>
          </div>
        </div>
      </section>

      {/* Contact */}
     {/* Contact */}
<section id="contact" className="section contact" ref={addSectionRef}>
  <h2>Contact Me</h2>
  <div className="contact-grid">
    {/* Contact Form */}
    <form className="contact-form" onSubmit={handleContactSubmit}>
      <div className="field">
        <input type="text" name="user_name" placeholder="Your Name" required />
      </div>
      <div className="field">
        <input type="email" name="user_email" placeholder="Your Email" required />
      </div>
      <div className="field">
        <textarea name="message" placeholder="Your Message" required></textarea>
      </div>
      <button type="submit" className="btn primary">Send Message</button>
    </form>

    {/* Contact Info / Socials */}
    <div className="contact-info">
      <p>Feel free to reach out for collaboration in software, design, or AI research. 💌</p>
      <div className="socials">
        <a href="https://www.linkedin.com/in/syeda-batool-448123334" target="_blank" rel="noopener noreferrer">
  LinkedIn
</a>
   <a href="https://github.com/Batoolsyedaz" target="_blank" rel="noopener noreferrer">GitHub</a>
        <a href="batoolsyeda495@gmail.com">Email</a>
      </div>
    </div>
  </div>
</section>


      {/* Footer */}
      <footer className="footer">
        © {new Date().getFullYear()} Syeda Batool • 
      </footer>

      {/* Lightbox Modal */}
      {lightboxOpen && (
        <div 
          className="lightbox-overlay" 
          onClick={closeLightbox}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            background: 'rgba(0, 0, 0, 0.95)',
            zIndex: 10000,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '2rem'
          }}
        >
          <button 
            className="lightbox-close" 
            onClick={closeLightbox} 
            aria-label="Close"
            style={{
              position: 'fixed',
              top: '2rem',
              right: '2rem',
              width: '50px',
              height: '50px',
              background: 'rgba(255, 255, 255, 0.2)',
              border: '2px solid rgba(255, 255, 255, 0.3)',
              borderRadius: '50%',
              color: 'white',
              fontSize: '24px',
              cursor: 'pointer',
              zIndex: 10002,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            ✕
          </button>
          <div 
            className="lightbox-content" 
            onClick={(e) => e.stopPropagation()}
            style={{
              maxWidth: '90vw',
              maxHeight: '90vh',
              display: 'flex',
              flexDirection: 'column',
              gap: '1.5rem'
            }}
          >
            <img 
              src={lightboxImage} 
              alt={lightboxProject?.title} 
              className="lightbox-image"
              style={{
                maxWidth: '100%',
                maxHeight: '70vh',
                width: 'auto',
                height: 'auto',
                objectFit: 'contain',
                borderRadius: '12px',
                boxShadow: '0 20px 60px rgba(0, 0, 0, 0.5)',
                border: '2px solid rgba(255, 255, 255, 0.1)'
              }}
            />
            <div 
              className="lightbox-info"
              style={{
                background: 'rgba(255, 255, 255, 0.05)',
                padding: '1.5rem',
                borderRadius: '12px',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                maxWidth: '600px',
                margin: '0 auto',
                color: 'white'
              }}
            >
              <h3 style={{ margin: '0 0 0.5rem 0' }}>{lightboxProject?.title}</h3>
              <p style={{ color: 'rgba(255, 255, 255, 0.8)', margin: '0 0 1rem 0' }}>{lightboxProject?.desc}</p>
              <div className="lightbox-tech" style={{ color: 'rgba(255, 255, 255, 0.6)' }}>
                {lightboxProject?.tech.join(" • ")}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}