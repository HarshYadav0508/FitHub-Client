import { useSpring } from 'framer-motion';
import React, { createContext, useEffect, useState } from 'react';
import { app } from '../../config/firebase.init';
import { getAuth, createUserWithEmailAndPassword, signOut, updateProfile, onAuthStateChanged, signInWithPopup } from "firebase/auth";
import { signInWithEmailAndPassword } from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth";
import axios from 'axios';

export const AuthContext = createContext();

const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const [loader, setLoader] = useState(true);
    const [error, setError] = useState('');

    const auth = getAuth(app);

    // SIGNUP
    const signUp = async (email, password) => {
        try {
            setLoader(true);
            return await createUserWithEmailAndPassword(auth, email, password);
        } catch (error) {
            setError(error.code);
            throw error;
        }
    }

    // LOGIN
    const login = async (email, password) => {
        try {
            setLoader(true);
            return await signInWithEmailAndPassword(auth, email, password);
        } catch (error) {
            setError(error.code);
            throw error;
        }
    }

    // LOGOUT
    const logout = async () => {
        try {
            return await signOut(auth);
        } catch (error) {
            setError(error.code);
            throw error;
        }
    }

    // UPDATE USER PROFILE
    const updateUser = async (name, photo) => {
        try {
            await updateProfile(auth.currentUser, {
                displayName: name, photoURL: photo
            });
            setUser(auth.currentUser);
        } catch (error) {
            setError(error.code);
            throw error;
        }
    }

    // GOOGLE LOGIN
    const provider = new GoogleAuthProvider();
    const googleLogin = async () => {
        try {
            setLoader(true);
            return await signInWithPopup(auth, provider);
        } catch (error) {
            setError(error.code);
            throw error;
        }
    }

    // OBSERVER FOR USER
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setUser(user);
    
            if (user) {
                axios.post('https://fithub-r8lw.onrender.com/api/set-token', { email: user.email, name: user.displayName })
                    .then((data) => {
                        if (data.data.token) {
                            localStorage.setItem('token', data.data.token);
                            console.log("Token set:", data.data.token);
                            setLoader(false);
                        }
                    });
            } else {
                localStorage.removeItem('token');
                setLoader(false);
            }
        });
    
        return () => unsubscribe();
    }, [auth]);

    const contextValue = {
        user, signUp, login, logout, updateUser, googleLogin, error, setError, loader, setLoader
    };

    return (
        <AuthContext.Provider value={contextValue}>
            {children}
        </AuthContext.Provider>
    );
}

export default AuthProvider;
