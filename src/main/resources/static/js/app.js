let userInfo = $('#tableAllUsers')
let allUser = []

getAllUser()

function getAllUser() {
    fetch("/api/users").then((response) => {
        console.log(response.statusText + response.status)
        if (response.ok) {
            response.json().then((users) => {
                users.forEach((user) => {
                    console.log(user)
                    addUserForTable(user)
                    allUser.push(user)
                });
            });
            console.log(allUser)
        } else {
            console.error(response.statusText + response.status)
        }
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

function addNewUser() {
    let roleList = () => {
        let array = []
        let options = document.querySelector('#addRole').options
        for (let i = 0; i < options.length; i++) {
            if (options[i].selected) {
                let role = {id: options[i].value, name: options[i].text}
                array.push(role)
            }
        }
        return array;
    }

    let user = {
        firstName: document.getElementById("addFirstName").value,
        lastName: document.getElementById("addLastName").value,
        age: document.getElementById("addAge").value,
        email: document.getElementById("addEmail").value,
        passwordUser: document.getElementById("addPasswordUser").value,
        roles: roleList()
    }

    let headers = new Headers();
    headers.append('Content-Type', 'application/json; charset=utf-8');
    let request = new Request('/api/users', {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(user)
    });
    console.log(user);

    fetch(request).then((response) => {
        response.json().then((userAdd) => {
            allUser.push(userAdd)
            addUserForTable(userAdd)
            console.log(userAdd)
        })

        console.log(allUser)

        $('#usersTableActive').tab('show');
        userClearModal()
    })
}

function userClearModal() {
    $('#addFirstName').empty().val('');
    $('#addLastName').empty().val('');
    $('#addAge').empty().val('');
    $('#addEmail').empty().val('');
    $('#addPasswordUser').empty().val('');
    $('#addRole').val('');

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
    let roleList = () => {
        let array = []
        let options = document.querySelector('#editRole').options
        for (let i = 0; i < options.length; i++) {
            if (options[i].selected) {
                let role = {id: options[i].value, name: options[i].text}
                array.push(role)
            }
        }
        return array;
    }

    let editUser = {
        id: document.getElementById("editId").value,
        firstName: document.getElementById("editFirstName").value,
        lastName: document.getElementById("editLastName").value,
        age: document.getElementById("editAge").value,
        email: document.getElementById("editEmail").value,
        passwordUser: document.getElementById("editPassword").value,
        roles: roleList()
    }
    console.log(editUser);

    let headers = new Headers();
    headers.append('Content-Type', 'application/json; charset=utf-8');
    let request = new Request("api/users", {
        method: 'PUT',
        headers: headers,
        body: JSON.stringify(editUser),
    });

    let userEditId = ($('#editId').val())
    console.log(userEditId)
    fetch(request).then((response) => {
        response.json().then((userEdit) => {
            console.log(userEdit);
            userInfo.empty();
            allUser = allUser.map(user => user.id !== userEdit.id ? user : userEdit)
            console.log(allUser)
            allUser.forEach((user) => {
                addUserForTable(user)
            })
        })
        $('#edit').modal('hide');
    });
}

function deleteUserById(id) {
    fetch("/api/users/" + id, {method: "GET", dataType: 'json',})
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

function deleteButton() {
    let userId = ($('#deleteId').val());
    console.log(userId)
    fetch("/api/users/" + userId, {method: "DELETE"})
        .then((response) => {
            userInfo.empty()
            allUser = allUser.filter(user => user.id !== Number(userId))
            console.log(allUser)

            allUser.forEach((user) => {
                addUserForTable(user)
            })
            $('#delete').modal('hide');
        })
}



