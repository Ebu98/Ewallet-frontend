import axios from "axios";
import { useState, useEffect } from "react";
import {
  Col,
  Container,
  Row,
  Button,
  Card,
  Modal,
  Form,
  Alert,
} from "react-bootstrap";

const Wallet = () => {
  const [show, setShow] = useState(false);
  const [inputs, setInputs] = useState({
    currency: "",
    value: 0.0,
    action: "fund",
  });
  const [wallets, setWallets] = useState([]);
  const [isUpdate, setIsUpdate] = useState(false);
  const [error, setError] = useState({});
  const [id, setId] = useState(1);

  const handleClose = () => {
    setShow(false);
    setIsUpdate(false);
    setInputs({
      currency: "",
      value: 0.0,
      action: "fund",
    });
  };
  const createError = (err) => {
    if (err.response) {
      setError(err.response.data);
    } else {
      setError({ message: err.message });
    }
  };
  const handleShow = () => setShow(true);
  const handleChange = (key, value) => {
    return setInputs({ ...inputs, [key]: value });
  };
  const handleAction = (action, walletId) => {
    setId(walletId);
    handleChange("action", action);
    setIsUpdate(true);
    handleShow();
  };
  const updateWallet = async (token, id) => {
    const url = `http://127.0.0.1:8000/wallets/${id}/`;
    try {
      const { data } = await axios.put(
        url,
        { ...inputs },
        {
          headers: {
            Authorization: `Token ${token}`,
          },
        }
      );
      const updatedWallets = wallets.map((wallet) => {
        if (wallet.id === data.id) return data;
        return wallet;
      });
      setWallets(updatedWallets);
    } catch (err) {
      createError(err);
    }
  };
  const createWallet = async (token) => {
    const url = "http://127.0.0.1:8000/wallets/";
    try {
      const { data } = await axios.post(
        url,
        { ...inputs },
        {
          headers: {
            Authorization: `Token ${token}`,
          },
        }
      );
      setWallets([{ ...data }, { ...wallets }]);
    } catch (err) {
      createError(err);
    }
  };
  const modalSubmit = () => {
    const token = localStorage.getItem("token");
    if (isUpdate) {
      updateWallet(token, id);
    } else {
      createWallet(token);
    }
    handleClose();
  };
  useEffect(() => {
    const token = localStorage.getItem("token");
    const fetchData = async () => {
      try {
        const { data } = await axios.get("http://127.0.0.1:8000/wallets/", {
          headers: {
            Authorization: `Token ${token}`,
          },
        });
        setWallets(data);
      } catch (err) {
        createError(err);
      }
    };
    fetchData();
  }, []);
  return (
    <Container className="p-3">
      <Row>
        <Col>
          <h4>Ewallet</h4>
        </Col>
        <Col>
          <h6 style={{ textAlign: "center" }}>Codex</h6>
          <p style={{ textAlign: "center" }}>(Noob)</p>
        </Col>
        <Col className="d-flex justify-content-end">
          <Button style={{ height: "50px" }} onClick={handleShow}>
            Create Wallet
          </Button>
        </Col>
      </Row>
      <hr />
      <div className="w-50">
        {error ? (
          error.message ? (
            <Alert variant="danger">
              <p>{error.message}</p>
            </Alert>
          ) : error.error ? (
            <Alert variant="danger">
              <p>{error.error}</p>
            </Alert>
          ) : (
            Object.keys(error).map((message) => (
              <Alert variant="danger">
                <p>
                  {message}: {error[message][0]}
                </p>
              </Alert>
            ))
          )
        ) : (
          ""
        )}
      </div>
      {wallets.length
        ? wallets.map((wallet) => (
            <Card key={wallet.id} style={{ width: "15rem" }}>
              <Card.Body>
                <Card.Title>{wallet.currency}</Card.Title>
                <Card.Text>{wallet.value}</Card.Text>
                <Card.Link onClick={() => handleAction("withdraw", wallet.id)}>
                  Withdraw
                </Card.Link>
                <Card.Link onClick={() => handleAction("fund", wallet.id)}>
                  Fund
                </Card.Link>
              </Card.Body>
            </Card>
          ))
        : ""}

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Wallet</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form.Group className="mb-3 border p-3">
            <Row>
              <Col xs={4}>
                <Form.Label>Currency</Form.Label>
                <Form.Control
                  type="text"
                  name="currency"
                  placeholder="NGN"
                  onChange={(e) => handleChange("currency", e.target.value)}
                  value={inputs.currency}
                />
              </Col>
              <Col xs={6}>
                <Form.Label>Value</Form.Label>
                <Form.Control
                  type="text"
                  name="value"
                  placeholder="Enter Value"
                  value={inputs.value}
                  onChange={(e) => handleChange("value", e.target.value)}
                />
              </Col>
            </Row>
          </Form.Group>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={modalSubmit}>
            {isUpdate
              ? inputs.action.charAt(0).toUpperCase() + inputs.action.slice(1)
              : "Create"}
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default Wallet;
