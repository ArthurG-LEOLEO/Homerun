export default function (text: String) {
    const splittedText = text
        .split(" ")
        .join("</span></span> <span class='word'><span class='word-inner'>");

    return `<span class='word'><span class='word-inner'>${splittedText}</span></span>`;
}
