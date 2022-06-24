import React, { useState } from "react";
import "./App.css";
import Game from "./features/game/Game";
import Card from "./standard-elements/card/Card";
import FlexBox from "./standard-elements/flex/FlexBox";
import Heading from "./standard-elements/heading/Heading";
import Text from "./standard-elements/text/Text";

function App() {
  const [score, setScore] = useState(0);
  const [status, setStatus] = useState("active");
  const handleSetScore = () => {
    setScore((sore) => score + 1);
  };
  return (
    <div className="App">
      <Heading text="Rock Paper Scissors" />
      <FlexBox direction="column">
        <Card>
          <Heading text="Player Score:" />
          <Text text={`${score}`} />
        </Card>
        <Game
          setScore={handleSetScore}
          status={status}
          setStatus={(status: string) => setStatus(status)}
        />
      </FlexBox>
    </div>
  );
}

export default App;
