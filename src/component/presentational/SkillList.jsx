/* eslint-disable react/display-name */
import React from 'react';
import PropTypes from 'prop-types';
import MUIDataTable from 'mui-datatables';
import withStyles from '@material-ui/core/styles/withStyles';
import IconButton from '@material-ui/core/IconButton';
import { Delete } from '@material-ui/icons';
import { SkillListConst, SkillListItemConst, Variable } from '../../constants';
import { SkillListStyles } from '../../styles';
import EditOrPlainTextContainer from '../container/EditOrPlainTextContainer';
import { compareSkillsByFirstName, getSkillObjectFromArray } from '../utils/Utils';
import MyTableCellContainer from '../container/MyTableCellContainer';
import MyEditButtonContainer from '../container/MyEditButtonContainer';
import MyDeleteButtonContainer from '../container/MyDeleteButtonContainer';

const SkillList = (props) => {
  const {
    classes, skillList, onRemoveSkills,
  } = props;

  const data = [];
  Object.keys(skillList).forEach((key) => {
    const skill = skillList[key];
    // data.push([skill.id, skill.name, skill.business_value, skill.predictive_value, false, false]);
    data.push([skill.id, skill.name, skill.category_id, skill.business_value, skill.predictive_value, false, false]);
  });
  data.sort(compareSkillsByFirstName);

  const columns = [
    {
      name: SkillListConst.COLUMN_0,
      options: {
        display: 'excluded',
        filter: false,
        sort: false,
        download: false,
      },
    },
    {
      name: SkillListConst.COLUMN_1,
      options: {
        customBodyRender: (value, tableMeta) => {
          const skill = getSkillObjectFromArray(tableMeta.rowData);
          return (
            <MyTableCellContainer skillId={skill.id}>
              <EditOrPlainTextContainer
                skillId={skill.id}
                value={value}
                name={Variable.NAME}
                label={SkillListItemConst.EDIT_NAME}
              />
            </MyTableCellContainer>
          );
        },
      },
    },
    {
      name: SkillListConst.COLUMN_2,
      options: {
        customBodyRender: (value, tableMeta) => {
          const skill = getSkillObjectFromArray(tableMeta.rowData);
          return (
              <MyTableCellContainer skillId={skill.id}>
                <EditOrPlainTextContainer
                    skillId={skill.id}
                    value={value}
                    name={Variable.NAME}
                    label={SkillListItemConst.EDIT_NAME}
                />
              </MyTableCellContainer>
          );
        },
      },
    },
    {
      name: SkillListConst.COLUMN_3,
      options: {
        filter: false,
        sort: false,
        download: false,
        customBodyRender: (value, tableMeta) => {
          const skill = getSkillObjectFromArray(tableMeta.rowData);
          return (
              <MyTableCellContainer skillId={skill.id}>
                <EditOrPlainTextContainer
                    skillId={skill.id}
                    value={value}
                    name={Variable.NAME}
                    label={SkillListItemConst.EDIT_BUSINESS_VALUE}
                />
              </MyTableCellContainer>
          );
        },
      },
    },
    {
      name: SkillListConst.COLUMN_4,
      options: {
        filter: false,
        sort: false,
        download: false,
        customBodyRender: (value, tableMeta) => {
          const skill = getSkillObjectFromArray(tableMeta.rowData);
          return (
            <MyTableCellContainer skillId={skill.id}>
              <EditOrPlainTextContainer
                  skillId={skill.id}
                  value={value}
                  name={Variable.NAME}
                  label={SkillListItemConst.EDIT_PREDICTIVE_VALUE}
              />
            </MyTableCellContainer>
          );
        },
      },
    },
    {
      name: SkillListConst.COLUMN_5,
      options: {
        filter: false,
        sort: false,
        download: false,
        customBodyRender: (value, tableMeta) => {
          const skill = getSkillObjectFromArray(tableMeta.rowData);
          return (
            <MyTableCellContainer skillId={skill.id}>
              <MyEditButtonContainer
                skillId={skill.id}
              />
            </MyTableCellContainer>
          );
        },
      },
    },
    {
      name: SkillListConst.COLUMN_6,
      options: {
        filter: false,
        sort: false,
        download: false,
        customBodyRender: (value, tableMeta) => {
          const skill = getSkillObjectFromArray(tableMeta.rowData);
          return (
              <MyTableCellContainer skillId={skill.id}>
                <MyDeleteButtonContainer
                    skillId={skill.id}
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
          const selectedSkillIds = selected.data.map(u => data[u.dataIndex][0]);
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
        data={data}
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
    category: PropTypes.string.isRequired,
    business_value: PropTypes.number.isRequired,
    predictive_value: PropTypes.number.isRequired,
  })).isRequired,
  onRemoveSkills: PropTypes.func.isRequired,
};

export default withStyles(SkillListStyles)(SkillList);
