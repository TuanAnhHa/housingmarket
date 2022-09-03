import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: 'AIzaSyAjGFE1m5d4s5h33H4IceLx7H2oQGrEyUE',
  authDomain: 'house-marketplace-app-23132.firebaseapp.com',
  projectId: 'house-marketplace-app-23132',
  storageBucket: 'house-marketplace-app-23132.appspot.com',
  messagingSenderId: '1024595760739',
  appId: '1:1024595760739:web:d4aa5cc8200f27b2cfca56',
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)

export const db = getFirestore()
