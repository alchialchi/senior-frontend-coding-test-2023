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

export function useMovieSearch(movieTitle: string) {
  const { data, error } = useFetch<SearchResult>(
    `${baseUrl}s=${encodeURIComponent(movieTitle)}`,
  );
  return { data, error };
}

export function useMovieDetails(imdbID: string) {
  const { data, error } = useFetch<Movie>(
    `${baseUrl}i=${encodeURIComponent(imdbID)}`,
  );
  return { data, error };
}
