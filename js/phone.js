// ! Function to load the phones from the API
const loadPhone = async () => {
  const response = await fetch(
    "https://openapi.programming-hero.com/api/phones?search=iphone"
  );
  const data = await response.json();
  const phones = data.data;

  displayPhones(phones);
};

// ! Function to display each phone from the loadPhone function
const displayPhones = (phones) => {
  // Grabbing the container to append the phoneCard
  const phonesContainer = document.getElementById("phones-container");

  phones.forEach((phone) => {
    console.log(phone);
    // Creating the card to individually show the phones
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
};

loadPhone();
