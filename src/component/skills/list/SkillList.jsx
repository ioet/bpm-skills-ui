/* eslint-disable react/display-name */
import React from 'react';
import PropTypes from 'prop-types';
import MUIDataTable from 'mui-datatables';
import withStyles from '@material-ui/core/styles/withStyles';
import IconButton from '@material-ui/core/IconButton';
import { Delete } from '@material-ui/icons';
import BpmTableCellContainer from '../../bpm-table-cell/BpmTableCellContainer';
import BpmEditButtonContainer from '../../bpm-buttons/BpmEditButtonContainer';
import { SkillListConst } from './SkillListConstants';
import { SkillListStyles } from './SkillListStyles';
import BpmDeleteButtonContainer from '../../bpm-buttons/BpmDeleteButtonContainer';
import { editSkill } from '../edit/EditSkillActions';

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
        customBodyRender: (value, tableMeta) => (
          <BpmTableCellContainer itemId={tableMeta.rowData[0]}>
            {value}
          </BpmTableCellContainer>
        ),
      },
    },
    {
      name: SkillListConst.COLUMN_LABEL,
      options: {
        customBodyRender: (value, tableMeta) => (
          <BpmTableCellContainer itemId={tableMeta.rowData[0]}>
            {value}
          </BpmTableCellContainer>
        ),
      },
    },
    {
      name: SkillListConst.COLUMN_CATEGORY,
      options: {
        customBodyRender: (value, tableMeta) => (
          <BpmTableCellContainer itemId={tableMeta.rowData[0]}>
            {value}
          </BpmTableCellContainer>
        ),
      },
    },
    {
      name: SkillListConst.COLUMN_BUSINESS_VALUE,
      options: {
        customBodyRender: (value, tableMeta) => (
          <BpmTableCellContainer itemId={tableMeta.rowData[0]}>
            {value}
          </BpmTableCellContainer>
        ),
      },
    },
    {
      name: SkillListConst.COLUMN_PREDICTIVE_VALUE,
      options: {
        customBodyRender: (value, tableMeta) => (
          <BpmTableCellContainer itemId={tableMeta.rowData[0]}>
            {value}
          </BpmTableCellContainer>
        ),
      },
    },
    {
      name: SkillListConst.COLUMN_EDIT,
      options: {
        filter: false,
        sort: false,
        download: false,
        customBodyRender: (value, tableMeta) => {
          const skillId = tableMeta.rowData[0];
          return (
            <BpmTableCellContainer itemId={skillId}>
              <BpmEditButtonContainer
                onEdit={editSkill}
                itemId={skillId}
              />
            </BpmTableCellContainer>
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
          const skillId = tableMeta.rowData[0];
          return (
            <BpmTableCellContainer itemId={skillId}>
              <BpmDeleteButtonContainer
                itemId={skillId}
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
  skillList: PropTypes.arrayOf(PropTypes.array).isRequired,
  onRemoveSkills: PropTypes.func.isRequired,
};

export default withStyles(SkillListStyles)(SkillList);
