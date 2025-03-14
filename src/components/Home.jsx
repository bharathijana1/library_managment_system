import axios from 'axios';
import { useEffect, useRef, useState } from 'react';
import { Button, Col, Container, Row } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';
import Loader from 'react-loader-spinner';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import { SideBar } from './SideBar';
import { Nav } from './Nav';
import bookImg from '../assets/—Pngtree—vector open book icon_4102909.png';

var bgColors = { 
  "red": "#3D0202",
  
};

export const Home = () => {
  const [data, setData] = useState([]);
  const [loader, setLoader] = useState(true);
 

  useEffect(() => {
    // Fetch books data
    axios.get('https://formic.onrender.com/books')
      .then(res => {
        setData(res.data);
        setLoader(false);
      })
      .catch(err => console.error('Error fetching books data:', err));
  }, []);

  const handleDelete = (id) => {
    const confirmDelete = window.confirm("Would you like to delete user data");
    if (confirmDelete) {
      axios.delete(`https://formic.onrender.com/books/${id}`)
        .then(() => {
          setData((prevData) => prevData.filter((item) => item.id !== id))
        })
        .catch((err) => console.error(err));
    }
  }

  //pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;
  const lastIndex = currentPage * itemsPerPage;
  const firstIndex = lastIndex - itemsPerPage;

const paginate = (i) => {
  setCurrentPage(i);
  
};

  

 
const reverseData=[...data].reverse()
const currentData=reverseData.slice(firstIndex,lastIndex)

  return (
    <>
      <Container fluid className='p-0 m-0'>
        <div className='d-flex p-0'>
          
            <SideBar />
            <div className='d-flex flex-column w-100'>
            <Nav title="Library management system" />
         
            {loader ? (
              
              <div className='vh-100 w-100 justify-content-center align-items-center d-flex'>
                <h5>Just a moment</h5>  <Loader type="ThreeDots" className='px-2' color='black' width={40} height={40}/>
              </div>
            ) : (
             <>
             <Link className='align-self-end mx-5 mb-4' to="/create"><Button variant='' className='btn-1 mt-3'style={{backgroundColor:"maroon",color:"white",fontSize:"18px"}}>Add new book++</Button></Link>
                <div id='home' className='home d-flex  flex-wrap justify-content-center pt-5 gap-5'>
                  {currentData.map((book, i) => (
                    <Card key={i} style={{ width: '18rem', marginBottom: '10px' }}>
                      <Card.Body>
                        <Card.Title className='text-bg-dark p-2 text-center rounded'>{book.title}</Card.Title>
                        <Card.Subtitle className="mb-2 text-muted">{book.author.name}</Card.Subtitle>
                        <Card.Text>
                          <strong>Genre:</strong> {book.genre}
                          <br />
                          <strong>Publication Year:</strong> {book.publicationYear}
                          <br />
                          <strong>ISBN:</strong> {book.isbn}
                        </Card.Text>
                        <Card.Text>
                          <strong>Author Details:</strong> {book.author.name} was born in {book.author.birthYear} in {book.author.nationality}<br />
                        </Card.Text>
                        <Card.Text>
                          <strong>Author Biography:</strong> {book.author.biography}
                        </Card.Text>
                      </Card.Body>
                      <div className='d-flex align-self-center p-2 '>
                        <Link to={`update/${book.id}`}><Button variant='' className='mx-3 ' style= {{backgroundColor:'Goldenrod', color: 'white', fontSize:"18px"}}>Edit</Button></Link>
                        <Button variant='' onClick={(event) => handleDelete(book.id)} style={{ backgroundColor: 'maroon', color: 'white',fontSize:"18px" }} >Delete</Button>
                      </div>
                      <img className='book-img' src={bookImg} alt="book" />
                    </Card>
                  ))}
                  <div className='container d-flex justify-content-center'>
                    {Array.from({ length: Math.ceil(data.length / itemsPerPage) }, (_, i) => (
                      <div key={i}>
                        <button className='btn btn-dark mx-2' onClick={() => paginate(i + 1)}>
                          {i + 1}
                        </button>
                      </div>
                    ))}
                  </div>
                
                </div></>
                
            
             
            )}
             </div>
          
        </div>
      </Container>
    </>
  );
};
