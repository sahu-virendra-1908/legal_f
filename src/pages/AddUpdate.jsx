import { useState } from "react"
import { useParams } from "react-router-dom"
import { addUpdate } from "../services/caseService"

function AddUpdate(){

  const {id} = useParams()

  const [desc,setDesc] = useState("")

  const submit = async()=>{

    await addUpdate(id,{description:desc})

    alert("update added")

  }

  return(

    <div>

      <textarea onChange={e=>setDesc(e.target.value)}/>

      <button onClick={submit}>Add Update</button>

    </div>

  )

}

export default AddUpdate