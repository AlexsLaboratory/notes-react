import React, {FunctionComponent} from 'react';
import inputStyles from '../scss/modules/input.module.scss';

interface OwnProps {
    label: string;
    name: string;
    type: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
    value?: string;
    hasError?: boolean;
    errorMessage?: string;
}

type Props = OwnProps;

const Input: FunctionComponent<Props> = (props) => {

    return (
        <div className={inputStyles["input-group"]}>
            <label className={inputStyles["input-group__label"]} htmlFor={props.name}>{props.label}</label>
            <input className={inputStyles["input-group__input"]} type={props.type} name={props.name} id={props.name} onChange={props.onChange} onBlur={props.onBlur} value={props.value}/>
            {props.hasError && <span className={`${inputStyles["input-group__error"]}`}>{props.errorMessage}</span>}
        </div>
    );
};

export default Input;
