window.addEventListener('DOMContentLoaded', (event) => {

    /** set event listener on salary range*/
    const salary = document.querySelector("#salary");
    const output = document.querySelector('.salary-output');
    salary.addEventListener('input', function () {
        output.textContent = salary.value;
    });
})


