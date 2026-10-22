import { Container, Row, Col } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import { deleteProduct, totalCost } from "./features/cart/cartSlice";
function Cart() {
  const { products, totalCost } = useSelector((state) => state.cart);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const deleteFromCart = (id) => {
    dispatch(deleteProduct(id));
  };
  
  return (
    <Container>
      <Row>
        <Col>
          {/* Back Button */}
          <Button
            variant="dark"
            className="mb-4 mt-3"
            onClick={() => navigate("/")}
          >
            ← Back
          </Button>
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
              {products.map((product) => (
                <tr>
                  <td>
                    <img
                      src={product.bookImage}
                      heigth="300px"
                      width="300px"
                    ></img>
                  </td>
                  <td>{product.bookTitle}</td>
                  <td>{product.authorName}</td>
                  <td>₹{product.originalPrice}</td>
                  <td>
                    <i
                      className="bi bi-trash text-danger"
                      onClick={() => deleteFromCart(product._id)}
                    ></i>
                  </td>
                </tr>
              ))}
              <tr>
                <td></td>
                <td></td>
                <td>TotalCost</td>
                <td>₹{totalCost}</td>
                <td></td>
              </tr>
            </tbody>
          </table>
          <Button
            style={{ width: "250px", float: "right" }}
            size="lg"
            variant="warning"
            onClick = {() => navigate('/checkout')}
          >
            Proceed For Check out
          </Button>
        </Col>
      </Row>
    </Container>
  );
}
export default Cart;