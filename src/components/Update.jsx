import { useFormik } from "formik";
import { basicSchema } from "../schemas";
import { Button, Col, Container, Row } from "react-bootstrap";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { SideBar } from "./SideBar";
import { Nav } from "./Nav";
import Loader from "react-loader-spinner";
import { date } from "yup";

export const Update = () => {
    const navigate = useNavigate();
    const { id } = useParams(); 
    const [loader,setLoader]=useState(true)

  const {
    values,
    handleBlur,
    isSubmitting,
    touched,
    handleChange,
    errors,
    handleSubmit,
    setValues,
  } = useFormik({
    initialValues: {
      title: "",
      author: {
        name: "",
        birthYear: "",
        nationality: "",
        biography: "",
      },
      genre: "",
      publicationYear: "",
      isbn: "",
    },
    validationSchema: basicSchema,
    onSubmit: async (values) => {
      try {
        await axios.put(`https://formic.onrender.com/books/${id}`, values);
        navigate('/');
      } catch (error) {
        console.error(error);
      }
    },
  });


  useEffect(() => {
    axios
      .get(`https://formic.onrender.com/books/${id}`)
      .then((res) => {
        setValues(res.data);
        setLoader(false)
      })
      .catch((err) => console.log(err));
  }, [id ,setValues]); 

  console.log(values.isbn);
    return (
        <Container fluid className="p-0">
            <div className="d-flex">
                <SideBar/>
                <div className="p-0 w-100">
                    <Nav title="Update book and author data"/>
                    {loader ?(
                        <div className='vh-100 w-100 justify-content-center align-items-center d-flex'>
                          <Loader type="Plane" color="black" width={50} height={50}/>
                        </div>
                    ):(
                      <form autoComplete="off" className="w-50" onSubmit={handleSubmit}>
                      <label htmlFor="title">Title</label>
                      <input
                        onChange={handleChange}
                        onBlur={handleBlur}  
                        id="title"
                        value={values.title}
                        type="text"
                        className={errors.title && touched.title ? 'input-error' : ""}
                        placeholder="Enter your title"
                      />
                      {errors.title && touched.title && <p className="error">{errors.title}</p>}
                      <label htmlFor="author.name">Author Name</label>
                      <input
                        onChange={handleChange}
                        onBlur={handleBlur}
                        id="author.name"
                        value={values.author.name}
                        type="text"
                        className={errors.author && errors.author.name && touched.author && touched.author.name ? "input-error" : ""}
                        placeholder="Enter author name"
                      />
                      {errors.author && errors.author.name && touched.author && touched.author.name && (<p className="error">{errors.author.name}</p>)}      
                      <label htmlFor="author.birthYear">BirthYear</label>
                      <input
                        onChange={handleChange}
                        onBlur={handleBlur}
                        id="author.birthYear"
                        value={values.author.birthYear}
                        type="number"
                        className={errors.author && errors.author.birthYear && touched.author && touched.author.birthYear ? "input-error" : ""}
                        placeholder="Enter author name"
                      />
                      {errors.author && errors.author.birthYear && touched.author && touched.author.birthYear && (<p className="error">{errors.author.birthYear}</p>)}      
                      <label htmlFor="author.nationality">Nationality</label>
                      <input
                        onChange={handleChange}
                        onBlur={handleBlur}
                        id="author.nationality"
                        value={values.author.nationality}
                        type="text"
                        className={errors.author && errors.author.nationality && touched.author && touched.author.nationality ? "input-error" : ""}
                        placeholder="Enter author name"
                      />
                      {errors.author && errors.author.nationality && touched.author && touched.author.nationality && (<p className="error">{errors.author.nationality}</p>)}      
                      <label htmlFor="author.biography">Biography</label>
                      <input
                        onChange={handleChange}
                        onBlur={handleBlur}
                        id="author.biography"
                        value={values.author.biography}
                        type="text"
                        className={errors.author && errors.author.biography && touched.author && touched.author.biography ? "input-error" : ""}
                        placeholder="Enter author name"
                      />
                      {errors.author && errors.author.biography && touched.author && touched.author.biography && (<p className="error">{errors.author.biography}</p>)}    
                      <label htmlFor="genre">Genre</label>
                      <input
                        onChange={handleChange}
                        onBlur={handleBlur}  
                        id="genre"
                        value={values.genre}
                        type="text"
                        className={errors.genre && touched.genre ? 'input-error' : ""}
                        placeholder="Enter your genre"
                      />
                      {errors.genre && touched.genre && <p className="error">{errors.genre}</p>}
                      <label htmlFor="publicationYear">publicationYear</label>
                      <input
                        onChange={handleChange}
                        onBlur={handleBlur}  
                        id="publicationYear"
                        value={values.publicationYear}
                        type="number"
                        className={errors.publicationYear && touched.publicationYear ? 'input-error' : ""}
                        placeholder="Enter your publicationYear"
                      />
                      {errors.publicationYear && touched.publicationYear && <p className="error">{errors.publicationYear}</p>}
                      <label htmlFor="isbn">isbn</label>
                      <input
                        onChange={handleChange}
                        onBlur={handleBlur}  
                        id="isbn"
                        value={values.isbn}
                        type="text"
                        className={errors.isbn && touched.isbn ? 'input-error' : ""}
                        placeholder="Enter your isbn"
                      />
                      {errors.isbn && touched.isbn && <p className="error">{errors.isbn}</p>}
  
                    <Link to={'/'}><Button variant="danger" className="py-2 w-100 mt-2" >Cancel</Button></Link>
                    <Button type="submit" variant="dark" className="py-2 w-100 mt-2" disabled={isSubmitting}>Update</Button>
                  </form>
                    )}
                </div>
            </div>
        </Container>
    );
  };
