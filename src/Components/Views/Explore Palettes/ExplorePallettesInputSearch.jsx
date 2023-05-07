import axios from "axios";
import { Field, Form, Formik } from "formik"
import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import { resultFromAll } from "../../../redux/resultPalettesFromExploreSlice"



const ExplorePallettesInputSearch = ({ index, store }) => {
  const [filter, setInput] = useState('')
  const [searchQuery, setSearchQuery] = useState(true)
  const dispatch = useDispatch();
  const url = "https://wecolor-api-rest.up.railway.app/api";
  const {resultPalettesAll} = useSelector((state)=>state.explorePalettes);
  console.log(resultPalettesAll)
  
  //Validation Schema
  const required = "* Required field";
  const validationSchema = Yup.object().shape({
    searchQuery:Yup.string("Debe insertar una busqueda").required(required),
  });
  
  useEffect(()=>{
    const getAllPalettes = async () => {
      try {
        const resultAllPalettes = await axios.get(`${url}/palettes/`);
        dispatch(resultFromAll(resultAllPalettes.data))
      } catch (error) {
        console.log(error)
      }
    };

    getAllPalettes();
    
  }, [])

  
  
  return (
    <>
      <Formik
        initialValues={{
          filter: 'all',
          searchQuery: '',
        }}
        onSubmit={(values, { resetForm }) => {
          setInput(values.filter)
          setSearchQuery(values.searchQuery)
          resetForm();
        }}
      >
      {({ values }) => (
        <Form className="mb-5 relative  items-stretch pt-2  mx-auto my-2 text-gray-600">
          <div className=" mx-2">
            <div className="flex flex-wrap">
            <Field
              className="border-2 border-gray-300 bg-white h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none my-3"
              name="searchQuery"
              placeholder="Search by colors, tags, hexadecimal etc..."
              value={values.searchQuery}
            />
            <div className="mx-2">
              <button type="submit" className="rounded-lg bg-sky-500 w-full p-2 cursor-pointer text-white my-3" >
                Submit
              </button>
            </div>
            </div>
            
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
                <Field type="radio" name="filter" value="recent" />
                <span className="mx-3 cursor-pointer">recent</span>
              </label>
              <label>
                <Field type="radio" name="filter" value="tags" />
                <span className="mx-3 cursor-pointer">tags</span>
              </label>
              <label>
                <Field type="radio" name="filter" value="hexadecimal" />
                <span className="mx-3 cursor-pointer">Hexadecimal</span>
              </label>
              
            <div>Picked: {values.filter}</div>
            <div>searchQuery: {values.searchQuery}</div>
            </div>
          </div>
        </Form>
      )}
    </Formik>
    
    </>
  )
}



export default ExplorePallettesInputSearch;