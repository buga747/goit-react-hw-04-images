import { ButtonLoadMore } from './Button.styled';

const Button = ({ onClick }) => {
  return (
    <ButtonLoadMore type="button" onClick={onClick}>
      Load more
    </ButtonLoadMore>
  );
};

export default Button;
