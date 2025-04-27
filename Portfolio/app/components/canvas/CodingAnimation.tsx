'use client';
import React, { useEffect, useState, useRef } from 'react';

const CodingAnimation = () => {
  const [codeLines, setCodeLines] = useState<string[]>([]);
  const [currentLine, setCurrentLine] = useState(0);
  const [currentSnippet, setCurrentSnippet] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  // Different code snippets to rotate through
  const codeSnippets = [
    // React component
    [
      'import React, { useState, useEffect } from "react";',
      'import { motion } from "framer-motion";',
      '',
      'const WebDevPortfolio = () => {',
      '  const [projects, setProjects] = useState([]);',
      '  const [isLoading, setIsLoading] = useState(true);',
      '',
      '  useEffect(() => {',
      '    fetchProjects();',
      '  }, []);',
      '',
      '  const fetchProjects = async () => {',
      '    try {',
      '      const response = await fetch("/api/projects");',
      '      const data = await response.json();',
      '      setProjects(data);',
      '      setIsLoading(false);',
      '    } catch (error) {',
      '      console.error("Error fetching projects:", error);',
      '      setIsLoading(false);',
      '    }',
      '  };',
      '',
      '  return (',
      '    <motion.div',
      '      initial={{ opacity: 0 }}',
      '      animate={{ opacity: 1 }}',
      '      transition={{ duration: 0.5 }}',
      '    >',
      '      <h1>My Web Development Portfolio</h1>',
      '      {isLoading ? (',
      '        <Spinner />',
      '      ) : (',
      '        <div className="projects-grid">',
      '          {projects.map((project) => (',
      '            <ProjectCard key={project.id} {...project} />',
      '          ))}',
      '        </div>',
      '      )}',
      '    </motion.div>',
      '  );',
      '};',
      '',
      'export default WebDevPortfolio;'
    ],
    // Node.js API route
    [
      '// API route handler - Node.js with Express',
      'import express from "express";',
      'import { connectToDatabase } from "../utils/db";',
      'import { verifyToken } from "../middleware/auth";',
      '',
      'const router = express.Router();',
      '',
      '// GET all projects',
      'router.get("/api/projects", async (req, res) => {',
      '  try {',
      '    const db = await connectToDatabase();',
      '    const projects = await db.collection("projects")',
      '      .find({})',
      '      .sort({ createdAt: -1 })',
      '      .toArray();',
      '    ',
      '    return res.status(200).json(projects);',
      '  } catch (error) {',
      '    console.error("Database error:", error);',
      '    return res.status(500).json({',
      '      message: "Error fetching projects"',
      '    });',
      '  }',
      '});',
      '',
      '// POST new project (protected route)',
      'router.post("/api/projects", verifyToken, async (req, res) => {',
      '  try {',
      '    const { title, description, image, github, demo, tags } = req.body;',
      '    ',
      '    // Validate required fields',
      '    if (!title || !description) {',
      '      return res.status(400).json({',
      '        message: "Title and description are required"',
      '      });',
      '    }',
      '',
      '    const db = await connectToDatabase();',
      '    const result = await db.collection("projects").insertOne({',
      '      title,',
      '      description,',
      '      image,',
      '      github,',
      '      demo,',
      '      tags: tags || [],',
      '      createdAt: new Date()',
      '    });',
      '',
      '    return res.status(201).json({',
      '      message: "Project created successfully",',
      '      projectId: result.insertedId',
      '    });',
      '  } catch (error) {',
      '    console.error("Database error:", error);',
      '    return res.status(500).json({',
      '      message: "Error creating project"',
      '    });',
      '  }',
      '});',
      '',
      'export default router;'
    ],
    // CSS Animation
    [
      '/* Modern CSS Animation with keyframes */',
      '@keyframes float {',
      '  0% {',
      '    transform: translateY(0px);',
      '    box-shadow: 0 5px 15px 0px rgba(0, 0, 0, 0.6);',
      '  }',
      '  50% {',
      '    transform: translateY(-20px);',
      '    box-shadow: 0 25px 15px 0px rgba(0, 0, 0, 0.2);',
      '  }',
      '  100% {',
      '    transform: translateY(0px);',
      '    box-shadow: 0 5px 15px 0px rgba(0, 0, 0, 0.6);',
      '  }',
      '}',
      '',
      '.card {',
      '  border-radius: 12px;',
      '  background: linear-gradient(145deg, #2a2d3a, #1a1c25);',
      '  padding: 2rem;',
      '  position: relative;',
      '  overflow: hidden;',
      '  animation: float 6s ease-in-out infinite;',
      '  transition: all 0.3s ease;',
      '}',
      '',
      '.card:hover {',
      '  transform: translateY(-5px) scale(1.02);',
      '  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.8);',
      '}',
      '',
      '.card::before {',
      '  content: "";',
      '  position: absolute;',
      '  top: -50%;',
      '  left: -50%;',
      '  width: 200%;',
      '  height: 200%;',
      '  background: linear-gradient(',
      '    to right,',
      '    transparent,',
      '    rgba(255, 255, 255, 0.1),',
      '    transparent',
      '  );',
      '  transform: rotate(30deg);',
      '  transition: transform 0.5s;',
      '}',
      '',
      '.card:hover::before {',
      '  transform: rotate(30deg) translateX(150%);',
      '  transition: transform 0.7s;',
      '}'
    ]
  ];

  // Switch to new code snippet when current one completes
  useEffect(() => {
    if (currentLine >= codeSnippets[currentSnippet].length) {
      // Wait before switching to next snippet
      const timer = setTimeout(() => {
        setCodeLines([]);
        setCurrentLine(0);
        setCurrentSnippet((prev) => (prev + 1) % codeSnippets.length);
      }, 3000);

      return () => clearTimeout(timer);
    } else {
      // Add a new line of code every 80ms
      const timer = setTimeout(() => {
        setCodeLines(prev => [...prev, codeSnippets[currentSnippet][currentLine]]);
        setCurrentLine(prev => prev + 1);
      }, 80);

      return () => clearTimeout(timer);
    }
  }, [currentLine, currentSnippet]);

  // Auto-scroll to see new code
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [codeLines]);

  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="code-editor w-[95%] max-w-[600px] h-[350px] bg-[#1e1e1e] rounded-md shadow-xl overflow-hidden relative neon-border-hover">
        {/* Editor header */}
        <div className="editor-header h-8 bg-[#252526] flex items-center px-4">
          <div className="flex gap-2">
            <div className="w-3 h-3 rounded-full bg-[#ff5f56]"></div>
            <div className="w-3 h-3 rounded-full bg-[#ffbd2e]"></div>
            <div className="w-3 h-3 rounded-full bg-[#27c93f]"></div>
          </div>
          <div className="ml-4 text-white text-xs flex-1 flex justify-between">
            <span>{currentSnippet === 0 ? 'WebDevPortfolio.tsx' : 
                  currentSnippet === 1 ? 'projectRoutes.js' : 
                  'animations.css'}</span>
            <span className="text-gray-500 mr-2">{currentLine}/{codeSnippets[currentSnippet].length} lines</span>
          </div>
        </div>
        
        {/* Code content */}
        <div ref={containerRef} className="editor-content p-4 font-mono text-sm h-[calc(100%-2rem)] overflow-auto custom-scrollbar">
          <pre className="text-gray-200 whitespace-pre-wrap">
            {codeLines.map((line, index) => (
              <div 
                key={index} 
                className={`line py-1 ${index === codeLines.length - 1 ? 'animate-typing border-r-2 border-white' : ''}`}
              >
                <span className="text-gray-500 mr-4">{index + 1}</span>
                <span className="code-text">
                  {highlightSyntax(line, currentSnippet)}
                </span>
              </div>
            ))}
          </pre>
        </div>

        {/* Footer information */}
        <div className="absolute bottom-4 right-4 text-sm text-gray-500">
          {currentSnippet === 0 ? 'TypeScript | React' : 
           currentSnippet === 1 ? 'JavaScript | Node.js' : 
           'CSS | Animations'}
        </div>
      </div>
    </div>
  );
};

