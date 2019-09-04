import React from 'react';

// React Router packages
import { BrowserRouter, Route, Switch } from "react-router-dom";

// import components
import Course from './components/course/Course';
import CourseDetail from './components/course/CourseDetail';
import School from "./components/school/School";




class App extends React.Component {

  constructor() {
    super();
    this.state = {}
  }

  render() {
    return (
      // <Course />
      <BrowserRouter>
        <Switch>
          <Route path="/" exact component={Course} />
          <Route path="/coursedetail" exact component={CourseDetail} />
          <Route path="/school" exact component={School} />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;

