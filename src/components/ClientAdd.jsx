import * as React from 'react';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import { Button, IconButton, TextField } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

function AddClient(props) {
    console.log('props', props)
    const { open, onClose, client } = props;

    const saveNewClient = () => {
        handleClose()
        console.log("te guardé", newClient)
    }

    const handleChange = (e) => {
        const { name, value } = e.target
        setNewClient(prevState => ({
            ...prevState, [name]: value
        }))
        console.log(newClient)
    }

    const handleClose = () => {
        onClose();
    };

    const [newClient, setNewClient] = React.useState({
        name: "",
        email: ""
    })



    return (
        <Dialog open={open} fullWidth={true} >

            <DialogTitle>Agregar nuevo cliente</DialogTitle>
            <IconButton
                aria-label="close"
                onClick={handleClose}
                sx={{
                    position: 'absolute',
                    right: 8,
                    top: 8,
                    color: (theme) => theme.palette.grey[500],
                }}
            >
                <CloseIcon />
            </IconButton>
            <TextField
                required
                id="name"
                name="name"
                label="Nombre"
                variant="filled"
                onChange={handleChange}
            />
            <TextField
                required
                name="email"
                id="email"
                label="Email"
                variant="filled"
                onChange={handleChange}
            />

            <Button onClick={() => saveNewClient()}>Guardar</Button>
        </Dialog>
    );
}

export default AddClient