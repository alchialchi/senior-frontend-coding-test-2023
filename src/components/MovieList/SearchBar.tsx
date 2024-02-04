import styled from '@emotion/styled';
import { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SearchForm = styled.form`
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-bottom: 20px;
`;

const SearchInput = styled.input`
  width: 200px;
  padding: 5px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const YearInput = styled(SearchInput)`
  width: 100px;
`;

const TypeSelect = styled.select`
  padding: 5px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const SearchButton = styled.button`
  padding: 5px 10px;
  border: none;
  border-radius: 4px;
  background-color: #007bff;
  color: white;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;

export const SearchBar = ({
  searchTerm,
  year: defaultYear,
  type: defaultType,
}: {
  searchTerm: string | null;
  year: string | null;
  type: string | null;
}) => {
  const [searchText, setSearchText] = useState(searchTerm ?? '');
  const navigate = useNavigate();
  const [year, setYear] = useState(defaultYear ?? '');
  const [type, setType] = useState(defaultType ?? '');

  const handleSearch = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setSearchText(event.target.value);
    },
    [],
  );

  const handleYearChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setYear(event.target.value);
    },
    [],
  );

  const handleTypeChange = useCallback(
    (event: React.ChangeEvent<HTMLSelectElement>) => {
      setType(event.target.value);
    },
    [],
  );

  const handleSearchSubmit = useCallback(
    (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      navigate(
        `/search/?s=${encodeURIComponent(searchText)}&y=${encodeURIComponent(year)}&type=${encodeURIComponent(type)}`,
      );
    },
    [navigate, searchText, year, type],
  );

  return (
    <SearchForm onSubmit={handleSearchSubmit}>
      <SearchInput
        type="text"
        value={searchText}
        onChange={handleSearch}
        placeholder="Search movies..."
        data-testid="search-input"
        required
      />
      <YearInput
        type="text"
        value={year}
        onChange={handleYearChange}
        data-testid="year-input"
        placeholder="Year"
      />
      <TypeSelect value={type} onChange={handleTypeChange}>
        <option value="">All</option>
        <option value="movie">Movie</option>
        <option value="series">Series</option>
        <option value="episode">Episode</option>
      </TypeSelect>
      <SearchButton type="submit">Search</SearchButton>
    </SearchForm>
  );
};
