let isUpdate = false;
let employeePayrollObject = {};
window.addEventListener('DOMContentLoaded', (event) => {
    validName();
    salaryRange();
    checkForUpdate();
});


function validName() {
    const name = document.querySelector("#name");
    const textError = document.querySelector(".text-error");
    name.addEventListener('input', function() {
        try {
            let empData = new EmployeePayrollData();
            empData.name = name.value;
            textError.textContent = "";
        } catch (e) {
            textError.textContent = e;
        }
    });
}

/** set event listener on salary range*/
function salaryRange() {
    const salary = document.querySelector("#salary");
    const output = document.querySelector('.salary-output');
    salary.addEventListener('input', function() {
        output.textContent = salary.value;
    });
}

/** On form submit populate employee payroll data object */
/** on submit save employee payroll JSON object*/
const save = (event) => {
    event.preventDefault();
    event.stopPropagation();
    let employeePayrollData = createEmployeePayroll();
    createAndUpdateLocalStorage(employeePayrollData);
    alert("data added with name" + employeePayrollData._name);
    window.location.replace(siteProperties.homePage);
}

/** employee id generate */
const createNewEmployeeId = () => {
    let empID = localStorage.getItem("EmployeeId");
    empID = !empID ? 1 : (parseInt(empID) + 1).toString();
    localStorage.setItem("EmployeeId", empID);
    return empID;
}

const getInputValueById = (id) => {
    let value = document.querySelector(id).value;
    return value;
}

const setTextValue = (id, message) => {
    const textError = document.querySelector(id);
    textError.textContent = message;
}

const getSelectedValues = (propertyValue) => {
        let allItems = document.querySelectorAll(propertyValue);
        let setItems = [];
        allItems.forEach(item => {
            if (item.checked == true)
                setItems.push(item.value);
        });
        return setItems;
    }
    /** find employee with id if not found create new employee and store in localStorage  */
const createAndUpdateLocalStorage = (data) => {
    let dataList = JSON.parse(localStorage.getItem("EmployeePayrollList"));

    if (dataList) {
        let existingEmpData = dataList.find(empData => empData._id == data.id);
        if (!existingEmpData) {
            data.id = createNewEmployeeId();
            dataList.push(data);
        } else {
            const index = dataList.map(emp => emp._id).indexOf(data.id);
            dataList.splice(index, 1, data);
        }
    } else {
        data.id = createNewEmployeeId();
        dataList = [data];
    }
    localStorage.setItem('EmployeePayrollList', JSON.stringify(dataList));
}


const createEmployeePayroll = () => {
    let employeePayrollData = new EmployeePayrollData();
    try {
        employeePayrollData.name = getInputValueById('#name');
        setTextValue('.text-error', "");
    } catch (e) {
        setTextValue('.text-error', e);
    }

    try {
        let date = getInputValueById('#day') + " " + getInputValueById('#month') + " " + getInputValueById('#year');
        employeePayrollData._startDate = new Date(Date.parse(date));
        setTextValue('.date-error', "");
    } catch (e) {
        setTextValue('.date-error', e);
    }

    employeePayrollData._profilePic = getSelectedValues('[name=profile]').pop();
    employeePayrollData._gender = getSelectedValues('[name=gender]').pop();
    employeePayrollData._department = getSelectedValues('[name=department]');
    employeePayrollData._salary = getInputValueById('#salary');
    employeePayrollData._note = getInputValueById('#notes');
    // employeePayrollData._id = new Date().getTime() + 1;
    employeePayrollData._id = employeePayrollObject._id;

    alert(employeePayrollData.toString());
    return employeePayrollData;
}

/** Reset employee payroll form */

const resetForm = () => {
    setTextValue('#name', '');
    unsetSelectedValues('[name=profile]');
    unsetSelectedValues('[name=gender]');
    unsetSelectedValues('[name=department]');
    setValue('#salary', '');
    setValue('#notes', '');
    setValue('#day', '1');
    setValue('#month', 'January');
    setValue('#year', '2021');
}

const unsetSelectedValues = (propertyValue) => {
    let allItems = document.querySelectorAll(propertyValue);
    allItems.forEach(item => {
        item.checked = false;
    });
}

const setValue = (id, value) => {
    const element = document.querySelector(id);
    element.value = value;
}

/** check for Update and set the valuees of the form elements  */
const checkForUpdate = () => {
    let jsonData = localStorage.getItem('edit-emp');
    isUpdate = jsonData ? true : false;
    if (!isUpdate)
        return;
    employeePayrollObject = JSON.parse(jsonData);
    setForm();
}

const setForm = () => {
    setValue('#name', employeePayrollObject._name);
    setSelectValue('[name=profile]', employeePayrollObject._profilePic);
    setSelectValue('[name=gender]', employeePayrollObject._gender);
    setSelectValue('[name=department]', employeePayrollObject._department);
    setValue('#salary', employeePayrollObject._salary);
    setTextValue('.salary-output', employeePayrollObject._salary)
    let date = stringify(employeePayrollObject._startDate).split(" ");
    setValue('#day', date[0]);
    setValue('#month', date[1]);
    setValue('#year', date[2]);
    setValue('#notes', employeePayrollObject._note);
}

const setSelectValue = (propertyValue, value) => {
    let allitem = document.querySelectorAll(propertyValue);
    allitem.forEach(item => {
        if (Array.isArray(value)) {
            if (value.includes(item.value)) {
                item.checked = true;
            }
        } else if (item.value == value) {
            item.checked = true;
        }
    });
}
const setSelectedIndex = (id, index) => {
    const element = document.querySelector(id);
    element.selectedIndex = index;
}