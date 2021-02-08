import Hazard from './Hazard'
import { useState } from 'react'


//array of the actual value of the state, and function to update the value
const initialHazardList = [];

const Hazards = (props) => {
    // const [userHazardList, setUserHazardList] = useState(initialHazardList);
    // This below can be a constant (NOT STATE -> it does not change in the lifecycle of your component)
    console.log('HazardList from other page' + props.showHaz);
    
    const [hazards, setHazards] = useState([
        {
            id: 1,
            text: 'Traffic Cone',
            image: <img style={{ height: '20px', width: '20px' }} src="https://tinyurl.com/y6a5xw69"></img>,
        },
        {
            id: 2,
            text: 'Forklift',
            image: <img style={{ height: '40px', width: '40px' }} img src="https://tinyurl.com/y3aef9kt"></img>,
        },
        {
            id: 3,
            text: 'Racking',
            image: <img style={{ height: '40px', width: '60px' }} img src="https://tinyurl.com/y67vdnmu"></img>,
        },
        {
            id: 4,
            text: 'Truck',
            image: <img style={{ height: '40px', width: '50px' }} img src="https://tinyurl.com/y3rxt7hh"></img>,
        },
        {
            id: 5,
            text: 'Pedestrian Zone',
            image: <img style={{ height: '40px', width: '40px' }} img src='https://tinyurl.com/y27hc3ut'></img>

        }
    ])

    const deleteHazard = (id) => {
        setHazards(hazards.filter((hazard) => hazard.id !== id))
    }

    // setHazards(prev => prev.concat((props.hazardList)));

    

    console.log(`Hazards Props: ${JSON.stringify(props)}`);

    return (
        //setTasks
        <>
            {hazards.map((hazard) => (
                <Hazard
                    key={hazard.id}
                    hazard={hazard}
                    onDelete={deleteHazard}
                    target={props.target}
                    // setHazard={setHazards}
                />))}

        </>
    )
}

export default Hazards;