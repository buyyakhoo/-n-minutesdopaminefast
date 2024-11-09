import { useState, useRef } from 'react';

interface Timer {
    times: number;
    seconds: number;
    minutes: number;
  }

function useTimer(initialMinutes : number) {
    const intervalRef : React.MutableRefObject<number> = useRef<ReturnType<typeof setInterval>>(0);

    const [timer, setTimer] : [Timer, React.Dispatch<React.SetStateAction<Timer>>] = useState<Timer>({
        times: 0,
        seconds: 0,
        minutes: 0
    });

    const [isWorking, setIsWorking] : [boolean, React.Dispatch<React.SetStateAction<boolean>>] = useState<boolean>(false);
    
    const startTimer = () : void => {
        inputTimer();
        runTimer();
        setIsWorking(true);
    }

    const stopTimer = () : void => {
        clearInterval(intervalRef.current);
        setIsWorking(false);
    }

    const clearTimer = () : void => {
        clearInterval(intervalRef.current);
    }

    const inputTimer = () : void => {
        setTimer({
            times: initialMinutes  * 60,
            seconds: 0,
            minutes: initialMinutes 
        })
    }

    const runTimer = () : void => {
        clearTimer();

        const timerInterval : number = setInterval(() => {
            setTimer((prevTimer) => {

                if (prevTimer.times <= 0) {
                    stopTimer();
                    return { times: 0, seconds: 0, minutes: 0};
                }

                const updatedTimes : number = prevTimer.times - 1;

                return {
                    times: updatedTimes,
                    seconds: updatedTimes % 60,
                    minutes: Math.floor(updatedTimes / 60)
                };
                
            });
        }, 1000);

        intervalRef.current = timerInterval;
    }


    return { timer, isWorking, startTimer, stopTimer, clearTimer };
  
}

export { useTimer };