import {createContext, useContext, useState} from 'react';
import { useEffect } from 'react';
import toast from 'react-hot-toast';
import axios from 'axios'

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    const [accessToken, setAccessToken] = useState(null);
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        initializeAuth();
    }, [])

    const initializeAuth = async () => {
        try {
            const refreshResponse = await axios.post("api/auth/refresh-token", {}, {withCredentials: true});
            const token = refreshResponse.data.accessToken;
            setAccessToken(token);
            const userResponse = await axios.get("/api/auth/get-me",{
                    headers: {Authorization: `Bearer ${token}`}, withCredentials: true
                },  
            );
            setUser(userResponse.data.user);
            setLoading(false);
        } catch (error) {
            console.log(error);
            setAccessToken(null);
            setUser(null);
            setLoading(false)
        }
    }

    return (
        <AuthContext.Provider value={{accessToken, setAccessToken, user, setUser, loading, setLoading}}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    return useContext(AuthContext);
}