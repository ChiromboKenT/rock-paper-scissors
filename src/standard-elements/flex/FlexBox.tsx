import React, { CSSProperties } from "react";
import flexBoxStyles from "./Flexbox.module.css";

const FlexBox = ({
  direction = "row",
  children,
  styles,
}: {
  direction?: "row" | "column";
  children: any;
  styles?: CSSProperties;
}) => {
  return (
    <div
      className={`${flexBoxStyles.flex} ${
        direction === "column" && flexBoxStyles.column
      }`}
      style={styles}
    >
      {children}
    </div>
  );
};

export default FlexBox;
