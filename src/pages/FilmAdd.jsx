import React from 'react';
import { useAxios } from "../helpers/axios-hook";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import * as constants from "../helpers/constants";
import Spinner from "../components/Spinner";
import Alert from '@mui/material/Alert';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useNavigate } from 'react-router-dom';
import NameFormatter from "../components/NameFormatter";

const allTmdbFilmsByTitreUrl = 'films/tmdb/byTitre/';
const saveFilmUrl = 'films/save/'

const FilmAdd = () => {
  const { axiosInstance, initialized } = useAxios(null);
  const [origine, setOrigine] = useState(constants.DVD);
  const [titre, setTitre] = useState('');
  const [films, setFilms] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const handleChangeOrigine = (event) => {
    setOrigine(event.target.value);
  };
  const handleTitre = (event) => {
    setTitre(event.target.value);
  };
  const navigate = useNavigate();
  const addFilm = (tmdbId) => {
    if (!initialized) {
      return;
    }
    if (origine === '') {
      alert('il faut une origine au film pour l\'ajouter');
      return;
    }
    setLoading(true)
    setError(false)
    //console.log(tmdbId,origine)
    const config = { timeout: 3000,headers: {'Content-Type': 'text/plain'} }
    axiosInstance.instance.put(saveFilmUrl+tmdbId, origine,config)
    .then((response) => {
      //console.log(response)
      setError(false)
      setLoading(false)
      navigate('/film-detail/'+response.data.id, { replace: true });
    }).catch(error => {
      console.error(error)
      setError(true)
      setLoading(false)
    });
  }
  
  const search = () => {
    setLoading(true)
    setError(false)
    axiosInstance.instance.get(allTmdbFilmsByTitreUrl  + titre+ '/' + 1, {
      timeout: 15500,
    }).then((response) => {
      //console.log(response)
      setFilms(response.data)
      setError(false)
      setLoading(false)
    }).catch(error => {
      console.error(error)
      setError(true)
      setLoading(false)
    });
  };
  const resetSearch = () => {
    setTitre('')
    setOrigine('')
  };
  const BootstrapButton = styled(Button)({
    boxShadow: 'none',
    textTransform: 'none',
    fontSize: 16,
    padding: '6px 12px',
    border: '1px solid',
    lineHeight: 1.5,
    backgroundColor: '#343a40;',
    borderColor: '#0063cc',
    '&:hover': {
      backgroundColor: '#343a40;',
      boxShadow: 'none',
    },
    '&:active': {
      boxShadow: 'none',
      backgroundColor: '#343a40;',
    },
    '&:focus': {
      boxShadow: '0 0 0 0.2rem rgba(0,123,255,.5)',
    },
  });
  return (
    <Box sx={{ flexGrow: 1 }} >
      <div className="grid-container" >
        <div className="grid-item" >
          <TextField id="titre" label="Titre" variant="standard" onChange={handleTitre} value={titre}/>
        </div>
        <div className="grid-item" >
          <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
            <InputLabel id="origine">Origine</InputLabel>
            <Select
              labelId="origine-label"
              id="origine-select"
              value={origine}
              label="Origine"
              onChange={handleChangeOrigine}>
              <MenuItem value={constants.DVD}>Dvd</MenuItem>
              <MenuItem value={constants.EN_SALLE}>En salle</MenuItem>
              <MenuItem value={constants.CANAL_PLUS}>Canal +</MenuItem>
              <MenuItem value={constants.GOOGLE_PLAY}>Google play</MenuItem>
              <MenuItem value={constants.TV}>Tv</MenuItem>
            </Select>
          </FormControl>
        </div>
        <div className="grid-item" >

          <Stack spacing={2} direction="row">
            <BootstrapButton variant="contained" onClick={search}>Chercher</BootstrapButton>
            <BootstrapButton variant="contained" onClick={resetSearch}>Effacer la recherche</BootstrapButton>
          </Stack>
        </div>
      </div>
      <Box sx={{ flexGrow: 1 }} >
        {
        loading && (
          <Spinner />
        )
      }
      {
        !loading && error && (
          <Alert severity="error">Une erreur est survenue</Alert>
        )
      }
      {
        films && (
          <TableContainer component={Paper}>
          <Table x={{ minWidth: 650 }} size="smsall" aria-label="a dense table">
                  <TableBody>
                    {
                      films.map((f, index) => (
                        <TableRow key={index}>
                          <TableCell align="left" sx={{ minWidth: 100 }}><img src={f.posterPath} alt="" width="200" /></TableCell>
                          <TableCell align="left" sx={{ minWidth: 100 }}><b>{f.titre}</b></TableCell>
                          <TableCell align="left" sx={{ minWidth: 100 }}><b>{f.titreO}</b></TableCell>
                          <TableCell align="left" sx={{ minWidth: 100 }}>
                            <NameFormatter map={f?.acteur}></NameFormatter>
                        </TableCell>
                        <TableCell align="left" sx={{ minWidth: 200 }}>
                          <NameFormatter map={f?.realisateur}></NameFormatter>
                        </TableCell>
                        <TableCell align="left" sx={{ minWidth: 50 }}>{f.annee}</TableCell>
                        <TableCell align="left" sx={{ minWidth: 50 }}>
                          {
                            !f.alreadyInDvdtheque && (
                              <BootstrapButton variant="contained" onClick={() => addFilm(f.tmdbId)}>Ajouter</BootstrapButton>
                            )
                          }
                          {
                            f.alreadyInDvdtheque && (
                              <div>Film déjà enregistré</div>
                            )
                          }
                        </TableCell>
                        
                        </TableRow>
                      ))
                    }
                  </TableBody>
                </Table>
                </TableContainer>
        )
      }
      </Box>
    </Box>
  );
};

export default FilmAdd;