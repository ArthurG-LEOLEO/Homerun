import { defineConfig } from "astro/config";
import { storyblok } from "@storyblok/astro";
import { loadEnv } from "vite";

import basicSsl from "@vitejs/plugin-basic-ssl";
import tailwindcss from "@tailwindcss/vite";
import netlify from "@astrojs/netlify";
import node from "@astrojs/node";
import icon from "astro-icon";

import i18n from "./src/i18n/config";

const env = loadEnv("", process.cwd(), ["STORYBLOK", "NETLIFY"]);

const isPreview = env.STORYBLOK_PREVIEW === "true";

const adapter =
    env.NETLIFY === "true"
        ? netlify({ imageCDN: false })
        : node({ mode: "standalone" });

export default defineConfig({
    output: isPreview ? "server" : "static",
    i18n,
    site: 'https://homerun.com',
    integrations: [
        storyblok({
            accessToken: env.STORYBLOK_TOKEN,
            livePreview: isPreview,
            bridge: isPreview
                ? {
                      resolveRelations: [
                          "case_study.other_cases",
                          "work.featured_cases",
                          "work.archived_cases",
                          "united.cases",
                          "shop.shop_items",
                          "shop_items.other_items",
                      ],
                  }
                : false,
            components: {
                home: "storyblok/pages/Home",
                page: "storyblok/pages/Page",
                approach: "storyblok/pages/Approach",
                about: "storyblok/pages/About",
                contact: "storyblok/pages/Contact",
                case_study: "storyblok/pages/Case",
                work: "storyblok/pages/Work",
                united: "storyblok/pages/United",
                shop: "storyblok/pages/Shop",
                shop_item: "storyblok/pages/ShopItem",
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
        plugins: [basicSsl(), tailwindcss()],
        server: {
            https: true,
        },
    },
    adapter: isPreview ? adapter : undefined,
});
