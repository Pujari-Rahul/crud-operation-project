import React, { useEffect, useState } from 'react'
import './App.css'
function App() {
  const[emps,setEmps]=useState([]);
  const[id,setId]=useState('');
  const[name,setName]=useState('');
  const[post,setPost]=useState("");
  const[sal,setSal]=useState('');

   function getList(){
   fetch("http://localhost:3001/emps").then((result)=>{
    result.json().then((resp)=>{
      setEmps(resp);
    
    })

   })
  }
  useEffect(()=>{
    getList();
  },[]);

  // const updatestudent=(()=>{
  //   fetch("http://localhost:3001/emps",)
  // })
 let addstudent=()=>{
  let emps={id,name,post,sal}
  fetch("http://localhost:3001/emps",{
    method:"POST",
    Headers:{
      "Accept":"application/json",
      "Content-Type":"application/json"
    },
    body:JSON.stringify(emps)


  }).then((result)=>{
    result.json().then((resp)=>{
     getList();
     refresh();
    })
  })
 }
  function refresh(){
    setId('');
    setName('');
    setPost('');
    setSal('');
  }
function deleteemployee(id){
  fetch(`http://localhost:3001/emps/${id}`,{
    method:"DELETE"
  }).then((result)=>{
    result.json().then((resp)=>{
      // setEmps(resp);
      getList();
    })
  })
getList();
}
function updateemployee(item){
  setId(item.id);
  setName(item.name);
  setPost(item.post);
  setSal(item.sal);
}
function update(){
  let emps={id,name,post,sal}
  fetch(`http://localhost:3001/emps/${id}`,{
    method:"PUT",
    headers:{
      "Accept":"application/json",
      "Content-Type":"application/json",
    },
    body:JSON.stringify(emps)
  }).then((result)=>{
    result.json().then((resp)=>{
      console.log("updated")
      getList();
      refresh();
    })
  })
}
  return (
    <div className='App'>
      <h1>employee data</h1>
      <table border="2">
        <tr>
          <th>Id</th>
          <th>name</th>
          <th>post</th>
          <th>salary</th>
          <th>operation</th>
        </tr>
        {
         
           emps.map((item)=>
            <tr>
              <td>{item.id}</td>
              <td>{item.name}</td>
              <td>{item.post}</td>
              <td>{item.sal}</td>
              <td><button onClick={()=>updateemployee(item)}>update</button>
              <button onClick={()=>deleteemployee(item.id)}>delete</button></td>
            </tr>
          )
         
        }
      </table>
      <h1>empoyee information</h1>
      id:<input type='text' value={id} onChange={(e)=>setId(e.target.value)}></input><br></br>
      name:<input type='text' value={name} onChange={(e)=>setName(e.target.value)}></input><br></br>
      post:<input type='text' value={post} onChange={(e)=>setPost(e.target.value)}></input><br></br>
      salary:<input type='text' value={sal} onChange={(e)=>setSal(e.target.value)}></input><br></br>
      <button onClick={addstudent}>add employee</button>
       <button onClick={update}>update employee</button>
    </div>
   
  )
}

export default App
