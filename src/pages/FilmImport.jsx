import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { useState } from 'react';
import { useAxios } from "../helpers/axios-hook";
import * as constants from "../helpers/constants";
import Spinner from "../components/Spinner";
import Alert from '@mui/material/Alert';

const FilmImport = () => {
  const [file, setFile] = useState(null);
  const { axiosInstance, initialized } = useAxios(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const importFile = (event) => {
    if (!event) {
      return
    }
    const file = event?.target?.files;
    if (!file || !file[0]) {
      return
    }
    setFile(file[0])
  }
  const launch = () => {
    setLoading(true)
    setError(false)
    const formData = new FormData();
    formData.append('file', file);
    const config = { timeout: 0}
    axiosInstance.instance.post(constants.importUrl, formData,config)
      .then((response) => {
        setError(false)
        setLoading(false)
      }).catch(error => {
        console.error(error)
        setError(true)
        setLoading(false)
      })
  }
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
  const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    backgroundColor: '#343a40;',
    width: 1,
  })

  const ColorButton = styled(Button)(({ theme }) => ({
    backgroundColor: '#343a40;',
    '&:hover': {
      backgroundColor: '#343a40;',
    },
  }));
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
      <h2>Importer des films au format Excel ou CSV</h2>
      <h3>Realisateur | Titre | Annee | Acteurs | Origine Film | TMDB ID | Vu | Date Vu | Date insertion | Zonedvd | Rippé |
        RIP Date
        | Dvd Format | Date Sortie DVD</h3>

      <div className="grid-container" >
        <div className="grid-item" >
          <Stack spacing={2} direction="row">
            <ColorButton component="label" variant="contained"
              startIcon={<CloudUploadIcon />} onChange={importFile}>
              Sélectionner un fichier<VisuallyHiddenInput type="file" />
            </ColorButton>
          </Stack>
        </div>
        <div className="grid-item" >
          <Stack spacing={2} direction="row">
            {file?.name}
          </Stack>
        </div>
        <div className="grid-item" >
          <Stack spacing={2} direction="row">
            <BootstrapButton variant="contained" onClick={launch} disabled={!file}>Lancer l'import</BootstrapButton>
          </Stack>
        </div>
      </div>
    </Box>
  );
};


export default FilmImport;