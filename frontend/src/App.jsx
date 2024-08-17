import { Navigate, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage.jsx";
import HomePage from "./pages/home/HomePage.jsx";
import SignUpPage from "./pages/SignUpPage.jsx";
import Footer from "./components/Footer.jsx";
import { Toaster } from "react-hot-toast";
import { useAuthStore } from "./store/authUser.js";
import { useEffect } from "react";
import { Loader } from "lucide-react";


function App() {
  const { user, isCheckingAuth, authCheck } = useAuthStore()
  console.log("auth user is here", user);

  useEffect(() => {
    authCheck();
  }, [authCheck]);

  if (isCheckingAuth) {
		return (
			<div className='h-screen'>
				<div className='flex justify-center items-center bg-black h-full'>
					<Loader className='animate-spin text-red-600 size-10' />
				</div>
			</div>
		);
	}

  return (
    <>

      <Routes>
        <Route path="/" element={<HomePage />} />
        {/* <Route path="/movies/:movieId" element={<MovieDetails />} />
      <Route path="/search" element={<Search />} />
      <Route path="/profile" element={<Profile />} /> */}
        <Route path="/login" element={!user ? <LoginPage /> : <Navigate to={"/"} />} />
        <Route path="/signup" element={!user ? <SignUpPage /> : <Navigate to={"/"} />} />
        {/* <Route path="*" element={<NotFound />} /> */}

      </Routes>
      <Footer />
      <Toaster />
    </>
  )
}

export default App