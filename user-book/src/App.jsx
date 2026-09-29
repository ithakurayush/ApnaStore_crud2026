import 'bootstrap/dist/css/bootstrap.min.css'

import NavBar from './NavBar.jsx'
import HomeCard from './HomeCard.jsx'
import Footer from './Footer.jsx'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import BookDetail from './BookDetail.jsx'


function App () {
  return (
    <>
    <BrowserRouter>
        <NavBar />
        <Routes>
      <Route path='/' element={<HomeCard></HomeCard>}></Route>
      <Route path='/user/book/detail/:id' element={<BookDetail></BookDetail>}></Route>
    </Routes>
      <Footer />
    </BrowserRouter>

    
    </>
  )
}

export default App