import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

export default function TopLoadingBar() {
  const location = useLocation();
  const [phase, setPhase] = useState('idle');

  useEffect(() => {
    setPhase('running');
    const finish = setTimeout(() => setPhase('done'), 400);
    const reset  = setTimeout(() => setPhase('idle'), 700);
    return () => {
      clearTimeout(finish);
      clearTimeout(reset);
    };
  }, [location.pathname]);

  if (phase === 'idle') return null;

  return (
    <div
      className={[
        'fixed top-0 left-0 h-[3px] bg-primary/75 z-[200]',
        'transition-all ease-out',
        phase === 'running' ? 'w-3/4 duration-300' : '',
        phase === 'done'    ? 'w-full duration-200' : '',
      ].join(' ')}
    />
  );
}
