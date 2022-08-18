import React from "react";
import { Box, Container, Grid, Paper, Typography, Button } from "@mui/material";
import { styled } from "@mui/material/styles";
import ClearIcon from "@mui/icons-material/Clear";


import { DEL2 } from "../../redux/index";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";

import axios from "axios";




const Item = styled(Paper)(({ theme }) => ({
  backgroundImage: theme.palette.mode === "dark" ? "#1A2027" : "dark",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

function Savat() {

  const navigate = useNavigate();

  const ombor = useSelector((state) => state);
  // console.log(ombor);

  ///////////  delet //////////////////////////

  const dispatch = useDispatch();

  const del = (di) => {
    dispatch(DEL2(di));
  };

  const { id } = useParams();


  /////////////////// sotish  ////////////////////////////


  const Submit = () => {
    axios.post('http://localhost:8000/api/sold', ombor.savatcha)
    dispatch({ type: "CLEAR", payload: ombor.savatcha })
      .then(
        navigate('/savdo')
      )
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      {ombor ? (
        <Container maxWidth="md">
          <Grid container spacing={2}>
            {ombor.savatcha.map((ele, index) => (
              <Grid item xs={12} sm={12} md={12} lg={12} key={index}>
                <Item
                  sx={{
                    mt: "5%",
                    display: "flex",
                    textAlign: "center",
                    backgroundAttachment:'local',
                    backgroundSize: "100%",
                    backgroundRepeat: "round",
                  }}
                >
                  <Box sx={{ width: "27%", height: "27%" }}>
                    <img
                      src={ele.image}
                      alt="#"
                      style={{
                        width: "100%",
                        borderRadius: "5px",
                      }}
                    />
                  </Box>

                  <Box sx={{ width: "35%", ml: "1", mt: "auto", mb: "auto" }}>
                    <Typography
                      gutterBottom
                      variant="h4"
                      component="div"
                      color="black"
                    >
                      {ele.name}
                    </Typography>
                    <Typography
                      variant="h5"
                      sx={{ mt: 3, fontWeight: "600" }}
                    >
                      {ele.quantity} {ele.unity} kg
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      color: "black",
                      mt: "auto",
                      mb: "auto",
                      ml: "1",
                      mr: "auto",
                    }}
                  >
                    <br />
                    <Typography variant="h5">
                      {ele.price} sum
                      </Typography>
                  </Box>
                  <Typography sx={{ mt: "auto", mb: "auto" }}>
                    {/* <NavLink to='/savdo'> */}
                    <Button
                      onClick={() => del(ele, id)}
                      variant="contained"
                      size="large"
                      color="error"
                      sx={{ borderRadius: 75 }}
                    >
                      <ClearIcon />
                    </Button>
                    {/* </NavLink> */}
                  </Typography>
                </Item>
              </Grid>
            ))}
          </Grid><br />
          <Button
            variant="contained"
            color="success"
            sx={{ width: "20%", float: "right" }}
            onClick={Submit}
          >
            Sotish
        </Button>
        </Container>
      ) : (<Typography sx={{ fontWeight: "900", fontFamily: "cursive", mt: 1 }} >Savatcha bosh...</Typography>)}
    </Box>
  );
}

export default Savat;
