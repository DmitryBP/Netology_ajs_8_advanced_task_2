const showSpecialAttack = (obj) => {
  let res = [];
  const { special } = obj;
  special.forEach((obj) => {
    const { id, name, icon, description = "Описание недоступно" } = obj;
    res.push({ id, name, icon, description });
  });
  return res;
};

export default showSpecialAttack;
