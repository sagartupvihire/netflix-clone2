import React from 'react'
import AuthScreen from './AuthScreen';
import { useAuthStore } from '../../store/authUser';
import HomeScreen from './HomeScreen';

const HomePage = () => {
  const {user} = useAuthStore();
  return (
    <div >
      {user ? <HomeScreen /> : <AuthScreen/>}
    </div>


    
    
  )
}

export default HomePage