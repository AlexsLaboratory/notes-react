import React, {FunctionComponent} from 'react';
import AuthProvider from "../providers/AuthProvider";
import Header from "../components/Header";
import "../scss/components/_forms.scss";
import "../scss/pages/_create_view_edit.scss";
import Form from "../components/Form";
import Button from '../components/Button';
import {useInput, ErrorMessage} from "../hooks/useInput";
import Input from "../components/Input";

interface OwnProps {
}

type Props = OwnProps;

const Signup: FunctionComponent<Props> = (props) => {
    const {value: emailValue, isValid, errorMessage, hasError, valueChangeHandler, inputBlurHandler, reset} = useInput((value: string, errorMessage: ErrorMessage) => {
        if (value.length === 0) {
            return [false, errorMessage.onEmpty]
        }
        const pattern = /\w+@\w+\.[a-z]{2,}/
        if (!pattern.test(value)) {
            return [false, errorMessage.onInvalid]
        }
        return [true, ""]
    }, {onEmpty: "Email is required", onInvalid: "Email is invalid"});

    return (
        <AuthProvider>
            <Header/>
            <div className="grid grid--site-form site-form">
                <h1 className="site-form__title">Signup</h1>
                <div className="site-form__content site-form__content--create-edit">
                    <Form className="form" onSubmit={(e) => {
                        e.preventDefault();
                        console.log(e);
                        reset();
                    }}>
                        <div className="form-fields">
                            <Input label="First Name" name="fname" type="text" />
                            <Input label="Last Name" name="lname" type="text" />
                            <Input label="Email" name="email" type="email" value={emailValue} onChange={valueChangeHandler} onBlur={inputBlurHandler} hasError={hasError} errorMessage={errorMessage} />
                            <Input label="Password" name="current-password" type="password" />
                        </div>
                        <Button type="submit"
                                className="button button--primary button--nav site-form__action-btn site-form__action-btn--save form__button" styleType="primary">
                            Create
                        </Button>
                    </Form>
                </div>
            </div>
        </AuthProvider>
);
};

export default Signup;
