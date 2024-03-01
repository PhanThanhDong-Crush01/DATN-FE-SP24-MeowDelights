//firebase.ts
import { initializeApp } from 'firebase/app'
import { getAnalytics } from 'firebase/analytics'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: 'AIzaSyDItvp48p4twBvdRlW0LEh4wWt-5gDhmss',
    authDomain: 'sendsmsotp-80091.firebaseapp.com',
    projectId: 'sendsmsotp-80091',
    storageBucket: 'sendsmsotp-80091.appspot.com',
    messagingSenderId: '721971596878',
    appId: '1:721971596878:web:b3d2e2dc713187757c7d1f',
    measurementId: 'G-L2BL8YS0QG'
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const analytics = getAnalytics(app)

export default firebaseConfig
