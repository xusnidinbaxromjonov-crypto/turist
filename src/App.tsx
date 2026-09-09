import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { MainLayout } from './components/layout/MainLayout';
import { Home } from './pages/Home';
import { Companions } from './pages/Companions';
import { Messenger } from './pages/Messenger';
import { PlaceDetail } from './pages/PlaceDetail';
import { RouteDetail } from './pages/RouteDetail';
import { BusinessDetail } from './pages/BusinessDetail';
import { ProductDetail } from './pages/ProductDetail';
import { EventDetail } from './pages/EventDetail';
import { AuthProvider } from './context/AuthContext';
import { useEffect } from 'react';

function App() {
  useEffect(() => {
    if (window.location.search.includes('preview=true')) {
      document.body.classList.add('preview-mode');
    }
  }, []);

  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Home />} />
            <Route path="hamroh" element={<Companions />} />
            <Route path="messenger" element={<Messenger />} />
            <Route path="joy/:id" element={<PlaceDetail />} />
            <Route path="marshrut/:id" element={<RouteDetail />} />
            <Route path="biznes/:id" element={<BusinessDetail />} />
            <Route path="mahsulot/:id" element={<ProductDetail />} />
            <Route path="tadbir/:id" element={<EventDetail />} />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
