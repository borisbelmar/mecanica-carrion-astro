import WhatsappButton from "@/components/whatsappButton";
import Navbar from "../../navbar";
import Services from "./services";
import Slider from "./slider";

export default function Home() {
  return (
    <section className="flex flex-col min-h-screen">
      <Navbar />
      <Slider />
      <Services />
      <WhatsappButton />
    </section>
  )
}