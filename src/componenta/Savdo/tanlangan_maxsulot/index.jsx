import React, { useState, useEffect } from "react";
import { Container, Box, Typography, Button, Grid, Paper } from "@mui/material";

import { NavLink, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

import { useDispatch } from 'react-redux';

function Tanlangan() {

  const navigate = useNavigate();
  const location = useLocation();

  const [product, setProduct] = useState([]);
  const [count, setCount] = useState(1)


  const dispatch = useDispatch();

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/product/" + location.state.id)
      .then((res) => {
        // console.log(res.data);
        setProduct(res.data);
      });
  }, []);

  ///////////// redux  /////////////////////////


  const handleAdd = () => {
    dispatch({ type: "ADD_PRO", payload: newProduct })
    axios.put("http://localhost:8000/api/product/" + location.state.id, update)
      .then(
        navigate('/savdo')

      )
  }

  const handlePlus = () => {
    if (product.quantity-1 >= count){
      setCount(count+1)
    }
  }
   
  const handleMinus = () => {
    if ( count >= 2 ){
      setCount(count-1)
    }
  }

  const newProduct = {
    "name": product.name,
    "price": count * product.price,
    "quantity": count,
    "image": product.image,
  };

  const update = {
    "name": product.name,
    "price": product.price,
    "quantity": product.quantity - count,
    "unity": product.unity,
    "image": product.image,
  };

  return (
    <>
      {product ? (
        <Container maxWidth="md">
          <Grid
            container
            rowSpacing={1}
            columnSpacing={{ xs: 1, sm: 2, md: 3 }}
          >
            <Grid item xs={12} sm={6} md={6}>
              <Box>
                <Paper variant='elevation' >
                  <img src={product.image} alt="#" style={{ width: "100%" }} />
                </Paper>
              </Box>
            </Grid>
            <Grid item xs={12} sm={6} md={6}>
              <Box>
                <Typography variant="h5" sx={{ fontWeight: "400" }}>
                  Maxsulot nomi
                </Typography>
                <Typography
                  variant="h6"
                  sx={{ fontWeight: "400"}}
                >
                  {product.name}
                </Typography>
                <Typography variant="h5" sx={{ fontWeight: "400", mt: 2 }}>
                  Midori
                </Typography>
                <Typography
                  variant="h6"
                  sx={{ fontWeight: "400",  }}
                >
                  {product.quantity} {product.unity}
                </Typography>
                <Typography variant="h5" sx={{ fontWeight: "400", mt: 2 }}>
                  Narxi
                </Typography>
                <Typography
                  variant="h6"
                  sx={{ fontWeight: "400" }}
                >
                  {product.price}
                </Typography>
              </Box>
            </Grid>
          </Grid>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              mt: 5,
              columnGap: 5,
            }}
          >
            <Button
              variant="contained"
              color="secondary"
              onClick={handleMinus}
            >
              -
            </Button>
            <Typography>{count}</Typography>
            <Button variant="contained"   onClick={handlePlus}>
              +
            </Button>
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              mt: 7,
              columnGap: 5,
            }}
          >
            <Button
              variant="contained"
              sx={{ width: "22%" }}
            >
              <NavLink
                to="/savdo"
                style={{ textDecoration: "none", color: "white" }}
              >
                Bekor qilish
              </NavLink>
            </Button>
            <Button
              variant="contained"
              color="primary"
              size="small"
              sx={{ width: "22%" }}
              onClick={handleAdd}
            >
              Svatchaga otkazish
            </Button>
          </Box>
        </Container>
      ) : (
          "Loading..."
        )}
    </>
  );
}

export default Tanlangan;
