import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';

export default function ListUser() {

    //Para manejar el estado
    const [clients, setClients] = React.useState([])

    //ara ejecutar la peticion luego de que se rendericen los elementos
    React.useEffect(() => {
        getClients()
    }, [])

    const getClients = async () => {
        const data = await fetch('https://jsonplaceholder.typicode.com/users')
        const clients = await data.json()
        /*   console.log(clients) */
        setClients(clients)

    }
    return (
        <List sx={{ width: '100%', maxWidth: 360 }}>
            {
                clients.map(item => (

                    <ListItem alignItems="flex-start" key={item.id}>
                        <ListItemAvatar>
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
                                    {" — I'll be in your neighborhood doing errands this…"}
                                </>
                            }
                        />
                    </ListItem>


                ))
            }


            {/*   */}
            {/* <ListItemText
                            primary={item.name}
                            secondary={
                                <React.Fragment>
                                    <Typography
                                        sx={{ display: 'inline' }}
                                        component="span"
                                        variant="body2"
                                        color="text.primary"
                                    >
                                        Ali Connors
                                    </Typography>
                                    {" — I'll be in your neighborhood doing errands this…"}
                                </React.Fragment>
                            }
                        /> */}

            {/* </ListItem> */}

            {/* < Divider variant="inset" component="li" /> */}


        </List >
    );
}