import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import { useAxios } from "../helpers/axios-hook";
import { useEffect, useState } from 'react';
import Grid from '@mui/material/Unstable_Grid2';
import Box from '@mui/material/Box';
import TablePagination from '@mui/material/TablePagination';

const baseURL = '/dvdtheque-service/films';
const paginatedSearch = '/dvdtheque-service/films/paginatedSarch'
const FilmList = () => {
  const [post, setPost] = useState(null);
  const {axiosInstance, initialized} = useAxios(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [count, setCount] = useState(0);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  useEffect(() => {
    //console.log('FilmList initialized',initialized);
    if (!initialized) {
      return;
    }
    //console.log('axiosInstance',axiosInstance.instance.get(baseURL));
    //const instance = axios.create;
    console.log('FilmList rowsPerPage',page);
    axiosInstance.instance.get(paginatedSearch, {timeout: 1500,
      params: {
        query: 'origine:eq:DVD:AND,',
        sort: '-dateInsertion,+titre',
        offset: page+1,
        limit: rowsPerPage
      }})
    .then((response) => {
      setPost(response.data.content);
      setCount(response.data.totalElements);
      console.log('response',response);
    }).catch(error => console.error(error));
    
  }, [initialized,page,rowsPerPage]);

  if (!post) return null;

  return (

<Box sx={{ flexGrow: 1 }} >
    <Grid container spacing={{ xs: 1, md: 1 }} columns={{ xs: 2, sm: 4, md: 12 }}>
  {post.map((p, index) => (
    <Grid xs={1} key={index} className="myDiv">
      <Card sx={{ maxWidth: 200 }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="305"
          width="200"
          image={p.posterPath}
          alt="green iguana"
        />
        <CardContent>
          <Typography variant="body2" color="text.secondary">
          {p.titre}
          </Typography>
          <Typography variant="body2" color="text.secondary">
          Durée : {p.runtime}
          </Typography>
          
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