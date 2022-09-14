import React, { useEffect } from "react";
import { useParams } from "react-router";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import formStyles from "../scss/modules/form.module.scss";
import Form from "../components/Form";
import Input from "../components/Input";
import Button from "../components/Button";
import { ErrorMessage, useInput } from "../hooks/useInput";
import useFetch from "../hooks/useFetch";

interface OwnProps {
}

type Props = OwnProps;

function Edit(props: Props) {
  const api = useFetch();
  const { id: noteId } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const {
    value: titleValue,
    setValue: setTitleValue,
    isValid: titleValid,
    errorMessage: titleErrorMessage,
    hasError: titleHasError,
    valueChangeHandler: titleChangeHandler,
    inputBlurHandler: titleInputBlurHandler,
    reset: titleReset,
  } = useInput((value: string, errorMessage: ErrorMessage) => {
    if (value.length === 0) {
      return [false, errorMessage.onEmpty];
    }
    return [true, ""];
  }, {
    onEmpty: "Title is required",
    onInvalid: "",
  });

  const {
    value: bodyValue,
    setValue: setBodyValue,
    isValid: bodyValid,
    errorMessage: bodyErrorMessage,
    hasError: bodyHasError,
    valueChangeHandler: bodyChangeHandler,
    inputBlurHandler: bodyInputBlurHandler,
    reset: bodyReset,
  } = useInput((value: string, errorMessage: ErrorMessage) => {
    if (value.length === 0) {
      return [false, errorMessage.onEmpty];
    }
    return [true, ""];
  }, {
    onEmpty: "Body is required",
    onInvalid: "",
  });

  useEffect(() => {
    const getNote = async () => {
      const headers: Headers = new Headers();
      headers.set("Content-Type", "application/json");
      const {
        response,
        data,
      } = await api(`/note/get?id=${noteId}`, {
        method: "GET",
        headers,
      });
      return { response, data };
    };

    getNote().then((note) => {
      setTitleValue(note.data.title);
      setBodyValue(note.data.body);
    });
  }, []);

  const onSubmitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const headers: Headers = new Headers();
    headers.set("Content-Type", "application/json");
    const {
      response,
    } = await api(`/note/edit?id=${noteId}`, {
      method: "PUT",
      body: JSON.stringify({
        title: titleValue,
        body: bodyValue,
      }),
      headers,
    });
    if (response.status === 201) {
      navigate("/", { replace: true });
    }
  };

  const formValid = !titleValid || !bodyValid;

  return (
    <>
      <Header />
      <div className={`grid ${formStyles["grid--site-form"]} ${formStyles["site-form"]}`}>
        <h1 className={`${formStyles["site-form__title"]}`}>Edit Note</h1>
        <div className={`${formStyles["site-form__content"]} ${formStyles["site-form__content--create-edit"]}`}>
          <Form onSubmit={onSubmitHandler}>
            <div className={`${formStyles["form-fields"]}`}>
              <Input
                label="Title"
                name="title"
                type="text"
                value={titleValue}
                onChange={titleChangeHandler}
                onBlur={titleInputBlurHandler}
                hasError={titleHasError}
                errorMessage={titleErrorMessage}
              />
              <Input
                label="Body"
                name="body"
                type="textarea"
                value={bodyValue}
                onChange={bodyChangeHandler}
                onBlur={bodyInputBlurHandler}
                hasError={bodyHasError}
                errorMessage={bodyErrorMessage}
              />
            </div>
            <Button
              type="submit"
              className={`${formStyles["site-form__action-btn"]} ${formStyles["site-form__action-btn--save"]} ${formStyles.form__button}`}
              styleType="primary"
              disabled={formValid}
            >
              Save
            </Button>
          </Form>
        </div>
      </div>
    </>
  );
}

export default Edit;
