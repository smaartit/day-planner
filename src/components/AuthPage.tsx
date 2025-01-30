import React from "react";
import { Button } from "@mui/material";
import { useAuthenticator, Authenticator } from "@aws-amplify/ui-react";

const AuthPage: React.FC = () => {
  const { user } = useAuthenticator((context) => [context.user]);

  const { signOut } = useAuthenticator();
  return (
    <>
      {user ? (
        <div>
          <Button
            onClick={() => signOut()}
            variant="contained"
            color="primary"
            size="small"
          >
            Log Out
          </Button>
        </div>
      ) : (
        <Authenticator />
      )}
    </>
  );
};

export default AuthPage;
