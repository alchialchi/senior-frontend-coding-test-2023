import styled from '@emotion/styled';
import { Movie } from '../types/Types';
import { Link } from 'react-router-dom';

const Card = styled(Link)`
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 1px solid #ddd;
  border-radius: 4px;
  padding: 16px;
  margin: 16px;
  width: 200px;
`;

const Title = styled.h2`
  font-size: 1.5em;
  text-align: center;
  color: #333;
`;

const Year = styled.p`
  font-size: 1em;
  text-align: center;
  color: #666;
`;

const Poster = styled.img`
  width: 100%;
  height: auto;
`;

export const MovieCard = ({ movie }: { movie: Movie }) => (
  <Card to={`/${movie.imdbID}`} data-testid="movie-card">
    <Title>{movie.Title}</Title>
    <Year>{movie.Year}</Year>
    <Poster src={movie.Poster} alt={movie.Title} />
  </Card>
);
