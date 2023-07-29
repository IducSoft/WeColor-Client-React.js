import React from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';



const DeleteAccount = () => {

  const validationSchema = Yup.object().shape({
    password: Yup.string()
    .required('Password is required')
  });

    return (
    <Formik
      initialValues={{
        password:"",
      }}
      validationSchema={validationSchema}
      onSubmit={(values, {resetForm}) => {
        console.log(values);
        resetForm();
      }}
    >
      {({ values, errors }) => (
        <Form>
          <section className='w-[300px] md:w-[500px] mx-auto my-7 border-black border-2 px-4 py-6'>
          <h2 className='text-center my-3'>DELETE ACCOUNT</h2>
            <label className="w-full block  text-[1rem] font-bold mb-2">
                <p className='w-full text-center my-3'>Delete your account and all your palettes permanently.</p>
                <Field className="my-5 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="password" type="text" name="password" values={values.password} />
                {errors &&  <ErrorMessage name="password" component="div" />}
            </label>
            <button type="submit" className="w-full bg-purple-500 text-white rounded-md p-2 my-5">DELETE ACCOUNT</button>
          </section>
        </Form>
      )}
    </Formik>
  
)
}

export default DeleteAccount