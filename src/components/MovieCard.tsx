import styled from '@emotion/styled';
import { Movie } from '../types/Types';
import { Link } from 'react-router-dom';

const Card = styled(Link)`
  position: relative;
  display: flex;
  justify-content: flex-end;
  border-radius: 5px;
  width: 100%;
  height: 300px;
  margin: 0 0 16px 0;
  overflow: hidden;
  text-decoration: none;

  &:hover .textContainer {
    opacity: 1;
  }

  &:hover {
    transform: scale(1.02);
    transition: transform 0.3s ease-in-out;
  }

  &:active {
    transform: scale(0.98);
  }
`;

const Poster = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  position: absolute;
  top: 0;
  left: 0;
`;

const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  background: rgba(0, 0, 0, 0.7);
  color: #cbd5e1;
  width: 100%;
  height: 100%;
  padding: 16px;
  box-sizing: border-box;
  z-index: 1;
  opacity: 0;
  transition: opacity 0.3s ease-in-out;
`;

const Title = styled.h2`
  font-size: 1.8em;
  color: #cbd5e1;
  margin: 0;
`;

const Year = styled.p`
  font-size: 1.2em;
  color: #cbd5e1;
  margin: 0;
`;

export const MovieCard = ({ movie }: { movie: Movie }) => (
  <Card to={`/${movie.imdbID}`} data-testid="movie-card">
    <Poster src={movie.Poster} alt={movie.Title} />
    <TextContainer className="textContainer">
      <Title>{movie.Title}</Title>
      <Year>{movie.Year}</Year>
    </TextContainer>
  </Card>
);
