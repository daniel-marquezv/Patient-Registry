import { makeStyles } from '@mui/styles';
import React from 'react';
import { PatientList, PatientRegistry } from './index';


const useStyles = makeStyles({
  head: {
    backgroundColor: 'pink'
  },
  container: {
    display: 'flex',
    flexDirection: 'column',

  },
  h1: {
    padding: '20px',
    margin: '0 auto',
    backgroundColor: '#d83c8c',
    color: 'white',

    // lineHeight: '90px'
  }
});



export const App = () => {



  const styles = useStyles();

  return (
    <div >
      <h1 className={styles.h1}>Docmovi</h1>
      {/* <NavBar/> */}
      <PatientRegistry />
      <PatientList />/
    </div>
  )

};
