import type { CapacitorConfig } from "@capacitor/cli";

const config: CapacitorConfig = {
  appId: "com.shofe.driver",
  appName: "Shofe Driver",
  webDir: "dist",
  server: {
    androidScheme: "https",
  },
  plugins: {
    Geolocation: {
      // Reserved for Phase 2 — driver location reporting.
    },
  },
};

export default config;
