import React, { FunctionComponent, useEffect } from "react";
import { useLocation } from "react-router";
import { Link } from "react-router-dom";
import ButtonLink from "./ButtonLink";
import headerStyles from "../scss/modules/header.module.scss";
import modalStyles from "../scss/modules/modal.module.scss";
import { useAuth, useAuthSet } from "../context/AuthContext";
import { useAlert, useAlertSet } from "../context/AlertContext";
import Alert from "./Alert";
import Logo from "./Logo";

interface OwnProps {
}

type Props = OwnProps;

const Header: FunctionComponent<Props> = (props) => {
  const auth = useAuth();
  const authSet = useAuthSet();
  const alert = useAlert();
  const alertSet = useAlertSet();
  const location = useLocation();
  // @ts-ignore
  const alertData = location.state?.alert || { message: "", type: "success" };
  useEffect(() => {
    alertSet(alertData);
  }, []);

  return (
    <>
      {alert.message !== "" && (
      <Alert
        message={alert.message}
        type={alert.type}
        onClose={() => {
          alertSet({ message: "", type: "success" });
        }}
      />
      )}
      <dialog className={`grid ${modalStyles["grid--modal"]} ${modalStyles.modal}`} id="delete-modal">
        <h2 className={`${modalStyles.modal__title}`}>
          Are you sure you want to delete this note? This action
          cannot be
          undone.
        </h2>
        <button type="button" className="button button--primary button--delete modal__action">
          Yes, Delete
        </button>
      </dialog>
      <header>
        <nav className={headerStyles.nav}>
          <div className={headerStyles.nav__left}>
            <ButtonLink
              href="/new"
              label="Create Note"
              styleType="secondary"
              className={headerStyles["button--nav"]}
            />
          </div>
          <Link to="/">
            <Logo className={headerStyles.nav__logo} />
          </Link>
          <div className={headerStyles.nav__right}>
            {
                            !auth.isAuthenticated ? (
                              <>
                                <ButtonLink
                                  href="/login"
                                  label="Login"
                                  styleType="primary"
                                  className={headerStyles["button--nav"]}
                                />
                                <ButtonLink
                                  href="/signup"
                                  label="Signup"
                                  styleType="outline-primary"
                                  className={headerStyles["button--nav"]}
                                />
                              </>
                            ) : (
                              <ButtonLink
                                onClick={() => authSet({
                                  isAuthenticated: false,
                                  accessToken: null,
                                  refreshToken: null,
                                })}
                                label="Logout"
                                styleType="primary"
                                className={headerStyles["button--nav"]}
                              />
                            )
                        }
          </div>
        </nav>
      </header>
    </>
  );
};

export default Header;
