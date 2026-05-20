/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        cyan:  { DEFAULT:'#00C2E0', 50:'#E8FBFF', 100:'#C3F4FF', 200:'#7DE9FF', 300:'#38DAFF', 400:'#00C2E0', 500:'#009AB5', 600:'#007A91', 700:'#005E70' },
        navy:  { DEFAULT:'#0D3A6E', 50:'#EEF5FF', 100:'#D5E6F7', 200:'#AACDF0', 300:'#6AAAE3', 400:'#3381CB', 500:'#1A62A8', 600:'#0D3A6E', 700:'#082B54', 800:'#051C38', 900:'#030F1F' },
        slate: { 50:'#F8FAFC', 100:'#F1F5F9', 150:'#ECF1F8', 200:'#E2E8F0', 300:'#CBD5E1', 400:'#94A3B8', 500:'#64748B', 600:'#475569', 700:'#334155', 800:'#1E293B', 900:'#0F172A' },
      },
      fontFamily: {
        sans:    ['"DM Sans"',    'system-ui', 'sans-serif'],
        display: ['"Sora"',       'system-ui', 'sans-serif'],
        arabic:  ['Tajawal',      'sans-serif'],
      },
      boxShadow: {
        'card':   '0 1px 3px rgba(0,0,0,0.04), 0 4px 16px rgba(0,0,0,0.06)',
        'card-md':'0 4px 24px rgba(0,0,0,0.09), 0 1px 6px rgba(0,0,0,0.05)',
        'card-lg':'0 12px 48px rgba(0,0,0,0.13), 0 3px 12px rgba(0,0,0,0.06)',
        'cyan':   '0 4px 20px rgba(0,194,224,0.30)',
        'navy':   '0 4px 20px rgba(13,58,110,0.28)',
        'glow':   '0 0 40px rgba(0,194,224,0.18)',
        'inner':  'inset 0 1px 0 rgba(255,255,255,0.08)',
      },
      backgroundImage: {
        'grad-brand':   'linear-gradient(135deg,#00C2E0 0%,#0D3A6E 100%)',
        'grad-hero':    'linear-gradient(160deg,rgba(5,28,56,0.92) 0%,rgba(13,58,110,0.78) 45%,rgba(0,122,145,0.45) 100%)',
        'grad-light':   'linear-gradient(135deg,#F0FAFF 0%,#EEF5FF 100%)',
        'grad-section': 'linear-gradient(180deg,#FFFFFF 0%,#F8FAFC 100%)',
      },
      animation: {
        'float':     'float 6s ease-in-out infinite',
        'float-alt': 'float 8s ease-in-out infinite 1.5s',
        'float-sm':  'float 5s ease-in-out infinite 0.8s',
        'pulse-slow':'pulse 3s ease-in-out infinite',
        'slide-in':  'slideIn .65s cubic-bezier(.16,1,.3,1) forwards',
      },
      keyframes: {
        float:   { '0%,100%':{transform:'translateY(0)'}, '50%':{transform:'translateY(-14px)'} },
        slideIn: { from:{opacity:0,transform:'translateY(28px)'}, to:{opacity:1,transform:'translateY(0)'} },
      },
    },
  },
  plugins: [],
}
