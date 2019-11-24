import React from 'react';
import AdminDetail from './StepOne';
import CreateNewSchool from "./StepTwo";
import AddPersons from './StepThree';
import AddCoursesForSchool from './StepFour'
import { Steps, Button, message, Icon, Row, Col } from 'antd';

const { Step } = Steps;

const steps = [
    {
        title: 'First',
        content: <AdminDetail />,
    },
    {
        title: 'Second',
        content: <CreateNewSchool />,
    },
    {
        title: 'Third',
        content: <AddPersons />,
    },
    {
        title: 'Fourth',
        content: <AddCoursesForSchool />
    }
];

class AdminSteps extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            current: 0,
        };
        // this.onSubmit = this.onSubmit.bind(this);
    }

    next() {
        const current = this.state.current + 1;
        this.setState({ current });
    }

    prev() {
        const current = this.state.current - 1;
        this.setState({ current });
    }

    onSubmit() {
        message.success('Processing complete!');
        console.log("PROPS:",this.props);
        this.props.history.push('/student');

      }
      

    render() {
        const { current } = this.state;
        return (
            <div>
                        <Steps current={current}>
                            {steps.map(item => (
                                <Step key={item.title} title={item.title} />
                            ))}
                        </Steps>
                        <div className="steps-content">{steps[current].content}</div>
                        <div className="steps-action" style={{ textAlign: "right" }}>
                            {current < steps.length - 1 && (
                                <Button type="primary" size="large" onClick={() => this.next()}>
                                    <Icon type="arrow-right" />
                                    Next
                        </Button>
                            )}
                            {current === steps.length - 1 && (
                                <Button type="primary"  size="large" onClick={() => this.onSubmit()}>
                                    Done
                        </Button>
                            )}
                            {current > 0 && (
                                <Button style={{ marginLeft: 8 }}  size="large" onClick={() => this.prev()}>
                                    <Icon type="arrow-left" />
                                    Previous
        
                        </Button>
                            )}
                        </div>
            </div>
        );
    }
}

export default AdminSteps;