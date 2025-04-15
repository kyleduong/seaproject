// add an event listener to update on every action
document.addEventListener("DOMContentLoaded", function() {
  /*
   this is my starting data, an array of objects. I edited the starter code, combining the separate url variables and the array of 
   string names into objects so that it was more efficient/easier in retrieving the information, as well as adding/deleting data to the
   arrays. Not to mention that it makes the data more concise, easier to read. 
   */
  let tops = [
    { id: 1, name: "T-Shirt", image: "https://www.3sixteen.com/cdn/shop/products/2211-NOV-3sixteen-POCKET-TEE-BLACK-FRONT_400x.jpg?v=1668095850" },
    { id: 2, name: "Hoodie", image: "https://m.media-amazon.com/images/I/71gEWlwpN9L._AC_UY1000_.jpg" },
    { id: 3, name: "Blouse", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSQ2A3TcoUjgc6eR_TY9MUx1avqi6Vz2f-vZA&s" },
    { id: 4, name: "Jacket", image: "https://cdni.llbean.net/is/image/wim/520163_699_82?hei=1095&wid=950&resMode=sharp2&defaultImage=llbprod/520163_699_41" }
  ];

  /*
    two different arrays because I found that it was more straightforward to iterate through the data individually for tops and bottoms
    I could have included it as one of the parameters for the object, specifying whether or not it's a top or bottom, but I just found it
    more intuitive and straightforward to separate them. Either implementation would have worked though. 
  */
  const bottoms = [
    { id: 1, name: "Shorts", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTgbi-Q-wk2B0fRd4IWUBGox7pnDrWZPM5AOA&s" },
    { id: 2, name: "Skirt", image: "https://i5.walmartimages.com/seo/Made-by-Johnny-Women-s-Basic-Versatile-Stretchy-Flared-Skater-Skirt-M-BLACK_a325fda6-dc12-4475-b6d9-a1a0f6f26e90.baf9cedad951324733038740ac3ce0c3.jpeg" },
    { id: 3, name: "Jeans", image: "https://www.gap.com/webcontent/0056/081/447/cn56081447.jpg" },
    { id: 4, name: "Trousers", image: "https://assets.burberry.com/is/image/Burberryltd/EAB4D67A-F258-44FF-AABA-B6CEA9C680DD?$BBY_V3_SL_1$&wid=1501&hei=1500" }
  ];

  // index trackers for displayed items, tells the outfit customizers which item it should be displaying
  let currentTopIndex = 0;
  let currentBottomIndex = 0;

  // helper function that creates an item card element for outfit display
  // note: I learned about the use of ` (backticks) to help make cleaner code, instead of having to concatenate many " (double quotes)
  function renderItem(item) {
    // create a div, give it the item card class, then add the html that displays the picture
    const card = document.createElement("div");
    card.classList.add("item-card");
    card.innerHTML = `<img src="${item.image}" alt="${item.name}" /><p>${item.name}</p>`;
    return card;
  }

  /* 
      These functions should handle when a left or right button is pressed for either the top or the bottom outfit.
      The idea behind these functions is that they help reduce the amount of code needed to change outfits, and can simply
      can be called on every button press.
  */  

  // top display updater
  function updateTopDisplay() {
    // grabs the container holding the top
    const topsBox = document.getElementById("tops-box");
    topsBox.innerHTML = "";
    // handles if there are no tops in the database (array)
    if (tops.length === 0) {
      topsBox.innerHTML = "<p>No tops available.</p>";
      return;
    }
    // render the item and add it to the current box for display
    const topItem = tops[currentTopIndex];
    topsBox.appendChild(renderItem(topItem));
  }

  // bottom display updater
  function updateBottomDisplay() {
    // grab the container holding the botttoms
    const bottomsBox = document.getElementById("bottoms-box");
    bottomsBox.innerHTML = "";
    // handles if there are no bottoms in the database (array)
    if (bottoms.length === 0) {
      bottomsBox.innerHTML = "<p>No bottoms available.</p>";
      return;
    }
    // render the item and add it to the current box for display
    const bottomItem = bottoms[currentBottomIndex];
    bottomsBox.appendChild(renderItem(bottomItem));
  }


  /*
   These functions are able to be used in the html code, and the input tells us which direction the user clicked, instead of needing to 
   assign something to each direction button individually. This makes it easier to understand what the user is doing and to be able to reuse code
   to make it also more intuitive for other coders viewing.
  */
  window.changeTop = function(direction) {
    // checks if the length is currently at 0, and if it is then there is no other artcles of clothing to view so just return.
    if (tops.length === 0){
      return;
    }
    // update the index to accommodate whatever button was pressed, and handle any out of bounds indexing
    currentTopIndex += direction;
    if (currentTopIndex < 0){
      currentTopIndex = tops.length - 1;
    } 
    if (currentTopIndex >= tops.length){
      currentTopIndex = 0;
    }
    updateTopDisplay();
  };

  window.changeBottom = function(direction) {
    // checks if the length is currently at 0, and if it is then there is no other artcles of clothing to view so just return.
    if (bottoms.length === 0) {
      return;
    }
    // update the index to accommodate whatever button was pressed, and handle any out of bounds indexing
    currentBottomIndex += direction;
    if (currentBottomIndex < 0){
      currentBottomIndex = bottoms.length - 1;
    }
    if (currentBottomIndex >= bottoms.length) {
      currentBottomIndex = 0;
    }
    updateBottomDisplay();
  };

  /*
  Functions to handle the deletion portion of the website. Similar thought process as the change portion.
  Use create a window function to use in the html code, eaiser to understand. 
  */

  // deletes the current clothing on top
  window.deleteCurrentTop = function() {
    // do nothing if theres nothing in the list
    if (tops.length === 0){
      return;
    }
    // removes the current clothing the index is on, updates the index
    tops.splice(currentTopIndex, 1);
    // if the removed clothing is the last one in the list, go back to the first piece
    if (currentTopIndex >= tops.length){
      currentTopIndex = 0;
    }
    // update displays and inventory after data editing
    updateTopDisplay();
    updateInventory();
  };

  // deletes the current clothing on bottom
  window.deleteCurrentBottom = function() {
    // do nothing if theres nothing in the list
    if (bottoms.length === 0){
      return;
    }
    // removes the current clothing the index is on, updates the index
    bottoms.splice(currentBottomIndex, 1);
    // if the removed clothing is the last one in the list, go back to the first piece
    if (currentBottomIndex >= bottoms.length){
      currentBottomIndex = 0;
    }
    // update displays and inventory after data editing
    updateBottomDisplay();
    updateInventory();
  };

  /*
    This adding function should grab all of the information from the fields, and allow users to add their own clothing pieces to mix
    and match. Also similar thought process during the development of this function as the delete and change, but also difference now is
    here we need to get the element information inside the dropdown/textboxes.

    One thing to note here that is unorthodox is that I used Date.now() to keep the id so that the inventory and current output catelog
    would display in a particular order. this also prevents the need to use hardcoded numbers for the id, but either/or would work in
    this case. I could've either tried to fill in the empty numbers that have been previously deleted and needed to be replaced, or
    alternatively just kept on incrementing a counter upon every addition and set that as the item's id.
  */

  // adding a new clothing item from the right panel
  window.addNewClothingItem = function() {
    // Manually get values from the form fields
    const nameInput = document.getElementById("newClothingName");
    const imageInput = document.getElementById("newClothingImage");
    const typeSelect = document.getElementById("newClothingType");
    // getting the form so I can reset the fields upon submission
    const form = document.getElementById("addClothingForm");
    
    // stores the values in the textboxes and dropdown, removing uncessary whitespace with trim
    const name = nameInput.value.trim();
    const image = imageInput.value.trim();
    const type = typeSelect.value;

    // ensures all of the fields are filled out
    if (!name || !image) {
      alert("Please fill out all fields.");
      return;
    }

    // create a new item to add into the dataset
    const newItem = { id: Date.now(), name, image };

    // checks which dataset to add to, and adds it while handling indexing. 
    if (type === "top") {
      tops.push(newItem);
      currentTopIndex = tops.length - 1; // Go to the newly added item
      updateTopDisplay();
    } else {
      bottoms.push(newItem);
      currentBottomIndex = bottoms.length - 1; // Go to the newly added item
      updateBottomDisplay();
    }

    // after processing all the information and adding to the lists, clear the forms
    form.reset();
  
    updateInventory();
  };

  // INVENTORY SECTION
  /*
    Inventory displays all of the current items in the database (array) for tops and bottoms, and allows options for users to filter 
    through the items
  */

  // helper function to create item element inside the inventory
  // takes in an article of clothing (item) and its type (top or bottom) for processing
  function renderInventoryItem(item, type) {
    // create the div
    const div = document.createElement("div");
    // add the class
    div.classList.add("inventory-item");
    // create the div contents, which is an image, followed by its name and type
    div.innerHTML = `<img src="${item.image}" alt="${item.name}" />
                     <p>${item.name}</p>
                     <p class="type">${type}</p>`;
    return div;
  }

  // updates inventory display using filters
  function updateInventory() {
    // store in variables the names, types and sortby.
    // lowercase and trim the name for uniformity
    const searchText = document.getElementById("inventorySearch").value.trim().toLowerCase();
    const selectedType = document.getElementById("inventoryType").value;
    const sortOrder = document.getElementById("inventorySort").value;
    
    // Combine tops and bottoms into one array
    let inventory = [];
    // goes through every item in tops and bottoms, adds it to inventory and adding on a tag that specifies its type
    tops.forEach(item => inventory.push({ ...item, type: "top" }));
    bottoms.forEach(item => inventory.push({ ...item, type: "bottom" }));
    
    // apply name filter if typed in, uses filter function through uniform strings
    if (searchText) {
      inventory = inventory.filter(item => item.name.toLowerCase().includes(searchText));
    }

    // apply type filter
    // display only tops or bottoms depending on what user selects
    if (selectedType !== "all") {
      inventory = inventory.filter(item => item.type === selectedType);
    }
    // sort by name
    // uses function localeCompare to return the string that comes first, but can also implement it through manual sorting (longer code)
    inventory.sort((a, b) => {
      if (sortOrder === "asc") {
        return a.name.localeCompare(b.name);
      } else {
        return b.name.localeCompare(a.name);
      }
    });
    
    // render inventory items
    // get the container, add the html and its content to it displaying all inventory items
    const invContainer = document.getElementById("inventory-container");
    invContainer.innerHTML = "";
    if (inventory.length === 0) {
      invContainer.innerHTML = "<p>No items found.</p>";
      return;
    }
    inventory.forEach(item => {
      invContainer.appendChild(renderInventoryItem(item, item.type));
    });
  }

  // event listeners for inventory filter controls
  document.getElementById("inventorySearch").addEventListener("input", updateInventory);
  document.getElementById("inventoryType").addEventListener("change", updateInventory);
  document.getElementById("inventorySort").addEventListener("change", updateInventory);

  // initialize displays
  updateTopDisplay();
  updateBottomDisplay();
  updateInventory();
});