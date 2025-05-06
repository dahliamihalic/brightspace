import { useState } from 'react'
import './App.css'
import Navbar from './components/navbar'
import { PrivateRoute } from './components/PrivateRoute'
import { AuthProvider } from './contexts/AuthContext'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { HomePage } from './pages/homePage'
import { FrontPage } from './pages/frontPage'
import { NotFound } from './pages/NotFound'
import { AssignmentPage } from './pages/assignmentPage'
import { CoursePage } from './pages/coursePage'
import { LoginPage } from './pages/loginPage'
import './styles/global.css'

function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/front" element={<FrontPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/" element={<PrivateRoute><HomePage /></PrivateRoute>} />
          <Route path="/assignment" element={<PrivateRoute><AssignmentPage /></PrivateRoute>} />
          <Route
            path="/course/:courseId"
            element={<PrivateRoute><CoursePage /></PrivateRoute>}
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </AuthProvider>
  )
}
export default App