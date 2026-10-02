# Al Thiqah Club for Disabled

A premium, accessible, and fully responsive web application representing Al Thiqah Club for Disabled. This project is built with a focus on inclusivity, modern aesthetics, strong type safety, and performance.

## 🌟 Key Features

### ♿ Accessibility First
*   **WCAG 2.1 Compliance**: High contrast ratios, semantic HTML, and ARIA labels throughout.
*   **Accessibility Widget**: A built-in tool allowing users to:
    *   Adjust font size (up to 150%).
    *   Toggle High Contrast and Grayscale modes.
    *   Enable Dark Mode.
    *   Adjust Line Height and Letter Spacing for better readability.
    *   **Read Mode**: A distraction-free layout that removes images and complex styling.
*   **Keyboard Navigation**: Full focus management and skip links.

### 🌍 Bilingual Support (i18n)
*   Seamless switching between **English (LTR)** and **Arabic (RTL)**.
*   Automatic layout mirroring for RTL languages.
*   Context-aware translations for all dynamic content.

### 📱 Modern UI/UX
*   **Responsive Design**: Optimized for Mobile, Tablet, and Desktop viewports using a mobile-first approach.
*   **Animations**: Smooth, performance-optimized reveal animations using `IntersectionObserver` with reduced motion support.
*   **Interactive Components**:
    *   Touch-friendly Testimonial Slider.
    *   Video Hero background with intelligent loading states.
    *   Animated Stats counters.

### 📝 Robust Forms
*   All forms (Volunteer, Membership, Sponsorship, Contact) utilize strict TypeScript interfaces for data integrity.
*   **Client-Side Validation**: Real-time feedback with error states and accessible messaging (`aria-invalid`, `aria-describedby`).
*   **Security**: Inputs feature `maxLength` and proper `autoComplete` attributes to prevent abuse.

## 🛠️ Technology Stack

*   **Framework**: React 18
*   **Language**: TypeScript (Strict Mode)
*   **Styling**: Tailwind CSS
*   **Routing**: React Router DOM v6
*   **Icons**: Lucide React
*   **Motion**: Framer Motion (for page transitions)

## 🚀 Getting Started

1.  **Install Dependencies**
    ```bash
    npm install
    ```

2.  **Start Development Server**
    ```bash
    npm run dev
    ```

3.  **Build for Production**
    ```bash
    npm run build
    ```

## 📁 Project Structure

*   `components/`: Reusable UI components (Button, Header, AccessibilityWidget, etc.)
*   `contexts/`: Global state management (LanguageContext)
*   `pages/`: Route components (Home, Programs, Events, etc.)
*   `utils/`: Helper functions and asset constants.
*   `types.ts`: Centralized TypeScript interfaces for Domain models (Program, Event) and Forms.

## 🎨 Customization

### Colors
The project uses a custom Tailwind color palette defined in `index.html`:
*   **Primary**: Deep Racing Green (`#1B4D3E`)
*   **Gold**: Classic Gold (`#D4AF37`)
*   **Cream**: Elegant Background (`#F9F7F2`)

### Assets
Place images and videos in `public/assets/`. Update references in `utils/assets.ts`.

## 📄 License
All rights reserved © 2024 Al Thiqah Club for Disabled.