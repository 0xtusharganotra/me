import React from "react";
import {
  Github,
  Linkedin,
  Code,
  Mail,
  FileText,
  Sparkles,
  Terminal,
  Cpu,
  Database,
  Cloud,
  Layout,
} from "lucide-react";
import { motion } from "framer-motion";
import { GitHubCalendar } from "react-github-calendar";
import { useTheme } from "../hooks/useTheme";

export const Home: React.FC = () => {
  const { theme } = useTheme();

  const skills = [
    {
      category: "Languages",
      icon: <Terminal size={16} />,
      items: ["TypeScript", "JavaScript", "Python", "C++", "SQL", "C"],
    },
    {
      category: "Core Stack",
      icon: <Layout size={16} />,
      items: ["React", "Node.js", "Express.js", "FastAPI", "Next.js"],
    },
    {
      category: "Backend & Systems",
      icon: <Cpu size={16} />,
      items: ["Microservices", "REST APIs", "Socket.io", "Multithreading"],
    },
    {
      category: "Data & AI",
      icon: <Database size={16} />,
      items: ["MongoDB", "PostgreSQL", "Vector DBs", "RAG"],
    },
    {
      category: "Cloud & DevOps",
      icon: <Cloud size={16} />,
      items: ["AWS (EC2, Lambda)", "Docker", "CI/CD", "Nginx"],
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="space-y-16"
    >
      {/* Hero Section */}
      <section className="space-y-6">
        <div className="space-y-2">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight flex flex-wrap text-foreground pb-2">
            {"Tushar Ganotra".split("").map((char, index) => (
              <motion.span
                key={index}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.05, delay: index * 0.08 }}
              >
                {char === " " ? "\u00A0" : char}
              </motion.span>
            ))}
          </h1>
          <h2 className="text-lg text-muted-foreground font-medium flex items-center gap-2">
            Software Engineer <span className="text-border">|</span> AI & MVP
            Specialist
          </h2>
        </div>

        <div className="space-y-4 max-w-2xl text-base text-muted-foreground leading-relaxed">
          <p>
            Full-stack engineer specializing in building reliable, scalable, and{" "}
            <span className="text-foreground font-medium">
              AI-integrated backend systems
            </span>
            . I transform complex requirements into high-impact{" "}
            <span className="text-foreground font-medium">MVPs</span> and
            production-ready architectures.
          </p>
          <p>
            With deep expertise in{" "}
            <span className="text-foreground">
              Node.js, TypeScript, and AWS
            </span>
            , I design systems that scale. From multithreaded proxy servers in C
            to context-aware AI assistants, I build end-to-end solutions.
          </p>
        </div>

        {/* Social Links */}
        <div className="flex gap-4 pt-2">
          <a
            href="https://github.com/0xtusharganotra"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-foreground transition-colors"
            title="GitHub"
          >
            <Github size={20} />
          </a>
          <a
            href="https://linkedin.com/in/tusharganotra"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-foreground transition-colors"
            title="LinkedIn"
          >
            <Linkedin size={20} />
          </a>
          <a
            href="https://leetcode.com/0xtusharganotra"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-foreground transition-colors"
            title="LeetCode"
          >
            <Code size={20} />
          </a>
          <a
            href="mailto:ganotra.vox@gmail.com"
            className="text-muted-foreground hover:text-foreground transition-colors"
            title="Email"
          >
            <Mail size={20} />
          </a>
        </div>

        {/* CTAs */}
        <div className="flex flex-wrap gap-3 items-center pt-2">
          <a
            href="mailto:ganotra.vox@gmail.com"
            className="inline-flex items-center gap-2 px-4 py-2 bg-foreground text-background rounded-md text-sm font-medium hover:opacity-90 transition-opacity"
          >
            <Sparkles size={16} className="text-indigo-500" />
            Let's Connect
          </a>
          <a
            href="https://drive.google.com/file/d/1rumbWTg4gRUQN4HdwYZOuQ03DWSqg_CW/view?usp=sharing"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 border border-border bg-background hover:bg-muted/50 rounded-md text-sm font-medium transition-colors"
          >
            <FileText size={16} />
            View Resume
          </a>
        </div>
      </section>

      {/* Tech Specs / Skills */}
      <section className="space-y-6 border-t border-border/40 pt-8">
        <h3 className="text-lg font-semibold">Technical Specifications</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {skills.map((skill, index) => (
            <div
              key={index}
              className="p-4 rounded-lg border border-border/50 bg-card/30 hover:bg-card/50 transition-colors"
            >
              <div className="flex items-center gap-2 mb-3 text-foreground font-medium">
                {skill.icon}
                <span>{skill.category}</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {skill.items.map((item) => (
                  <span
                    key={item}
                    className="px-2 py-1 text-xs font-medium bg-muted text-muted-foreground rounded-md"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* GitHub Heatmap */}
      <section className="space-y-6 border-t border-border/40 pt-8">
        <h3 className="text-lg font-semibold">Contributions</h3>
        <div className="p-4 border border-border/40 rounded-lg bg-card/50 flex flex-col items-center">
          <div className="w-full overflow-x-auto custom-scrollbar pb-2 flex justify-start md:justify-center">
            <GitHubCalendar
              username="0xtusharganotra"
              colorScheme={theme === "dark" ? "dark" : "light"}
              fontSize={12}
              blockSize={10}
              blockMargin={4}
            />
          </div>
        </div>
      </section>
    </motion.div>
  );
};
