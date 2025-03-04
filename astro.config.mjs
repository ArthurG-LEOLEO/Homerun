import { defineConfig } from "astro/config";
import { storyblok } from "@storyblok/astro";
import { loadEnv } from "vite";

import basicSsl from "@vitejs/plugin-basic-ssl";
import tailwindcss from "@tailwindcss/vite";
import netlify from "@astrojs/netlify";
import node from "@astrojs/node";
import icon from "astro-icon";

import i18n from "./src/i18n.config";

const env = loadEnv("", process.cwd(), "STORYBLOK");

const isPreview = env.STORYBLOK_PREVIEW === "true";

// https://astro.build/config
export default defineConfig({
    output: isPreview ? "server" : "static",
    redirects: {
        "/en/[...slug]": "/[...slug]",
    },
    i18n,
    integrations: [
        storyblok({
            accessToken: env.STORYBLOK_TOKEN,
            bridge: isPreview,
            components: {
                home: "storyblok/pages/Home",
                page: "storyblok/pages/Page",
                approach: "storyblok/pages/Approach",
                about: "storyblok/pages/About",
                case_study: "storyblok/pages/Case",
                social_feed: "storyblok/sections/SocialFeed",
            },
        }),
        icon(),
    ],
    vite: {
        plugins: [basicSsl(), tailwindcss()],
        server: {
            https: true,
        },
    },
    adapter: isPreview
        ? node({
              mode: "standalone",
          })
        : undefined,
});
