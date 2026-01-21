import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Background3D from './components/Background3D';
import HomePage from './pages/HomePage';
import AIAssistantPage from './pages/AIAssistantPage';

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <div className="min-h-screen overflow-x-hidden relative transition-colors duration-300">
          <Background3D />
          <Navbar />
          <main className="overflow-x-hidden relative z-10">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/ai-assistant" element={<AIAssistantPage />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
