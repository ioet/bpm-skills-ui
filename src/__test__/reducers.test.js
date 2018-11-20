import expect from 'expect';
import * as types from '../action-types';
import {
  message, inputError, categoryEdit, categoryDelete, category, categoryList, hover,
} from '../reducers';
import { Variable } from '../constants';
import { getCategoryToBeCreated } from '../component/utils/Utils';

describe('message reducer', () => {
  it('should return the initial state', () => {
    expect(message(undefined, {
      type: types.InitialAction.INITIAL_STATE,
    }))
      .toEqual({
        open: false,
      });
  });

  it('should handle SHOW_INFO_MESSAGE', () => {
    const someTestMessage = 'someTestMessage';
    const showMessageAction = {
      type: types.MessageAction.SHOW_MESSAGE,
      message: someTestMessage,
    };
    expect(message({}, showMessageAction))
      .toEqual({
        message: someTestMessage,
        open: true,
      });
  });

  it('should handle HIDE_INFO_MESSAGE', () => {
    const hideMessageAction = {
      type: types.MessageAction.HIDE_MESSAGE,
    };
    expect(message({}, hideMessageAction))
      .toEqual({
        message: '',
        open: false,
      });
  });
});

describe('inputError reducer', () => {
  it('should return the initial state', () => {
    expect(inputError(undefined, {
      type: types.InitialAction.INITIAL_STATE,
    }))
      .toEqual({});
  });

  it('should handle ERROR_ADD', () => {
    const someField = 'emailField';
    const addErrorAction = {
      type: types.InputErrorAction.ADD,
      field: someField,
    };
    expect(inputError({}, addErrorAction))
      .toEqual({
        [someField]: true,
      });
  });

  it('should handle ERROR_REMOVE_ALL', () => {
    const removeAllErrorsAction = {
      type: types.InputErrorAction.REMOVE_ALL,
    };
    expect(inputError({}, removeAllErrorsAction))
      .toEqual({});
  });
});

describe('categoryEdit reducer', () => {
  it('should return the initial state', () => {
    expect(categoryEdit(undefined, {
      type: types.InitialAction.INITIAL_STATE,
    }))
      .toEqual({
        editing: false,
      });
  });

  it('should handle CATEGORY_EDIT_START', () => {
    const someEditCategoryId = 'someCategoryId';
    const editCategoryStartAction = {
      type: types.CategoryAction.EDIT_START,
      id: someEditCategoryId,
    };
    expect(categoryEdit({}, editCategoryStartAction))
      .toEqual({
        editing: true,
        id: someEditCategoryId,
      });
  });

  it('should handle CATEGORY_EDIT_DATA for name', () => {
    const field = Variable.NAME;
    const someEditCategoryName = 'someName';

    const changeEditCategoryDataAction = {
      type: types.CategoryAction.EDIT_DATA,
      field,
      value: someEditCategoryName,
    };
    expect(categoryEdit({
      editing: true,
    }, changeEditCategoryDataAction))
      .toEqual({
        editing: true,
        [field]: someEditCategoryName,
      });
  });

  it('should handle CATEGORY_EDIT_DATA for email', () => {
    const field = Variable.AUTHENTICATION_IDENTITY;
    const someEditCategoryEmail = 'someEmail';

    const changeEditCategoryDataAction = {
      type: types.CategoryAction.EDIT_DATA,
      field,
      value: someEditCategoryEmail,
    };
    expect(categoryEdit({
      editing: true,
    }, changeEditCategoryDataAction))
      .toEqual({
        editing: true,
        [field]: someEditCategoryEmail,
      });
  });

  it('should handle CATEGORY_EDIT_END', () => {
    const endEditCategoryAction = {
      type: types.CategoryAction.EDIT_END,
    };
    expect(categoryEdit({}, endEditCategoryAction))
      .toEqual({
        editing: false,
        name: null,
        authentication_identity: null,
      });
  });
});

describe('categoryDelete reducer', () => {
  it('should return the initial state', () => {
    expect(categoryDelete(undefined, {
      type: types.InitialAction.INITIAL_STATE,
    }))
      .toEqual({
        open: false,
      });
  });

  it('should handle SHOW_DIALOG', () => {
    const categoryIdsToDelete = ['someCategoryId', 'oneMoreCategoryId'];
    const showDeleteDialogAction = {
      type: types.DeleteAction.SHOW_DIALOG,
      categoryIds: categoryIdsToDelete,
    };
    expect(categoryDelete({}, showDeleteDialogAction))
      .toEqual({
        open: true,
        categoryIds: categoryIdsToDelete,
      });
  });

  it('should handle HIDE_DIALOG', () => {
    const hideDeleteDialogAction = {
      type: types.DeleteAction.HIDE_DIALOG,
    };
    expect(categoryDelete({}, hideDeleteDialogAction))
      .toEqual({
        open: false,
      });
  });
});

