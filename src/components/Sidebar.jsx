import { Link } from "react-router-dom"

function Sidebar(){

  return(

    <div>

      <Link to="/dashboard">Dashboard</Link>

      <Link to="/create-case">Create Case</Link>

    </div>

  )

}

export default Sidebar