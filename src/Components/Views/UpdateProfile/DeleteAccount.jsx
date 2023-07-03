import React from 'react'
import { Formik, Form, Field } from 'formik';

const DeleteAccount = () => {

    return (
    <Formik
      initialValues={{
        password:"",
      }}
      onSubmit={(values, {resetForm}) => {
        console.log(values);
        resetForm();
      }}
    >
      {({ values }) => (
      <Form>
        <section className='w-[300px] md:w-[500px] mx-auto my-7 border-black border-2 px-4 py-6'>
        <h2 className='text-center my-3'>DELETE ACCOUNT</h2>
        
        <label className="w-full block  text-[1rem] font-bold mb-2">
            <p className='w-full text-center my-3'>Delete your account and all your palettes permanently.</p>
            <Field className="my-5 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="password" type="text" name="password" values={values.password} />
            <button type="submit" className="w-full bg-purple-500 text-white rounded-md p-2 my-5">DELETE ACCOUNT</button>
        </label>
        </section>

      </Form>
      )}
    </Formik>
  
);
}

export default DeleteAccount