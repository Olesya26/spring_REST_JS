let userInfo = $('#tableAllUsers')

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
        '<button type="submit" class="btn btn-info" data-toggle="modal" data-target="#edit" data-id="' + user.id + '"' +
        '>Edit</button></td>' +
        '<td>' +
        '<button type="submit" class="btn btn-danger" data-toggle="modal" data-target="#delete" data-id="' + user.id + '"' +
        '>Delete</button></td>' +
        '</tr>'
    )
}

function addNewUser(){
    let user={
        'firstName': $('#firstName').val(),
        'lastName': $('#lastName').val(),
        'age': $('#age').val(),
        'email': $('#email').val(),
        'passwordUser': $('#passwordUser').val(),
        'roles': $('#rolesUser').val()
    }

    let request= new Request('/api/users',{
        method: 'POST',
        dataType: 'json',
        contentType: 'application/json; charset=utf-8',
        data: JSON.stringify(user)
    });

    fetch(request).then((response)=>{
        response.json().then(()=>{
            userInfo.empty()
            getAllUser()
        })
    })
}
