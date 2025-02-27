export default function (text: String) {
    const splittedText = text
        .split("")
        .join(
            "</span></span> <span class='letter'><span class='letter-inner'>",
        );

    return `<span class='letter'><span class='letter-inner'>${splittedText}</span></span>`;
}
