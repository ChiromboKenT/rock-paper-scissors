import React, { CSSProperties, MouseEventHandler } from "react";
import buttonStyles from "./Button.module.css";
const Button = ({
  text,
  styles,
  isGameButton,
  handleOnClick,
  variant = "primary",
}: {
  text: string;
  variant?: "primary" | "secondary";
  isGameButton?: boolean;
  styles?: CSSProperties;
  handleOnClick: MouseEventHandler<HTMLButtonElement>;
}) => {
  return (
    <button
      onClick={handleOnClick}
      className={`${buttonStyles.button} ${
        variant === "secondary" && buttonStyles.secondary
      } ${isGameButton && buttonStyles.game} `}
      style={styles}
    >
      {text}
    </button>
  );
};

export default Button;
