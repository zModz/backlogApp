export const mockGames = [
  {
    id: 1,
    name: "Halo: Combat Evolved",
    slug: "halo-combat-evolved",
    coverUrl:
      "https://images.igdb.com/igdb/image/upload/t_cover_big/co2r2r.jpg",
    platforms: [
      { name: "Xbox", slug: "xbox" },
      { name: "PC", slug: "pc" },
    ],
    releaseDates: [
      { date: "2001-11-15", platform: { name: "Xbox" }, status: "Released" },
      { date: "2003-09-30", platform: { name: "PC" }, status: "Released" },
    ],
    involvedCompanies: [
      {
        company: { name: "Bungie" },
        publisher: true,
        developer: true,
        supporting: false,
      },
    ],
    genres: ["Shooter", "Sci-Fi"],
    category: "Main Game",
    screenshots: [
      "https://images.igdb.com/igdb/image/upload/t_screenshot_big/sc1abc.jpg",
    ],
    gameStatus: "Released",
    gameType: "Main Game",
    summary:
      "The first installment in the Halo series. Fight the Covenant and uncover the secrets of Halo.",
    totalRating: 94,
    gameModes: ["Single player", "Multiplayer"],
    firstReleaseDate: "2001-11-15",
    franchises: ["Halo"],
    ageRatings: [
      {
        organization: "ESRB",
        rating: "Mature",
        ratingCoverUrl:
          "https://images.igdb.com/igdb/image/upload/t_cover_big/ar1abc.jpg",
      },
    ],
    parentGame: null,
  },
  {
    id: 2,
    name: "Super Mario Galaxy",
    slug: "super-mario-galaxy",
    coverUrl:
      "https://images.igdb.com/igdb/image/upload/t_cover_big/co21ro.webp",
    platforms: [{ name: "Wii", slug: "wii" }],
    releaseDates: [
      { date: "2007-11-12", platform: { name: "Wii" }, status: "Released" },
    ],
    involvedCompanies: [
      {
        company: { name: "Nintendo" },
        publisher: true,
        developer: true,
        supporting: false,
      },
    ],
    genres: ["Platformer", "Adventure"],
    category: "Main Game",
    screenshots: [
      "https://images.igdb.com/igdb/image/upload/t_screenshot_big/sc2xyz.jpg",
    ],
    gameStatus: "Released",
    gameType: "Main Game",
    summary: "Mario explores galaxies to rescue Princess Peach from Bowser.",
    totalRating: 97,
    gameModes: ["Single player", "Co-op"],
    firstReleaseDate: "2007-11-12",
    franchises: ["Mario"],
    ageRatings: [
      {
        organization: "ESRB",
        rating: "Everyone 10+",
        ratingCoverUrl:
          "https://images.igdb.com/igdb/image/upload/t_cover_big/ar2xyz.jpg",
      },
    ],
    parentGame: null,
  },
  {
    id: 3,
    name: "The Legend of Zelda: Breath of the Wild",
    slug: "zelda-breath-of-the-wild",
    coverUrl:
      "https://images.igdb.com/igdb/image/upload/t_cover_big/co3p2d.webp",
    platforms: [
      { name: "Switch", slug: "switch" },
      { name: "Wii U", slug: "wii-u" },
    ],
    releaseDates: [
      { date: "2017-03-03", platform: { name: "Switch" }, status: "Released" },
      { date: "2017-03-03", platform: { name: "Wii U" }, status: "Released" },
    ],
    involvedCompanies: [
      {
        company: { name: "Nintendo" },
        publisher: true,
        developer: true,
        supporting: false,
      },
    ],
    genres: ["Action", "Adventure"],
    category: "Main Game",
    screenshots: [
      "https://images.igdb.com/igdb/image/upload/t_screenshot_big/sc3def.jpg",
    ],
    gameStatus: "Released",
    gameType: "Main Game",
    summary: "Link wakes up in a vast open world to defeat Calamity Ganon.",
    totalRating: 98,
    gameModes: ["Single player"],
    firstReleaseDate: "2017-03-03",
    franchises: ["Zelda"],
    ageRatings: [
      {
        organization: "ESRB",
        rating: "Teen",
        ratingCoverUrl:
          "https://images.igdb.com/igdb/image/upload/t_cover_big/ar3def.jpg",
      },
    ],
    parentGame: null,
  },
  {
    id: 4,
    name: "God of War",
    slug: "god-of-war-2018",
    coverUrl:
      "https://images.igdb.com/igdb/image/upload/t_cover_big/co1tmu.webp",
    platforms: [{ name: "PS4", slug: "ps4" }],
    releaseDates: [
      { date: "2018-04-20", platform: { name: "PS4" }, status: "Released" },
    ],
    involvedCompanies: [
      {
        company: { name: "Santa Monica Studio" },
        publisher: true,
        developer: true,
        supporting: false,
      },
    ],
    genres: ["Action", "Adventure"],
    category: "Main Game",
    screenshots: [
      "https://images.igdb.com/igdb/image/upload/t_screenshot_big/sc4ghi.jpg",
    ],
    gameStatus: "Released",
    gameType: "Main Game",
    summary:
      "Kratos and Atreus journey across Norse realms in this epic adventure.",
    totalRating: 94,
    gameModes: ["Single player"],
    firstReleaseDate: "2018-04-20",
    franchises: ["God of War"],
    ageRatings: [
      {
        organization: "ESRB",
        rating: "Mature",
        ratingCoverUrl:
          "https://images.igdb.com/igdb/image/upload/t_cover_big/ar4ghi.jpg",
      },
    ],
    parentGame: null,
  },
  {
    id: 5,
    name: "Halo 3",
    slug: "halo-3",
    coverUrl:
      "https://images.igdb.com/igdb/image/upload/t_cover_big/co1xhc.webp",
    platforms: [{ name: "Xbox 360", slug: "xbox-360" }],
    releaseDates: [
      {
        date: "2007-09-25",
        platform: { name: "Xbox 360" },
        status: "Released",
      },
    ],
    involvedCompanies: [
      {
        company: { name: "Bungie" },
        publisher: true,
        developer: true,
        supporting: false,
      },
    ],
    genres: ["Shooter", "Sci-Fi"],
    category: "Main Game",
    screenshots: [
      "https://images.igdb.com/igdb/image/upload/t_screenshot_big/sc5jkl.jpg",
    ],
    gameStatus: "Released",
    gameType: "Main Game",
    summary:
      "Master Chief returns to finish the fight against the Covenant and the Flood.",
    totalRating: 95,
    gameModes: ["Single player", "Multiplayer"],
    firstReleaseDate: "2007-09-25",
    franchises: ["Halo"],
    ageRatings: [
      {
        organization: "ESRB",
        rating: "Mature",
        ratingCoverUrl:
          "https://images.igdb.com/igdb/image/upload/t_cover_big/ar5jkl.jpg",
      },
    ],
    parentGame: null,
  },
  {
    id: 6,
    name: "Minecraft",
    slug: "minecraft",
    coverUrl:
      "https://images.igdb.com/igdb/image/upload/t_cover_big/coa77e.webp",
    platforms: [
      { name: "PC", slug: "pc" },
      { name: "Xbox 360", slug: "xbox-360" },
      { name: "PS4", slug: "ps4" },
      { name: "Switch", slug: "switch" },
    ],
    releaseDates: [
      { date: "2011-11-18", platform: { name: "PC" }, status: "Released" },
    ],
    involvedCompanies: [
      {
        company: { name: "Mojang" },
        publisher: true,
        developer: true,
        supporting: false,
      },
    ],
    genres: ["Sandbox", "Adventure"],
    category: "Main Game",
    screenshots: [
      "https://images.igdb.com/igdb/image/upload/t_screenshot_big/sc6mno.jpg",
    ],
    gameStatus: "Released",
    gameType: "Main Game",
    summary:
      "Create and explore your own world block by block in this sandbox game.",
    totalRating: 91,
    gameModes: ["Single player", "Multiplayer"],
    firstReleaseDate: "2011-11-18",
    franchises: ["Minecraft"],
    ageRatings: [
      {
        organization: "ESRB",
        rating: "Everyone 10+",
        ratingCoverUrl:
          "https://images.igdb.com/igdb/image/upload/t_cover_big/ar6mno.jpg",
      },
    ],
    parentGame: null,
  },
  {
    id: 7,
    name: "Final Fantasy VII",
    slug: "final-fantasy-vii",
    coverUrl:
      "https://images.igdb.com/igdb/image/upload/t_cover_big/co2kx2.webp",
    platforms: [
      { name: "PS1", slug: "ps1" },
      { name: "PC", slug: "pc" },
      { name: "PS4", slug: "ps4" },
    ],
    releaseDates: [
      { date: "1997-01-31", platform: { name: "PS1" }, status: "Released" },
    ],
    involvedCompanies: [
      {
        company: { name: "Square Enix" },
        publisher: true,
        developer: true,
        supporting: false,
      },
    ],
    genres: ["RPG", "Fantasy"],
    category: "Main Game",
    screenshots: [
      "https://images.igdb.com/igdb/image/upload/t_screenshot_big/sc7pqr.jpg",
    ],
    gameStatus: "Released",
    gameType: "Main Game",
    summary:
      "Cloud Strife and his friends fight to save the planet from Shinra and Sephiroth.",
    totalRating: 92,
    gameModes: ["Single player"],
    firstReleaseDate: "1997-01-31",
    franchises: ["Final Fantasy"],
    ageRatings: [
      {
        organization: "ESRB",
        rating: "Teen",
        ratingCoverUrl:
          "https://images.igdb.com/igdb/image/upload/t_cover_big/ar7pqr.jpg",
      },
    ],
    parentGame: null,
  },
  {
    id: 8,
    name: "Super Smash Bros. Ultimate",
    slug: "super-smash-bros-ultimate",
    coverUrl:
      "https://images.igdb.com/igdb/image/upload/t_cover_big/co2255.webp",
    platforms: [{ name: "Switch", slug: "switch" }],
    releaseDates: [
      { date: "2018-12-07", platform: { name: "Switch" }, status: "Released" },
    ],
    involvedCompanies: [
      {
        company: { name: "Nintendo" },
        publisher: true,
        developer: true,
        supporting: false,
      },
    ],
    genres: ["Fighting"],
    category: "Main Game",
    screenshots: [
      "https://images.igdb.com/igdb/image/upload/t_screenshot_big/sc8stu.jpg",
    ],
    gameStatus: "Released",
    gameType: "Main Game",
    summary:
      "Battle with every Nintendo character ever in this ultimate fighting game.",
    totalRating: 93,
    gameModes: ["Single player", "Multiplayer"],
    firstReleaseDate: "2018-12-07",
    franchises: ["Smash Bros."],
    ageRatings: [
      {
        organization: "ESRB",
        rating: "Everyone 10+",
        ratingCoverUrl:
          "https://images.igdb.com/igdb/image/upload/t_cover_big/ar8stu.jpg",
      },
    ],
    parentGame: null,
  },
  {
    id: 9,
    name: "The Witcher 3: Wild Hunt",
    slug: "witcher-3-wild-hunt",
    coverUrl:
      "https://images.igdb.com/igdb/image/upload/t_cover_big/co1wyy.webp",
    platforms: [
      { name: "PC", slug: "pc" },
      { name: "PS4", slug: "ps4" },
      { name: "Xbox One", slug: "xbox-one" },
      { name: "Switch", slug: "switch" },
    ],
    releaseDates: [
      { date: "2015-05-19", platform: { name: "PC" }, status: "Released" },
    ],
    involvedCompanies: [
      {
        company: { name: "CD Projekt" },
        publisher: true,
        developer: true,
        supporting: false,
      },
    ],
    genres: ["RPG", "Adventure"],
    category: "Main Game",
    screenshots: [
      "https://images.igdb.com/igdb/image/upload/t_screenshot_big/sc9vwx.jpg",
    ],
    gameStatus: "Released",
    gameType: "Main Game",
    summary:
      "Geralt of Rivia searches for his missing adopted daughter while facing the Wild Hunt.",
    totalRating: 97,
    gameModes: ["Single player", "Multiplayer"],
    firstReleaseDate: "2015-05-19",
    franchises: ["Witcher"],
    ageRatings: [
      {
        organization: "ESRB",
        rating: "Mature",
        ratingCoverUrl:
          "https://images.igdb.com/igdb/image/upload/t_cover_big/ar9vwx.jpg",
      },
    ],
    parentGame: null,
  },
  {
    id: 10,
    name: "Mario Kart 8 Deluxe",
    slug: "mario-kart-8-deluxe",
    coverUrl:
      "https://images.igdb.com/igdb/image/upload/t_cover_big/co213p.webp",
    platforms: [{ name: "Switch", slug: "switch" }],
    releaseDates: [
      { date: "2017-04-28", platform: { name: "Switch" }, status: "Released" },
    ],
    involvedCompanies: [
      {
        company: { name: "Nintendo" },
        publisher: true,
        developer: true,
        supporting: false,
      },
    ],
    genres: ["Racing", "Party"],
    category: "Main Game",
    screenshots: [
      "https://images.igdb.com/igdb/image/upload/t_screenshot_big/sc10yz.jpg",
    ],
    gameStatus: "Released",
    gameType: "Main Game",
    summary: "Race and battle in the definitive edition of Mario Kart 8.",
    totalRating: 92,
    gameModes: ["Single player", "Multiplayer"],
    firstReleaseDate: "2017-04-28",
    franchises: ["Mario Kart"],
    ageRatings: [
      {
        organization: "ESRB",
        rating: "Everyone",
        ratingCoverUrl:
          "https://images.igdb.com/igdb/image/upload/t_cover_big/ar10yz.jpg",
      },
    ],
    parentGame: null,
  },
];

