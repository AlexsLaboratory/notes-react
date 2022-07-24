import React, {FunctionComponent, useContext, useEffect} from 'react';
import AuthContext from "../context/auth-context";
import useLocalStorage from "../hooks/useLocalStorage";
import AuthContextProps from "../interfaces/AuthContextProps";

interface OwnProps {
}

type Props = OwnProps;

const Header: FunctionComponent<Props> = (props) => {
    let ctx = useContext(AuthContext);
    const [user, setUser] = useLocalStorage<AuthContextProps>("user", ctx);

return (
    <header>
        {user.isAuthenticated ? <p>Authenticated</p> : <p>Not authenticated</p>}
        <button type="button" onClick={() => {
            setUser({...user, isAuthenticated: !user.isAuthenticated});
        }}>Click Me!</button>
    </header>
)};

export default Header;
