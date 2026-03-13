function CaseTimeline({updates}){

  return(

    <div>

      <h3>Updates</h3>

      {updates.map(update=>(
        <div key={update._id}>

          <p>{update.description}</p>

          <small>{new Date(update.createdAt).toLocaleString()}</small>

        </div>
      ))}

    </div>

  )

}

export default CaseTimeline