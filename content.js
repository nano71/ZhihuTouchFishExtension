(() => {
    document.querySelectorAll("header a")[0]?.remove()
    document.querySelector("header .SearchBar-askContainer")?.remove()

    function modifyDOM() {
        document.querySelectorAll(".Button").forEach(element => {
            const label = element.getAttribute("aria-label")
            if (label && label !== element.textContent)
                element.textContent = label
        })

        document.querySelectorAll(".ContentItem-title a").forEach(element => {
            if (!element.dataset.modified) {
                const randomString = randomChineseSubstring(element.textContent)
                element.innerHTML = element.textContent.replace(randomString, "<span>" + randomString + "</span>")
                element.dataset.modified = "true"
            }
        })
    }
    setInterval(modifyDOM, 1000);
})();

function randomChineseSubstring(str) {
    const chars = str.match(/[\u4e00-\u9fa5]/g);
    if (!chars || chars.length < 2) return "";
    const len = Math.min(Math.floor(Math.random() * 3) + 2, chars.length);
    const start = Math.floor(Math.random() * (chars.length - len + 1));
    return chars.slice(start, start + len).join('')
}

