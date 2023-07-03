import axios from "axios";
import { Field, Form, Formik } from "formik"
import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import {resultFromAll, typeSearching } from "../../../redux/resultPalettesFromExploreSlice";
import Swal from 'sweetalert2'



const ExplorePallettesInputSearch = ({ index, store }) => {
  const [filter, setFilter] = useState('all')
  const [searchQuery, setSearchQuery] = useState("")
  const dispatch = useDispatch();
  const url = "https://wecolor-api-rest.onrender.com/api";
  const {resultPalettesAll} = useSelector((state)=>state.explorePalettes);
  //console.log(resultPalettesAll)
  
  //Validation Schema
  const required = "* Required field";
  const validationSchema = Yup.object().shape({
    searchQuery:Yup.string("Debe insertar una busqueda").required(required),
  });
  
  useEffect(()=>{
    if(filter ==="all" && resultPalettesAll.length === 0){
      getAllPalettes();
    }
  }, [])

  const getAllPalettes = async () => {
    try {
      const resultAllPalettes = await axios.get(`${url}/palettes/`);
      dispatch(typeSearching("All Palettes"));
      dispatch(resultFromAll(resultAllPalettes.data))
      
      //console.log("todas las paletas")
    } catch (error) {
      console.log(error)
    }
  };

  const getTrendingPalettes = async ()=>{

    try {
      const resultAllPalettesTrending = await axios.get(`${url}/palettes/get/trend`);
      dispatch(typeSearching("Trending Palette"));
      dispatch(resultFromAll(resultAllPalettesTrending.data))
      //console.log("buscado por trending")
    } catch (error) {
      console.log(error)
    }
  }

  const getRecentPalettes = async ()=>{

    try {
      const resultAllPalettesRecent = await axios.get(`${url}/palettes/get/recent`);
      dispatch(typeSearching("Recent Palette"));
      dispatch(resultFromAll(resultAllPalettesRecent.data))
      //console.log("buscado por recientes")
    } catch (error) {
      console.log(error)
    }
  }

  const getByTagsPalettes = async (tag)=>{

    try {
      const resultAllPalettesByTags = await axios.get(`${url}/palettes/get/tags?tags=${tag}`);
      if(resultAllPalettesByTags.data.message){
        let timerInterval;
        Swal.fire({
          icon:"error",
          title: "Cant find palettes that match your tags query",
          html: 'I will close in <b></b> milliseconds.',
          timer: 5000,
          timerProgressBar: true,
          didOpen: () => {
            Swal.showLoading()
            const b = Swal.getHtmlContainer().querySelector('b')
            timerInterval = setInterval(() => {
              b.textContent = Swal.getTimerLeft()
            }, 100)
          },
          willClose: () => {
            clearInterval(timerInterval)
          }
        }).then((result) => {
          /* Read more about handling dismissals below */
          if (result.dismiss === Swal.DismissReason.timer) {
            console.log('I was closed by the timer')
          }
        })

        return;
      }
      dispatch(typeSearching(`${tag} Palette`));
      dispatch(resultFromAll(resultAllPalettesByTags.data));
    } catch (error) {
      console.log(error)
    }
  }

  const getByQueryParams = async (query) => {

    let headerList = {
      "Accept":"*/*",
      "Content-type":"application/json",
    };
    let options = {
      url:`${url}/palettes/get/search?`,
      headers:headerList,
      params:{
        q:query,
      }
    }

    try {
      const resultAllPalettesQueryParams = await axios.request(options, {
        withCredentials:true,
        credential:"include"
      });

      if(resultAllPalettesQueryParams.data.message){
        let timerInterval;
        Swal.fire({
          icon:"error",
          title: "Cant find palettes that match your hexadecimal query",
          html: 'I will close in <b></b> milliseconds.',
          timer: 5000,
          timerProgressBar: true,
          didOpen: () => {
            Swal.showLoading()
            const b = Swal.getHtmlContainer().querySelector('b')
            timerInterval = setInterval(() => {
              b.textContent = Swal.getTimerLeft()
            }, 100)
          },
          willClose: () => {
            clearInterval(timerInterval)
          }
        }).then((result) => {
          /* Read more about handling dismissals below */
          if (result.dismiss === Swal.DismissReason.timer) {
            console.log('I was closed by the timer')
          }
        })
        
        return;
      }
      dispatch(typeSearching(`${query} Palettes`))
      dispatch(resultFromAll(resultAllPalettesQueryParams.data))
      
    } catch (error) {
      console.log(error)
    }
  }
  
  
  return (
    <div className="w-full mx-auto flex items-center justify-center">
      <Formik
        initialValues={{
          filter: "all",
          searchQuery: '',
        }}
        onSubmit={(values, { resetForm }) => {
          setFilter(values.filter)
          setSearchQuery(values.searchQuery);
          if(values.filter==="all"){
            getAllPalettes();
          }
          if(values.filter === "trending"){
            getTrendingPalettes();
          }
          if(values.filter === "recent"){
            getRecentPalettes();
          }
          if(values.filter === "tags" && values.searchQuery !== ""){
            getByTagsPalettes(values.searchQuery);
          }
          if(values.filter === "hexadecimal" && values.searchQuery !== ""){
            getByQueryParams(values.searchQuery);
          }
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
                Buscar
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
            </div>
          </div>
        </Form>
      )}
    </Formik>
  
    </div>
  )
}



export default ExplorePallettesInputSearch;