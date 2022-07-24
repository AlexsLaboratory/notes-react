import './App.css';
import Header from "./components/Header";
import AuthProvider from "./providers/AuthProvider";

function App() {
    return (
        <AuthProvider>
            <Header/>
        </AuthProvider>
    );
}

export default App;
