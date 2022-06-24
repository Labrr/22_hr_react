import './Chat.css'
import { initializeApp } from 'firebase/app'
import React, {useState, useRef, useEffect} from 'react'
import 'firebase/firestore'
import { useAuthState} from 'react-firebase-hooks/auth'
import { useCollectionData } from 'react-firebase-hooks/firestore'
import { getFirestore, collection, query, addDoc , orderBy, limit, serverTimestamp} from 'firebase/firestore';
import { updateProfile, getAuth, signInAnonymously, deleteUser } from 'firebase/auth';
// import useViewport from '../../Hooks/useViewPort'

const fbconfig = {
  apiKey: "AIzaSyCnSxs0wVCiQYVKu-2EsicUB6xeUJ2Y-d8",

  authDomain: "hallochat-4c1c9.firebaseapp.com",

  projectId: "hallochat-4c1c9",

  storageBucket: "hallochat-4c1c9.appspot.com",

  messagingSenderId: "669479847939",

  appId: "1:669479847939:web:ec692ed707abe81d1f6636"
}


const app = initializeApp(fbconfig)
const auth = getAuth(app);
const db = getFirestore(app)

export default function Chat({ mobile }) {
  // const [signed, setSigned] = useState(false)
  const [user] = useAuthState(auth)  
  const [name, setName] = useState('')
  const [displayName, setDisplayName] = useState('')
  
  const [viewport] = useState(window.visualViewport.height)


  useEffect(() => {
    return () => {
      
      window.addEventListener('beforeunload', function (e) {
        // Cancel the event

        // e.preventDefault(); // If you prevent default behavior in Mozilla Firefox prompt will always be shown
        
        // Chrome requires returnValue to be set
        e.returnValue = '';
        destroyUser()
      });

      // if(user){
      //   destroyUser() 
      // } 
    }
  }, [viewport])


  const signAnon = () =>  {
    signInAnonymously(auth)
    .then(() => {
      //TODO?
    })
    .catch((error) => {
        console.log(error)
      })
  }

const destroyUser =  () => {
  console.log("killall ", user)
  setDisplayName('')
  deleteUser(user)
}

  const updateProfName = (e) => {
    e.preventDefault();

    updateProfile(user, {
      displayName: name
      
    }).then(() => {
      setDisplayName(name)      
    }).catch((error) => {
      console.log(error)
      setDisplayName("error...")
    });
  }


  return (
    <div className="chat-container">
      
      <button onClick={destroyUser }>Click</button>
      
      {
        !user ? 
        <button onClick={signAnon}>Show Chat</button>
        :
        <h1 className="halloH1"><i>Chat: </i></h1>

      }



      {user && <ChatRoom displayName={displayName}/>}
        <div className='chatMenu'>
        <div className='chatName'>
            { displayName === "" &&
            <form onSubmit={updateProfName}>
                <input value={name} onChange={(e) => setName(e.target.value)} />
                <button type="submit">Click</button>
              </form>
            }
          </div>
          </div>
        </div>
  );
}



const OpenChat = (props) => {
  if(props.user){
    return (<button onClick={props.signAnon}>Show Chat</button>)
  }else{
    return false
  }
}



const ChatRoom = ({displayName}) => {
  const messagesRef = collection(db, "messages")
  const q = query(messagesRef, orderBy("createdAt") );
  const [messages] = useCollectionData(q, {idField: 'id'})
  const [formValue, setFormValue ] = useState('')

  const dummy = useRef();
  
  useEffect(() => {
    
    // scrollChat()
    dummy.current.scrollIntoView({ behavior: 'smooth'})
    return () => {
      
    }
  }, [])
  

  const scrollChat = () => {
    dummy.current.scrollIntoView({ behavior: 'smooth'})
  }

  const sendMessage = async (e) => {
    e.preventDefault();
    
    const { uid } = auth.currentUser;
    
    const mR = await addDoc(messagesRef, {
      name: displayName,
      text:  formValue,
      createdAt: serverTimestamp(),
      uid,
    });

    setFormValue('')

    dummy.current.scrollIntoView({ behavior: 'smooth'})
  }


  return(
    <div className="chatRoom">   
     
        <div className='chatMessages'>
          
          {messages && messages.map(msg => <ChatMessage  key={msg.id + "" + msg.createdAt} time={msg.createdAt} message={msg} />)
          }        
          <div ref={dummy}></div>
        </div>

      {/* <div className = "chatMenu"> */}
        { displayName !== ""  ? 
            
            <div className="chatMenu">
              <h3 className="displayName"> {displayName}</h3>
              <form className="inputName" onSubmit={sendMessage}>
                <input required value={formValue} onChange={(e) => setFormValue(e.target.value)} />
                <button type="submit">Send</button>
              </form>
            </div>
            :
            <div className="chatMenu">
            </div>
          }
      </div>
    // </div>
  )
}


function ChatMessage({message, time}) {
  const { name, text, uid } = message; 
  const [msgTime, setMsgTime] = useState('')

  useEffect(() => {
    time && setMsgTime(messageCreated())  
    return () => {
    }
  }, [])

  const messageCreated = () => {
    console.log("first")
    let td = time.toDate()
    return td.getHours() + ":" + td.getMinutes();
  }
  
  const messageClass = uid === auth.currentUser.uid ? 'sent' : 'received';

  return (
    <div className={`message ${messageClass}`}>

      <strong className="cName">{name}:</strong>
      <div className="text-container">
        <span className="cTime">{msgTime}</span>
        <span className="cText">{text}</span>
      </div> 
    </div>
  )
}
