export default function isPreview() {
    return import.meta.env.STORYBLOK_PREVIEW === "true";
}
