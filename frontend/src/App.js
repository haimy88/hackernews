import "./App.css";
import Home from "./pages/Home";
import { ThemeContextProvider } from "./contexts/ThemeContext";

function App() {
  return (
    <>
      <ThemeContextProvider>
        <div className="App">
          <Home />
        </div>
      </ThemeContextProvider>
    </>
  );
}

export default App;
