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
import {createUser} from "../services/User";
import useFetch from "../hooks/useFetch";

interface OwnProps {
}

type Props = OwnProps;

const New: FunctionComponent<Props> = (props) => {
    const api = useFetch();
    const {
        value: titleValue,
        isValid: titleValid,
        errorMessage: titleErrorMessage,
        hasError: titleHasError,
        valueChangeHandler: titleChangeHandler,
        inputBlurHandler: titleInputBlurHandler,
        reset: titleReset
    } = useInput((value: string, errorMessage: ErrorMessage) => {
        if (value.length === 0) {
            return [false, errorMessage.onEmpty]
        }
        return [true, ""]
    }, {onEmpty: "Title is required", onInvalid: ""});

    const {
        value: bodyValue,
        isValid: bodyValid,
        errorMessage: bodyErrorMessage,
        hasError: bodyHasError,
        valueChangeHandler: bodyChangeHandler,
        inputBlurHandler: bodyInputBlurHandler,
        reset: bodyReset
    } = useInput((value: string, errorMessage: ErrorMessage) => {
        if (value.length === 0) {
            return [false, errorMessage.onEmpty]
        }
        return [true, ""]
    }, {onEmpty: "Body is required", onInvalid: ""});

    const onSubmitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const headers: Headers = new Headers();
        headers.set("Content-Type", "application/json");
        const {response, data} = await api("/note/create", {
            method: "POST",
            body: JSON.stringify({title: titleValue, body: bodyValue}),
            headers
        })
        titleReset();
        bodyReset();
    }

    const formValid = !titleValid || !bodyValid;

    return (
        <>
            <Header/>
            <div className={`grid ${formStyles["grid--site-form"]} ${formStyles["site-form"]}`}>
                <h1 className={`${formStyles["site-form__title"]}`}>New Note</h1>
                <div className={`${formStyles["site-form__content"]} ${formStyles["site-form__content--create-edit"]}`}>
                    <Form onSubmit={onSubmitHandler}>
                        <div className={`${formStyles["form-fields"]}`}>
                            <Input label="Title"
                                   name="title"
                                   type="text"
                                   value={titleValue}
                                   onChange={titleChangeHandler}
                                   onBlur={titleInputBlurHandler}
                                   hasError={titleHasError}
                                   errorMessage={titleErrorMessage}/>
                            <Input label="Body"
                                   name="body"
                                   type="textarea"
                                   value={bodyValue}
                                   onChange={bodyChangeHandler}
                                   onBlur={bodyInputBlurHandler}
                                   hasError={bodyHasError}
                                   errorMessage={bodyErrorMessage}/>
                        </div>
                        <Button type="submit"
                                className={`${formStyles["site-form__action-btn"]} ${formStyles["site-form__action-btn--save"]} ${formStyles.form__button}`}
                                styleType="primary" disabled={formValid}>
                            Create
                        </Button>
                    </Form>
                </div>
            </div>
        </>
    );

};

export default New;
