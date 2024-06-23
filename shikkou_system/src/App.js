import './App.css';
import Home from "./Home";
import About from "./About";
import List from "./List";
import Upload from "./Upload";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import MyAppBar from "./components/AppBar";
import { AuthProvider } from './useAuth';
import PrivateRoute from './PrivateRoute'; // 追加
import Login from './Login'; // ログインページを追加

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <BrowserRouter>
          <MyAppBar />
          <Routes>
            <Route path="/" element={<PrivateRoute><Home /></PrivateRoute>} />
            <Route path="/about" element={<PrivateRoute><About /></PrivateRoute>} />
            <Route path="/login" element={<Login />} />
            <Route path="/list" element={<PrivateRoute><List /></PrivateRoute>} />
            <Route path="/upload" element={<PrivateRoute><Upload /></PrivateRoute>} />
            <Route path="*" element={<h1>Not Found Page</h1>} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </div>
  );
}

export default App;
