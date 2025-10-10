(() => {
    console.log("[Zhihu DOM Modifier] content script loaded");
    document.querySelectorAll("header a")[0]?.remove()
    document.querySelector("header .SearchBar-askContainer")?.remove()

    function modifyDOM() {
        try {
            document.querySelectorAll(".Button").forEach(element => {
                if (element.getAttribute("aria-label"))
                    element.textContent = element.getAttribute("aria-label")
            })

            document.querySelectorAll(".ContentItem-title a").forEach(element => {

                if (!element.dataset.modified) {
                    const randomString = randomChineseSubstring(element.textContent)
                    element.innerHTML = element.textContent.replace(randomString, "<span>" + randomString + "</span>")
                    element.dataset.modified = "true"
                }
            })
            document.querySelector(".is-active").className = ""

        } catch (e) {
            console.warn("[Zhihu DOM Modifier] modifyDOM 错误：", e);
        }
    }

    // 每 1 秒执行一次（根据需要可调整）
    setInterval(modifyDOM, 1000);
})();

function randomChineseSubstring(str) {
    // 过滤出纯汉字（可选）
    const chars = str.match(/[\u4e00-\u9fa5]/g);
    if (!chars || chars.length < 2) return "";

    // 随机决定长度（2~4）
    const len = Math.min(Math.floor(Math.random() * 3) + 2, chars.length);

    // 随机起始位置（保证不会超出范围）
    const start = Math.floor(Math.random() * (chars.length - len + 1));

    // 拼接结果
    return chars.slice(start, start + len).join('')
}

