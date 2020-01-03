import React, { Component } from "react";
import StepFive from "../../components/admin/StepFive";
import { connect } from "react-redux";

class AdminContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "rizwan"
    };
  }

  render() {
    console.log("this.state.name is: ", this.state.name);
    console.log("this.props.name is: ", this.props.name);
    return (
      <div>
        <div>
          Admin Container
          <h1> hi {this.state.name}</h1>
          <h1> I'm {this.props.testingState}</h1>
          {this.props.userData.map(data => (
            <div>{data.name}</div>
          ))}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    testingState: state.global.error,
    userData: state.global.userData.repositories || [{ name: "Hamza" }]
  };
};

const mapActionToProps = () => {};

export default connect(mapStateToProps, mapActionToProps)(AdminContainer);
