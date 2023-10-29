import React from 'react';
import { useAxios } from "../helpers/axios-hook";

const FilmAdd = () => {
  const { axiosInstance, initialized } = useAxios(null);
 return (
   <div>
     <h1 className="text-black text-4xl">Film Add.</h1>
   </div>
 );
};

export default FilmAdd;