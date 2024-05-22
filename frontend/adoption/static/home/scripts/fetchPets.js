const fetchPets = async () => {
  try {
    const response = await fetch("http://localhost:4000/api/v1/pets");
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Failed to fetch pets");
    }

    // Update the pet list on the UI (assuming you have a function to handle this)
    updatePetList(data);
  } catch (error) {
    console.error("Error fetching pets:", error);
    // Handle error display or logging here
  }
};

const updatePetList = (pets) => {
  const petList = document.getElementById("pet-list");

  petList.innerHTML = "";

  if (pets.length === 0) {
    petList.innerHTML = "<p>No pets found.</p>";
    return;
  }

  pets.forEach((pet) => {
    const petItem = document.createElement("div");
    petItem.innerHTML = `
      <h2>${pet.breed}</h2>
      <img src="${pet.image}" alt="Pet Image" />
      <p>Gender: ${pet.gender}</p>
      <p>Age: ${pet.age}</p>
      <p>Description: ${pet.description}</p>
      <p>Adopted: ${pet.isAdopted ? "Yes" : "No"}</p>
    `;
    petList.appendChild(petItem);
  });
};

const form = document.getElementById("add-pet-form");

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  const formData = new FormData(form);
  formData.append("isAdopted", false);

  try {
    const response = await fetch("http://localhost:4000/api/v1/pets/create", {
      method: "POST",
      body: formData,
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Failed to create pet");
    }

    console.log("New pet created successfully:", data);
    document.getElementById("message").innerText = "Pet successfully added!";
    document.getElementById("message").style.color = "green";

    form.reset();
    fetchPets(); // Call the fetchPets function to update the pet list
  } catch (error) {
    console.error("Error creating pet:", error);
    document.getElementById("message").innerText = `Error: ${error.message}`;
    document.getElementById("message").style.color = "red";
  }
});
