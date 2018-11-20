/* eslint-disable react/display-name */
import React from 'react';
import PropTypes from 'prop-types';
import MUIDataTable from 'mui-datatables';
import withStyles from '@material-ui/core/styles/withStyles';
import IconButton from '@material-ui/core/IconButton';
import { Delete } from '@material-ui/icons';
import { CategoryListConst, CategoryListItemConst, Variable } from '../../constants';
import { CategoryListStyles } from '../../styles';
import EditOrPlainTextContainer from '../container/EditOrPlainTextContainer';
import { compareCategoriesByFirstName, getCategoryObjectFromArray } from '../utils/Utils';
import MyTableCellContainer from '../container/MyTableCellContainer';
import MyEditButtonContainer from '../container/MyEditButtonContainer';
import MyDeleteButtonContainer from '../container/MyDeleteButtonContainer';

const CategoryList = (props) => {
  const {
    classes, categoryList, onRemoveCategories,
  } = props;

  const data = [];
  Object.keys(categoryList).forEach((key) => {
    const category = categoryList[key];
    data.push([category.id, category.name, category.business_value, category.predictive_value, false, false]);
    // data.push([category.id, category.name, '2', '2', false, false]);
  });
  data.sort(compareCategoriesByFirstName);

  const columns = [
    {
      name: CategoryListConst.COLUMN_0,
      options: {
        display: 'excluded',
        filter: false,
        sort: false,
        download: false,
      },
    },
    {
      name: CategoryListConst.COLUMN_1,
      options: {
        customBodyRender: (value, tableMeta) => {
          const category = getCategoryObjectFromArray(tableMeta.rowData);
          return (
            <MyTableCellContainer categoryId={category.id}>
              <EditOrPlainTextContainer
                categoryId={category.id}
                value={value}
                name={Variable.NAME}
                label={CategoryListItemConst.EDIT_CATEGORY_NAME}
              />
            </MyTableCellContainer>
          );
        },
      },
    },
    {
      name: CategoryListConst.COLUMN_2,
      options: {
        customBodyRender: (value, tableMeta) => {
          const category = getCategoryObjectFromArray(tableMeta.rowData);
          return (
            <MyTableCellContainer categoryId={category.id}>
              <EditOrPlainTextContainer
                categoryId={category.id}
                value={value}
                name={Variable.BUSINESS_VALUE}
                label={CategoryListItemConst.EDIT_BUSINESS_VALUE}
              />
            </MyTableCellContainer>
          );
        },
      },
    },
    {
      name: CategoryListConst.COLUMN_3,
      options: {
        filter: false,
        sort: false,
        download: false,
        customBodyRender: (value, tableMeta) => {
          const category = getCategoryObjectFromArray(tableMeta.rowData);
          return (
            <MyTableCellContainer categoryId={category.id}>
              <EditOrPlainTextContainer
                categoryId={category.id}
                value={value}
                name={Variable.PREDICTIVE_VALUE}
                label={CategoryListItemConst.EDIT_PREDICTIVE_VALUE}
              />
            </MyTableCellContainer>
          );
        },
      },
    },
    {
      name: CategoryListConst.COLUMN_4,
      options: {
        filter: false,
        sort: false,
        download: false,
        customBodyRender: (value, tableMeta) => {
          const category = getCategoryObjectFromArray(tableMeta.rowData);
          return (
            <MyTableCellContainer categoryId={category.id}>
              <MyEditButtonContainer
                categoryId={category.id}
              />
            </MyTableCellContainer>
          );
        },
      },
    },
    {
      name: CategoryListConst.COLUMN_5,
      options: {
        filter: false,
        sort: false,
        download: false,
        customBodyRender: (value, tableMeta) => {
          const category = getCategoryObjectFromArray(tableMeta.rowData);
          return (
            <MyTableCellContainer categoryId={category.id}>
              <MyDeleteButtonContainer
                categoryId={category.id}
              />
            </MyTableCellContainer>
          );
        },
      },
    },
  ];
  const options = {
    filterType: 'dropdown',
    responsive: 'scroll',
    resizableColumns: true,
    selectableRows: true,
    print: false,
    rowsPerPageOptions: [10, 15, 25],
    customToolbarSelect: selected => (
      <IconButton
        onClick={(e) => {
          e.preventDefault();
          const selectedCategoryIds = selected.data.map(u => data[u.dataIndex][0]);
          onRemoveCategories(selectedCategoryIds);
        }}
        className={classes.iconButton}
      >
        <Delete />
      </IconButton>
    ),
  };

  return (
    <div className={classes.root}>
      <MUIDataTable
        data={data}
        columns={columns}
        options={options}
      />
    </div>
  );
};

CategoryList.propTypes = {
  classes: PropTypes.object.isRequired,
  categoryList: PropTypes.objectOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    business_value: PropTypes.string.isRequired,
    predictive_value: PropTypes.string.isRequired,
  })).isRequired,
  onRemoveCategories: PropTypes.func.isRequired,
};

export default withStyles(CategoryListStyles)(CategoryList);
