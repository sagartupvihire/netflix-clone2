// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { LogOut, Menu, Search } from 'lucide-react'
import { useAuthStore } from '../store/authUser'
import { useContentStore } from '../store/content'
import SearchPage from '../pages/SearchPage'
const Navbar = () => {

    const [isMobileMenuOpen, setisMobileMenuOpen] = useState(false)
    const toggleMobileMenu = () => setisMobileMenuOpen(!isMobileMenuOpen);
    const { user, logout } = useAuthStore();
    const { contentType, setContentType } = useContentStore();
    console.log("contentType: ", contentType);

    return (
        <header className='max-w-6xl] mx-auto flex flex-wrap items-center justify-between p-4 h-20'>
            <div className='flex items-center gap-10 z-50 '>
                <Link to={"/"}>
                    <img src='/netflix-logo.png' alt='logo' className='w-20' />
                </Link>

                {/* desktop-navabar */}
                <div className='hidden sm:flex gap-2 items-center'>
                    <Link to="/" onClick={() => setContentType('movie')} className='text-white hover:underline'>
                        Movie
                    </Link>
                    <Link to="/" onClick={() => setContentType('tvshows')} className=' hover:underline'>
                        Tv Shows
                    </Link>
                    <Link to={"/history"} className=' hover:underline'>
                        Search history                    </Link>

                </div>
            </div>

            <div className='flex gap-2 items-center z-50  '>
                <Link to={"/search"} className='text-white hover:underline'>
                    <Search className='size-6 cursor-pointer' />
                </Link>
                <img src={user.image} alt='avatar' className='h-8 rounded cursor-pointer' />
                <LogOut className='size-6 cursor-pointer' onClick={logout} />
                <div className='sm:hidden '>
                    <Menu className='size-6 cursor-pointer' onClick={toggleMobileMenu} />
                </div>
            </div>
            {/* mobile navabar  */}

            {isMobileMenuOpen &&
                (<div className='w-full sm:hidden mt-4 z-50 bg-black rounded border border-gray-800'>
                    <Link to={'/'} className='block hover:underline p-2' onClick={() => setContentType('movie')}>
                        Movies
                    </Link>
                    <Link to={'/'} className='block hover:underline p-2' onClick={() => setContentType('tvshows')}>
                        Tv Shows
                    </Link>
                    <Link to={'/history'} className='block hover:underline p-2' onClick={toggleMobileMenu}>
                        Search history
                    </Link>
                </div>)
            }
        </header>
    )
}

export default Navbar
