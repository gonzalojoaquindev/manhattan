import React, { useEffect, useState } from 'react';

import { DateTime } from 'luxon';
import Kalend, { CalendarView, OnEventDragFinish } from 'kalend';
import 'kalend/dist/styles/index.css';


const CalendComponent = (props: any) => {

    const funcion = (parametro: any) => `${parametro}@gmail.com`
    /*  const [demoEvents, setDemoEvents] = useState([]);
 
   
     useEffect(() => {
         setDemoEvents(generateDemoEvents(DateTime.now(), 80));
     }, []);

     
  */

    const events = [
        {
            id: 1,
            startAt: '2023-12-25T15:00:00.000Z',
            endAt: '2023-12-25T19:00:00.000Z',
            timezoneStartAt: 'Europe/Berlin', // optional
            summary: 'Corte de pelo con juliao',
            color: 'blue',
            calendarID: 'work'
        },
        {
            id: 2,
            startAt: '2023-12-25T11:00:00.000Z',
            endAt: '2023-12-25T14:00:00.000Z',
            timezoneStartAt: 'Europe/Berlin', // optional
            summary: 'Lavado de cabeza',
            color: 'green'
        }
    ]

    const [clients, setClients] = React.useState([])

    //ara ejecutar la peticion luego de que se rendericen los elementos
    useEffect(() => {
        getClients()
    }, [])

    const getClients = async () => {
        const data = await fetch('https://jsonplaceholder.typicode.com/users')
        const clients = await data.json()
        /*   console.log(clients) */
        setClients(clients)

    }

    const onNewEventClick = (data: any) => {
        const msg = `Nuevo evento click action\n\n Callback data:\n\n${JSON.stringify({
            hour: data.hour,
            day: data.day,
            startAt: data.startAt,
            endAt: data.endAt,
            view: data.view,
            event: 'click event ',
        })}`;
        console.log(msg);
    };

    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    // Callback for event click
    const OnEventClick = (data: any) => {
        const msg = `hiciste click en el evento action\n\n Callback data:\n\n${JSON.stringify(data)}`;
        console.log(data);
    }
    /*    handleClickOpen() */


    // Callback after dragging is finished
    /*  const onEventDragFinish: OnEventDragFinish = (
         prev: any,
         current: any,
         data: any
     ) => {
         getClients(data);
     }; */

    return (
        <>
            <Kalend
                kalendRef={props.kalendRef}
                onNewEventClick={onNewEventClick}
                initialView={CalendarView.THREE_DAYS}
                disabledViews={[]}
                onEventClick={OnEventClick}
                events={events}
                initialDate={new Date().toISOString()}
                hourHeight={100}
                showWeekNumbers={true}
                timezone={'Europe/Berlin'}
                draggingDisabledConditions={{
                    summary: 'Computers',
                    allDay: false,
                    color: 'green',
                }}
                //onEventDragFinish={onEventDragFinish}
                onStateChange={props.onStateChange}
                selectedView={props.selectedView}
                showTimeLine={true}
                isDark={true}
                autoScroll={false}
                // disabledDragging={true}
                colors={{
                    light: {
                        primaryColor: 'blue',
                    },
                    dark: {
                        primaryColor: 'orange',
                    },
                }}
            />



        </>
    );
};


export default CalendComponent;