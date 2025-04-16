import { useStoryblokApi } from "@storyblok/astro";
import isProd from "./isProd";
import { locales, defaultLocale } from "../i18n/config";

export function getImageSize(image: { filename: string }) {
    const url = image.filename;

    if (!url || url === "") return { width: 0, height: 0 };

    return {
        width: parseInt(url.split("/")[5].split("x")[0]) as number,
        height: parseInt(url.split("/")[5].split("x")[1]) as number,
    };
}

export function parseUrl(
    url: string | undefined,
    language: string | undefined,
) {
    const slug = url || "";
    const fullSlug = language === defaultLocale ? `en/${slug}` : slug;
    return {
        language,
        fullSlug,
    };
}

export async function generateStaticPaths() {
    const storyblokApi = useStoryblokApi();

    const cases = await storyblokApi.get("cdn/stories", {
        by_slugs: "en/cases/*,fr/cases/*",
        per_page: 100,
        version: !isProd() ? "draft" : "published",
    });

    const shopItems = await storyblokApi.get("cdn/stories", {
        by_slugs: "en/shop/*,fr/shop/*",
        per_page: 100,
        version: !isProd() ? "draft" : "published",
    });

    const links = await storyblokApi.getAll("cdn/links", {
        version: !isProd() ? "draft" : "published",
    });

    return links
        .filter((link) => !link.is_folder)
        .filter((link) => !link.slug.includes("_global"))
        .filter((link) => {
            // Remove case study without dedicated page
            const isCase = cases.data.stories.find(
                (c) => c.full_slug === link.slug,
            );
            return !isCase || isCase.content.has_case_study;
        })
        .filter((link) => {
            // Remove shop item without dedicated page
            const isShopItem = shopItems.data.stories.find(
                (si) => si.full_slug === link.slug,
            );
            return !isShopItem || !isShopItem.content.external_link?.cached_url;
        })
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
