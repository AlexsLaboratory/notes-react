import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import Header from "../components/Header";
import formStyles from "../scss/modules/form.module.scss";
import useFetch from "../hooks/useFetch";
import ButtonLink from "../components/ButtonLink";
import { Note } from "../../types";
import { useAuth } from "../context/AuthContext";

interface OwnProps {
}

type Props = OwnProps;

function View(props: Props) {
  const api = useFetch();
  const [note, setNote] = React.useState({} as Note);
  const auth = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  const { id: noteId } = useParams<{ id: string }>();
  useEffect(() => {
    if (!auth.isAuthenticated) return;
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
      setNote(note.data);
      setIsLoading(false);
    }).catch(() => {
      setIsLoading(false);
      setError(true);
      setNote({} as Note);
    });
  }, []);

  return (
    <>
      <Header />
      <div className={`grid ${formStyles["grid--site-form"]} ${formStyles["site-form"]}`}>
        {!isLoading && auth.isAuthenticated && !error && (
          <>
            <h1 className={`${formStyles["site-form__title"]}`}>{note.title}</h1>
            <p className={`${formStyles["site-form__content"]} ${formStyles["site-form__content--view"]}`}>
              {note.body}
            </p>
          </>
        )}
        {isLoading && auth.isAuthenticated && !error && (
        <FontAwesomeIcon
          icon={faSpinner}
          className={`fa-spin-pulse fa-3x ${formStyles["site-form__content__message"]}`}
        />
        )}
        {error && <p className={formStyles["site-form__content__message"]}>Something went wrong</p>}
        <ButtonLink
          label="Back"
          styleType="primary"
          href="/"
          className={`${formStyles["site-form__action-btn"]}`}
        />
      </div>
    </>
  );
}

export default View;
