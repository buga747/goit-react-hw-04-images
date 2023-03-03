import { Component } from 'react';
import { GlobalStyle } from './GlobalStyle';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { Container } from './App.styled';
import Searchbar from '../Searchbar/Searchbar';
import ImageGallery from '../ImageGallery/ImageGallery';

class App extends Component {
  state = {
    query: '',
    page: 1,
  };

  handleSearchSubmit = ({ query }) => {
    this.setState({ query, page: 1 });
  };

  loadMore = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  render() {
    const { query, page } = this.state;

    return (
      <Container>
        <ToastContainer />

        <Searchbar onSubmit={this.handleSearchSubmit} />
        <ImageGallery query={query} page={page} onLoad={this.loadMore} />
        <GlobalStyle />
      </Container>
    );
  }
}

export default App;
