import React from "react";
import ReactDOM from "react-dom/client";
import "../public/favicon.ico";
import "../public/manifest.json";
import {
  BrowserRouter,
  Route, Routes,
} from "react-router-dom";
import App from "./routes/App";
import Signup from "./routes/Signup";
import "./scss/global/index.scss";
import Login from "./routes/Login";
import { AlertProvider } from "./context/AlertContext";
import { AuthProvider } from "./context/AuthContext";
import New from "./routes/New";
import RequireAuth from "./components/RequireAuth";
import View from "./routes/View";
import Edit from "./routes/Edit";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement,
);
root.render(
  <BrowserRouter>
    <AlertProvider>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/new"
            element={
              <RequireAuth message="Login is required before creating a new note."><New /></RequireAuth>
                        }
          />
          <Route
            path="/notes/:id/view"
            element={
              <RequireAuth message="Login is required before viewing the note."><View /></RequireAuth>
                        }
          />
          <Route
            path="/notes/:id/edit"
            element={
              <RequireAuth message="Login is required before editing the note."><Edit /></RequireAuth>
                        }
          />
          <Route path="*" element={<h1>404</h1>} />
        </Routes>
      </AuthProvider>
    </AlertProvider>
  </BrowserRouter>,
);
