import React from 'react';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useAxios } from "../helpers/axios-hook";
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Item from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';

const filmDisplay = '/dvdtheque-service/films/byId/'
const allCategoriesUrl = '/dvdtheque-service/films/genres'
const allGenres = ['DVD','EN_SALLE','CANAL_PLUS','GOOGLE_PLAY','TV']

const FilmDetail = () => {
  const { axiosInstance, initialized } = useAxios(null);
  const [film, setFilm] = useState(null);
  const [origine, setOrigine] = useState('DVD');
  const [allGenres, setAllGenres] = useState(null);
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

    axiosInstance.instance.get(allCategoriesUrl, {
      timeout: 1500,

  }).then((response) => {
          setAllGenres(response.data);
          console.log('response', response);
      }).catch(error => console.error(error));

  }, [initialized, id]);

  const handleChangeOrigine = (event) => {
    setOrigine(event.target.value);
};

  if (!film) return null;

  return (
    <Box sx={{ flexGrow: 1 }} >
      <Grid container spacing={1}>
        <Grid item xs={3}>
          <img src={film.posterPath} />
        </Grid>
        <Grid item xs={12} sm container>
          <TableContainer component={Paper}>
            <Table >
              <TableBody>
                <TableRow >
                  <TableCell align="right" sx={{ minWidth: 100 }}>Titre : </TableCell>
                  <TableCell align="left">{film.titre}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align="right">Titre Original : </TableCell>
                  <TableCell align="left">{film.titreO}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align="right">Date de sortie : </TableCell>
                  <TableCell align="left">{film.dateSortie}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align="right">Réalisateur : </TableCell>
                  <TableCell align="left">
                    {
                      film.realisateur.map(r => (
                        r.nom + ','
                      ))
                    }
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align="right">Durée : </TableCell>
                  <TableCell align="left">{film.runtime}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align="right">Résumé : </TableCell>
                  <TableCell align="left">{film.overview}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align="right">Acteurs : </TableCell>
                  <TableCell align="left" >
                    {
                    film.acteur.map((a,index) => (
                      <img title={a.nom} key={index} className="acteurs" src={a.profilePath}/>
                    ))
                  }
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align="right">Home Page : </TableCell>
                  <TableCell align="left">{film.homepage}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align="right">TMDB ID : </TableCell>
                  <TableCell align="left">{film.tmdbId}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align="right">Origine : </TableCell>
                  <TableCell align="left">
                  <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                        <InputLabel id="detail-origine">Origine</InputLabel>
                        <Select
                            labelId="origine-detail-label"
                            id="origine-detail-select"
                            value={film.origine}
                            label="Origine"
                            onChange={handleChangeOrigine}>
                              {
                                allGenres.map((g,index) => (
                                  <MenuItem key={index} value={g}>{g}</MenuItem>
                                ))
                              }
                        </Select>
                    </FormControl>
                    </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
    </Box>
  );
};

export default FilmDetail;