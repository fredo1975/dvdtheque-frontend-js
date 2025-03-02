import { useEffect, useState } from 'react';
import * as constants from "../helpers/constants";
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

const AllocineFilterBar = ({changeFilter}) => {
    const [title, setTitle] = useState('');
    const [sort, setSort] = useState('');
    
    const handleChangeTitle = (event) => {
        setTitle(event.target.value);
    };
    
    const handleChangeSort = (event) => {
        setSort(event.target.value);
    };
    const buildSort = () => {
        let sortBy = ''
        if(sort){
            if(sort === 'creationDate asc'){
                sortBy += '+creationDate,'
            }else if(sort === 'creationDate desc'){
                sortBy += '-creationDate,'
            }
        }
        return sortBy;
    }
    const buildQuery = () => {
        let query = ''
        if(titre.value){
            query += 'title:eq:'+titre.value+':AND,'
        }
        
        return query
    }
    const filter = () => {
        //console.log('filter titre.value='+titre.value)
        const query = buildQuery()
        const sort = buildSort()
        changeFilter(query,sort)
    };
    const resetFilter = () => {
        titre.value = ''
        changeFilter('','')
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
                    <TextField id="titre" label="Titre" variant="standard"/>
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
                            {constants.allocineSortByOptions && constants.allocineSortByOptions.map((p, index) => (
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
export default AllocineFilterBar;