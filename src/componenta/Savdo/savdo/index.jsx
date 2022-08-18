import React, { useState, useEffect } from "react";
import { Box, Container, Typography, Button } from "@mui/material";
import Grid from "@mui/material/Grid";

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { CardActionArea, CardActions } from '@mui/material';

import axios from "axios";
import { useNavigate } from 'react-router-dom';


export default function Savdo() {
  const navigate = useNavigate();
  const [product, setProduct] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:8000/api/product").then((response) => {
      setProduct(response.data);
    });
  }, []);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Container>
        <Grid
          container
          spacing={{ xs: 2, md: 3 }}
          columns={{ xs: 4, sm: 8, md: 12 }}
        >
          {product.map((row, index) => (
            <Grid item xs={12} sm={4} md={3} key={index}>
              <Card sx={{ maxWidth: 345, background: row.quantity === 0 ?  "yellow" : ""}}>
                <CardActionArea>
                  <CardMedia
                    component="img"
                    height="240"
                    image= {row.image}
                    alt="green iguana"
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div" sx={{fontWeight:'700'}}>
                      {row.name}
                    </Typography>
                    <Typography variant="h5" color="text.secondary">
                      {row.quantity} {row.unity}
                    </Typography>
                  </CardContent>
                </CardActionArea>
                <CardActions>
                  <Button variant='contained'  fullWidth
                  onClick={() => row.quantity === 0 ? "" : navigate('/tanlangan', { state: { id: row.id } })}>
                    Harid qilish
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
 