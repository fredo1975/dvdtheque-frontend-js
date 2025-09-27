import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import { useAxios } from "../helpers/axios-hook";
import FilterBar from "../components/FilterBar";
import { useEffect, useState } from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import TablePagination from '@mui/material/TablePagination';
import { Link } from "react-router-dom";
import Spinner from "../components/Spinner";
import Alert from '@mui/material/Alert';
import * as constants from "../helpers/constants";
import { useStompjs } from "../helpers/stompjs-hook";
import Cookies from 'js-cookie';

const paginatedSearchUrl = constants.paginatedSearch

const FilmList = () => {
  const [post, setPost] = useState(null);
  const { axiosInstance, initialized } = useAxios(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(50);
  const [count, setCount] = useState(0);
  const [newFilter, setNewFilter] = useState('');
  const [newSort, setNewSort] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const { stompInitialized, client, message } = useStompjs(false);
  
  // Ajout : prise en compte du cookie à l'ouverture de l'onglet
  useEffect(() => {
    // On lit la valeur du cookie à chaque "montage" (changement d'onglet)
    const origine = Cookies.get('film_origine');
    if (origine) {
      // On construit un filtre qui prend en compte l'origine
      // Ici, on suppose que le filtre est de la forme "origine:eq:DVD:AND,"
      const query = `origine:eq:${origine}:AND,`;
      setNewFilter(query);
    }
  }, []); // [] = au montage seulement


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
  useEffect(() => {
    if (!initialized) {
      return;
    }
    const fetchData = async () => {
      setLoading(true)
      setError(false)
      try {
        let response = await axiosInstance.instance.get(paginatedSearchUrl, {
          timeout: 5000,
          params: {
            query: newFilter ? newFilter === 'allCategory' ? '' : newFilter : constants.defaultQuery,
            sort: newSort ? newSort : constants.defaultSort,
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

  //if (!post) return null;

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
      <Grid container spacing={{ xs: 1, md: 2}} columns={{ xs: 2, sm: 3, md: 11 }}>
        {post && post.map((p, index) => (
          <Grid item md={1} key={index}>
            <Card md={1} key={index}>
              <CardActionArea component={Link} to={'/film-detail/' + p.id}>
                <CardMedia
                  component="img"
                  image={p.posterPath}
                  title={p.titre} />
                <CardContent>
                  <Typography variant="body2" color="text.secondary">
                    Durée : {p.runtime}
                  </Typography>
                  {
                    p.dvd && p.origine === 'DVD' && p.dvd.ripped &&
                    (
                      <Typography variant="body2" color="text.secondary">
                        {p.origine} Rippé : &nbsp;<img
                          src="assets/img/ok.png"></img>
                      </Typography>
                    )
                  }
                  {
                    p.dvd && p.origine === 'DVD' && !p.dvd.ripped &&
                    (
                      <Typography variant="body2" color="text.secondary">
                        {p.origine} Rippé : &nbsp;<img
                          src="assets/img/ko.png"></img>
                      </Typography>
                    )
                  }
                  {
                    p.origine != 'DVD' &&
                    (
                      <Typography variant="body2" color="text.secondary">
                        Origine : &nbsp;{p.origine}
                      </Typography>
                    )
                  }
                  {
                    p.vu &&
                    (
                      <Typography variant="body2" color="text.secondary">
                        Vu : &nbsp; <img src="assets/img/ok.png" />
                      </Typography>
                    )
                  }
                  {
                    !p.vu &&
                    (
                      <Typography variant="body2" color="text.secondary">
                        Vu : &nbsp; <img src="assets/img/ko.png" />
                      </Typography>
                    )
                  }
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>

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

export default FilmList;