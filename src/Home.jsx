import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import "./Home.css"
export default function Home() {

  const [text, SetText] = useState("");

  let gettext = (e) => {
    SetText(e.target.value);
  }

  function print() {
    alert(text);
  }

  return (
    <div className="container mt-5">

      <div className="card glass-card shadow-lg border-0 rounded-4 p-4 text-center">

        <h3 className="gradient-text fw-bold mb-4">
          Home Form
        </h3>

        <Form>

          <Form.Group className="mb-4">
            <Form.Control
              type="text"
              placeholder="Enter Your Name"
              onChange={gettext}
              className="modern-input text-center"
            />
          </Form.Group>

          <Button className="btn-save px-4" onClick={print}>
            Click Me
          </Button>

        </Form>

        <h4 className="mt-4 fw-semibold">
          Data is Here : <span className="text-primary">{text}</span>
        </h4>

      </div>

    </div>
  );
}
