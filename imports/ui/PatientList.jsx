import React from 'react';
import { useTracker } from 'meteor/react-meteor-data';
import { PatientRegistryCollection } from '/imports/api/PatientRegistryCollection';
import { Patient } from './index';
import { makeStyles } from '@mui/styles';


const useStyles = makeStyles({
  patientList: {
    maxWidth: '810px',
    width: '100%',
    margin: '0 auto',
    backgroundColor: 'white'
  }
});

export const PatientList = () => {

  const styles = useStyles()

  const patients = useTracker(() => PatientRegistryCollection.find({}, { sort: { createdAt: -1 } }).fetch());

  return (
    <div className={styles.patientList}>
      <h2 >Lista de pacientes</h2>

      <Patient patients={patients} />

    </div>
  );
};