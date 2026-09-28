import { Background } from "@/components/background";
import { Footer } from "@/components/footer";
import { HeroNav } from "@/components/hero-nav";
import { Newsletter } from "@/components/newsletter";
import { HERO_VIDEO, HERO_PLACEHOLDER } from "@/lib/constants";

export default function Home() {
  return (
    <main className="h-[100dvh] w-full p-inset">
      <div className="relative h-full w-full">
        <Background src={HERO_VIDEO} placeholder={HERO_PLACEHOLDER} />
        <Newsletter />
        <HeroNav />
        <Footer />
      </div>
    </main>
  );
}