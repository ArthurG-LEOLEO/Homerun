export default function isPreview() {
    console.log(
        import.meta.env.STORYBLOK_PREVIEW,
        "true",
        import.meta.env.STORYBLOK_PREVIEW === "true",
    );

    return import.meta.env.STORYBLOK_PREVIEW === "true";
}
