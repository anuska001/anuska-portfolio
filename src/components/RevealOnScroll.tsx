import React, { useEffect, useRef, useState } from 'react';

interface RevealOnScrollProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  id?: string;
}

export function RevealOnScroll({ children, className = '', delay = 0, id }: RevealOnScrollProps) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    if (!('IntersectionObserver' in window)) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.08,
        rootMargin: '0px 0px -40px 0px',
      }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div
      ref={ref}
      id={id}
      className={`transition-all duration-700 ease-out will-change-[opacity,transform] ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6 pointer-events-none'
      } ${className}`}
      style={{
        transitionDelay: delay ? `${delay}ms` : undefined,
      }}
    >
      {children}
    </div>
  );
}
