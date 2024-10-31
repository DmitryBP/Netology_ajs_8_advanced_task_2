// eslint-disable-next-line no-unused-vars
 const orderByProps = (obj, sortOrder) => {
  const arr = [];
  for (let key in obj) {
    arr.push({ key: key, value: obj[key] });
  }
  const alphabitSortArr = arr.sort((a, b) => (a.key > b.key ? 1 : -1));

  let currentSortArr = [];
  let index;
  sortOrder.forEach((ell) => {
    currentSortArr.push(arr.filter((el) => el.key == ell)[0]);
    index = alphabitSortArr.findIndex((el) => el.key == ell);
    alphabitSortArr.splice(index, 1);
  });
  return [...currentSortArr, ...alphabitSortArr];
};

export default orderByProps;