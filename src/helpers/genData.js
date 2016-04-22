var fs = require('fs');

function getDateByDays(date, days) {
  const target = new Date(date);
  target.setDate(date.getDate() + days);
  return target;
}

fs.readFile('./example/data/commitSourceData.json', 'utf8', function(err, data) {
  var month = '1914-05';
  var groups = ['Telemachus', 'Nestor', 'Proteus'];
  if (data) {
    var dataObj = JSON.parse(data);
    dataObj.children.forEach(function(child, idx) {
      child.name = '1914-0'.concat(idx + 1);
      var startDate = new Date(child.name.concat('-01'));
      child.children.forEach(function(grandchild, idx) {
        var targetDate = getDateByDays(startDate, idx);
        grandchild.name = targetDate.toJSON().slice(0, 10);
        grandchild.group = groups[Math.floor(Math.random() * 3)];
      });
    });

    fs.writeFileSync('./example/data/commitSourceData.json', JSON.stringify(dataObj));
  }
});
