import { useState } from "react"
import { uploadEvidence } from "../services/evidenceService"

function EvidenceUploader({ caseId }) {

  const [file,setFile] = useState(null)

  const submit = async () => {

    if(!file){
      alert("Please select a file")
      return
    }

    const form = new FormData()

    form.append("file",file)
    form.append("caseId",caseId)

    try{

      const res = await uploadEvidence(form)

      alert("Evidence uploaded successfully")

    }catch(err){

      console.error(err)
      alert("Upload failed")

    }

  }

  return (

    <div>

      <input
        type="file"
        onChange={(e)=>setFile(e.target.files[0])}
      />

      <br/><br/>

      <button onClick={submit}>
        Upload Evidence
      </button>

    </div>

  )

}

export default EvidenceUploader