import ImageGalleryItem from 'components/ImageGalleryItem';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
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
function ImageGallery({ query, page, onLoad }) {
  const [status, setStatus] = useState(Status.IDLE);
  const [error, setError] = useState(null);
  const [images, setImages] = useState([]);
  const [showLoadMoreBtn, setShowLoadMoreBtn] = useState(false);

  useEffect(() => {
    if (query === '') {
      return;
    }

    setStatus(Status.PENDING);

    fetchImages(page, query)
      .then(data => {
        console.log(data);
        if (page === 1 && data.totalHits !== 0) {
          toast.success(`We found ${data.totalHits} images!`);
          setImages([]);
        }

        if (data.totalHits === 0) {
          toast.error(
            `UpsOops!!! We did not find any images for this request. Try changing the query.`
          );
        }

        setStatus(Status.RESOLVED);
        setShowLoadMoreBtn(true);
        setImages(prevState => [...prevState, ...data.hits]);

        if (page >= Math.ceil(data.totalHits / 12)) {
          setShowLoadMoreBtn(false);
        }
      })
      .catch(er => setError(er), setStatus(Status.REJECTED));
  }, [page, query]);

  return (
    <>
      {status === 'pending' && <Loader />}
      {status === 'rejected' && <p>{error}</p>}
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
      {showLoadMoreBtn && <Button onClick={onLoad} />}
    </>
  );
}

ImageGallery.propTypes = {
  query: PropTypes.string.isRequired,
};

export default ImageGallery;
