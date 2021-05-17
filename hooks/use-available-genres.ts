import { useGenres } from '../context/genre-context';
import { AllGenres } from '../constants/genres';

/**
 * Show an array of only available (not complete, not WIP) genres
 */
export function useAvailableGenres(): string[] {
  const { genres } = useGenres();

  /*
  if (session && session.user) {
    console.log(`Session user: ${JSON.stringify(session.user, null, 2)}`);
  }
  */

  return genres && Object.keys(genres) && Object.keys(genres).length
    ? AllGenres.filter((x) => {
        return (
          genres.completed.indexOf(x) == -1 &&
          genres.skipped.indexOf(x) == -1 &&
          genres.wip != x
        );
      })
    : AllGenres;
}
