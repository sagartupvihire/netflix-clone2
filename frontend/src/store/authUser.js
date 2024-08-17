import axios from 'axios'
import toast from 'react-hot-toast'
import {create} from 'zustand'

export const useAuthStore = create((set)=>({
    user:null,
    isSigningUp :false,
    isChekingAuth :true,
    isLoggedIn : false,
    isSigningIn : false,
    isloggingOut : false,
    isPasswordResetting : false,
    setUser: (user) => set({user}),
    logout: async () => {
        set({isloggingOut : true})
        try {
            await axios.post('/api/auth/logout')
            set({user: null, isLoggedIn:false, isSigningOut:false})
            toast.success("Logged out successfully")
        } catch (error) {
            console.log(error);
            
            toast.error(error.response.data.message || "Error logging out")
            set({isloggingOut :false})
        }
    },
    login: async (credentials) => {
        set({isSigningIn : true})
        try {
            const response = await axios.post('/api/auth/login', credentials)
            console.log(response, 'success') ;
            
            set({user: response.data.user, isLoggedIn:true, isSigningIn:false})
            toast.success("Logged in successfully")
        } catch (error) {
            console.log(error);
            
            toast.error(error.response.data.message || "Error logging in")
            set({isSigningIn :false})
        }
    },
    authCheck: async () => {
        set({isChekingAuth: true})
        try {
            const response = await axios.get('/api/auth/authcheck')
            
            set({user: response.data.user, isChekingAuth:false})
        } catch (error) {
            set({isChekingAuth :false, user:null})
            console.log(error);
        }
    },
    signup: async (credentials) => {
            set({isSigningUp :true})
            try {
                const response = await axios.post('/api/auth/signup', credentials)
                set({user: response.data.user, isSigningUp:false})
                toast.success("Signed up successfully")
            } catch (error) {
                console.log(error);
                
                toast.error(error.response.data.message || "Error signing up")
                set({isSigningUp :false})
            }
    },

}))