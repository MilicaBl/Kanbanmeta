// Function to create a card column
export function renderCardColumn(title) {
    const column = document.createElement('div');
    column.classList.add('card-column');

    // Column title
    const columnTitle = document.createElement('h2');
    columnTitle.textContent = title;
    column.appendChild(columnTitle);

    // Column body
    const cardBody = document.createElement('div');
    cardBody.classList.add('card-body');
    column.appendChild(cardBody);

    // Add card button
    const addCardBtn = document.createElement('button');
    addCardBtn.classList.add('add-card-btn');
    addCardBtn.textContent = "Lägg till ett kort";
    column.appendChild(addCardBtn);


}

return coulmn;

// Function to create main board with all columns
export function renderMainBoard() {
    const root = document.getElementById('root');

    // Create main container
    const mainContainer = document.createElement('div');
    mainContainer.classList.add('main-container');

    // Create each card folumn
    const columns = ['To do', 'Doing', 'Testing', 'Done'];
    columns.forEach(title => {
        const column = renderCardColumn(title);

        mainContainer.appendChild(column);
    });

    root.appendChild(mainContainer);
}