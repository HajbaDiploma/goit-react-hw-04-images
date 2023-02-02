import { useState } from "react";
import PropTypes from "prop-types";
import { FcSearch } from 'react-icons/fc';
import toast, { Toaster } from 'react-hot-toast';
import { SearchWrap, SearchForm, SearchBtn, SearchInput} from "./Searchbar.styled";

export const Searchbar = ({ onSubmit }) => {

  const [query, setQuery] = useState('');

  const handleChange = event => {
    setQuery(event.target.value);
  };

  const handleSubmit = event => {
    event.preventDefault();

    // console.log(event.target.elements);
    // console.log(query);

    if (query.trim() === '') {
      toast.error('Please, enter something in a search query', {
        duration: 3000,
        style: {
          border: '1px solid transparent',
          padding: '16px',
          color: 'red',
          width: '300px',
        },
      });
      return;
    }

    onSubmit(query);

    // setQuery('');
  };

  return (
    <SearchWrap>
      <SearchForm onSubmit={handleSubmit}>
        <SearchBtn type="submit" >
          <FcSearch></FcSearch>
        </SearchBtn>

        <SearchInput
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          name="query"
          onChange={handleChange}
          value={query}
        />
      </SearchForm>
      <Toaster position="top-right"/>
    </SearchWrap>
  )
}

Searchbar.propTypes = {
  onSubmit:PropTypes.func.isRequired,
}
