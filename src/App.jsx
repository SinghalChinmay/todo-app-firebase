import { auth } from "./firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import TodoApp from "./pages/TodoApp";
import Welcome from "./pages/Welcome";

function App() {
  const [user] = useAuthState(auth);

  return <div className="App">{user ? <TodoApp /> : <Welcome />}</div>;
}

export default App;
