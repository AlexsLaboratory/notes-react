import React, {FunctionComponent, SyntheticEvent, useEffect, useRef} from 'react';
import styles from '../scss/modules/alert.module.scss';
import {faXmark} from '@fortawesome/free-solid-svg-icons'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import AlertProps from "../interfaces/AlertProps";

interface OwnProps {
    alert: AlertProps;
    onClose: () => void;
}

type Props = OwnProps;

const Alert: FunctionComponent<Props> = (props) => {
    return (
        <div className={`${styles.alert} ${styles["alert--success"]}`}>
            <p>{props.alert.message}</p>
            <FontAwesomeIcon icon={faXmark} className={`${styles.alert__close}`} onClick={(e) => {
                props.onClose();
            }} />
        </div>
    );
};

export default Alert;
