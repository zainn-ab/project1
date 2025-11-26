
//     const students = JSON.parse(localStorage.getItem("students")) || [];

//     const tableBody = document.querySelector("#studentsTable tbody");

//     students.forEach(student => {
//     const row = document.createElement("tr");
//     row.innerHTML = `
//         <td>${student.name}</td>
//         <td>${student.roomNumber}</td>
//         <td>${student.phoneNumber}</td>
//         <td>${student.email}</td>
//         <td>${student.guardianContact}</td>
//     `;
//     tableBody.appendChild(row);
// });


    // Your list of items



    const students = JSON.parse(localStorage.getItem("students")) || [];

    const cardContainer = document.querySelector("#cardContainer");

    students.forEach(student => {
        cardContainer.innerHTML += `
            <div class="col-md-4">
                <div class="card">
                    <div class="card-header">
                        ${student.name}
                    </div>
                    <div class="card-body">
                        <h5 class="card-title">${student.roomNumber}</h5>
                        <p class="card-text">${student.email}</p>
                        <p class="card-text"><strong>Phone:</strong> ${student.phoneNumber}</p>
                        <p class="card-text"><strong>Guardian:</strong> ${student.guardianContact}</p>
                        <button style="width:100px;height:50px;background-color:green" type="submit" value="submit" >Mark Out</button>
                        <button style="width:100px;height:50px;background-color:gray" type="submit" value="submit" >Mark In</button>
                    </div>
                </div>
            </div>
        `;
    });





