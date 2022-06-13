import React, { useState } from 'react'
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { customStyles, selectStyles } from "./styles"
/* import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  OutlinedInput as MuiOutlinedInput,
} from "@material-ui/core"; */
/* import { makeStyles, withStyles } from '@material-ui/core/styles';


const useStyles = makeStyles({
  select: {
      '&:before': {
          borderColor: 'rgba(232, 230, 227, 0.87)',
      },
      '&:after': {
          borderColor: 'rgba(232, 230, 227, 0.87)',
      },
      '&:not(.Mui-disabled):hover::before': {
          borderColor: 'rgba(232, 230, 227, 0.87)',
      }
  },
  icon: {
      fill: 'rgba(232, 230, 227, 0.87)',
  },
  root: {
      color: 'rgba(232, 230, 227, 0.87)',
  },
}) */

/* const OutlinedInput = withStyles((theme) => ({
  notchedOutline: {
    borderColor: "rgb(169, 161, 150) !important",
  },
}))(MuiOutlinedInput);

const useStyles = makeStyles((theme) => ({
  root: {
    width: '15%'
  },
  select: {
    color: "rgb(169, 161, 150)",
  },
  icon: { color: "rgb(169, 161, 150)" },
  label: { color: "rgb(169, 161, 150)" },
})); */

function PageSizeSelector({ setPerPage, setAutoRefresh }) {
    const [size, setSize] = useState('')

    const handleChange = (event) => {
      setSize(event.target.value)
      setPerPage(event.target.value)
      setAutoRefresh(true)
    };

    // const classes = useStyles()

    return (
      <div id="results-size-container">
        <div id="results-size">
          <FormControl size='small' color='success' sx={customStyles}>
            <InputLabel id="simple-select-label">Results per page</InputLabel>
            <Select
              labelId="simple-select-label"
              id="simple-select"
              value={size}
              label="Results per page"
              onChange={handleChange}
              sx={selectStyles}
            >
              <MenuItem value={10}>10</MenuItem>
              <MenuItem value={30}>30</MenuItem>
              <MenuItem value={50}>50</MenuItem>
            </Select>
          </FormControl>
        </div>
      </div>
    );


















    
    /* return (
      <div id="results-size-container">
        <div id="results-size">
          <FormControl size='small' color='success' className={classes.root}>
            <InputLabel id="simple-select-label" className={classes.label}>Results per page</InputLabel>
            <Select
              labelId="simple-select-label"
              classes={{
                select: classes.select,
                icon: classes.icon,
              }}
              input={<OutlinedInput label="Results per page" />}
              id="simple-select"
              value={size}
              label="Results per page"
              onChange={handleChange}
            >
              <MenuItem value={10}>10</MenuItem>
              <MenuItem value={30}>30</MenuItem>
              <MenuItem value={50}>50</MenuItem>
            </Select>
          </FormControl> */
          {/* <div style={{width: '10%', height: '80%', border: '1px solid rgb(186, 178, 178)'}}>
                'Results per page'
              </div> */}
/*         </div>
      </div>
    ); */
}

export default PageSizeSelector