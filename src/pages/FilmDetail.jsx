import React from 'react';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useAxios } from "../helpers/axios-hook";
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Item from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';

const filmDisplay = '/dvdtheque-service/films/byId/'

const FilmDetail = () => {
  const { axiosInstance, initialized } = useAxios(null);
  const [film, setFilm] = useState(null);

  const { id } = useParams();
  //console.log(id);

  useEffect(() => {
    //console.log('FilmDetail initialized',initialized);
    if (!initialized) {
      return;
    }
    //console.log('axiosInstance',axiosInstance.instance.get(baseURL));
    //const instance = axios.create;
    axiosInstance.instance.get(filmDisplay + id, {
      timeout: 1500,
    }).then((response) => {
      setFilm(response.data)
      console.log('response.data', response.data);
    }).catch(error => console.error(error));

  }, [initialized, id]);

  if (!film) return null;

  return (
    <Box sx={{ flexGrow: 1 }} >
      <Grid container spacing={1}>
        <Grid item xs={3}>
          <img src={film.posterPath} />
        </Grid>

        <Grid item xs={9} sm container>
          <Grid container spacing={0}>
            <Grid item xs={1}>
              <Typography gutterBottom variant="subtitle1" component="div">
                Ttire :
              </Typography>
            </Grid>
            <Grid item xs={11}>
              <Typography gutterBottom variant="subtitle1" component="div">
                {film.titre}
              </Typography>
            </Grid>
            <Grid item xs={1}>
              <Typography gutterBottom variant="subtitle1" component="div">
                Ttire Original :
              </Typography>
            </Grid>
            <Grid item xs={11}>
              <Typography gutterBottom variant="subtitle1" component="div">
                {film.titreO}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default FilmDetail;