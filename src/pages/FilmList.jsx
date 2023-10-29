import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import { useAxios } from "../helpers/axios-hook";
import FilterBar from "../components/FilterBar";
import { useEffect, useState } from 'react';
import Grid from '@mui/material/Unstable_Grid2';
import Box from '@mui/material/Box';
import TablePagination from '@mui/material/TablePagination';
import { Link } from "react-router-dom";

const paginatedSearch = '/dvdtheque-service/films/paginatedSarch'
const defaultQuery = 'origine:eq:DVD:AND,'
const defaultSort = '-dateInsertion,+titre'

const FilmList = () => {
  const [post, setPost] = useState(null);
  const { axiosInstance, initialized } = useAxios(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [count, setCount] = useState(0);
  const [newFilter, setNewFilter] = useState('');
  const [newSort, setNewSort] = useState('');

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  const changeFilter = (newFilter,newSort) => {
    //console.log('FilmList changeFilter',newFilter,newSort);
    setNewFilter(newFilter);
    setNewSort(newSort)
  }
  useEffect(() => {
    //console.log('FilmList initialized',initialized);
    if (!initialized) {
      return;
    }
    //console.log('axiosInstance',axiosInstance.instance.get(baseURL));
    //const instance = axios.create;
    axiosInstance.instance.get(paginatedSearch, {
      timeout: 1500,
      params: {
        query: newFilter?newFilter:defaultQuery,
        sort: newSort?newSort:defaultSort,
        offset: page + 1,
        limit: rowsPerPage
      }
    })
      .then((response) => {
        setPost(response.data.content);
        setCount(response.data.totalElements);
        //console.log('response', response);
      }).catch(error => console.error(error));

  }, [initialized, page, rowsPerPage,newFilter,newSort]);

  if (!post) return null;

  return (

    <Box sx={{ flexGrow: 1 }} >
      <FilterBar changeFilter={changeFilter}></FilterBar>
      <Grid container spacing={{ xs: 1, md: 1 }} columns={{ xs: 2, sm: 3, md: 12 }}>
        {post.map((p, index) => (
          <Grid key={index} className="myDiv">
            <Card key={index} sx={{ maxWidth: 200 }}>
              <CardActionArea component={Link} to={'/film-detail/'+p.id}>
                <CardMedia
                  component="img"
                  height="305"
                  width="200"
                  image={p.posterPath}
                  title={p.titre}/>
                <CardContent>
                  <Typography variant="body2" color="text.secondary">
                    Durée : {p.runtime}
                  </Typography>
                  {
                    p.dvd && p.origine === 'DVD' && p.dvd.ripped &&
                    (
                      <Typography variant="body2" color="text.secondary">
                    {p.origine} Rippé : &nbsp;<img
                        src="src/assets/img/ko.png"></img>
                  </Typography>
                    )
                  }
                  {
                    p.dvd && p.origine === 'DVD' && !p.dvd.ripped &&
                    (
                      <Typography variant="body2" color="text.secondary">
                    {p.origine} Rippé : &nbsp;<img
                        src="src/assets/img/ok.png"></img>
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
                    Vu : &nbsp; <img src="src/assets/img/ok.png"/>
                  </Typography>
                    )
                  }
                  {
                    !p.vu &&
                    (
                      <Typography variant="body2" color="text.secondary">
                    Vu : &nbsp; <img src="src/assets/img/ko.png"/>
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