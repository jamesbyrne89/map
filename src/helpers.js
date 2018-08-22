function calculateWalkTime(distance) {
  // 3.1mph is average walking speed
  const milesPerMinute = 3.1 / 60;
  const time = parseInt(distance / milesPerMinute, 0);
  return time > 1 ? `${time} mins` : `${time} min`;
}

function getSpaceType(string) {
  return string.substring(0, string.indexOf(' on ') + 1);
}

function getCircumference(radius) {
  return 2 * Math.PI * radius;
}

function debounce(func, wait, immediate) {
  var timeout;
  return function() {
    var context = this,
      args = arguments;
    var later = function() {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    var callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
}

export { calculateWalkTime, getSpaceType, getCircumference, debounce };
