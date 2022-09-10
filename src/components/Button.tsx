import React, { FunctionComponent } from "react";
import styles from "../scss/modules/button.module.scss";

interface OwnProps {
  type: "button" | "submit" | "reset";
  styleType: string;
  className?: string;
  disabled?: undefined | boolean;
  onClick?: undefined | ((event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void);
  children: React.ReactNode;
}

type Props = OwnProps;

function Button(props: Props) {
  let buttonStyle;
  switch (props.styleType) {
    case "primary":
      buttonStyle = "button--primary";
      break;
    case "outline-primary":
      buttonStyle = "button--outline-primary";
      break;
    case "secondary":
      buttonStyle = "button--secondary";
      break;
    case "outline-secondary":
      buttonStyle = "button--outline-secondary";
      break;
    case "delete":
      buttonStyle = "button--delete";
      break;
    case "view":
      buttonStyle = "button--view";
      break;
    case "edit":
      buttonStyle = "button--edit";
      break;
    default:
      buttonStyle = "button--primary";
      break;
  }

  return (
    <button
      type={props.type}
      onClick={props.onClick}
      className={`${styles.button} ${styles[buttonStyle]} ${props.className}`}
      disabled={props.disabled}
    >
      {props.children}
    </button>
  );
}

export default Button;
