import {useContext} from 'react'
import UserContext from '../../GlobalContext'

export const MyProfile = () => {
  const {user, setUser}= useContext(UserContext)
  console.log(user)
  return (
    <div>
      <h2>
        {JSON.stringify(user)}
      </h2>
      <button onClick={()=>setUser('steven')}>login</button>
    </div>
  )
}
