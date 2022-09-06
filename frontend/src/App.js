import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Starred from "./pages/Starred";
import { ThemeContextProvider } from "./contexts/ThemeContext";
// import { ArticleContextProvider } from "./contexts/ArticleContext";

function App() {
  return (
    <>
      <BrowserRouter>
        <ThemeContextProvider>
          {/* <ArticleContextProvider> */}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/starred" element={<Starred />} />
          </Routes>
          {/* </ArticleContextProvider> */}
        </ThemeContextProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
