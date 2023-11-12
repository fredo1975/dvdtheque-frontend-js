import React from 'react';
import { useAxios } from "../helpers/axios-hook";
import FilterBar from "../components/FilterBar";
import { useEffect, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Box from '@mui/material/Box';
import TablePagination from '@mui/material/TablePagination';
import Spinner from "../components/Spinner";
import Alert from '@mui/material/Alert';
import * as constants from "../helpers/constants";
import Paper from '@mui/material/Paper';
import NameFormatter from "../components/NameFormatter";
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';

const removeFilmUrl = import.meta.env.VITE_BACKEND_URL + '/films/remove/'

const Admin = () => {
  const [post, setPost] = useState(null);
  const { axiosInstance, initialized } = useAxios(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [count, setCount] = useState(0);
  const [newFilter, setNewFilter] = useState('');
  const [newSort, setNewSort] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [removed, setRemoved] = useState(false);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0);
  };
  const changeFilter = (newFilter, newSort) => {
    setNewFilter(newFilter)
    setNewSort(newSort)
  }
  useEffect(() => {
    if (!initialized) {
      return;
    }
    const fetchData = async () => {
      setLoading(true)
      setError(false)
      try {
        let response = await axiosInstance.instance.get(import.meta.env.VITE_BACKEND_URL + constants.paginatedSearch, {
          timeout: 2500,
          params: {
            query: newFilter ? newFilter : constants.defaultQuery,
            sort: newSort ? newSort : constants.defaultSort,
            offset: page + 1,
            limit: rowsPerPage
          }
        });
        //console.log(response.data.content)
        setRemoved(false)
        setPost(response.data.content);
        setCount(response.data.totalElements)
        setError(false)
        setLoading(false)
      } catch (error) {
        console.error(error)
        setError(true)
        setLoading(false)
      }
    }
    fetchData()
  }, [initialized, page, rowsPerPage, newFilter, newSort,removed]);

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

  const remove = (id) => {
    //const confir = confirm('Sûr de supprimer le film ?')
   // if (confir) {
      setLoading(true)
      setError(false)
      axiosInstance.instance.put(removeFilmUrl + id,null, {
        timeout: 1500,
      }).then((response) => {
        console.log(response)
        setRemoved(true)
        setError(false)
        setLoading(false)
      }).catch(error => {
        console.error(error)
        setError(true)
        setLoading(false)
      });
    //}
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
      <FilterBar changeFilter={changeFilter}></FilterBar>

      <TableContainer component={Paper}>
        <Table >
          <TableBody>
            {
              post && post.map((p, index) => (
                <TableRow key={index}>
                  <TableCell align="left" sx={{ minWidth: 100 }}><img src={p.posterPath} alt="" width="200" /></TableCell>
                  <TableCell align="left" sx={{ minWidth: 20 }}><b> {p.titre}</b></TableCell>
                  <TableCell align="left" sx={{ minWidth: 20 }}><b> {p.titreO}</b></TableCell>
                  <TableCell align="left" sx={{ minWidth: 20 }}><NameFormatter map={p?.acteur}></NameFormatter></TableCell>
                  <TableCell align="left" sx={{ minWidth: 20 }}><NameFormatter map={p?.realisateur}></NameFormatter></TableCell>
                  <TableCell align="left" sx={{ minWidth: 20 }}><b> {p.annee}</b></TableCell>
                  <TableCell align="left" sx={{ minWidth: 100 }}>
                    <Stack spacing={2} direction="row">
                      <BootstrapButton variant="contained" onClick={() => remove(p.id)}>Supprimer</BootstrapButton>
                    </Stack>
                  </TableCell>
                </TableRow>
              ))
            }
          </TableBody>
        </Table>
      </TableContainer>

      <TablePagination
        component="div"
        count={count}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Box>
  );
};

export default Admin;