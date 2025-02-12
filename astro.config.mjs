import { defineConfig } from "astro/config";
import { storyblok } from "@storyblok/astro";
import basicSsl from "@vitejs/plugin-basic-ssl";
import { loadEnv } from "vite";

import i18n from "./src/i18n.config";

const env = loadEnv("", process.cwd(), "STORYBLOK");

// https://astro.build/config
export default defineConfig({
    i18n,
    integrations: [
        storyblok({
            accessToken: env.STORYBLOK_TOKEN,
            components: {
                home: "storyblok/pages/Home",
            },
        }),
    ],
    vite: {
        plugins: [basicSsl()],
        server: {
            https: true,
        },
    },
});
