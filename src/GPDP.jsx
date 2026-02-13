import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import {useEffect, useState } from "react";
import axios from 'axios';
import "./Table.css"

export default function GPDP(){

const [show, setShow] = useState(false);
const handleClose = () => setShow(false);
const handleShow = () => setShow(true);

// ⭐ highlight row
const [changedId , setChangedId] = useState(null);

// ⭐ store uploaded file names
const [fileNames , setFileNames] = useState({});



// ======================= GET =======================
const[data , setData] = useState([]);
// let api = ()=>{
//   axios.get("http://localhost:8080/stud")
//   .then(res=>setData(res.data))
// }

let api = ()=>{
  axios.get("http://localhost:8080/stud")
  .then(res=>{

    setData(res.data);

    // ⭐ LOAD FILE NAMES AFTER REFRESH
    res.data.forEach(stud=>{

      axios.get(`http://localhost:8080/fileinfo/${stud.id}`)
      .then(r=>{

        if(r.data){
          setFileNames(prev=>({
            ...prev,
            [stud.id]: r.data.fileName
          }))
        }

      }).catch(()=>{})
    })

  })
}


// ======================= POST =======================
const[nm , setName] = useState("");
const[ct , setCity] = useState("");

let addStudent = ()=>{
  axios.post("http://localhost:8080/save",{name:nm,city:ct})
  .then(()=>{
    alert("Added Successfully");
    api();
    setShow(false);
  })
}

// ======================= DELETE =======================
let Delete = (id)=>{
  axios.delete(`http://localhost:8080/del/${id}`)
  .then(()=>{
    alert("Deleted Successfully");
    api();
  })
}

// ======================= PUT =======================
const [ushow, setUShow] = useState(false);
const uhandleClose = () => setUShow(false);
const uhandleShow = () => setUShow(true);

const[uid , setUid] = useState("");
const[unm , setUName] = useState("");
const[uct , setUCity] = useState("");

let getdata = (id , name , city)=>{
  setUid(id);
  setUName(name);
  setUCity(city);
}

let Update = ()=>{
  axios.put("http://localhost:8080/update",{id:uid,name:unm,city:uct})
  .then(()=>{
    alert("Update Successfully");
    api();
    setUShow(false);
  })
}

// ======================= FILE UPLOAD =======================
const uploadFile = (rid , selectedFile)=>{

  if(!selectedFile) return;

  const formData = new FormData();
  formData.append("file", selectedFile);

  axios.post(`http://localhost:8080/upload/${rid}`,formData)
  .then(res=>{

    alert(res.data);

    // ⭐ highlight animation
    setChangedId(rid);

    // ⭐ save filename
    setFileNames(prev=>({
      ...prev,
      [rid]:selectedFile.name
    }));

    setTimeout(()=>setChangedId(null),2500);

    api();
  })
}

// ======================= PREVIEW =======================


// const previewFile=(sid)=>{
//   window.open(`http://localhost:8080/file/${sid}`,"_blank");
// }

// ⭐ ADD THIS
const [previewUrl , setPreviewUrl] = useState(null);

const previewFile = (sid)=>{
  setPreviewUrl(`http://localhost:8080/file/${sid}`);
}


// ======================= DOWNLOAD =======================
// const downloadFile=(sid)=>{
//   window.location.href=`http://localhost:8080/file/${sid}`;
// }

const downloadFile = (sid)=>{

  axios({
    url:`http://localhost:8080/file/${sid}`,
    method:"GET",
    responseType:"blob"
  })
  .then(res=>{

    // ⭐ create download link
    const url = window.URL.createObjectURL(new Blob([res.data]));

    const link = document.createElement("a");
    link.href = url;

    // ⭐ use stored filename OR default
    link.setAttribute("download", fileNames[sid] || "file");

    document.body.appendChild(link);
    link.click();
    link.remove();

  })
}


// ======================= USE EFFECT =======================
useEffect(()=>{
  api()
},[])

return(
<>
{/* ================= SAVE MODAL ================= */}
<Modal show={show} onHide={handleClose} centered>
  <Modal.Header closeButton>
    <Modal.Title>Add New Student</Modal.Title>
  </Modal.Header>
  <Modal.Body>
    <Form>
      <Form.Group className="mb-3">
        <Form.Label>Student Name</Form.Label>
        <Form.Control type="text" onChange={(e)=>setName(e.target.value)}/>
      </Form.Group>

      <Form.Group>
        <Form.Label>City</Form.Label>
        <Form.Control type="text" onChange={(e)=>setCity(e.target.value)}/>
      </Form.Group>
    </Form>
  </Modal.Body>
  <Modal.Footer>
    <Button onClick={handleClose}>Close</Button>
    <Button onClick={addStudent}>Save Student</Button>
  </Modal.Footer>
</Modal>

{/* ================= UPDATE MODAL ================= */}
<Modal show={ushow} onHide={uhandleClose} centered>
  <Modal.Header closeButton>
    <Modal.Title>Update Student</Modal.Title>
  </Modal.Header>
  <Modal.Body>
    <Form>
      <Form.Group className="mb-3">
        <Form.Label>Student Name</Form.Label>
        <Form.Control value={unm} onChange={(e)=>setUName(e.target.value)}/>
      </Form.Group>
      <Form.Group>
        <Form.Label>City</Form.Label>
        <Form.Control value={uct} onChange={(e)=>setUCity(e.target.value)}/>
      </Form.Group>
    </Form>
  </Modal.Body>
  <Modal.Footer>
    <Button onClick={uhandleClose}>Close</Button>
    <Button onClick={Update}>Update Student</Button>
  </Modal.Footer>
</Modal>



{/* ⭐ FILE PREVIEW MODAL */}
<Modal
  show={previewUrl !== null}
  onHide={()=>setPreviewUrl(null)}
  size="lg"
  centered
>

  <Modal.Header closeButton>
    <Modal.Title>File Preview</Modal.Title>
  </Modal.Header>

  <Modal.Body style={{height:"80vh"}}>

    {previewUrl && (
      <iframe
        src={previewUrl}
        title="preview"
        width="100%"
        height="100%"
        style={{border:"none"}}
      />
    )}

  </Modal.Body>

</Modal>




{/* ================= TABLE ================= */}
<div className="container mt-4">
  <div className="card border-0 shadow-lg rounded-4">
    <div className="card-body">

      <div className="d-flex justify-content-between align-items-center mb-4">
        <h4 className="fw-bold mb-0">Student Dashboard</h4>
        <Button onClick={handleShow}>+ Add Student</Button>
      </div>

      <div className="table-responsive">
        <table className="table align-middle text-center">

          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>City</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {data.map((item)=>(
              <tr key={item.id}
              className={changedId===item.id ? "changed-row":""}
              >

                <td>{item.id}</td>
                <td>{item.name}</td>
                <td>{item.city}</td>

                <td>

                  <Button size="sm" className="me-2"
                  onClick={()=>Delete(item.id)}>
                    Delete
                  </Button>

                  <Button size="sm" className="me-2"
                  onClick={()=>{getdata(item.id,item.name,item.city);uhandleShow();}}>
                    Update
                  </Button>

                  {/* ⭐ PROFESSIONAL UPLOAD BUTTON */}
                  <label className="upload-btn me-2">
                    📎
                    <input type="file" hidden
                    onChange={(e)=>uploadFile(item.id,e.target.files[0])}/>
                  </label>

                  {/* ⭐ FILE BADGE + ACTIONS */}
                  {fileNames[item.id] && (
                    <>
                      <span className="file-badge me-2">
                        📄 {fileNames[item.id]}
                      </span>

                      <Button size="sm" className="btn-preview me-1"
                      onClick={()=>previewFile(item.id)}>👁️</Button>

                      <Button size="sm" className="btn-download"
                      onClick={()=>downloadFile(item.id)}>⬇️</Button>
                    </>
                  )}

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
