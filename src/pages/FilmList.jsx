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

const baseURL = '/dvdtheque-service/films';

const FilmList = () => {
  const [post, setPost] = useState(null);
  const { axiosInstance, initialized } = useAxios(null);

  const test = 'fredo'
  useEffect(() => {
    //console.log('FilmList initialized',initialized);
    if (!initialized) {
      return;
    }
    //console.log('axiosInstance',axiosInstance.instance.get(baseURL));
    //const instance = axios.create;
    //console.log('FilmList axiosInstance',axiosInstance);
    axiosInstance.instance.get(baseURL, {timeout: 1500})
    .then((response) => {
      setPost(response.data);
      console.log('response',response);
    }).catch(error => console.error(error));
    
  }, [initialized]);

  if (!post) return null;

  return (

<Box sx={{ flexGrow: 1 }}>
    <Grid container spacing={3}>
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
</Box>
  );
};

export default FilmList;