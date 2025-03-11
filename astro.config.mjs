import { defineConfig } from "astro/config";
import { storyblok } from "@storyblok/astro";
import { loadEnv } from "vite";

import basicSsl from "@vitejs/plugin-basic-ssl";
import tailwindcss from "@tailwindcss/vite";
import netlify from "@astrojs/netlify";
import node from "@astrojs/node";
import icon from "astro-icon";

import i18n from "./src/i18n/config";

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
                contact: "storyblok/pages/Contact",
                case_study: "storyblok/pages/Case",
                work: "storyblok/pages/Work",
                social_feed: "storyblok/sections/SocialFeed",
                case_headline: "storyblok/sections/case/Headline",
                case_images: "storyblok/sections/case/Images",
                case_text: "storyblok/sections/case/Text",
                case_videos: "storyblok/sections/case/Videos",
            },
        }),
        icon(),
    ],
    vite: {
        plugins: isPreview ? [tailwindcss()] : [basicSsl(), tailwindcss()],
        server: {
            https: true,
        },
    },
    adapter: isPreview ? netlify() : undefined,
});
