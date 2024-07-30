import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BlurProvider } from './context/BlurContext.jsx'
import { BrowserRouter } from 'react-router-dom'
import { UserProvider } from './context/UserContext.jsx'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { AdminProvider } from './context/AdminContext.jsx'
import { TeacherProvider } from './context/TeacherContext.jsx'
import { StudentProvider } from './context/StudentContext.jsx'
import "../firebase.config.js"

const queryClient = new QueryClient({});

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <AdminProvider>
          <TeacherProvider>
            <StudentProvider>
              <UserProvider>
                <BlurProvider>
                  <App />
                </BlurProvider>
              </UserProvider>
            </StudentProvider>
          </TeacherProvider>
        </AdminProvider>
      </BrowserRouter>
    </QueryClientProvider>
  </React.StrictMode>
)
