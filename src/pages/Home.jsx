
import React from 'react'
import { Link} from 'react-router-dom'




const Home = ({ girisYapildimi }) => {
  
  return (
    
    <div>
      {
        girisYapildimi ? <div>
         Home
        </div> : <Link to='/login'>Giris Yapmadiniz giris yap</Link>
      }
      
    </div>
  )
}

export default Home
