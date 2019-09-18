import React from "react";
import { Layout } from "antd";
import { subscribeToTimer } from '../../api/api';

const { Header } = Layout;

class Headers extends React.Component {

    constructor(props) {
        super(props);

        subscribeToTimer((err, timestamp) => this.setState({
            timestamp
        }));
    }

    state = {
        timestamp: 'no timestamp yet'
    };

    render() {
        return (
            <Header style={{ background: '#fff', padding: 0 }}>
                This is the timer value: {this.state.timestamp}
            </Header>
        );
    }
}

export default Headers;