// Helper function to highlight syntax based on the code type
function highlightSyntax(code: string, snippetType: number): React.ReactNode {
  let coloredCode = code;
  
  if (snippetType === 0) { // React/TypeScript
    coloredCode = code
      .replace(/(import|from|const|let|var|function|return|export|default|if|else|async|await|try|catch)/g, '<span class="text-[#c586c0]">$1</span>')
      .replace(/(useState|useEffect|className)/g, '<span class="text-[#dcdcaa]">$1</span>')
      .replace(/(".*?")/g, '<span class="text-[#ce9178]">$1</span>')
      .replace(/(\{|\}|\(|\)|\[|\])/g, '<span class="text-[#d4d4d4]">$1</span>')
      .replace(/(\/\/.*)/g, '<span class="text-[#6a9955]">$1</span>')
      .replace(/(\<|\>|\/|\=)/g, '<span class="text-[#808080]">$1</span>')
      .replace(/(\<[a-zA-Z0-9\.]+)/g, '<span class="text-[#4ec9b0]">$1</span>')
      .replace(/(\.map|\.find|\.filter)/g, '<span class="text-[#dcdcaa]">$1</span>');
  } 
  else if (snippetType === 1) { // Node.js/JavaScript
    coloredCode = code
      .replace(/(import|from|const|let|var|function|return|export|default|if|else|async|await|try|catch)/g, '<span class="text-[#c586c0]">$1</span>')
      .replace(/(Express|Router|get|post|put|delete)/g, '<span class="text-[#4ec9b0]">$1</span>')
      .replace(/(".*?")/g, '<span class="text-[#ce9178]">$1</span>')
      .replace(/(\{|\}|\(|\)|\[|\])/g, '<span class="text-[#d4d4d4]">$1</span>')
      .replace(/(\/\/.*)/g, '<span class="text-[#6a9955]">$1</span>')
      .replace(/(req|res|err|error|console)/g, '<span class="text-[#9cdcfe]">$1</span>')
      .replace(/(\.[a-zA-Z0-9]+\()/g, '<span class="text-[#dcdcaa]">$1</span>');
  } 
  else { // CSS
    coloredCode = code
      .replace(/(@keyframes|@media|@import)/g, '<span class="text-[#c586c0]">$1</span>')
      .replace(/(position|display|flex|grid|margin|padding|border|color|background|transform|transition|animation|box-shadow)/g, '<span class="text-[#9cdcfe]">$1</span>')
      .replace(/(hover|before|after|nth-child)/g, '<span class="text-[#d7ba7d]">$1</span>')
      .replace(/(\{|\})/g, '<span class="text-[#d4d4d4]">$1</span>')
      .replace(/(\/\*.*\*\/)/g, '<span class="text-[#6a9955]">$1</span>')
      .replace(/(px|rem|em|vh|vw|%|s|ms)/g, '<span class="text-[#b5cea8]">$1</span>')
      .replace(/(#[a-fA-F0-9]{3,6})/g, '<span class="text-[#ce9178]">$1</span>');
  }

  return <span dangerouslySetInnerHTML={{ __html: coloredCode }} />;
}

export default CodingAnimation; 