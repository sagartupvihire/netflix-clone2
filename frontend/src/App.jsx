import { Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import HomePage from "./pages/home/HomePage";

function App() {

  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      {/* <Route path="/movies/:movieId" element={<MovieDetails />} />
      <Route path="/search" element={<Search />} />
      <Route path="/profile" element={<Profile />} /> */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignUpPage />} />
      {/* <Route path="*" element={<NotFound />} /> */}
    </Routes>
  )
}

export default App
