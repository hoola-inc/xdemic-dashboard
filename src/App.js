import React from 'react';

// React Router packages
import { BrowserRouter, Route, Switch } from "react-router-dom";

// import components
import Course from './components/course/CoursesCard';
import CourseDetail from './components/course/CourseDetail';
import School from "./components/school/School";
import Student from "./components/student/Student";
import Home from "./components/home/Home";



class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {}
  }

  render() {
    return (
      // <Course />
      <BrowserRouter>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/coursedetail" component={CourseDetail} />
          <Route path="/school" component={School} />
          <Route path="/student" component={Student} />
          <Route path="/course" component={Course} />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;

