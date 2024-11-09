import { useState, useEffect, useRef } from 'react';

function useDetectEvent() {
    
  const [isTabActive, setIsTabActive] : [boolean, React.Dispatch<React.SetStateAction<boolean>>] = useState<boolean>(true);
  const [isMouseMove, setIsMouseMove] : [boolean, React.Dispatch<React.SetStateAction<boolean>>] = useState<boolean>(false);

  const mouseMoveTimeoutRef : React.MutableRefObject<number> = useRef<ReturnType<typeof setTimeout>>(-1);

  const clearTimeoutTimer = () : void => {
    if (haveMouseMoveTimeoutRef())  {
      clearTimeout(mouseMoveTimeoutRef.current);
    }
  }

  const haveMouseMoveTimeoutRef = () : boolean => {
    return mouseMoveTimeoutRef.current > -1;
  }
  
  useEffect(() => {
    
    const handleVisibilityChange = () : void => {
      setIsTabActive(document.visibilityState == 'visible');
    }

    const handleMouseMove = () : void => {
      clearTimeoutTimer();
      setIsMouseMove(true);

      mouseMoveTimeoutRef.current = setTimeout(() => {
        setIsMouseMove(false);
      }, 1000);
    }
    
    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.addEventListener('mousemove', handleMouseMove);
    }
  }, []);

  return { isTabActive, isMouseMove };

}

export { useDetectEvent };