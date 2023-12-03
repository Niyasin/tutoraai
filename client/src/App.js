import './App.css';
import {useState} from'react';
function App(){
  const [isLogin,setIsLogin]=useState(true);
  const [user,setUser]=useState(null);
  const [username,setUsername] =useState(null);
  const [password,setPassword] =useState(null);
  const [name,setName] =useState(null);
  const [topic,setTopic] = useState(null);

  function toggle(){
    setIsLogin(!isLogin);
  }

  function signup(){
    let data = {
      name,
      username,
      password,
    }

    fetch('/register',{
      method:'POST',
      body:JSON.stringify(data),
      headers:{
        'Content-Type':'application/json'
      }
    }).then(d=>d.text()).then((res)=>{
      if(res=='SUCCESS'){
        setIsLogin(true);
      }
    })
  }

  function login(){
    let data = {
      username,
      password,
    }

    fetch('/login',{
      method:'POST',
      body:JSON.stringify(data),
      headers:{
        'Content-Type':'application/json'
      }
    }).then(res=>res.json()).then((json)=>{
      if(!json.error){
        setUser(json.data);
        console.log(json);
      }else{
        
      }
    })
  }

  
  return (
    <div className="main">
      <nav>
        <h3>Tutora</h3>
      </nav>
      {user?
        <div className='home'>
          <h1>What are we learning today ?</h1>
          <input className='topic_input' placeholder='Structure Of Human Heart'/>
          <div className='roundButton'>➝</div>
        </div>
        :
        <>
        {isLogin?<div className="form">
          <h1>Login</h1>
          <input id="username" type="text" placeholder="Usename" onChange={(e)=>{setUsername(e.target.value)}}/>
          <input id="password" type="password" placeholder="Password" onChange={(e)=>{setPassword(e.target.value)}}/>
          <button onClick={login}>Login</button>
          <p>Don't have an account ? <a onClick={toggle}>Signup</a></p>
        </div>
        :
        <div className="form">
          <h1>Signup</h1>
          <input id="name" type="text" placeholder="Name" onChange={(e)=>{setName(e.target.value)}}/>
          <input id="username" type="text" placeholder="Usename" onChange={(e)=>{setUsername(e.target.value)}}/>
          <input id="password" type="password" placeholder="Password" onChange={(e)=>{setPassword(e.target.value)}}/>
          <button onClick={signup}>Signup</button>
          <p>Already have an account ? <a onClick={toggle}>Login</a></p>
        </div>}
        <img className="hero_image" src="hero.png"/>
      </>}
    </div>
    
  );
}

export default App;
