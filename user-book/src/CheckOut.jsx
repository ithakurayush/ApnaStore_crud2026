
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useState } from "react";

const apiUrl = import.meta.env.VITE_API_URL;

function CheckOut() {
    const { products, totalCost } = useSelector((state) => state.cart);

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [mobileNo, setMobileNo] = useState("");
    const [addressLine1, setAddressLine1] = useState("");
    const [addressLine2, setAddressLine2] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const [country, setCountry] = useState("");
    const [pinCode, setPinCode] = useState("");

    const loadScript = (src) => {
        return new Promise((resolve) => {
            const script = document.createElement("script");

            script.src = src;

            script.onload = () => resolve(true);
            script.onerror = () => resolve(false);

            document.body.appendChild(script);
        });
    };

    const goForPayment = async () => {
        try {
            if (!products.length) {
                alert("Your cart is empty");
                return;
            }

            if (
                !firstName ||
                !lastName ||
                !email ||
                !mobileNo ||
                !addressLine1 ||
                !city ||
                !state ||
                !country ||
                !pinCode
            ) {
                alert("Please fill in all required shipping details");
                return;
            }

            const data = {
                firstName,
                lastName,
                email,
                mobileNo,
                addressLine1,
                addressLine2,
                city,
                state,
                country,
                pinCode,
                products,
                amount: totalCost
            };

            const res = await loadScript(
                "https://checkout.razorpay.com/v1/checkout.js"
            );

            if (!res) {
                alert("Unable to load Razorpay");
                return;
            }

            const response = await fetch(apiUrl + "/create-order", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            });

            const orderData = await response.json();

            if (!response.ok) {
                alert(
                    orderData.message ||
                    "Unable to create payment order"
                );
                return;
            }

            const options = {
                key: "rzp_test_TsQcL07XjaFhdQ",
                amount: orderData.amount,
                currency: orderData.currency,
                name: "REDC BookStore",
                description: "Payment for Books",
                order_id: orderData.id,

                handler: async function (paymentResponse) {
                    try {
                        const verifyResponse = await fetch(
                            apiUrl + "/verify-payment",
                            {
                                method: "POST",
                                headers: {
                                    "Content-Type": "application/json"
                                },
                                body: JSON.stringify(paymentResponse)
                            }
                        );

                        const verifyData = await verifyResponse.json();

                        if (verifyResponse.ok) {
                            alert("Payment has been completed successfully");
                        } else {
                            alert(
                                verifyData.message ||
                                "Payment verification failed"
                            );
                        }
                    } catch (error) {
                        console.error(error);
                        alert("Unable to verify payment");
                    }
                },

                prefill: {
                    name: `${firstName} ${lastName}`.trim(),
                    email: email,
                    contact: mobileNo
                },

                theme: {
                    color: "#3399cc"
                }
            };

            const paymentObject = new window.Razorpay(options);

            paymentObject.on("payment.failed", function (response) {
                console.error(response.error);

                alert("Payment failed. Please try again.");
            });

            paymentObject.open();

        } catch (error) {
            console.error(error);

            alert("Something went wrong while processing payment");
        }
    };

    return (
        <Container>
            <Row>
                <Col>
                    <h4 className="text-center text-danger mt-5">
                        Shipping Details
                    </h4>

                    <Form>
                        <Row>
                            <Col>
                                <Form.Group>
                                    <Form.Label>First Name</Form.Label>
                                    <Form.Control
                                        type="text"
                                        value={firstName}
                                        onChange={(e) =>
                                            setFirstName(e.target.value)
                                        }
                                    />
                                </Form.Group>
                            </Col>

                            <Col>
                                <Form.Group>
                                    <Form.Label>Last Name</Form.Label>
                                    <Form.Control
                                        type="text"
                                        value={lastName}
                                        onChange={(e) =>
                                            setLastName(e.target.value)
                                        }
                                    />
                                </Form.Group>
                            </Col>
                        </Row>

                        <Row className="mt-2">
                            <Col>
                                <Form.Group>
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control
                                        type="email"
                                        value={email}
                                        onChange={(e) =>
                                            setEmail(e.target.value)
                                        }
                                    />
                                </Form.Group>
                            </Col>

                            <Col>
                                <Form.Group>
                                    <Form.Label>Mobile No.</Form.Label>
                                    <Form.Control
                                        type="tel"
                                        value={mobileNo}
                                        onChange={(e) =>
                                            setMobileNo(e.target.value)
                                        }
                                    />
                                </Form.Group>
                            </Col>
                        </Row>

                        <h5 className="mt-3 text-primary">
                            Shipping Address
                        </h5>

                        <Row className="mt-2">
                            <Col>
                                <Form.Group>
                                    <Form.Label>Address Line 1</Form.Label>
                                    <Form.Control
                                        type="text"
                                        value={addressLine1}
                                        onChange={(e) =>
                                            setAddressLine1(e.target.value)
                                        }
                                    />
                                </Form.Group>
                            </Col>
                        </Row>

                        <Row className="mt-2">
                            <Col>
                                <Form.Group>
                                    <Form.Label>Address Line 2</Form.Label>
                                    <Form.Control
                                        type="text"
                                        value={addressLine2}
                                        onChange={(e) =>
                                            setAddressLine2(e.target.value)
                                        }
                                    />
                                </Form.Group>
                            </Col>
                        </Row>

                        <Row className="mt-2">
                            <Col>
                                <Form.Group>
                                    <Form.Label>Country</Form.Label>
                                    <Form.Control
                                        type="text"
                                        value={country}
                                        onChange={(e) =>
                                            setCountry(e.target.value)
                                        }
                                    />
                                </Form.Group>
                            </Col>

                            <Col>
                                <Form.Group>
                                    <Form.Label>State</Form.Label>
                                    <Form.Control
                                        type="text"
                                        value={state}
                                        onChange={(e) =>
                                            setState(e.target.value)
                                        }
                                    />
                                </Form.Group>
                            </Col>
                        </Row>

                        <Row className="mt-2">
                            <Col>
                                <Form.Group>
                                    <Form.Label>City</Form.Label>
                                    <Form.Control
                                        type="text"
                                        value={city}
                                        onChange={(e) =>
                                            setCity(e.target.value)
                                        }
                                    />
                                </Form.Group>
                            </Col>

                            <Col>
                                <Form.Group>
                                    <Form.Label>Pin Code</Form.Label>
                                    <Form.Control
                                        type="text"
                                        value={pinCode}
                                        onChange={(e) =>
                                            setPinCode(e.target.value)
                                        }
                                    />
                                </Form.Group>
                            </Col>
                        </Row>
                    </Form>
                </Col>

                <Col>
                    <h4 className="text-center text-danger mt-5">
                        Product Summary
                    </h4>

                    <table className="table mt-2">
                        <thead>
                            <tr>
                                <th>Book Image</th>
                                <th>Book Name</th>
                                <th>Price</th>
                            </tr>
                        </thead>

                        <tbody>
                            {products.map((product) => (
                                <tr key={product._id}>
                                    <td>
                                        <img
                                            src={product.bookImage}
                                            height="100"
                                            width="80"
                                            alt={product.bookTitle}
                                        />
                                    </td>

                                    <td>{product.bookTitle}</td>

                                    <td>
                                        ₹ {product.originalPrice}
                                    </td>
                                </tr>
                            ))}

                            <tr>
                                <td></td>
                                <td>Total Cost</td>
                                <td>₹ {totalCost}</td>
                            </tr>
                        </tbody>
                    </table>

                    <Button
                        style={{
                            width: "180px",
                            float: "right"
                        }}
                        size="lg"
                        variant="warning"
                        className="mt-2"
                        onClick={goForPayment}
                    >
                        Pay Now
                    </Button>
                </Col>
            </Row>
        </Container>
    );
}

export default CheckOut;
