// App.js
import './App.css';
import Home from "./Home";
import About from "./About";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import MyAppBar from "./components/AppBar"; // 追加

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <MyAppBar /> {/* AppBarを追加 */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="*" element={<h1>Not Found Page</h1>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
