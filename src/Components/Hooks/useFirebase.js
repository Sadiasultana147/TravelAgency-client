import { useEffect, useState } from 'react';
import initializeAuthentication from '../../Firebase/firebase.init';
import { createUserWithEmailAndPassword, getAuth, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from 'firebase/auth';

initializeAuthentication();

const useFirebase = () => {
    const [control, setControl] = useState();

    const [user, setUser] = useState({})
    const [isLoading, setIsLoading] = useState(true)
    const [isAdmin, setIsAdmin] = useState('');
    const [error, setError] = useState('')


    const auth = getAuth()
    const googleProvider = new GoogleAuthProvider()


    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            console.log(user);
            if (user) {

                setUser(user)
            } else {
                setUser({})
            }
            setIsLoading(false)
        })
        return () => unsubscribe()
    }, [])


    const signInWithGoogle = () => {
        setIsLoading(true)
        return signInWithPopup(auth, googleProvider)

    }


    const createAccountWithEmailPassword = (email, password) => {

        return createUserWithEmailAndPassword(auth, email, password)
    }


    const loginWithEmailAndPassword = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password)
    }


    const updateName = (name) => {
        updateProfile(auth.currentUser, {
            displayName: name
        }).then(() => {
            const newUser = { ...user, displayName: name } // recommend
            setUser(newUser)

            // ...
        }).catch((error) => {
            // An error occurred
            // ...
        });
    }

    const logOut = () => {
        console.log("logout");
        signOut(auth).then(() => {
            setUser({})
        }).catch((error) => {
            // An error happened.
        })
            .finally(() => setIsLoading(false));
    }



    const hanldeUserInfoRegister = (email, displayName, method) => {
        const user = { email, displayName };
        fetch('https://hidden-thicket-96670.herokuapp.com/addUserInfo', {
            method: method,
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(user)
        })
            .then()
    }


    return {
        user, setUser,
        signInWithGoogle,
        createAccountWithEmailPassword,
        loginWithEmailAndPassword,
        isLoading,
        setIsLoading,
        logOut,
        updateName,
        control,
        setControl,
        hanldeUserInfoRegister,
        isAdmin, setIsAdmin,
        error, setError,
        isAdmin, setIsAdmin

    }
}

export default useFirebase;