import BlogPreview from "@/components/BlogPreview";
import GalleryPage from "@/components/Gallerypage";
import Hero from "@/components/hero";
import MessagesPreview from "@/components/Messagespreview";
import MinistrySelectorSection from "@/components/Ministryselectorsection";
import PastorSection from "@/components/PastorSection";
import UpcomingProgramme from "@/components/Upcomingprogramme";

export default function Home() {
  return (
    <>
      <Hero />
      <UpcomingProgramme />
      <MinistrySelectorSection />
      <MessagesPreview />
      <PastorSection />
      <BlogPreview />
      <GalleryPage />
    </>
  );
}
