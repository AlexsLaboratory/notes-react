import React, { FunctionComponent } from 'react';
import styles from "../scss/modules/button.module.scss";

interface OwnProps {
    href: string;
    label: string;
    styleType: string;
    className?: string;
}

type Props = OwnProps;

const ButtonLink: FunctionComponent<Props> = (props) => {
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
        <a href={props.href} className={`${styles.button} ${styles[buttonStyle]} ${props.className}`}>{props.label}</a>
      </>
  );
};

export default ButtonLink;
