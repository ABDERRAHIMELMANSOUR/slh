import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useData } from '../../context/DataContext'
import { Lock, Eye, EyeOff, AlertCircle } from 'lucide-react'
import Logo from '../../components/ui/Logo'
export default function AdminLogin() {
  const [pw,setPw]=useState(''); const [show,setShow]=useState(false); const [err,setErr]=useState('')
  const {adminLogin}=useData(); const nav=useNavigate()
  const sub=e=>{e.preventDefault();if(adminLogin(pw))nav('/admin');else{setErr('Incorrect password.');setPw('')}}
  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden"
      style={{ background:'linear-gradient(160deg,#051C38,#0D3A6E,#005E78)' }}>
      <div className="absolute inset-0 dots opacity-[0.22] pointer-events-none"/>
      <div className="w-full max-w-sm relative z-10">
        <div className="text-center mb-8">
          <div className="bg-white rounded-2xl px-5 py-3 inline-block mb-5 shadow-card-lg"><Logo h={52} variant="default"/></div>
          <h1 className="text-2xl font-extrabold text-white mb-1" style={{ fontFamily:"'Sora',sans-serif" }}>Admin Panel</h1>
          <p className="text-white/50 text-sm">SLH Service Nederland</p>
        </div>
        <div className="bg-white rounded-3xl shadow-card-lg border border-white/10 p-7">
          <form onSubmit={sub} className="space-y-4">
            <div>
              <label className="block text-slate-700 font-semibold text-sm mb-2">Password</label>
              <div className="relative">
                <input type={show?'text':'password'} value={pw} onChange={e=>{setPw(e.target.value);setErr('')}} placeholder="Enter admin password" autoComplete="current-password"
                  className="w-full px-4 py-3.5 pr-12 bg-slate-50 border border-slate-200 rounded-2xl text-slate-800 text-sm focus:outline-none focus:border-cyan focus:bg-white transition-all"/>
                <button type="button" onClick={()=>setShow(v=>!v)} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600">{show?<EyeOff size={16}/>:<Eye size={16}/>}</button>
              </div>
            </div>
            {err&&<div className="flex items-center gap-2 text-red-500 text-sm"><AlertCircle size={14}/>{err}</div>}
            <button type="submit" className="btn-primary w-full justify-center py-3.5">Sign In</button>
          </form>
          <p className="text-slate-400 text-xs text-center mt-4">Default: <code className="bg-slate-100 px-1.5 py-0.5 rounded text-slate-600 font-mono">slh2024admin</code></p>
        </div>
      </div>
    </div>
  )
}
