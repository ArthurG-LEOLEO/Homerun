import { useStoryblokApi } from "@storyblok/astro";
import isPreview from "./isPreview";
import { locales, defaultLocale } from "../i18n.config";

export function getImageSize(image: { filename: string }) {
    const url = image.filename;

    if (!url || url === "") return { width: 0, height: 0 };

    return {
        width: url.split("/")[5].split("x")[0],
        height: url.split("/")[5].split("x")[1],
    };
}

export function parseUrl(
    url: string | undefined,
    language: string | undefined,
) {
    const fullSlug =
        language === defaultLocale ? url?.replace(/^(en\/)/, "") : url;

    return {
        language,
        fullSlug,
    };
}

export async function generateStaticPaths() {
    const storyblokApi = useStoryblokApi();

    const links = await storyblokApi.getAll("cdn/links", {
        version: "draft",
    });

    return links
        .filter((link) => !link.is_folder)
        .filter((link) => !link.slug.includes("_global"))
        .map((link: { slug: string }) => {
            const fullSlug = link.slug;
            const language = fullSlug.split("/")[0];

            const slug =
                language === defaultLocale
                    ? link.slug.replace(/^(en\/)/, "")
                    : link.slug;

            return {
                props: {
                    language,
                    fullSlug,
                },
                params: {
                    slug: slug !== "" ? slug : undefined,
                },
            };
        });
}
