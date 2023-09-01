import { auth } from "./firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import TodoApp from "./pages/TodoApp";
import Welcome from "./pages/Welcome";
import TodoProvider from "./context/TodoContext.jsx";

function App() {
  const [user] = useAuthState(auth);

  return (
    <TodoProvider>
      <div className="App">{user ? <TodoApp /> : <Welcome />}</div>
    </TodoProvider>
  );
}

export default App;
