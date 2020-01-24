import React from "react";

// React Router packages
import { BrowserRouter, Route, Switch, useHistory } from "react-router-dom";

// import components
import Course from "./components/course/CoursesCard";
import CourseDetail from "./components/course/CourseDetail";
import School from "./components/school/School";
import Student from "./components/student/Student";
import Home from "./components/home/Home";
import AdminMain from "./components/admin/Main.admin";
import ShowQrcode from "./components/landing/ShowQrcode";
import Profile from "./containers/Profile";

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/coursedetail" component={CourseDetail} />
          <Route path="/school" component={School} />
          <Route path="/student" component={Student} />
          <Route path="/course" component={Course} />
          <Route path="/admin" component={AdminMain} />
          <Route path="/qrcode" component={ShowQrcode} />
          <Route path="/profile" component={Profile} />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
