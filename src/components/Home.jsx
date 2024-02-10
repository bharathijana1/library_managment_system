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

export const Home = () => {
  const [data, setData] = useState([]);
  const [loader, setLoader] = useState(true);
  const homeRef = useRef(null);

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
         
         
            {loader ? (
              
              <div className='vh-100 w-100 justify-content-center align-items-center d-flex'>
                <Loader type="TailSpin" color='black' width={50} height={50} />
              </div>
            ) : (
              <div className='d-flex flex-column w-100'>
                <Nav title="Library management system" />
            <Link className='align-self-end mx-5 mb-4' to="/create"><Button variant='dark' className='btn-1'>Add new book++</Button></Link>
                <div id='home' className='home d-flex  flex-wrap justify-content-center pt-3 gap-5'>
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
                      <div className='d-flex align-self-end p-2 '>
                        <Link to={`update/${book.id}`}><Button variant='warning' className='mx-3'>Edit</Button></Link>
                        <Button variant='danger' onClick={(event) => handleDelete(book.id)}>Delete</Button>
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
                
                </div>
              </div>
            )}
          
        </div>
      </Container>
    </>
  );
};
