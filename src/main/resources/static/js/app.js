let userInfo = $('#tableAllUsers')
let userRoles = [];

getAllUser()

function getAllUser() {
    fetch("/api/users").then((response) => {
        console.log(response.statusText + response.status)
        if (response.ok) {
            response.json().then((users) => {
                users.forEach((user) => {
                    addUserForTable(user)
                });
            });
        } else {
            console.error(response.statusText + response.status)
        }
    });

    fetch("/api/roles").then((response) => {
        response.json().then((roles) => {
            userRoles = roles;
        });
    });
}

function addUserForTable(user) {
    userInfo.append(
        '<tr>' +
        '<td>' + user.id + '</td>' +
        '<td>' + user.firstName + '</td>' +
        '<td>' + user.lastName + '</td>' +
        '<td>' + user.age + '</td>' +
        '<td>' + user.email + '</td>' +
        '<td>' + user.roles.map(roleUser => roleUser.name) + '</td>' +
        '<td>' +
        '<button onclick="editUserById(' + user.id + ')" class="btn btn-info edit-btn" data-toggle="modal" data-target="#edit"' +
        '>Edit</button></td>' +
        '<td>' +
        '<button onclick="deleteUserById(' + user.id + ')" class="btn btn-danger" data-toggle="modal" data-target="#delete"' +
        '>Delete</button></td>' +
        '</tr>'
    )
}

function getUserRolesForAdd() {
    let allRoles = [];
    $.each($("select[name='addRoles'] option:selected"), function () {
        let role = {};
        role.id = $(this).attr('id');
        role.name = $(this).attr('name');
        allRoles.push(role);
        console.log("role: " + JSON.stringify(role));
    });
    return allRoles;
}

function addNewUser() {
    let user = {
        'firstName': $('#addFirstName').val(),
        'lastName': $('#addLastName').val(),
        'age': $('#addAge').val(),
        'email': $('#addEmail').val(),
        'passwordUser': $('#addPasswordUser').val(),
        'roles': userRoles.map(role => role.id)
    }

    fetch("/api/users", {
        method: "POST", dataType: 'json',
        contentType: 'application/json; charset=utf-8', data: JSON.stringify(user)
    })
        .then((response) => {
            response.json().then((addUser) => {
                console.log(addUser)
            })
            userInfo.empty()
            getAllUser()
        })
}

function editUserById(id) {
    fetch("/api/users/" + id, {method: "GET", dataType: 'json',})
        .then((response) => {
            response.json().then((user) => {
                $('#editId').val(user.id);
                $('#editFirstName').val(user.firstName);
                $('#editLastName').val(user.lastName);
                $('#editAge').val(user.age);
                $('#editEmail').val(user.email);
                $('#editPassword').val(user.passwordUser);
                $('#editRole').val(user.roles);

                console.log(user)
            })
        })
}

function editButton() {
    let editUser = {
        'id': $("input[name='id']").val(),
        'firstName': $("input[name='firstName']").val(),
        'lastName': $("input[name='lastName']").val(),
        'age': $("input[name='age']").val(),
        'email': $("input[name='email']").val(),
        'passwordUser': $("input[name='passwordUser']").val(),
        'roles': $("input[name='checkBoxRoles']").val()
    }

    fetch("/api/users", {
        method: "PUT", dataType: 'json',
        contentType: 'application/json; charset=utf-8', data: JSON.stringify(editUser)
    })
        .then((response) => {
            response.json().then(() => {
                userInfo.empty();
                getAllUser();
            })
            $('#edit').modal('hide');
        });
}

async function deleteUserById(id) {
    await fetch("/api/users/" + id, {method: "GET", dataType: 'json',})
        .then((response) => {
            response.json().then((user) => {
                $('#deleteId').val(user.id)
                $('#deleteFirstName').val(user.firstName)
                $('#deleteLastName').val(user.lastName)
                $('#deleteAge').val(user.age)
                $('#deleteEmail').val(user.email)
                $('#deletePassword').val(user.passwordUser)
                $('#deleteRole').val(user.roles)
            })
        })
}

async function deleteButton() {
    let userId = $('#deleteId').val();
    await fetch("/api/users/" + userId, {method: "DELETE"})
        .then((response) => {
            response.json().then(() => {
                console.log('Delete user id: ' + userId);
            })
            userInfo.empty();
            getAllUser();
            $('#delete').modal('hide');
        })
}



