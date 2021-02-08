import React from 'react';
import SideContainer from "./SideContainer";
import ImageContainer from "./ImageContainer";
import Hazard from "./Hazard";
import Hazards from "./Hazards";
import Grid from "@material-ui/core/Grid";
import { useState } from 'react';

const DEFAULT_TARGET_STATE = { xMin: 0, xMax: 0, yMin: 0, yMax: 0 };

const Layout = (props) => {
    const [target, setTarget] = useState(DEFAULT_TARGET_STATE);


    return (
        <Grid container spacing={3}>
            <Grid item xs={4}>
                <SideContainer>
                    <Hazards target={target} ></Hazards>
                    {console.log("This is the hazard list from the other page" + props.showHaz)}
                    
                </SideContainer>
            </Grid>
            <Grid item xs={8}>
                <ImageContainer setTarget={setTarget} />
            </Grid>
            <input type='button' value="Selected Hazards" onClick={() => console.log(this.props.data.showHaz)}/>
        </Grid>
        
    );
}

export default Layout;