export default function createMaxCount(start, end) {
  let startArray = start.split("-");
  let endArray = end.split("-");

  function dayCount(m, d) {
    const month = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

    const monthCheck = (m) => {
      let resultArray = [];
      resultArray = month.map((el) => (el < m + 1 ? el : null));
      return resultArray;
    };

    const fullDays = (m, d) => {
      let dateTable = {
        1: 31,
        2: 28,
        3: 31,
        4: 30,
        5: 31,
        6: 30,
        7: 31,
        8: 31,
        9: 30,
        10: 31,
        11: 30,
        12: 31,
      };
      if (m > 1) {
        let n = 0;
        for (let i in monthCheck(m - 1)) {
          n++;
          if (monthCheck(m - 1)[i] === null) {
            delete dateTable[n];
          }
        }
        let result = 0;
        for (var i in dateTable) {
          result += dateTable[i];
        }
        return result + d;
      } else {
        return 0 + d;
      }
    };
    return fullDays(m, d);
  }
  return (
    dayCount(parseInt(endArray[1]), parseInt(endArray[2])) -
    dayCount(parseInt(startArray[1]), parseInt(startArray[2])) +
    1
  );
}
