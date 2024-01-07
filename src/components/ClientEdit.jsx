import * as React from 'react';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import { Button, Grid, IconButton, TextField } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import DeleteIcon from '@mui/icons-material/Delete';
import DeleteClient from './ClientDelete';
import { AdapterLuxon } from '@mui/x-date-pickers/AdapterLuxon'
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { db } from '../firebase'
import { doc, updateDoc } from "firebase/firestore";
import { DateTime } from "luxon";


export default function EditClient(props) {
    const { onClose, selectedValue, open } = props;
    const [deleteOpen, setDeleteOpen] = React.useState(false)
    const [updatedClient, setUpdatedClient] = React.useState()

    React.useEffect(() => {
        setUpdatedClient(selectedValue)
    }, [])

    console.log(updatedClient)

    const deleteClient = () => {
        setDeleteOpen(true)
    }

    const handleClose = () => {
        onClose(selectedValue);
    };

    const handleCloseDelete = () => {
        setDeleteOpen(false)
    }

    const handleListItemClick = (value) => {
        onClose(value);
    };

    const saveData = () => {
        handleClose()
        console.log("guardado")

    }

    const updateClient = async () => {
        handleClose()
        try {
            const clientRef = doc(db, "clients", selectedValue.id);
            await updateDoc(clientRef, {
                name: updatedClient.name,
                email: updatedClient.email,
                rut: updatedClient.rut,
                birthday: updatedClient.birthday
            });
            console.log(updatedClient)


            console.log('editado correctamente', updateClient.birthday)

        } catch (e) {
            console.error("Error al editar el cliente: ", e);
            console.log('error', updatedClient)
        }
    }


    const handleChange = (e) => {
        const { name, value } = e.target
        setUpdatedClient(prevState => ({
            ...prevState, [name]: value
        }))
        console.log(updatedClient)
    }

    const handleChangeDate = (newDate) => {
        setUpdatedClient({
            ...updatedClient,
            birthday: newDate.toLocaleString()
        })
        console.log(newDate)

    }


    return (
        <Dialog onClose={handleClose} open={open} fullWidth={true} >
            <Grid container alignItems="center">
                <Grid item xs={1}>
                    <IconButton
                        aria-label="delete"
                        onClick={() => deleteClient()}
                    >
                        <DeleteIcon />
                    </IconButton>
                </Grid>
                <Grid item xs={10}>
                    <DialogTitle>Editar cliente
                    </DialogTitle>
                </Grid>
                <Grid item xs={1}>
                    <IconButton
                        aria-label="close"
                        onClick={handleClose}
                    >
                        <CloseIcon />
                    </IconButton>

                </Grid>

            </Grid>
            <TextField
                required
                label="Nombre"
                defaultValue={selectedValue.name}
                variant="filled"
                name="name"
                onChange={handleChange}
            />
            <TextField
                required
                id="filled-required"
                label="Email"
                defaultValue={selectedValue.email}
                variant="filled"
                name="email"
                onChange={handleChange}
            />
            <TextField
                required
                id="filled-required"
                label="Required"
                defaultValue={selectedValue.rut}
                variant="filled"
                name="rut"
                onChange={handleChange}
            />

            <LocalizationProvider dateAdapter={AdapterLuxon} adapterLocale="en-gb">
                <DatePicker
                    name='birthday'
                    onChange={(newValue) => handleChangeDate(newValue)}
                    defaultValue={DateTime.fromFormat(selectedValue.birthday, "dd/mm/yyyy")}
                />
            </LocalizationProvider>

            <Button onClick={updateClient}>Guardar</Button>
            <DeleteClient
                selectedValue={selectedValue}
                open={deleteOpen}
                onClose={handleClose}
                onCloseDelete={handleCloseDelete} />
        </Dialog >

    );
}