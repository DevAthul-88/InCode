import { Route, Router } from "wouter";
import Home from "./pages/home";
import Editor from "./pages/editor";
import Start from "./pages/start";

function App() {
  return (
    <>
      <Router>
        <Route path="/" component={Home} />
        <Route path="/editor" component={Editor} />
        <Route path="/start" component={Start} />
      </Router>
    </>
  );
}

export default App;
