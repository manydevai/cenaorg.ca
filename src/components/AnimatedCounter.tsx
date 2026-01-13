import { useCountUp } from '../hooks/useCountUp';

interface AnimatedCounterProps {
  end: number;
  duration?: number;
  suffix?: string;
  className?: string;
  enableScrollSpy?: boolean;
  repeat?: boolean;
  repeatDelay?: number;
}

export function AnimatedCounter({ 
  end, 
  duration = 2000, 
  suffix = '', 
  className = '',
  enableScrollSpy = true,
  repeat = false,
  repeatDelay = 2000
}: AnimatedCounterProps) {
  const { count, elementRef, restart } = useCountUp({ 
    end, 
    duration, 
    suffix,
    enableScrollSpy,
    repeat,
    repeatDelay
  });

  return (
    <div 
      ref={elementRef} 
      className={`${className} cursor-pointer transition-transform hover:scale-110`}
      onMouseEnter={restart}
    >
      {count}
    </div>
  );
}