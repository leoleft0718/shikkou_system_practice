// App.js
import './App.css';
import Home from "./Home";
import About from "./About";
import List from "./List";
import Upload from "./Upload"; // 追加
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
          <Route path='/list' element={<List />} />
          <Route path='/upload' element={<Upload />} /> {/* 追加 */}
          <Route path="*" element={<h1>Not Found Page</h1>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
