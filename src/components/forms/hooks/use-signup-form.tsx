import { Country } from "@/components/ui/country-dropdown";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {
  customerSignUpFormValues,
  customerSignUpSchema,
} from "../schemas/auth-schemas";
import { toast } from "sonner";

export const useSignUpForm = () => {
  const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);
  const [cityList, setCityList] = useState<string[]>([]);
  const [isCitiesLoading, setIsCitiesLoading] = useState(false);

  const form = useForm<customerSignUpFormValues>({
    resolver: zodResolver(customerSignUpSchema),
    defaultValues: {
      email: "",
      country: "",
      city: "",
      zipCode: "",
    },
  });

  useEffect(() => {
    if (!selectedCountry) {
      setCityList([]);
      return;
    }

    const fetchCities = async () => {
      setIsCitiesLoading(true);
      try {
        const formatted_country = selectedCountry.name.toLowerCase();
        const res = await fetch("/api/cities", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ country: formatted_country }),
        });

        if (!res.ok) {
          throw new Error("Failed to fetch cities");
        }

        const data = await res.json();
        if (data.data) {
          // Sort cities alphabetically for better UX
          setCityList(data.data.sort());
        } else {
          setCityList([]);
        }
      } catch (error) {
        console.error("Error fetching cities:", error);
        toast.error("Failed to load cities. Please try again.");
        setCityList([]);
      } finally {
        setIsCitiesLoading(false);
      }
    };

    fetchCities();
  }, [selectedCountry]);

  return {
    form,
    selectedCountry,
    setSelectedCountry,
    cityList,
    isCitiesLoading,
  };
};
