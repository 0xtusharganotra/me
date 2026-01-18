import React from "react";
import { motion } from "framer-motion";
import { Github, FolderGit2, ArrowUpRight } from "lucide-react";

const projects = [
  {
    title: "Multithreaded Proxy Server",
    description:
      "High-performance forward proxy server in C using POSIX threads. Features LRU caching, semaphore-based connection limiting, and custom request parsing.",
    tech: ["C", "Pthreads", "Network API", "Semaphores"],
    github:
      "https://github.com/0xtusharganotra/Multithreaded-HTTP-Proxy-with-LRU-Cache",
    demo: null,
    featured: true,
  },
  {
    title: "VectorThink AI Assistant",
    description:
      "Context-aware AI knowledge assistant using RAG (Retrieval-Augmented Generation) and Google Gemini embeddings. Includes JWT auth and vector DB integration.",
    tech: ["Node.js", "TypeScript", "Vector DB", "Google Gemini"],
    github: "https://github.com/0xtusharganotra/VectorThink",
    demo: "https://vectorthink.dev/",
    featured: true,
  },
  {
    title: "Kilograms",
    description:
      "Designed and developed a scalable e-commerce platform tailored for Tier-3 cities, optimizing for low-bandwidth environments and complex logistics.",
    tech: ["Node.js", "Express", "React", "MongoDB"],
    demo: "https://kilograms-in.vercel.app/",
  },
  {
    title: "RAG CLI",
    description:
      "CLI based AI Agent that uses SLM(Kimi k2) to answer questions, with the ability to perform web searches for up-to-date information.",
    tech: ["GROQ AI", "Node Js", "ExpressJs", "Java Script"],
    github: "https://github.com/0xtusharganotra/RAG-CLI",
    demo: null,
  },
  {
    title: "RezAnalyze",
    description:
      "AI-powered resume analyzer that scores your Resume and gives tailored recommendations based on the job description you provide.",
    tech: ["Puter Js", "Node Js", "ExpressJs", "React Js"],
    github: "https://github.com/0xtusharganotra/ResAnalyze",
    demo: "https://res-analyze.vercel.app/",
  },
];

export const Projects: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-10"
    >
      <div className="space-y-2 pb-1">
        <h1 className="text-3xl font-bold tracking-tight">Projects</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {projects.map((project, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="group relative flex flex-col p-6 rounded-xl border border-border/50 bg-card/30 hover:bg-card/50 hover:border-border transition-all duration-300 shadow-sm hover:shadow-md"
          >
            <div className="flex justify-between items-start mb-4">
              <div className="p-2 bg-muted/50 rounded-lg text-foreground/80 group-hover:text-indigo-500 transition-colors">
                <FolderGit2 size={20} />
              </div>
              <div className="flex gap-2">
                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 text-muted-foreground hover:text-foreground hover:bg-muted/50 rounded-full transition-colors"
                    title="View Source"
                  >
                    <Github size={18} />
                  </a>
                )}
                {project.demo && (
                  <a
                    href={project.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 text-muted-foreground hover:text-foreground hover:bg-muted/50 rounded-full transition-colors"
                    title="Live Demo"
                  >
                    <ArrowUpRight size={18} />
                  </a>
                )}
              </div>
            </div>

            <h3 className="text-lg font-bold mb-2 group-hover:text-indigo-500 transition-colors">
              {project.title}
            </h3>

            <p className="text-sm text-muted-foreground leading-relaxed mb-6 flex-1">
              {project.description}
            </p>

            <div className="flex flex-wrap gap-2 mt-auto">
              {project.tech.map((t) => (
                <span
                  key={t}
                  className="px-2 py-1 text-[11px] uppercase tracking-wider font-semibold bg-muted/50 text-muted-foreground rounded border border-border/50"
                >
                  {t}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};
