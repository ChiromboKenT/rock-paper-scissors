import React, { CSSProperties } from "react";
import cardStyles from "./Card.module.css";

const Card = ({
  children,
  styles,
}: {
  children: any;
  styles?: CSSProperties;
}) => {
  return (
    <div className={cardStyles.card} style={styles}>
      {children}
    </div>
  );
};

export default Card;
