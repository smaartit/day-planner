import React from "react";
import { useAuthenticator, Authenticator } from "@aws-amplify/ui-react";

const AuthPage: React.FC = () => {
  const { user } = useAuthenticator((context) => [context.user]);

  const { signOut } = useAuthenticator();
  return (
    <>
      {user ? (
        <div>
          <button
            onClick={() => signOut()}
            style={{
              padding: "0.5rem 1rem",
              fontSize: "1rem",
              cursor: "pointer",
            }}
          >
            Log Out
          </button>
        </div>
      ) : (
        <Authenticator />
      )}
    </>
  );
};

export default AuthPage;
