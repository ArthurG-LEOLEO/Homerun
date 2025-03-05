export const splitText = (text: String) => {
    const splittedText = text
        .split(" ")
        .join("</span></span> <span class='word'><span class='word-inner'>");

    return `<span class='word'><span class='word-inner'>${splittedText}</span></span>`;
};

export const splitRoll = (text: String) => {
    const splittedText = text
        .split("")
        .map(
            (l) =>
                `<span class='roll-letter'><span class='roll-inner'>${l}</span><span class='roll-under'>${l}</span></span>`,
        )
        .join("");

    return `<span class='roll'>${splittedText}</span>`;
};
