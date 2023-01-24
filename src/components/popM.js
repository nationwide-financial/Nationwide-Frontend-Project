import React from 'react'
import {
  createStyles,
  makeStyles,
} from '@material-ui/core/styles'
import Input from '@material-ui/core/Input'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import FormControl from '@material-ui/core/FormControl'
import ListItemText from '@material-ui/core/ListItemText'
import Select from '@material-ui/core/Select'
import Checkbox from '@material-ui/core/Checkbox'
import Chip from '@material-ui/core/Chip'
import _without from 'lodash/without'
import ControlPointIcon from '@mui/icons-material/ControlPoint'
import { Box, Grid } from '@mui/material'
import CheckIcon from '@mui/icons-material/Check'

function getRandomColor() {
  var letters = '0123456789ABCDEF'
  var color = '#'
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)]
  }
  return color
}

const useStyles = makeStyles((theme) =>
  createStyles({
    redBackground: {
      backgroundColor: '#FFF',
      padding: 10,
    },
    whiteBackground: {
      backgroundColor: '#FFF',
    },
    formControl: {
      margin: theme.spacing(0),
      minWidth: 2,
      maxWidth: 5,
    },
    chips: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    chip: {
      backgroundColor: '#FFF',
      border: '2px solid ',
    },
    noLabel: {
      marginTop: theme.spacing(3),
    },
  })
)

const ITEM_HEIGHT = 48
const ITEM_PADDING_TOP = 8
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
}

const names = [
  'HIGH PRIORITY',
  'PHONE LEAD',
  'STATEMENT1',
  'STATEMENT2',
  'STATEMENT3',
  'STATEMENT4',
  'STATEMENT5',
]

const initialSelected = ['HIGH PRIORITY', 'PHONE LEAD']

const MultipleSelectDemo = () => {
  const classes = useStyles()
  const [personName, setPersonName] = React.useState(initialSelected)

  const handleChange = (event) => {
    setPersonName(event.target.value)
  }

  const handleDelete = (e, value) => {
    e.preventDefault()
    console.log('clicked delete')
    setPersonName((current) => _without(current, value))
  }

  return (
    <div>
      <Grid container xs={12} spacing={1} sx={{ width: 950 }}>
        <Grid item xs={12}>
          {personName.map((value) => (
            <Chip
              style={{ color: getRandomColor() }}
              key={value}
              label={value}
              clickable
              className={classes.chip}
              onDelete={(e) => handleDelete(e, value)}
              onClick={() => console.log('clicked chip')}
            />
          ))}
          <FormControl
            className={classes.formControl}
            style={{ marginLeft: 30 }}
          >
            <Select
              labelId='demo-mutiple-chip-checkbox-label'
              id='demo-mutiple-chip-checkbox'
              multiple
              value={personName}
              onChange={handleChange}
              onOpen={() => console.log('select opened')}
              //input={<Input />}
              // MenuProps={MenuProps}
              IconComponent={ControlPointIcon}
              renderValue={(selected) => <div className={classes.chips}></div>}
            >
              {names.map((name) => (
                <MenuItem key={name} value={name}>
                  <ListItemText
                    style={{
                      color: getRandomColor(),
                      backgroundColor: '#FFF0F0',
                      border: '2px solid ',
                      margin: 2,
                      borderRadius: 20,
                      padding: 6,
                    }}
                    primary={name}
                  />
                  <Checkbox
                    icon={<CheckIcon sx={{ color: 'white' }} />}
                    checkedIcon={<CheckIcon sx={{ color: '#1478F1' }} />}
                    checked={personName.includes(name)}
                  />
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
      </Grid>
    </div>
  )
}

export default MultipleSelectDemo
