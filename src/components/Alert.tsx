import React, {FunctionComponent} from 'react';
import styles from '../scss/modules/alert.module.scss';
import {faXmark} from '@fortawesome/free-solid-svg-icons'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

interface OwnProps {
    onClose: () => void;
    message: string;
    type: "success" | "error";
}

type Props = OwnProps;

const Alert: FunctionComponent<Props> = (props) => {
    return (
        <div className={`${styles.alert} ${styles["alert--success"]}`}>
            <p>{props.message}</p>
            <FontAwesomeIcon icon={faXmark} className={`${styles.alert__close}`} onClick={(e) => {
                props.onClose();
            }}/>
        </div>
    );
};

export default Alert;
