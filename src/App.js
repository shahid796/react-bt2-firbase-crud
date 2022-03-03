import logo from './logo.svg';
import './App.css';
import {db} from './firebase-config'
import {collection,getDocs,addDoc,updateDoc,deleteDoc,doc} from 'firebase/firestore'
import { useEffect, useState } from 'react';

function App() {

  const[user,setuser]=useState([''])
  const usercollectionRef=collection(db,"users")

  useEffect(()=>{
    const getusers=async()=>{
      const data = await getDocs(usercollectionRef)
       //console.log(data)
       setuser(data.docs.map((doc)=>({...doc.data(),id: doc.id})))
    }
    getusers();
  },[])
  return (
   <div className='App'> 
     <h1>
       firebase crud
     </h1>
     <div>
       <input type="text" placeholder='enter your name' />
       <input type="text" placeholder='enter your age' />
       <button>submit</button>
     </div>
      <div>
        {
          user.map((user)=>{
            return(
              <div>
                <h3>{user.name}</h3>
                <h3>{user.age}</h3>
              </div>
            )
          })
        }
      </div>
   </div>
  );
}

export default App;
