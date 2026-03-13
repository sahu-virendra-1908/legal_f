import EvidenceUploader from "../components/EvidenceUploader"
import { useParams } from "react-router-dom"

function UploadEvidence(){

  const {id} = useParams()

  return(

    <EvidenceUploader caseId={id}/>

  )

}

export default UploadEvidence