import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from "react-redux"
import { loadStripe } from '@stripe/stripe-js';
import './index.css'
import App from './App.tsx'
import { store } from './redux/store/store.ts'
import { GoogleOAuthProvider } from "@react-oauth/google"

export const stripePromise = loadStripe('STRIPE_PUBLISHABLE_KEY');

createRoot(document.getElementById('root')!).render(
  <GoogleOAuthProvider clientId='1025261093843-s69sqp4obnqvpuvgu4oeear7fnk8ouii.apps.googleusercontent.com' >
    <StrictMode>
      <Provider store={store} >
          <App />
      </Provider>
    </StrictMode>
  </GoogleOAuthProvider>
)
