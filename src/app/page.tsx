import { GridBackground } from "@/components/ui/grid-background";
import { LandingHeader } from "@/components/photocard/views/landing-header";
import { LandingPageWrapper } from "@/components/photocard/views/landing-page-wrapper";

export default function Home() {
  return (
    <GridBackground>
      <LandingHeader />
      <LandingPageWrapper />
    </GridBackground>
  );
}
