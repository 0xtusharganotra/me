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
          console.log(response.data.items);
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
        className="space-y-10"
      >
        <div className="space-y-2 border-b border-border/40 pb-6">
          <h1 className="text-3xl font-bold tracking-tight">Blog</h1>
          <p className="text-muted-foreground text-lg">Sharing my learnings...</p>
        </div>
        <div className="text-center py-20 border border-dashed border-border rounded-xl">
          <p className="text-muted-foreground">No posts found yet. They usually take a few minutes to sync from Medium.</p>
          <a
            href="https://medium.com/@ganotra.vox"
            target="_blank"
            rel="noopener noreferrer"
            className="text-indigo-500 hover:underline mt-4 inline-block"
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
      className="space-y-10"
    >
      <div className="space-y-2 border-b border-border/40 pb-6">
        <h1 className="text-3xl font-bold tracking-tight">Blog</h1>
        <p className="text-muted-foreground text-lg">Sharing my learnings...</p>
      </div>

      <div className="grid gap-8">
        {posts.map((post, index) => (
          <motion.article
            key={post.guid}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="group relative flex flex-col md:flex-row gap-6 p-6 rounded-xl border border-border/40 bg-card/20 hover:bg-card/40 hover:border-border transition-all duration-300"
          >
            {/* Thumbnail (Optional - checks if valid image) */}
            {post.thumbnail && (
              <div className="w-full md:w-48 h-32 flex-shrink-0 overflow-hidden rounded-lg bg-muted">
                <img
                  src={post.thumbnail}
                  alt={post.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = "none";
                  }}
                />
              </div>
            )}

            <div className="flex-1 flex flex-col space-y-3">
              <div className="space-y-1">
                <div className="flex items-center gap-3 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <BookOpen size={12} />
                    Medium
                  </span>
                  <span>•</span>
                  <time dateTime={post.pubDate}>
                    {formatDate(post.pubDate)}
                  </time>
                </div>

                <h2 className="text-xl font-bold group-hover:text-indigo-500 transition-colors line-clamp-2">
                  <a
                    href={post.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="before:absolute before:inset-0"
                  >
                    {post.title}
                  </a>
                </h2>
              </div>

              <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3">
                {getExcerpt(post.description)}
              </p>

              <div className="mt-auto pt-2 flex items-center text-xs font-medium text-indigo-500 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                Read Article <ArrowUpRight size={12} className="ml-1" />
              </div>
            </div>
          </motion.article>
        ))}
      </div>

      <div className="pt-8 text-center border-t border-border/40">
        <a
          href="https://medium.com/@ganotra.vox"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors font-medium px-4 py-2 hover:bg-muted/50 rounded-full"
        >
          Read more on Medium <ArrowUpRight size={16} />
        </a>
      </div>
    </motion.div>
  );
};
