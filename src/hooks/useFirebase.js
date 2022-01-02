import { useEffect, useState } from 'react';
import initializeFirebase from '../Firebase/firebase.init';
import { getAuth, createUserWithEmailAndPassword, onAuthStateChanged, signOut } from "firebase/auth";


// initialize firebase app
initializeFirebase();

const useFirebase = () => {
    const [user, setUser] = useState({});

    const auth = getAuth();

    const registerUser = (email, password) => {
        createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;           
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            
        });

    }

    // observe user state management
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
        if (user) {
            const uid = user.uid;
            setUser(user);
        } else {
            setUser({})
        }
        });
        return () => unsubscribe;
    }, [])

    // logout user
        const logOut = () => {
            signOut(auth).then(() => {
                // Sign-out successful.
                }).catch((error) => {
                // An error happened.
            });

    }

    return {
        user,
        registerUser,
        logOut,
    }
}

export default useFirebase;