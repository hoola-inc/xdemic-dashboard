import React from "react";
import AdminDetail from "./StepOne";
import CreateNewSchool from "./StepTwo";
import AddPersons from "./StepThree";
import AddCoursesForSchool from "./StepFour";
import AddStudents from "./StepFive";
import { Steps, Button, message, Icon, Row, Col } from "antd";

const { Step } = Steps;

const steps = [
  {
    title: "First",
    content: <AdminDetail />
  },
  {
    title: "Second",
    content: <CreateNewSchool />
  },
  {
    title: "Third",
    content: <AddPersons />
  },
  {
    title: "Four",
    content: <AddCoursesForSchool />
  },
  {
    title: "Five",
    content: <AddStudents />
  }
];

class AdminSteps extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      current: 0
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
          {current > 0 && (
            <Button
              //   style={{ marginLeft: 8 }}
              size="large"
              onClick={() => this.prev()}
            >
              <Icon type="arrow-left" />
              Previous
            </Button>
          )}
          {current < steps.length - 1 && (
            <Button
              style={{ marginLeft: 8 }}
              type="primary"
              size="large"
              onClick={() => this.next()}
            >
              Next
              <Icon type="arrow-right" />
            </Button>
          )}
          {current === steps.length - 1 && (
            <Button
              style={{ marginLeft: 8 }}
              type="primary"
              size="large"
              onClick={() => message.success("Processing complete!")}
            >
              Done
            </Button>
          )}
        </div>
      </div>
    );
  }
}

export default AdminSteps;
