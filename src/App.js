import logo from './logo.svg';
import './App.css';
import {db} from './firebase-config'
import {collection,getDocs,addDoc,updateDoc,deleteDoc,doc} from 'firebase/firestore'
import { useEffect, useState } from 'react';

function App() {

  const[user,setuser]=useState([''])
  const[newname,setnewname]=useState('')
  const[newage,setnewage]=useState('')

  const usercollectionRef=collection(db,"users")

  const createuser=async()=>{
    await addDoc(usercollectionRef,{name:newname,age:Number(newage)})
    alert("your data uploaded successfully")
    setnewname("")
    setnewage("")
  }
  const deleteuser=async(id)=>{
    const userdoc = doc(db,"users",id)
    await deleteDoc(userdoc)
    alert("deleted data successfull please refresh your page")
  }
  const updateuser1=async(id,age)=>{
    const newdoc = doc(db,'users',id)
    const newfield= {age : age +1}
    await updateDoc(newdoc,newfield)
    alert("updated successfully ,please refresh your page")
  }
  const updateuser2=async(id,age)=>{
    const newdoc = doc(db,'users',id)
    const newfield= {age : age - 1}
    await updateDoc(newdoc,newfield)
    alert("updated successfully ,please refresh your page")
  }

  useEffect(()=>{
    const getusers=async()=>{
     const data = await getDocs(usercollectionRef)
       //console.log(data)
       setuser(data.docs.map(( doc)=>({...doc.data(),id: doc.id})))
    }
    getusers();
  },[])
  const refresh=async()=>{
    const data = await getDocs(usercollectionRef)
    
    setuser(data.docs.map(( doc)=>({...doc.data(),id: doc.id})))
  }
  return (
   <div className='App'> 
     <h1>
       firebase crud
     </h1>
     <div>
       <input type="text" placeholder='enter your name' value={newname} onChange={(e)=>{setnewname(e.target.value)}} />
       <input type="text" placeholder='enter your age' value={newage} onChange={(e)=>{setnewage(e.target.value)}} />
       <button onClick={createuser}>submit</button>
       <button onClick={refresh}>refresh</button>
     </div>
      <div>
        {
          user.map((user)=>{
            return(
              <div>
                <h3>{user.name}</h3>
                <h3>{user.age}</h3>
                <button onClick={()=>{updateuser1(user.id,user.age)}}>increase age +</button>
                <button onClick={()=>{updateuser2(user.id,user.age)}}>decrease age -</button>
                <button onClick={()=>{deleteuser(user.id)}}>delete user</button>
              </div>
            )
          })
        }
      </div>
   </div>
  );
}

export default App;
