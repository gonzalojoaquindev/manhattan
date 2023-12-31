import * as React from 'react';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import { Button, IconButton, TextField } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

export default function EditClient(props) {
    const { onClose, selectedValue, open } = props;


    const handleClose = () => {
        onClose(selectedValue);
    };

    const handleListItemClick = (value) => {
        onClose(value);
    };

    const [name, setName] = React.useState("")

    React.useEffect(() => {
        //obtener datos del local storage
        const data = localStorage.getItem("name")

        //Actualizar el estado del nombre con los datos del localStorage
        setName(data ? data : "")
    }, [])

    // Guardar los datos en el localStorage
    const saveData = () => {
        localStorage.setItem("name", name)
        console.log("guarde la cosita")
    }

    return (
        <Dialog onClose={handleClose} open={open} fullWidth={true} >

            <DialogTitle>Editar cliente</DialogTitle>
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
                id="filled-required"
                label="Required"
                defaultValue={selectedValue.name}
                variant="filled"
            />
            <TextField
                required
                id="filled-required"
                label="Required"
                defaultValue={selectedValue.email}
                variant="filled"
            />
            <TextField
                required
                id="filled-required"
                label="Required"
                defaultValue={selectedValue.phone}
                variant="filled"
            />
            <TextField
                required
                id="filled-required"
                label="Required"
                defaultValue={selectedValue.username}
                variant="filled"
            />
            <Button onClick={saveData}>Guardar</Button>
        </Dialog>
    );
}