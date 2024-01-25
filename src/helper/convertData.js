export const ConvertData = (chart, type) => {
  const ConvertToData = chart[type].map((item) => {
    return {
      date: item[0],
      [type]: item[1],
    };
  });

  return ConvertToData;
};
