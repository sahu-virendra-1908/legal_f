import { useState } from "react"
import { registerUser } from "../services/authService"

function Register(){

  const [form,setForm] = useState({
    name:"",
    phone:"",
    password:"",
    role:"complainant"
  })

  const submit = async(e)=>{

    e.preventDefault()

    await registerUser(form)

    alert("registered")

  }

  return(

    <form onSubmit={submit}>

      <input placeholder="name"
      onChange={e=>setForm({...form,name:e.target.value})}/>

      <input placeholder="phone"
      onChange={e=>setForm({...form,phone:e.target.value})}/>

      <input placeholder="password"
      onChange={e=>setForm({...form,password:e.target.value})}/>

      <button>Register</button>

    </form>

  )

}

export default Register