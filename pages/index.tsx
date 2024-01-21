import Image from 'next/image'
import { Inter } from 'next/font/google'
import Login from './auth/login'
import { SidebarContextProvider } from '@/context/sidebar-context'


const inter = Inter({ subsets: ['latin'] })

export default function Home() {



  return (

      <Login />

  )
}
