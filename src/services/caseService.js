import api from "./api"

export const createCase = async(data)=>{

  const res = await api.post("/cases",data)

  return res.data

}

export const getCase = async(id)=>{

  const res = await api.get(`/cases/${id}`)

  return res.data

}

export const addUpdate = async(id,data)=>{

  const res = await api.post(`/cases/${id}/update`,data)

  return res.data

}