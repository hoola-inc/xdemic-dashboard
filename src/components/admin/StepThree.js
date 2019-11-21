import React from 'react';
import { Upload, Button, Icon } from 'antd';

class StepThree extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <Upload action="https://www.mocky.io/v2/5cc8019d300000980a055e76" directory>
                    <Button>
                        <Icon type="primary" /> Upload CSV
                    </Button>
                </Upload>
            </div>
        );
    }
}

export default StepThree;