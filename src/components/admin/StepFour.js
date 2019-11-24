import React from 'react';
import withUnmounted from '@ishawnwang/withunmounted'


class StepFour extends React.Component {
    constructor(props) {
        super(props)
    }

    hasUnmounted = false;

    render() {
        return(
            <div>
                <p> Step Four BSDK</p>
            </div>
        );
    }
}

export default withUnmounted(StepFour);