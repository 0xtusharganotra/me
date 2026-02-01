import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, Loader2, BookOpen } from "lucide-react";
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

export const Blog: React.FC = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get<RssResponse>(
          "https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@ganotra.vox",
        );

        if (response.data.status === "ok") {
          setPosts(response.data.items);
        } else {
          setError("Failed to fetch blog posts.");
        }
      } catch (err) {
        console.error(err);
        setError("Failed to load blog posts. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const getExcerpt = (htmlContent: string) => {
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = htmlContent;
    const text = tempDiv.textContent || tempDiv.innerText || "";
    return text.length > 120 ? text.substring(0, 120) + "..." : text;
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <Loader2 className="animate-spin text-muted-foreground" size={32} />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center min-h-[50vh] flex flex-col items-center justify-center space-y-4">
        <p className="text-muted-foreground">{error}</p>
        <a
          href="https://medium.com/@ganotra.vox"
          target="_blank"
          rel="noopener noreferrer"
          className="text-foreground underline underline-offset-4 hover:text-indigo-500 transition-colors"
        >
          Visit Medium Profile
        </a>
      </div>
    );
  }

  if (posts.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-16"
      >
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">Blog</h1>
          <p className="text-muted-foreground text-lg">Sharing my learnings...</p>
        </div>
        <div className="text-center py-12 bg-muted/10 rounded-lg">
          <p className="text-muted-foreground">No posts found yet. They usually take a few minutes to sync from Medium.</p>
          <a
            href="https://medium.com/@ganotra.vox"
            target="_blank"
            rel="noopener noreferrer"
            className="text-indigo-500 hover:underline mt-4 inline-block font-medium"
          >
            Check my Medium profile directly
          </a>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-12"
    >
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Blog</h1>
        <p className="text-muted-foreground text-lg">Sharing my learnings...</p>
      </div>

      <div className="flex flex-col space-y-12">
        {posts.map((post, index) => (
          <motion.article
            key={post.guid}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="group relative flex flex-col md:flex-row gap-6 md:gap-8"
          >
            <div className="flex-1 space-y-4">
              <div className="space-y-2">
                <div className="flex items-center gap-3 text-sm text-muted-foreground/80">
                  <time dateTime={post.pubDate}>
                    {formatDate(post.pubDate)}
                  </time>
                  <span>•</span>
                  <span className="flex items-center gap-1.5">
                    <BookOpen size={14} />
                    Medium
                  </span>
                </div>

                <h2 className="text-xl font-semibold group-hover:text-indigo-500 transition-colors leading-tight">
                  <a
                    href={post.link}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {post.title}
                  </a>
                </h2>
              </div>

              <p className="text-muted-foreground leading-relaxed line-clamp-3 text-sm">
                {getExcerpt(post.description)}
              </p>

              <div className="inline-flex items-center text-sm font-semibold text-indigo-500 hover:text-indigo-400 transition-colors group/link">
                <span className="relative">
                  Read Article
                  <span className="absolute -bottom-0.5 left-0 w-0 h-0.5 bg-indigo-500 transition-all duration-300 group-hover:w-full"></span>
                </span>
                <ArrowUpRight size={14} className="ml-1 transition-transform group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5" />
              </div>
            </div>

            {post.thumbnail && (
              <div className="hidden md:block w-48 h-28 flex-shrink-0 overflow-hidden rounded-lg bg-muted/20">
                <img
                  src={post.thumbnail}
                  alt={post.title}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).parentElement?.remove();
                  }}
                />
              </div>
            )}
          </motion.article>
        ))}
      </div>

      <div className="pt-6 text-center">
        <a
          href="https://medium.com/@ganotra.vox"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors font-medium px-6 py-2.5 bg-muted/30 hover:bg-muted/50 rounded-full text-sm"
        >
          Read more on Medium <ArrowUpRight size={16} />
        </a>
      </div>
    </motion.div>
  );
};
