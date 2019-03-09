/**
 * @name Public API request
 * @author Me
 */
// global variables
var gallery = document.querySelector('#gallery');
var modal = document.createElement('DIV');
/**
 * add into the gallery a card for any employee.
 * @param {array} employees array of objects containing all the employees info.
 * @return {none} It doesn't have any return functionality.
 */
const showEmployees = employees => {
    employees.map(employee => 
        gallery.innerHTML += 
            `<div class="card">
                <div class="card-img-container">
                    <img class="card-img" src="${employee.picture.large}" alt="profile picture">
                </div>
                <div class="card-info-container">
                    <h3 id="name" class="card-name cap">${employee.name.first} ${employee.name.last}</h3>                
                    <p class="card-text">${employee.email}</p>
                    <p class="card-text cap">${employee.location.city}, ${employee.location.state}</p>
                </div>
            </div>`
    );
    attachEvnList(employees);
}
/**
 * change the content of the model with a specific employee
 * @param {array} employees array of objects containing all the employees info.
 * @param {number} index of the specific employee clicked.
 * @return {none} It doesn't have any return functionality.
 */
const openModal = (employees, index) => {
    let employee = employees[index];
    modal.innerHTML = 
        `<div class="modal-container">
        <div class="modal">
            <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
            <div class="modal-info-container">
                <img class="modal-img" src="${employee.picture.large}" alt="profile picture">
                <h3 id="name" class="modal-name cap">${employee.name.first} ${employee.name.last}</h3>
                <p class="modal-text">${employee.email}</p>
                <p class="modal-text cap">${employee.location.state}</p>
                <hr>
                <p class="modal-text">${employee.phone}</p>
                <p class="modal-text">${employee.location.street}, ${employee.location.city}, ${employee.location.postcode}</p>
                <p class="modal-text">Birthday: ${employee.dob.date}</p>
            </div>
        </div>`
    // add functionality to close (clean) the modal mode.
    document.querySelector('#modal-close-btn')
        .addEventListener('click', () => modal.innerHTML = "");
}

/**
 * attached che click methods once the employees are rendered
 * @param {array} employees array of objects containing all the employees info.
 * @return {none} It doesn't have any return functionality.
 */
const attachEvnList = employees => 
    gallery.childNodes.forEach((node, index) =>
        node.addEventListener('click', event => 
            openModal(employees, index)
    )
);
// entry point of the program
document.querySelector('body').appendChild(modal);
// link to the documentation of the API: https://randomuser.me/documentation
fetch('https://randomuser.me/api/?results=12&nat=gb,us,ie')
    .then(response => response.json())
    .then(data => showEmployees(data.results))
