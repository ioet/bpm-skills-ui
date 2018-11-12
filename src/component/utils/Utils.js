export function compareSkillsByFirstName(a, b) {
  if (a[1].toLowerCase() < b[1].toLowerCase()) {
    return -1;
  }
  if (a[1].toLowerCase() > b[1].toLowerCase()) {
    return 1;
  }
  return 0;
}

export const arrayToObject = (array, keyField) => (
  array.reduce((obj, item) => {
    obj[item[keyField]] = item;
    return obj;
  }, {})
);

export const getSkillToBeCreated = () => (
  {
    skillToBeCreated: {
      id: 'skillToBeCreated',
      name: '',
    },
  }
);

export function getSkillObjectFromArray(skill) {
  return {
    id: skill[0],
    name: skill[1],
  };
}
