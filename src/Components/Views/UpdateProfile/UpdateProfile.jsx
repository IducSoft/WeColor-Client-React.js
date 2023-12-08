import React from "react";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { updateTrue } from "../../../redux/profileDataUserSlice";
import * as  Yup from 'yup';
import Swal from "sweetalert2";

const UpdateProfile = () => {
  const {currentUser} = useSelector((state)=> state.user);
  const url = "https://wecolor-api-rest.onrender.com/api";
  const dispatch = useDispatch();

  const validationSchema = Yup.object().shape({
    fullname: Yup.string().required('Full Name is required'),
    country: Yup.string().required('Country is required'),
    occupation: Yup.string().required('Occupation is required'),
    biography: Yup.string().required('Biography is required'),
    linkedin: Yup.string().url('Invalid LinkedIn URL'),
    twitter: Yup.string().url('Invalid Twitter URL'),
    instagram: Yup.string().url('Invalid Instagram URL'),
    portfolio: Yup.string().url('Invalid Portfolio URL'),
  });

  

  const updateUserData = async ({fullname, country, occupation, biography, linkedin, twitter, instagram, portfolio})=>{
    try {
    const response = await axios.put(`${url}/users/${currentUser._id}`,{
        withCredentials:true,
        credentials:"include",
        "user":{
          "name":fullname,
          "country":country,
          "occupation":occupation,
          "biography":biography,
          "linkedin":linkedin,
          "twitter":twitter,
          "instagram":instagram,
          "portfolio":portfolio,
          "id":`${currentUser._id}`,
        },
      });
      Swal.fire(
        `${response.data.message}`,
      )
      
      //console.log(response.data)
    } catch (error) {
      console.log(error);
    }
    
  }

  return (
      <Formik
        initialValues={{
          fullname: '',
          country: '',
          occupation: '',
          biography: '',
          linkedin: '',
          twitter: '',
          instagram: '',
          portfolio: '',
        }}
        validationSchema={validationSchema}
        onSubmit={(values, {resetForm}) => {
          
          dispatch(updateTrue());
          updateUserData(values);
          resetForm();
        }}
      >
        {({ values, errors }) => (
        <Form>
          {/* Inputs */}
          <div className="my-5 mx-auto w-[300px] md:w-[500px] flex flex-col justify-center items-center ">

          <label className="w-full block  text-[1rem] font-bold mb-2" htmlFor="fullname">
            <p className="my-3">Fullname</p>
            <Field className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" name="fullname" values={values.fullname} />
            
            {errors &&  <ErrorMessage name="fullname" component="div" />}
          </label>

          <label className="w-full block text-[1rem] font-bold mb-2" htmlFor="country">
            <p className="my-3">
              Country
            </p>
            <Field className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" name="country" values={values.country} />
            {errors &&  <ErrorMessage name="country" component="div" />}
          </label>
          
          <label className="w-full block text-[1rem] font-bold mb-2" htmlFor="occupation">
            <p className="my-3">
              occupation
            </p>
            <Field className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" name="occupation" values={values.occupation}/>
            {errors &&  <ErrorMessage name="occupation" component="div" />}
          </label>

          <label className="w-full block text-[1rem] font-bold mb-2" htmlFor="linkedin">
            <p className="my-3">
              Linkedin
            </p>
            <Field className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" name="linkedin"  values={values.linkedin}/>
            {errors &&  <ErrorMessage name="linkedin" component="div" />}
          </label>

          <label className="w-full block text-[1rem] font-bold mb-2" htmlFor="biography">
            <p className="my-3">
              Biography
            </p>
            <Field as="textarea" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" name="biography"  values={values.biography}/>
            {errors &&  <ErrorMessage name="biography" component="div" />}
          </label>

          <label className="w-full block text-[1rem] font-bold mb-2" htmlFor="twitter">
            <p className="my-3">
              Twitter
            </p>
            <Field className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" name="twitter" values={values.twitter} />
            {errors &&  <ErrorMessage name="twitter" component="div" />}
          </label>

          <label className="w-full block text-[1rem] font-bold mb-2" htmlFor="instagram">
            <p className="my-3">
              Instagram
            </p>
            <Field className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" name="instagram" values={values.instagram} />
            {errors &&  <ErrorMessage name="instagram" component="div" />}
          </label>
          
          <label className="w-full block text-[1rem] font-bold mb-2" htmlFor="portfolio">
            <p className="my-3" >
              Portfolio
            </p>
            <Field className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" name="portfolio" values={values.portfolio}/>
            {errors &&  <ErrorMessage name="portfolio" component="div" />}
          </label>

          <button type="submit" className="bg-purple-500 text-white rounded-md p-2 my-3">Save Changes</button>

          </div>
          <hr/>
          
        </Form>
        )}
      </Formik>
    
  );
};

export default UpdateProfile;


