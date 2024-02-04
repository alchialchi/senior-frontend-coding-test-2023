import styled from '@emotion/styled';
import { useCallback, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { useMovieSearch } from '../../hooks/useMovieSearch';
import { Container } from '../MovieList/Container';
import { MovieCard } from '../MovieCard';

const ErrorText = styled.p`
  color: red;
`;

const LoadingText = styled.p`
  color: blue;
`;

const SearchBar = () => {
  const { searchTerm = '' } = useParams<{ searchTerm: string }>();
  const [searchText, setSearchText] = useState(searchTerm);
  const navigate = useNavigate();

  const handleSearch = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setSearchText(event.target.value);
    },
    [setSearchText],
  );

  const handleSearchSubmit = useCallback(
    (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      navigate(`/search/${searchText}`);
    },
    [navigate, searchText],
  );

  return (
    <form onSubmit={handleSearchSubmit}>
      <input
        type="text"
        value={searchText}
        onChange={handleSearch}
        placeholder="Search movies..."
      />
      <button type="submit">Search</button>
    </form>
  );
};

export const EmptyMovieList = () => {
  return (
    <div>
      <SearchBar />
      <p>Search for a movie</p>
    </div>
  );
};

export const MovieList = () => {
  const { searchTerm = '' } = useParams<{ searchTerm: string }>();

  const { data, error } = useMovieSearch(searchTerm);

  return (
    <div>
      <SearchBar />
      {error && <ErrorText>There is an error.</ErrorText>}
      {!data && <LoadingText>Loading...</LoadingText>}
      {data && data.Response == 'True' && (
        <Container>
          {data.Search.map((movie) => (
            <MovieCard key={movie.imdbID} movie={movie} />
          ))}
        </Container>
      )}
    </div>
  );
};
