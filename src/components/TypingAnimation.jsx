import { useState, useEffect } from 'react';
import styles from '../styles/TypingAnimation.module.css';

const TypingAnimation = () => {
  const [displayedText, setDisplayedText] = useState('');
  const fullText = 'Orvionar';
  const typingSpeed = 300; // Speed in ms per character

  useEffect(() => {
    let index = 0;
    const typingInterval = setInterval(() => {
      if (index < fullText.length) {
        setDisplayedText(fullText.slice(0, index + 1));
        index++;
      } else {
        clearInterval(typingInterval);
      }
    }, typingSpeed);

    return () => clearInterval(typingInterval);
  }, []);

  return (
    <div className={styles.typingContainer}>
      <span className={styles.orviText} >{displayedText.slice(0, 4)}</span>
      <span className={styles.onarText}>{displayedText.slice(4)}</span>
    </div>
  );
};

export default TypingAnimation;