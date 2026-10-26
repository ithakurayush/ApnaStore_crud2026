import { useState, useEffect } from "react";
const apiUrl = import.meta.env.VITE_API_URL;
import { Col, Container, Row, Table } from "react-bootstrap";
import axios from "axios";

function TransactionList() {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    axios({
      url: apiUrl + "/transactions",
      method: "get",
    })
      .then((res) => {
        setTransactions(res.data.data);
      })
      .catch((err) => {
        alert(err);
      });
  }, []);

  return (
    <Container>
      <Row>
        <Col>
          <h3 className="text-center text-danger mt-5">Transactions List</h3>
          <Table bordered>
            <thead>
              <tr>
                <th>TransactionId</th>
                <th>Email</th>
                <th>Products</th>
                <th>Amount</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {/* FIX: Changed { } to ( ) to implicitly return the JSX */}
              {transactions.map((transaction) => (
                <tr key={transaction.transactionId}>
                  <td>{transaction.transactionId}</td>
                  <td>{transaction.email}</td>
                  <td>{transaction.products?.[0]?.bookTitle}</td>
                  <td>{transaction.amount}</td>
                  <td>{transaction.status}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>
      </Row>
    </Container>
  );
}

export default TransactionList;