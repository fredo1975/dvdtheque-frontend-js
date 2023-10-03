import React from "react";
import { ReactKeycloakProvider } from "@react-keycloak/web";
import keycloak from "./Keycloak"
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ResponsiveAppBar from "./components/ResponsiveAppBar";
import WelcomePage from "./pages/Homepage";
import SecuredPage from "./pages/Securedpage";

function App() {
 return (
   <div>
     <ReactKeycloakProvider authClient={keycloak}
     initOptions={{ onLoad: 'login-required' }}>
       <ResponsiveAppBar />
       <BrowserRouter>
         <Routes>
           <Route exact path="/" element={<WelcomePage />} />
           <Route path="/secured" element={<SecuredPage />} />
         </Routes>
       </BrowserRouter>
       </ReactKeycloakProvider>
   </div>
 );
}

export default App;