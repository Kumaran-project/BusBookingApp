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
    .post(
      "https://crudcrud.com/api/b1de1a1e19564bb1beadac07bba55d27/passengers",
      userDetails
    )
    .then((response) => {
      console.log(response.data);
  
      allUsers.push(response.data); 
      displayUserOnScreen(allUsers);
    })
    .catch((error) => console.log(error));
  nameInput.value = "";
  email.value = "";
  phoneNumber.value = "";
  busNumber.value = "";
});

window.addEventListener("DOMContentLoaded", () => {
  axios
    .get(
      "https://crudcrud.com/api/b1de1a1e19564bb1beadac07bba55d27/passengers"
    )
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
    li.textContent = `${userDetails.name}-${userDetails.email}-${userDetails.phoneNumber}-${userDetails.busNumber}`;
    const Editbtn = document.createElement("button");
    Editbtn.textContent = "edit";
    const delbtn = document.createElement("button");
    delbtn.textContent = "delete";
    li.append(Editbtn, delbtn);
    addItems.appendChild(li);


    Editbtn.addEventListener("click", (e) => {
      addItems.removeChild(e.target.parentElement);
      const value = e.target.parentElement.firstChild.textContent.split("-");
      nameInput.value = value[0];
      email.value = value[1];
      phoneNumber.value = value[2];
      busNumber.value = value[3];

     
      axios
        .delete(
          `https://crudcrud.com/api/b1de1a1e19564bb1beadac07bba55d27/passengers/${userDetails._id}`
        )
        .then(() => {
          console.log("User deleted successfully");
        })
        .catch((error) => console.log(error));
    });

   
    delbtn.addEventListener("click", (e) => {
      addItems.removeChild(e.target.parentElement);

      axios
        .delete(
          `https://crudcrud.com/api/b1de1a1e19564bb1beadac07bba55d27/passengers/${userDetails._id}`
        )
        .then(() => {
          console.log("User deleted successfully");
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
      : allUsers.filter((user) => user.busNumber === filterValue); 

  displayUserOnScreen(filteredUsers); 
});