export const mockUserBacklog = [
  {
    userId: 1,
    gameId: 1, // Halo: Combat Evolved
    status: "Completed",
    personalRating: 9,
    notes: "Legendary difficulty completed.",
    addedAt: "2025-01-15",
    completedAt: "2025-02-01",
  },
  {
    userId: 1,
    gameId: 3, // Zelda: Breath of the Wild
    status: "Backlog",
    personalRating: null,
    notes: "",
    addedAt: "2025-02-10",
    completedAt: null,
  },
  {
    userId: 1,
    gameId: 6, // Minecraft
    status: "Completed",
    personalRating: 10,
    notes: "Built huge castle.",
    addedAt: "2025-03-01",
    completedAt: "2025-03-25",
  },
  {
    userId: 1,
    gameId: 9, // Witcher 3
    status: "Playing",
    personalRating: 9,
    notes: "Side quests amazing.",
    addedAt: "2025-04-20",
    completedAt: null,
  },
  {
    userId: 1,
    gameId: 2, // Super Mario Galaxy
    status: "Dropped",
    personalRating: 6,
    notes: "Got bored early.",
    addedAt: "2025-05-10",
    completedAt: null,
  },
  {
    userId: 1,
    gameId: 4, // God of War
    status: "Completed",
    personalRating: 10,
    notes: "Amazing story.",
    addedAt: "2025-03-15",
    completedAt: "2025-04-05",
  },
  {
    userId: 1,
    gameId: 5, // Halo 3
    status: "Completed",
    personalRating: 9,
    notes: "Multiplayer fun.",
    addedAt: "2025-02-05",
    completedAt: "2025-02-28",
  },
  {
    userId: 1,
    gameId: 7, // Final Fantasy VII
    status: "Completed",
    personalRating: 9,
    notes: "Classic RPG.",
    addedAt: "2025-01-25",
    completedAt: "2025-03-12",
  },
  {
    userId: 1,
    gameId: 8, // Super Smash Bros. Ultimate
    status: "Backlog",
    personalRating: null,
    notes: "",
    addedAt: "2025-04-01",
    completedAt: null,
  },
  {
    userId: 1,
    gameId: 10, // Mario Kart 8 Deluxe
    status: "Completed",
    personalRating: 8,
    notes: "Fun with friends.",
    addedAt: "2025-05-01",
    completedAt: "2025-05-12",
  },
];

type Platform = {
  name: string;
  slug: string;
};

type ReleaseDate = {
  date: string; // ISO date string
  platform: { name: string };
  status: string;
};

type InvolvedCompany = {
  company: { name: string };
  publisher: boolean;
  developer: boolean;
  supporting: boolean;
};

type AgeRating = {
  organization: string;
  rating: string;
  ratingCoverUrl: string;
};

export type Game = {
  id: number;
  name: string;
  slug: string;
  coverUrl: string | null;
  platforms: Platform[];
  releaseDates: ReleaseDate[];
  involvedCompanies: InvolvedCompany[];
  genres: string[];
  category: string;
  screenshots: string[];
  gameStatus: string;
  gameType: string;
  summary: string | null;
  totalRating: number | null;
  gameModes: string[];
  firstReleaseDate: string | null;
  franchises: string[];
  ageRatings: AgeRating[];
  parentGame: string | null;
};

type BacklogStatus = "Backlog" | "Playing" | "Completed" | "Dropped";

export type UserBacklogEntry = {
  gameId: number; // reference to Game.id
  status: BacklogStatus;
  personalRating?: number | null;
  notes?: string | null;
  addedAt: string; // ISO date string
  completedAt?: string | null; // only if status = Completed
};
