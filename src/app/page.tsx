import { Hero } from "@/components/sections/hero";
import { Intro } from "@/components/sections/intro";
import { Services } from "@/components/sections/services";
import { Photography } from "@/components/sections/photography";
import { Videography } from "@/components/sections/videography";
import { Editing } from "@/components/sections/editing";
import { Drone } from "@/components/sections/drone";
import { FeaturedProjects } from "@/components/sections/featured-projects";
import { Process } from "@/components/sections/process";
import { BehindTheScenes } from "@/components/sections/behind-the-scenes";
import { Equipment } from "@/components/sections/equipment";
import { Testimonials } from "@/components/sections/testimonials";
import { About } from "@/components/sections/about";
import { Contact } from "@/components/sections/contact";

export default function Home() {
  return (
    <>
      <Hero />
      <Intro />
      <Services />
      <FeaturedProjects />
      <Videography />
      <Photography />
      <Editing />
      <Drone />
      <Process />
      <BehindTheScenes />
      <Equipment />
      <Testimonials />
      <About />
      <Contact />
    </>
  );
}
