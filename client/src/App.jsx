import { BrowserRouter, Route, Routes } from 'react-router-dom'

import { Toaster } from 'react-hot-toast'
import ThemeToggle from './components/ThemeToggle'
import Register from './pages/auth/Register'
import VerifyOtp from './pages/auth/VerifyOtp'
import Login from './pages/auth/Login'
import Dashboard from './pages/Dashboard'
import AddApplication from './pages/dashboard/AddApplication'
import JobDetails from './pages/dashboard/JobDetails'
import JobsList from './pages/dashboard/JobsList'
import Logout from './pages/dashboard/Logout'
import Profile from './pages/dashboard/Profile'


import Settings from './pages/dashboard/Settings'

import Statistics from './pages/dashboard/Statistics'
import PrivateRoutes from './routes/PrivateRoutes'

const App = () => {
  return (
    <div className='text-text bg-bg min-h-screen w-full'>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/verify-otp' element={<VerifyOtp />} />

          <Route
            path='/dashboard'
            element={
              <PrivateRoutes>
                <Dashboard />
              </PrivateRoutes>
            }
          />
          <Route
            path='/dashboard/jobs'
            element={
              <PrivateRoutes>
                <JobsList />
              </PrivateRoutes>
            }
          />
          <Route
            path='/dashboard/jobs/new'
            element={
              <PrivateRoutes>
                <AddApplication />
              </PrivateRoutes>
            }
          />
          <Route
            path='/dashboard/jobs/:id'
            element={
              <PrivateRoutes>
                <JobDetails />
              </PrivateRoutes>
            }
          />
          <Route
            path='/dashboard/analytics'
            element={
              <PrivateRoutes>
                <Statistics />
              </PrivateRoutes>
            }
          />
          <Route
            path='/dashboard/profile'
            element={
              <PrivateRoutes>
                <Profile />
              </PrivateRoutes>
            }
          />

          <Route
            path='/dashboard/settings'
            element={
              <PrivateRoutes>
                <Settings />
              </PrivateRoutes>
            }
          />
          <Route
            path='/dashboard/logout'
            element={
              <PrivateRoutes>
                <Logout />
              </PrivateRoutes>
            }
          />

        </Routes>
      </BrowserRouter>
      <ThemeToggle />

      <Toaster
        position="top-right"
        reverseOrder={false}
        toastOptions={{
          duration: 5000,
          style: {
            border: "2px solid var(--color-border)",
            background: "var(--color-card)",
            color: "var(--color-text)",
            boxShadow: "var(--shadow-brutal)",
            borderRadius: "12px",
          },
          success: {
            iconTheme: {
              primary: "var(--success)",
              secondary: "var(--card)",
            },
          },
          error: {
            iconTheme: {
              primary: "var(--danger)",
              secondary: "var(--card)",
            },
          },
        }}
      />
    </div>
  )
}

export default App
