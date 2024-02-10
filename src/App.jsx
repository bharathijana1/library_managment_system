import { Col, Container, Row } from 'react-bootstrap'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Home } from './components/Home'
import Create from './components/Create'
import './App.css'
import { Update } from './components/Update'
import { Book } from './components/Book'
import { Author } from './components/Author'
import { BookUpdate } from './components/BookUpdate'
import { AuthorUpdate } from './components/AuthorUpdate'

const App = () => {
  return (
      <Container fluid className='p-0'>
            <BrowserRouter>
              <Routes>
                <Route path='/' element={<Home/>}/>
                <Route path='/create' element={<Create/>} />
                <Route path='/book' element={<Book/>}/ >
                <Route path='/book/edit/:id' element={<BookUpdate/>}/>
                <Route path='/author' element={<Author/>}/>
                <Route path='/author/edit/:id' element={<AuthorUpdate/>}/>
                <Route path='/update/:id' element={<Update/>} />
              </Routes>
            </BrowserRouter>
        
      </Container>
    
  )
}

export default App