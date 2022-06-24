import React from "react";
import textStyles from "./Text.module.css";
const Text = ({ text }: { text: string }) => {
  return <p className={textStyles.text}>{text}</p>;
};

export default Text;
