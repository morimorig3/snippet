(function () {
  const selectors = ['.js-height-line'];
  let timerID = null;
  const heightLine = (selector) => {
    const getNaturalHeight = (node) => {
      node.style.height = 'auto';
      return node.clientHeight;
    };
    const reducer = (accumulator, currentValue) =>
      accumulator < currentValue ? currentValue : accumulator; // 配列から最大値を取得

    const targets = [...document.querySelectorAll(selector)]; // ノードリストを配列にして取得
    if (!targets.length) return;
    const maxHeight = targets
      .map((target) => getNaturalHeight(target))
      .reduce(reducer);

    targets.forEach((target) => (target.style.height = `${maxHeight}px`));
  };

  const setHeight = (selectorArray) =>
    selectorArray.forEach((selector) => heightLine(selector));

  window.addEventListener('load', () => setHeight(selectors));
  window.addEventListener('resize', () => {
    if (!timerID) {
      timerID = setTimeout(function () {
        setHeight(selectors);
        timerID = 0;
      }, 1000 / 30);
    }
  });
})();
