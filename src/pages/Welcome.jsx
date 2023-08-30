import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../firebase";

export default function Welcome() {
  const handleSignIn = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider).catch((err) => {
      const errCode = err.code;
      const errMsg = err.message;
      console.log(errCode, errMsg);
    });
  };

  return (
    <div className="welcome flex h-[90vh] flex-col items-center justify-center gap-3 p-3">
      <h1 className="m-3 text-center text-5xl font-bold">Welcome to Tasker</h1>
      <p className="text-center">Please sign in / sign up to continue!</p>
      <button className="btn btn-primary m-3" onClick={() => handleSignIn()}>
        Sign In / Sign Up
      </button>
    </div>
  );
}
