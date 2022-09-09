import React, { FunctionComponent, MouseEventHandler } from "react";
import { Link } from "react-router-dom";
import styles from "../scss/modules/button.module.scss";

interface OwnProps {
  href?: string;
  label: string;
  styleType: string;
  className?: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
}

type Props = OwnProps;

const ButtonLink: FunctionComponent<Props> = (props) => {
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
    <>
      {
                props.onClick ? (
                  <button
                    type="button"
                    className={`${styles.button} ${styles[buttonStyle]} ${props.className}`}
                    onClick={props.onClick}
                  >
                    {props.label}
                  </button>
                ) : (
                  <Link
                    to={props.href || "#"}
                    className={`${styles.button} ${styles[buttonStyle]} ${props.className}`}
                  >
                    {props.label}
                  </Link>
                )
            }
    </>
  );
};

export default ButtonLink;
