import { Routes, Route } from 'react-router-dom'
import PageLayout from './components/layout/PageLayout.jsx'
import {
  Home,
  AboutUs,
  News,
  Blogs,
  Contact,
  Partnership,
  AnnualReports,
  Donate,
  NotFound,
} from './pages'

import Report from './pages/annual_report/Reports.jsx'
import Education from './pages/donates/Education.jsx'
import Qurban from './pages/donates/Qurban.jsx'
import Ramadhan from './pages/donates/Ramadhan.jsx'
import ZakatCalculate from './pages/donates/ZakatCalculate.jsx'
import Zakat from './pages/donates/Zakat.jsx'
import Sadakah from './pages/donates/Sadakah.jsx'
import UmrahHajj from './pages/donates/UmrahHajj.jsx'
import WaterWell from './pages/donates/WaterWell.jsx'
import Mosque from './pages/donates/Mosque.jsx'
import School from './pages/donates/School.jsx'
import PlantTree from './pages/donates/PlantTree.jsx'
import CommunityFund from './pages/donates/MycommunityFund.jsx'
import Emergency from './pages/donates/Emergency.jsx'
import Waqf from './pages/donates/Waqf.jsx'
import Payment from './pages/donates/Payment.jsx'
import PaymentRecieved from './pages/donates/PaymentRecieved.jsx'

import WhoWeAre from './pages/about/WhoWeAre.jsx'
import GovernanceStructuralOfCATA from './pages/about/GovernanceStructuralOfCATA.jsx'
import ManagementLevel from './pages/about/ManagementLevel.jsx'
import Secretariat from './pages/about/Secretariat.jsx'
import ShariahAdvisoryCommittee from './pages/about/ShariahAdvisoryCommittee.jsx'
import NewsDetail from './pages/NewsDetail.jsx'
import ScrollTop from './pages/scroll/ScrollTop.jsx'
import CataYouth from './pages/CataYouth.jsx'

import CommFund from './pages/quick_link/CommunityFund.jsx'
import LuySaat from './pages/quick_link/LuySaat.jsx'
import HajjFund from './pages/quick_link/HajjFund.jsx'
import FoodBank from './pages/quick_link/FoodBank.jsx'
import CommunityProject from './pages/quick_link/CommunityProject.jsx'
import VolunterStaff from './pages/quick_link/VolunterStaff.jsx'

import Privacy from './pages/PrivacyPolicy.jsx'
import TermsRefund from './pages/TermsRefund.jsx'

function App() {
  return (
    <PageLayout>
      <ScrollTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/about/who-we-are" element={<WhoWeAre />} />
        <Route path="/about/governance-structure" element={<GovernanceStructuralOfCATA />} />
        <Route path="/about/management-level" element={<ManagementLevel />} />
        <Route path="/about/secretariat" element={<Secretariat />} />
        <Route path="/about/shariah-advisory-committee" element={<ShariahAdvisoryCommittee />} />
        <Route path="/news" element={<News />} />
        <Route path="/news/:slug" element={<NewsDetail />} />
        <Route path="/blogs" element={<Blogs />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/partnership" element={<Partnership />} />
        <Route path="/annual-reports" element={<AnnualReports />} />
        {/* <Route path="/reports" element={<Report />} /> */}
        {/* <Route path="/annual-reports" element={<AnnualReportsPage />} /> */}
        <Route path="/reports/:slug" element={<Report />} />
        <Route path="/donate" element={<Donate />} />
        <Route path="/donate-education" element={<Education />} />
        <Route path="/donate-qurban" element={<Qurban />} />
        <Route path="/donate-ramadhan" element={<Ramadhan />} />
        <Route path="/zakat-calculate" element={<ZakatCalculate />} />
        <Route path="/donate-zakat" element={<Zakat />} />
        <Route path="/donate-sadakah" element={<Sadakah />} />
        <Route path="/donate-umrah-hajj" element={<UmrahHajj />} />
        <Route path="/donate-water-well" element={<WaterWell />} />
        <Route path="/donate-mosque" element={<Mosque />} />
        <Route path="/donate-school" element={<School />} />
        <Route path="/donate-Plant" element={<PlantTree />} />
        <Route path="/my-comm-fund" element={<CommunityFund />} />
        <Route path="/donate-emergency" element={<Emergency />} />
        <Route path="/donate-waqf" element={<Waqf />} />
        <Route path="/donate-payment" element={<Payment />} />
        <Route path="/donate-payment/:id" element={<Payment />} />
        <Route path="/donate-payment/received/:id" element={<PaymentRecieved />} />
        <Route path="/cata-youth" element={<CataYouth />} />

        <Route path="/community-fund" element={<CommFund />} />
        <Route path="/luy-saat" element={<LuySaat />} />
        <Route path="/hajj-fund" element={<HajjFund />} />
        <Route path="/food" element={<FoodBank />} />
        <Route path="/community-project" element={<CommunityProject />} />
        <Route path="/volunter-staff" element={<VolunterStaff />} />

        <Route path="/privacy-policy" element={<Privacy />} />
        <Route path="/terms-refund" element={<TermsRefund />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </PageLayout>
  )
}

export default App;
