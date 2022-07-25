import Header from "./components/Header";
import AuthProvider from "./providers/AuthProvider";
import "./scss/global/index.scss";

function App() {
    return (
        <AuthProvider>
            <Header/>
        </AuthProvider>
    );
}

export default App;
