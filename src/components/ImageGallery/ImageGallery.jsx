import ImageGalleryItem from 'components/ImageGalleryItem';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { fetchImages } from '../../service/api-service';
import { toast } from 'react-toastify';
import { Gallery } from './ImageGallery.styled';
import Loader from 'components/Loader';
import Button from 'components/Button';

// const Status = {
//   IDLE: 'idle',
//   PENDING: 'pending',
//   RESOLVED: 'resolved',
//   REJECTED: 'rejected',
// };
function ImageGallery({ query }) {
  const [loading, setLoading] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);

  const [error, setError] = useState(null);
  const [images, setImages] = useState([]);
  const [showLoadMoreBtn, setShowLoadMoreBtn] = useState(false);
  const [page, setPage] = useState(1);

  useEffect(() => {
    setPage(1);
  }, [query]);

  useEffect(() => {
    if (query === '') {
      return;
    }

    const getPhotos = async () => {
      setLoading(true);
      setLoadingMore(true);

      if (page > 1) {
        setLoading(false);
      }

      if (page === 1) {
        setImages([]);
      }
      try {
        const { totalHits, hits } = await fetchImages(page, query);

        if (page === 1 && totalHits !== 0) {
          toast.success(`We found ${totalHits} images!`);
          setImages([]);
        }

        if (totalHits === 0) {
          toast.error(
            `UpsOops!!! We did not find any images for this request. Try changing the query.`
          );
        }
        setShowLoadMoreBtn(true);
        setImages(prevState => [...prevState, ...hits]);
        setLoadingMore(false);

        if (page >= Math.ceil(totalHits / 12)) {
          setShowLoadMoreBtn(false);
        }
      } catch (error) {
        console.log(error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    getPhotos();
  }, [page, query]);

  const loadMore = () => {
    setPage(prevState => prevState + 1);
  };

  return (
    <>
      {loading && <Loader />}
      {{ error } && <p>{error}</p>}
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
      {showLoadMoreBtn && <Button onClick={loadMore} isLoading={loadingMore} />}
    </>
  );
}

ImageGallery.propTypes = {
  query: PropTypes.string.isRequired,
};

export default ImageGallery;
