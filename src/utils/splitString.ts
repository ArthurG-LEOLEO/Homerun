export const splitText = (text: String) => {
    const splittedText = text
        .replace(/\r?\n\r?/g, "\n")
        .replace(/\r/g, "\n")
        .split(/\n/g)
        .map((line) => {
            const splittedLine = line
                .replace(/\n/g, "")
                .split(" ")
                .join(
                    "</span></span> <span class='word'><span class='word-inner'>",
                );
            return `<p><span class='word'><span class='word-inner'>${splittedLine}</span></span></p>`;
        })
        .join("");

    return splittedText;
};

export const splitRoll = (text: String) => {
    const splittedText = text
        .split("")
        .map(
            (l) =>
                `<span class='roll-letter'><span class='roll-inner${l === " " ? " roll-space" : ""}'>${l}</span><span class='roll-under'>${l}</span></span>`,
        )
        .join("");

    return `<span aria-label='${text}' class='roll'>${splittedText}</span>`;
};
