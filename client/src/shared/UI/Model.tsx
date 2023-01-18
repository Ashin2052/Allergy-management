import {Fragment} from "react";
import ReactDOM from "react-dom";
import './Model.css'

const portalElement = document.getElementById('overlays') as HTMLElement;

const BackdropOverlay = () => {

    return <div className="backdrop"></div>;
}

const ModelOverlay = (props: any) => {
    return <div className="modal">
        <div>
            {props.children}
        </div>
    </div>
}
export const Model = (props: any) => {
    return <Fragment>
        {ReactDOM.createPortal(<BackdropOverlay/>, portalElement)}
        {ReactDOM.createPortal(<ModelOverlay>{props.children}</ModelOverlay>, portalElement)}</Fragment>
}

