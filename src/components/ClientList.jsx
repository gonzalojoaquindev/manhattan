import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import CakeIcon from '@mui/icons-material/Cake';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import { Button, TextField } from '@mui/material';
import AddClient from './ClientAdd';
import EditClient from './ClientEdit';
import { collection, getDocs } from "firebase/firestore";
import { db } from '../firebase'
import { DateTime } from "luxon";


/* console.log('20-07-1993'
    .setLocale("es")
    .toLocaleString(DateTime.DATE_FULL))
 */
export default function ClientList() {

    const [clients, setClients] = React.useState([])
    const [editOpen, setEditOpen] = React.useState(false);
    const [addOpen, setAddOpen] = React.useState(false)
    const [selectedValue, setSelectedValue] = React.useState(
        {
            name: "Defecto",
            email: "defecto",
            birthday: '01-01-2024'
        }
    );

    const addClient = () => {
        setAddOpen(true)
        console.log(addOpen)
    }

    const handleCloseEdit = (value) => {
        setEditOpen(false);
        setSelectedValue(value);
    };

    const handleCloseAdd = () => {
        setAddOpen(false);
    };

    const handleListItemClick = (value) => {
        setSelectedValue(value)
        setEditOpen(true);
    };

    //para ejecutar la peticion luego de que se rendericen los elementos
    React.useEffect(() => {
        getClients()
    }, [])

    const getClients = async () => {
        const data = await getDocs(collection(db, "clients"));
        setClients(
            data.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
        )
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
                                                sx={{ display: 'block' }}
                                                color="text.secondary"
                                                component="span"
                                            >
                                                {item.email}
                                            </Typography>
                                            <Typography
                                                sx={{ display: 'block' }}
                                                color="text.secondary"
                                                component="span"
                                            >
                                                <CakeIcon sx={{ color: 'pink' }} />
                                                {item.birthday}
                                            </Typography>

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

