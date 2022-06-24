import { useEffect, useRef, useState } from "react";
import { useAppDispatch } from "../app/hooks";
import useUpdateEffect from "./useUpdateEffect";

const useGameTimer = (initialTimer: number) => {
  const dispatch = useAppDispatch();
  const [timeValue, setTimeValue] = useState(initialTimer);
  const [secondsRemaining, setSecondsRemaining] = useState(initialTimer);
  const [timerStatus, setImerStatus] = useState<
    "START" | "PAUSE" | "STOP" | "PAUSE"
  >("STOP");

  const [initialTimerRun, setInitialTimerRun] = useState(true);

  const handleStart = () => {
    setImerStatus("START");
  };
  const handleRestart = () => {
    setInitialTimerRun(true);
    setImerStatus("START");
    setSecondsRemaining(timeValue);
    console.log(secondsRemaining);
  };
  const handleStop = () => {
    setImerStatus("STOP");
    setTimeValue(secondsRemaining);
  };
  const handlePause = () => {
    setInitialTimerRun(false);
    setImerStatus("PAUSE");
    setTimeValue(secondsRemaining);
  };
  const handleReset = () => {
    setInitialTimerRun(true);
    setImerStatus("STOP");
    setSecondsRemaining(initialTimer);
  };
  useInterval(
    () => {
      if (secondsRemaining > 0) {
        setSecondsRemaining(secondsRemaining - 1);
      } else {
        setImerStatus("STOP");
      }
    },
    timerStatus === "START" ? 1000 : null
    // passing null stops the interval
  );

  useUpdateEffect(() => {
    if (secondsRemaining <= 0) {
      setInitialTimerRun(false);
    }
  }, [secondsRemaining]);

  return {
    handleStart,
    handleStop,
    handleReset,
    handlePause,
    secondsRemaining,
    timerStatus,
    initialTimerRun,
    handleRestart,
  };
};

function useInterval(callback: any, delay: number | null) {
  const savedCallback = useRef<any>();

  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval.
  useEffect(() => {
    let id: any;
    function tick() {
      if (savedCallback.current) {
        savedCallback.current();
      }
    }
    if (delay !== null) {
      id = setInterval(tick, delay);
      return () => clearInterval(id);
    } else {
      clearInterval(id);
    }
  }, [delay]);
}

export default useGameTimer;
