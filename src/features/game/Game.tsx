import React, { useEffect } from "react";
import { useAppDispatch } from "../../app/hooks";
import useGameTimer from "../../hooks/useGameTimer";
import usePlayerState from "../../hooks/usePlayerState";
import Button from "../../standard-elements/button/Button";
import Card from "../../standard-elements/card/Card";
import FlexBox from "../../standard-elements/flex/FlexBox";
import Heading from "../../standard-elements/heading/Heading";

const Game = ({
  setScore,
  status,
  setStatus,
}: {
  status: string;
  setScore: () => void;
  setStatus: (status: string) => void;
}) => {
  const dispatch = useAppDispatch();
  const { setPlayerMove, result, playerMove, computerMove, getResult, reset } =
    usePlayerState(() => setScore());

  const {
    handleReset: resetTimer,
    handleStart,
    handlePause,
    handleStop,
    secondsRemaining,
    initialTimerRun,
    handleRestart,
  } = useGameTimer(5);

  const handleQuit = () => {
    handleStop();
  };
  const handleGamePause = () => {
    setStatus("paused");
    handlePause();
    handleStop();
  };
  const handleGameRestart = () => {
    setStatus("active");
    handleRestart();
  };
  const makeMove = (move: "rock" | "paper" | "scissors") => {
    setPlayerMove(move);
  };

  useEffect(() => {
    if (initialTimerRun) handleStart();

    if (status === "active" && secondsRemaining <= 0 && !result) {
      getResult();
    }
    return () => handleStop();
  }, [
    dispatch,
    getResult,
    handleStart,
    handleStop,
    initialTimerRun,
    result,
    secondsRemaining,
    status,
  ]);

  useEffect(() => {
    let resetNewGame: any;
    if (result) {
      resetNewGame = setTimeout(() => {
        resetTimer();
        reset();
      }, 2000);
    }
    return () => clearTimeout(resetNewGame);
  }, [reset, resetTimer, result]);

  return (
    <>
      {result ? (
        <Card styles={{ flex: "1" }}>
          <Heading text="Result" />
          <FlexBox>
            <Card>
              <p>{`You Picked: ${playerMove}`}</p>
              <p>{`Computer Picked: ${computerMove}`} </p>
              <p>{`You ${result}!`} </p>
            </Card>
          </FlexBox>
          <FlexBox>
            <Button
              styles={{ margin: "0.5rem 1rem" }}
              isGameButton
              text="Quit Game"
              handleOnClick={handleQuit}
            />
          </FlexBox>
        </Card>
      ) : (
        <Card styles={{ flex: "1" }}>
          <Heading text={`Time remaining : ${secondsRemaining}s`} />
          <Heading text="Select" />
          <FlexBox>
            <Button
              isGameButton
              text="ROCK"
              handleOnClick={() => makeMove("rock")}
            />
            <Button
              isGameButton
              text="PAPER"
              handleOnClick={() => makeMove("paper")}
            />
            <Button
              isGameButton
              text="SCISSORS"
              handleOnClick={() => makeMove("scissors")}
            />
          </FlexBox>
          <FlexBox styles={{ justifyContent: "flex-end" }}>
            {status !== "paused" ? (
              <Button
                variant="primary"
                text="Pause Game"
                handleOnClick={handleGamePause}
              />
            ) : (
              <Button
                variant="primary"
                text="Play Game"
                handleOnClick={handleGameRestart}
              />
            )}
            <Button
              variant="secondary"
              text="Quit Game"
              handleOnClick={() =>
                window.confirm("Are you sure you want to quit game?") &&
                window.close()
              }
            />
          </FlexBox>
        </Card>
      )}
    </>
  );
};

export default Game;
