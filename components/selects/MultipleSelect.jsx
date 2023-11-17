import React, { useEffect, useState } from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import ListItemText from "@material-ui/core/ListItemText";
import Select from "@material-ui/core/Select";
import Checkbox from "@material-ui/core/Checkbox";
import Chip from "@material-ui/core/Chip";
import { ErrorMessage } from "formik";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
    width: "100%",
  },
  chips: {
    display: "flex",
    flexWrap: "wrap",
  },
  chip: {
    margin: 2,
  },
}));

export default function MultipleSelect({
  data,
  handleChange,
  value = [],
  name,
  header,
  disabled,
  error,
  touched,
}) {
  const classes = useStyles();
  const theme = useTheme();

  const result = data.reduce(
    (obj, cur) => ({ ...obj, [cur._id]: cur.name }),
    {}
  );

  const isDisabled = disabled === true || disabled === "true";

  return (
    <div>
      <div>
        <div>{header}</div>
        <span>
          {error && touched && (
            <div>
              <span></span>
              <ErrorMessage name={name} />
            </div>
          )}
        </span>
      </div>
      <FormControl className={classes.formControl}>
        <InputLabel id="demo-multiple-checkbox-label">{header}</InputLabel>
        <Select
          labelId="demo-multiple-checkbox-label"
          id="demo-multiple-checkbox"
          multiple
          value={value}
          onChange={handleChange}
          name={name}
          disabled={isDisabled}
          input={<Input id="select-multiple-chip" />}
          renderValue={(selected) => (
            <div className={classes.chips}>
              {selected.length === 0 ? (
                <span className={classes.noSelection}>No selection</span>
              ) : (
                selected.map((val) => (
                  <Chip
                    key={val}
                    label={data.find((option) => option._id === val)?.name}
                    className={classes.chip}
                  />
                ))
              )}
            </div>
          )}
        >
          {data.length === 0 ? (
            <MenuItem disabled>No options available</MenuItem>
          ) : (
            data.map((option) => (
              <MenuItem key={option._id} value={option._id}>
                <Checkbox checked={value.indexOf(option._id) > -1} />
                <span>{option.name}</span>
              </MenuItem>
            ))
          )}
        </Select>
      </FormControl>
    </div>
  );
};

 