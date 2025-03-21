import Keycloak from "keycloak-js";

const keycloak = new Keycloak({
  url: "http://localhost:8082/",
  realm: "master",
  clientId: "oidc-client",
});

// Ensure Keycloak is initialized only once
let keycloakInitialized = false;

export const initKeycloak = async () => {
  if (!keycloakInitialized) {
    await keycloak.init({ onLoad: "check-sso", checkLoginIframe: false });
    keycloakInitialized = true;
  }
};

export default keycloak;
