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
    document.getElementById("message").innerText = "Pet created successfully!";
    document.getElementById("message").style.color = "green";

    form.reset();
    fetchPets();
  } catch (error) {
    console.error("Error creating pet:", error);
    document.getElementById("message").innerText = `Error: ${error.message}`;
    document.getElementById("message").style.color = "red";
  }
});
