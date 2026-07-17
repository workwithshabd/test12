import { createContext, useContext, useState } from "react";




type User = {
  _id: string;
  name: string;
  email: string;
  role:string;
};










type AuthContextType = {
  loggedIn: boolean;
  user : User | null;
  logIn(user: User): void;
  logOut(): void;
};

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  function logIn() {
    setLoggedIn(true);
    setUser(user);
  }

  function logOut(user:User) {
    setLoggedIn(false);
    setUser(null);
    
  }

  return (
    <AuthContext.Provider
      value={{
        loggedIn,
        user,
        logIn,
        logOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext)!;
}
