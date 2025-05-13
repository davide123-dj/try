import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./Home";
import All from "./All";
import './App.css';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<All />} />
                <Route path="/home" element={<Home />} />
            </Routes>
        </Router>
    );
}

export default App;
