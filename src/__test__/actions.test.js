import configureMockStore from 'redux-mock-store';
import { ApiClient } from 'swagger_bpm_people_api';
import thunk from 'redux-thunk';
import expect from 'expect';
import nock from 'nock';
import * as types from '../action-types';
import * as actions from '../actions';
import {
  ErrorMessage, NotificationMessage, PromptMessage, Variable,
} from '../constants';
import { getCategoryToBeCreated } from '../component/utils/Utils';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const peopleApiClient = new ApiClient();

describe('actions', () => {
  it('should create an action to add many categories', () => {
    const categories = [
      {
        id: 'someId',
        name: 'Category Name',
        authentication_identity: 'test@mail.com',
      },
      {
        id: 'someOtherId',
        name: 'Other Category Name',
        authentication_identity: 'otherTest@mail.com',
      },
    ];
    const expectedAction = {
      type: types.CategoryAction.ADD_CATEGORIES,
      category: categories,
    };
    expect(actions.addCategories(categories))
      .toEqual(expectedAction);
  });

  it('should create an action to add a single category', () => {
    const category = {
      id: 'someId',
      name: 'Category Name',
      authentication_identity: 'test@email.com',
    };
    const expectedAction = {
      type: types.CategoryAction.ADD_CATEGORY,
      category: category,
    };
    expect(actions.addCategory(category))
      .toEqual(expectedAction);
  });

  it('should create an action to set an error to an input field', () => {
    const someField = 'inputField';
    const expectedAction = {
      type: types.InputErrorAction.ADD,
      field: someField,
    };
    expect(actions.setInputError(someField))
      .toEqual(expectedAction);
  });

  it('should create an action to remove errors from all input fields', () => {
    const expectedAction = {
      type: types.InputErrorAction.REMOVE_ALL,
    };
    expect(actions.removeAllInputErrors())
      .toEqual(expectedAction);
  });

  it('should create an action to show a message', () => {
    const someMessage = 'some message';
    const expectedAction = {
      type: types.MessageAction.SHOW_MESSAGE,
      message: someMessage,
    };
    expect(actions.showMessage(someMessage))
      .toEqual(expectedAction);
  });

  it('should create an action to hide all messages', () => {
    const expectedAction = {
      type: types.MessageAction.HIDE_MESSAGE,
    };
    expect(actions.hideMessage())
      .toEqual(expectedAction);
  });

  it('should create an action to show the delete confirmation dialog', () => {
    const categoryIds = [
      'categoryId1',
      'categoryId2',
    ];
    const expectedAction = {
      type: types.DeleteAction.SHOW_DIALOG,
      open: true,
      categoryIds: categoryIds,
    };
    expect(actions.showDeleteDialog(categoryIds))
      .toEqual(expectedAction);
  });

  it('should create an action to hide the delete confirmation dialog', () => {
    const expectedAction = {
      type: types.DeleteAction.HIDE_DIALOG,
      open: false,
    };
    expect(actions.hideDeleteDialog())
      .toEqual(expectedAction);
  });

  it('should create an action to start editing a category', () => {
    const expectedAction = {
      type: types.CategoryAction.EDIT_START,
    };
    expect(actions.startEditCategory())
      .toEqual(expectedAction);
  });

  it('should create an action to end editing a category', () => {
    const expectedAction = {
      type: types.CategoryAction.EDIT_END,
    };
    expect(actions.endEditCategory())
      .toEqual(expectedAction);
  });

  it('should create an action to set the edited data of a category', () => {
    const field = 'someField';
    const value = 'someValue';
    const expectedAction = {
      type: types.CategoryAction.EDIT_DATA,
      field,
      value,
    };
    expect(actions.setCategoryEditData(field, value))
      .toEqual(expectedAction);
  });

  it('should create an action to set the category to update', () => {
    const categoryToUpdate = {
      id: 'someId',
      name: 'Category Name',
      authentication_identity: 'test@email.com',
    };
    const expectedAction = {
      type: types.CategoryAction.UPDATE,
      category: categoryToUpdate,
    };
    expect(actions.setUpdateCategory(categoryToUpdate))
      .toEqual(expectedAction);
  });

  it('should create an action to set the category to remove', () => {
    const categoryIdToRemove = 'someCategoryIdToRemove';
    const expectedAction = {
      type: types.CategoryAction.REMOVE,
      categoryId: categoryIdToRemove,
    };
    expect(actions.removeCategory(categoryIdToRemove))
      .toEqual(expectedAction);
  });

  it('should create an action to indicate hover', () => {
    const id = 'someId';
    const expectedAction = {
      type: types.HoverAction.OVER,
      id,
    };
    expect(actions.hoverOver(id))
      .toEqual(expectedAction);
  });

  it('should create an action to indicate not hovering anymore', () => {
    const expectedAction = {
      type: types.HoverAction.OUT,
    };
    expect(actions.hoverOut())
      .toEqual(expectedAction);
  });
});

