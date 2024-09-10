/*
* step 1: loadPhone which is an async function is created to load the phones from the API

* Step 2: displayPhones function is created to display the phones from the API

* Step 3: displayPhones function is called inside the loadPhone function with the phones argument. This phones argument is either an object or an array. Inside the displayPhones function, this is iterated with a forEach loop and HTML elements for the cards to show the phones are created. Then each phone's attributes are used where needed inside the generated HTML.

* step 4: then handleSearch function is created. This function takes the value of the input field and send it to loadPhone function as parameter. This parameter is used inside the API link in order to search for specific phones from the API. but there is still a problem. When search a phone it displays results. when we try to search again, the results from the previous doesn't vanish. To vanish them, inside the displayPhones function we added this code:
* 'phonesContainer.innerHTML = "";'

* Step 5: We don't want to show all the phones at ones when we search for them. We want to show 12 phones at a time.
todo: So what we do is we slice the phones array inside the displayPhones function and shorten it to 12. Then we add showAll button in the html. We get element's ID inside js and apply conditional rendering. The condition is if the size of phones array is bigger than 12, then we show the button. Else, initially and if the phones array's length is smaller than 12, we don't show the button.

* Step 6: Adding a loading spinner and showing it till the data has been loaded.
todo: The function named "toggleLoadingSpinner" is created to handle the toggle of the loading spinner. It has a parameter which will receive a boolean argument. if the parameter is true, it will show the spinner and if it's false the spinner will be hidden. The function then is called inside the handleClick function since the loading will start the moment we click the search button. Loading will end after all the data are loaded and showed on the screen. That's why it's again called with a "false" argument at the end of the display phones function 
*/

// ! Function to load the phones from the API
const loadPhone = async (searchedPhone, isShowAll) => {
  const response = await fetch(
    `https://openapi.programming-hero.com/api/phones?search=${searchedPhone}`
  );
  const data = await response.json();
  const phones = data.data;

  displayPhones(phones, isShowAll);
};

// ! Function to display each phone from the loadPhone function
const displayPhones = (phones, isShowAll) => {
  console.log(phones.length);
  // todo: Grabbing the container to append the phoneCard
  const phonesContainer = document.getElementById("phones-container");

  // todo: Clearing the container to show new search results and removing the previous search results
  phonesContainer.innerHTML = "";

  // todo: Condition to check if the phones parameter has the length of more than 12 and show or hide the showAll button according to it. also if the showAll button is pressed.
  const showAllButton = document.getElementById("show-all-btn");
  if (phones.length > 12 && !isShowAll) {
    showAllButton.classList.remove("hidden");
  } else {
    showAllButton.classList.add("hidden");
  }

  // todo: display 12 phones if isShowAll is not true(it can be anything other than true eg: false, undefined etc)
  if (!isShowAll) {
    phones = phones.slice(0, 12);
  }

  phones.forEach((phone) => {
    // todo: Creating the card to individually show the phones
    const phoneCard = document.createElement("div");
    phoneCard.classList = `card bg-base-100  shadow-xl`;
    phoneCard.innerHTML = `
     <figure class="px-10 pt-10 bg-[#0D6EFD0D]">
              <img
                src="${phone.image}"
                alt="Shoes"
                class="rounded-xl"
              />
            </figure>

            <div class="card-body items-center text-center">
              <h2 class="card-title">${phone.phone_name}</h2>
              <p>If a dog chews shoes whose shoes does he choose?</p>
              <p class="text-xl font-bold">$999</p>

              <div class="card-actions">
                <button class="btn btn-primary">Buy Now</button>
              </div>
            </div>
    `;

    phonesContainer.appendChild(phoneCard);
  });

  // todo: turn off the loading spinner after data has been loaded
  toggleLoadingSpinner(false);
};

// ! Function to handle search button
const handleSearch = (isShowAll) => {
  toggleLoadingSpinner(true);
  const searchField = document.getElementById("search-field");
  const searchText = searchField.value;
  loadPhone(searchText, isShowAll);
};

// ! Function to handle the toggle of loading spinner
const toggleLoadingSpinner = (isLoading) => {
  const loader = document.getElementById("loader");
  isLoading
    ? loader.classList.remove("hidden")
    : loader.classList.add("hidden");
};

// ! Function to handle showAll button
const handleShowAllButton = () => {
  // todo: Jehetu amra show all button ta tokhon dekhai handleSearch button amra click kori, tai amra ei function e argument pass korsi ar ei function ta re dhorsi.
  handleSearch(true);
};
