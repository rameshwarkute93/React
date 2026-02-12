import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useState } from 'react';
import "./About.css"

export default function About(){

  const [fn , setFn] = useState("");
  const [sn , setSn] = useState("");
  const [result , SetResult] = useState("");

  let getFirst = (e) =>{
    setFn(e.target.value);
  }

  let getSecond = (e) =>{
    setSn(e.target.value);
  }

  function add(){
    SetResult(Number(fn) + Number(sn));
  }

  return(
    <div className="container mt-5">

      <div className="card glass-card shadow-lg border-0 rounded-4 p-4 text-center">

        <h3 className="gradient-text fw-bold mb-4">
          About Calculator
        </h3>

        <Form>

          <Form.Group className="mb-3">
            <Form.Control
              type="number"
              placeholder="Enter First Number"
              onChange={getFirst}
              className="modern-input text-center"
            />
          </Form.Group>

          <Form.Group className="mb-4">
            <Form.Control
              type="number"
              placeholder="Enter Second Number"
              onChange={getSecond}
              className="modern-input text-center"
            />
          </Form.Group>

          <Button className="btn-save px-4" onClick={add}>
            Calculate Result
          </Button>

          <Form.Group className="mt-4">
            <Form.Control
              type="text"
              placeholder="Total"
              value={result}
              readOnly
              className="modern-input text-center fw-bold"
            />
          </Form.Group>

        </Form>

      </div>

    </div>
  )
}
