document
  .getElementById("delete-pet-form")
  .addEventListener("submit", function (event) {
    event.preventDefault(); 
    const petId = document.getElementById("delete-pet-id").value.trim();
    if (!petId) {
      
      return;
    }
    deletePet(petId);
  });

function deletePet(petId) {
  fetch(`http://localhost:4000/api/v1/pets/delete/${petId}`, {
    method: "DELETE",
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      console.log("Pet deleted successfully:", data);
      document.getElementById("delete-message").textContent =
        "Pet deleted successfully.";
      
    })
    .catch((error) => {
      console.error("Error deleting pet:", error);
      document.getElementById("delete-message").textContent =
        "Error deleting pet. Please try again.";
    });
}
