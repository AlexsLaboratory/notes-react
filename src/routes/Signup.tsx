import React, {FunctionComponent} from 'react';
import AuthProvider from "../providers/AuthProvider";
import Header from "../components/Header";
import "../scss/components/_forms.scss";
import "../scss/pages/_create_view_edit.scss";
import Form from "../components/Form";
import Button from '../components/Button';
import {useInput, ErrorMessage} from "../hooks/useInput";

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
                            <div className="form-group">
                                <label className="form-group__label" htmlFor="fname">First Name</label>
                                <input className="form-group__input" type="text" name="fname" id="fname" />
                            </div>
                            <div className="form-group">
                                <label className="form-group__label" htmlFor="lname">Last Name</label>
                                <input className="form-group__input" type="text" name="lname" id="lname"/>
                            </div>
                            <div className="form-group">
                                <label className="form-group__label" htmlFor="email">Email</label>
                                <input className="form-group__input" type="email" name="email" id="email" value={emailValue} onChange={valueChangeHandler} onBlur={inputBlurHandler}/>
                                {hasError && <span className="form-group__error">{errorMessage}</span>}
                            </div>
                            <div className="form-group">
                                <label className="form-group__label" htmlFor="password">Password</label>
                                <input className="form-group__input" type="password" name="password" id="password"/>
                            </div>
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
