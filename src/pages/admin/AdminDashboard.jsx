import { useState, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useData } from '../../context/DataContext'
import { LayoutDashboard, FolderKanban, Calendar, Newspaper, Users, Settings, LogOut, Plus, Pencil, Trash2, X, Check, ChevronRight, BarChart3, Mail, Image, Upload, Star, Globe, User } from 'lucide-react'
import Logo from '../../components/ui/Logo'

const ic = "w-full px-4 py-3 rounded-2xl border border-slate-200 bg-slate-50 text-slate-800 text-sm focus:outline-none focus:border-cyan focus:bg-white focus:shadow-[0_0_0_3px_rgba(0,194,224,.07)] transition-all placeholder-slate-400"

function ImgUp({ label, value, onChange, multi=false, gallery=[], onGal }) {
  const ref=useRef()
  const handle=e=>Array.from(e.target.files).forEach(f=>{const r=new FileReader();r.onload=ev=>{if(multi&&onGal)onGal(p=>[...p,ev.target.result]);else onChange(ev.target.result)};r.readAsDataURL(f)})
  return (
    <div>
      <label className="block text-slate-700 font-semibold text-xs mb-1.5 uppercase tracking-wider">{label}</label>
      <input value={value} onChange={e=>onChange(e.target.value)} className={`${ic} mb-2`} placeholder="https://... or upload"/>
      <button type="button" onClick={()=>ref.current.click()} className="flex items-center gap-2 px-4 py-2.5 rounded-xl border text-sm font-medium transition-all mb-2" style={{ background:'rgba(0,194,224,.08)',borderColor:'rgba(0,194,224,.22)',color:'#009AB5' }}>
        <Upload size={14}/>{multi?'Upload Images':'Upload Image'}
      </button>
      <input ref={ref} type="file" accept="image/*" multiple={multi} onChange={handle} className="hidden"/>
      {!multi&&value&&(
        <div className="relative w-full h-36 rounded-2xl overflow-hidden border border-slate-100 mt-2 group">
          <img src={value} alt="" className="w-full h-full object-cover"/>
          <button onClick={()=>onChange('')} className="absolute top-2 right-2 w-7 h-7 rounded-xl bg-black/60 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-500/80"><X size={13}/></button>
        </div>
      )}
      {multi&&gallery.length>0&&(
        <div className="grid grid-cols-4 gap-2 mt-2">
          {gallery.map((img,i)=>(
            <div key={i} className="relative aspect-square rounded-xl overflow-hidden border border-slate-100 group">
              <img src={img} alt="" className="w-full h-full object-cover"/>
              <button onClick={()=>onGal(p=>p.filter((_,idx)=>idx!==i))} className="absolute top-1 right-1 w-6 h-6 rounded-lg bg-black/70 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 hover:bg-red-500/80 transition-opacity"><X size={10}/></button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
function Field({ label, req, children }) {
  return <div><label className="block text-slate-700 font-semibold text-xs mb-1.5 uppercase tracking-wider">{label}{req&&<span className="text-cyan ml-1">*</span>}</label>{children}</div>
}
function Modal({ title, onClose, onSave, children }) {
  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-t-3xl sm:rounded-3xl shadow-card-lg w-full sm:max-w-2xl max-h-[92vh] overflow-hidden flex flex-col border border-slate-100">
        <div className="flex items-center justify-between px-6 py-5 border-b border-slate-100 flex-shrink-0">
          <h3 className="font-extrabold text-slate-800 text-lg" style={{ fontFamily:"'Sora',sans-serif" }}>{title}</h3>
          <button onClick={onClose} className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-xl transition-all"><X size={17}/></button>
        </div>
        <div className="flex-1 overflow-y-auto p-6 space-y-4">{children}</div>
        <div className="flex gap-3 px-6 py-4 border-t border-slate-100 justify-end bg-slate-50/50 flex-shrink-0">
          <button onClick={onClose} className="px-5 py-2.5 rounded-xl bg-slate-100 text-slate-600 text-sm font-semibold hover:bg-slate-200 transition-all">Cancel</button>
          <button onClick={onSave} className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-white text-sm font-semibold" style={{ background:'linear-gradient(135deg,#00C2E0,#0D3A6E)' }}><Check size={14}/>Save</button>
        </div>
      </div>
    </div>
  )
}
function Confirm({ onOk, onNo }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-3xl p-6 max-w-sm w-full shadow-card-lg text-center border border-slate-100">
        <div className="w-14 h-14 rounded-full bg-red-50 border border-red-100 flex items-center justify-center mx-auto mb-4"><Trash2 size={24} className="text-red-500"/></div>
        <h3 className="font-extrabold text-slate-800 text-lg mb-2" style={{ fontFamily:"'Sora',sans-serif" }}>Delete Item?</h3>
        <p className="text-slate-500 text-sm mb-6">This cannot be undone.</p>
        <div className="flex gap-3">
          <button onClick={onNo} className="flex-1 py-2.5 bg-slate-100 rounded-xl text-slate-600 text-sm font-semibold hover:bg-slate-200 transition-all">Cancel</button>
          <button onClick={onOk} className="flex-1 py-2.5 bg-red-500 rounded-xl text-white text-sm font-semibold hover:bg-red-400 transition-all">Delete</button>
        </div>
      </div>
    </div>
  )
}

function Sidebar({ active, onNav }) {
  const { adminLogout, projects, events, blog, partners } = useData(); const nav = useNavigate()
  const items=[{k:'dashboard',l:'Dashboard',I:LayoutDashboard,b:null},{k:'projects',l:'Projects',I:FolderKanban,b:projects.length},{k:'events',l:'Events',I:Calendar,b:events.length},{k:'blog',l:'Blog',I:Newspaper,b:blog.length},{k:'partners',l:'Partners',I:Users,b:partners.length},{k:'settings',l:'Settings',I:Settings,b:null}]
  return (
    <aside className="w-60 bg-white border-r border-slate-100 flex flex-col flex-shrink-0 shadow-sm">
      <div className="px-5 py-5 border-b border-slate-100">
        <Logo h={42} variant="default"/>
        <div className="text-[10px] text-cyan font-bold tracking-widest uppercase mt-2 opacity-70">Admin Panel</div>
      </div>
      <nav className="flex-1 p-3 space-y-0.5">
        {items.map(({k,l,I,b})=>(
          <button key={k} onClick={()=>onNav(k)} className={`w-full flex items-center gap-3 px-3.5 py-3 rounded-xl text-sm font-semibold transition-all ${active===k?'text-cyan bg-cyan/[0.08] border border-cyan/15':'text-slate-600 hover:text-navy hover:bg-slate-50'}`}>
            <I size={16}/><span className="flex-1 text-left">{l}</span>
            {b!==null&&<span className={`text-[11px] px-2 py-0.5 rounded-full font-bold ${active===k?'bg-cyan/15 text-cyan':'bg-slate-100 text-slate-500'}`}>{b}</span>}
          </button>
        ))}
      </nav>
      <div className="p-3 border-t border-slate-100">
        <button onClick={()=>{adminLogout();nav('/')}} className="w-full flex items-center gap-3 px-3.5 py-3 rounded-xl text-sm font-semibold text-slate-500 hover:text-red-500 hover:bg-red-50 transition-all">
          <LogOut size={16}/>Sign Out
        </button>
      </div>
    </aside>
  )
}

function Dashboard({ onNav }) {
  const {projects,events,blog,partners,settings}=useData()
  const cards=[{l:'Projects',v:projects.length,I:FolderKanban,k:'projects',c:'#00C2E0'},{l:'Events',v:events.length,I:Calendar,k:'events',c:'#8B5CF6'},{l:'Articles',v:blog.length,I:Newspaper,k:'blog',c:'#22C55E'},{l:'Partners',v:partners.length,I:Users,k:'partners',c:'#F59E0B'}]
  return (
    <div>
      <div className="mb-8"><h1 className="text-2xl font-extrabold text-slate-800 mb-1" style={{ fontFamily:"'Sora',sans-serif" }}>Welcome back 👋</h1><p className="text-slate-500 text-sm">Manage all SLH Service Nederland content from here.</p></div>
      <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-8">
        {cards.map(({l,v,I,k,c})=>(
          <button key={k} onClick={()=>onNav(k)} className="group p-6 bg-white rounded-2xl border border-slate-100 shadow-card text-left hover:shadow-card-md hover:-translate-y-0.5 transition-all">
            <div className="flex items-start justify-between mb-4"><div className="w-11 h-11 rounded-xl flex items-center justify-center" style={{ background:`${c}14` }}><I size={20} style={{ color:c }}/></div><ChevronRight size={14} className="text-slate-300 group-hover:text-cyan transition-colors"/></div>
            <div className="text-3xl font-extrabold text-slate-800 mb-0.5" style={{ fontFamily:"'Sora',sans-serif" }}>{v}</div>
            <div className="text-slate-500 text-xs font-semibold">{l}</div>
          </button>
        ))}
      </div>
      <div className="grid md:grid-cols-2 gap-5">
        <div className="p-6 bg-white rounded-2xl border border-slate-100 shadow-card">
          <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2 text-sm" style={{ fontFamily:"'Sora',sans-serif" }}><Mail size={15} className="text-cyan"/>Contact Details</h3>
          <div className="space-y-2">{[['Email',settings.email],['Phone',settings.phone],['CEO',settings.ceoName]].map(([k,v])=><div key={k} className="flex justify-between items-center py-2 border-b border-slate-50 last:border-0"><span className="text-slate-400 text-xs font-semibold uppercase">{k}</span><span className="text-slate-800 text-xs font-medium">{v}</span></div>)}</div>
          <button onClick={()=>onNav('settings')} className="mt-4 text-cyan text-xs font-semibold hover:underline">Edit Settings →</button>
        </div>
        <div className="p-6 bg-white rounded-2xl border border-slate-100 shadow-card">
          <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2 text-sm" style={{ fontFamily:"'Sora',sans-serif" }}><BarChart3 size={15} className="text-cyan"/>Hero Statistics</h3>
          <div className="grid grid-cols-2 gap-3">{Object.entries(settings.heroStats).map(([k,v])=><div key={k} className="p-3 rounded-2xl text-center" style={{ background:'rgba(0,194,224,.07)',border:'1px solid rgba(0,194,224,.14)' }}><div className="font-extrabold text-xl text-cyan leading-none" style={{ fontFamily:"'Sora',sans-serif" }}>{v}</div><div className="text-slate-400 text-[10px] capitalize mt-0.5">{k}</div></div>)}</div>
        </div>
      </div>
    </div>
  )
}

const EP={title:'',description:'',country:'',status:'Active',category:'',technologies:'',partners:'',image:'',gallery:[],timeline:''}
function ProjectsAdmin() {
  const {projects,saveItem,deleteItem}=useData()
  const [modal,setModal]=useState(null);const [form,setForm]=useState(EP);const [gal,setGal]=useState([]);const [del,setDel]=useState(null)
  const openAdd=()=>{setForm(EP);setGal([]);setModal({mode:'add'})}
  const openEdit=p=>{setForm({...p,technologies:p.technologies?.join(', ')||'',partners:p.partners?.join(', ')||''});setGal(p.gallery||[]);setModal({mode:'edit',item:p})}
  const save=()=>{const item={...form,gallery:gal,technologies:form.technologies.split(',').map(s=>s.trim()).filter(Boolean),partners:form.partners.split(',').map(s=>s.trim()).filter(Boolean)};if(modal.mode==='edit')item.id=modal.item.id;saveItem('projects',item);setModal(null)}
  return (
    <div>
      <div className="flex items-center justify-between mb-8"><div><h1 className="text-xl font-extrabold text-slate-800" style={{ fontFamily:"'Sora',sans-serif" }}>Projects</h1><p className="text-slate-500 text-sm mt-0.5">{projects.length} total</p></div><button onClick={openAdd} className="flex items-center gap-2 text-white px-4 py-2.5 rounded-xl text-sm font-semibold hover:-translate-y-0.5 transition-all" style={{ background:'linear-gradient(135deg,#00C2E0,#0D3A6E)' }}><Plus size={15}/>Add Project</button></div>
      <div className="space-y-3">{projects.map(p=>(
        <div key={p.id} className="group flex items-center gap-4 p-4 bg-white rounded-2xl border border-slate-100 shadow-card hover:border-cyan/18 hover:shadow-card-md transition-all">
          <div className="w-14 h-14 rounded-xl overflow-hidden bg-slate-50 border border-slate-100 flex-shrink-0 flex items-center justify-center">{p.image?<img src={p.image} alt="" className="w-full h-full object-cover"/>:<Image size={18} className="text-slate-400"/>}</div>
          <div className="flex-1 min-w-0"><div className="flex items-center gap-2 mb-1"><span className="font-bold text-slate-800 text-sm truncate" style={{ fontFamily:"'Sora',sans-serif" }}>{p.title}</span><span className="flex-shrink-0 px-2 py-0.5 rounded-full text-[10px] font-bold" style={{ background:p.status==='Active'?'rgba(0,194,224,.1)':p.status==='Completed'?'rgba(34,197,94,.1)':'rgba(148,163,184,.1)',color:p.status==='Active'?'#009AB5':p.status==='Completed'?'#16A34A':'#64748B' }}>{p.status}</span></div><p className="text-slate-500 text-xs truncate">{p.country}{p.category?` · ${p.category}`:''}</p></div>
          <div className="flex gap-1.5 flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity"><button onClick={()=>openEdit(p)} className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-500 transition-all"><Pencil size={13}/></button><button onClick={()=>setDel(p.id)} className="p-2 rounded-xl bg-red-50 hover:bg-red-100 text-red-400 transition-all"><Trash2 size={13}/></button></div>
        </div>
      ))}</div>
      {modal&&<Modal title={modal.mode==='add'?'Add Project':'Edit Project'} onClose={()=>setModal(null)} onSave={save}>
        <div className="grid sm:grid-cols-2 gap-4">
          <Field label="Title" req><input value={form.title} onChange={e=>setForm(f=>({...f,title:e.target.value}))} className={ic}/></Field>
          <Field label="Country"><input value={form.country} onChange={e=>setForm(f=>({...f,country:e.target.value}))} className={ic}/></Field>
          <Field label="Status"><select value={form.status} onChange={e=>setForm(f=>({...f,status:e.target.value}))} className={ic}><option>Active</option><option>Completed</option><option>Planned</option></select></Field>
          <Field label="Category"><input value={form.category} onChange={e=>setForm(f=>({...f,category:e.target.value}))} className={ic}/></Field>
          <Field label="Timeline"><input value={form.timeline} onChange={e=>setForm(f=>({...f,timeline:e.target.value}))} className={ic} placeholder="2024-2026"/></Field>
        </div>
        <Field label="Description" req><textarea rows={3} value={form.description} onChange={e=>setForm(f=>({...f,description:e.target.value}))} className={`${ic} resize-none`}/></Field>
        <Field label="Technologies (comma separated)"><input value={form.technologies} onChange={e=>setForm(f=>({...f,technologies:e.target.value}))} className={ic} placeholder="Electrolysis, Solar PV"/></Field>
        <Field label="Partners (comma separated)"><input value={form.partners} onChange={e=>setForm(f=>({...f,partners:e.target.value}))} className={ic}/></Field>
        <div className="divider-grad"/>
        <ImgUp label="Cover Image" value={form.image} onChange={v=>setForm(f=>({...f,image:v}))}/>
        <ImgUp label="Gallery" value="" onChange={()=>{}} multi gallery={gal} onGal={setGal}/>
      </Modal>}
      {del&&<Confirm onOk={()=>{deleteItem('projects',del);setDel(null)}} onNo={()=>setDel(null)}/>}
    </div>
  )
}

const EE={title:'',description:'',date:'',country:'',location:'',type:'Conference',image:'',gallery:[],featured:false}
function EventsAdmin() {
  const {events,saveItem,deleteItem}=useData()
  const [modal,setModal]=useState(null);const [form,setForm]=useState(EE);const [gal,setGal]=useState([]);const [del,setDel]=useState(null)
  const openAdd=()=>{setForm(EE);setGal([]);setModal({mode:'add'})}
  const openEdit=e=>{setForm(e);setGal(e.gallery||[]);setModal({mode:'edit',item:e})}
  const save=()=>{const item={...form,gallery:gal};if(modal.mode==='edit')item.id=modal.item.id;saveItem('events',item);setModal(null)}
  return (
    <div>
      <div className="flex items-center justify-between mb-8"><div><h1 className="text-xl font-extrabold text-slate-800" style={{ fontFamily:"'Sora',sans-serif" }}>Events & Missions</h1><p className="text-slate-500 text-sm mt-0.5">{events.length} total</p></div><button onClick={openAdd} className="flex items-center gap-2 text-white px-4 py-2.5 rounded-xl text-sm font-semibold" style={{ background:'linear-gradient(135deg,#00C2E0,#0D3A6E)' }}><Plus size={15}/>Add Event</button></div>
      <div className="space-y-3">{events.sort((a,b)=>new Date(b.date)-new Date(a.date)).map(ev=>{const d=new Date(ev.date);return(
        <div key={ev.id} className="group flex items-center gap-4 p-4 bg-white rounded-2xl border border-slate-100 shadow-card hover:border-cyan/18 transition-all">
          <div className="text-center w-14 flex-shrink-0"><div className="text-xl font-extrabold leading-none grad-text" style={{ fontFamily:"'Sora',sans-serif" }}>{d.getDate()}</div><div className="text-slate-400 text-xs">{d.toLocaleDateString('en',{month:'short'})}</div></div>
          <div className="flex-1 min-w-0"><div className="flex items-center gap-2 mb-1"><span className="font-bold text-slate-800 text-sm truncate" style={{ fontFamily:"'Sora',sans-serif" }}>{ev.title}</span><span className="flex-shrink-0 px-2 py-0.5 rounded-full text-[10px] font-bold" style={{ background:'rgba(0,194,224,.1)',color:'#009AB5' }}>{ev.type}</span>{ev.featured&&<Star size={12} className="text-amber-400 flex-shrink-0"/>}</div><p className="text-slate-500 text-xs">{ev.location}, {ev.country}</p></div>
          <div className="flex gap-1.5 flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity"><button onClick={()=>openEdit(ev)} className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-500 transition-all"><Pencil size={13}/></button><button onClick={()=>setDel(ev.id)} className="p-2 rounded-xl bg-red-50 hover:bg-red-100 text-red-400 transition-all"><Trash2 size={13}/></button></div>
        </div>
      )})}</div>
      {modal&&<Modal title={modal.mode==='add'?'Add Event':'Edit Event'} onClose={()=>setModal(null)} onSave={save}>
        <div className="grid sm:grid-cols-2 gap-4">
          <Field label="Title" req><input value={form.title} onChange={e=>setForm(f=>({...f,title:e.target.value}))} className={ic}/></Field>
          <Field label="Date" req><input type="date" value={form.date} onChange={e=>setForm(f=>({...f,date:e.target.value}))} className={ic}/></Field>
          <Field label="Country"><input value={form.country} onChange={e=>setForm(f=>({...f,country:e.target.value}))} className={ic}/></Field>
          <Field label="Location"><input value={form.location} onChange={e=>setForm(f=>({...f,location:e.target.value}))} className={ic}/></Field>
          <Field label="Type"><select value={form.type} onChange={e=>setForm(f=>({...f,type:e.target.value}))} className={ic}>{['Conference','Economic Mission','Forum','Summit','Delegation','Workshop','Exhibition'].map(t=><option key={t}>{t}</option>)}</select></Field>
        </div>
        <Field label="Description"><textarea rows={3} value={form.description} onChange={e=>setForm(f=>({...f,description:e.target.value}))} className={`${ic} resize-none`}/></Field>
        <label className="flex items-center gap-3 cursor-pointer"><input type="checkbox" checked={form.featured} onChange={e=>setForm(f=>({...f,featured:e.target.checked}))} className="w-4 h-4 accent-cyan"/><span className="text-slate-700 text-sm font-medium">Mark as Featured</span></label>
        <div className="divider-grad"/>
        <ImgUp label="Cover Image" value={form.image} onChange={v=>setForm(f=>({...f,image:v}))}/>
        <ImgUp label="Gallery" value="" onChange={()=>{}} multi gallery={gal} onGal={setGal}/>
      </Modal>}
      {del&&<Confirm onOk={()=>{deleteItem('events',del);setDel(null)}} onNo={()=>setDel(null)}/>}
    </div>
  )
}

const EB={title:'',description:'',category:'Market Analysis',tags:'',image:'',author:'Nouraddine Gribi',date:new Date().toISOString().split('T')[0],readTime:5,published:false,slug:''}
function BlogAdmin() {
  const {blog,saveItem,deleteItem}=useData()
  const [modal,setModal]=useState(null);const [form,setForm]=useState(EB);const [del,setDel]=useState(null)
  const openAdd=()=>{setForm(EB);setModal({mode:'add'})}
  const openEdit=p=>{setForm({...p,tags:p.tags?.join(', ')||''});setModal({mode:'edit',item:p})}
  const save=()=>{const item={...form,tags:form.tags.split(',').map(s=>s.trim()).filter(Boolean),slug:form.slug||form.title.toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'')};if(modal.mode==='edit')item.id=modal.item.id;saveItem('blog',item);setModal(null)}
  return (
    <div>
      <div className="flex items-center justify-between mb-8"><div><h1 className="text-xl font-extrabold text-slate-800" style={{ fontFamily:"'Sora',sans-serif" }}>Blog & News</h1><p className="text-slate-500 text-sm mt-0.5">{blog.filter(p=>p.published).length} published · {blog.filter(p=>!p.published).length} drafts</p></div><button onClick={openAdd} className="flex items-center gap-2 text-white px-4 py-2.5 rounded-xl text-sm font-semibold" style={{ background:'linear-gradient(135deg,#00C2E0,#0D3A6E)' }}><Plus size={15}/>Add Post</button></div>
      <div className="space-y-3">{blog.map(post=>(
        <div key={post.id} className="group flex items-center gap-4 p-4 bg-white rounded-2xl border border-slate-100 shadow-card hover:border-cyan/18 transition-all">
          <div className="w-14 h-14 rounded-xl overflow-hidden bg-slate-50 border border-slate-100 flex-shrink-0 flex items-center justify-center">{post.image?<img src={post.image} alt="" className="w-full h-full object-cover"/>:<Image size={18} className="text-slate-400"/>}</div>
          <div className="flex-1 min-w-0"><div className="flex items-center gap-2 mb-1"><span className="font-bold text-slate-800 text-sm truncate" style={{ fontFamily:"'Sora',sans-serif" }}>{post.title}</span><span className={`flex-shrink-0 px-2 py-0.5 rounded-full text-[10px] font-bold ${post.published?'bg-green-50 text-green-600':'bg-slate-100 text-slate-500'}`}>{post.published?'Live':'Draft'}</span></div><p className="text-slate-500 text-xs">{post.category} · {post.author} · {post.date}</p></div>
          <div className="flex gap-1.5 flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity"><button onClick={()=>openEdit(post)} className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-500 transition-all"><Pencil size={13}/></button><button onClick={()=>setDel(post.id)} className="p-2 rounded-xl bg-red-50 hover:bg-red-100 text-red-400 transition-all"><Trash2 size={13}/></button></div>
        </div>
      ))}</div>
      {modal&&<Modal title={modal.mode==='add'?'Add Post':'Edit Post'} onClose={()=>setModal(null)} onSave={save}>
        <Field label="Title" req><input value={form.title} onChange={e=>setForm(f=>({...f,title:e.target.value}))} className={ic}/></Field>
        <div className="grid sm:grid-cols-2 gap-4">
          <Field label="Category"><select value={form.category} onChange={e=>setForm(f=>({...f,category:e.target.value}))} className={ic}>{['Market Analysis','Strategy','Policy','Technology','Partnership','News'].map(c=><option key={c}>{c}</option>)}</select></Field>
          <Field label="Author"><input value={form.author} onChange={e=>setForm(f=>({...f,author:e.target.value}))} className={ic}/></Field>
          <Field label="Date"><input type="date" value={form.date} onChange={e=>setForm(f=>({...f,date:e.target.value}))} className={ic}/></Field>
          <Field label="Read Time (min)"><input type="number" value={form.readTime} onChange={e=>setForm(f=>({...f,readTime:+e.target.value}))} className={ic} min={1}/></Field>
          <div className="sm:col-span-2"><Field label="URL Slug"><input value={form.slug} onChange={e=>setForm(f=>({...f,slug:e.target.value}))} className={ic} placeholder="auto-generated"/></Field></div>
        </div>
        <Field label="Summary" req><textarea rows={3} value={form.description} onChange={e=>setForm(f=>({...f,description:e.target.value}))} className={`${ic} resize-none`}/></Field>
        <Field label="Tags (comma separated)"><input value={form.tags} onChange={e=>setForm(f=>({...f,tags:e.target.value}))} className={ic}/></Field>
        <div className="divider-grad"/>
        <ImgUp label="Featured Image" value={form.image} onChange={v=>setForm(f=>({...f,image:v}))}/>
        <label className="flex items-center gap-3 cursor-pointer mt-2"><input type="checkbox" checked={form.published} onChange={e=>setForm(f=>({...f,published:e.target.checked}))} className="w-4 h-4 accent-cyan"/><span className="text-slate-700 text-sm font-medium">Publish post</span></label>
      </Modal>}
      {del&&<Confirm onOk={()=>{deleteItem('blog',del);setDel(null)}} onNo={()=>setDel(null)}/>}
    </div>
  )
}

const EPt={name:'',description:'',logo:'',website:'',country:'',active:true}
function PartnersAdmin() {
  const {partners,saveItem,deleteItem}=useData()
  const [modal,setModal]=useState(null);const [form,setForm]=useState(EPt);const [del,setDel]=useState(null)
  const save=()=>{const item={...form};if(modal.mode==='edit')item.id=modal.item.id;saveItem('partners',item);setModal(null)}
  return (
    <div>
      <div className="flex items-center justify-between mb-8"><div><h1 className="text-xl font-extrabold text-slate-800" style={{ fontFamily:"'Sora',sans-serif" }}>Partners</h1><p className="text-slate-500 text-sm mt-0.5">{partners.filter(p=>p.active).length} active</p></div><button onClick={()=>{setForm(EPt);setModal({mode:'add'})}} className="flex items-center gap-2 text-white px-4 py-2.5 rounded-xl text-sm font-semibold" style={{ background:'linear-gradient(135deg,#00C2E0,#0D3A6E)' }}><Plus size={15}/>Add Partner</button></div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">{partners.map(p=>(
        <div key={p.id} className="group p-5 bg-white rounded-2xl border border-slate-100 shadow-card hover:border-cyan/18 transition-all">
          <div className="flex items-start gap-3 mb-3"><div className="w-11 h-11 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center flex-shrink-0">{p.logo?<img src={p.logo} alt={p.name} className="w-7 h-7 object-contain"/>:<Globe size={18} className="text-slate-400"/>}</div><div className="flex-1 min-w-0"><div className="flex items-center gap-2"><span className="font-bold text-slate-800 text-sm truncate" style={{ fontFamily:"'Sora',sans-serif" }}>{p.name}</span><span className={`w-2 h-2 rounded-full flex-shrink-0 ${p.active?'bg-green-400':'bg-slate-300'}`}/></div><p className="text-slate-400 text-xs">{p.country}</p></div></div>
          <p className="text-slate-500 text-xs line-clamp-2 mb-3">{p.description}</p>
          <div className="flex gap-2"><button onClick={()=>{setForm(p);setModal({mode:'edit',item:p})}} className="flex-1 py-2 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-500 text-xs font-semibold transition-all flex items-center justify-center gap-1"><Pencil size={11}/>Edit</button><button onClick={()=>setDel(p.id)} className="py-2 px-3 rounded-xl bg-red-50 hover:bg-red-100 text-red-400 transition-all"><Trash2 size={13}/></button></div>
        </div>
      ))}</div>
      {modal&&<Modal title={modal.mode==='add'?'Add Partner':'Edit Partner'} onClose={()=>setModal(null)} onSave={save}>
        <div className="grid sm:grid-cols-2 gap-4">
          <Field label="Name" req><input value={form.name} onChange={e=>setForm(f=>({...f,name:e.target.value}))} className={ic}/></Field>
          <Field label="Country"><input value={form.country} onChange={e=>setForm(f=>({...f,country:e.target.value}))} className={ic}/></Field>
          <div className="sm:col-span-2"><Field label="Website"><input value={form.website} onChange={e=>setForm(f=>({...f,website:e.target.value}))} className={ic} placeholder="https://..."/></Field></div>
        </div>
        <Field label="Description"><textarea rows={2} value={form.description} onChange={e=>setForm(f=>({...f,description:e.target.value}))} className={`${ic} resize-none`}/></Field>
        <div className="divider-grad"/>
        <ImgUp label="Logo" value={form.logo} onChange={v=>setForm(f=>({...f,logo:v}))}/>
        <label className="flex items-center gap-3 cursor-pointer mt-2"><input type="checkbox" checked={form.active} onChange={e=>setForm(f=>({...f,active:e.target.checked}))} className="w-4 h-4 accent-cyan"/><span className="text-slate-700 text-sm font-medium">Show on website</span></label>
      </Modal>}
      {del&&<Confirm onOk={()=>{deleteItem('partners',del);setDel(null)}} onNo={()=>setDel(null)}/>}
    </div>
  )
}

function SettingsAdmin() {
  const {settings,saveSettings}=useData()
  const [form,setForm]=useState({...settings,heroStats:{...settings.heroStats}})
  const [saved,setSaved]=useState(false)
  const save=()=>{saveSettings(form);setSaved(true);setTimeout(()=>setSaved(false),2500)}
  return (
    <div className="max-w-2xl">
      <div className="mb-8"><h1 className="text-xl font-extrabold text-slate-800" style={{ fontFamily:"'Sora',sans-serif" }}>Settings</h1><p className="text-slate-500 text-sm mt-0.5">Contact info, CEO photo, hero stats, and credentials.</p></div>
      <div className="space-y-5">
        <div className="p-6 bg-white rounded-2xl border border-slate-100 shadow-card">
          <h3 className="font-bold text-slate-800 mb-5 text-sm flex items-center gap-2" style={{ fontFamily:"'Sora',sans-serif" }}><User size={15} className="text-cyan"/>CEO Profile</h3>
          <div className="grid sm:grid-cols-2 gap-4 mb-4">
            <Field label="CEO Name"><input value={form.ceoName} onChange={e=>setForm(f=>({...f,ceoName:e.target.value}))} className={ic}/></Field>
          </div>
          <ImgUp label="CEO Photo (used on homepage & About)" value={form.ceoImage||''} onChange={v=>setForm(f=>({...f,ceoImage:v}))}/>
        </div>
        <div className="p-6 bg-white rounded-2xl border border-slate-100 shadow-card">
          <h3 className="font-bold text-slate-800 mb-5 text-sm flex items-center gap-2" style={{ fontFamily:"'Sora',sans-serif" }}><Mail size={15} className="text-cyan"/>Contact Information</h3>
          <div className="grid sm:grid-cols-2 gap-4">
            <Field label="Location"><input value={form.address} onChange={e=>setForm(f=>({...f,address:e.target.value}))} className={ic}/></Field>
            <Field label="Email"><input value={form.email} onChange={e=>setForm(f=>({...f,email:e.target.value}))} className={ic}/></Field>
            <Field label="Phone"><input value={form.phone} onChange={e=>setForm(f=>({...f,phone:e.target.value}))} className={ic}/></Field>
            <div className="sm:col-span-2"><Field label="LinkedIn URL"><input value={form.linkedIn} onChange={e=>setForm(f=>({...f,linkedIn:e.target.value}))} className={ic}/></Field></div>
          </div>
        </div>
        <div className="p-6 bg-white rounded-2xl border border-slate-100 shadow-card">
          <h3 className="font-bold text-slate-800 mb-5 text-sm flex items-center gap-2" style={{ fontFamily:"'Sora',sans-serif" }}><BarChart3 size={15} className="text-cyan"/>Hero Statistics</h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">{Object.entries(form.heroStats).map(([k,v])=><Field key={k} label={k.charAt(0).toUpperCase()+k.slice(1)}><input value={v} onChange={e=>setForm(f=>({...f,heroStats:{...f.heroStats,[k]:e.target.value}}))} className={ic}/></Field>)}</div>
        </div>
        <div className="p-6 bg-white rounded-2xl border border-slate-100 shadow-card">
          <h3 className="font-bold text-slate-800 mb-5 text-sm" style={{ fontFamily:"'Sora',sans-serif" }}>Admin Password</h3>
          <Field label="New Password"><input type="text" value={form.adminPassword} onChange={e=>setForm(f=>({...f,adminPassword:e.target.value}))} className={ic}/></Field>
        </div>
        <button onClick={save} className="w-full flex items-center justify-center gap-2 py-4 text-white font-bold rounded-2xl text-base transition-all hover:-translate-y-0.5" style={{ background:'linear-gradient(135deg,#00C2E0,#0D3A6E)' }}>
          {saved?<><Check size={18}/>Saved!</>:'Save All Settings'}
        </button>
      </div>
    </div>
  )
}

export default function AdminDashboard() {
  const [sec,setSec]=useState('dashboard')
  const views={dashboard:<Dashboard onNav={setSec}/>,projects:<ProjectsAdmin/>,events:<EventsAdmin/>,blog:<BlogAdmin/>,partners:<PartnersAdmin/>,settings:<SettingsAdmin/>}
  return (
    <div className="min-h-screen bg-slate-50 flex">
      <Sidebar active={sec} onNav={setSec}/>
      <main className="flex-1 overflow-auto"><div className="p-8">{views[sec]}</div></main>
    </div>
  )
}
