// import axios from 'axios'
// import { useState, useEffect } from 'react'
// import { Container, Row, Col, Card, Button, Badge } from 'react-bootstrap'
// import { useNavigate } from 'react-router-dom'
// import ImageSlider from './ImageSlider.jsx'
// const apiUrl = import.meta.env.VITE_API_URL

// function HomeCard () {
//   let navigate = useNavigate();
//   let [books, setBooks] = useState([])

//   useEffect(() => {
//     axios({
//       url: apiUrl + '/user/books',
//       method: 'get'
//     })
//       .then(res => {
//         setBooks(res.data.data)
//       })
//       .catch(err => {
//         console.log(err)
//       })
//   }, [])
//   function goToDetailPage(id) {
//      navigate('/user/book/detail/' + id);
//   }

//   return (
//     <Container
//   fluid
//   className='px-4 py-4'
//   style={{
//     backgroundColor: '#f5f7fa',
//     minHeight: '100vh'
//   }}
// >
//   <ImageSlider></ImageSlider>

//       {/* Heading */}
//       <div className='text-center mb-2'>
//         <div className='d-flex align-items-center justify-content-center gap-2 mb-2'>
//         </div>
//       </div>

//       {/* Books */}
//       <Row className='g-4'>
//         {books.map((book, index) => (
//           <Col key={index} xs={12} sm={6} md={4} lg={3}>
//             <Card className="bookCard" onClick={() => goToDetailPage(book._id)}
//   className='h-100 border-0
//   bookCard'
//   style={{
//     borderRadius: '12px',
//     overflow: 'hidden',
//     backgroundColor: '#ffffff',
//     boxShadow: '0 4px 15px rgba(0, 0, 0, 0.12)'
//   }}
// >
//               {/* Image Section */}
//               <div
//                 style={{
//                   height: '250px',
//                   width: '100%',
//                   display: 'flex',
//                   justifyContent: 'center',
//                   alignItems: 'center',
//                   padding: '10px'
//                 }}
//               >
//                 <img
//                   src={book.bookImage}
//                   alt={book.bookTitle}
//                   style={{
//                     height: '100%',
//                     width: '100%',
//                     objectFit: 'contain',
//                     display: 'block'
//                   }}
//                 />
//               </div>

//               {/* Card Body */}
//               <Card.Body
//                 className='d-flex flex-column'
//                 style={{
//                   padding: '15px 18px'
//                 }}
//               >
//                 {/* Book Title */}
//                 <Card.Title
//                   className='fw-bold mb-2'
//                   style={{
//                     fontSize: '17px',
//                     color: '#172b3d',
//                     minHeight: '42px'
//                   }}
//                 >
//                   {book.bookTitle}
//                 </Card.Title>

//                 {/* Publication Year */}
//                 <div
//                   className='text-secondary mb-3'
//                   style={{
//                     fontSize: '16px'
//                   }}
//                 >
//                   <i className='bi bi-calendar3 me-2'></i>
//                   {book.publicationYear}
//                 </div>


//                 {/* Author */}
//                 <div
//                   className='text-secondary mb-2'
//                   style={{
//                     fontSize: '16px'
//                   }}
//                 >
//                   <i className='bi bi-person-fill me-2'></i>
//                   {book.authorName} <br /><br />
//                   { book.DiscountDetail.length > 0  ? <span> <s> &#x20b9;{book.originalPrice}</s></span> : <span> <s> &#x20b9;{book.originalPrice}</s></span>  }
//                 </div>


//                     {/* <span className='fw-bold text-success>
//                     {
//                       book.DiscountDetail.length > 0 && 
//                       book.originalPrice - ((originalPrice * book.DiscountDetail[0].discountValue) / 100)
//                     }
//                   </span>  */}

//                 {/* Price + Available */}
//                 <div className='d-flex align-items-center mb-3'>
//                   <span
//                     className='fw-bold'
//                     style={{ 
//                       fontSize: '25px',
//                       color: '#172b3d'
//                     }}
//                   >
//                     &#x20B9;{book.originalPrice}
//                   </span>
//                   <span className='ms-2 fw-bold text-success'>{
//                     book.DiscountDetail.length > 0 && 
//                     book.DiscountDetail[0].discountValue 
//                   }
//                   </span>
//                   <span className='fw-bold text-success'>
//                     {
//                       book.DiscountDetail.length > 0 && '% Off'
//                     }
//                   </span>

//                   <Badge
//                     bg='success'
//                     className='ms-2'
//                     style={{
//                       fontSize: '14px',
//                       padding: '7px 10px',
//                       borderRadius: '7px'
//                     }}
//                   >
//                     Available
//                   </Badge>
//                 </div>

                

//                 {/* View Details Button */}
//                 <Button 
//                   onClick={() => goToDetailPage(book._id)}
//                   variant='dark'
//                   className='w-100 mt-auto'
//                   style={{
//                     borderRadius: '10px',
//                     padding: '10px',
//                     fontSize: '17px',
//                     backgroundColor: '#172126',
//                     border: 'none'
//                   }}
//                 >
//                   <i className='bi bi-eye-fill me-2'></i>
//                   View Details
//                 </Button>
//               </Card.Body>
//             </Card>
//           </Col>
//         ))}
//       </Row>
//     </Container>
//   )
// }

// export default HomeCard




import axios from 'axios'
import { useState, useEffect } from 'react'
import { Container, Row, Col, Card, Button, Badge } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import ImageSlider from './ImageSlider.jsx'

const apiUrl = import.meta.env.VITE_API_URL

