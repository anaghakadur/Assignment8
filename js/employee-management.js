
var emplist;

var $ = function (id) {
    return document.getElementById(id);
}

window.addEventListener('load', employeeList);

function employeeList() {
    emplist = [
        {name: "Sally Smith", title: "Quality Assurance", extension: 3423},
        {name: "Mark Martin", title: "VP Sales", extension: 3346},
        {name: "John Johnson", title: "Marketing", extension: 3232},
    ];

    displayEmployees();

    var addButton = $('addEmployeeButton');
    addButton.addEventListener('click', addEmployee);
}

function displayEmployees() {
    var table = $('employeesTable');
    var tbody = table.getElementsByTagName('tbody')[0];
    tbody.innerHTML = '';

    for (var i = 0; i < emplist.length; i++) {
        var row = document.createElement('tr');
        row.insertCell(0).innerHTML = emplist[i].name;
        row.insertCell(1).innerHTML = emplist[i].title;
        row.insertCell(2).innerHTML = emplist[i].extension;

        var deleteButton = document.createElement('button');
        deleteButton.setAttribute('id', emplist[i].extension);
        deleteButton.innerHTML = "Delete";
        deleteButton.addEventListener('click', function(e) {
            var extension = e.currentTarget.id;
            removeEmployee(extension);
        });

        row.insertCell(3).append(deleteButton);

        tbody.append(row);
    }

    var count = $('employeeCount');
    count.innerHTML = emplist.length;
}

function addEmployee(event) {
    event.preventDefault();

    var hasError = false;
    var form = event.currentTarget.closest('form');
    var name = form.querySelector('input[name="name"]');
    var title = form.querySelector('input[name="title"]');
    var extension = form.querySelector('input[name="extension"]');

    var requiredFields = [name, title, extension];
    for (var i = 0; i < requiredFields.length; i++) {
        if (requiredFields[i].value === '') {
            displayError(requiredFields[i]);
            hasError = true;
        }
    }

    if (hasError) {
        return false;
    }

    emplist.push({
        name: name.value,
        title: title.value,
        extension: extension.value
    });

    displayEmployees();
    clearForm(form);
}

function displayError(element) {
    var error = element.parentNode.querySelector('.error');
    error.innerHTML = "Mandatory field";
    error.classList.remove('hide');
}

function removeEmployee(extension) {
    emplist = emplist.filter(function(employee) {
        return employee.extension != extension;
    });

    displayEmployees();
}

function clearForm(form) {
    form.reset();
    var errorNodes = form.querySelectorAll('.error');
    for (var i = 0; i < errorNodes.length; i++) {
        errorNodes[i].classList.add('hide');
    }
}