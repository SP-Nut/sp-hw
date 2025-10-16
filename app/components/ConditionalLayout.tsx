'use client'

import { usePathname } from 'next/navigation'
import Header from './Header'
import Footer from './Footer'
import ScrollToTop from './ScrollToTop'
import ContactButtons from './ContactButtons'

export default function ConditionalLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  
  // Hide header/footer for admin pages
  const isAdminPage = pathname?.startsWith('/admin')
  
  if (isAdminPage) {
    return <>{children}</>
  }

  return (
    <>
      <Header />
      {children}
      <Footer />
      <ScrollToTop />
      <ContactButtons />
    </>
  )
}