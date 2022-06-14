import { Route, Router } from "wouter";
import Home from "./pages/home";
import Editor from "./pages/editor";
import Start from "./pages/start";
import SignIn from "./pages/signin";
import SignUp from "./pages/signup";

function App() {
  return (
    <>
      <Router>
        <Route path="/" component={Home} />
        <Route path="/editor" component={Editor} />
        <Route path="/start" component={Start} />
        <Route path="/signin" component={SignIn} />
        <Route path="/signup" component={SignUp} />
      </Router>
    </>
  );
}

export default App;
