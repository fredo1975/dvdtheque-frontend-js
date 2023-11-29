import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';

const FilmImport = () => {

    const importFile = () => {
    }
    const launch = () => {
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
    
    return (
        <Box sx={{ flexGrow: 1 }} >
            <h2>Importer des films au format Excel ou CSV</h2>
            <h3>Realisateur | Titre | Annee | Acteurs | Origine Film | TMDB ID | Vu | Date Vu | Date insertion | Zonedvd | Rippé |
                RIP Date
                | Dvd Format | Date Sortie DVD</h3>

                <div className="grid-container" >
                <div className="grid-item" >
          <Stack spacing={2} direction="row">
          <BootstrapButton variant="contained" onClick={importFile}>Séléctionner un fichier</BootstrapButton>
          <BootstrapButton variant="contained" onClick={launch}>Lancer l'import</BootstrapButton>
            
          </Stack>
        </div>
                </div>
        </Box>

        
    );
};


export default FilmImport;