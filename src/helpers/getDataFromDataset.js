export function getDataFromDataset(dataset = {}, date) {
  return dataset[date];
}

export function getCount(dataset, date) {
  const data = getDataFromDataset(dataset, date) || {};
  return data.count || 0;
}

export function getMaxCount(dataset) {
  let max = 0;
  const dates = Object.keys(dataset);
  dates.forEach(date => {
    const count = getCount(dataset, date) || {};
    if (count > max) {
      max = count;
    }
  });
  return max;
}
