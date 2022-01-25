window.addEventListener('DOMContentLoaded', (event) => {
    createInnerHtml();
});

//Template literal 
const createInnerHtml = () => {
    const headerHtml = "<th></th></th><th>Profile</th><th>Name</th><th>Gender</th><th>Department</th><th>Salary</th><th>Start Date</th><th>Actions</th>";
    const innerHtml = `${headerHtml}
            <tr>
                <td><img class="profile" src="../assets/profile-images/Ellipse -1.png"></td>
                <td>Julekha Mulani</td>
                <td>Female</td>
                <td>
                    <div class="dept-label">HR</div>
                    <div class="dept-label">Engineer</div>
                </td>
                <td>400000</td>
                <td>16 Nov 2021</td>
                <td>
                    <img id="1" onclick="remove(this)" alt="delete" src="../assets/icons/delete-black-18dp.svg">
                    <img id="1" alt="edit" onclick="update(this)" src="../assets/icons/create-black-18dp.svg">
                </td>
            </tr>    
    `;
    document.querySelector('#display').innerHTML = innerHtml;
}