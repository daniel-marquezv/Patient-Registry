import React, { useState } from 'react';
import { regiones } from '../data/locations/comunas-regiones.js'
import { Button, FormControl, MenuItem, InputLabel, Select, TextField, Snackbar, Alert } from '@mui/material';
import { makeStyles } from '@mui/styles'
import { useForm } from 'react-hook-form';
import { PatientRegistryCollection } from '../api/PatientRegistryCollection.js';
import { validateRut } from 'rutlib';

import { Modal } from './components/Modal.jsx';

const useStyles = makeStyles({
  patientRegistry: {
    maxWidth: '700px',
    width: '100%',
    margin: '0 auto',
    backgroundColor: 'white',
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'

  },
  h2: {
    padding: '0',
    margin: '0'
  },
  fields: {
    width: '100%',
    marginBottom: '12px !important',
  },
  selectContainer: {
    width: '100%',
    display: 'flex',
    gap: '20px'
  },
});

export const PatientRegistry = () => {

  const styles = useStyles();

  const [formEntry, setFormEntry] = useState({
    firstName: '',
    firstLastName: '',
    secondLastName: '',
    rut: '',
    region: '',
    district: '',
    postalCode: ''
  })

  const [districtsByRegion, setDistrictsByRegion] = useState([])

  const { register, handleSubmit, setError, formState: { errors } } = useForm();

  const [openSuccessSb, setOpenSuccessSb] = useState(false);

  const [openModal, setOpenModal] = React.useState(false);

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleOpenSnackbarSuccess = () => {
    setOpenSuccessSb(true);
  };

  const handleCloseSnackbarSuccess = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpenSuccessSb(false);
  };

  const handleSelectRegion = (event) => {
    setFormEntry({ ...formEntry, region: event.target.value })
    const districtsByRegionSelected = regiones.filter(item => item.region == event.target.value)

    setDistrictsByRegion(districtsByRegionSelected[0].comunas)

  }



  const handleSelectDistrict = (event) => {
    setFormEntry({ ...formEntry, district: event.target.value })

  }



  const validateUniqueRut = async (rutToFind) => {
    return await PatientRegistryCollection.findOne({ rut: { $eq: rutToFind } });

  }

  const onSubmit = async (data, e) => {
    e.preventDefault();
    const {
      firstName,
      firstLastName,
      secondLastName,
      rut,
      region,
      district,
      postalCode } = data.formEntry

    const validatingRut = validateRut(rut)

    if (!validatingRut) {
      setError('formEntry.rut', { type: 'custom', message: 'Rut no valido' })
      return;
    }
    const uniqueRut = await validateUniqueRut(rut)

    if (uniqueRut) {
      handleOpenModal()
      return;
    }

    PatientRegistryCollection.insert({
      firstName,
      firstLastName,
      secondLastName,
      rut,
      region,
      district,
      postalCode
    });

    handleOpenSnackbarSuccess()

    setFormEntry({
      firstName: '',
      firstLastName: '',
      secondLastName: '',
      rut: '',
      region: '',
      district: '',
      postalCode: ''
    });
  }

  return (
    <div className={styles.patientRegistry}>

      <h1></h1>

      <h2 className={styles.h2}>Registro de pacientes</h2>

      <hr />

      <form className={styles.container} onSubmit={handleSubmit(onSubmit)}>
        <TextField
          {...register('formEntry.firstName', { required: 'Campo obligatorio' })}
          className={styles.fields}
          id="standard-required"
          label="Nombres"
          color='secondary'
          value={formEntry.firstName}
          onChange={() => setFormEntry({ ...formEntry, firstName: event.target.value })}
          error={errors.formEntry?.firstName}
          helperText={errors.formEntry?.firstName?.message}
        />
        {/* {errors.formEntry?.firstName?.type === 'required' && (<p>{errors.formEntry.firstName.message}</p>)} */}
        <TextField
          {...register('formEntry.firstLastName', { required: 'Campo obligatorio' })}
          className={styles.fields}
          id="standard-basic"
          label="Apellido paterno"
          color='secondary'
          value={formEntry.firstLastName}
          onChange={() => setFormEntry({ ...formEntry, firstLastName: event.target.value })}
          error={errors.formEntry?.firstLastName}
          helperText={errors.formEntry?.firstLastName?.message}
        />
        <TextField
          {...register('formEntry.secondLastName', { required: 'Campo obligatorio' })}
          className={styles.fields}
          id="standard-basic"
          label="Apellido materno"
          color='secondary'
          value={formEntry.secondLastName}
          onChange={() => setFormEntry({ ...formEntry, secondLastName: event.target.value })}
          error={errors.formEntry?.secondLastName}
          helperText={errors.formEntry?.secondLastName?.message}
        />
        <TextField
          {...register('formEntry.rut', { required: 'Campo obligatorio' })}
          className={styles.fields}
          id="standard-basic"
          label="Rut"
          color='secondary'
          value={formEntry.rut}
          onChange={() => setFormEntry({ ...formEntry, rut: event.target.value })}
          error={errors.formEntry?.rut}
          helperText={errors.formEntry?.rut?.message}
        />
        <div className={styles.selectContainer}>
          <FormControl sx={{ width: '50%' }} color='secondary'>
            <InputLabel id="Region">Región</InputLabel>
            <Select
              {...register('formEntry.region', { required: 'Campo obligatorio' })}
              className={styles.fields}
              labelId='Region'
              id='select-region'
              label='Región'
              autoWidth
              value={formEntry.region}
              onChange={handleSelectRegion}
              error={errors.formEntry?.region}
              helperText={errors.formEntry?.region?.message}
            >
              {regiones.map((region, index) => (
                <MenuItem value={region.region} key={index}>
                  {region.region}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl sx={{ width: '50%' }} color='secondary'>
            <InputLabel id="Comuna">Comuna</InputLabel>
            <Select
              {...register('formEntry.district', { required: 'Campo obligatorio' })}
              className={styles.fields}
              labelId='Comuna'
              id='select-comuna'
              label='Comuna'
              autoWidth
              value={formEntry.district}
              onChange={handleSelectDistrict}
              disabled={districtsByRegion.length > 0 ? false : true}
              error={errors.formEntry?.district}
              helperText={errors.formEntry?.district?.message}
            >
              {districtsByRegion.map((comuna, index) => (
                <MenuItem value={comuna} key={index}>
                  {comuna}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
        <TextField
          {...register('formEntry.postalCode', { required: 'Campo obligatorio' })}
          className={styles.fields}
          id="standard-basic"
          label="Código postal"
          // variant="standard"
          color='secondary'
          value={formEntry.postalCode}
          onChange={() => setFormEntry({ ...formEntry, postalCode: event.target.value })}
          error={errors.formEntry?.postalCode}
          helperText={errors.formEntry?.postalCode?.message}
        />
        <hr />
        <Button sx={{ borderRadius: '30px', width: '200px', }} variant='contained' type='submit' width='100px'>
          Registrar
        </Button>
      </form>

      <Snackbar open={openSuccessSb} autoHideDuration={6000} onClose={handleCloseSnackbarSuccess}>
        <Alert onClose={handleCloseSnackbarSuccess} severity="success" sx={{ width: '100%' }}>
          Paciente registrado
        </Alert>
      </Snackbar>

      <Modal 
        title={'Error'}
        description={'El rut ingresado ya existe, por favor ingrese otro.'}
        button={'Aceptar'}
        openModal={openModal}
        handleCloseModal={handleCloseModal}
      />
    </div>

  )
}
