import React, { lazy, Suspense } from "react";
import ReactDOM from "react-dom/client";
import "../public/favicon.ico";
import "../public/manifest.json";
import {
  BrowserRouter,
  Route, Routes,
} from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import App from "./routes/App";
import "./scss/global/index.scss";
import { AlertProvider } from "./context/AlertContext";
import { AuthProvider } from "./context/AuthContext";

const Login = lazy(() => import("./routes/Login"));
const New = lazy(() => import("./routes/New"));
const RequireAuth = lazy(() => import("./components/RequireAuth"));
const View = lazy(() => import("./routes/View"));
const Edit = lazy(() => import("./routes/Edit"));
const Signup = lazy(() => import("./routes/Signup"));

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement,
);
root.render(
  <BrowserRouter>
    <AlertProvider>
      <AuthProvider>
        <Routes>
          <Route
            path="/"
            element={(
              <Suspense fallback={(
                <FontAwesomeIcon
                  icon={faSpinner}
                  className="fa-spin-pulse fa-3x"
                />
)}
              >
                <App />
              </Suspense>
          )}
          />
          <Route
            path="/signup"
            element={(
              <Suspense fallback={(
                <FontAwesomeIcon
                  icon={faSpinner}
                  className="fa-spin-pulse fa-3x"
                />
)}
              >
                <Signup />
              </Suspense>
            )}
          />
          <Route
            path="/login"
            element={(
              <Suspense fallback={(
                <FontAwesomeIcon
                  icon={faSpinner}
                  className="fa-spin-pulse fa-3x"
                />
)}
              >
                <Login />
              </Suspense>
            )}
          />
          <Route
            path="/new"
            element={(
              <RequireAuth message="Login is required before creating a new note.">
                <Suspense fallback={(
                  <FontAwesomeIcon
                    icon={faSpinner}
                    className="fa-spin-pulse fa-3x"
                  />
)}
                >
                  <New />
                </Suspense>
              </RequireAuth>
            )}
          />
          <Route
            path="/notes/:id/view"
            element={(
              <RequireAuth message="Login is required before viewing the note.">
                <Suspense fallback={(
                  <FontAwesomeIcon
                    icon={faSpinner}
                    className="fa-spin-pulse fa-3x"
                  />
)}
                >
                  <View />
                </Suspense>
              </RequireAuth>
            )}
          />
          <Route
            path="/notes/:id/edit"
            element={(
              <RequireAuth message="Login is required before editing the note.">
                <Suspense fallback={(
                  <FontAwesomeIcon
                    icon={faSpinner}
                    className="fa-spin-pulse fa-3x"
                  />
)}
                >
                  <Edit />
                </Suspense>
              </RequireAuth>
            )}
          />
          <Route path="*" element={<h1>404</h1>} />
        </Routes>
      </AuthProvider>
    </AlertProvider>
  </BrowserRouter>,
);
