import { ColorListMap } from "@/types/constants";

export const formatDate = (isoDate: string) => {
  const date = new Date(isoDate);
  const [month, day] = new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric' })
    .format(date)
    .split(' ');

  return { month, day };
};

export const setRandomColor = (): keyof typeof ColorListMap => {
  const colorKeys = Object.keys(ColorListMap) as (keyof typeof ColorListMap)[];
  return colorKeys[Math.floor(Math.random() * colorKeys.length)];
};

export const isColorKey = (color: string): color is keyof typeof ColorListMap => {
  return Object.keys(ColorListMap).includes(color);
}