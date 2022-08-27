import React, {FunctionComponent, useEffect} from 'react';
import Header from "../components/Header";
import formStyles from "../scss/modules/form.module.scss";
import Form from "../components/Form";
import Input from "../components/Input";
import Button from "../components/Button";
import {ErrorMessage, useInput} from "../hooks/useInput";
import Alert from "../components/Alert";
import {useNavigate} from "react-router-dom";
import {useAlert, useAlertSet} from "../context/AlertContext";
import {useAuth, useAuthSet} from "../context/AuthContext";
import {loginUser} from "../services/User";

interface OwnProps {
}

type Props = OwnProps;

const Login: FunctionComponent<Props> = (props) => {
    const alert = useAlert();
    const alertSet = useAlertSet();
    const auth = useAuth();
    const authSet = useAuthSet();
    const navigate = useNavigate();

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

    useEffect(() => {
        if (alert.type === "success" && alert.message.length > 0) {
            navigate("/", {
                replace: true,
                state: alert
            });
        }
    }, [alert]);

    const onSubmitHandler = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        loginUser({
            email: emailValue,
            password: passwordValue
        }).then((response) => response.json().then(res => ({status: response.status, ...res})))
            .then((apiResponse) => {
                if (apiResponse.status === 200) {
                    authSet({
                        isAuthenticated: true,
                        accessToken: apiResponse.accessToken,
                        refreshToken: apiResponse.refreshToken,
                    });
                } else {
                    authSet({
                        isAuthenticated: false,
                        accessToken: null,
                        refreshToken: null,
                    });
                }
            }).catch((error) => {
            console.error('Error:', error);
        });
        // alertSet({message: "Sorry something happened on our end.", type: "success"});
        emailReset();
        passwordReset();
    }


    return (
        <>
            {alert.message !== "" && <Alert message={alert.message} type={alert.type} onClose={() => {
                alertSet({message: "", type: "success"});
            }}/>}
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