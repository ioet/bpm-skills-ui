/* eslint-disable react/display-name */
import React from 'react';
import PropTypes from 'prop-types';
import MUIDataTable from 'mui-datatables';
import withStyles from '@material-ui/core/styles/withStyles';
import IconButton from '@material-ui/core/IconButton';
import { Delete } from '@material-ui/icons';
import { SkillListConst } from '../../../constants';
import { SkillListStyles } from '../../../styles';
import { getSkillObjectFromArray } from '../../utils/Utils';
import MyTableCellContainer from '../../bpm-table-cell/MyTableCellContainer';
import BpmDeleteButtonContainer from '../../buttons/BpmDeleteButtonContainer';
import BpmEditButtonContainer from '../../buttons/BpmEditButtonContainer';

const SkillList = (props) => {
  const {
    classes, skillList, onRemoveSkills,
  } = props;

  const columns = [
    {
      name: SkillListConst.COLUMN_ID,
      options: {
        display: 'excluded',
        filter: false,
        sort: false,
        download: false,
      },
    },
    {
      name: SkillListConst.COLUMN_NAME,
      options: {
        customBodyRender: (value, tableMeta) => {
          const skill = getSkillObjectFromArray(tableMeta.rowData);
          return (
            <MyTableCellContainer skillId={skill.id}>
              {value}
            </MyTableCellContainer>
          );
        },
      },
    },
    {
      name: SkillListConst.COLUMN_LABEL,
      options: {
        customBodyRender: (value, tableMeta) => {
          const skill = getSkillObjectFromArray(tableMeta.rowData);
          return (
            <MyTableCellContainer skillId={skill.id}>
              {value}
            </MyTableCellContainer>
          );
        },
      },
    },
    {
      name: SkillListConst.COLUMN_CATEGORY,
      options: {
        customBodyRender: (value, tableMeta) => {
          const skill = getSkillObjectFromArray(tableMeta.rowData);
          return (
            <MyTableCellContainer skillId={skill.id}>
              {value}
            </MyTableCellContainer>
          );
        },
      },
    },
    {
      name: SkillListConst.COLUMN_BUSINESS_VALUE,
      options: {
        filter: false,
        sort: false,
        download: false,
        customBodyRender: (value, tableMeta) => {
          const skill = getSkillObjectFromArray(tableMeta.rowData);
          return (
            <MyTableCellContainer skillId={skill.id}>
              {value}
            </MyTableCellContainer>
          );
        },
      },
    },
    {
      name: SkillListConst.COLUMN_PREDICTIVE_VALUE,
      options: {
        filter: false,
        sort: false,
        download: false,
        customBodyRender: (value, tableMeta) => {
          const skill = getSkillObjectFromArray(tableMeta.rowData);
          return (
            <MyTableCellContainer skillId={skill.id}>
              {value}
            </MyTableCellContainer>
          );
        },
      },
    },
    {
      name: SkillListConst.COLUMN_EDIT,
      options: {
        filter: false,
        sort: false,
        download: false,
        customBodyRender: (value, tableMeta) => {
          const skill = getSkillObjectFromArray(tableMeta.rowData);
          return (
            <MyTableCellContainer skillId={skill.id}>
              <BpmEditButtonContainer
                itemId={skill.id}
              />
            </MyTableCellContainer>
          );
        },
      },
    },
    {
      name: SkillListConst.COLUMN_DELETE,
      options: {
        filter: false,
        sort: false,
        download: false,
        customBodyRender: (value, tableMeta) => {
          const skill = getSkillObjectFromArray(tableMeta.rowData);
          return (
            <MyTableCellContainer skillId={skill.id}>
              <BpmDeleteButtonContainer
                itemId={skill.id}
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
    resizableColumns: false,
    selectableRows: true,
    print: false,
    rowsPerPageOptions: [10, 15, 25],
    customToolbarSelect: selected => (
      <IconButton
        onClick={(e) => {
          e.preventDefault();
          const selectedSkillIds = selected.data.map(u => skillList[u.dataIndex][0]);
          onRemoveSkills(selectedSkillIds);
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
        data={skillList}
        columns={columns}
        options={options}
      />
    </div>
  );
};

SkillList.propTypes = {
  classes: PropTypes.object.isRequired,
  skillList: PropTypes.objectOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    category: PropTypes.string,
    business_value: PropTypes.number.isRequired,
    predictive_value: PropTypes.number.isRequired,
  })).isRequired,
  onRemoveSkills: PropTypes.func.isRequired,
};

export default withStyles(SkillListStyles)(SkillList);