describe('category reducer', () => {
  it('should return the initial state', () => {
    expect(category(undefined, {
      type: types.InitialAction.INITIAL_STATE,
    }))
      .toEqual({});
  });
});

describe('categoryList reducer', () => {
  it('should return the initial state', () => {
    expect(categoryList(undefined, {
      type: types.InitialAction.INITIAL_STATE,
    }))
      .toEqual({});
  });

  it('should handle ADD_EMPTY_ROW', () => {
    const someCategory = getCategoryToBeCreated();
    const addEmptyRowAction = {
      type: types.CategoryAction.ADD_EMPTY_ROW,
    };
    expect(categoryList({}, addEmptyRowAction))
      .toEqual({
        [someCategory.id]: someCategory,
      });
  });

  it('should handle REMOVE_EMPTY_ROW', () => {
    const someCategory = getCategoryToBeCreated();
    const removeEmptyRowAction = {
      type: types.CategoryAction.REMOVE_EMPTY_ROW,
    };
    expect(categoryList({
      [someCategory.id]: someCategory,
    }, removeEmptyRowAction))
      .toEqual({});
  });

  it('should handle CATEGORY_ADD_CATEGORY', () => {
    const someCategory = {
      id: 'someId',
      name: 'someName',
      authentication_identity: 'some@email.com',
    };
    const addOneCategoryAction = {
      type: types.CategoryAction.ADD_CATEGORY,
      category: someCategory,
    };
    expect(categoryList({}, addOneCategoryAction))
      .toEqual({
        [someCategory.id]: someCategory,
      });
  });

  it('should handle CATEGORY_ADD_CATEGORIES', () => {
    const someCategory = {
      id: 'someId',
      name: 'someName',
      authentication_identity: 'some@email.com',
    };
    const someOtherCategory = {
      id: 'someOtherId',
      name: 'someOtherName',
      authentication_identity: 'someOther@email.com',
    };
    const addMultipleCategorysAction = {
      type: types.CategoryAction.ADD_CATEGORIES,
      category: [someCategory, someOtherCategory],
    };
    expect(categoryList({}, addMultipleCategorysAction))
      .toEqual({
        [someCategory.id]: someCategory,
        [someOtherCategory.id]: someOtherCategory,
      });
  });

  it('should handle CATEGORY_UPDATE', () => {
    const someCategory = {
      id: 'someId',
      name: 'someName',
      authentication_identity: 'some@email.com',
    };
    const someCategoryUpdated = {
      id: 'someId',
      name: 'someUpdatedName',
      authentication_identity: 'someUpdated@email.com',
    };
    const updateCategoryAction = {
      type: types.CategoryAction.UPDATE,
      category: someCategoryUpdated,
    };
    expect(categoryList({
      [someCategory.id]: someCategory,
    }, updateCategoryAction))
      .toEqual({
        [someCategory.id]: someCategoryUpdated,
      });
  });

  it('should handle CATEGORY_REMOVE', () => {
    const someCategoryToBeRemoved = {
      id: 'someId',
      name: 'someName',
      authentication_identity: 'some@email.com',
    };
    const removeCategoryAction = {
      type: types.CategoryAction.REMOVE,
      categoryId: someCategoryToBeRemoved.id,
    };
    expect(categoryList({
      [someCategoryToBeRemoved.id]: someCategoryToBeRemoved,
    }, removeCategoryAction))
      .toEqual({});
  });
});

describe('hover reducer', () => {
  it('should return the initial state', () => {
    expect(hover(undefined, {
      type: types.InitialAction.INITIAL_STATE,
    }))
      .toEqual({
        hover: false,
      });
  });

  it('should handle HOVER_OVER', () => {
    const hoverId = 'someId';
    const hoverOverAction = {
      type: types.HoverAction.OVER,
      id: hoverId,
    };
    expect(hover({}, hoverOverAction))
      .toEqual({
        hover: true,
        id: hoverId,
      });
  });

  it('should handle HOVER_OUT', () => {
    const hoverOutAction = {
      type: types.HoverAction.OUT,
    };
    expect(hover({}, hoverOutAction))
      .toEqual({
        hover: false,
      });
  });
});
