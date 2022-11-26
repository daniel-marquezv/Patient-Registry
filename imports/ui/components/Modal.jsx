import React from 'react'
import { Button, Dialog, DialogContent, DialogContentText, DialogTitle } from '@mui/material'
import WarningIcon from '@mui/icons-material/Warning';
import { makeStyles } from '@mui/styles'


const useStyles = makeStyles({
  modal: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '36px 0px'
  }
});

export const Modal = ({openModal, handleCloseModal, title, description, button}) => {

  const  styles = useStyles()

    return (
        <Dialog
            open={openModal}
            onClose={handleCloseModal}
        >
            <div className={styles.modal}>
                <WarningIcon sx={{ color: 'red' }} fontSize='large' />
                <DialogTitle sx={{ padding: '8px 16px' }} >
                   {title}
                </DialogTitle>
                <DialogContent>

                    <DialogContentText  >
                       {description}
                    </DialogContentText>
                </DialogContent>

                <Button onClick={handleCloseModal} autoFocus >
                    {button}
                </Button>
            </div>

        </Dialog>
    )
}
