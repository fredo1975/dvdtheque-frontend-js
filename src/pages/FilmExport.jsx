import React from 'react';
import { useEffect, useState } from 'react';
import { useAxios } from "../helpers/axios-hook";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import * as constants from "../helpers/constants";
import Spinner from "../components/Spinner";
import Alert from '@mui/material/Alert';

const FilmExport = () => {
  const [origine, setOrigine] = useState(constants.TOUS);
  const [data, setData] = useState(null);
  const { axiosInstance, initialized } = useAxios(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const handleChangeOrigine = (event) => {
    setOrigine(event.target.value);
  }
  const exportFile = () => {
    setLoading(true)
    setError(false)
    const config = { timeout: 6500,headers: {'Content-Type': 'text/plain'} }
    axiosInstance.instance.post(constants.exportUrl, origine,config)
      .then((response) => {
        console.log('exportFile',response)
        setData(response.data)
        setError(false)
        setLoading(false)
      }).catch(error => {
        console.error(error)
        setError(true)
        setLoading(false)
      });
  }
  const resetFilter = () => {
    setOrigine(constants.TOUS)
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

      <div className="grid-container" >
        <div className="grid-item" >
          <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
            <InputLabel id="origine">Origine</InputLabel>
            <Select
              labelId="origine-label"
              id="origine-select"
              value={origine}
              label="Origine"
              onChange={handleChangeOrigine}>
              <MenuItem value={constants.TOUS}>Tous</MenuItem>
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
            <BootstrapButton variant="contained" onClick={exportFile}>Exporter</BootstrapButton>
            <BootstrapButton variant="contained" onClick={resetFilter}>Effacer l'origine</BootstrapButton>
          </Stack>
        </div>
      </div>
    </Box>
  );
};

export default FilmExport;