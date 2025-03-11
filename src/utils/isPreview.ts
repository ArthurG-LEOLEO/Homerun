export default function isPreview() {
    console.log(
        "env var: ",
        import.meta.env,
        import.meta.env.STORYBLOK_PREVIEW,
    );

    return import.meta.env.STORYBLOK_PREVIEW === "true";
}
