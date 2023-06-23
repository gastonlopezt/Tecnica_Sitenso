import './globals.css'
import {ComicProvider} from '@/context/ComicContext'
import Header from '@/components/Header'




export const metadata = {
  title: 'Marvel',
  description: 'Marvel Information',
}

export default function RootLayout({ children }) {
  return (
    <html lang='en'>
        <body>
          <ComicProvider>
            <Header />
              {children} 
          </ComicProvider>
        </body>   
    </html>
  )
}
