export const getRandomNo = () => {
  return (
    Math.random().toString(36).substring(2, 15) +
    Math.random().toString(36).substring(2, 15)
  );
};


//Copied from https://levelup.gitconnected.com/debounce-in-javascript-improve-your-applications-performance-5b01855e086
export const debounce = (func: any, wait: any) => {
  let timeout: any;

  return function executedFunction(...args: any) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };

    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};