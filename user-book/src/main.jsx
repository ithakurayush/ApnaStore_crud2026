import { createRoot } from 'react-dom/client'
import 'bootstrap-icons/font/bootstrap-icons.css'
import App from './App.jsx'
import { provider } from 'react-redux'
import store from './app/store.js'

createRoot(document.getElementById('root')).render(
  <App></App>
)
