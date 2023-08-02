import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import { setUserName } from "../../store/userProfile";

function Home() {
  //   const dispatch = useDispatch();
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  const handleNavigate = () => {
    window.localStorage.setItem("username", username);
    // dispatch(setUserName(username));
    navigate("/chat");
  };
  return (
    <>
      <Container>
        <Row>
          <h1>Welcome</h1>
        </Row>
        <Row>
          <Col lg={4}>
            <label>Type username</label>
          </Col>
          <Col lg={4}>
            <input
              placeholder="James"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </Col>
          <Col lg={4}>
            {username === "" ? (
              <Button variant="secondary">Send</Button>
            ) : (
              <Button variant="primary" onClick={() => handleNavigate()}>
                Send
              </Button>
            )}
          </Col>
        </Row>
      </Container>
    </>
  );
}
export default Home;
