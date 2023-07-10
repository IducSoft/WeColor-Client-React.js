import React from "react";
import { Formik, Form, Field } from 'formik';
import DeleteAccount from "./DeleteAccount";
import axios from "axios";
import { useSelector } from "react-redux";


const UpdateProfile = () => {
  const {currentUser} = useSelector((state)=> state.user);
  const url = "https://wecolor-api-rest.onrender.com/api";
  
  const updateUserData = async ({fullname, country, occupation, biography, linkedin, twitter, instagram, portfolio})=>{

   console.log("testing")

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
     
    console.log(response.data)
  } catch (error) {
    console.log(error);
  }
    
  }

  function decirHola() {
    console.log("Hello")
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
        onSubmit={(values, {resetForm}) => {
        updateUserData(values)
          resetForm();
        }}
      >
        {({ values }) => (
        <Form>
          {/* Inputs */}
          <div className="my-5 mx-auto w-[300px] md:w-[500px] flex flex-col justify-center items-center ">
          <label className="w-full block  text-[1rem] font-bold mb-2">
            <p className="my-3">Fullname</p>
            <Field className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" name="fullname" values={values.fullname} />
          </label>

          <label className="w-full block text-[1rem] font-bold mb-2">
            <p className="my-3">
              Country
            </p>
            <Field className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" name="country" values={values.country} />
          </label>
          
          <label className="w-full block text-[1rem] font-bold mb-2">
            <p className="my-3">
              occupation
            </p>
            <Field className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" name="occupation" values={values.occupation}/>
          </label>

          <label className="w-full block text-[1rem] font-bold mb-2">
            <p className="my-3">
              Linkedin
            </p>
            <Field className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" name="linkedin"  values={values.linkedin}/>
          </label>

          <label className="w-full block text-[1rem] font-bold mb-2">
            <p className="my-3">
              Biography
            </p>
            <Field as="textarea" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" name="biography"  values={values.biography}/>
          </label>

          <label className="w-full block text-[1rem] font-bold mb-2">
            <p className="my-3">
              Twitter
            </p>
            <Field className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" name="twitter" values={values.twitter} />
          </label>

          <label className="w-full block text-[1rem] font-bold mb-2">
            <p className="my-3">
              Instagram
            </p>
            <Field className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" name="instagram" values={values.instagram} />
          </label>
          
          <label className="w-full block text-[1rem] font-bold mb-2">
            <p className="my-3" >
              Portfolio
            </p>
            <Field className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" name="portfolio" values={values.portfolio}/>
          </label>
          <button type="submit" className="bg-purple-500 text-white rounded-md p-2 my-3">Save Changes</button>
          </div>

          <hr/>

          <DeleteAccount/>

        </Form>
        )}
      </Formik>
    
  );
};

export default UpdateProfile;


