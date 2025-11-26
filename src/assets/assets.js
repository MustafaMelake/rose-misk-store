import AngleShare from "./angle-share.png";
import AngleShareP from "./angle-share-p.png";
import Layton from "./layton.png";
import Paradise from "./paradise.jpg";
import SideEffect from "./side-effect.png";
import SpiceBomb from "./spice-bomb.png";
import Tobacoo from "./tobacoo.png";
import Logo from "./logo.jpg";
import HeroIMG from "./Hero-img.jpg";
import Elixir from "./Screenshot 2025-11-19 155924.png";
import Location from "./Location.png";

export const assets = { Location, Logo, HeroIMG };

export const products = [
  {
    id: 1,
    name: "Angle Share",
    description: "From the best Bozy fragrance and the best Kilian seller",
    company: "By Kilian",
    price: 100,
    image: [AngleShare],
    category: "men",
    Subcategory: "niche",
    size: ["30ML", "50ML", "100ML"],
    date: new Date("2025-11-13"),
    bestSeller: false,
    season: "winter",
  },
  {
    id: 2,
    name: "Angle Share Paradise",
    description:
      "From the best Bozy fragrance and the best Kilian seller star boy",
    company: "By Kilian",
    price: 150,
    image: [AngleShareP],
    category: "unsex",
    Subcategory: "niche",
    size: ["30ML", "50ML", "100ML"],
    date: new Date("2025-11-13"),
    bestSeller: true,
    rating: 3.5,
    reviews: 56,
  },
  {
    id: 3,
    name: "Layton De Marly",
    description: "From the best De Marly fragrance and its daily use",
    price: 200,
    image: [Layton],
    category: "men",
    Subcategory: "niche",
    size: ["30ML", "50ML", "100ML"],
    date: new Date("2025-11-13"),
    bestSeller: true,
  },
  {
    id: 4,
    name: "JPG Paradise",
    description: "From the best Summer and the best JPG seller star boy",
    company: "JPG",
    price: 90,
    image: [Paradise],
    category: "men",
    Subcategory: "designer",
    size: ["30ML", "50ML", "100ML"],
    date: new Date("2025-11-13"),
    bestSeller: false,
    season: "summer",
  },
  {
    id: 5,
    name: "Intio Side Effect",
    description:
      "From the best Tobacco fragrance and the best Initio seller star boy",
    price: 300,
    image: [SideEffect],
    category: "men",
    Subcategory: "niche",
    size: ["30ML", "50ML", "100ML"],
    date: new Date("2025-11-13"),
    bestSeller: true,
  },
  {
    id: 6,
    name: "Spice Bomb Extreme",
    description:
      "From the best winter fragrance and the best Vanilla seller star boy",
    price: 220,
    image: [SpiceBomb],
    category: "men",
    Subcategory: "designer",
    size: ["30ML", "50ML", "100ML"],
    date: new Date("2025-11-13"),
    bestSeller: true,
  },
  {
    id: 7,
    name: "Tom Ford Tobacco Vanille",
    description:
      "From the best Tom Ford fragrances and the best tobacco seller star boy",
    price: 150,
    image: [Tobacoo],
    category: "men",
    Subcategory: "niche",
    size: ["30ML", "50ML", "100ML"],
    date: new Date("2025-11-13"),
    bestSeller: true,
  },
  {
    id: 8,
    name: "JPG Elixir",
    description: "From the best Winter and the best JPG seller star boy",
    company: "JPG",
    price: 230,
    image: [Elixir],
    category: "men",
    Subcategory: "designer",
    size: ["30ML", "50ML", "100ML"],
    date: new Date("2025-11-13"),
    bestSeller: true,
  },
];
