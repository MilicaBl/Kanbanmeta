// Get data from LS
export const getDataFromLS = function (column) {
  const columnData = localStorage.getItem(`"${column}"`);
  return columnData ? JSON.parse(columnData) : [];
};

// Save to LS
function saveToLs(column, item) {
  const existingItems = getDataFromLS(column);
  
  if (existingItems.length > 0) {
    // Lägg till det nya objektet till den befintliga datan
    existingItems.push(item);
    console.log("Datan som sparades:" + existingItems);
  } else {
    console.log("Inget sparat, skapar ny post.");
    existingItems.push(item);
  }
  // Spara tillbaka uppdaterad lista till localStorage
  localStorage.setItem(column, JSON.stringify(existingItems));
}

// Remove specific item from LS
function clearLS(column, item) {
  const existingItems = getDataFromLS(column);

  if (existingItems.length > 0) {
    const updatedItems = existingItems.filter((card) => card !== item);
    localStorage.setItem(column, JSON.stringify(updatedItems));
    console.log(`"item ${item} har tagits bort från ${column}"`);
  } else {
    console.log("Inga items hittade i ls för denna kolumn");
  }
}
