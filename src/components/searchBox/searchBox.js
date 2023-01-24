import React from 'react'
import styles from './searchBox.module.scss'
import TextField from '@mui/material/TextField';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';


function  SearchBox() {
  return (
    <div className={styles.search}>
        <SearchOutlinedIcon className={styles.icon} fontSize='medium'/>
        <TextField  className={styles.input} id="input-with-icon-textfield" label="Search" variant="standard"  />

    </div>
  )
}

export default  SearchBox