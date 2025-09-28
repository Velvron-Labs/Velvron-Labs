'use client';

import { useState, useEffect, useRef, memo, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './Terminal.module.css';

const TerminalLine = memo(({ line, isTyping, isActive, index }) => {
  const isCommand = line.startsWith('$');
  const isSuccess = line.startsWith('✓') || line.includes('Ready') || line.includes('Compiled') || line.includes('success');
  const isError = line.startsWith('×') || line.includes('error') || line.includes('Error') || line.includes('failed');
  const isDir = line.startsWith('drwx');
  const isFile = line.startsWith('-rw-');
  const isGit = line.includes('git') || line.includes('branch') || line.includes('commit');
  const isWarning = line.includes('warning') || line.includes('deprecated');
  
  // Optimized content parsing with memoization
  const parsedContent = useMemo(() => {
    let content = line;
    if (isCommand) {
      content = line.substring(line.indexOf('$') + 1).trim();
    }
    return content;
  }, [line, isCommand]);

  // Optimized content renderer
  const renderContent = useCallback(() => {
    if (isCommand) {
      return (
        <>
          <span className={styles.prompt}>$ </span>
          <span className={styles.command}>{parsedContent}</span>
        </>
      );
    }
    
    if (isDir || isFile) {
      const parts = line.split(/\s+/);
      const permissions = parts.slice(0, 8).join(' ');
      const filename = parts.slice(8).join(' ');
      
      return (
        <>
          <span className={styles.permissions}>{permissions}</span>
          <span className={isDir ? styles.directory : styles.file}> {filename}</span>
        </>
      );
    }

    if (isGit) {
      if (line.includes('On branch')) {
        const branch = line.split(' ')[2];
        return (
          <>
            <span className={styles.text}>On branch </span>
            <span className={styles.branch}>{branch}</span>
          </>
        );
      }
      if (line.includes('modified:')) {
        const file = line.split('modified:')[1]?.trim();
        return (
          <>
            <span className={styles.text}>modified: </span>
            <span className={styles.modified}>{file}</span>
          </>
        );
      }
    }

    // Return with appropriate styling
    const className = isSuccess ? styles.success : 
                     isError ? styles.error : 
                     isWarning ? styles.warning : styles.text;
    
    return <span className={className}>{line}</span>;
  }, [line, isCommand, isDir, isFile, isGit, isSuccess, isError, isWarning, parsedContent]);

  return (
    <motion.div 
      className={styles.line}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        duration: 0.2, 
        delay: index * 0.02,
        ease: [0.25, 0.46, 0.45, 0.94]
      }}
    >
      {renderContent()}
      {isTyping && isActive && <span className={styles.cursor} />}
    </motion.div>
  );
});

TerminalLine.displayName = 'TerminalLine';

