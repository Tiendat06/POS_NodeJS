
function jsInProfile() {
    $(document).ready(() => {
        $("#btn_save").click(function () {
            // var profile_id = $("#profile_id").val();
            $("#overlay").removeClass('d-none');
            var firstName = $("#firstName").val();
            var lastName = $("#lastName").val();
            var email = $("#email").val();
            var gender = $("#gender").val();
            var phone = $("#phoneNumber").val();
            var dob = $("#dob").val();
            var address = $("#address").val();
            var img = document.getElementById("upload");
            var oldImg = document.getElementById("uploadedAvatar").src;

            var formData = new FormData();
            // formData.append('profile_id', profile_id);
            formData.append('firstName', firstName);
            formData.append('lastName', lastName);
            formData.append('email', email);
            formData.append('gender', gender);
            formData.append('phone', phone);
            formData.append('dob', dob);
            formData.append('address', address);
            formData.append('img', img.files[0]);
            formData.append('oldImg', oldImg);

            $.ajax({
                url: '/user/profile/edit',
                type: 'POST',
                contentType: false,
                processData: false,
                data: formData,
                success: function (response) {
                    $("#edit-profile__status").removeClass('d-none');
                    $("#edit-profile__status").addClass('alert-primary');
                    $("#edit-profile__status").html(response);
                },
                error: function (error) {
                    $("#edit-profile__status").removeClass('d-none');
                    $("#edit-profile__status").addClass('alert-danger');
                    $("#edit-profile__status").html(error);
                },
                complete: function () {
                    $("#overlay").addClass('d-none');
                }
            })
        });
    })
}

function jsInUser() {
    // add
    $(document).ready(() => {
        $("#btn_add").click(() => {
            var firstname = $("#firstNameBackdrop").val();
            var lastname = $("#lastNameBackdrop").val();
            var phone = $("#phoneBackdrop").val();
            var email = $("#emailBackdrop").val();
            var gender = $("#genderBackdrop").val();
            var dob = $("#dobBackdrop").val();
            var address = $("#addressBackdrop").val();

            $.ajax({
                url: '/user/add',
                contentType: 'application/json',
                type: 'POST',
                data: JSON.stringify({
                    firstname: firstname,
                    lastname: lastname,
                    phone: phone,
                    email: email,
                    gender: gender,
                    dob: dob,
                    address: address,
                }),
                success: function (response) {
                    $("#add-user__status").removeClass('d-none');
                    $("#add-user__status").addClass('alert-primary');
                    $("#add-user__status").html(response);
                },
                error: function (error) {
                    $("#add-user__status").removeClass('d-none');
                    $("#add-user__status").removeClass('alert-danger');
                    $("#add-user__status").html(error);
                },
                complete: function () {

                }

            })
        })
    });

    // edit, get data
    $(document).ready(() => {
        $(".btn-show-details").click(function () {
            var userId = $(this).data('user_id');
            var user_first_name = $(this).data('user_first_name');
            var user_last_name = $(this).data('user_last_name');
            var user_email = $(this).data('user_email');
            var user_phone = $(this).data('user_phone');
            var user_address = $(this).data('user_address');
            var user_gender = $(this).data('gender');
            var dob = $(this).data('dob');
            var user_account_id = $(this).data('user_account_id');
            var old_email = $(this).data('user_email');

            console.log(user_gender);
            $("#user_id_edit").val(userId);
            $("#firstName_edit").val(user_first_name);
            $("#lastName_edit").val(user_last_name);
            $("#phone_edit").val(user_phone);
            $("#email_edit").val(user_email);
            $("#gender_edit").val(user_gender);
            $("#dob_edit").val(dob);
            $("#address_edit").val(user_address);
            $("#old_email_edit").val(old_email);
        });
    });

    // edit, ajax
    $(document).ready(() => {
        $('#btn_edit').click(() => {
            var user_id = $("#user_id_edit").val();
            var firstname = $("#firstName_edit").val();
            var lastname = $("#lastName_edit").val();
            var phone = $("#phone_edit").val();
            var email = $("#email_edit").val();
            var gender = $("#gender_edit").val();
            var dob = $("#dob_edit").val();
            var address = $("#address_edit").val();
            var old_mail = $("#old_email_edit").val();

            $.ajax({
                url: '/user/edit?_method=PUT',
                contentType: 'application/json',
                type: 'POST',
                data: JSON.stringify({
                    user_id: user_id,
                    firstname: firstname,
                    lastname: lastname,
                    phone: phone,
                    email: email,
                    gender: gender,
                    dob: dob,
                    address: address,
                    old_mail: old_mail
                }),
                success: function (response) {
                    $("#edit-user__status").removeClass('d-none');
                    $("#edit-user__status").addClass('alert-primary');
                    $("#edit-user__status").html(response);
                },
                error: function (error) {
                    $("#edit-user__status").removeClass('d-none');
                    $("#edit-user__status").addClass('alert-danger');
                    $("#edit-user__status").html(error);
                }
            })

        })
    });

    // delete
    $(document).ready(() => {
        $(".btn-show-delete").click(function () {
            var userId = $(this).data('user_id');
            var user_first_name = $(this).data('user_first_name');
            var user_last_name = $(this).data('user_last_name');

            console.log(user_first_name);
            console.log(user_last_name);

            $("#user_id_delete").val(userId);
            $(".user-delete__para").html(`Are you sure to delete user '${user_first_name} ${user_last_name}'?`);
        });
    });

    // delete, ajax
    $(document).ready(() => {
        $("#btn_delete").click(() => {
            var userId = $("#user_id_delete").val();
            $.ajax({
                url: '/user/delete?_method=DELETE',
                type: 'POST',
                contentType: 'application/json',
                data: JSON.stringify({
                    userId: userId,
                }),
                success: function (response) {
                    $("#delete-user__status").removeClass('d-none');
                    $("#delete-user__status").addClass('alert-primary');
                    $("#delete-user__status").html(response);
                },
                error: function (error) {
                    $("#delete-user__status").removeClass('d-none');
                    $("#delete-user__status").addClass('alert-danger');
                    $("#delete-user__status").html(error);
                }
            })
        })
    })
}

