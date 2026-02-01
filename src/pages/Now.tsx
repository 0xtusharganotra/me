import React from "react";
import { motion } from "framer-motion";
import { Briefcase, GraduationCap, MapPin } from "lucide-react";

export const Now: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-12"
    >
      <div className="space-y-2">
        <h1 className="text-3xl font-bold">Now</h1>
        <p className="text-muted-foreground">What I'm currently focused on.</p>
      </div>

      {/* Current Focus */}
      <section className="space-y-4">
        <h2 className="text-lg font-semibold flex items-center gap-2">
          <MapPin size={20} className="text-indigo-500" />
          Current Status
        </h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          I'm currently based in <b>India</b>, working as a Software Engineer at{" "}
          <b>HCL Technologies</b>. I'm diving deep into <b>AI integration</b>{" "}
          and <b>scalable system design</b>.
        </p>
        <p className="text-sm text-muted-foreground leading-relaxed">
          On the side, I'm building a SaaS product and RAG based memory layer
          for AI chat bots.
        </p>
      </section>

      {/* Experience */}
      <section className="space-y-6">
        <h2 className="text-lg font-semibold flex items-center gap-2">
          <Briefcase size={20} className="text-indigo-500" />
          Experience
        </h2>

        <div className="space-y-8 border-l-2 border-border ml-2 pl-6 relative">
          <div className="relative">
            <span className="absolute -left-[31px] top-1 h-3 w-3 rounded-full bg-indigo-500 ring-4 ring-background"></span>
            <h3 className="text-sm font-semibold">Software Engineer</h3>
            <p className="text-xs text-muted-foreground">
              HCL Technologies • (December) 2023 - Present
            </p>
            <p className="mt-2 text-sm text-muted-foreground">
              Building AI Agents, Building Produtcion ready REST API, Handle
              CI/CD Pipelines
            </p>
          </div>

          <div className="relative">
            <span className="absolute -left-[31px] top-1 h-3 w-3 rounded-full bg-muted-foreground ring-4 ring-background"></span>
            <h3 className="text-sm font-semibold">Software Engineer Trainee</h3>
            <p className="text-xs text-muted-foreground">
              HCL Technologies • (August) 2023 - (December) 2023
            </p>
            <p className="mt-2 text-sm text-muted-foreground">
              Learned MERN Stack development and developed REST API for internal
              tools
            </p>
          </div>
        </div>
      </section>

      {/* Education */}
      <section className="space-y-6">
        <h2 className="text-lg font-semibold flex items-center gap-2">
          <GraduationCap size={20} className="text-indigo-500" />
          Education
        </h2>

        <div className="space-y-4">
          <div className="p-4 bg-muted/50 rounded-lg">
            <h3 className="text-sm font-semibold">B-Tech (Information Technology)</h3>
            <p className="text-xs text-muted-foreground">
              Maharaja Agrasen Institute of Technologies • 2019 - 2023
            </p>
          </div>
        </div>
      </section>
    </motion.div>
  );
};
