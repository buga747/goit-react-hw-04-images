import ImageGalleryItem from 'components/ImageGalleryItem';
import PropTypes from 'prop-types';
import { Component } from 'react';
import { fetchImages } from '../../service/api-service';
import { toast } from 'react-toastify';
import { Gallery } from './ImageGallery.styled';
import Loader from 'components/Loader';
import Button from 'components/Button';

const Status = {
  IDLE: 'idle',
  PENDING: 'pending',
  RESOLVED: 'resolved',
  REJECTED: 'rejected',
};
class ImageGallery extends Component {
  state = {
    status: Status.IDLE,
    error: null,
    images: [],
    totalHits: null,
    showLoadMoreBtn: false,
  };

  componentDidUpdate(prevProps, prevState) {
    if (
      prevProps.page !== this.props.page ||
      prevProps.query !== this.props.query
    ) {
      this.setState({
        status: Status.PENDING,
      });

      fetchImages(this.props.page, this.props.query)
        .then(data => {
          console.log(data);
          if (this.props.page === 1 && data.totalHits !== 0) {
            toast.success(`We found ${data.totalHits} images!`);
            this.setState({ images: [] });
          }

          if (data.totalHits === 0) {
            toast.error(
              `UpsOops!!! We did not find any images for this request. Try changing the query.`
            );
          }

          this.setState({
            showLoadMoreBtn: true,
            status: Status.RESOLVED,
          });
          this.setState(prevState => ({
            images: [...prevState.images, ...data.hits],
          }));

          if (this.state.images.length + data.hits.length >= data.totalHits) {
            this.setState({ showLoadMoreBtn: false });
          }
        })
        .catch(error => this.setState({ error, status: Status.REJECTED }));
    }
  }

  loadMore = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  render() {
    const { status, images, showLoadMoreBtn } = this.state;

    return (
      <>
        {status === 'pending' && <Loader />}

        <Gallery>
          {images.map(({ id, webformatURL, tags, largeImageURL }) => {
            return (
              <ImageGalleryItem
                key={id}
                url={webformatURL}
                tags={tags}
                largeImg={largeImageURL}
              />
            );
          })}
        </Gallery>
        {showLoadMoreBtn && <Button onClick={this.props.onLoad} />}
      </>
    );
  }
}

ImageGallery.propTypes = {
  query: PropTypes.string.isRequired,
};

export default ImageGallery;
