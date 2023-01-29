import { Landing, Error, Register, Dashboard } from "./pages";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
    return (
        <BrowserRouter>
            {/* <nav>
                <Link to="/">Dashboard</Link>
                <Link to="/landing">Landing</Link>
                <Link to="/register">Register</Link>
            </nav> */}
            <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/landing" element={<Landing />} />
                <Route path="/register" element={<Register />} />
                <Route path="*" element={<Error />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
