import React, { Component } from 'react';
import { createPortal } from 'react-dom';
import { Overlay, Modal } from './Modal.styled';
import PropTypes from 'prop-types';

const modalRoot = document.querySelector('#modal-root');

class ModalPhoto extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.onEscPress);
  }
  componentWillUnmount() {
    window.removeEventListener('keydown', this.onEscPress);
  }

  onEscPress = event => {
    if (event.code === 'Escape') {
      this.props.onModalClose();
    }
  };

  onBackdropClick = event => {
    if (event.currentTarget === event.target) {
      this.props.onModalClose();
    }
  };

  render() {
    const { largeImg, tags } = this.props;

    return createPortal(
      <Overlay onClick={this.onBackdropClick}>
        <Modal>
          <img src={largeImg} alt={tags} />
        </Modal>
      </Overlay>,
      modalRoot
    );
  }
}

ModalPhoto.propTypes = {
  onModalClose: PropTypes.func.isRequired,
  largeImg: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
};

export default ModalPhoto;
