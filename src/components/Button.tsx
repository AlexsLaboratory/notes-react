import React, { FunctionComponent } from 'react';
import styles from "../scss/modules/button.module.scss";

interface OwnProps {
    type: "button" | "submit" | "reset";
    styleType: string;
    className?: string;
    children: React.ReactNode;
}

type Props = OwnProps;

const Button: FunctionComponent<Props> = (props) => {
    let buttonStyle;
    switch (props.styleType) {
        case 'primary':
            buttonStyle = 'button--primary';
            break;
        case 'outline-primary':
            buttonStyle = 'button--outline-primary';
            break;
        case 'secondary':
            buttonStyle = 'button--secondary';
            break;
        case 'outline-secondary':
            buttonStyle = 'button--outline-secondary';
            break;
        default:
            buttonStyle = 'button--primary';
            break;
    }

  return (
      <>
        <button type={props.type} className={`${styles.button} ${styles[buttonStyle]} ${props.className}`}>{props.children}</button>
      </>
  );
};

export default Button;
