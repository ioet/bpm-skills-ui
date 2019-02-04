/* eslint-disable react/display-name */
import React from 'react';
import PropTypes from 'prop-types';
import MUIDataTable from 'mui-datatables';
import withStyles from '@material-ui/core/styles/withStyles';
import IconButton from '@material-ui/core/IconButton';
import { Delete } from '@material-ui/icons';
import { CategoryListStyles } from './CategoryListStyles';
import BpmTableCellContainer from '../../bpm-table-cell/BpmTableCellContainer';
import BpmDeleteButtonContainer from '../../bpm-buttons/BpmDeleteButtonContainer';
import { CategoryListConst } from './CategoryListConstants';
import BpmEditButtonContainer from '../../bpm-buttons/BpmEditButtonContainer';
import { editCategory } from '../edit/EditCategoryActions';

const CategoryList = (props) => {
  const {
    classes, categoryList, onRemoveCategories,
  } = props;

  const columns = [
    {
      name: CategoryListConst.COLUMN_ID,
      options: {
        display: 'excluded',
        filter: false,
        sort: false,
        download: false,
      },
    },
    {
      name: CategoryListConst.COLUMN_NAME,
      options: {
        customBodyRender: (value, tableMeta) => (
          <BpmTableCellContainer itemId={tableMeta.rowData[0]}>
            {value}
          </BpmTableCellContainer>
        ),
      },
    },
    {
      name: CategoryListConst.COLUMN_BUSINESS_VALUE,
      options: {
        filter: false,
        sort: false,
        download: false,
        customBodyRender: (value, tableMeta) => (
          <BpmTableCellContainer itemId={tableMeta.rowData[0]}>
            {value}
          </BpmTableCellContainer>
        ),
      },
    },
    {
      name: CategoryListConst.COLUMN_PREDICTIVE_VALUE,
      options: {
        filter: false,
        sort: false,
        download: false,
        customBodyRender: (value, tableMeta) => (
          <BpmTableCellContainer itemId={tableMeta.rowData[0]}>
            {value}
          </BpmTableCellContainer>
        ),
      },
    },
    {
      name: CategoryListConst.COLUMN_EDIT,
      options: {
        filter: false,
        sort: false,
        download: false,
        customBodyRender: (value, tableMeta) => {
          const categoryId = tableMeta.rowData[0];
          return (
            <BpmTableCellContainer itemId={categoryId}>
              <BpmEditButtonContainer
                onEdit={editCategory}
                itemId={categoryId}
              />
            </BpmTableCellContainer>
          );
        },
      },
    },
    {
      name: CategoryListConst.COLUMN_DELETE,
      options: {
        filter: false,
        sort: false,
        download: false,
        customBodyRender: (value, tableMeta) => {
          const categoryId = tableMeta.rowData[0];
          return (
            <BpmTableCellContainer itemId={categoryId}>
              <BpmDeleteButtonContainer
                itemId={categoryId}
              />
            </BpmTableCellContainer>
          );
        },
      },
    },
  ];
  const options = {
    filterType: 'dropdown',
    responsive: 'scroll',
    resizableColumns: false,
    selectableRows: true,
    print: false,
    rowsPerPageOptions: [10, 15, 25],
    customToolbarSelect: selected => (
      <IconButton
        onClick={(e) => {
          e.preventDefault();
          const selectedCategoryIds = selected.data.map(u => categoryList[u.dataIndex][0]);
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
        data={categoryList}
        columns={columns}
        options={options}
      />
    </div>
  );
};

CategoryList.propTypes = {
  classes: PropTypes.object.isRequired,
  categoryList: PropTypes.arrayOf(PropTypes.array).isRequired,
  onRemoveCategories: PropTypes.func.isRequired,
};

export default withStyles(CategoryListStyles)(CategoryList);
