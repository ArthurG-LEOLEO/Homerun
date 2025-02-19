export function getImageSize(image) {
    const url = image.filename;

    if (!url || url === "") return { width: 0, height: 0 };

    return {
        width: url.split("/")[5].split("x")[0],
        height: url.split("/")[5].split("x")[1],
    };
}
