import { useState, useEffect, createContext, useContext } from 'react';
import firebase from '../firebase/client-app';

export const GenreContext = createContext();

const INITIAL_STATE = { wip: 'none', completed: [], skipped: [] };

export default function GenreContextComp({ children, targetId }) {
  const [genres, setGenres] = useState(INITIAL_STATE);
  // for UI state only
  const [isLoading, setIsLoading] = useState(true);

  // const ref = firebase.firestore().collection('genres').doc('abc');
  const ref = firebase.firestore().collection('genres');

  useEffect(() => {
    console.log(`Context got targetID: ${targetId}`);
    setIsLoading(true);

    ref
      .doc(targetId)
      .get()
      .then((item) => {
        const res = item.data();
        if(res){
            console.log('-- got item: ');
            console.log(res);
        }
        else{

        }
        
        /*
        const itemLength =
          item && item.docs && item.docs.length ? item.docs.length : -1;
        console.log(`-- Got item, length: ${itemLength}`);
        */
      })
      .catch((e) => {
        console.warn('Unable to get document: ', e);
      });
    /*
    ref.doc(targetId).onSnapshot((querySnapshot) => {
      const items = [];
      const state = querySnapshot.data();
      if (state) {
        console.log('firestore data: ');
        console.log(state);
        setGenres(state);
        setIsLoading(false);
      }

      //   querySnapshot.forEach((doc) => {
      //     console.log('firestore doc: ');
      //     console.log(doc.data());
      //   });
    });
    */

    // Listen authenticated user
    // const unsubscriber = firebase.auth().onAuthStateChanged(async (user) => {
    //     try {
    //       if (user) {
    //         // User is signed in.
    //         const { uid, displayName, email, photoURL } = user
    //         // You could also look for the user doc in your Firestore (if you have one):
    //         // const userDoc = await firebase.firestore().doc(`users/${uid}`).get()
    //         setUser({ uid, displayName, email, photoURL })
    //       } else setUser(null)
    //     } catch (error) {
    //       // Most probably a connection error. Handle appropriately.
    //     } finally {
    //       setLoadingUser(false)
    //     }
    //   })

    //   // Unsubscribe auth listener on unmount
    //   return () => unsubscriber()
  }, [targetId]);

  return (
    <GenreContext.Provider value={{ genres, setGenres, isLoading }}>
      {children}
    </GenreContext.Provider>
  );
}

// Custom hook that shorthands the context!
export const useGenres = () => useContext(GenreContext);
