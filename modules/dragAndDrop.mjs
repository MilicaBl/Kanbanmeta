export function allowDrop(ev) {
  console.log(ev);
  ev.preventDefault();
}

export function drag(ev) {
  console.log(ev.target.id);
  ev.dataTransfer.setData("card", ev.target.id);
}

export function drop(ev) {
  console.log(ev);
  ev.preventDefault();
  var data = ev.dataTransfer.getData("card");
  ev.target.append(document.getElementById(data));
}