module.exports = function (array) {
  const json = array.map((item) => JSON.stringify(item));
  const set = new Set(json);
  const fromset = Array.from(set);
  const unique = fromset.map((item) => JSON.parse(item));
  return unique;
};
