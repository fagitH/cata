import Header from './Header.jsx'
import Footer from './Footer.jsx'

function PageLayout({ children }) {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  )
}

export default PageLayout;
