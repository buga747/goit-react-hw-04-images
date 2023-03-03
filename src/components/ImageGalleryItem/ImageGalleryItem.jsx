import { Component } from 'react';
import { GalleryItem, Image } from './ImageGalleryItem.styled';
import ModalPhoto from 'components/Modal';
import PropTypes from 'prop-types';
class ImageGalleryItem extends Component {
  state = {
    showModal: false,
  };

  toggleModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
  };
  render() {
    const { url, tags, largeImg } = this.props;
    const { showModal } = this.state;

    return (
      <GalleryItem>
        <Image src={url} alt={tags} onClick={this.toggleModal} />

        {showModal && (
          <ModalPhoto
            onModalClose={this.toggleModal}
            largeImg={largeImg}
            tags={tags}
          />
        )}
      </GalleryItem>
    );
  }
}

ImageGalleryItem.propTypes = {
  url: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
  largeImg: PropTypes.string.isRequired,
};

export default ImageGalleryItem;
