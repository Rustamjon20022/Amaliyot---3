import React from 'react';
import { useFormik } from 'formik';
import { Container } from '@mui/material';

import { useNavigate } from "react-router-dom";
import axios from "axios";



const validate = values => {
  const errors = {};
  if (!values.name) {
    errors.name = 'Required';
  } else if (values.name.length > 15) {
    errors.name = 'Must be 15 characters or less';
  }

  if (!values.price) {
    errors.price = 'Required';
  } else if (values.price.length > 10) {
    errors.price = 'Must be 10 characters or less';
  }

  if (!values.quantity) {
    errors.quantity = 'Required';
  } else if (values.quantity.length > 10) {
    errors.quantity = 'Must be 10 characters or less';
  }

  if (!values.unity) {
    errors.unity = 'Required';
  } else if (values.unity.length > 5) {
    errors.unity = 'Must be 5 characters or less';
  }

  if (!values.image) {
    errors.image = 'Required';
  } else if (values.image.length > 200) {
    errors.image = 'Must be 200 characters or less';
  }

  // if (!values.email) {
  //   errors.email = 'Required';
  // } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
  //   errors.email = 'Invalid email address';
  // }

  return errors;
};


function AddPro  ({ setTemp }) {

  const navigate = useNavigate();
  
  const formik = useFormik({
    initialValues: {
      name: '',
      price: '',
      quantity: '',
      unity: '',
      image: '',
    },
    validate,
    onSubmit: values => {
        axios.post("http://localhost:8000/api/product", values).then(() => {
          navigate("/maxsulotlar");
          setTemp((e) => !e);

        });
      // }
      // alert(JSON.stringify(values, null, 2));
      // console.log(values);
    },
  });
  return (
    <>
    <Container maxWidth='sm' sx={{ mt: 7, textAlign:'start', alignItems:'center' }}>
      <form onSubmit={formik.handleSubmit}>
        <label htmlFor="name" style={{}}>Name</label><br />
        <input
          id="name"
          name="name"
          type="text"
          onChange={formik.handleChange}
          value={formik.values.name}
          style={{ width: '100%', height: '30px' }}
        />
        {formik.errors.name ? <div style={{color:'red'}}>{formik.errors.name}</div> : null}
        <br />
        <label htmlFor="price">Price</label><br />
        <input
          id="price"
          name="price"
          type="text"
          onChange={formik.handleChange}
          value={formik.values.price}
          style={{ width: '100%', height: '30px' }}
        />
        {formik.errors.price ? <div style={{color:'red'}}>{formik.errors.price}</div> : null}
        <br />
        <label htmlFor="quantity">Quantity</label><br />
        <input
          id="quantity"
          name="quantity"
          type="text"
          onChange={formik.handleChange}
          value={formik.values.quantity}
          style={{ width: '100%', height: '30px' }}
        />
        {formik.errors.quantity ? <div style={{color:'red'}}>{formik.errors.quantity}</div> : null}
        <br />
        
        <label htmlFor="unity">Unity</label><br />
        <select 
           id="unity"
           name="unity"
           type="text"
           onChange={formik.handleChange}
           value={formik.values.unity}
           style={{ width: '101%', height: '40px' }}
           >
             <option value="kg">kg</option>
             <option value="litr">litr</option>
             <option value="dona">dona</option>
           </select>
        {formik.errors.unity ? <div style={{color:'red'}}>{formik.errors.unity}</div> : null}
        <br />

        <label htmlFor="image">Image</label><br />
        <input
          id="image"
          name="image"
          type="text"
          onChange={formik.handleChange}
          value={formik.values.image}
          style={{ width: '100%', height: '30px' }}
        />
        {formik.errors.image ? <div style={{color:'red'}}>{formik.errors.image}</div> : null}
        <br /><br />

        <button onClick={() => navigate("/maxsulotlar")}>Bekor qilish</button>
        <button type="submit" style={{float:'right'}}>Qoshish</button>
      </form>
    </Container>
    </>
  );
};

export default AddPro 