function HomeCard () {
  const navigate = useNavigate()
  const [books, setBooks] = useState([])

  useEffect(() => {
    axios({
      url: apiUrl + '/user/books',
      method: 'get'
    })
      .then(res => {
        setBooks(Array.isArray(res.data.data) ? res.data.data : [])
      })
      .catch(err => {
        console.error('Error fetching books:', err)
      })
  }, [])

  function goToDetailPage (id) {
    navigate('/user/book/detail/' + id)
  }

  return (
    <>
      <style>
        {`
          .book-card {
            height: 100%;
            border: 1px solid #e5eaf0 !important;
            border-radius: 14px !important;
            overflow: hidden;
            cursor: pointer;
            background: #ffffff;
            box-shadow: 0 3px 10px rgba(0, 0, 0, 0.06);
            transition: transform 0.3s ease, box-shadow 0.3s ease;
          }

          .book-card:hover {
            transform: translateY(-6px);
            box-shadow: 0 12px 26px rgba(0, 0, 0, 0.14) !important;
          }

          .book-card .book-image {
            transition: transform 0.35s ease;
          }

          .book-card:hover .book-image {
            transform: scale(1.05);
          }

          .book-card .view-details-btn {
            background-color: #172b3d;
            border: none;
            transition: background-color 0.3s ease;
          }

          .book-card:hover .view-details-btn {
            background-color: #0d6efd;
          }

          @media (prefers-reduced-motion: reduce) {
            .book-card,
            .book-card .book-image,
            .book-card .view-details-btn {
              transition: none;
            }
          }
        `}
      </style>

      <Container
        fluid
        className='px-4 pt-2 pb-4'
        style={{
          backgroundColor: '#f5f7fa',
          minHeight: '100vh'
        }}
      >
        <ImageSlider />

        <Row className='g-4 mt-1'>
          {books.map(book => {
            const discount = book.DiscountDetail?.[0]
            const hasDiscount = book.DiscountDetail?.length > 0

            const finalPrice = hasDiscount
              ? book.originalPrice -
                (book.originalPrice * discount.discountValue) / 100
              : book.originalPrice

            return (
              <Col key={book._id} xs={12} sm={6} lg={4}>
                <Card
                  onClick={() => goToDetailPage(book._id)}
                  className='book-card'
                >
                  <Card.Body
                    className='d-flex align-items-center gap-4'
                    style={{
                      padding: '20px',
                      minHeight: '250px'
                    }}
                  >
                    <div
                      style={{
                        width: '135px',
                        minWidth: '135px',
                        height: '215px',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        flexShrink: 0
                      }}
                    >
                      <div
                        style={{
                          width: '100%',
                          height: '160px',
                          display: 'flex',
                          justifyContent: 'center',
                          alignItems: 'center',
                          overflow: 'hidden'
                        }}
                      >
                        <img
                          className='book-image'
                          src={book.bookImage}
                          alt={book.bookTittle}
                          style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'contain',
                            display: 'block'
                          }}
                        />
                      </div>

                      <div
                        style={{
                          width: '100%',
                          height: '45px',
                          marginTop: '10px'
                        }}
                      />
                    </div>

                    <div
                      className='d-flex flex-column flex-grow-1'
                      style={{
                        minWidth: 0,
                        minHeight: '210px'
                      }}
                    >
                      <Card.Title
                        className='fw-bold mb-3'
                        style={{
                          fontSize: '18px',
                          lineHeight: '1.4',
                          color: '#172b3d',
                          overflowWrap: 'anywhere'
                        }}
                      >
                        {book.bookTittle}
                      </Card.Title>

                      <div
                        className='text-secondary mb-3'
                        style={{ fontSize: '14px' }}
                      >
                        <i className='bi bi-person-fill me-2'></i>
                        {book.authorName}
                      </div>

                      <div
                        className='text-secondary mb-3'
                        style={{ fontSize: '14px' }}
                      >
                        <i className='bi bi-calendar3 me-2'></i>
                        {book.publicationYear}
                      </div>

                      <div className='d-flex flex-wrap align-items-center gap-2 mb-3'>
                        {hasDiscount ? (
                          <>
                            <span
                              className='fw-bold'
                              style={{
                                fontSize: '23px',
                                color: '#172b3d'
                              }}
                            >
                              ₹{finalPrice.toFixed(2)}
                            </span>

                            <span
                              className='text-secondary'
                              // style={{ fontSize: '14px' }}
                            >
                              <s>₹{book.originalPrice}</s>
                            </span>

                            <span className='fw-bold text-success'>
                              {discount.discountValue}% Off
                            </span>
                          </>
                        ) : (
                          <span
                            className='fw-bold'
                            style={{
                              fontSize: '23px',
                              color: '#172b3d'
                            }}
                          >
                            ₹{book.originalPrice}
                          </span>
                        )}
                      </div>

                      <div className='mb-3'>
                        <Badge
                          bg='success'
                          style={{
                            fontSize: '12px',
                            padding: '7px 9px',
                            borderRadius: '6px'
                          }}
                        >
                          Available
                        </Badge>
                      </div>

                      <Button
                        onClick={e => {
                          e.stopPropagation()
                          goToDetailPage(book._id)
                        }}
                        className='view-details-btn w-100 mt-auto'
                        style={{
                          borderRadius: '9px',
                          padding: '9px 6px',
                          fontSize: '15px'
                        }}
                      >
                        <i className='bi bi-eye-fill me-2'></i>
                        View Details
                      </Button>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            )
          })}
        </Row>

        {books.length === 0 && (
          <div className='text-center py-5 text-secondary'>
            No books available right now.
          </div>
        )}
      </Container>
    </>
  )
}

export default HomeCard