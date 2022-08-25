import React, {FunctionComponent} from 'react';
import styles from "../scss/modules/button.module.scss";
import {Link} from "react-router-dom";

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
            <Link to={props.href}
                  className={`${styles.button} ${styles[buttonStyle]} ${props.className}`}>{props.label}</Link>
        </>
    );
};

export default ButtonLink;
