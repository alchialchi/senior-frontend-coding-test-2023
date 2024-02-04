import { useParams, useNavigate } from 'react-router-dom';
import styled from '@emotion/styled';
import { useMovieDetails } from '../hooks/useMovieSearch';

const ErrorText = styled.p`
  color: red;
`;

const LoadingText = styled.p`
  color: blue;
`;

const DetailsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  background-color: #f5f5f5;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

const BackButton = styled.button`
  margin-bottom: 20px;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  background-color: #007bff;
  color: white;
  cursor: pointer;
`;

const MovieTitle = styled.h1`
  margin-bottom: 10px;
`;

const MovieYear = styled.p`
  margin-bottom: 20px;
  color: #6c757d;
`;

const MoviePlot = styled.p`
  margin-bottom: 20px;
`;

const MoviePoster = styled.img`
  max-width: 100%;
  height: auto;
`;

const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;

  @media (min-width: 768px) {
    flex-direction: row;
    justify-content: space-between;
    align-items: flex-start;
  }
`;

const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  p {
    margin: 0;
  }
`;

export function MovieDetails() {
  const { imdbID } = useParams<{ imdbID: string }>();
  const { data, error } = useMovieDetails(imdbID || '');
  const navigate = useNavigate();

  if (error) return <ErrorText>There is an error.</ErrorText>;
  if (!data) return <LoadingText>Loading...</LoadingText>;

  return (
    <DetailsContainer>
      <BackButton onClick={() => navigate(-1)}>Back</BackButton>
      <MovieTitle>{data.Title}</MovieTitle>
      <MovieYear>{data.Year}</MovieYear>
      <ContentContainer>
        <MoviePoster src={data.Poster} alt={data.Title} />
        <InfoContainer>
          <MoviePlot>{data.Plot}</MoviePlot>
          <p>Rated: {data.Rated}</p>
          <p>Released: {data.Released}</p>
          <p>Runtime: {data.Runtime}</p>
          <p>Genre: {data.Genre}</p>
          <p>Director: {data.Director}</p>
          <p>Writer: {data.Writer}</p>
          <p>Actors: {data.Actors}</p>
          <p>Language: {data.Language}</p>
          <p>Country: {data.Country}</p>
          <p>Awards: {data.Awards}</p>
          <p>IMDb Rating: {data.imdbRating}</p>
          <p>IMDb Votes: {data.imdbVotes}</p>
          <p>Type: {data.Type}</p>
          {data.totalSeasons && <p>Total Seasons: {data.totalSeasons}</p>}
        </InfoContainer>
      </ContentContainer>
    </DetailsContainer>
  );
}
