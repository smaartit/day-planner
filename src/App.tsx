import { useEffect, useState } from "react";
import { useAuthenticator } from "@aws-amplify/ui-react";
import EventSchedular from "./components/TaskSchedular";
import "@aws-amplify/ui-react/styles.css";
import { Button, Typography } from "@mui/material";
import "./App.css";
import { fetchAuthSession, fetchUserAttributes } from "@aws-amplify/auth";
import "aws-amplify/auth/enable-oauth-listener";

function App() {
  const { signOut } = useAuthenticator();
  const { user } = useAuthenticator((context) => [context.user]);

  const [userEmail, setUserEmail] = useState("");

  useEffect(() => {
    if (user) {
      printAccessTokenAndIdToken();
    }
  }, [user]);

  const printAccessTokenAndIdToken = async () => {
    try {
      const { accessToken } = (await fetchAuthSession()).tokens ?? {};

      const userAttributes = await fetchUserAttributes();
      setUserEmail(userAttributes.email?.toString() ?? "");
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
          <Typography
            sx={{
              fontSize: 15,
            }}
            color="text.secondary"
            gutterBottom
          >
            {userEmail ? `Welcome  ${userEmail}` : "Loading..."}
          </Typography>
          &nbsp;&nbsp;
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
