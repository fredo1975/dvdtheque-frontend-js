import React from 'react';
import { useAuth } from "../helpers/auth-hook";

const FilmAdd = () => {
  const { token, initialized: authInitialized } = useAuth();
 return (
   <div>
     <h1 className="text-black text-4xl">Film Add.</h1>
   </div>
 );
};

export default FilmAdd;