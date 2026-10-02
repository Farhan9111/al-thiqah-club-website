// Al Thiqah Club Brand Assets
// All images are from Brand-asset/ folder, copied to public/assets/

export const ASSETS = {
  // Logo variations
  LOGO: '/assets/Logo.png',
  LOGO_ICON: '/assets/Logo without text.png',
  LOGO_TEXT: '/assets/Only text.png',

  // Hero Section - Uses video background with fallback image
  HERO: {
    VIDEO: 'https://videos.pexels.com/video-files/3196238/3196238-uhd_2560_1440_25fps.mp4',
    IMAGE: '/assets/images/facilities/gym.jpeg', // Fallback image
    USE_VIDEO: true,
    OPTIONS: {
      AUTO_PLAY: true,
      LOOP: true,
      MUTED: true,
      PLAYS_INLINE: true,
    }
  },

  // Athletes gallery (20 images available)
  ATHLETES: {
    GALLERY: Array.from({ length: 20 }, (_, i) => `/assets/images/athletes/${i + 1}.png`),
    FEATURED: '/assets/images/athletes/girl-running.jpeg',
  },

  // Facilities
  FACILITIES: {
    GYM: '/assets/images/facilities/gym.jpeg',
    BASKETBALL_1: '/assets/images/facilities/wheelchair-basketball.jpeg',
    BASKETBALL_2: '/assets/images/facilities/wheelchair-basketball-1.jpeg',
  },

  // History
  HISTORY: {
    VICTORY_1: '/assets/images/history/victory-historic.jpeg',
    VICTORY_2: '/assets/images/history/victory-historic-1.jpeg',
  },

  // Default fallbacks
  PLACEHOLDERS: {
    PROGRAM_DEFAULT: '/assets/images/facilities/gym.jpeg',
    EVENT_DEFAULT: '/assets/images/athletes/girl-running.jpeg',
  }
};

// Helper function to get random athlete image
export const getRandomAthleteImage = () => {
  const index = Math.floor(Math.random() * 20) + 1;
  return `/assets/images/athletes/${index}.png`;
};

// Helper function to get athlete image by index (1-20)
export const getAthleteImage = (index: number) => {
  const safeIndex = ((index - 1) % 20) + 1;
  return `/assets/images/athletes/${safeIndex}.png`;
};