import React from 'react';
import logo from "../../assets/img/xDemic-logo-01.png";

class ShowQrcode extends React.Component {

    constructor(props) {
        super(props);

        
    }

    render() {
        return(
            <div className="main__logo">
                <img src={logo} />
            </div>
        );
    }
}

export default ShowQrcode;