import React, {FunctionComponent} from 'react';
import ButtonLink from "./ButtonLink";
import headerStyles from "../scss/modules/header.module.scss";
import modalStyles from "../scss/modules/modal.module.scss";
import {useAuth, useAuthSet} from "../context/AuthContext";

interface OwnProps {
}

type Props = OwnProps;

const Header: FunctionComponent<Props> = (props) => {
    const auth = useAuth();
    console.log(auth.isAuthenticated);
    const authSet = useAuthSet();
    return (
        <>
            <dialog className={`grid ${modalStyles["grid--modal"]} ${modalStyles.modal}`} id="delete-modal">
                <h2 className={`${modalStyles.modal__title}`}>Are you sure you want to delete this note? This action
                    cannot be
                    undone.</h2>
                <button type="button" className="button button--primary button--delete modal__action">Yes, Delete
                </button>
            </dialog>
            <header>
                <nav className={headerStyles.nav}>
                    <div className={headerStyles.nav__left}>
                        <ButtonLink href="/new"
                                    label="Create Note"
                                    styleType="secondary"
                                    className={headerStyles["button--nav"]}/>
                    </div>
                    <div className={headerStyles.nav__right}>
                        {
                            !auth.isAuthenticated ? (
                                <>
                                    <ButtonLink href="/login"
                                                label="Login"
                                                styleType="primary"
                                                className={headerStyles["button--nav"]}/>
                                    <ButtonLink href="/signup"
                                                label="Signup"
                                                styleType="outline-primary"
                                                className={headerStyles["button--nav"]}/>
                                </>) : (<ButtonLink onClick={() => authSet({isAuthenticated: false, accessToken: null, refreshToken: null})}
                                                    label="Logout"
                                                    styleType="primary"
                                                    className={headerStyles["button--nav"]}/>)
                        }
                    </div>
                </nav>
            </header>
        </>
    )
};

export default Header;
