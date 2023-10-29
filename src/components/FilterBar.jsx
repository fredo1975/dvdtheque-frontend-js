import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import { useAxios } from "../helpers/axios-hook";

const allCategoriesUrl = '/dvdtheque-service/films/genres'
const rippedOptions = ['rippé', 'non rippé']
const vuOptions = ['vu', 'non vu']
const sortByOptions = ['titre asc', 'titre desc', 'realisateur asc', 'realisateur desc', 'acteur asc', 'acteur desc', 'annee asc', 'annee desc']
const DVD = 'DVD'
const EN_SALLE = 'EN_SALLE'
const CANAL_PLUS = 'CANAL_PLUS'
const GOOGLE_PLAY = 'GOOGLE_PLAY'
const TV = 'TV'

const FilterBar = ({changeFilter}) => {
    const [origine, setOrigine] = useState(DVD);
    const [categorie, setCategorie] = useState('');
    const [dejavu, setDejavu] = useState('');
    const [rip, setRip] = useState('');
    const [sort, setSort] = useState('');
    const [allCategories, setAllCategories] = useState(null);
    const { axiosInstance, initialized } = useAxios(null);

    useEffect(() => {
        if (!initialized) {
            return;
        }
        axiosInstance.instance.get(allCategoriesUrl, {
            timeout: 1500,

        })
            .then((response) => {
                setAllCategories(response.data);
                console.log('response', response);
            }).catch(error => console.error(error));
    }, [initialized]);

    const handleChangeOrigine = (event) => {
        setOrigine(event.target.value);
    };
    const handleChangeCategorie = (event) => {
        setCategorie(event.target.value);
    };
    const handleChangeDejavu = (event) => {
        setDejavu(event.target.value);
    };
    const handleChangeRip = (event) => {
        setRip(event.target.value);
    };
    const handleChangeSort = (event) => {
        setSort(event.target.value);
    };
    const buildSort = () => {
        let sortBy = ''
        if(sort){
            //console.log('buildSort sort is not null',sort)
            if(sort === 'titre asc'){
                sortBy += '+titre,'
              }else if(sort === 'titre desc'){
                sortBy += '-titre,'
              }else if(sort === 'annee asc'){
                sortBy += '+annee,'
              }else if(sort === 'annee desc'){
                sortBy += '-annee,'
              }else if(sort === 'acteur asc'){
                sortBy += '+acteur,'
              }else if(sort === 'acteur desc'){
                sortBy += '-acteur,'
              }
        }
        return sortBy;
    }
    const buildQuery = () => {
        let query = ''
        if(titre.value){
            //console.log('filter titre is not null',titre.value)
            query += 'titre:eq:'+titre.value+':AND,'
        }
        if(realisateur.value){
            //console.log('filter realisateur is not null',realisateur.value)
            query += 'realisateur:eq:'+realisateur.value+':AND,'
        }
        if(acteur.value){
            //console.log('filter acteur is not null',acteur.value)
            query += 'acteur:eq:'+acteur.value+':AND,'
        }
        if(origine){
            //console.log('filter origine is not null',origine)
            query += 'origine:eq:'+origine+':AND,'
        }
        if(categorie){
            //console.log('filter categorie is not null',categorie)
            query += 'genre:eq:'+categorie+':AND,'
        }
        if(dejavu){
            //console.log('filter dejavu is not null',dejavu)
            if(dejavu === 'vu'){
                query += 'vu:eq:true:AND,'
            }else{
                query += 'vu:eq:false:AND,'
            }
        }
        if(rip){
            //console.log('filter rip is not null',rip)
            if(dejavu === 'rippé'){
                query += 'dvd:eq:true:AND,'
            }else{
                query += 'dvd:eq:false:AND,'
            }
        }
        return query
    }
    const filter = () => {
        const query = buildQuery()
        const sort = buildSort()
        //console.log('filter',query,sort)
        changeFilter(query,sort)
    };
    const resetFilter = () => {
        titre.value = ''
        realisateur.value = ''
        acteur.value = ''
        setOrigine('')
        setCategorie('')
        setDejavu('')
        setRip('')
        setSort('')
        const query = '';
        //console.log('filter',query)
        changeFilter(query)
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
                    <TextField id="titre" label="Titre" variant="standard" />
                </div>
                <div className="grid-item" >
                    <TextField id="realisateur" label="réalisateur" variant="standard" />
                </div>
                <div className="grid-item" >
                    <TextField id="acteur" label="acteur" variant="standard" />
                </div>
                <div className="grid-item" >
                    <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                        <InputLabel id="origine">Origine</InputLabel>
                        <Select
                            labelId="origine-label"
                            id="origine-select"
                            value={origine}
                            label="Origine"
                            onChange={handleChangeOrigine}
                        >
                            <MenuItem value={DVD}>Dvd</MenuItem>
                            <MenuItem value={EN_SALLE}>En salle</MenuItem>
                            <MenuItem value={CANAL_PLUS}>Canal +</MenuItem>
                            <MenuItem value={GOOGLE_PLAY}>Google play</MenuItem>
                            <MenuItem value={TV}>Tv</MenuItem>
                        </Select>
                    </FormControl>
                </div>
                <div className="grid-item" >
                    <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                        <InputLabel id="categorie">Catégorie</InputLabel>
                        <Select
                            labelId="categorie-label"
                            id="categorie-select"
                            value={categorie}
                            label="Catégorie"
                            onChange={handleChangeCategorie}
                        >
                            {allCategories && allCategories.map((p, index) => (
                                <MenuItem key={p} value={p.name}>{p.name}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </div>
                <div className="grid-item" >
                    <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                        <InputLabel id="dejavu">Déjà Vu</InputLabel>
                        <Select
                            labelId="dejavu-label"
                            id="dejavu-select"
                            value={dejavu}
                            label="Déjà Vu"
                            onChange={handleChangeDejavu}
                        >
                             {vuOptions && vuOptions.map((p, index) => (
                                <MenuItem key={p} value={p}>{p}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </div>
                <div className="grid-item" >
                    <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                        <InputLabel id="rip">Rippé</InputLabel>
                        <Select
                            labelId="rip-label"
                            id="rip-select"
                            value={rip}
                            label="Rippé"
                            onChange={handleChangeRip}
                        >
                            {rippedOptions && rippedOptions.map((p, index) => (
                                <MenuItem key={p} value={p}>{p}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </div>
                <div className="grid-item" >
                    <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                        <InputLabel id="sort">Trié par</InputLabel>
                        <Select
                            labelId="sort-label"
                            id="sort-select"
                            value={sort}
                            label="Trié par"
                            onChange={handleChangeSort}
                        >
                            {sortByOptions && sortByOptions.map((p, index) => (
                                <MenuItem key={p} value={p}>{p}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </div>
                <div className="grid-item" >

                    <Stack spacing={2} direction="row">

                        <BootstrapButton variant="contained" onClick={filter}>Filtrer</BootstrapButton>

                        <BootstrapButton variant="contained" onClick={resetFilter}>Effacer les filtres</BootstrapButton>
                    </Stack>
                </div>
            </div>
        </Box>
    )
}
export default FilterBar;