describe('async actions', () => {

  it('creates ADD_CATEGORIES when getting all categories was successful', () => {
    const getPeopleMock = [
      {
        id: 'someId',
        name: 'Category Name',
        authentication_identity: 'test@mail.com',
      },
      {
        id: 'someOtherId',
        name: 'Other Category Name',
        authentication_identity: 'otherTest@mail.com',
      },
    ];

    nock(peopleApiClient.basePath)
      .get('/people')
      .reply(200, getPeopleMock);

    const expectedActions = [
      {
        type: types.CategoryAction.ADD_CATEGORIES,
        category: getPeopleMock,
      },
    ];

    const store = mockStore({ category: [] });

    return store.dispatch(actions.getAllCategoriesAsync())
      .then(() => {
        expect(store.getActions())
          .toEqual(expectedActions);
      });
  });

  it('creates ADD_CATEGORIES when getting all categories was NOT successful', () => {
    nock(peopleApiClient.basePath)
      .get('/people')
      .reply(404);

    const expectedActions = [
      {
        type: types.MessageAction.SHOW_MESSAGE,
        message: ErrorMessage.FAILED_TO_LOAD_CATEGORIES,
      },
    ];

    const store = mockStore({ category: [] });

    return store.dispatch(actions.getAllCategoriesAsync())
      .then(() => {
        expect(store.getActions())
          .toEqual(expectedActions);
      });
  });

  it('creates a bunch of actions when creating a category was NOT successful', () => {
    const createCategoryMock = {
      id: 'someId',
      name: 'Category Name',
      authentication_identity: 'test@mail.com',
    };

    nock(peopleApiClient.basePath)
      .post('/people')
      .reply(404);

    const expectedActions = [
      {
        type: types.MessageAction.SHOW_MESSAGE,
        message: ErrorMessage.FAILED_TO_CREATE_CATEGORY,
      },
    ];

    const store = mockStore({ categoryEdit: createCategoryMock });

    return store.dispatch(actions.createCategoryAsync())
      .then(() => {
        expect(store.getActions())
          .toEqual(expectedActions);
      });
  });

  it('creates some actions when removing a category was successful', () => {
    const removeCategoryMock = {
      id: 'someId',
      name: 'Category Name',
      authentication_identity: 'test@mail.com',
    };

    nock(peopleApiClient.basePath)
      .delete(`/people/${removeCategoryMock.id}`)
      .reply(204);

    const expectedActions = [
      {
        type: types.MessageAction.SHOW_MESSAGE,
        message: removeCategoryMock.name + NotificationMessage.CATEGORY_DELETED_SUCCESSFULLY,
      },
      {
        type: types.CategoryAction.REMOVE,
        categoryId: removeCategoryMock.id,
      },
    ];

    const store = mockStore({ categoryList: { [removeCategoryMock.id]: removeCategoryMock } });

    return store.dispatch(actions.removeCategoryAsync(removeCategoryMock.id))
      .then(() => {
        expect(store.getActions())
          .toEqual(expectedActions);
      });
  });

  it('creates INFO_MESSAGE when removing a category was NOT successful', () => {
    const removeCategoryMock = {
      id: 'someId',
      name: 'Category Name',
      authentication_identity: 'test@mail.com',
    };

    nock(peopleApiClient.basePath)
      .delete('/people')
      .reply(404);

    const expectedActions = [
      {
        type: types.MessageAction.SHOW_MESSAGE,
        message: ErrorMessage.FAILED_TO_REMOVE_CATEGORY,
      },
    ];

    const store = mockStore({ category: [] });

    return store.dispatch(actions.removeCategoryAsync(removeCategoryMock))
      .then(() => {
        expect(store.getActions())
          .toEqual(expectedActions);
      });
  });

  it('creates some actions when updating a category was successful', () => {
    const updatedCategoryMock = {
      id: 'someId',
      name: 'New Category Name',
      authentication_identity: 'newTest@mail.com',
    };
    const categoryToUpdate = {
      id: 'someId',
      name: 'Old Category Name',
      authentication_identity: 'oldTest@mail.com',
    };

    nock(peopleApiClient.basePath)
      .put(`/people/${categoryToUpdate.id}`)
      .reply(200, updatedCategoryMock);

    const expectedActions = [
      {
        type: types.InputErrorAction.REMOVE_ALL,
      },
      {
        type: types.CategoryAction.EDIT_END,
      },
      {
        type: types.CategoryAction.UPDATE,
        category: updatedCategoryMock,
      },
      {
        type: types.MessageAction.SHOW_MESSAGE,
        message: NotificationMessage.CHANGES_UPDATED_SUCCESSFULLY,
      },
    ];

    const store = mockStore({
      categoryList: {
        [categoryToUpdate.id]: categoryToUpdate,
      },
      categoryEdit: categoryToUpdate,
    });

    return store.dispatch(actions.updateCategoryAsync(categoryToUpdate.id))
      .then(() => {
        expect(store.getActions())
          .toEqual(expectedActions);
      });
  });

  it('creates some actions when updating a categories name was successful', () => {
    const updatedCategoryMock = {
      id: 'someId',
      name: 'New Category Name',
      authentication_identity: 'newTest@mail.com',
    };
    const categoryToUpdate = {
      id: 'someId',
      name: 'Old Category Name',
      authentication_identity: 'oldTest@mail.com',
    };

    nock(peopleApiClient.basePath)
      .put(`/people/${categoryToUpdate.id}`)
      .reply(200, updatedCategoryMock);

    const expectedActions = [
      {
        type: types.InputErrorAction.REMOVE_ALL,
      },
      {
        type: types.CategoryAction.EDIT_END,
      },
      {
        type: types.CategoryAction.UPDATE,
        category: updatedCategoryMock,
      },
      {
        type: types.MessageAction.SHOW_MESSAGE,
        message: NotificationMessage.CHANGES_UPDATED_SUCCESSFULLY,
      },
    ];

    const store = mockStore({
      categoryList: {
        [categoryToUpdate.id]: categoryToUpdate,
      },
      categoryEdit: {
        id: updatedCategoryMock.id,
        name: updatedCategoryMock.name,
      },
    });

    return store.dispatch(actions.updateCategoryAsync(categoryToUpdate.id))
      .then(() => {
        expect(store.getActions())
          .toEqual(expectedActions);
      });
  });

  it('creates some actions when updating a categories email with an invalid email', () => {
    const updatedCategoryMock = {
      id: 'someId',
      name: 'New Category Name',
      authentication_identity: 'newTest@mail@.com',
    };
    const categoryToUpdate = {
      id: 'someId',
      name: 'Old Category Name',
      authentication_identity: 'oldTest@mail.com',
    };

    const expectedActions = [
      {
        type: types.MessageAction.SHOW_MESSAGE,
        message: PromptMessage.ENTER_VALID_EMAIL,
      },
      {
        type: types.InputErrorAction.ADD,
        field: Variable.AUTHENTICATION_IDENTITY,
      },
    ];

    const store = mockStore({
      categoryList: {
        [categoryToUpdate.id]: categoryToUpdate,
      },
      categoryEdit: {
        authentication_identity: updatedCategoryMock.authentication_identity,
      },
    });

    store.dispatch(actions.updateCategoryAsync(categoryToUpdate.id));
    expect(store.getActions())
      .toEqual(expectedActions);
  });

  it('creates INFO_MESSAGE when updating a category was NOT successful', () => {
    const categoryToUpdate = {
      id: 'someId',
      name: 'Old Category Name',
      authentication_identity: 'oldTest@mail.com',
    };

    nock(peopleApiClient.basePath)
      .put(`/people/${categoryToUpdate.id}`)
      .reply(404);

    const expectedActions = [
      {
        type: types.MessageAction.SHOW_MESSAGE,
        message: ErrorMessage.FAILED_TO_UPDATE_CATEGORY,
      },
    ];

    const store = mockStore({
      categoryList: {
        [categoryToUpdate.id]: categoryToUpdate,
      },
      categoryEdit: categoryToUpdate,
    });

    return store.dispatch(actions.updateCategoryAsync(categoryToUpdate.id))
      .then(() => {
        expect(store.getActions())
          .toEqual(expectedActions);
      });
  });

  it('creates ERROR_REMOVE_ALL and EDIT_END when nothing was changed while editing a category', () => {
    const categoryToUpdate = {
      id: 'someId',
      name: 'Old Category Name',
      authentication_identity: 'oldTest@mail.com',
    };

    const expectedActions = [
      {
        type: types.InputErrorAction.REMOVE_ALL,
      },
      {
        type: types.CategoryAction.EDIT_END,
      },
    ];

    const store = mockStore({
      categoryList: {
        [categoryToUpdate.id]: categoryToUpdate,
      },
      categoryEdit: {},
    });

    store.dispatch(actions.updateCategoryAsync(categoryToUpdate.id));
    expect(store.getActions())
      .toEqual(expectedActions);
  });

  it('creates ADD_EMPTY_ROW and EDIT_START when starting to create a category', () => {
    const expectedActions = [
      {
        type: types.CategoryAction.ADD_EMPTY_ROW,
      },
      {
        type: types.CategoryAction.EDIT_START,
        id: getCategoryToBeCreated().id,
      },
    ];

    const store = mockStore({
      categoryEdit: {
        editing: false,
      },
    });

    store.dispatch(actions.startOrEndCreateCategory());
    expect(store.getActions())
      .toEqual(expectedActions);
  });

  it('creates some actions when stopping to create a category from fab button', () => {
    const expectedActions = [
      {
        type: types.CategoryAction.REMOVE_EMPTY_ROW,
      },
      {
        type: types.CategoryAction.EDIT_END,
      },
      {
        type: types.InputErrorAction.REMOVE_ALL,
      },
      {
        type: types.MessageAction.SHOW_MESSAGE,
        message: NotificationMessage.CHANGES_DISCARDED,
      },
    ];

    const store = mockStore({
      categoryEdit: {
        editing: true,
      },
    });

    store.dispatch(actions.startOrEndCreateCategory());
    expect(store.getActions())
      .toEqual(expectedActions);
  });

  it('creates CATEGORY_EDIT_START when categoryId equals the categoryToBeCreatedId', () => {
    const expectedActions = [
      {
        type: types.CategoryAction.EDIT_START,
        id: getCategoryToBeCreated().id,
      },
    ];

    const store = mockStore({
      categoryEdit: {},
    });

    store.dispatch(actions.editUpdateOrCreateCategory(getCategoryToBeCreated().id));
    expect(store.getActions())
      .toEqual(expectedActions);
  });

  it('creates some actions when creating a category is aborted to edit another category', () => {
    const anotherCategoryId = 'anotherCategoryId';

    const expectedActions = [
      {
        type: types.MessageAction.SHOW_MESSAGE,
        message: NotificationMessage.CHANGES_DISCARDED,
      },
      {
        type: types.InputErrorAction.REMOVE_ALL,
      },
      {
        type: types.CategoryAction.REMOVE_EMPTY_ROW,
      },
      {
        type: types.CategoryAction.EDIT_END,
      },
      {
        type: types.CategoryAction.EDIT_START,
        id: anotherCategoryId,
      },
    ];

    const store = mockStore({
      categoryEdit: getCategoryToBeCreated(),
    });

    store.dispatch(actions.editUpdateOrCreateCategory(anotherCategoryId));
    expect(store.getActions())
      .toEqual(expectedActions);
  });

  it('creates some actions when a category is updated', () => {
    const updatedCategoryMock = {
      id: 'someId',
      name: 'New Category Name',
      authentication_identity: 'newTest@mail.com',
    };
    const categoryToUpdate = {
      id: 'someId',
      name: 'Old Category Name',
      authentication_identity: 'oldTest@mail.com',
    };

    nock(peopleApiClient.basePath)
      .put(`/people/${categoryToUpdate.id}`)
      .reply(200, updatedCategoryMock);

    const expectedActions = [
      {
        type: types.InputErrorAction.REMOVE_ALL,
      },
      {
        type: types.CategoryAction.EDIT_END,
      },
      {
        type: types.CategoryAction.UPDATE,
        category: updatedCategoryMock,
      },
      {
        type: types.MessageAction.SHOW_MESSAGE,
        message: NotificationMessage.CHANGES_UPDATED_SUCCESSFULLY,
      },
    ];

    const store = mockStore({
      categoryList: {
        [categoryToUpdate.id]: categoryToUpdate,
      },
      categoryEdit: categoryToUpdate,
    });


    return store.dispatch(actions.editUpdateOrCreateCategory(categoryToUpdate.id))
      .then(() => {
        expect(store.getActions())
          .toEqual(expectedActions);
      });
  });

  it('creates some actions when creating a category was successful', () => {
    const createCategoryMock = {
      id: getCategoryToBeCreated().id,
      name: 'someName',
      authentication_identity: 'someValid@email.com',
    };

    nock(peopleApiClient.basePath)
      .post('/people')
      .reply(200, createCategoryMock);

    const expectedActions = [
      {
        type: types.InputErrorAction.REMOVE_ALL,
      },
      {
        type: types.CategoryAction.REMOVE_EMPTY_ROW,
      },
      {
        type: types.CategoryAction.EDIT_END,
      },
      {
        type: types.CategoryAction.ADD_CATEGORY,
        category: createCategoryMock,
      },
      {
        type: types.MessageAction.SHOW_MESSAGE,
        message: createCategoryMock.name + NotificationMessage.CATEGORY_CREATED_SUCCESSFULLY,
      },
    ];

    const store = mockStore({ categoryEdit: createCategoryMock });

    return store.dispatch(actions.editUpdateOrCreateCategory(createCategoryMock.id))
      .then(() => {
        expect(store.getActions())
          .toEqual(expectedActions);
      });
  });

  it('creates some actions when stopping to create a category from clear button', () => {
    const categoryToBeStoppedCreating = getCategoryToBeCreated();

    const expectedActions = [
      {
        type: types.CategoryAction.REMOVE_EMPTY_ROW,
      },
      {
        type: types.CategoryAction.EDIT_END,
      },
      {
        type: types.InputErrorAction.REMOVE_ALL,
      },
      {
        type: types.MessageAction.SHOW_MESSAGE,
        message: NotificationMessage.CHANGES_DISCARDED,
      },
    ];

    const store = mockStore({
      categoryEdit: categoryToBeStoppedCreating,
    });

    store.dispatch(actions.clearOrShowDelete([categoryToBeStoppedCreating.id]));
    expect(store.getActions())
      .toEqual(expectedActions);
  });

  it('creates some actions when stopping to edit a category from clear button', () => {
    const categoryToBeStoppedEditing = {
      id: 'someEditCategoryId',
      name: 'someName',
      authentication_identity: 'some@email.com',
    };

    const expectedActions = [
      {
        type: types.CategoryAction.EDIT_END,
      },
      {
        type: types.InputErrorAction.REMOVE_ALL,
      },
      {
        type: types.MessageAction.SHOW_MESSAGE,
        message: NotificationMessage.CHANGES_DISCARDED,
      },
    ];

    const store = mockStore({
      categoryEdit: categoryToBeStoppedEditing,
    });

    store.dispatch(actions.clearOrShowDelete([categoryToBeStoppedEditing.id]));
    expect(store.getActions())
      .toEqual(expectedActions);
  });

  it('creates some actions when deleting a category from delete button', () => {
    const categoryToBeDeleted = {
      id: 'someIdToDelete',
      name: 'someCategoryName',
      authentication_identity: 'some@email.com',
    };

    const expectedActions = [
      {
        type: types.DeleteAction.SHOW_DIALOG,
        categoryIds: [categoryToBeDeleted.id],
        open: true,
      },
    ];

    const store = mockStore({
      categoryList: {
        [categoryToBeDeleted.id]: categoryToBeDeleted,
      },
      categoryEdit: {
        id: 'someOtherId',
      },
    });

    store.dispatch(actions.clearOrShowDelete([categoryToBeDeleted.id]));
    expect(store.getActions())
      .toEqual(expectedActions);
  });
});
