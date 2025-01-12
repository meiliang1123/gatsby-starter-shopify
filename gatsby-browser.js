import * as React from "react"
import { Auth0Provider } from '@auth0/auth0-react';
import { StoreProvider } from "./src/context/store-context"
import Layout from "./src/components/Layout/Layout"
import "./src/styles/reset.css"
import "./src/styles/variables.css"
import "./src/styles/global.css"
import "./src/styles/global.css"

export const wrapRootElement = ({ element, props }) => {

  const onRedirectCallback = (appState) => {
    // Use Gatsby's navigate method to replace the url
    // navigate(appState?.returnTo || '/', { replace: true });
    console.log(appState, "appState")
  };

  return (
    <Auth0Provider
      domain={process.env.AUTH0_DOMAIN}
      clientId={process.env.AUTH0_CLIENTID}
      redirectUri={window.location.origin}
      onRedirectCallback={onRedirectCallback}
    >
      <StoreProvider>
        <Layout {...props}>{element}</Layout>
      </StoreProvider>
    </Auth0Provider>
  )
}
