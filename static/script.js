const nameInput = document.querySelector("#name");
const email = document.querySelector("#email");
const phoneNumber = document.querySelector("#phno");
const busNumber = document.querySelector("#bus");
const form = document.querySelector("form");
const addItems = document.querySelector("#itemsToAdd");
const filter = document.querySelector("#filter");

let allUsers = []; 

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const userDetails = {
    name: nameInput.value,
    email: email.value,
    phoneNumber: phoneNumber.value,
    busNumber: busNumber.value,
  };

  axios
    .post("http://localhost:5000/api/users", userDetails) // Replace with your API endpoint
    .then((response) => {
      console.log(response.data);
      allUsers.push(response.data); // Add the new user to the allUsers array
      displayUserOnScreen(allUsers); // Update the display
    })
    .catch((error) => console.log(error));
  

  nameInput.value = "";
  email.value = "";
  phoneNumber.value = "";
  busNumber.value = "";
});


window.addEventListener("DOMContentLoaded", () => {
  axios
    .get("http://localhost:5000/api/users") 
    .then((response) => {
      console.log(response.data);
      allUsers = response.data; 
      displayUserOnScreen(allUsers); 
    })
    .catch((error) => console.log(error));
});


function displayUserOnScreen(userDetailsArray) {
  addItems.innerHTML = ""; 

  userDetailsArray.forEach((userDetails) => {
    const li = document.createElement("li");
    li.textContent = `${userDetails.name} - ${userDetails.email} - ${userDetails.phoneNumber} - ${userDetails.busNumber}`;
    
    const editBtn = document.createElement("button");
    editBtn.textContent = "Edit";
    
    const delBtn = document.createElement("button");
    delBtn.textContent = "Delete";

    li.append(editBtn, delBtn);
    addItems.appendChild(li);

    
    editBtn.addEventListener("click", (e) => {
      addItems.removeChild(e.target.parentElement);
      nameInput.value = userDetails.name; 
      email.value = userDetails.email;
      phoneNumber.value = userDetails.phoneNumber;
      busNumber.value = userDetails.busNumber;

      
    });

    
    delBtn.addEventListener("click", (e) => {
      const userId = userDetails.id; // Get user ID from the userDetails object
      axios
        .delete(`http://localhost:5000/api/users/${userId}`)
        .then(() => {
          console.log("User deleted successfully");
          addItems.removeChild(e.target.parentElement); 
        })
        .catch((error) => console.log(error));
    });
  });
}


filter.addEventListener("change", function () {
  const filterValue = filter.value;
  const filteredUsers =
    filterValue === "all"
      ? allUsers
      : allUsers.filter((user) => user.busNumber === filterValue); // Filter based on bus number

  displayUserOnScreen(filteredUsers); // Update the display
});
