import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import { MovieDetails } from './components/MovieDetails';
import { EmptyMovieList, MovieList } from './components/MovieList/MovieList';

export function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<EmptyMovieList />} />
        <Route path="/search/:searchTerm?" element={<MovieList />} />
        <Route path="/:imdbID" element={<MovieDetails />} />
      </Routes>
    </Router>
  );
}
