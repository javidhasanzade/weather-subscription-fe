import { COMPANY_NAME } from "@/info";
import { Button } from "@/components/ui/button";
import { Navigation } from "lucide-react";
import Link from "next/link";

export const Hero = () => (
  <div className="w-full">
    <div className="container mx-auto">
      <div className="flex gap-8 py-20 lg:py-40 items-center justify-center flex-col">
        <div className="flex gap-4 flex-col">
          <h1 className="text-5xl md:text-7xl max-w-2xl tracking-tighter text-center font-regular">
            {COMPANY_NAME}: Your Weather Companion
          </h1>
          <p className="text-lg md:text-xl leading-relaxed tracking-tight text-muted-foreground max-w-2xl text-center">
            {COMPANY_NAME} is a weather app that provides accurate and
            up-to-date weather information for your location. With a
            user-friendly interface and advanced features, {COMPANY_NAME} is
            your go-to app for all things weather-related.
          </p>
        </div>
        <div className="flex flex-row gap-3">
          <Link href="/weather">
            <Button size="lg" className="gap-4" variant="outline">
              Start today <Navigation className="w-4 h-4" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  </div>
);
