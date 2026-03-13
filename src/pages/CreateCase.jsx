import { useState } from "react"
import { createCase } from "../services/caseService"

function CreateCase(){

  const [form,setForm] = useState({
    complainantId:"",
    accusedId:"",
    description:""
  })

  const submit = async(e)=>{

    e.preventDefault()

    const res = await createCase(form)

    alert("Case created "+res._id)

  }

  return(

    <form onSubmit={submit}>

      <input placeholder="complainant id"
      onChange={e=>setForm({...form,complainantId:e.target.value})}/>

      <input placeholder="accused id"
      onChange={e=>setForm({...form,accusedId:e.target.value})}/>

      <textarea placeholder="description"
      onChange={e=>setForm({...form,description:e.target.value})}/>

      <button>Create</button>

    </form>

  )

}

export default CreateCase