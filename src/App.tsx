import { useEffect } from "react";
import { useAuthenticator } from "@aws-amplify/ui-react";
import EventSchedular from "./components/TaskSchedular";
import "@aws-amplify/ui-react/styles.css";
import "./App.css";
import { fetchAuthSession } from "@aws-amplify/auth";

function App() {
  const { signOut } = useAuthenticator();
  const { user } = useAuthenticator((context) => [context.user]);

  useEffect(() => {
    if (user) {
      printAccessTokenAndIdToken();
    }
  }, [user]);

  const printAccessTokenAndIdToken = async () => {
    try {
      const { accessToken } = (await fetchAuthSession()).tokens ?? {};
      if (accessToken) {
        localStorage.setItem("token", accessToken.toString());
      } else {
        console.log("Tokens are undefined");
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      <div className="App">
        <header className="App-header">
          <button onClick={() => signOut()}>Log Out</button>
        </header>
      </div>
      <EventSchedular />
    </>
  );
}

export default App;
