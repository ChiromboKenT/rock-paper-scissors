import { useCallback, useState } from "react";
import { mod } from "../util/mod";
import useUpdateEffect from "./useUpdateEffect";
export type GameRules = "rock" | "paper" | "scissors";
export type GameResult = "won" | "lost" | "drew";

const usePlayerState = (cb: () => void) => {
  const [playerMove, setPlayerMove] = useState<null | GameRules>(null);
  const [computerMove, setComputerMove] = useState<null | GameRules>(null);
  const [result, setResult] = useState<null | GameResult>(null);
  const reset = () => {
    setPlayerMove(null);
    setComputerMove(null);
    setResult(null);
  };
  const getResult = useCallback(() => {
    const options = ["rock", "paper", "scissors"];
    const computerMove = options[Math.floor(Math.random() * 3)] as GameRules;
    if (!playerMove) {
      setPlayerMove(options[Math.floor(Math.random() * 3)] as GameRules);
    }
    setComputerMove(computerMove);
    const userIndx = options.indexOf(playerMove!);
    const computerIndx = options.indexOf(computerMove);

    if (userIndx === computerIndx) {
      setResult("drew");
      return "drew";
    }
    if (mod(userIndx - computerIndx, options.length) < options.length / 2) {
      setResult("won");
      cb();
      return "won";
    } else {
      setResult("lost");
      return "lost";
    }
  }, [playerMove]);

  useUpdateEffect(() => {
    if (playerMove) {
      getResult();
    }
  }, [playerMove]);

  return {
    reset,
    playerMove,
    computerMove,
    setPlayerMove: (move: "rock" | "paper" | "scissors") => setPlayerMove(move),
    getResult,
    result,
  };
};

export default usePlayerState;
