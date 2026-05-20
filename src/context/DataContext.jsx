import { createContext, useContext, useState, useEffect } from 'react'

const DataContext = createContext(null)
const STORAGE_KEY = 'slh_data'

const SAMPLE_PROJECTS = [
  { id:'p1', title:'Morocco Green Hydrogen Export Hub', description:'Strategic consulting for developing a 500MW green hydrogen production facility in the Souss-Massa region, connecting Moroccan renewable energy to European industrial demand.', country:'Morocco', status:'Active', technologies:['Electrolysis', 'Solar PV', 'Wind', 'H2 Storage'], partners:['OCP Group', 'IRESEN', 'Masen'], image:'', timeline:'2023-2026', category:'Hydrogen Production' },
  { id:'p2', title:'Netherlands-Morocco Energy Bridge', description:'Facilitating institutional dialogue and investment frameworks for a direct Morocco-Netherlands hydrogen pipeline corridor, connecting two national energy strategies.', country:'Netherlands / Morocco', status:'Active', technologies:['Pipeline H2', 'Ammonia Carrier', 'Fuel Cells'], partners:['TenneT', 'Gasunie', 'RVO'], image:'', timeline:'2024-2028', category:'Energy Infrastructure' },
  { id:'p3', title:'EU-Africa Green Industrial Partnership', description:'Coordinating multi-stakeholder economic missions and partnership agreements between African renewable energy producers and European industrial offtakers.', country:'Europe / Africa', status:'Completed', technologies:['Renewable Energy', 'Green Ammonia', 'E-fuels'], partners:['IRENA', 'EU Commission', 'African Union'], image:'', timeline:'2022-2024', category:'Economic Mission' },
]

const SAMPLE_EVENTS = [
  { id:'e1', title:'World Hydrogen Summit 2024', description:'SLH Service Nederland presented the Morocco-Netherlands hydrogen corridor at the World Hydrogen Summit in Rotterdam, engaging with 5,000+ industry leaders.', date:'2024-05-13', country:'Netherlands', location:'Rotterdam', type:'Conference', image:'', gallery:[], featured:true },
  { id:'e2', title:'Morocco-Netherlands Business Delegation', description:'High-level bilateral delegation organized by SLH, bringing together Moroccan and Dutch business leaders, ministers, and energy sector executives.', date:'2024-03-20', country:'Morocco', location:'Casablanca', type:'Economic Mission', image:'', gallery:[], featured:true },
  { id:'e3', title:'Berlin Energy Transition Forum', description:'Participation in the Berlin Energy Transition Dialogue, showcasing Morocco as Europe\'s premier green hydrogen supplier partner.', date:'2024-04-17', country:'Germany', location:'Berlin', type:'Forum', image:'', gallery:[], featured:false },
]

const SAMPLE_BLOG = [
  { id:'b1', title:'Morocco\'s Green Hydrogen: A $20 Billion Opportunity', description:'An in-depth analysis of Morocco\'s strategic position as Europe\'s leading green hydrogen supplier, examining the key infrastructure, policy, and investment dimensions.', category:'Market Analysis', tags:['Morocco','Green Hydrogen','Investment'], image:'', author:'Nouraddine Gribi', date:'2024-04-15', readTime:8, published:true, slug:'morocco-green-hydrogen-opportunity' },
  { id:'b2', title:'The Morocco-Netherlands Hydrogen Corridor: Building Tomorrow\'s Energy Infrastructure', description:'How strategic bilateral cooperation between Morocco and the Netherlands is laying the groundwork for a new intercontinental green hydrogen trade route.', category:'Strategy', tags:['Morocco','Netherlands','Partnership'], image:'', author:'Nouraddine Gribi', date:'2024-03-22', readTime:6, published:true, slug:'morocco-netherlands-hydrogen-corridor' },
  { id:'b3', title:'EU Green Hydrogen Strategy: Opportunities for North African Partners', description:'Examining how the EU\'s revised Hydrogen Strategy creates unprecedented opportunities for Moroccan and North African renewable energy producers.', category:'Policy', tags:['EU','Policy','Renewable Energy'], image:'', author:'SLH Team', date:'2024-02-10', readTime:5, published:true, slug:'eu-hydrogen-strategy-north-africa' },
]

