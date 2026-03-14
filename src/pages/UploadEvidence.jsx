import EvidenceUploader from "../components/EvidenceUploader"
import { useParams } from "react-router-dom"

function UploadEvidence() {

  const { id } = useParams()

  return (

    <div style={{padding:"30px"}}>

      <h2>Upload Evidence</h2>

      <EvidenceUploader caseId={id} />

    </div>

  )

}

export default UploadEvidence