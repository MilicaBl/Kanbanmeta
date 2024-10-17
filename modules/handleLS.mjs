export function getLoggedInUser() {
  return localStorage.getItem("loggedInUser");
}
// Get data from LS
export const getDataFromLS = function (column) {
  let userName=getLoggedInUser()
  const columnData = localStorage.getItem(`${userName}-${column}`);
  return columnData ? JSON.parse(columnData) : [];
};

// Save to LS
export function saveToLs (column, item) {
  let userName=getLoggedInUser()
  let key=`${userName}-${column}`;
  const existingItems = getDataFromLS(column);

  if (existingItems.length > 0) {
    // Check if the item already exists
    let existingItem = existingItems.find((card) => card.id === item.id);
    if (existingItem) {
      existingItem.text = item.text;
    } else existingItems.push(item);
    console.log("Datan som sparades:" + existingItems);
  } else {
    console.log("Inget sparat, skapar ny post.");
    existingItems.push(item);
  }
  // Save an updated list to localStorage
  localStorage.setItem(key, JSON.stringify(existingItems));
}

// Remove specific item from LS
export function clearLS(column, item) {
  let userName=getLoggedInUser()
  let key=`${userName}-${column}`;
  const existingItems = getDataFromLS(column);

  if (existingItems.length > 0) {
    const updatedItems = existingItems.filter((card) => card.id !== item.id);
    localStorage.setItem(key, JSON.stringify(updatedItems));
  } else {
    console.log("Inga items hittade i ls för denna kolumn");
  }
}