function jsInHome() {
    fetch('/user/profile/info')
        .then(response => {
            return response.json();
        })
        .then(data => {
            var user_img = data.user_img;
            var user_first_name = data.user_first_name;
            var user_last_name = data.user_last_name;
            $("#userImgHome").attr('src', user_img);
            $("#userImgHome_2").attr('src', user_img);
            $("#userNameHome").html(`${user_first_name} ${user_last_name}`);
        })
        .catch(err => {
            console.log(err);
        })
}

function jsInAccount() {
    // reset
    $(document).ready(() => {
        $(".btn-show-reset").click(function () {
            var account_id = $(this).data('account_id');
            var user_email = $(this).data('user_email');
            var user_name = $(this).data('user_name');

            $("#account_id_reset").val(account_id);
            $("#email_reset").val(user_email);
            $(".account-reset__para").html(`Are you sure to reset '${user_name}' account password ?`)
        })
    });

    // reset, ajax
    $(document).ready(() => {
        $("#btn_reset").click(function(){
            var account_id = $("#account_id_reset").val();
            var user_email = $("#email_reset").val();

            $.ajax({
                url: '/account/reset_password?_method=PUT',
                type: 'POST',
                contentType: 'application/json',
                data: JSON.stringify({
                    account_id: account_id,
                    user_email: user_email,
                }),
                success: function(response){
                    $("#reset-user__status").removeClass('d-none');
                    $("#reset-user__status").addClass('alert-primary');
                    $("#reset-user__status").html(response);
                },
                error: function(error){
                    $("#reset-user__status").removeClass('d-none');
                    $("#reset-user__status").addClass('alert-danger');
                    $("#reset-user__status").html(error);
                },
                complete: function(){

                }
            })
        })
    })

    // send mail
    $(document).ready(() => {
        $(".btn-show-send-mail").click(function () {
            var account_id = $(this).data('account_id');
            var user_email = $(this).data('user_email');
            var user_name = $(this).data('user_name');

            $("#account_id_send").val(account_id);
            $("#email_send").val(user_email);
            $(".account-send-mail__para").html(`Send verification mail to '${user_name}' account ?`)
        })
    });

    // reset, ajax
    $(document).ready(() => {
        $("#btn_send").click(function(){
            var account_id = $("#account_id_send").val();
            var user_email = $("#email_send").val();

            $.ajax({
                url: '/account/send_mail?_method=PUT',
                type: 'POST',
                contentType: 'application/json',
                data: JSON.stringify({
                    account_id: account_id,
                    email: user_email,
                }),
                success: function(response){
                    $("#send-user__status").removeClass('d-none');
                    $("#send-user__status").addClass('alert-primary');
                    $("#send-user__status").html(response);
                },
                error: function(error){
                    $("#send-user__status").removeClass('d-none');
                    $("#send-user__status").addClass('alert-danger');
                    $("#send-user__status").html(error);
                },
                complete: function(){

                }
            })
        })
    })

}