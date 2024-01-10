import React from "react"
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import Register from "./pages/Register"
import Login from "./pages/Login"
import { Toaster } from 'react-hot-toast'
import axios from 'axios'
import { useSelector } from "react-redux"
import Spinner from './components/Spinner'
import ProtectedRoute from './components/ProtectedRoute'
import PublicRoute from './components/PublicRoute'

// server localhost path
axios.defaults.baseURL = 'http://localhost:5000'
axios.defaults.withCredentialsth = true

function App() {
  const { loading } = useSelector(store => store.alert)
  return (
    <>
      <BrowserRouter>
        <Toaster position='center-top' toastOptions={{ duration: 4000 }} />
        {loading ? <Spinner /> :
          <Routes>

            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <HomePage />
                </ProtectedRoute>
              }></Route>

            <Route path="/register" element={
              <PublicRoute>
                <Register />
              </PublicRoute>
            }></Route>

            <Route path="/login" element={
              <PublicRoute>
                <Login />
              </PublicRoute>
            }></Route>

          </Routes>}
      </BrowserRouter>
    </>
  );
}

export default App;