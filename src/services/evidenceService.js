import api from "./api"

export const uploadEvidence = async (formData) => {

  const res = await api.post(
    "/evidence/upload",
    formData,
    {
      headers:{
        "Content-Type":"multipart/form-data"
      }
    }
  )

  return res.data
}