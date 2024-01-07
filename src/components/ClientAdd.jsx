import * as React from 'react';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import { Button, IconButton, TextField } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { AdapterLuxon } from '@mui/x-date-pickers/AdapterLuxon'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { addDoc, collection } from "firebase/firestore";
import { db } from '../firebase'


function AddClient(props) {
    const { open, onClose, client } = props;
    const [newClient, setNewClient] = React.useState({
        name: "",
        email: "",
        rut: "",
        birthday: ""
    })


    const saveNewClient = async () => {
        handleClose()
        try {
            const docRef = await addDoc(collection(db, "clients"), {
                name: newClient.name,
                email: newClient.email,
                rut: newClient.rut,
                birthday: newClient.birthday
            });

            console.log("Docuumento escrito con ID: ", docRef.id);
            console.log(newClient)


        } catch (e) {
            console.error("Error adding document: ", e);
        }

    }

    const handleChange = (e) => {
        const { name, value } = e.target
        setNewClient(prevState => ({
            ...prevState, [name]: value
        }))
        console.log(newClient)
    }

    const handleChangeDate = (newDate) => {
        setNewClient({
            ...newClient,
            birthday: newDate.toLocaleString()
        })

    }

    const handleClose = () => {
        onClose();
    };




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
            <TextField
                required
                name="rut"
                label="RUT"
                variant="filled"
                onChange={handleChange}
            />
            <LocalizationProvider
                dateAdapter={AdapterLuxon}
                adapterLocale="en-gb"

            >
                <DatePicker name='birthday' onChange={(newValue) => handleChangeDate(newValue)}

                />
            </LocalizationProvider>

            <Button onClick={() => saveNewClient()}>Guardar</Button>
        </Dialog>
    );
}

export default AddClient