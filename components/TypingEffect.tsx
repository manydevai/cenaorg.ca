import { useState, useEffect } from 'react';

interface TypingEffectProps {
  text: string;
  className?: string;
  typingSpeed?: number;
  deletingSpeed?: number;
  pauseDuration?: number;
  magicText?: string;
  magicTransitionDuration?: number;
}

export function TypingEffect({ 
  text, 
  className = '', 
  typingSpeed = 100,
  deletingSpeed = 50,
  pauseDuration = 3000,
  magicText = '',
  magicTransitionDuration = 5000
}: TypingEffectProps) {
  const [displayedText, setDisplayedText] = useState('');
  const [displayedMagicText, setDisplayedMagicText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [showDots, setShowDots] = useState(false);
  const [isTypingMagic, setIsTypingMagic] = useState(false);

  useEffect(() => {
    let timeout: NodeJS.Timeout;

    if (isPaused) {
      // Pause before starting to delete everything
      timeout = setTimeout(() => {
        setIsPaused(false);
        setIsDeleting(true);
      }, pauseDuration);
    } else if (isDeleting) {
      // Deleting magic text first
      if (displayedMagicText.length > 0) {
        timeout = setTimeout(() => {
          setDisplayedMagicText(magicText.substring(0, displayedMagicText.length - 1));
        }, deletingSpeed);
      } else if (showDots) {
        setShowDots(false);
      } else if (displayedText.length > 0) {
        // Delete main text
        timeout = setTimeout(() => {
          setDisplayedText(text.substring(0, displayedText.length - 1));
        }, deletingSpeed);
      } else {
        // Reset everything
        setIsDeleting(false);
        setIsTypingMagic(false);
      }
    } else if (isTypingMagic) {
      // Typing magic text
      if (displayedMagicText.length === magicText.length) {
        setIsPaused(true);
      } else {
        timeout = setTimeout(() => {
          setDisplayedMagicText(magicText.substring(0, displayedMagicText.length + 1));
        }, typingSpeed);
      }
    } else {
      // Typing main text
      if (displayedText.length === text.length) {
        setShowDots(true);
        if (magicText) {
          // Wait a bit before starting magic text
          timeout = setTimeout(() => {
            setIsTypingMagic(true);
          }, 500);
        } else {
          setIsPaused(true);
        }
      } else {
        timeout = setTimeout(() => {
          setDisplayedText(text.substring(0, displayedText.length + 1));
        }, typingSpeed);
      }
    }

    return () => clearTimeout(timeout);
  }, [displayedText, displayedMagicText, isDeleting, isPaused, showDots, isTypingMagic, text, magicText, typingSpeed, deletingSpeed, pauseDuration]);

  return (
    <div className={`${className} grid`} style={{ gridTemplateAreas: '"text"' }}>
      {/* Invisible placeholder to reserve space and prevent layout shift */}
      <span 
        className="invisible col-start-1 row-start-1 pointer-events-none select-none" 
        aria-hidden="true"
        style={{ gridArea: 'text' }}
      >
        {text}... {magicText}|
      </span>
      
      {/* Visible typing text */}
      <h1 className="col-start-1 row-start-1" style={{ gridArea: 'text' }}>
        {displayedText}
        {showDots && <span className="text-white">... </span>}
        {displayedMagicText && <span className="text-white">{displayedMagicText}</span>}
        <span className="animate-pulse text-[#FDB913]">|</span>
      </h1>
    </div>
  );
}