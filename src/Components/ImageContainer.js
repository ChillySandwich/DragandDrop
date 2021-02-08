
import ReactDOM from 'react-dom';

import SiteImg from './Site.JPG';

export const ImageContainer = (props) => {

    return (
        <>
            <img src ={SiteImg} style={{maxWidth: '100%', maxHeight:'100%'}} alt="SitePlan"/>
        </>
    )
}

export default ImageContainer;
;