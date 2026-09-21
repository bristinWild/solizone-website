import { Background } from "@/components/background";
import { Footer } from "@/components/footer";
import { Newsletter } from "@/components/newsletter";
import { Products } from "@/components/product";
import { ScrollStage } from "@/components/scroll-stage";


export default function Home() {
  return (
    <main className="w-full">
      <ScrollStage
        hero={
          <>
            <Background
              src="/hero-animated-solizone.mp4"
              placeholder="/default-placeholder.png"
            />
            <Newsletter />
            <Footer />
          </>
        }
      >
        <Products />
      </ScrollStage>
    </main>
  );
}