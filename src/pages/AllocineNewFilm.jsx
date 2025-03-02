import React from 'react';
import { useAxios } from "../helpers/axios-hook";
import * as constants from "../helpers/constants";
import { useEffect, useState } from 'react';
import TablePagination from '@mui/material/TablePagination';
import { useStompjs } from "../helpers/stompjs-hook";
import { Link } from "react-router-dom";
import Spinner from "../components/Spinner";
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import AllocineFilterBar from "../components/AllocineFilterBar";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TableHead from '@mui/material/TableHead';


const AllocineNewFilm = () => {
    const [post, setPost] = useState(null);
    const { axiosAllocineInstance, initialized } = useAxios(null);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(50);
    const [count, setCount] = useState(0);
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 50))
        setPage(0);
    };
    const changeFilter = (newFilter, newSort) => {
        setNewFilter(newFilter)
        setNewSort(newSort)
      }
    const [newFilter, setNewFilter] = useState('');
    const [newSort, setNewSort] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const { stompInitialized, client, message } = useStompjs(false);
    useEffect(() => {
        if (!initialized) {
            return;
        }
        const fetchData = async () => {
            setLoading(true)
            setError(false)
            try {
                let response = await axiosAllocineInstance.allocine_instance.get(constants.allocinePaginatedSearch, {
                    timeout: 4500,
                    params: {
                        query: newFilter ? newFilter : constants.allocineDefaultQuery,
                        sort: newSort ? newSort : constants.allocineDefaultSort,
                        offset: page + 1,
                        limit: rowsPerPage
                    }
                });
                //console.log(response.data.content)
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

    }, [initialized, page, rowsPerPage, newFilter, newSort]);

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
         <AllocineFilterBar changeFilter={changeFilter}></AllocineFilterBar>
          <TableContainer component={Paper}>
            <Table >

            <TableHead>
          <TableRow>
            <TableCell align="left"><b>Title</b></TableCell>
            <TableCell align="left"><b>id</b></TableCell>
            <TableCell align="left"><b>allocineFilmId</b></TableCell>
            <TableCell align="left"><b>url</b></TableCell>
            <TableCell align="left"><b>pageNumber</b></TableCell>
            <TableCell align="left"><b>Creation date</b></TableCell>
          </TableRow>
        </TableHead>

              <TableBody>
                {
                  post && post.map((p, index) => (
                    <TableRow key={index}>
                      <TableCell align="left" sx={{ minWidth: 20 }}>{p.title}</TableCell>
                      <TableCell align="left" sx={{ minWidth: 20 }}>{p.id}</TableCell>
                      <TableCell align="left" sx={{ minWidth: 20 }}> {p.allocineFilmId}</TableCell>
                      <TableCell align="left" sx={{ minWidth: 20 }}><Link to={p.url} href="#">{p.url}</Link></TableCell>
                      <TableCell align="left" sx={{ minWidth: 20 }}>{p.pageNumber}</TableCell>
                      <TableCell align="left" sx={{ minWidth: 20 }}> {p.creationDate}</TableCell>
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

export default AllocineNewFilm;