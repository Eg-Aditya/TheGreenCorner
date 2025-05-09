import axios from 'axios'
import React, { useEffect, useState } from 'react'

const JsonCrud = () => {
  let [data, setData] = useState([])
  const [state, setState] = useState({
    username: "",
    pass: "",
    id: String(Date.now())
  })
  Date.now()
  useEffect(() => {
    axios.get('http://localhost:3000/data').then((res) => {
      setData(res.data)
    })
  }, [])
  // console.log(data);
  const handleChange = (e) => {
    let { name, value } = e.target
    setState({ ...state, [name]: value })
  }
  let handleSubmit = (e) => {
    e.preventDefault()
    axios.post('http://localhost:3000/data', state).then(()=>{
      axios.get('http://localhost:3000/data').then((res) => {
        setData(res.data)
        setState({
          username: "",
          pass: "",
          id: String(Date.now())
        })
      })
  
    })
  }
  const handleDelete = (user)=>{
    console.log(user);
    // let objToDelet = 
    axios.delete(`http://localhost:3000/data/${user.id}`).then(()=>{
      console.log(`user with ${user.id} is deleted`);
      
      axios.get('http://localhost:3000/data').then((res) => {
        setData(res.data)
      })
  
    }).catch((err)=>{console.log(err);
    })
  }
  const handleUpdate =(user)=>{
   setState(user) 
   axios.delete(`http://localhost:3000/data/${user.id}`).then(()=>{
    axios.get(`http://localhost:3000/data`).then((res)=>{setData(res.data)})
   })
  }
  return (
    <div>

      //! create
      <div>
        <form action="" >
          <input type="text" name='username' value={state.username} onChange={handleChange} className='border-2 px-3' placeholder='username' />
          <input type="text" name='pass' value={state.pass} onChange={handleChange} className='border-2 px-3' placeholder='username' />
          <button onClick={handleSubmit}>Create </button>
        </form>
      </div>



      //! read
      <div className='p-10 flex flex-wrap'>
        {
          data.length > 0 && data.map((user, i) => {
            return (
              <div key={i} className='p-4 border-2 flex justify-center flex-col items-center'>
                <p>username : {user.username}</p>
                <p>password : {user.pass}</p>
                <p>id : {user.id}</p>
                <div className='mt-4'>
                  <button onClick={()=>{handleUpdate(user)}} className='px-3 bg-slate-300 mx-2'>Update</button>
                  <button onClick={()=>{handleDelete(user)}} className='px-3 bg-slate-300 mx-2'>Delete</button>
                </div>
              </div>
            )
          })
        }
      </div>
    </div>
  )
}

export default JsonCrud