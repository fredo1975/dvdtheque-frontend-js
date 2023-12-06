import React from 'react';
import { useParams } from 'react-router-dom';
import { useEffect, useState, useRef } from 'react';
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
import Spinner from "../components/Spinner";
import Alert from '@mui/material/Alert';
import { useStompjs } from "../helpers/stompjs-hook";

const filmDisplay = '/films/byId/'
const filmUpdateUrl = '/films/update/'
const allCategoriesUrl = '/films/genres'
const allOrigines = ['DVD', 'EN_SALLE', 'CANAL_PLUS', 'GOOGLE_PLAY', 'TV']
const zonesDvd = [1, 2, 3]
const formatsDvd = ['DVD', 'BLUERAY']
const FilmDetail = () => {
  const { axiosInstance, initialized } = useAxios(null)
  const { stompInitialized, client, message } = useStompjs(false);
  const [film, setFilm] = useState(null)
  const [origine, setOrigine] = useState(null)
  const [zone, setZone] = useState(null)
  const [format, setFormat] = useState(null)
  const [ripped, setRipped] = useState(false)
  const [dateRip, setDateRip] = useState('')
  const [vu, setVu] = useState(false);
  const [dateVue, setDateVue] = useState('')
  const [dateInsertion, setDateInsertion] = useState('')
  const [dateSortieDvd, setDateSortieDvd] = useState('')
  const [allGenres, setAllGenres] = useState(null)
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [updated, setUpdated] = useState(false);
  const isMounted = useRef(true)
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

  useEffect(() => {
    if (!initialized) {
      return;
    }
    
    const fetchData = async () => {
      setLoading(true)
      setError(false)
      try {
        let response1 = await axiosInstance.instance.get(filmDisplay + id, {
          timeout: 5500,
        });
        setFilm(response1.data)
        setOrigine(response1.data.origine);
        setZone(response1.data?.dvd?.zone);
        setFormat(response1.data?.dvd?.format);
        setRipped(response1.data?.dvd?.ripped);
        setDateRip(response1.data && response1.data.dvd && response1.data.dvd.dateRip ? dayjs(response1.data.dvd.dateRip).format('DD/MM/YYYY') : '');
        setVu(response1.data.vu)
        setDateVue(response1.data && response1.data.dateVue ? dayjs(response1.data.dateVue).format('DD/MM/YYYY') : '')
        setDateInsertion(response1.data.dateInsertion)
        setDateSortieDvd(response1.data.dateSortieDvd)
        //console.log(response1.data)
        let response2 = axiosInstance.instance.get(allCategoriesUrl, {
          timeout: 5500,
        });
        setAllGenres(response2.data);
        setError(false)
        setLoading(false)
      } catch (error) {
        console.error(error)
        setError(true)
        setLoading(false)
      }
    }
    fetchData()

  }, [initialized, id]);

  useEffect(() => {
    return () => {
      isMounted.current = false
    }
  }, []);

  const handleChangeOrigine = (event) => {
    setOrigine(event.target.value)
  };
  const handleChangeZoneDvd = (event) => {
    setZone(event.target.value)
  };
  const handleChangeFormatDvd = (event) => {
    setFormat(event.target.value)
  };
  const handleRipChange = (event) => {
    setRipped(event.target.checked)
    if (event.target.checked) {
      setDateRip(dayjs().format('DD/MM/YYYY'));
    } else {
      setDateRip('');
    }
  };
  const handleVuChange = (event) => {
    setVu(event.target.checked)
    if (event.target.checked) {
      setDateVue(dayjs().format('DD/MM/YYYY'));
    } else {
      setDateVue('');
    }
  };
  const setDateSortieDvdFilm = (newValue) => {
    setDateSortieDvd(newValue);
  }
  const setDateInsertionFilm = (newValue) => {
    setDateInsertion(newValue)
  }

  const updateFilm = () => {
    let filmToUpdate;
    if(origine === 'DVD'){
      filmToUpdate = {
        ...film,
        dvd: {
          ...film.dvd,
          zone,
          format,
          ripped,
          dateRip: dayjs(dateRip, 'DD/MM/YYYY'),
        },
        origine,
        vu,
        dateVue: dayjs(dateVue, 'DD/MM/YYYY').add(6, 'hour'),
        dateInsertion: dayjs(dateInsertion, 'YYYY-MM-DD'),
        dateSortieDvd: dayjs(dateSortieDvd, 'YYYY-MM-DD'),
      }
    }else{
      filmToUpdate = {
        ...film,
        origine,
        vu,
        dateVue: dayjs(dateVue, 'DD/MM/YYYY').add(6, 'hour'),
        dateInsertion: dayjs(dateInsertion, 'YYYY-MM-DD'),
        dateSortieDvd: dayjs(dateSortieDvd, 'YYYY-MM-DD'),
      }
    }
    
    axiosInstance.instance.put(filmUpdateUrl + id, {
      ...filmToUpdate,
      timeout: 1500,
    }).then((response) => {
      setFilm(response.data)
      setOrigine(response.data.origine);
      setZone(response.data?.dvd?.zone);
      setFormat(response.data?.dvd?.format);
      setRipped(response.data?.dvd?.ripped);
      setDateRip(response.data?.dvd?.dateRip ? dayjs(response.data?.dvd?.dateRip).format('DD/MM/YYYY') : '');
      setVu(response.data.vu)
      setDateVue(response.data?.dateVue ? dayjs(response.data?.dateVue).format('DD/MM/YYYY') : '')
      setDateInsertion(response.data.dateInsertion)
      setUpdated(true)
    }).catch(error => console.error(error));
  };

  return (
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
      { film && (
      <Grid container spacing={1}>
        <Grid item xs={3}>
          <img src={film.posterPath} />
        </Grid>
        <Grid item xs={12} sm container>
          <TableContainer component={Paper}>
            <Table >
              <TableBody>
                {
                  updated && (
                  <TableRow>
                  <TableCell align="center" sx={{ minWidth: 200 }} colSpan={2}><Alert severity="success">film modifié</Alert></TableCell>
                </TableRow>
                  )
                }
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
                  <TableCell align="left">{dayjs(film.dateSortie).format('DD/MM/YYYY')}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align="right">Réalisateur : </TableCell>
                  <TableCell align="left">
                    {
                      film?.realisateur.map(r => (
                        r.nom + ','
                      ))
                    }
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align="right">Catégorie : </TableCell>
                  <TableCell align="left">
                    {
                      film?.genre.map((g, index) => (
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
                      film?.acteur.map((a, index) => (
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
                        format="DD/MM/YYYY"
                        defaultValue={dayjs(film?.dateSortieDvd)}
                        onChange={(newValue) => setDateSortieDvdFilm(newValue)} />
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
                        format="DD/MM/YYYY"
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
                {
                  updated && (
                  <TableRow>
                  <TableCell align="center" sx={{ minWidth: 200 }} colSpan={2}><Alert severity="success">film modifié</Alert></TableCell>
                </TableRow>
                  )
                }
              </TableBody>
            </Table>
            {
              film.critiquePresse && (
                <Table x={{ minWidth: 650 }} size="smsall" aria-label="a dense table">
                  <TableBody>
                    {
                      film.critiquePresse.map((cp, index) => (
                        <TableRow key={index}>
                          <TableCell align="left" sx={{ minWidth: 100 }}><b> {cp.newsSource}</b></TableCell>
                          <TableCell align="left" sx={{ minWidth: 60 }}>Note : {cp.rating}</TableCell>
                          <TableCell align="left">{cp.body}</TableCell>
                        </TableRow>
                      ))
                    }
                  </TableBody>
                </Table>
              )
            }
          </TableContainer>
        </Grid>
      </Grid>
      )}
    </Box>
  );
};

export default FilmDetail;