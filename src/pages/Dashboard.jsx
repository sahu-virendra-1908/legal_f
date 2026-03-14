import { useNavigate } from "react-router-dom"
import "./dashboard.css"

function Dashboard(){

  const navigate = useNavigate()

  return(

    <div className="dashboard">

      <header className="appbar">

        <h2>⚖️ Blockchain Legal Case System</h2>

        <button onClick={()=>{

          localStorage.removeItem("token")
          navigate("/")

        }}>Logout</button>

      </header>

      <div className="container">

        <h1>Dashboard</h1>

        <div className="grid">

          <div className="card" onClick={()=>navigate("/create-case")}>
            <h3>Create Case</h3>
            <p>Register new legal report</p>
          </div>

          <div className="card" onClick={()=>navigate("/dashboard")}>
            <h3>View Cases</h3>
            <p>See all cases</p>
          </div>

          <div className="card" onClick={()=>navigate("/case-update")}>
            <h3>Add Update</h3>
            <p>Investigation updates</p>
          </div>

          <div className="card" onClick={()=>navigate("/upload-evidence")}>
            <h3>Upload Evidence</h3>
            <p>Add proof documents</p>
          </div>

          <div className="card">
            <h3>Blockchain Info</h3>
            <p>Track blockchain records</p>
          </div>

          <div className="card">
            <h3>Profile</h3>
            <p>User information</p>
          </div>

        </div>

      </div>

    </div>

  )

}

export default Dashboard