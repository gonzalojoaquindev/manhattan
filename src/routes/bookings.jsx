import React from 'react'

import 'kalend/dist/styles/index.css'; // import styles
import CalendComponent from '../components/Calendar';
import { Box } from '@mui/material';
/* import BookingModal from '../components/BookingModal'; */



const Bookings = () => {

    const events = [
        {
            id: 1,
            startAt: '2021-11-21T18:00:00.000Z',
            endAt: '2021-11-21T19:00:00.000Z',
            timezoneStartAt: 'Europe/Berlin', // optional
            summary: 'corte de pelo',
            color: 'blue',
            calendarID: 'work'
        },
        {
            id: 2,
            startAt: '2021-11-21T18:00:00.000Z',
            endAt: '2021-11-21T19:00:00.000Z',
            timezoneStartAt: 'Europe/Berlin', // optional
            summary: 'Reserva 2',
            color: 'blue'
        }
    ]

    //Para manejar el estado
    const [clients, setClients] = React.useState([])

    //ara ejecutar la peticion luego de que se rendericen los elementos
    React.useEffect(() => {
        getClients()
    }, [])

    const getClients = async () => {
        const data = await fetch('https://jsonplaceholder.typicode.com/comments')
        const clients = await data.json()
        /*   console.log(clients) */
        setClients(clients)

    }
    return (
        <Box
            component="main"
            sx={{
                backgroundColor: (theme) =>
                    theme.palette.mode === 'dark'
                        ? theme.palette.grey[100]
                        : theme.palette.grey[900],
                flexGrow: 1,
                height: '100vh',
                overflow: 'auto',
            }}
        >
            <CalendComponent styled={{ heigth: '1000px' }} />
            {/*   <BookingModal /> */}


        </Box>
    )

}

export default Bookings