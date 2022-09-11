import React, {
  useCallback, useEffect, useRef, useState,
} from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import Header from "../components/Header";
import homeStyles from "../scss/modules/home.module.scss";
import Note from "../components/Note";
import { timeSince } from "../utils/time";
import useFetch from "../hooks/useFetch";
import { Note as NoteData, Page } from "../../types";
import { useAuth } from "../context/AuthContext";

function App() {
  const api = useFetch();
  const auth = useAuth();
  const headers = new Headers();
  const [notes, setNotes] = useState([] as NoteData[]);
  const [isLoading, setIsLoading] = useState(true);
  const [next, setNext] = useState<number | null>(null);
  const [error, setError] = useState(false);
  const [limit] = useState(5);
  const [cursor, setCursor] = useState<number | null>(null);

  const observer = useRef<any>(null);
  const lastNoteElementRef = useCallback((node: any) => {
    if (isLoading) return;
    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver((entries: any) => {
      if (entries[0].isIntersecting && next !== null) {
        setCursor(next);
      }
    });
    if (node) observer.current.observe(node);
  }, [isLoading, next]);
  headers.set("Content-Type", "application/json");

  async function getData(limit: number, cursor: number | null) {
    const {
      data,
    } = await api(`/note/get-all?limit=${limit}&cursor=${cursor}`, {
      method: "GET",
      headers,
    });
    return data as Page;
  }

  useEffect(() => {
    if (auth.isAuthenticated) return;
    setNotes([]);
  }, [auth]);

  useEffect(() => {
    if (!auth.isAuthenticated) return;
    setIsLoading(true);
    getData(limit, cursor)
      .then((page) => {
        setNotes((prevNotes) => [...prevNotes, ...page.data]);
        setNext(page.next);
        setIsLoading(false);
        setError(false);
      })
      .catch(() => {
        setIsLoading(false);
        setError(true);
        setNotes([]);
      });
  }, [limit, cursor, auth]);

  return (
    <>
      <Header />
      <div className={`${homeStyles.grid} ${homeStyles.content}`}>
        <h1 className={`${homeStyles.content__title}`}>My Notes</h1>
        <div className={`${homeStyles.grid} ${homeStyles.content__items} ${homeStyles["grid--items"]}`}>
          {notes.map((note: NoteData, index) => {
            if (notes.length === index + 1) {
              return (
                <Note
                  key={note.id}
                  ref={lastNoteElementRef}
                  id={note.id}
                  title={note.title}
                  body={note.body}
                  timestamp={timeSince(note.createdAt)}
                />
              );
            }
            return (
              <Note
                key={note.id}
                title={note.title}
                body={note.body}
                id={note.id}
                timestamp={timeSince(note.createdAt)}
              />
            );
          })}
          {isLoading && auth.isAuthenticated && (
            <FontAwesomeIcon
              icon={faSpinner}
              className={`fa-spin-pulse fa-3x ${homeStyles.content__items__message}`}
            />
          )}
          {!auth.isAuthenticated && <p className={`${homeStyles.content__items__message}`}>You need to login to see your notes</p>}
          {error && <p className={`${homeStyles.content__items__message}`}>Something went wrong</p>}
        </div>
      </div>
    </>
  );
}

export default App;
