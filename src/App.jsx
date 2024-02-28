import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import LoginForm from './components/LoginForm';
import { Home } from './components/Home'; 
import Create from './components/Create';
import { Book } from './components/Book'; 
import { BookUpdate } from './components/BookUpdate'; 
import { Author } from './components/Author'; 
import { AuthorUpdate } from './components/AuthorUpdate';
import { Update } from './components/Update'; 
import { Nomatch } from './components/Nomatch';
import PrivateRoutes from "./components/PrivateRoutes";

const App = () => {
  return (
    <Container fluid className='p-0'>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<PrivateRoutes />}>
            <Route exact path='/' element={<Home />} />
            <Route exact path='/create' element={<Create />} />
            <Route exact path='/book' element={<Book />} /> 
            <Route exact path='/book/edit/:id' element={<BookUpdate />} />
            <Route exact path='/author' element={<Author />} /> 
            <Route exact path='/author/edit/:id' element={<AuthorUpdate />} />
            <Route exact path='/update/:id' element={<Update />} /> 
          </Route>
          <Route exact path="/login" element={<LoginForm />} />
          <Route path="/not-found" element={<Nomatch />} /> 
        </Routes>
      </BrowserRouter>
    </Container>
  );
}

export default App;
