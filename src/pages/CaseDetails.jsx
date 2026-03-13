import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { getCase } from "../services/caseService"

function CaseDetails() {

  const { id } = useParams()

  const [caseData, setCaseData] = useState(null)

  useEffect(() => {

    async function loadCase() {

      const data = await getCase(id)

      setCaseData(data)

    }

    loadCase()

  }, [id])

  if (!caseData) return <p>Loading...</p>

  return (

    <div>

      <h2>Case Details</h2>

      <p><b>Description:</b> {caseData.description}</p>
      <p><b>Status:</b> {caseData.status}</p>

      <h3>Complainant</h3>
      <p>Name: {caseData.complainantId?.name}</p>
      <p>Phone: {caseData.complainantId?.phone}</p>

      <h3>Accused</h3>
      <p>Name: {caseData.accusedId?.name}</p>
      <p>Phone: {caseData.accusedId?.phone}</p>

    </div>

  )

}

export default CaseDetails