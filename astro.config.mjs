import { defineConfig } from "astro/config";
import { storyblok } from "@storyblok/astro";
import { loadEnv } from "vite";

import basicSsl from "@vitejs/plugin-basic-ssl";
import tailwindcss from "@tailwindcss/vite";
import netlify from "@astrojs/netlify";
import icon from "astro-icon";

import i18n from "./src/i18n.config";

const env = loadEnv("", process.cwd(), "STORYBLOK");

// https://astro.build/config
export default defineConfig({
    output: "server",
    redirects: {
        "/en/[...slug]": "/[...slug]",
    },
    i18n,
    integrations: [
        storyblok({
            accessToken: env.STORYBLOK_TOKEN,
            components: {
                home: "storyblok/pages/Home",
                page: "storyblok/pages/Page",
                approach: "storyblok/pages/Approach",
                about: "storyblok/pages/About",
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
    adapter: netlify(),
});
