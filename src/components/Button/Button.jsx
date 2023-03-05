import PropTypes from 'prop-types';

import { ButtonLoadMore } from './Button.styled';

const Button = ({ onClick, isLoading }) => {
  return (
    <ButtonLoadMore type="button" disabled={isLoading} onClick={onClick}>
      {isLoading ? 'Loading...' : 'Load more'}
    </ButtonLoadMore>
  );
};

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
  isLoading: PropTypes.func.isRequired,
};

export default Button;
