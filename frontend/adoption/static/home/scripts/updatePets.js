document.addEventListener("DOMContentLoaded", function () {
  document
    .getElementById("update-pet-form")
    .addEventListener("submit", (event) => {
      event.preventDefault();

      const petId = document.getElementById("pet-id").value;
      const breed = document.getElementById("breed").value;
      const gender = document.getElementById("gender").value;
      const age = document.getElementById("age").value;
      const description = document.getElementById("description").value;
      const isAdopted = document.getElementById("is-adopted").checked;

      // Debug: Log retrieved values
      console.log("Pet ID:", petId);
      console.log("Breed:", breed);
      console.log("Gender:", gender);
      console.log("Age:", age);
      console.log("Description:", description);
      console.log("Is Adopted:", isAdopted);

      const updatedPet = { breed, gender, age, description, isAdopted };

      fetch(`http://localhost:4000/api/v1/pets/update/${petId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedPet),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then((data) => {
          const messageElement = document.getElementById("update-message");
          if (data.error) {
            messageElement.textContent = `Error: ${data.error}`;
            messageElement.style.color = "red";
          } else {
            messageElement.textContent = `Pet updated successfully: ${JSON.stringify(
              data
            )}`;
            messageElement.style.color = "green";
            // Debug: Log server response
            console.log("Server Response: ", data);
          }
        })
        .catch((error) => {
          const messageElement = document.getElementById("update-message");
          messageElement.textContent = `Error: ${error.message}`;
          messageElement.style.color = "red";
        });
    });
});
