'use client';

import AuroraBackground from "@/components/reactbits/AuroraBackground";
import BlobCursor from "@/components/reactbits/BlobCursor";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import HeroFrameAnimation from "@/components/sections/HeroFrameAnimation";
import About from "@/components/sections/About";
import Product from "@/components/sections/Product";
import WorkStack from "@/components/sections/WorkStack";
import Services from "@/components/sections/Services";
import Process from "@/components/sections/Process";
import Testimonials from "@/components/sections/Testimonials";
import Contact from "@/components/sections/Contact";

export default function HomePage() {
  return (
    <div className="relative min-h-screen overflow-clip bg-black text-white">
      <AuroraBackground />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(173,158,143,0.08),transparent_35%)]" />
      <div className="absolute inset-x-0 top-[120px] h-px bg-gradient-to-r from-transparent via-white/25 to-transparent opacity-50" />
      <div className="relative z-10">
        <NavBar />
        <main className="space-y-20 pb-12 pt-4 sm:space-y-24">
          <HeroFrameAnimation />
          <About />
          <Product />
          <WorkStack />
          <Services />
          <Process />
          <Testimonials />
          <Contact />
        </main>
        <Footer />
      </div>
      <BlobCursor />
    </div>
  );
}
