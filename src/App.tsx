import { I18nProvider } from './lib/i18n';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import Stats from './components/Stats';
import Renders from './components/Renders';
import Visualizations from './components/Visualizations';
import Posters from './components/Posters';
import Websites from './components/Websites';
import Process from './components/Process';
import Contact from './components/Contact';
import Footer from './components/Footer';
import WhatsAppFab from './components/WhatsAppFab';

function App() {
  return (
    <I18nProvider>
      <div className="min-h-screen bg-surface text-fg">
        <Navigation />
        <main>
          <Hero />
          <Stats />
          <Renders />
          <Visualizations />
          <Posters />
          <Websites />
          <Process />
          <Contact />
        </main>
        <Footer />
        <WhatsAppFab />
      </div>
    </I18nProvider>
  );
}

export default App;
