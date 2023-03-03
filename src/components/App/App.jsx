import { useState } from 'react';
import { GlobalStyle } from './GlobalStyle';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { Container } from './App.styled';
import Searchbar from '../Searchbar/Searchbar';
import ImageGallery from '../ImageGallery/ImageGallery';

function App() {
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);

  const handleSearchSubmit = ({ query }) => {
    setQuery(query);
    setPage(1);
  };

  const loadMore = () => {
    setPage(prevState => prevState + 1);
  };

  return (
    <Container>
      <ToastContainer />

      <Searchbar onSubmit={handleSearchSubmit} />
      <ImageGallery query={query} page={page} onLoad={loadMore} />
      <GlobalStyle />
    </Container>
  );
}

export default App;
