var arranged = [];
var items = [{
  "id": "Box 2",
  "x": 354,
  "y": 6
}, {
  "id": "Box 3",
  "x": 15,
  "y": 147
}, {
  "id": "Box 1",
  "x": 12,
  "y": 12
}, {
  "id": "Box 4",
  "x": 315,
  "y": 146
}]

items.sort(function(a, b) {
  //sort by x, secondary by y
  return a.x == b.x ? a.y - b.y : a.x - b.x;
});

console.log(items);


// for (var i = 0; i < items.length; i++) {

//   //check if was already added
//   if (typeof(items[i].wasAdded) == "undefined") {
//     arranged.push(items[i]);
//     items[i].wasAdded = "true";

//     for (j = i + 1; j < items.length; j++) {
//       if (items[i].y > items[j].y && typeof(items[j].wasAdded) == "undefined") {
//         arranged.push(items[j]);
//         items[j].wasAdded = "true";
//       }
//     }
//   }
// }
// console.log(arranged);