import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

const codeLines = [
  "const createAI = () => {",
  "  const brain = new NeuralNetwork();",
  "  const memory = new VectorDB();",
  "  ",
  "  async function ask(query) {",
  "    const context = await memory.search(query);",
  "    return await brain.generate(context);",
  "  }",
  "  ",
  "  return { ask };",
  "};",
  "",
  "const agent = createAI();",
  "agent.ask('Hello, world!');",
];

export const AnimatedTerminal: React.FC = () => {
  const [displayedLines, setDisplayedLines] = useState<string[]>([]);
  const [currentLine, setCurrentLine] = useState(0);
  const [currentChar, setCurrentChar] = useState(0);

  useEffect(() => {
    const typeNextChar = () => {
      if (currentLine < codeLines.length) {
        const line = codeLines[currentLine];
        const nextDisplayedLines = [...displayedLines];

        if (currentChar === 0 && !nextDisplayedLines[currentLine]) {
          nextDisplayedLines[currentLine] = "";
        }

        if (currentChar < line.length) {
          nextDisplayedLines[currentLine] = line.substring(0, currentChar + 1);
          setDisplayedLines(nextDisplayedLines);
          setCurrentChar(currentChar + 1);
        } else {
          setCurrentLine(currentLine + 1);
          setCurrentChar(0);
        }
      } else {
        setTimeout(() => {
          setCurrentLine(0);
          setCurrentChar(0);
        }, 3000);
      }
    };

    const timeout = setTimeout(typeNextChar, 50 + Math.random() * 50);
    return () => clearTimeout(timeout);
  }, [currentLine, currentChar, displayedLines]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="w-full max-w-md mx-auto"
    >
      <div className="rounded-lg border border-border/60 bg-card/50 shadow-lg overflow-hidden">
        {/* Terminal Header */}
        <div className="flex items-center gap-2 px-4 py-3 bg-muted/30 border-b border-border/40">
          <div className="flex gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
            <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
          </div>
          <div className="flex-1 text-center">
            <span className="text-xs text-muted-foreground font-mono">developer.ts</span>
          </div>
          <div className="w-4" />
        </div>

        {/* Terminal Body */}
        <div className="p-4 md:p-5 font-mono text-xs md:text-sm leading-relaxed min-h-[180px]">
          {displayedLines.map((line, index) => {
            const isKeyword = ["const", "async", "function", "return", "new"].some(
              (kw) => line.trim().startsWith(kw)
            );
            const isFunction = line.includes("function") || line.includes("=>");
            const isString = line.includes('"') || line.includes("'");
            const isComment = line.trim() === "" || line.includes("//");

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.1 }}
                className="flex"
              >
                {line && (
                  <span className="text-indigo-500 dark:text-indigo-400 mr-3 select-none">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                )}
                <span
                  className={`flex-1 ${
                    isKeyword
                      ? "text-indigo-600 dark:text-indigo-400 font-semibold"
                      : isFunction
                      ? "text-purple-600 dark:text-purple-400 font-semibold"
                      : isString
                      ? "text-green-600 dark:text-green-400"
                      : isComment
                      ? "text-muted-foreground"
                      : "text-foreground"
                  }`}
                >
                  {line || "\u00A0"}
                </span>
              </motion.div>
            );
          })}
          
          {/* Blinking Cursor */}
          <motion.span
            animate={{ opacity: [1, 0, 1] }}
            transition={{ duration: 1, repeat: Infinity }}
            className="inline-block w-2 h-4 bg-foreground ml-1 align-middle"
          />
        </div>
      </div>
    </motion.div>
  );
};