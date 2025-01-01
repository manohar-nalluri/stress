import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import './App.css'
import { ParticlesDemo } from './ParticlesDesign'
const queryClient = new QueryClient();
function App() {
  return (
    <QueryClientProvider client={queryClient}>
    <ParticlesDemo/></QueryClientProvider>
  )
}

export default App
