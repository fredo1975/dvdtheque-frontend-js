import React from "react";
import { ReactKeycloakProvider } from "@react-keycloak/web";
import keycloak from "./Keycloak"
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ResponsiveAppBar from "./components/ResponsiveAppBar";
import FilmList from "./pages/FilmList";
import FilmExport from "./pages/FilmExport";
import FilmImport from "./pages/FilmImport";
import FilmAdd from "./pages/FilmAdd";
import Admin from "./pages/Admin";
import FilmDetail from "./pages/FilmDetail";
import AllocineNewFilm from "./pages/AllocineNewFilm";

function App() {
 return (
   <div>
     <ReactKeycloakProvider authClient={keycloak} initOptions={{ onLoad: 'login-required' }}>
      <BrowserRouter>
       <ResponsiveAppBar />
         <Routes>
           <Route exact path="/" element={<FilmList />} />
           <Route path="/film-add" element={<FilmAdd />} />
           <Route path="/film-export" element={<FilmExport />} />
           <Route path="/film-import" element={<FilmImport />} />
           <Route path="/allocine-new-film" element={<AllocineNewFilm />} />
           <Route path="/admin" element={<Admin />} />
           <Route path="/film-detail/:id" element={<FilmDetail />} />
         </Routes>
       </BrowserRouter>
       </ReactKeycloakProvider>
   </div>
 );
}

export default App;