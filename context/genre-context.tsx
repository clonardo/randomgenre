import { useState, useEffect, createContext, useContext } from 'react';
import firebase from '../firebase/client-app';
import { IGenreStates, IGenreContext } from '../utils/types';
import { useUserId } from '../hooks/use-userid';
import { cloneDeep } from 'lodash';

const INITIAL_STATE: IGenreStates = { wip: 'none', completed: [], skipped: [] };

export const GenreContext = createContext<IGenreContext>({
  genres: INITIAL_STATE,
  setGenres: (value: IGenreStates) => {
    return;
  },
  isLoading: true
});

export default function GenreContextComp({ children }) {
  const userId = useUserId();
  const [genres, setGenres] = useState<IGenreStates>(INITIAL_STATE);
  // for UI state only
  const [isLoading, setIsLoading] = useState(true);

  // const ref = firebase.firestore().collection('genres').doc('abc');
  const ref = firebase.firestore().collection('genres');

  useEffect(() => {
    console.log(`Context got targetID: ${userId}`);
    setIsLoading(true);

    ref
      .doc(userId)
      .get()
      .then((item) => {
        const res = item.data();
        if (res) {
          console.log('-- got item: ');
          console.log(res);
          setIsLoading(false);
          setGenres(res as any);
        } else {
          // need to create a new DB entry
          ref
            .doc(userId)
            .set(cloneDeep(INITIAL_STATE))
            .then(() => {
              setIsLoading(false);
            })
            .catch((error) => {
              console.warn('Failed to create new DB entry: ', error);
              setIsLoading(false);
            });
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
  }, [userId]);

  return (
    <GenreContext.Provider value={{ genres, setGenres, isLoading }}>
      {children}
    </GenreContext.Provider>
  );
}

// Custom hook that shorthands the context!
export const useGenres = () => useContext(GenreContext);
