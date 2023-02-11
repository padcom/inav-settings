// spell-checker: disable

import { initializeApp } from 'firebase/app'
import { VueFireAuth } from 'vuefire'

export const firebaseApp = initializeApp({
  apiKey: 'AIzaSyCIsvrbz3FPkkuj1THX3XLa1rhxkyPLaNA',
  authDomain: 'inav-settings-org-dev.firebaseapp.com',
  projectId: 'inav-settings-org-dev',
  storageBucket: 'inav-settings-org-dev.appspot.com',
  messagingSenderId: '770920543795',
  appId: '1:770920543795:web:3d1d3b3ad92105e7979546',
})

export const firebaseConfig = {
  firebaseApp,
  modules: [
    // eslint-disable-next-line new-cap
    VueFireAuth(),
  ],
}

import { useCollection as vueFireUseCollection } from 'vuefire'
import { getFirestore, collection } from 'firebase/firestore'

export const db = getFirestore()

export function useCollection(name: string) {
  return vueFireUseCollection(collection(db, name))
}
