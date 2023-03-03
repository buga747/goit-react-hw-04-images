import PropTypes from 'prop-types';
import React from 'react';
import { Formik } from 'formik';
import { Header, Form, Button, ButtonLabel, Input } from './Searchbar.styled';
import { BiSearchAlt } from 'react-icons/bi';
const Searchbar = ({ onSubmit }) => {
  return (
    <Header>
      <Formik
        initialValues={{ query: '' }}
        onSubmit={(values, actions) => {
          actions.resetForm();
          if (values.query.trim() !== '') {
            onSubmit(values);
          }
        }}
      >
        <Form>
          <Button type="submit">
            <ButtonLabel>
              <BiSearchAlt size={25} />
            </ButtonLabel>
          </Button>

          <Input
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            name="query"
          />
        </Form>
      </Formik>
    </Header>
  );
};

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default Searchbar;
