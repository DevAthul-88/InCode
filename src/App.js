import { Route, Router } from "wouter";
import Home from "./pages/home";
import Editor from "./pages/editor";

function App() {
  return (
    <>
      <Router>
        <Route path="/" component={Home} />
        <Route path="/editor" component={Editor} />
      </Router>
    </>
  );
}

export default App;
