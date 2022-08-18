import React, { useState, useEffect } from "react";
import axios from "axios";
import Grid from "@mui/material/Grid";
import Avatar from "@mui/material/Avatar";
import { useNavigate } from "react-router-dom";
import { Button, Box, TextField } from "@mui/material";
import { Field, Form, Formik } from "formik";
import { object, string } from "yup";

const initialValues = {
  firstname: "",
  password: "",
};

function index({ setCheck, updateUser }) {
  const [data, setData] = useState();
  const [print, setPrint] = useState("");

  useEffect(() => {
    axios.get("http://localhost:8000/api/user").then((res) => {
      setData(res.data);
    });
  }, []);
  const onSubmit = (values) => {
    for (let i = 0; i < data.length; i++) {
      if (
        data[i].username === values.firstname &&
        data[i].password === values.password
      ) {
        navigate("/");
        setCheck(false);
        updateUser(values.firstname);
      }
      if ("user" === values.firstname && "user" === values.password) {
        navigate("/");
        setCheck(true);
        updateUser(values.firstname);
      } else {
        setPrint("Hato");
      }
    }
  };

  const navigate = useNavigate();

  return (
    <Box sx={{ position: "sticky", marginTop: "-80px" }}>
      <Box
        sx={{
          width: "100%",
          height: "679px",
          background: "linear-gradient(45deg, #E91E63, #42A5F5 )",
        }}
      >
        <Box sx={{ width: "100%", display: "flex", justifyContent: "center" }}>
          <Avatar
            alt="Remy Sharp"
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTR3nvzSQUJWrq1bZ15VcUt3FYKryqWTvWkgg&usqp=CAU"
            sx={{
              width: 86,
              height: 86,
              position: "absolute",
              marginTop: "90px",
            }}
          />
        </Box>
        <Grid
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
          }}
          container
          spacing={2}
        >
          <Grid
            sx={{
              background: "white",
              border: "1px solid black",
              height: "400px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
            xs={5}
          >
            <Box sx={{ width: "90%" }}>
              <h1
                style={{
                  textAlign: "center",
                  marginLeft: "3%",
                  paddingBottom: "10px",
                }}
              >
                Login Page
              </h1>
              <p
                style={{
                  color: "red",
                  textAlign: "center",
                  paddingBottom: "30px",
                }}
              >
                {print}
              </p>
              <Formik
                initialValues={initialValues}
                onSubmit={onSubmit}
                validationSchema={object({
                  firstname: string()
                    .required("Please enter firstname")
                    .min(3, "Firstname too short"),
                  password: string()
                    .required("Please enter password")
                    .min(2, "Password should be minium 7 Characters")
                    .max(8, "Password should be maxium 8 Characters"),
                })}
              >
                {({ errors, isValid, touched, dirty }) => (
                  <Form>
                    <Field
                      name="firstname"
                      type="firstname"
                      as={TextField}
                      variant="outlined"
                      label="Firstname"
                      fullWidth
                      error={
                        Boolean(errors.firstname) && Boolean(touched.firstname)
                      }
                      helperText={
                        Boolean(touched.firstname) && errors.firstname
                      }
                    />
                    <Box height={14} />
                    <Field
                      name="password"
                      type="password"
                      as={TextField}
                      variant="outlined"
                      label="Password"
                      fullWidth
                      error={
                        Boolean(errors.password) && Boolean(touched.password)
                      }
                      helperText={Boolean(touched.password) && errors.password}
                    />
                    <Box height={16} />
                    <Button
                      type="submit"
                      variant="contained"
                      color="primary"
                      size="large"
                      disabled={!dirty || !isValid}
                      sx={{
                        width: "100%",
                        marginTop: 4,
                        color: "white",
                        height: "50px",
                        background: "#E64B3C",
                        "&:hover": { background: "#E64B3C" },
                      }}
                    >
                      LOGIN
                    </Button>
                  </Form>
                )}
              </Formik>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}

export default index;
