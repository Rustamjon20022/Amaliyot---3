import React, { useEffect, useState } from "react";
import { Button, Box, TextField, Container, Stack, Typography, Avatar } from "@mui/material";
import { Field, Form, Formik } from "formik";
import { object, string } from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";



const initialValues = {
  username: "",
  password: "",
};

const Login = ({setUser2, updateUser}) => {

  ////////////////////////////////////////////////////////////


  const navigate = useNavigate();
  const [data, setData] = useState()

  useEffect(() => {
    axios.get("http://localhost:8000/api/user").then(res => {
      setData(res.data)
    })
  }, [])



  return (
    <div style={{ position: 'absolute', background: 'white', top: '0%', height: '60vh', width: '99%', paddingTop: '8%' }}>
         <Formik
         initialValues={initialValues}
         onSubmit={(values, formikHelpers) => {
           for (let i = 0; i < data.length; i++) {
 
             if (data[0].username === values.username && data[0].password === values.password) {
               setUser2(false)
               navigate("/")
               updateUser(values.username)
               
             } else if (data[1].username === values.username && data[1].password === values.password) {
               setUser2(true)
               navigate("/")
               updateUser(values.password)
 
             }
           }
           console.log(values);
           formikHelpers.resetForm();
         }}
         validationSchema={object({
           username: string().required('Iltimos useringizni kiriting !').min(4, 'Xato Username'),
           password: string().required('Iltimos Kodingizni kiriting !').min(4, 'Password kamida 7 ta  belgidan iborat bulishi kerak !!!'),
 
         })}
       >
         {({ errors, isValid, touched, dirty }) => (
           <Container maxWidth="sm">
             <Typography
               variant="h5"
               sx={{ fontWeight: "900", mt: 1 }}
             >
               Paroll Kiriting
             </Typography>
             <Form>
               <Box height={15} />
               <Field
                 name="username"
                 type="username"
                 as={TextField}
                 variant="outlined"
                 color="primary"
                 label="Username"
                 fullWidth
                 error={Boolean(errors.username) && Boolean(touched.username)}
                 helperText={Boolean(touched.username) && errors.username}
               />
               <Box height={15} />
               <Field
                 name="password"
                 type="password"
                 as={TextField}
                 variant="outlined"
                 color="primary"
                 label="Password"
                 fullWidth
                 error={Boolean(errors.password) && Boolean(touched.password)}
                 helperText={Boolean(touched.password) && errors.password}
               />
               <Box height={15} />
               <Button
                 fullWidth
                 type="submit"
                 variant="contained"
                 size="large"
               >
                 Kirish
             </Button>
             </Form>
           </Container>
         )}
       </Formik>
    </div>
  );
};

export default Login;

// import React, { useState } from 'react';

// const App = () => {

//    const [name, setName] = useState('');
//    const [pwd, setPwd] = useState('');

//    const handle = () => {
//       localStorage.setItem('Name', name);
//       localStorage.setItem('Password', pwd);
//    };
//    const remove = () => {
//       localStorage.removeItem('Name');
//       localStorage.removeItem('Password');
//    };
//    return (
//       <div className="App">
//          <h1>Name of the user:</h1>
//          <input
//             placeholder="Name"
//             value={name}
//             onChange={(e) => setName(e.target.value)}
//          />
//          <h1>Password of the user:</h1>
//          <input
//             type="password"
//             placeholder="Password"
//             value={pwd}
//             onChange={(e) => setPwd(e.target.value)}
//          />
//          <div>
//             <button onClick={handle}>Done</button>
//          </div>
//          {localStorage.getItem('Name') && (
//             <div>
//                Name: <p>{localStorage.getItem('Name')}</p>
//             </div>
//          )}
//          {localStorage.getItem('Password') && (
//             <div>
//                Password: <p>{localStorage.getItem('Password')}</p>
//             </div>
//          )}
//          <div>
//             <button onClick={remove}>Remove</button>
//          </div>
//       </div>
//    );
// };
// export default App;