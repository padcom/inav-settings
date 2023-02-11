import { useFirebaseAuth, useCurrentUser } from 'vuefire'
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth'

export function useAuth() {
  const user = useCurrentUser()
  const auth = useFirebaseAuth()

  function login() {
    if (!auth) throw new Error('"auth" is not initialized')
    signInWithPopup(auth, new GoogleAuthProvider())
  }

  function logout() {
    console.log('Logging out')
    auth?.signOut()
  }

  return {
    user,
    login,
    logout,
  }
}
