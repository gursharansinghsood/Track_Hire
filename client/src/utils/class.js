export const toggleCard = (isDark) => `fixed bottom-5 left-5 flex justify-center items-center shadow-brutal-inset  p-1 rounded-4xl border cursor-pointer ${isDark ? 'bg-secondary/50 border-secondary' : 'bg-primary/30 border-primary'}`
export const toggleCircle = (text) => `w-10 h-10 rounded-full flex justify-center items-center text-2xl z-10 ${text}`
export const toggleUpperCircle = (isDark) => `absolute left-1 border-2 w-10 h-10 backdrop-blur-xl rounded-full ${isDark ? 'translate-x-0 bg-secondary/50 border-secondary' : 'translate-x-full bg-primary/30 border-primary'}`


export const authPage = 'w-full min-h-screen flex justify-center items-center'
export const formCard = 'max-w-sm w-full grid grid-cols-1 p-5 m-5 border-2 border-border bg-primary/10 font-extrabold gap-2'



export const inputBox = (error) => `flex items-center text-lg border-2 py-1 px-2 font-medium ${error ? ' border-danger focus-within:bg-danger/10' : 'border-border focus-within:bg-border/10 '}`
export const errorField = 'text-xs text-danger font-medium'