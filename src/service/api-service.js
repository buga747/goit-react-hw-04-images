import axios from 'axios';

export const fetchImages = async (page, searchQuery) => {
  const BASE_URL = 'https://pixabay.com/api/';
  const params = {
    key: '32739327-960c57fb59b81838da1bafdd1',
    q: `${searchQuery}`,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: 'true',
    page: `${page}`,
    per_page: '12',
  };

  const response = await axios(BASE_URL, { params });

  return response.data;
};
