import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

class AdminContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "rizwan"
    };
  }

  render() {
    return (
      <div>
        <div>
          <div>Admin Container</div>
          <h1> hi {this.state.name}</h1>
          <h1> I'm {this.props.testingState}</h1>
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

const mapActionToProps = dispatch =>
  bindActionCreators(
    {
      // fetchProducts: fetchProductsAction
    },
    dispatch
  );

export default connect(mapStateToProps, mapActionToProps)(AdminContainer);
