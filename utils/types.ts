import { Dispatch, SetStateAction } from 'react';

export interface DiscordUser {
  id: string;
  username: string;
  avatar: string;
  discriminator: string;
  public_flags: number;
  flags: number;
  locale: string;
  mfa_enabled: boolean;
  premium_type: number;
}

/**
 * Describes states of a user's genres
 */
export interface IGenreStates {
  /**
   * ID of current work-in-progress genre, if any
   */
  wip: string;
  /**
   * Array of completed genre IDs
   */
  completed: Array<string>;
  /**
   * Array of skipped genre IDs
   */
  skipped: Array<string>;
}

export interface IGenreContext {
  /**
   * Current genres
   */
  genres: IGenreStates;
  /**
   * State setter function for genres
   */
  setGenres: Dispatch<SetStateAction<IGenreStates>>;

  /**
   * Whether Firebase is currently loading
   */
  isLoading:boolean;
}
