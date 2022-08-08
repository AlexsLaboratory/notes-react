import React, {FunctionComponent} from 'react';
import AuthProvider from "../providers/AuthProvider";
import Header from "../components/Header";
import Form from "../components/Form";
import Button from '../components/Button';
import {useInput, ErrorMessage} from "../hooks/useInput";
import Input from "../components/Input";
import formStyles from '../scss/modules/form.module.scss';

interface OwnProps {
}

type Props = OwnProps;

const Signup: FunctionComponent<Props> = (props) => {
    const {
        value: emailValue,
        isValid: emailValid,
        errorMessage: emailErrorMessage,
        hasError: emailHasError,
        valueChangeHandler: emailChangeHandler,
        inputBlurHandler: emailInputBlurHandler,
        reset: emailReset
    } = useInput((value: string, errorMessage: ErrorMessage) => {
        if (value.length === 0) {
            return [false, errorMessage.onEmpty]
        }
        const pattern = /\w+@\w+\.[a-z]{2,}/
        if (!pattern.test(value)) {
            return [false, errorMessage.onInvalid]
        }
        return [true, ""]
    }, {onEmpty: "Email is required", onInvalid: "Email is invalid"});

    const {
        value: firstNameValue,
        isValid: firstNameValid,
        errorMessage: firstNameErrorMessage,
        hasError: firstNameHasError,
        valueChangeHandler: firstNameChangeHandler,
        inputBlurHandler: firstNameInputBlurHandler,
        reset: firstNameReset
    } = useInput((value: string, errorMessage: ErrorMessage) => {
        if (value.length === 0) {
            return [false, errorMessage.onEmpty]
        }
        return [true, ""]
    }, {onEmpty: "First name is required", onInvalid: ""});
    const {
        value: lastNameValue,
        isValid: lastNameValid,
        errorMessage: lastNameErrorMessage,
        hasError: lastNameHasError,
        valueChangeHandler: lastNameChangeHandler,
        inputBlurHandler: lastNameInputBlurHandler,
        reset: lastNameReset
    } = useInput((value: string, errorMessage: ErrorMessage) => {
        if (value.length === 0) {
            return [false, errorMessage.onEmpty]
        }
        return [true, ""]
    }, {onEmpty: "Last name is required", onInvalid: ""});
    const {
        value: passwordValue,
        isValid: passwordValid,
        errorMessage: passwordErrorMessage,
        hasError: passwordHasError,
        valueChangeHandler: passwordChangeHandler,
        inputBlurHandler: passwordInputBlurHandler,
        reset: passwordReset
    } = useInput((value: string, errorMessage: ErrorMessage) => {
        if (value.length === 0) {
            return [false, errorMessage.onEmpty]
        }
        const pattern = /^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[!"#$%&"()\*+,\-\./:;<=>?@\[\\\]\^_`{|}~])(?!.*\s).{8,32}$/
        if (!pattern.test(value)) {
            return [false, errorMessage.onInvalid]
        }
        return [true, ""]
    }, {
        onEmpty: "Password is required",
        onInvalid: ["At least one number.", "At lest one lower case letter", "At lest one upper case letter", "At lest one special character", "At least one special character", "Must be 8 to 32 characters long"]
    });

    return (
        <AuthProvider>
            <Header/>
            <div className={`grid ${formStyles["grid--site-form"]} ${formStyles["site-form"]}`}>
                <h1 className={`${formStyles["site-form__title"]}`}>Signup</h1>
                <div className={`${formStyles["site-form__content"]} ${formStyles["site-form__content--create-edit"]}`}>
                    <Form onSubmit={(e) => {
                        e.preventDefault();
                        console.log(e);
                        emailReset();
                        firstNameReset();
                    }}>
                        <div className={`${formStyles["form-fields"]}`}>
                            <Input label="First Name"
                                   name="fname"
                                   type="text"
                                   value={firstNameValue}
                                   onChange={firstNameChangeHandler}
                                   onBlur={firstNameInputBlurHandler}
                                   hasError={firstNameHasError}
                                   errorMessage={firstNameErrorMessage}/>
                            <Input label="Last Name"
                                   name="lname"
                                   type="text"
                                   value={lastNameValue}
                                   onChange={lastNameChangeHandler}
                                   onBlur={lastNameInputBlurHandler}
                                   hasError={lastNameHasError}
                                   errorMessage={lastNameErrorMessage}/>
                            <Input label="Email"
                                   name="email"
                                   type="email"
                                   value={emailValue}
                                   onChange={emailChangeHandler}
                                   onBlur={emailInputBlurHandler}
                                   hasError={emailHasError}
                                   errorMessage={emailErrorMessage}/>
                            <Input label="Password"
                                   name="current-password"
                                   type="password"
                                   value={passwordValue}
                                   onChange={passwordChangeHandler}
                                   onBlur={passwordInputBlurHandler}
                                   hasError={passwordHasError}
                                   errorMessage={passwordErrorMessage}/>
                        </div>
                        <Button type="submit"
                                className={`${formStyles["site-form__action-btn"]} ${formStyles["site-form__action-btn--save"]} ${formStyles.form__button}`}
                                styleType="primary">
                            Create
                        </Button>
                    </Form>
                </div>
            </div>
        </AuthProvider>
    );
};
export default Signup;
