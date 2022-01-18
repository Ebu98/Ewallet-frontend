// import { useState } from "react";
import { Col, Container, Row, Card } from "react-bootstrap";

const Admin = () => {
  // const [inputs, setInputs] = useState({
  //   currency: "",
  //   value: 0.0,
  //   action: "fund",
  // });
  return (
    <Container className="p-3">
      <Row>
        <Col>
          <h4>Ewallet</h4>
        </Col>
        <Col>
          <h6 style={{ textAlign: "center" }}>TonyKings</h6>
          <p style={{ textAlign: "center" }}>(Admin)</p>
        </Col>
        <Col></Col>
      </Row>
      <hr />
      <Row>
        <Col sm={3}>
          <Card>
            <Card.Body>
              <Card.Title>Ebu98@gmail.com</Card.Title>
              <Card.Subtitle>
                (Ebuka) <Card.Link href="/">Fund</Card.Link>
              </Card.Subtitle>
              <br />
              <Card.Text>Elite</Card.Text>
              <Card.Link onClick={() => {}}>Demote</Card.Link>
              <Card.Link onClick={() => {}}>Change default wallet</Card.Link>
            </Card.Body>
          </Card>
        </Col>
        <Col sm={3}>
          <Card>
            <Card.Body>
              <Card.Title>Chukwudieze97@gmail.com</Card.Title>
              <Card.Subtitle>
                (Chukwudi) <Card.Link href="/">Fund</Card.Link>
              </Card.Subtitle>

              <br />
              <Card.Text>Elite</Card.Text>
              <Card.Link onClick={() => {}}>Demote</Card.Link>
              <Card.Link onClick={() => {}}>Change default wallet</Card.Link>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Admin;
