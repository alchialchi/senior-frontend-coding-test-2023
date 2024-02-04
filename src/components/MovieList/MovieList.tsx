import styled from '@emotion/styled';
import { useLocation } from 'react-router-dom';

import {
  MovieType,
  isMovieType,
  useMovieSearch,
} from '../../hooks/useMovieSearch';
import { Container } from '../MovieList/Container';
import { MovieCard } from '../MovieCard';
import { SearchBar } from './SearchBar';

const ErrorText = styled.p`
  color: red;
`;

const LoadingText = styled.p`
  color: blue;
`;

const NotFound = styled.p`
  font-size: 1.5em;
  text-align: center;
  font-weight: bold;
  color: #333;
`;

export const EmptyMovieList = () => {
  return (
    <div>
      <SearchBar searchTerm={null} year={null} type={null} />
      <p>Search for a movie</p>
    </div>
  );
};

export const MovieList = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const searchTerm = searchParams.get('s');
  const year = searchParams.get('y');
  const type = searchParams.get('type');

  const { data, error } = useMovieSearch(
    searchTerm ?? '',
    year ?? '',
    isMovieType(type) ? type : MovieType.All,
  );

  return (
    <div>
      <SearchBar searchTerm={searchTerm} year={year} type={type} />
      {error && <ErrorText>There is an error.</ErrorText>}
      {!data && <LoadingText>Loading...</LoadingText>}
      {data && data.Response == 'True' && (
        <Container>
          {data.Search.map((movie) => (
            <MovieCard key={movie.imdbID} movie={movie} />
          ))}
        </Container>
      )}
      {data && data.Response == 'False' && (
        <NotFound data-testid="nothing-found">No movies found</NotFound>
      )}
    </div>
  );
};
