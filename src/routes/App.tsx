import Header from "../components/Header";
import React from "react";
import homeStyles from "../scss/modules/home.module.scss";
import headerStyles from "../scss/modules/header.module.scss";
import ButtonLink from "../components/ButtonLink";
import Button from "../components/Button";

function App() {
    return (
        <>
            <Header/>
            <div className={`${homeStyles.grid} ${homeStyles['grid--content']} ${homeStyles.content}`}>
                <h1 className={`${homeStyles['content__title']}`}>My Notes</h1>
                <div className={`${homeStyles['grid']} ${homeStyles['content__items']} ${homeStyles['grid--items']}`}>
                    <div className={`${homeStyles['grid--item']}`}>
                        <h3 className={`${homeStyles['grid--item__title']}`}>Test Note One</h3>
                        <p className={`${homeStyles['grid--item__body']}`}>
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium assumenda culpa cumque
                            ducimus earum,
                            expedita fugiat fugit laborum minus necessitatibus nemo odio perferendis ratione rem
                            repudiandae, sapiente sint
                            sit ut. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium alias aperiam
                            commodi cum dicta
                            dolore ea eligendi harum maiores, minima necessitatibus neque optio perferendis praesentium,
                            quo saepe ut vel
                            vero. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Culpa doloribus facere,
                            fuga, hic iusto laborum
                            neque nostrum nulla omnis perferendis, qui repudiandae voluptatem! Animi, eveniet itaque
                            natus nihil quod
                            tempora.
                        </p>
                        <div className={`${homeStyles['grid--item__timestamp']}`}>
                            <span className={`${homeStyles['grid--item__timestamp__label']}`}>created: </span>
                            <p className={`${homeStyles['grid--item__timestamp__time']}`}>2 hours ago</p>
                        </div>
                        <hr className={`${homeStyles['grid--item__separator']}`}/>
                        <ButtonLink href="/view"
                                    label="View"
                                    styleType="view"/>
                        <ButtonLink href="/edit"
                                    label="Edit"
                                    styleType="edit" className={`${homeStyles["grid--item__edit"]}`}/>
                        <Button
                            styleType="delete" type="button" className={`${homeStyles["grid--item__delete"]}`}>Delete</Button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default App;
