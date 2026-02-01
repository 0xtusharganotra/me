import React, { useEffect, useState } from "react";
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
  FolderGit2,
  MapPin,
  ArrowUpRight,
} from "lucide-react";
import { motion } from "framer-motion";
import { GitHubCalendar } from "react-github-calendar";
import { useTheme } from "../hooks/useTheme";
import axios from "axios";

interface BlogPost {
  title: string;
  pubDate: string;
  link: string;
  guid: string;
  thumbnail: string;
  description: string;
  categories: string[];
}

interface RssResponse {
  status: string;
  feed: {
    url: string;
    title: string;
    link: string;
    author: string;
    description: string;
    image: string;
  };
  items: BlogPost[];
}

export const Home: React.FC = () => {
  const { theme } = useTheme();
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loadingPosts, setLoadingPosts] = useState(true);

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
      items: ["Microservices", "REST APIs", "Socket.io", "Multithreading", "Node.js", "FastAPI"],
    },
    {
      category: "Data & AI",
      icon: <Database size={16} />,
      items: ["MongoDB", "PostgreSQL", "Vector DBs", "RAG", "Gen AI", "Prisma"],
    },
    {
      category: "Cloud & DevOps",
      icon: <Cloud size={16} />,
      items: ["AWS (EC2, Lambda)", "Docker", "CI/CD", "Nginx", "Azure", "Kubernetes", "Jest"],
    },
  ];

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get<RssResponse>(
          "https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@ganotra.vox",
        );
        if (response.data.status === "ok") {
          setPosts(response.data.items.slice(0, 3));
        }
      } catch (err) {
        console.error("Failed to fetch blog posts:", err);
      } finally {
        setLoadingPosts(false);
      }
    };
    fetchPosts();
  }, []);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });
  };

  const featuredProjects = [
    {
      title: "VectorThink AI Assistant",
      description:
        "Context-aware AI knowledge assistant using RAG and Google Gemini embeddings.",
      tech: ["Node.js", "TypeScript", "Vector DB"],
      demo: "https://vectorthink.dev/",
    },
    {
      title: "Multithreaded Proxy Server",
      description:
        "High-performance forward proxy in C with LRU caching and connection limiting.",
      tech: ["C", "Pthreads", "Network API"],
      github:
        "https://github.com/0xtusharganotra/Multithreaded-HTTP-Proxy-with-LRU-Cache",
    },
    {
      title: "Kilograms",
      description:
        "E-commerce platform for Tier-3 cities, optimizing for low-bandwidth environments.",
      tech: ["Node.js", "React", "MongoDB"],
      demo: "https://kilograms-in.vercel.app/",
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
          <h2 className="text-lg text-muted-foreground font-medium flex flex-wrap items-center gap-x-2 gap-y-1">
            <span>Software Engineer</span>
            <span className="text-border hidden sm:inline">|</span>
            <span>AI & MVP Specialist</span>
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
            href="https://drive.google.com/file/d/1C_GZ_FEn1LnXJ_TQjTuRs-9QaOpnVaOX"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 border border-border bg-background hover:bg-muted/50 rounded-md text-sm font-medium transition-colors"
          >
            <FileText size={16} />
            View Resume
          </a>
        </div>
      </section>

      {/* Featured Projects */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">Featured Work</h3>
          <a
            href="/projects"
            className="text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1"
          >
            View all <ArrowUpRight size={14} />
          </a>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {featuredProjects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="group p-4 rounded-lg border border-border/40 bg-card/30 hover:bg-card/50 hover:border-indigo-500/30 transition-all duration-300"
            >
              <div className="flex items-center gap-2 mb-3">
                <div className="p-1.5 bg-muted/50 rounded-lg text-foreground/80 group-hover:text-indigo-500 transition-colors">
                  <FolderGit2 size={14} />
                </div>
                <h4 className="text-sm font-semibold group-hover:text-indigo-500 transition-colors">
                  {project.title}
                </h4>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed mb-3">
                {project.description}
              </p>
              <div className="flex flex-wrap gap-1.5">
                {project.tech.slice(0, 3).map((tech) => (
                  <span
                    key={tech}
                    className="px-1.5 py-0.5 text-[10px] uppercase tracking-wider font-medium bg-muted/50 text-muted-foreground rounded"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Now Snapshot */}
      <section className="space-y-4">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-4 rounded-lg border border-border/40 bg-gradient-to-br from-indigo-500/5 to-purple-500/5 hover:from-indigo-500/10 hover:to-purple-500/10 transition-all duration-300"
        >
          <div className="flex items-start gap-3">
            <div className="p-2 bg-indigo-500/10 rounded-lg text-indigo-500">
              <MapPin size={16} />
            </div>
            <div className="flex-1 space-y-2">
              <h4 className="text-sm font-semibold">Currently</h4>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Software Engineer at <b>HCL Technologies</b>. Building AI Agents,
                REST APIs, and a SaaS product with RAG-based memory layer.
              </p>
              <a
                href="/now"
                className="text-xs text-indigo-500 hover:text-indigo-400 transition-colors flex items-center gap-1 font-medium"
              >
                See what I'm up to <ArrowUpRight size={12} />
              </a>
            </div>
          </div>
        </motion.div>
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
              <div className="flex items-center gap-2 mb-3 text-sm font-semibold">
                {skill.icon}
                <span>{skill.category}</span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {skill.items.map((item) => (
                  <span
                    key={item}
                    className="px-1.5 py-0.5 text-[10px] uppercase tracking-wider font-medium bg-muted/50 text-muted-foreground rounded"
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

      {/* Latest Writing */}
      <section className="space-y-4 border-t border-border/40 pt-8">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">Latest Writing</h3>
          <a
            href="/blog"
            className="text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1"
          >
            View all <ArrowUpRight size={14} />
          </a>
        </div>
        {loadingPosts ? (
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="space-y-2 animate-pulse">
                <div className="h-4 bg-muted/30 rounded w-32"></div>
                <div className="h-5 bg-muted/40 rounded w-3/4"></div>
              </div>
            ))}
          </div>
        ) : posts.length > 0 ? (
          <div className="space-y-4">
            {posts.map((post, index) => (
              <motion.a
                key={post.guid}
                href={post.link}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                className="block group space-y-1"
              >
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <time dateTime={post.pubDate}>{formatDate(post.pubDate)}</time>
                  <span>•</span>
                  <span>Medium</span>
                </div>
                <h4 className="text-sm font-semibold group-hover:text-indigo-500 transition-colors">
                  {post.title}
                </h4>
              </motion.a>
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <p className="text-sm text-muted-foreground">Loading recent posts...</p>
          </div>
        )}
      </section>
    </motion.div>
  );
};
