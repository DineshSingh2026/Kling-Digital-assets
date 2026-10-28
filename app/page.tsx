import { About } from '@/components/sections/About';
import { Capabilities } from '@/components/sections/Capabilities';
import { Contact } from '@/components/sections/Contact';
import { Footer } from '@/components/sections/Footer';
import { Hero } from '@/components/sections/Hero';
import { Nav } from '@/components/sections/Nav';
import { Services } from '@/components/sections/Services';

export default function HomePage() {
  return (
    <>
      <Nav />
      <main id="main">
        <Hero />
        <Capabilities />
        <Services />
        <About />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