const SAMPLE_PARTNERS = [
  { id:'pt1', name:'IRESEN', description:'Institut de Recherche en Energie Solaire et Energies Nouvelles', logo:'', website:'https://iresen.org', country:'Morocco', active:true },
  { id:'pt2', name:'Masen', description:'Moroccan Agency for Sustainable Energy', logo:'', website:'https://www.masen.ma', country:'Morocco', active:true },
  { id:'pt3', name:'RVO', description:'Netherlands Enterprise Agency', logo:'', website:'https://rvo.nl', country:'Netherlands', active:true },
  { id:'pt4', name:'IRENA', description:'International Renewable Energy Agency', logo:'', website:'https://irena.org', country:'International', active:true },
]

const SAMPLE_SETTINGS = {
  adminPassword: 'slh2024admin',
  phone: '+31 6 00 00 00 00',
  email: 'contact@slhservice.nl',
  ceoName: 'Nouraddine Gribi',
  ceoImage: '',
  address: 'Netherlands',
  linkedIn: 'https://linkedin.com/company/slhservice',
  heroBadge: 'International Consulting · Morocco–Netherlands',
  heroStats: { years:'10+', countries:'15+', projects:'50+', partners:'100+' },
}

function loadData() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw) {
      const d = JSON.parse(raw)
      return {
        projects: d.projects || SAMPLE_PROJECTS,
        events: d.events || SAMPLE_EVENTS,
        blog: d.blog || SAMPLE_BLOG,
        partners: d.partners || SAMPLE_PARTNERS,
        settings: { ...SAMPLE_SETTINGS, ...(d.settings || {}) },
      }
    }
  } catch (e) {}
  return { projects: SAMPLE_PROJECTS, events: SAMPLE_EVENTS, blog: SAMPLE_BLOG, partners: SAMPLE_PARTNERS, settings: SAMPLE_SETTINGS }
}

function saveToStorage(data) {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(data)) } catch (e) {}
}

export function DataProvider({ children }) {
  const [data, setData] = useState(loadData)
  const [adminLoggedIn, setAdminLoggedIn] = useState(() => sessionStorage.getItem('slh_admin') === '1')

  useEffect(() => { saveToStorage(data) }, [data])

  const update = (key, val) => setData(prev => ({ ...prev, [key]: val }))

  const saveItem = (collection, item) => setData(prev => {
    const list = prev[collection]
    const idx = list.findIndex(x => x.id === item.id)
    if (idx >= 0) { const n = [...list]; n[idx] = item; return { ...prev, [collection]: n } }
    return { ...prev, [collection]: [...list, { ...item, id: `${collection[0]}${Date.now()}` }] }
  })

  const deleteItem = (collection, id) => setData(prev => ({
    ...prev, [collection]: prev[collection].filter(x => x.id !== id)
  }))

  const saveSettings = (s) => setData(prev => ({ ...prev, settings: { ...prev.settings, ...s } }))

  const adminLogin = (pw) => {
    if (pw === data.settings.adminPassword) {
      sessionStorage.setItem('slh_admin', '1')
      setAdminLoggedIn(true)
      return true
    }
    return false
  }

  const adminLogout = () => {
    sessionStorage.removeItem('slh_admin')
    setAdminLoggedIn(false)
  }

  return (
    <DataContext.Provider value={{
      ...data, adminLoggedIn,
      saveItem, deleteItem, saveSettings, adminLogin, adminLogout,
    }}>
      {children}
    </DataContext.Provider>
  )
}

export const useData = () => useContext(DataContext)
