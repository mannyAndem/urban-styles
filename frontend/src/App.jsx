import { Route, Routes } from "react-router-dom";
import Signup from "./pages/Signup/Signup";
import Login from "./pages/Login/Login";
import Main from "./structure/Main";
import NotFound from "./pages/NotFound/NotFound";

function App() {
  return (
    <div className="bg-lightPink">
      <Routes>
        <Route path="/*" element={<Main />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
