(function (global) {
  var selectors = ['.js-height-line'];
  var timerID = null;
  var heightLine = function (selector) {
    var getNaturalHeight = function (node) {
      node.style.height = 'auto';
      return node.clientHeight;
    };
    var reducer = function (acc, cur) {
      return acc < cur ? cur : acc;
    };

    var targets = document.querySelectorAll(selector);
    if (!targets) return;
    var maxHeight = Array.prototype.map
      .call(targets, function (target) {
        return getNaturalHeight(target);
      })
      .reduce(reducer);
    Array.prototype.forEach.call(targets, function (target) {
      target.style.height = maxHeight + 'px';
    });
  };

  var setHeight = function (selectorArray) {
    selectorArray.forEach(function (selector) {
      heightLine(selector);
    });
  };

  window.addEventListener('load', function () {
    setHeight(selectors);
  });
  window.addEventListener('resize', function () {
    if (!timerID) {
      timerID = setTimeout(function () {
        setHeight(selectors);
        timerID = 0;
      }, 1000 / 30);
    }
  });
})(this);
