// @ts-nocheck
import React from "react";
import { styled } from "@mui/material/styles";
import { Table, Box, Paper, Button, Typography } from "@mui/material";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import {
  Container,
  TableRow,
  TableHead,
  TableContainer,
  TableBody,
  Modal,
} from "@mui/material";


import { useState, useEffect } from "react";
import axios from "axios";
import { NavLink, useNavigate } from "react-router-dom";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

/////////////////////// modal style /////////////////////////
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  borderRadius: 5,
  boxShadow: 7,
  p: 4,
};

function Sotilgan({ temp }) {
  ///////////////////// axios holat map ////////////////////////////

  const [sotilgan, setSotilgan] = useState([]);
  const [isTrue, setIsTrue] = useState(false);

  useEffect(() => {
    axios.get("http://localhost:8000/api/sold").then((response) => {
      setSotilgan(response.data);
      setIsTrue(true);
    });
  }, [temp, isTrue]);

  ///////////////  Delete ////////////////////////////////////
  const navigate = useNavigate();

  function Delete() {
    const id = window.localStorage.getItem("ItemId")
    axios.delete(`http://localhost:8000/api/sold/${id}`).then(setIsTrue(false));
    handleClose();
    // console.log(id);
  }

  const [open, setOpen] = React.useState(false);
  const handleOpen = (id) => {
    window.localStorage.setItem("ItemId", id);
    // console.log(id);
    setOpen(true);
  };
  const handleClose = () => setOpen(false);

  return (
    <>
    {sotilgan ? (
    <Container>
      <Box sx={{ mt: 3 }}>
        <NavLink
          to="/maxsulotlar"
          style={{ marginRight: "70%", textDecoration: "none" }}
        >
          <Button color="warning" variant="contained">
            Ortga
          </Button>
        </NavLink>
      </Box>

      <TableContainer component={Paper} sx={{ mt: 4 }}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>t/r</StyledTableCell>
              <StyledTableCell align="center">nomi</StyledTableCell>
              <StyledTableCell align="center">narxi</StyledTableCell>
              <StyledTableCell align="center">miqdori</StyledTableCell>
              <StyledTableCell align="center">img</StyledTableCell>
              <StyledTableCell align="center">delete</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sotilgan.map((user, index) => (
              <StyledTableRow key={index}>
                <StyledTableCell component="th" scope="row">
                  {index + 1}
                </StyledTableCell>
                <StyledTableCell align="center">{user.name}</StyledTableCell>
                <StyledTableCell align="center">{user.price}</StyledTableCell>
                <StyledTableCell align="center"> {user.quantity}{user.unity}</StyledTableCell>
                <StyledTableCell align="center">
                  <img
                    src={user.image}
                    alt="#"
                    style={{ width: 80,}}
                  />
                </StyledTableCell>

                <StyledTableCell align="center">
                  <Box>
                    <Button
                      onClick={() => handleOpen(user.id)}
                      variant="contained"
                      color="error"
                      size="small"
                      sx={{
                        margin: "5px",
                      }}
                    >
                      Delete
                    </Button>
                    <Modal
                      open={open}
                      onClose={handleClose}
                      aria-labelledby="modal-modal-title"
                      aria-describedby="modal-modal-description"
                      hideBackdrop
                    >
                      <Box sx={style}>
                        <Typography
                          variant="h5"
                          sx={{
                            textAlign: "center",
                            mb: 5,
                            pb: 2,
                            borderBottom: 1,
                          }}
                        >
                          Are you want to delete?
                        </Typography>
                        <Button
                          variant="contained"
                          color="success"
                          size="small"
                          onClick={handleClose}
                          sx={{
                            boxShadow:
                              "rgba(46, 46, 170, 0.4) 5px 5px, rgba(40, 46, 170, 0.3) 10px 10px, rgba(20, 46, 170, 0.2) 15px 15px, rgba(40, 46, 170, 0.1) 20px 20px",
                            margin: "5px",
                            ml: 9,
                          }}
                        >
                          Cancel
                        </Button>
                        <Button
                          variant="contained"
                          color="error"
                          size="small"
                          onClick={() => Delete(user.id)}
                          sx={{
                            boxShadow:
                              "rgba(240, 46, 170, 0.4) 5px 5px, rgba(240, 46, 170, 0.3) 10px 10px, rgba(240, 46, 170, 0.2) 15px 15px, rgba(240, 46, 170, 0.1) 20px 20px",
                            margin: "5px",
                            ml: 10,
                          }}
                        >
                          Delete
                        </Button>
                      </Box>
                    </Modal>
                  </Box>
                </StyledTableCell>

              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
    ) : (<Typography sx={{ fontWeight: "900", fontFamily: "cursive", mt: 1 }} >Sotilgan maxsulot mavjud emas...</Typography>)}
    </>
  );
}

export default Sotilgan;
