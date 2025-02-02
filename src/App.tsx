import { useEffect } from "react";
import { useAuthenticator } from "@aws-amplify/ui-react";
import EventSchedular from "./components/TaskSchedular";
import "@aws-amplify/ui-react/styles.css";
import { Button } from "@mui/material";
import "./App.css";
import { fetchAuthSession } from "@aws-amplify/auth";
import "aws-amplify/auth/enable-oauth-listener";

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
          <Button
            onClick={() => signOut()}
            variant="outlined"
            color="primary"
            size="small"
          >
            Log Out
          </Button>
        </header>
      </div>
      <EventSchedular />
    </>
  );
}

export default App;
