import React from 'react'

const authDefaultContext = {
  sessionId:false
}

const AuthContext = React.createContext(authDefaultContext);

export const AuthProvider = ({children}) => {
  //state
  const [sessionId,setSessionId] = React.useState(false)
  return (
    <AuthContext.Provider
      value={{
        //global state
        sessionId:sessionId,
        setSessionId:setSessionId,
      }}
    >
      {children}
    </AuthContext.Provider>)
}

export const useAuthContext = () => {
  return React.useContext(AuthContext)
}