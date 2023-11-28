import React from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';


const DeleteAccount = () => {
  const url = "https://wecolor-api-rest.onrender.com/api";
  const validationSchema = Yup.object().shape({
    email: Yup.string()
    .email("Please enter a valid email")
    .required('Email Address is Required'),
    password: Yup.string()
    .required('Password is required')
  });

  const deleteAccount = async ({email, password})  =>{

    let headerList = {
      "Accept": "*/*",
      "Content-Type":"application/json",
    }
    let options = {
      url: `${url}/users/delete/account`,
      method:"DELETE",
      headers:headerList,
      data: {
        email,
        password,
      }
    }

    try{
      const {data, error} = await axios.request(options,{
        withCredentials: true,
        credentials: "include",
      });
      console.log(data, error);
      
    }catch(error){
      console.log(error)
    }
    
  }

    return (
      <Formik
        initialValues={{
          email:"",
          password:"",
        }}
        validationSchema={validationSchema}
        onSubmit={ async (values, {resetForm}) => {
          console.log(values);
          await deleteAccount(values)
          resetForm();
        }}
      >
        {({ values, errors }) => (
          <Form>
            <section className='w-[300px] md:w-[500px] mx-auto my-7 border-black border-2 px-4 py-6'>
            <h2 className='text-center my-3'>DELETE ACCOUNT</h2>
            <p className='w-full text-center my-3'>Delete your account and all your palettes permanently.</p>
              <label className="w-full block  text-[1rem] font-bold mb-2">
                  <p className='w-full text-center my-3'>Enter you email</p>
                  <Field className="my-5 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="email" type="email" name="email" values={values.email} />
                  {errors &&  <ErrorMessage name="email" component="div" />}
              </label>
              <label className="w-full block  text-[1rem] font-bold mb-2">
                  <p className='w-full text-center my-3'>Enter your password</p>
                  <Field className="my-5 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="password" type="password" name="password" values={values.password} />
                  {errors &&  <ErrorMessage name="password" component="div" />}
              </label>
              <button type="submit" className="w-full bg-purple-500 text-white rounded-md p-2 my-5">DELETE ACCOUNT</button>
            </section>
          </Form>
        )}
      </Formik>
    )
}

export default DeleteAccount;