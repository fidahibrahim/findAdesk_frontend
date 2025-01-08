import { ThemeProvider } from './context/theme-provider'
import { Toaster } from 'sonner'
import { BrowserRouter } from "react-router-dom"
import AppRouter from './routers/AppRouter'


const App = () => {
  return (
    <>
      <BrowserRouter>
        <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
          <AppRouter />
          <Toaster
            position='top-right'
            expand={false}
            richColors
            theme='light'
            closeButton={true}
          />
        </ThemeProvider>
      </BrowserRouter>
    </>
  )
}

export default App
