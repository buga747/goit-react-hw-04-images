import { useState } from 'react';
import { GlobalStyle } from './GlobalStyle';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { Container } from './App.styled';
import Searchbar from '../Searchbar/Searchbar';
import ImageGallery from '../ImageGallery/ImageGallery';

function App() {
  const [query, setQuery] = useState('');

  const handleSearchSubmit = ({ query }) => {
    setQuery(query);
  };

  return (
    <Container>
      <ToastContainer />

      <Searchbar onSubmit={handleSearchSubmit} />
      <ImageGallery query={query} />
      <GlobalStyle />
    </Container>
  );
}

export default App;
