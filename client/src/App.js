import { Landing, Error, Register, ProtectedRoute } from "./pages";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import {
    AddJob,
    AllJobs,
    Profile,
    SharedLayout,
    Stats,
} from "./pages/dashboard";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route
                    path="/"
                    element={
                        <ProtectedRoute>
                            <SharedLayout />
                        </ProtectedRoute>
                    }
                >
                    {/* The routes nested inside of the outer one, it will always be relative to that path "/" */}
                    {/* 
                    使用 index 的作用: once you navigate to the "/", you will actually direct to the "/stats"
                    */}
                    <Route index element={<Stats />} />
                    <Route
                        path="all-jobs"
                        element={<AllJobs />}
                    ></Route>
                    <Route
                        path="add-job"
                        element={<AddJob />}
                    ></Route>
                    <Route
                        path="profile"
                        element={<Profile />}
                    ></Route>
                </Route>
                <Route path="/landing" element={<Landing />} />
                <Route path="/register" element={<Register />} />
                <Route path="*" element={<Error />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
