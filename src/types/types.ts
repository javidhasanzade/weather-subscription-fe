import { ReactNode } from "react";

export interface Temperature {
  current: number;
  max: number;
  min: number;
}

export interface WeatherDegreesProps {
  temperature: Temperature;
}

export interface NavigationItem {
  title: string;
  href?: string;
  description?: string;
  items?: SubNavigationItem[];
  cta?: ReactNode;
}

export interface SubNavigationItem {
  title: string;
  href: string;
}

export const navigationItems: NavigationItem[] = [];

export interface WeatherInfo {
  weatherDescription: string;
  temperature: Temperature;
  windSpeed: string;
  humidity: string;
  pressure: string;
  sunset: string;
  sunrise: string;
}

export interface WeatherCardInfoProps {
  weather_data: WeatherInfo;
  user_data: createSubscriptionSuccessData;
}

export interface createSubscriptionSuccessData {
  email: string;
  country: string;
  city: string;
  zipCode: string;
  countryCode: string;
}

export interface createSubscriptionResponse {
  data?: createSubscriptionSuccessData;
  message?: string;
}

export interface loginSuccessData {
  email: string;
  country: string;
  city: string;
  zipCode: string;
  countryCode: string;
}

export interface loginResponse {
  data?: loginSuccessData;
  message?: string;
}

export interface getWeatherDataResponse {
  data?: WeatherInfo;
  message?: string;
}
