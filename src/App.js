import React from "react";

// React Router packages
import {
  BrowserRouter,
  Route,
  Switch,
  useHistory,
  Redirect,
  useLocation
} from "react-router-dom";

// import components
import Course from "./components/course/CoursesCard";
import CourseDetail from "./components/course/CourseDetail";
import School from "./components/school/School";
import Student from "./components/student/Student";
import Home from "./components/home/Home";
import AdminMain from "./components/admin/Main.admin";
import ShowQrcode from "./components/landing/ShowQrcode";
import Profile from "./containers/Profile";

const fakeAuth = {
  isAuthenticated: false,
  authenticate(cb) {
    fakeAuth.isAuthenticated = true;
    setTimeout(cb, 100); // fake async
  },
  signout(cb) {
    fakeAuth.isAuthenticated = false;
    setTimeout(cb, 100);
  }
};

function AuthButton() {
  let history = useHistory();

  return fakeAuth.isAuthenticated ? (
    <p>
      Welcome!{" "}
      <button
        onClick={() => {
          fakeAuth.signout(() => history.push("/"));
        }}
      >
        Sign out
      </button>
    </p>
  ) : (
    <p>You are not logged in.</p>
  );
}

// A wrapper for <Route> that redirects to the login
// screen if you're not yet authenticated.
function PrivateRoute({ children, ...rest }) {
  return (
    <Route
      {...rest}
      render={({ location }) =>
        fakeAuth.isAuthenticated ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location }
            }}
          />
        )
      }
    />
  );
}

function LoginPage() {
  let history = useHistory();
  let location = useLocation();

  let { from } = location.state || { from: { pathname: "/" } };
  let login = () => {
    fakeAuth.authenticate(() => {
      history.replace(from);
    });
  };

  return (
    <div>
      <p>You must log in to view the page at {from.pathname}</p>
      <button onClick={login}>Log in</button>
    </div>
  );
}
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
