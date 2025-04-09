import DotPattern from "@/components/dot-pattern";
import { WeatherCard } from "./(components)/weather-card/weather-card";
import { Container } from "@/components/container";
import { PageWrapper } from "@/components/page-wrapper";
import { Noise } from "@/components/noise";
import { SunsetSunrise } from "./(components)/sunset-sunrise-card/sunset-sunrise";

export default function Home() {
  return (
    <PageWrapper className="bg-gradient-to-b from-[#f4f4f4] to-[#eaeaea]">
      <Container className="flex items-start justify-center py-4 px-2 mt-4">
        <DotPattern width={5} height={5} className="mask-t-from-60%" />
        <WeatherCard />
        <SunsetSunrise />
      </Container>
      <Noise className="opacity-20" />
    </PageWrapper>
  );
}
