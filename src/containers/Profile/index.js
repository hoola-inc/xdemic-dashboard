import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

class Profile extends Component {
  render() {
    return <div>Profile</div>;
  }
}

const mapStateToProps = state => {
  return {
    userData: state.admin.userData || [{ name: "Rizwan" }]
  };
};

const mapActionToProps = dispatch =>
  bindActionCreators(
    {
      // fetchProducts: fetchProductsAction
    },
    dispatch
  );

export default connect(mapStateToProps, mapActionToProps)(Profile);
