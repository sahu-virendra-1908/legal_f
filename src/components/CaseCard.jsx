import { Link } from "react-router-dom"

function CaseCard({caseItem}){

  return(

    <div>

      <h3>{caseItem.description}</h3>

      <p>Status: {caseItem.status}</p>

      <Link to={`/case/${caseItem._id}`}>View</Link>

    </div>

  )

}

export default CaseCard