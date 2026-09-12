export type TopicCluster = {
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  heroImage: string;
  country?: string;
  destinationSlugs?: string[];
  tags: string[];
  categories: string[];
  pillarContent: string;
};

export const TOPIC_CLUSTERS: TopicCluster[] = [
  {
    slug: "solo-motorcycle-travel-pakistan",
    title: "Solo Motorcycle Travel in Pakistan",
    subtitle: "Ride the roof of the world",
    description:
      "A complete guide to solo motorcycle adventures across Pakistan — from the Karakoram Highway to Deosai Plains, Hunza Valley, Skardu, and Fairy Meadows.",
    heroImage: "https://lh3.googleusercontent.com/d/1C6Tu8yzhNnCDZoNP976Lno4xRhMrc0FJ",
    country: "Pakistan",
    destinationSlugs: ["phander-valley", "karakoram-highway", "hunza-valley", "skardu-autumn"],
    tags: ["motorcycle", "motorcycle travel", "karakoram highway", "hunza", "skardu", "deosai", "fairy meadows", "gilgit", "bike", "road trip"],
    categories: ["Motorcycle Adventure Travel", "Motorcycle Journeys"],
    pillarContent: `Pakistan is one of the most dramatic motorcycle destinations on earth. The country offers an unmatched combination of towering peaks, ancient trade routes, and warm hospitality — all accessible on two wheels.

## Why Ride Pakistan Solo?

Solo motorcycle travel in Pakistan is not just possible — it's transformative. The roads are among the most scenic in the world, the people are incredibly welcoming, and the sense of accomplishment from navigating the Karakoram Highway alone is unmatched.

## The Routes

### Karakoram Highway (KKH)
The KKH is the crown jewel of motorcycle touring. Stretching from Islamabad to the Chinese border at Khunjerab Pass at 4,693 metres, it passes through some of the most spectacular mountain scenery on the planet.

### Hunza Valley
A detour from the KKH into Hunza is non-negotiable. The valley is surrounded by 7,000-metre peaks, dotted with ancient forts, and offers some of the best food in northern Pakistan.

### Skardu & Deosai Plains
Beyond Gilgit, the road to Skardu crosses the Indus River multiple times before climbing into the Deosai Plains — the second-highest plateau in the world at 4,000 metres, home to wild horses, marmots, and golden eagles.

### Fairy Meadows
The last 13 kilometres to Fairy Meadows are on one of the world's most dangerous roads — a narrow, unpaved track with sheer drops. But the reward is a meadow with Nanga Parbat towering directly above you.

## Practical Tips

- **Best time:** May to October (roads closed in winter)
- **Bike:** A 250cc+ dual-sport is ideal. Rental available in Islamabad.
- **Documents:** Valid passport, visa, NOC for certain areas
- **Accommodation:** Camping and basic guesthouses along the route
- **Fuel:** Fill up at every opportunity — stations are sparse in remote areas`,
  },
  {
    slug: "trekking-in-pakistan",
    title: "Trekking in Pakistan",
    subtitle: "Trails through the roof of the world",
    description:
      "From Nanga Parbat base camp to Baltoro Glacier, explore the best trekking routes in Pakistan's Karakoram, Himalaya, and Hindu Kush ranges.",
    heroImage: "https://drive.google.com/file/d/10y1O43B2_EvQV2GHsw1SG4bv9qHBnSUA/view?usp=drive_link",
    country: "Pakistan",
    destinationSlugs: ["k2-base-camp-concordia", "nanga-parbat-base-camp"],
    tags: ["trekking", "hiking", "nanga parbat", "baltoro", "k2", "base camp", "fairy meadows", "passu", "trail"],
    categories: ["Trekking", "Hiking"],
    pillarContent: `Pakistan sits at the junction of three of the world's greatest mountain ranges — the Karakoram, the Himalaya, and the Hindu Kush. This makes it one of the finest trekking destinations on earth, with trails ranging from gentle valley walks to high-altitude expeditions.

## Top Treks

### Nanga Parbat Base Camp (Fairy Meadows)
The trek from Fairy Meadows to Nanga Parbat Base Camp is one of the most rewarding in the world. The meadow sits at 3,300 metres with the 8,126-metre Nanga Parbat — the ninth-highest mountain on earth — rising directly above.

### Baltoro Glacier & Concordia
The Baltoro Glacier trek leads to Concordia, the "Throne of the Mountains," where four 8,000-metre peaks are visible simultaneously: K2, Broad Peak, Gasherbrum I, and Gasherbrum II.

### Naltar Valley
A lesser-known gem, Naltar offers alpine lakes of impossible turquoise, dense forests, and ski slopes — all accessible from Gilgit.

### Rush Lake
One of the highest lakes in the world at 4,694 metres, Rush Lake offers panoramic views of Miar Peak, Spantik, and Ultar Sar.

## Best Time for Trekking

- **June to September** is the prime trekking season
- **Spring (April-May)** offers rhododendron blooms at lower elevations
- **Winter treks** are possible but require serious preparation`,
  },
  {
    slug: "karakoram-travel",
    title: "Karakoram Travel",
    subtitle: "Where the world's highest peaks meet",
    description:
      "Explore the Karakoram range — home to K2, the Baltoro Glacier, and some of the most dramatic mountain scenery in the world.",
    heroImage: "https://drive.google.com/file/d/1xDSotkmM2_wVp_DY-uzHD3nsY2zjVAHs/view?usp=drive_link",
    country: "Pakistan",
    destinationSlugs: ["k2-base-camp-concordia", "karakoram-highway", "hunza-valley"],
    tags: ["karakoram", "k2", "baltoro", "hunza", "gilgit", "passu", "hopper", "nagar"],
    categories: ["Mountains", "Adventure Travel"],
    pillarContent: `The Karakoram is the world's most concentrated range of high mountains. It contains over 60 peaks above 7,000 metres and four above 8,000 metres, including K2 — the second-highest mountain on earth.

## What Makes the Karakoram Special

Unlike the Himalaya, which tend to be broad and green at their base, the Karakoram is raw, rocky, and vertical. The mountains rise abruptly from river valleys, creating some of the most dramatic relief on the planet.

## Key Destinations

### Hunza Valley
The gateway to the Karakoram. Hunza offers ancient forts (Altit and Baltit), apricot orchards, and views of Rakaposhi, Ultar Sar, and Lady Finger Peak.

### Passu
A small village on the KKH with the iconic Passu Cathedral — a jagged ridge of peaks that looks like a Gothic cathedral carved from stone.

### Nagar
The quieter neighbour of Hunza, Nagar offers the Hopar Glacier and the spectacular Rush Lake trek.

### Gilgit
The regional capital and transport hub. Gilgit is where the KKH meets the Indus and Gilgit rivers.

## When to Go

The Karakoram is accessible from May to October. July and August offer the warmest weather but also the most crowds. June and September are ideal for fewer people and clear skies.`,
  },
  {
    slug: "gilgit-baltistan-travel",
    title: "Gilgit Baltistan Travel",
    subtitle: "The jewel of northern Pakistan",
    description:
      "Everything you need to know about travelling in Gilgit Baltistan — from Hunza and Skardu to the Karakoram Highway and remote valleys.",
    heroImage: "https://drive.google.com/file/d/1noESGu2mfBf64TRyjspmLQezMXugVDIL/view?usp=drive_link",
    country: "Pakistan",
    destinationSlugs: ["hunza-valley", "phander-valley", "skardu-autumn"],
    tags: ["gilgit", "baltistan", "hunza", "skardu", "nagar", "naltar", "ghizer", "shigar", "khaplu"],
    categories: ["Pakistan Tourism", "Adventure Travel"],
    pillarContent: `Gilgit Baltistan is a region of extraordinary beauty and cultural richness. Located in the northernmost part of Pakistan, it is home to some of the world's highest mountains, oldest glaciers, and most hospitable communities.

## Regions to Explore

### Hunza Valley
Famous for its high literacy rate, ancient forts, and stunning mountain scenery. Must-see: Baltit Fort, Attabad Lake, Passu Cones.

### Skardu Valley
The gateway to K2 and the Baltoro Glacier. Skardu is a town of lakes, deserts (yes, sand dunes), and ancient Buddhist rock carvings.

### Ghizer Valley
The least-visited valley in Gilgit Baltistan, Ghizer offers pristine trout fishing, quiet villages, and the Phander Valley — often called "Little Kashmir."

### Shigar & Khaplu
Two historic towns in Baltistan, each with a restored fort-palace now run as a heritage hotel by the Serena chain.

## Getting There

- **By air:** PIA flies from Islamabad to Gilgit and Skardu (weather-dependent)
- **By road:** The KKH connects Gilgit to Islamabad in 15-18 hours
- **By bus:** NATCO and private operators run daily services

## Permits

Most of Gilgit Baltistan is open to foreign tourists without a special permit. However, areas near the Line of Control (like Minimarg and some parts of Baltistan) may require a NOC.`,
  },
  {
    slug: "solo-travel-pakistan",
    title: "Solo Travel Pakistan",
    subtitle: "Your guide to exploring Pakistan alone",
    description:
      "Is Pakistan safe for solo travellers? Everything you need to know about solo travel in Pakistan — routes, tips, costs, and real experiences.",
    heroImage: "https://drive.google.com/file/d/1C1qHkb9MjXmumG5ebaDj2ZKqiCcsrqgQ/view?usp=sharing",
    country: "Pakistan",
    destinationSlugs: ["nanga-parbat-base-camp", "hunza-valley", "phander-valley", "k2-base-camp-concordia"],
    tags: ["solo travel", "pakistan", "budget travel", "travel tips", "safety", "backpacking"],
    categories: ["Solo Travel", "Pakistan Tourism"],
    pillarContent: `Pakistan has emerged as one of the most exciting solo travel destinations in the world. With its dramatic landscapes, rich culture, and incredibly welcoming people, it rewards those who travel independently.

## Why Solo Travel in Pakistan?

Travelling solo in Pakistan gives you complete freedom to explore at your own pace. The country's hospitality culture means you'll never truly be alone — locals will invite you for tea, share meals, and go out of their way to help.

## Popular Solo Routes

### Islamabad to Gilgit (KKH)
The classic overland journey. You can take a bus, shared jeep, or drive yourself. The 15-18 hour journey passes through some of the most spectacular scenery in Asia.

### Hunza Valley
Easy to navigate solo, with plenty of guesthouses, restaurants, and fellow travellers. The valley is compact enough to explore on foot or by local transport.

### Skardu & Baltistan
More remote and less touristed than Hunza, Baltistan rewards the independent traveller with raw beauty and authentic cultural encounters.

## Safety Tips

- Pakistan is generally very safe for solo travellers, especially in the north
- Dress modestly, particularly in rural areas
- Carry cash — ATMs are sparse outside major towns
- Download offline maps — mobile signal is patchy in remote areas
- Learn a few phrases of Urdu or the local language

## Budget

Pakistan is one of the most affordable travel destinations in the world. Budget travellers can get by on $20-30 per day, including accommodation, food, and transport.`,
  },
  {
    slug: "pakistan-travel-guide",
    title: "Pakistan Travel Guide",
    subtitle: "Everything you need before you go",
    description:
      "The complete Pakistan travel guide — visa requirements, best time to visit, top destinations, budget tips, and safety advice for first-time visitors.",
    heroImage: "https://drive.google.com/file/d/190jutXD6FuWe2wOw2vt0sjTxQroOxWoM/view?usp=sharing",
    country: "Pakistan",
    destinationSlugs: ["karakoram-highway", "hunza-valley", "phander-valley", "skardu-autumn", "k2-base-camp-concordia", "nanga-parbat-base-camp"],
    tags: ["pakistan", "travel guide", "visa", "budget", "safety", "destinations", "tips", "first time"],
    categories: ["Pakistan Tourism", "Travel Tips"],
    pillarContent: `Pakistan is a country of staggering beauty and complexity. From the desert dunes of Sindh to the glaciers of Gilgit Baltistan, it offers experiences that rival any destination on earth.

## Before You Go

### Visa
Most nationalities can apply for an e-Visa online. The process takes 7-10 business days. Some nationalities may need a NOC for certain areas.

### Best Time to Visit
- **April to October** is the ideal window
- **Summer (June-August)** is peak season in the north
- **Spring and autumn** offer the best weather in Lahore, Islamabad, and southern Pakistan
- **Winter** is best for Karachi and the southern coast

### Currency
The Pakistani Rupee (PKR). ATMs are widely available in cities. Carry cash for rural areas.

## Top Destinations

### Islamabad
The green, well-planned capital city. Visit Faisal Mosque, Daman-e-Koh viewpoint, and the Lok Virsa Museum.

### Lahore
The cultural capital. The Walled City, Badshahi Mosque, Lahore Fort, and the food scene are unmatched.

### Gilgit Baltistan
The mountain paradise — Hunza, Skardu, Fairy Meadows, and the Karakoram Highway.

### Karachi
The coastal metropolis. Seafood, Clifton Beach, Mohatta Palace, and vibrant street life.

## Getting Around

- **Domestic flights:** PIA and Airblue connect major cities
- **Buses:** Comfortable intercity buses (Daewoo, Faisal Movers)
- **Ride-hailing:** Careem and InDrive operate in major cities
- **Trains:** Pakistan Railways connects major cities (scenic but slow)

## Cultural Tips

- Dress modestly, especially outside major cities
- Remove shoes when entering mosques and homes
- Accept tea when offered — it's a sign of hospitality
- Bargaining is expected in markets
- Photography is sensitive near military installations`,
  },
  {
    slug: "solo-travel-seychelles",
    title: "Solo Travel Seychelles",
    subtitle: "Island hopping across the Indian Ocean",
    description:
      "A complete guide to solo travel and island hopping across the Seychelles — from Mahé to Praslin, La Digue, granite coastlines, and secluded beaches.",
    heroImage: "https://drive.google.com/file/d/12FCge3xWekhOWwFduZYU7LQb9tzXYy4d/view?usp=sharing",
    country: "Seychelles",
    destinationSlugs: ["Mahe=Praslin-La digue=Seychelles"],
    tags: ["seychelles", "la digue", "praslin", "mahe", "island hopping", "island", "africa"],
    categories: ["Travel Stories", "Adventure", "Solo Travel"],
    pillarContent: `The Seychelles archipelago is widely seen as a luxury honeymoon destination, but exploring its islands solo reveals a completely different adventure: taking inter-island ferries across turquoise waters, cycling coastal paths along massive granite boulders, and hiking through primordial palm forests.

## Why Solo Travel in the Seychelles?

Travelling independently through the Seychelles allows you to move at your own rhythm. You can catch the early morning ferry from Mahé to Praslin, spend the midday heat exploring the ancient coco de mer palms of Vallée de Mai, and reach La Digue by late afternoon with a rented bicycle as your only vehicle.

## The Island-Hopping Route

### Mahé
The main island and logistical gateway. Start in Victoria, the compact capital, before heading out along the coastal roads. Mahé offers rugged hiking trails through Morne Seychellois National Park and secluded bays tucked behind granite promontories.

### Praslin
A one-hour Cat Cocos ferry crossing from Mahé brings you to Praslin. Here lies the UNESCO World Heritage Vallée de Mai, home to endemic black parrots and the iconic coco de mer. Praslin's Anse Lazio offers crystal-clear waters framed by smooth granite rocks.

### La Digue
A short 15-minute ferry from Praslin delivers you to La Digue, where life slows down to bicycle speed. Cars are rare, and the primary way to explore Anse Source d'Argent and Grand Anse is on two wheels along shaded sandy trails.

## Practical Tips

- **Best time:** April to May and October to November offer calm seas and pleasant temperatures
- **Transport:** Inter-island ferries (Cat Cocos & Cat Roses) are reliable and comfortable. On La Digue, rent a bicycle at the jetty
- **Currency:** Seychelles Rupee (SCR), though card payments are widely accepted
- **Pack:** Reef-safe sunscreen, comfortable walking sandals, and offline maps`,
  },
];

export function getTopicBySlug(slug: string): TopicCluster | undefined {
  return TOPIC_CLUSTERS.find((t) => t.slug === slug);
}

export function getAllTopicSlugs(): string[] {
  return TOPIC_CLUSTERS.map((t) => t.slug);
}
