import { useFormik } from "formik";
import { basicSchema } from "../schemas";
import { Button, Col, Container, Row } from "react-bootstrap";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { SideBar } from "./SideBar";
import { Nav } from "./Nav";



const Create = () => {
  const navigate=useNavigate()
  const { values,
       handleBlur,
       isSubmitting,
       touched,
       handleChange, 
       errors, 
       handleSubmit 
      } = useFormik({
        initialValues: {
          title: "",
          author: {
            name: "",
            birthYear:"",
            nationality:"",
            biography:""
          },
          genre:"",
          publicationYear:"",
          isbn: ""
      },
    validationSchema: basicSchema,
    onSubmit:async (values) => {
      try {
        console.log("Form values:", values);
        const response=await axios.post(`https://formic.onrender.com/books`,values)
        console.log("API response:", response.data);
        navigate('/')
      } catch (error) {
          console.error(error);
      }
    },
  });

  return (
    <Container fluid className="p-0">
      <div className="d-flex">
        
            <SideBar/>
        
        <div  className='p-0 w-100'>
          <Nav title="Create book and author data"/>
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
      <Link to={'/'}><Button className="w-100 mt-2 py-2"  variant="danger">Cancel</Button></Link>
      <Button type="submit" variant="dark" className="py-2 w-100 mt-2" disabled={isSubmitting}>Submit</Button>
    </form>
        </div>
      </div>
    </Container>
  );
};

export default Create;
