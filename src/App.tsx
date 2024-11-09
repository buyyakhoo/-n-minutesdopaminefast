import { useState, useEffect, } from 'react'
import { useDetectEvent } from './scripts/useDetectEvent';
import { useTimer } from './scripts/useTimer'

import './App.css'

interface Timer {
  times: number;
  seconds: number;
  minutes: number;
}

interface UseTimer {
  timer: Timer;
  isWorking: boolean;
  startTimer: () => void;
  stopTimer: () => void;
  clearTimer: () => void;
}

interface UseDetectEvent {
  isTabActive: boolean;
  isMouseMove: boolean;
}

function App() {
  const { isTabActive, isMouseMove } : UseDetectEvent = useDetectEvent();

  const [minsHandle, setMinsHandle] : [number, React.Dispatch<React.SetStateAction<number>>] = useState<number>(0);
  const { timer, isWorking, startTimer, clearTimer } : UseTimer = useTimer(minsHandle);

  const [status, setStatus] : [string, React.Dispatch<React.SetStateAction<string>>] = useState<string>("keep going!");

  useEffect(() => {
    if ((!isTabActive || isMouseMove) && isWorking) {
      clearTimer();
      setStatus("ฮั่นแน่ ทำไรๆ เห็นนะ");
    } else if (isTabActive && !isMouseMove && isWorking) {
      startTimer();
      setStatus("keep going!");
    }
  }, [isTabActive, isMouseMove]);


  const handleInputChange = (e : React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value, 10);
    if (!isNaN(value) && value > 0) {
      console.log(value);
      setMinsHandle(value); 
    } 
  }

  return (
    <>
      <div className="w-screen h-screen bg-gradient-to-r from-blue-950 via-blue-900 to-blue-950 flex flex-col gap-4 items-center justify-center">
        <p className="text-6xl tiny5-regular text-white">(n) minutes dopamine fast</p>
        { 
          !isWorking ? (
            <div className="flex items-center space-x-2">
              <input
                  type="number"
                  placeholder="input minutes"
                  className="px-4 py-2 border text-white bg-blue-950 border-blue-900 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-900"
                  onChange={handleInputChange}
                  min="0"
                  step="1" 
              />
              <button
                  className="px-4 py-2 text-white bg-blue-950 rounded-md hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-800"       
                  onClick={startTimer}
              >
                Start
              </button>
            </div>
          ) : (
            <div className="text-white mt-4 flex flex-col items-center">
              <p className="text-2xl mb-2">Don't do everything, just stare on the screen.</p>
              <p className="text-1xl mb-2 noto-sans-thai bg-red-800 p-1 rounded-xl">{status}</p>
              <p className="text-4xl">{timer.minutes}:{timer.seconds.toString().padStart(2, '0')}</p>
            </div>
          )
        }

      </div>
    </>
  )
}

export default App
