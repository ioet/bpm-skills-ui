/* eslint-disable max-len */
export function validateEmail(email) {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}

export function compareCategoriesByFirstName(a, b) {
  if (a[1].toLowerCase() < b[1].toLowerCase()) {
    return -1;
  }
  if (a[1].toLowerCase() > b[1].toLowerCase()) {
    return 1;
  }
  return 0;
}

export const arrayToCategoryObject = (array, keyField) => (
  array.reduce((obj, category) => {
    obj[category[keyField]] = category;
    return obj;
  }, {})
);

export const getCategoryToBeCreated = () => (
  {
    id: 'categoryToBeCreated',
    name: '',
    business_value: '',
    predictive_value: '',
  }
);

export function getCategoryObjectFromArray(category) {
  return {
    id: category[0],
    name: category[1],
    business_value: category[2],
    predictive_value: category[3],
  };
}
