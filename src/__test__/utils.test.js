import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import * as actions from '../actions';
import { compareCategoriesByFirstName, getCategoryObjectFromArray } from '../component/utils/Utils';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('utils test', () => {
  it('should check that the input is valid', () => {
    const input = 'someInput';
    expect(actions.validateField(input))
      .toEqual(true);
  });

  it('should verify that an empty input is not valid', () => {
    const input = '';
    expect(actions.validateField(input))
      .toEqual(false);
  });

  it('should verify that undefined input is not valid', () => {
    const input = undefined;
    expect(actions.validateField(input))
      .toEqual(false);
  });

  it('should return true when valid data is supplied', () => {
    const mockCategory = {
      id: 'someId',
      name: 'Old Category Name',
      authentication_identity: 'oldTest@mail.com',
    };

    const store = mockStore({});
    expect(actions.validateInputWithErrorMessages(store.dispatch, mockCategory))
      .toEqual(true);
  });

  it('should return false when invalid name is supplied', () => {
    const mockCategory = {
      id: 'someId',
      name: '',
      authentication_identity: 'oldTest@mail.com',
    };

    const store = mockStore({});
    expect(actions.validateInputWithErrorMessages(store.dispatch, mockCategory))
      .toEqual(false);
  });

  it('should return false when invalid email is supplied', () => {
    const mockCategory = {
      id: 'someId',
      name: 'Test Name',
      authentication_identity: 'oldTest@_@_@mail.com',
    };

    const store = mockStore({});
    expect(actions.validateInputWithErrorMessages(store.dispatch, mockCategory))
      .toEqual(false);
  });

  it('should return a sorted list of categories when given a unsorted list', () => {
    const firstCategory = ['someId1', 'AAA Name', 'some@email.com'];
    const secondCategory = ['someId2', 'ZZZ Name', 'some@email.com'];
    const thirdCategory = ['someId3', 'ZZZ Name', 'some@email.com'];
    const forthCategory = ['someId3', 'MMM Name', 'some@email.com'];

    const categoryArray = [firstCategory, secondCategory, thirdCategory, forthCategory].sort(compareCategoriesByFirstName);

    expect(categoryArray)
      .toEqual([firstCategory, forthCategory, secondCategory, thirdCategory]);
  });

  it('should return a category object from an array', () => {
    const firstCategory = ['someId1', 'AAA Name', 'some@email.com'];

    expect(getCategoryObjectFromArray(firstCategory))
      .toEqual({
        id: firstCategory[0],
        name: firstCategory[1],
        authentication_identity: firstCategory[2],
      });
  });
});
