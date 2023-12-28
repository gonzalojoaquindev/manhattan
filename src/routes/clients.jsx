import React from 'react'
import ListUser from '../components/UserList'
/* import { Hijo } from '../components/Hijo' */


const clients = () => {

    const funcion = (parametro) => `${parametro}@gmail.com`

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
        <div>

            <ListUser />
        </div>
    )
}

{/* <h1>Pagina de clientes</h1>
            <ul>
                {
                    clients.map(item => (
                        <li key={item.id}>{item.name}</li>
                    ))
                }
            </ul> */}

export default clients
