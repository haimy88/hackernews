import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Starred from "./pages/Starred";
import { ThemeContextProvider } from "./contexts/ThemeContext";

function App() {
  return (
    <>
      <BrowserRouter>
        <ThemeContextProvider>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/starred" element={<Starred />} />
          </Routes>
        </ThemeContextProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
