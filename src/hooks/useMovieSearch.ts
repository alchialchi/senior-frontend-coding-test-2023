import { useFetch } from 'usehooks-ts';
import { Movie } from '../types/Types';

const apiKey = 'e10af0d4';
const baseUrl = `http://www.omdbapi.com/?apikey=${apiKey}&`;

interface SearchResultError {
  Response: 'False';
  totalResults: string;
}

interface SearchResultSuccess {
  Response: 'True';
  totalResults: string;
  Search: Movie[];
}

type SearchResult = SearchResultSuccess | SearchResultError;

export enum MovieType {
  All = '',
  Movie = 'movie',
  Series = 'series',
  Episode = 'episode',
}

export function isMovieType(type: string | null): type is MovieType {
  return Object.values(MovieType).includes(type as MovieType);
}

export function useMovieSearch(
  movieTitle: string,
  year: string,
  type: MovieType,
) {
  const params: Record<string, string> = {
    s: movieTitle,
    y: year,
    type,
  };

  const { data, error } = useFetch<SearchResult>(
    `${baseUrl}${new URLSearchParams(params).toString()}`,
  );
  return { data, error };
}

export function useMovieDetails(imdbID: string) {
  const params: Record<string, string> = {
    i: imdbID,
    plot: 'full',
  };

  const { data, error } = useFetch<Movie>(
    `${baseUrl}${new URLSearchParams(params).toString()}`,
  );
  return { data, error };
}
