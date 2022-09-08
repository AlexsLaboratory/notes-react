import Header from "../components/Header";
import React, {useCallback, useEffect, useRef, useState} from "react";
import homeStyles from "../scss/modules/home.module.scss";
import headerStyles from "../scss/modules/header.module.scss";
import ButtonLink from "../components/ButtonLink";
import Button from "../components/Button";
import Note from "../components/Note";
import {timeSince} from "../utils/time";
import useFetch from "../hooks/useFetch";
import {Note as NoteData, Page} from "../../types";

function App() {
    const api = useFetch();
    const headers = new Headers();
    const [notes, setNotes] = useState([] as NoteData[]);
    const [isLoading, setIsLoading] = useState(true);
    const [next, setNext] = useState<number | null>(null);
    const [limit, setLimit] = useState(5);
    const [cursor, setCursor] = useState<number | null>(null);

    const observer = useRef<any>(null);
    const lastNoteElementRef = useCallback((node: any) => {
        if (isLoading) return;
        if (observer.current) observer.current.disconnect();
        observer.current = new IntersectionObserver((entries: any) => {
            if (entries[0].isIntersecting && next !== null) {
                setCursor(next);
            }
        })
        if (node) observer.current.observe(node);
    }, [isLoading, next]);
    headers.set("Content-Type", "application/json");

    async function getData(limit: number, cursor: number | null) {
        const {response, data} = await api(`/note/get-all?limit=${limit}&cursor=${cursor}`, {
            method: "GET",
            headers
        });
        return data as Page;
    }

    useEffect(() => {
        setIsLoading(true);
        getData(limit, cursor).then((page) => {
            setNotes((prevNotes) => {
                return [...prevNotes, ...page.data]
            });
            setNext(page.next);
            setIsLoading(false);
        })
    }, [limit, cursor])

    return (
        <>
            <Header/>
            <div className={`${homeStyles.grid} ${homeStyles['grid--content']} ${homeStyles.content}`}>
                <h1 className={`${homeStyles['content__title']}`}>My Notes</h1>
                <div className={`${homeStyles['grid']} ${homeStyles['content__items']} ${homeStyles['grid--items']}`}>
                    {notes.map((note: NoteData, index) => {
                        if (notes.length === index + 1) return <Note key={note.id}
                                                                     ref={lastNoteElementRef}
                                                                     id={note.id}
                                                                     title={note.title}
                                                                     body={note.body}
                                                                     timestamp={timeSince(note.createdAt)}></Note>;
                        return <Note key={note.id}
                                     title={note.title}
                                     body={note.body}
                                     id={note.id}
                                     timestamp={timeSince(note.createdAt)}/>
                    })}
                    {isLoading && <p>Loading...</p>}
                </div>
            </div>
        </>
    );
}

export default App;
