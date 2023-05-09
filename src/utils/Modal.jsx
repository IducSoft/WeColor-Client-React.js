import React from 'react';

//Formik
import { Formik, Form, Field, ErrorMessage } from "formik";

//Yup
import * as Yup from "yup";

//Libraries
import axios from "axios";

//Redux
import {useSelector} from "react-redux"

//Material Icons
import CloseIcon from '@mui/icons-material/Close';

//react hot toast
import toast, { Toaster } from "react-hot-toast";


//Js cookie
//import Cookies from "js-cookie";

const url = import.meta.env.VITE_PROD_URL;


const Modal = ({handleOpenAndCloseModal, colorPalette}) => {
  const { currentUser } = useSelector((state) => state.user);
  const { darkmode } = useSelector((state) => state.darkmode);
//Validation Schema
  const required = "* Required field";

  const validationSchema = Yup.object().shape({
    title: Yup.string().required(required),
    description: Yup.string().max(144,"Maximun numbers of characters is 144"),
    tags: Yup.string().max(50,"Maximun numbers of characters is 50")
  });


  const handlePaletteCreation= async(newPalette)=>{
const {title, description, tags}=newPalette;

const arrayTags = tags.split(",");

const finalTags = takeOutSpaces(arrayTags);

const savedColorPalette = {
  "userId":`${currentUser._id}`,
  "title":`${title}`,
  "desc":`${description}`,
  "colors":colorPalette,
  "tags":finalTags
}

let headerList = {
  "Accept":"*/*",
  "Content-Type":"application/json"
}

let options = {
  url:`${url}/palettes/add`,
  method:"POST",
  headers:headerList,
  data:savedColorPalette
}


  try {
    const {data, error} = await axios.request(options,{
      withCredentials:true,
      credentials:"include"
    });
    console.log(data)

    toast.success(
      "The palette has been saved!",
      {
        duration: 3000,
        style: {
          background: "#333" ,
          color: "#fff",
        },
        position:"top-center"
      }
    );
    handleOpenAndCloseModal()
    if(error) throw error
  } catch (error) {
    console.log(error)
  }
 
}

//const checkCookie = ()=>{
  //const weColorToken = Cookies.get("we_color_token")
  //console.log(weColorToken)
  //return weColorToken
//}



 const takeOutSpaces = (array)=>{
  const newArray =  array.map(element =>
  element.trim()
)
return newArray;
 }

    return ( <>
    <div className='modal-container'>
           <h2 className='font-bold text-lg' >New Palette</h2>
       <CloseIcon style={{position:"absolute", top:"0%", right:"1%", cursor:"pointer"}} className='span'  onClick={handleOpenAndCloseModal} />
          <Formik
          initialValues={{
            title: "",
            description: "",
            tags:"",
          }}
          validationSchema={validationSchema}
          onSubmit={(values, { resetForm }) => {
           resetForm();
            let newPalette = {};

            newPalette = {
              title: values.title,
              description: values.description,
              tags:values.tags,
            };

            if(currentUser){
              handlePaletteCreation(newPalette)
            }else{
              toast.error(
                "You must to be logged!",
                {
                  duration: 3000,
                  icon:'🚩',
                  style: {
                    background: "#333",
                    color:  "#fff",
                  },
                  position:"top-center"
                }
              );
            }  
            
          }}
        >
          {({ errors }) => (
            <Form >
              <div>
              <label>Title:</label>
                <Field
                  type="text"
                  name="title"
                 placeholder="My new palette"
                  className={errors.password ? "input error-border" : "input"}
                />
                <ErrorMessage
                  name="title"
                  component={() => {
                    return <div className="error">{errors.title}</div>;
                  }}
                />
              </div>
              <div>
                <label>Description:</label>
                <Field
                  type="textarea"
                  name="description"
                  placeholder="Best palette ever"
                  className={errors.description ? "input error-border" : "input"}
                />
                <ErrorMessage
                  name="description"
                  component={() => {
                    return <div className="error">{errors.description}</div>;
                  }}
                />
              </div>
              <div>
                <label>Tags:</label>
                <Field
                  type="text"
                  name="tags"
                  placeholder="ocean, water, lake, calm"
                  className={errors.tags ? "input error-border" : "input"}
                />
                <ErrorMessage
                  name="tags"
                  component={() => {
                    return <div className="error">{errors.tags}</div>;
                  }}
                />
              </div>
              <button type="submit" className="sign-button">
                Save
              </button>
            </Form>
          )}
        </Formik>
        </div></> );
}
 
export default Modal;