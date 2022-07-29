import React, {FunctionComponent} from 'react';
import formStyles from '../scss/modules/form.module.scss';

interface OwnProps {
    children: React.ReactNode;
    onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
    className?: string;
}

type Props = OwnProps;

const Form: FunctionComponent<Props> = (props) => {

    return (
        <form className={`${formStyles.form} grid ${formStyles["grid--form"]} ${props.className}`} onSubmit={props.onSubmit} method="post">
            {props.children}
        </form>
    );
};

export default Form;
