import React from 'react';
import Index from './layouts/admin/Index';
import AuthLayout from "./layouts/Auth/AuthLayout";
import {useLocation} from 'react-router-dom'

function App() {

    const location = useLocation();

  return (
    <div className="App">
        {
            location.pathname.includes('/auth') ? (
                <AuthLayout />
            ) : (
                <Index />
            )
        }
    </div>
  );
}

export default App;
