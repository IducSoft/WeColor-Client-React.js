import { Field, Form, Formik } from "formik"
import React, { useEffect, useState } from "react"
import * as Yup from "yup";


const ExplorePallettesInputSearch = ({ index, store }) => {
  const [input, setInput] = useState('')
  const [disable, setDisable] = useState(true)

  const [query, setQuery] = useState(null)
  //const renderResult = results.length > 0 || query !== null ? true : false

  useEffect(() => {
    if (input.length >= 3) setDisable(false)
    console.log('input detected', input)
  }, [input])

  const onReset = e => {
    setInput('')
    setDisable(true)
    setQuery(null)
  }

  //Validation Schema
  const required = "* Required field";

  const validationSchema = Yup.object().shape({
    searchQuery:Yup.string("Debe insertar una busqueda").required(required),
  });


  return (
    <>
      <Formik
      initialValues={{
        filter: '',
        searchQuery: '',
      }}
      onSubmit={(values, { resetForm }) => {
          
        console.log(values)
        resetForm();
      }}
      
      >
      {({ values }) => (
        <Form className="mb-5 relative flex w-full flex-wrap items-stretch pt-2  mx-auto my-2 text-gray-600">
          <div className=" mx-2">
            <Field

              className="border-2 border-gray-300 bg-white h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none"
              name="searchQuery"
              placeholder="Search by colors, tags, etc..."
              value={values.searchQuery}
            />
            
            <div role="group" aria-labelledby="my-radio-group">
              <label>
                <Field type="radio" name="filter" value="all" />
                <span className="mx-3 cursor-pointer">All</span>
              </label>
              <label>
                <Field type="radio" name="filter" value="trending" />
                <span className="mx-3 cursor-pointer">trending</span>
              </label>
              <label>
                <Field type="radio" name="filter" value="tags" />
                <span className="mx-3 cursor-pointer">tags</span>
              </label>
              <label>
                <Field type="radio" name="filter" value="hexadecimal" />
                <span className="mx-3 cursor-pointer">Hexadecimal</span>
              </label>
              <label>
                <Field type="radio" name="filter" value="recent" />
                <span className="mx-3 cursor-pointer">recent</span>
              </label>
            <div>Picked: {values.filter}</div>
            <div>searchQuery: {values.searchQuery}</div>
          </div>
          </div>
          <div className="mx-2">
          <button type="submit" className="rounded-lg bg-sky-500 w-full p-2 cursor-pointer text-white" disabled={disable}>
            Submit
          </button>
          </div>
          
          

          
        </Form>
      )}
    </Formik>
    
    </>
  )
}



export default ExplorePallettesInputSearch;