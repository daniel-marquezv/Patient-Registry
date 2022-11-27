import React from 'react';
import { makeStyles } from '@mui/styles'
import { DataGrid } from '@mui/x-data-grid';
import { Button, Tooltip } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { PatientRegistryCollection } from '../api/PatientRegistryCollection';

const useStyles = makeStyles({
    container: {
        width: '100%',
        height: '400px'

    },
    deleteButton: {
        display: 'flex',
        justifyContent: 'center',
        alignContent: 'center'
    }
});

export const Patient = ({ patients }) => {

    const styles = useStyles()

    const columns = [
        // {
        //     field: '_id',
        //     headerName: 'Id',

        // },
        {
            field: 'firstName',
            headerName: 'Nombre',
        },
        ,
        {
            field: 'firstLastName',
            headerName: 'Apellido paterno',
        },
        ,
        {
            field: 'secondLastName',
            headerName: 'Apellido materno',
        },
        ,
        {
            field: 'rut',
            headerName: 'Rut',
        },
        ,
        {
            field: 'region',
            headerName: 'Región',
        },
        ,
        {
            field: 'district',
            headerName: 'Comuna',
        },
        ,
        {
            field: 'postalCode',
            headerName: 'Código postal',
        },
        {
            field: 'DeleteButton',
            headerName: 'Eliminar',
            renderCell: (params) => {

                // const deleteTask = ({ _id }) => TasksCollection.remove(_id);
                const onDelete = async () => {

                    const deleteTask = (_id) => PatientRegistryCollection.remove(_id);

                    return await deleteTask(params.row._id)
                }

                return (
                    <Tooltip title='Eliminar paciente' arrow>
                        <Button className={styles.deleteButton} color='error' onClick={onDelete} startIcon={<DeleteIcon sx={{ margin: '0' }} />} />
                    </Tooltip>

                )
            }
        }
    ]

    return (
        <div className={styles.container}>
            <DataGrid
                rows={patients}
                columns={columns}
                pageSize={5}
                rowsPerPageOptions={[5]}
                getRowId={(row) => row._id}
            />
        </div>
    )

};