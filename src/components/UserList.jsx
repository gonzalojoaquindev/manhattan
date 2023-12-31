import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import { Button, TextField } from '@mui/material';
import AddClient from './ClientAdd';
import EditClient from './ClientEdit';








export default function ListUser() {

    const [editOpen, setEditOpen] = React.useState(false);
    const [addOpen, setAddOpen] = React.useState(false)
    console.log("estado de addOpen", addOpen)
    const [newClient, setNewClient] = React.useState({ name: "defecto", email: "defecto" })
    const [selectedValue, setSelectedValue] = React.useState({ name: "Defecto", email: "defecto" });
    console.log(selectedValue)


    const handleCloseEdit = (value) => {
        setEditOpen(false);
        setSelectedValue(value);
    };

    const handleCloseAdd = () => {
        setAddOpen(false);

    };

    const handleListItemClick = (value) => {
        setSelectedValue(value)
        console.log(selectedValue)
        console.log("valor seleccionado", selectedValue)
        setEditOpen(true);
    };

    //Para manejar el estado
    const [clients, setClients] = React.useState([])

    //para ejecutar la peticion luego de que se rendericen los elementos
    React.useEffect(() => {
        getClients()
    }, [])

    const getClients = async () => {
        const data = await fetch('https://jsonplaceholder.typicode.com/users')
        const clients = await data.json()
        /*   console.log(clients) */
        setClients(clients)
    }

    const addClient = () => {
        setAddOpen(true)
        console.log(addOpen)
    }


    return (
        <>
            <Button onClick={() => addClient()}>Agregar cliente</Button>
            <List sx={{ width: '100%', maxWidth: 400 }}>
                {
                    clients.map(item => (

                        <ListItem alignItems="flex-start" key={item.id}>
                            <ListItemButton onClick={() => handleListItemClick(item)}>
                                <ListItemAvatar >
                                    <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
                                </ListItemAvatar>
                                <ListItemText
                                    primary={item.name}
                                    secondary={
                                        <>
                                            <Typography
                                                sx={{ display: 'inline' }}
                                                component="span"
                                                variant="body2"
                                                color="text.primary"
                                            >
                                                Ali Connors
                                            </Typography>
                                            {" — esto es lo que dice abajo…"}
                                        </>
                                    }
                                />
                            </ListItemButton>
                        </ListItem>
                    ))
                }
            </List >
            <EditClient
                selectedValue={selectedValue}
                open={editOpen}
                onClose={handleCloseEdit} />
            <AddClient
                open={addOpen}
                onClose={handleCloseAdd}
            />
        </>
    );
}

