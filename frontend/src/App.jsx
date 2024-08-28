import { Navigate, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage.jsx";
import HomePage from "./pages/home/HomePage.jsx";
import SignUpPage from "./pages/SignUpPage.jsx";
;
import Footer from "./components/Footer.jsx";
import { Toaster } from "react-hot-toast";
import { useAuthStore } from "./store/authUser.js";
import { useEffect } from "react";
import { Loader } from "lucide-react";
import WatchPage from "./pages/WatchPage.jsx";
import SearchPage from "./pages/SearchPage.jsx";
import SearchHistoryPage from "./pages/SearchHistoryPage.jsx";
import NotFoundPage from "./pages/NotFoundPage.jsx";


function App() {
  const { user, isCheckingAuth, authCheck,check } = useAuthStore()
  

  useEffect(() => {
    authCheck();
  }, [authCheck]);
  
  
  if (check) {
    
    
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
      <Route path="/watch/:id" element={user ? <WatchPage />: <Navigate to={'/login'}/> } />
        <Route path="/login" element={!user ? <LoginPage /> : <Navigate to={"/"} />} />
        <Route path="/signup" element={!user ? <SignUpPage /> : <Navigate to={"/"} />} />
        <Route path="/search" element={user ? <SearchPage /> : <Navigate to={"/login"} />} />
        <Route path="/history" element={user ? <SearchHistoryPage /> : <Navigate to={"/login"} />} />
        <Route path="/*" element={<NotFoundPage />} />

      </Routes>
      <Footer />
      <Toaster />
    </>
  )
}

export default App