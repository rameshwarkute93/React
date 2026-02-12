import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import {useEffect, useState } from "react";
import axios from 'axios';
import { data } from 'react-router-dom';
import { use } from 'react';
import "./Table.css"
export default function GPDP(){

const [show, setShow] = useState(false);
const handleClose = () => setShow(false);
const handleShow = () => setShow(true);


// GET
const[data , setData] = useState([]);
let api = () =>{
  axios.get("http://localhost:8080/stud")
  .then(res =>{
    setData(res.data)
  })
}


//POST
const[nm , setName] = useState("");
const[ct , setCity] = useState("");
let getname = (e) =>{
  setName(e.target.value);
}
let getcity = (e) =>{
  setCity(e.target.value);
}
let addStudent = () =>{
  const dt = {
    name : nm,
    city : ct 
  }
  alert(nm + " " + ct)
  axios.post("http://localhost:8080/save",dt)
  .then(res =>{
    alert("Added Successfully")
    api()
    setShow(false)
  })
}


// DELETE
let Delete = (id) =>{
  alert(id)
  axios.delete(`http://localhost:8080/del/${id}`)
  .then(res =>{
    alert("Deleted Successfully")
    api()
    setShow(false)
  })
}


// PUT
const [ushow, setUShow] = useState(false);
const uhandleClose = () => setUShow(false);
const uhandleShow = () => setUShow(true);

const[uid , setUid] = useState("");
const[unm , setUName] = useState("");
const[uct , setUCity] = useState("");
let getdata = (id , name , city) =>{
  setUid(id);
  setUName(name);
  setUCity(city)
}
let getnm = (e) =>{
  setUName(e.target.value)
}
let getct = (e) =>{
  setUCity(e.target.value)
}
let Update = () => {
  alert(unm + " " + uct)
  const dt = {
    name : unm,
    city : uct,
    id : uid
  }
  axios.put("http://localhost:8080/update",dt)
  .then(res =>{
    alert("Update Successfully")
    api()
    setUShow(false)
  })
}




useEffect(()=>{
  api()
},[])

  return(
    <>


      {/* <Button variant="secondary" onClick={handleShow} style={{margin:10}}>Add Student</Button> */}
      {/* Save Form*/}
<Modal show={show} onHide={handleClose} centered>
  <Modal.Header closeButton className="modern-modal-header">
    <Modal.Title className="gradient-text">Add New Student</Modal.Title>
  </Modal.Header>

  <Modal.Body className="modern-modal-body">
    <Form>
      <Form.Group className="mb-3">
        <Form.Label className="form-label-modern">Student Name</Form.Label>
        <Form.Control
          type="text"
          onChange={getname}
          placeholder="Enter student name"
          className="modern-input"
        />
      </Form.Group>

      <Form.Group>
        <Form.Label className="form-label-modern">City</Form.Label>
        <Form.Control
          type="text"
          onChange={getcity}
          placeholder="Enter city"
          className="modern-input"
        />
      </Form.Group>
    </Form>
  </Modal.Body>

  <Modal.Footer className="border-0">
    <Button className="btn-cancel" onClick={handleClose}>
      Close
    </Button>
    <Button className="btn-save" onClick={addStudent}>
      Save Student
    </Button>
  </Modal.Footer>
</Modal>


{/* Update Form*/}
<Modal show={ushow} onHide={uhandleClose} centered>
  <Modal.Header closeButton className="modern-modal-header">
    <Modal.Title className="gradient-text">Update Student</Modal.Title>
  </Modal.Header>

  <Modal.Body className="modern-modal-body">
    <Form>
      <Form.Group className="mb-3">
        <Form.Label className="form-label-modern">Student Name</Form.Label>
        <Form.Control
          type="text"
          value={unm}
          onChange={getnm}
          className="modern-input"
        />
      </Form.Group>

      <Form.Group>
        <Form.Label className="form-label-modern">City</Form.Label>
        <Form.Control
          type="text"
          value={uct}
          onChange={getct}
          className="modern-input"
        />
      </Form.Group>
    </Form>
  </Modal.Body>

  <Modal.Footer className="border-0">
    <Button className="btn-cancel" onClick={uhandleClose}>
      Close
    </Button>
    <Button className="btn-update" onClick={Update}>
      Update Student
    </Button>
  </Modal.Footer>
</Modal>



<div className="container mt-4">
  <div className="card border-0 shadow-lg rounded-4 glass-card">

    {/* Header Section */}
    <div className="card-body">

      <div className="d-flex justify-content-between align-items-center mb-4">
        <h4 className="fw-bold gradient-text mb-0">Student Dashboard</h4>

        <Button className="add-btn" onClick={handleShow}>
          + Add Student
        </Button>
      </div>

      <div className="table-responsive">
        <table className="table align-middle text-center modern-table">

          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>City</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {data.map((item) => (
              <tr key={item.id}>
                <td className="fw-semibold">{item.id}</td>
                <td>{item.name}</td>
                <td>
                  <span className="badge bg-info-subtle text-dark px-3 py-2 rounded-pill">
                    {item.city}
                  </span>
                </td>

                <td>
                  <Button
                    size="sm"
                    className="btn-delete me-2"
                    onClick={() => Delete(item.id)}
                  >
                    Delete
                  </Button>

                  <Button
                    size="sm"
                    className="btn-update"
                    onClick={() => {
                      getdata(item.id, item.name, item.city);
                      uhandleShow();
                    }}
                  >
                    Update
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>

        </table>
      </div>

    </div>
  </div>
</div>


    </>
  )
}