export function TerminalWindow({ 
  title = "terminal", 
  content = [], 
  typing = true, 
  className = "",
  animate = true
}) {
  const [displayedLines, setDisplayedLines] = useState([]);
  const [currentLine, setCurrentLine] = useState(0);
  const [currentChar, setCurrentChar] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  
  // Refs for optimization
  const animationId = useRef(null);
  const contentKey = useRef('');
  const lastContent = useRef([]);

  // Reset state when content changes
  const contentChanged = useMemo(() => {
    const newKey = content.join('|');
    if (newKey !== contentKey.current) {
      contentKey.current = newKey;
      return true;
    }
    return false;
  }, [content]);

  useEffect(() => {
    if (contentChanged) {
      // Cancel any ongoing animation
      if (animationId.current) {
        cancelAnimationFrame(animationId.current);
      }
      
      // Reset state
      setDisplayedLines([]);
      setCurrentLine(0);
      setCurrentChar(0);
      setIsComplete(false);
      lastContent.current = [...content];
    }
  }, [contentChanged, content]);

  // Simplified typing animation
  useEffect(() => {
    if (!typing || content.length === 0 || !animate) {
      setDisplayedLines([...content]);
      setIsComplete(true);
      return;
    }

    if (contentChanged || displayedLines.length === 0) {
      let lineIndex = 0;
      let charIndex = 0;

      const typeNextChar = () => {
        if (lineIndex >= content.length) {
          setIsComplete(true);
          return;
        }

        const currentLineContent = content[lineIndex];
        
        if (charIndex <= currentLineContent.length) {
          const partialLine = currentLineContent.substring(0, charIndex);
          
          setDisplayedLines(prev => {
            const newLines = [...prev];
            newLines[lineIndex] = partialLine;
            return newLines;
          });
          
          setCurrentLine(lineIndex);
          charIndex++;
          
          // Typing speed based on content type
          const isCommand = currentLineContent.startsWith('$');
          const delay = isCommand ? 50 : 30;
          
          setTimeout(typeNextChar, delay);
        } else {
          // Line complete, move to next line
          lineIndex++;
          charIndex = 0;
          
          // Pause between lines
          setTimeout(typeNextChar, 300);
        }
      };

      // Start typing after a short delay
      setTimeout(typeNextChar, 500);
    }
  }, [typing, content, contentChanged, animate]);

  // Memoized terminal lines to prevent unnecessary re-renders
  const terminalLines = useMemo(() => {
    return displayedLines
      .filter(line => line !== undefined && line !== '')
      .map((line, index) => (
        <TerminalLine
          key={`${contentKey.current}-${index}`}
          line={line}
          isTyping={typing && !isComplete}
          isActive={typing && index === currentLine}
          index={index}
        />
      ));
  }, [displayedLines, typing, isComplete, currentLine]);

  // Auto-scroll to bottom when content changes
  const linesContainerRef = useRef(null);
  
  useEffect(() => {
    if (linesContainerRef.current) {
      linesContainerRef.current.scrollTop = linesContainerRef.current.scrollHeight;
    }
  }, [displayedLines]);

  return (
    <motion.div 
      className={`${styles.terminal} ${className}`}
      initial={animate ? { opacity: 0, y: 20, scale: 0.98 } : false}
      animate={animate ? { 
        opacity: 1, 
        y: 0, 
        scale: 1,
        transition: { 
          duration: 0.4,
          ease: [0.16, 1, 0.3, 1]
        }
      } : false}
      style={{ 
        display: 'flex',
        flexDirection: 'column',
        height: 'auto',
        minHeight: 'clamp(300px, 35vh, 400px)',
        maxHeight: 'clamp(400px, 45vh, 450px)',
        overflow: 'hidden',
        width: '100%'
      }}
    >
      {/* Terminal Header */}
      <div className={styles.header}>
        <div className={styles.controls}>
          <div className={styles.dot} data-color="red" />
          <div className={styles.dot} data-color="yellow" />
          <div className={styles.dot} data-color="green" />
        </div>
        <div className={styles.title}>
          {title}
        </div>
        <div className={styles.actions}>
          <div className={styles.signal}>●</div>
        </div>
      </div>

      {/* Terminal Content */}
      <div className={styles.content}>
        <div 
          ref={linesContainerRef}
          className={styles.lines}
          style={{
            flex: 1,
            overflowY: 'auto',
            overflowX: 'hidden',
            padding: 'clamp(0.75rem, 2vw, 1rem)',
            fontFamily: '"Fira Code", "SF Mono", "Roboto Mono", monospace',
            fontSize: 'clamp(0.75rem, 1.5vw, 0.875rem)',
            lineHeight: 1.5,
            color: '#e2e8f0',
            scrollbarWidth: 'thin',
            scrollbarColor: 'rgba(59, 130, 246, 0.3) transparent'
          }}
        >
          {terminalLines}
          
          {isComplete && (
            <div className={styles.line}>
              <span className={styles.prompt}>$ </span>
              <span className={styles.cursor} />
            </div>
          )}
        </div>
      </div>

      {/* Terminal glow effect */}
      <div className={styles.glow} />
    </motion.div>
  );
}