import Header from "../components/Header";
import React from "react";
import homeStyles from "../scss/modules/home.module.scss";
import headerStyles from "../scss/modules/header.module.scss";
import ButtonLink from "../components/ButtonLink";
import Button from "../components/Button";
import Note from "../components/Note";
import {timeSince} from "../utils/time";

function App() {
    return (
        <>
            <Header/>
            <div className={`${homeStyles.grid} ${homeStyles['grid--content']} ${homeStyles.content}`}>
                <h1 className={`${homeStyles['content__title']}`}>My Notes</h1>
                <div className={`${homeStyles['grid']} ${homeStyles['content__items']} ${homeStyles['grid--items']}`}>
                    <Note title="Hello World" body="lorem afkljafljalfjsalkfj aksdjfla fjlkas fjsalf lsajdl" id="1" timestamp={timeSince("2022-09-06 01:28:42.370000 +00:00")}/>
                </div>
            </div>
        </>
    );
}

export default App;
