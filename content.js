(() => {
    document.querySelectorAll("header a")[0]?.remove()
    document.querySelector("header .SearchBar-askContainer")?.remove()
    document.querySelector(".SearchBar-searchButton").innerHTML = "百度一下"
    const style = document.createElement('style');
    style.textContent = `
  header.AppHeader > div > div:first-child {
    background-image: url(${chrome.runtime.getURL('images/logo.png')});
  }
`;
    changeFavicon()
    document.head.appendChild(style);

    setInterval(modifyDOM, 1000);
})();

function randomChineseSubstring(str) {
    const chars = str.match(/[\u4e00-\u9fa5]/g);
    if (!chars || chars.length < 2) return "";
    const len = Math.min(Math.floor(Math.random() * 3) + 2, chars.length);
    const start = Math.floor(Math.random() * (chars.length - len + 1));
    return chars.slice(start, start + len).join('')
}

function modifyDOM() {
    document.querySelectorAll(".ContentItem-title a").forEach(element => {
        if (!element.dataset.modified) {
            const randomString = randomChineseSubstring(element.textContent)
            element.innerHTML = element.textContent.replace(randomString, "<span>" + randomString + "</span>")
            element.dataset.modified = "true"
        }
    })
}

function changeFavicon() {
    const oldIcons = document.querySelectorAll('link[rel*="icon"]');
    oldIcons.forEach(el => el.parentNode.removeChild(el));

    const link = document.createElement('link');
    link.rel = 'icon';
    link.type = 'image/x-icon';
    link.href = chrome.runtime.getURL('images/favicon.ico'); // 从插件资源加载
    document.head.appendChild(link);
}
