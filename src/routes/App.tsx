import Header from "../components/Header";
import React from "react";
import homeStyles from "../scss/modules/home.module.scss";
import headerStyles from "../scss/modules/header.module.scss";
import ButtonLink from "../components/ButtonLink";
import Button from "../components/Button";
import Note from "../components/Note";

function App() {
    return (
        <>
            <Header/>
            <div className={`${homeStyles.grid} ${homeStyles['grid--content']} ${homeStyles.content}`}>
                <h1 className={`${homeStyles['content__title']}`}>My Notes</h1>
                <div className={`${homeStyles['grid']} ${homeStyles['content__items']} ${homeStyles['grid--items']}`}>
                    <Note title="Hello World" body="lorem afkljafljalfjsalkfj aksdjfla fjlkas fjsalf lsajdl" id="1" timestamp="2 hours ago"/>
                </div>
            </div>
        </>
    );
}

export default App;
