import { Container, Row, Col } from 'react-bootstrap'
import { useSelector } from 'react-redux'
function Cart() {
    const { products } = useSelector((state) => state.cart)
    return (
      <Container>
        <Row>
          <Col>
            <h3 className="mt-3 text-center text-danger">Shopping Cart</h3>
            <table className="table mt-5">
              <thead>
                <tr>
                  <th>Book Image</th>
                  <th>Book Name</th>
                  <th>Author Name</th>
                  <th>Price</th>
                  <th>Actions</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {
                    products.map((product)=> 
                        <tr>
                            <td><img src={product.bookImage} heigth="30px" width="30px"></img></td>
                            <td>{product.bookTitle}</td>
                            <td>{product.authorName}</td>
                            <td>{product.originalPrice}</td>
                            <td>
                                <i className="bi bi-trash text-danger" ></i>
                            </td>
                        </tr>
                    )
                }
              </tbody>
            </table>
          </Col>
        </Row>
      </Container>
    );
}
export default Cart