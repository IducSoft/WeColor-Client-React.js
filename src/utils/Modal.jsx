import React from 'react';

//Formik
import { Formik, Form, Field, ErrorMessage } from "formik";

//Yup
import * as Yup from "yup";

//Libraries
import axios from "axios";



const Modal = ({handleOpenAndCloseModal}) => {

//Validation Schema
  const required = "* Required field";

  const validationSchema = Yup.object().shape({
    title: Yup.string().required(required),
    description: Yup.string().max(144,"Maximun numbers of characters is 144"),
    tags: Yup.string().max(50,"Maximun numbers of characters is 50")
  });


  const handlePaletteCreation=(newPalette)=>{
console.log(newPalette)
  }

    return ( <>
    <div className='modal-container'>
        <span onClick={handleOpenAndCloseModal} >X</span>
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

            handlePaletteCreation(newPalette)
            
          }}
        >
          {({ errors }) => (
            <Form >
              <h2 >New Palette</h2>
              <div>
              <label>Title:</label>
                <Field
                  type="text"
                  name="title"
                 
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