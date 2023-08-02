import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import ListGroup from "react-bootstrap/ListGroup";
import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import useDHT from "../../hooks/dht.js";
import useSwarm from "../../hooks/swarm.js";
import b4a from "b4a";

const notifOpts = {
  position: "bottom-left",
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: false,
  pauseOnHover: true,
  draggable: true,
};

function Chat() {
  const [dht] = useDHT();
  const [swarm] = useSwarm(dht);

  const [status, setStatus] = useState("");
  const [msg, setMsg] = useState("");
  const [history, setHistory] = useState([]);
  const username = window.localStorage.getItem("username")
    ? window.localStorage.getItem("username")
    : "Guest";
  useEffect(() => {
    if (!swarm) return;
    console.log("new swarm");

    swarm.on("connection", onsocket);
    swarm.on("connection", notifs);

    const topic = b4a.alloc(32).fill("game-room-002"); // + custom room name, prefix + hash it
    swarm.join(topic);

    function onsocket(socket, info) {
      socket.setKeepAlive(5000);
      socket.setTimeout(15000);

      socket.on("error", (err) =>
        console.error("socket error", err.code || err.message)
      );

      socket.on("data", function (data) {
        console.log("data", data);
        addToHistory({ from: socket, message: b4a.toString(data) });
      });
    }

    function notifs(socket, info) {
      const pk = shortPublicKey(socket.remotePublicKey);

      setStatus("Total peers: " + swarm.connections.size);
      toast.success(
        "New peer: " + pk + " (total " + swarm.connections.size + ")",
        notifOpts
      );

      socket.once("close", function () {
        setStatus("Total peers: " + swarm.connections.size);
        toast.error(
          "Peer closed: " + pk + " (total " + swarm.connections.size + ")",
          notifOpts
        );
      });
    }

    return () => {
      swarm.leave(topic);
      swarm.off("connection", onsocket);
      swarm.off("connection", notifs);
    };
  }, [swarm]);

  console.log("new app render", history.length);

  const addToHistory = ({ from, message }) => {
    // message = shortPublicKey(from.remotePublicKey) + ": " + message;
    setHistory((history) => [...history, message]);
    return message;
  };

  const handlePushMsg = () => {
    if (msg == "") return;
    if (!swarm) return;
    if (!msg) return;

    if (swarm.connections.size === 0) {
      toast.warning("Wait for peers to send messages", notifOpts);
      setMsg("");
      return;
    }

    const self = { remotePublicKey: swarm.keyPair.publicKey };
    addToHistory({ from: self, message: username + ": " + msg });

    for (const socket of swarm.connections) {
      socket.write(username + ": " + msg);
    }

    setMsg("");
  };

  return (
    <div className="App">
      <Container>
        <h2>Welcome {username}!</h2>
        <p>{status}</p>

        <Row>
          <Col lg={9}>
            <Form.Control
              type="text"
              placeholder="Write a message"
              value={msg}
              onChange={(e) => setMsg(e.target.value)}
            />
          </Col>

          <Col lg={3}>
            <Button variant="primary" onClick={() => handlePushMsg()}>
              Send
            </Button>
          </Col>
        </Row>

        <br />
        <br />
        <p>Message History</p>

        <ListGroup variant="flush">
          {history.map((item, index) => (
            <ListGroup.Item key={index}>{item}</ListGroup.Item>
          ))}
        </ListGroup>
      </Container>
      <ToastContainer />
    </div>
  );
}

export default Chat;

function shortPublicKey(publicKey) {
  return b4a.toString(publicKey, "hex").slice(0, 6);
}
