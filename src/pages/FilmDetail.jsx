import React from 'react';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useAxios } from "../helpers/axios-hook";
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';

const filmDisplay = '/dvdtheque-service/films/byId/'
const allCategoriesUrl = '/dvdtheque-service/films/genres'
const allOrigines = ['DVD', 'EN_SALLE', 'CANAL_PLUS', 'GOOGLE_PLAY', 'TV']
const zonesDvd = [1, 2, 3]
const formatsDvd = ['DVD', 'BLUERAY']
const FilmDetail = () => {
  const { axiosInstance, initialized } = useAxios(null);
  const [film, setFilm] = useState(null);
  const [origine, setOrigine] = useState(null);
  const [zone, setZone] = useState(null);
  const [format, setFormat] = useState(null);
  const [ripped, setRipped] = useState(false);
  const [dateRip, setDateRip] = useState('');
  const [vu, setVu] = useState(false);
  const [dateVue, setDateVue] = useState('');
  const [dateInsertion,setDateInsertion ] = useState('');
  const [allGenres, setAllGenres] = useState(null);

  const { id } = useParams();

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
      setOrigine(response.data.origine);
      setZone(response.data?.dvd?.zone);
      setFormat(response.data?.dvd?.format);
      setRipped(response.data?.dvd?.ripped);
      setDateRip(response.data?.dvd?.dateRip);
      setVu(response.data.vu)
      setDateVue(response.data.dateVue)
      setDateInsertion(response.data.dateInsertion)
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
    //console.log('handleChangeOrigine', event.target.value);
    setOrigine(event.target.value)
  };
  const handleChangeZoneDvd = (event) => {
    //console.log('handleChangeOrigine', event.target.value);
    setZone(event.target.value)
  };
  const handleChangeFormatDvd = (event) => {
    //console.log('handleChangeOrigine', event.target.value);
    setFormat(event.target.value)
  };
  const handleRipChange = (event) => {
    console.log('handleRipChange', event.target.checked);
    setRipped(event.target.checked)
    if (event.target.checked) {
      const dateRip = new Date().toLocaleDateString();
      console.log('handleRipChange', dateRip);
      setDateRip(dateRip);
    } else {
      setDateRip('');
    }
  };
  const handleVuChange = (event) => {
    console.log('handleVuChange', event.target.checked);
    setVu(event.target.checked)
    if (event.target.checked) {
      const dateVue = new Date().toLocaleDateString();
      console.log('handleRipChange', dateVue);
      setDateVue(dateVue);
    } else {
      setDateVue('');
    }
  };
  const setDateSortieDvd = (newValue) => {
    console.log('setDateSortieDvd', newValue);
  }
  const setDateInsertionFilm = (newValue) => {
    console.log('setDateInsertionFilm', newValue);
  }

  const updateFilm = () => {
    const filmToUpdate = {
      ...film,
      dvd: {...film.dvd,
        zone,
        format,
        ripped,
        dateRip,},
      origine,
      vu,
      dateVue,
      dateInsertion,
    }
    console.log('updateFilm',filmToUpdate);
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
                  <TableCell align="right">Catégorie : </TableCell>
                  <TableCell align="left">
                    {
                      film.genre.map((g, index) => (
                        g.name + ','
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
                      film.acteur.map((a, index) => (
                        <img title={a.nom} key={index} className="acteurs" src={a.profilePath} />
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
                        value={origine}
                        label="Origine"
                        onChange={handleChangeOrigine}>
                        {
                          allOrigines.map((g, index) => (
                            <MenuItem key={index} value={g}>{g}</MenuItem>
                          ))
                        }
                      </Select>
                    </FormControl>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align="right">Sortie DVD : </TableCell>
                  <TableCell align="left">
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DatePicker
                        label="Sortie DVD"
                        defaultValue={dayjs(film?.dateSortieDvd)}
                        onChange={(newValue) => setDateSortieDvd(newValue)} />
                    </LocalizationProvider>
                  </TableCell>
                </TableRow>
                {
                  origine === 'DVD' && (
                    <TableRow>
                      <TableCell align="right">Zone DVD : </TableCell>
                      <TableCell align="left">
                        <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                          <InputLabel id="detail-zonedvd">Zone DVD</InputLabel>
                          <Select
                            labelId="zonedvd-detail-label"
                            id="zonedvd-detail-select"
                            value={zone}
                            label="Zone Dvd"
                            onChange={handleChangeZoneDvd}>
                            {
                              zonesDvd.map((g, index) => (
                                <MenuItem key={index} value={g}>{g}</MenuItem>
                              ))
                            }
                          </Select>
                        </FormControl>
                      </TableCell>
                    </TableRow>
                  )
                }
                {
                  origine === 'DVD' && (
                    <TableRow>
                      <TableCell align="right">Format DVD : </TableCell>
                      <TableCell align="left">
                        <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                          <InputLabel id="detail-origine">Format DVD</InputLabel>
                          <Select
                            labelId="formatdvd-detail-label"
                            id="formatdvd-detail-select"
                            value={format}
                            label="Origine"
                            onChange={handleChangeFormatDvd}>
                            {
                              formatsDvd.map((g, index) => (
                                <MenuItem key={index} value={g}>{g}</MenuItem>
                              ))
                            }
                          </Select>
                        </FormControl>
                      </TableCell>
                    </TableRow>
                  )
                }
                {
                  origine === 'DVD' && (
                    <TableRow>
                      <TableCell align="right">
                        <FormGroup>
                          <FormControlLabel
                            control={
                              <Checkbox checked={ripped} onChange={handleRipChange} name="rip" />
                            } label="Rippé" />
                        </FormGroup>
                      </TableCell>
                      <TableCell align="left">
                        {dateRip}
                      </TableCell>
                    </TableRow>
                  )
                }
                <TableRow>
                  <TableCell align="right">
                    <FormGroup>
                      <FormControlLabel
                        control={
                          <Checkbox checked={vu} onChange={handleVuChange} name="vu" />
                        } label="Vu" />
                    </FormGroup>
                  </TableCell>
                  <TableCell align="left">
                    {dateVue}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align="right">Ajouté le : </TableCell>
                  <TableCell align="left">
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DatePicker
                        label="Ajouté le"
                        defaultValue={dayjs(film?.dateInsertion)}
                        onChange={(newValue) => setDateInsertionFilm(newValue)} />
                    </LocalizationProvider>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align="right"></TableCell>
                  <TableCell align="left">
                  <BootstrapButton variant="contained" onClick={updateFilm}>Sauver les modifications</BootstrapButton>
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