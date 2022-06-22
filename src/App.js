import { Route, Router, Switch } from "wouter";
import Home from "./pages/home";
import Editor from "./pages/editor";
import Start from "./pages/start";
import SignIn from "./pages/signin";
import SignUp from "./pages/signup";
import Notfound from "./pages/notfound";

function App() {
  return (
    <Switch>
        <Route path="/" component={Home} />
        <Route path="/editor/:id">
          {(params) => <Editor id={params.id} />}
        </Route>
        <Route path="/start" component={Start} />
        <Route path="/signin" component={SignIn} />
        <Route path="/signup" component={SignUp} />
        <Route path='/:rest*' component={Notfound} />
    </Switch>
  );
}

export default App;
