import React, { useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";

import "./index.less"

const Account = () => {
  const { getAccessTokenSilently, user, isAuthenticated, isLoading } = useAuth0()

  useEffect(() => {
    if (!isAuthenticated) {
      getAccessTokenSilently()
        .then(token => console.log("Access token refreshed:=====", token))
        .catch(err => console.error("Error refreshing token:=====", err));
    }
  }, [isAuthenticated])

  return <div className="account-container">
    {user?.email}
  </div>
}

export default Account;