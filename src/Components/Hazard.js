import React from 'react';
import Draggable from 'react-draggable';
import { FaTimes } from 'react-icons/fa';
import {useState} from 'react';

export const Hazard = ({ hazard, onDelete, target }) => {
    const [show, setShow] = useState(false);

    // Is valid drag target verifies that the drag finish coordinates are within the map location
    const isValidDragTarget = (x, y) => {
        console.log('[INFO] .isValidDragTarget');

        console.log(JSON.stringify(target));
        console.log(x);
        console.log(y);
        // This is where you will add the check against the target box
        if (x >= target.xMin && x <= target.xMax
            && y >= target.yMin && y <= target.yMax) {
            // ---------------------------
            return true;
        }

        return false;
    }

    // On drag start function
    // -> Event handler for start of drag event
    const onDragStart = (event, data) => {
        // ---------------------------------
        // Note: this should print a mouse-up event
        console.log(event);
        // This prints the data associated with the drag event
        // In particular, where the drag started in pixels and where it finished
        console.log(data);


    }

    // On drag stop function
    // -> Event handler for end of drag event
    const onDragFinish = (event, data) => {
        // ---------------------------------
        // Note: this should print a mouse-up event
        console.log(event);
        // This prints the data associated with the drag event
        // In particular, where the drag started in pixels and where it finished
        console.log(data);
        console.log(event.clientX, ' ', event.clientY);

        // Check if drag finish is within map area - if so, we can add the hazard to the list
        let isValidDrag = isValidDragTarget(data.x, data.y);
        console.log(isValidDrag);
    } 

    console.log(`Hazard target: ${JSON.stringify(target)}`);
    
    return (
        
        <div>
            <div> {hazard.text}  </div>
            <Draggable 
                grid={[15, 15]}
                onStart={onDragStart}
                onStop={onDragFinish}
            >
            <div> {hazard.image}
            <FaTimes style = {{color: 'red', cursor: 'pointer', height:'10px', width:'10px'}}  onClick={() => onDelete(hazard.id)}/></div>
            </Draggable>
           
        </div>
    );
}

export default Hazard;

