import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { getAuth, updateProfile } from 'firebase/auth'
import { updateDoc, doc } from 'firebase/firestore'
import { db } from '../firebase.config'
import { toast } from 'react-toastify'
import arrowRight from '../assets/svg/keyboardArrowRightIcon.svg'
import homeIcon from '../assets/svg/homeIcon.svg'

export default function Profile() {
  const auth = getAuth()
  const navigate = useNavigate()
  const [changeDetails, setChangeDetails] = useState(false)
  const [formData, setFormData] = useState({
    name: auth.currentUser.displayName,
    email: auth.currentUser.email,
  })

  const { name, email } = formData
  const logOut = () => {
    auth.signOut()
    navigate('/')
  }

  const onSubmit = async () => {
    try {
      if (auth.currentUser.displayName !== name) {
        await updateProfile(auth.currentUser, {
          // update in Firebase
          displayName: name,
        })

        const userRef = doc(db, 'users', auth.currentUser.uid)
        await updateDoc(userRef, { name }) // update in Firestore
      }
    } catch (error) {
      toast.error('Could not update profile!')
    }
  }

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }))
  }

  return (
    <div className='profile'>
      <header className='profileHeader'>
        <p className='pageHeader'>My Profile</p>
        <button className='logOut' type='button' onClick={logOut}>
          Log Out
        </button>
      </header>
      <main>
        <div className='profileDetailsHeader'>
          <p className='profileDetailsText'>Personal Details</p>
          <p
            className='changePersonalDetails'
            onClick={() => {
              changeDetails && onSubmit()
              setChangeDetails((prevState) => !prevState)
            }}
          >
            {changeDetails ? 'Done' : 'Change'}
          </p>
        </div>
        <div className='profileCard'>
          <form>
            <input
              type='text'
              id='name'
              className={!changeDetails ? 'profileName' : 'profileNameActive'}
              disabled={!changeDetails}
              value={name}
              onChange={onChange}
            />
            <input
              type='text'
              id='email'
              className={!changeDetails ? 'profileEmail' : 'profileEmailActive'}
              disabled={!changeDetails}
              value={email}
              onChange={onChange}
            />
          </form>
        </div>
        <Link to='/create-listing' className='createListing'>
          <img src={homeIcon} alt='Home' />
          <p>Sell or Rent your house</p>
          <img src={arrowRight} alt='Arrow Right' />
        </Link>
      </main>
    </div>
  )
}
