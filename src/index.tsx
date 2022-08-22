import React from 'react';
import ReactDOM from 'react-dom/client';
import {
    BrowserRouter,
    Route, Routes
} from "react-router-dom";
import App from './routes/App';
import Signup from "./routes/Signup";
import "./scss/global/index.scss";
import Login from "./routes/Login";

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  </BrowserRouter>
);
