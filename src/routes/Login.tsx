import React, {FunctionComponent} from 'react';
import Header from "../components/Header";
import formStyles from "../scss/modules/form.module.scss";
import Form from "../components/Form";
import Input from "../components/Input";
import Button from "../components/Button";
import {ErrorMessage, useInput} from "../hooks/useInput";
import {useNavigate} from "react-router-dom";
import {useAuthSet} from "../context/AuthContext";
import useFetch from "../hooks/useFetch";
import {useLocation} from "react-router";

interface OwnProps {
}

type Props = OwnProps;

const Login: FunctionComponent<Props> = (props) => {
    const authSet = useAuthSet();
    const navigate = useNavigate();
    const location = useLocation();
    const api = useFetch();

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
        onInvalid: ["At least one number", "At lest one lower case letter", "At lest one upper case letter", "At lest one special character", "At least one special character", "Must be 8 to 32 characters long"]
    });

    // @ts-ignore
    const redirectPath = location.state?.path || "/";

    const onSubmitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const headers: Headers = new Headers();
        headers.set("Content-Type", "application/json");
        const {response, data} = await api("/auth/login", {
            method: "POST",
            body: JSON.stringify({email: emailValue, password: passwordValue}),
            headers
        });
        if (response.status === 200) {
            authSet({
                isAuthenticated: true,
                accessToken: data.accessToken,
                refreshToken: data.refreshToken,
            });
        } else {
            authSet({
                isAuthenticated: false,
                accessToken: null,
                refreshToken: null,
            });
        }
        emailReset();
        passwordReset();
        navigate(redirectPath, {replace: true});
    }


    return (
        <>
            <Header/>
            <div className={`grid ${formStyles["grid--site-form"]} ${formStyles["site-form"]}`}>
                <h1 className={`${formStyles["site-form__title"]}`}>Login</h1>
                <div className={`${formStyles["site-form__content"]} ${formStyles["site-form__content--create-edit"]}`}>
                    <Form onSubmit={onSubmitHandler}>
                        <div className={`${formStyles["form-fields"]}`}>
                            <Input label="Email"
                                   name="email"
                                   type="email"
                                   value={emailValue}
                                   onChange={emailChangeHandler}
                                   onBlur={emailInputBlurHandler}
                            />
                            <Input label="Password"
                                   name="current-password"
                                   type="password"
                                   value={passwordValue}
                                   onChange={passwordChangeHandler}
                                   onBlur={passwordInputBlurHandler}
                            />
                        </div>
                        <Button type="submit"
                                className={`${formStyles["site-form__action-btn"]} ${formStyles["site-form__action-btn--save"]} ${formStyles.form__button}`}
                                styleType="primary">
                            Login
                        </Button>
                    </Form>
                </div>
            </div>
        </>
    );

};

export default Login;