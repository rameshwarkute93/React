import { useEffect, useState } from "react"
import axios from "axios"
import "./Api.css"
export default function API(){
  const[ttl , Setttl] = useState()
  const[cind , SetCind] = useState()
  const[cinf , SetCinf] = useState()
  const[dis , Setdis] = useState()
  const[data , SetData] = useState([])
  let api = () => {
    axios.get("https://api.rootnet.in/covid19-in/stats/latest")
    .then(res =>{
      console.log(res.data.data)
      Setttl(res.data.data.summary.total)
      SetCind(res.data.data.summary.confirmedCasesIndian)
      SetCinf(res.data.data.summary.confirmedCasesForeign)
      Setdis(res.data.data.summary.discharged) 
      SetData(res.data.data.regional)
    })
  }


  useEffect(() => {
    api()
  },[])


  return (
  <>
    <div className="container mt-4">

      {/* 🔥 Page Title */}
      <h3 className="fw-bold gradient-text mb-4">Covid19 India Dashboard</h3>

      {/* ===== STAT CARDS ===== */}
      <div className="row g-4">

        {/* Card 1 */}
        <div className="col-md-3">
          <div className="card glass-card stat-card border-0">
            <div className="card-body">
              <h4 className="text-warning fw-bold">{ttl}</h4>
              <p className="text-muted mb-0">Total Cases</p>
            </div>
          </div>
        </div>

        {/* Card 2 */}
        <div className="col-md-3">
          <div className="card glass-card stat-card border-0">
            <div className="card-body">
              <h4 className="text-danger fw-bold">{cind}</h4>
              <p className="text-muted mb-0">Indian Cases</p>
            </div>
          </div>
        </div>

        {/* Card 3 */}
        <div className="col-md-3">
          <div className="card glass-card stat-card border-0">
            <div className="card-body">
              <h4 className="text-success fw-bold">{cinf}</h4>
              <p className="text-muted mb-0">Foreign Cases</p>
            </div>
          </div>
        </div>

        {/* Card 4 */}
        <div className="col-md-3">
          <div className="card glass-card stat-card border-0">
            <div className="card-body">
              <h4 className="text-primary fw-bold">{dis}</h4>
              <p className="text-muted mb-0">Discharged</p>
            </div>
          </div>
        </div>

      </div>

      {/* ===== TABLE ===== */}
      <div className="card glass-card border-0 shadow-lg rounded-4 mt-5">
        <div className="card-body">

          <div className="table-responsive">
            <table className="table modern-table align-middle text-center">

              <thead>
                <tr>
                  <th>Location</th>
                  <th>India</th>
                  <th>Foreign</th>
                  <th>Discharged</th>
                  <th>Deaths</th>
                </tr>
              </thead>

              <tbody>
                {data.map((item, index) => (
                  <tr key={index}>
                    <td className="fw-semibold">{item.loc}</td>
                    <td>{item.confirmedCasesIndian}</td>
                    <td>{item.confirmedCasesForeign}</td>
                    <td className="text-success fw-semibold">{item.discharged}</td>
                    <td className="text-danger fw-semibold">{item.deaths}</td>
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