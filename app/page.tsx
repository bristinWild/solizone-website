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
            <Background src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/alt-g7Cv2QzqL3k6ey3igjNYkM32d8Fld7.mp4" placeholder="/alt-placeholder.png" />
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