import Header from "../components/Header";
import React, {useEffect, useState} from "react";
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
    const [notes, setNotes] = useState({} as Page);
    const [isLoading, setIsLoading] = useState(true);
    headers.set("Content-Type", "application/json");

    async function getData() {
        const {response, data} = await api("/note/get-all?limit=5", {
            method: "GET",
            headers
        });
        return data;
    }

    useEffect(() => {
        getData().then((data) => {
            setNotes(data);
        })
    }, [])

    useEffect(() => {
        if (Object.keys(notes).length !== 0) {
            setIsLoading(false);
        }
    }, [notes])

    return (
        <>
            <Header/>
            <div className={`${homeStyles.grid} ${homeStyles['grid--content']} ${homeStyles.content}`}>
                <h1 className={`${homeStyles['content__title']}`}>My Notes</h1>
                <div className={`${homeStyles['grid']} ${homeStyles['content__items']} ${homeStyles['grid--items']}`}>
                    {isLoading ? <p>Loading...</p> : notes.data.map((note: NoteData) => (
                        <Note key={note.id} title={note.title} body={note.body} id={note.id} timestamp={timeSince(note.createdAt)}/>
                    ))}
                </div>
            </div>
        </>
    );
}

export default App;
