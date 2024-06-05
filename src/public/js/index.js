
function jsInProfile(){
    $(document).ready(() =>{
        $("#btn_save").click(function(){
            // var profile_id = $("#profile_id").val();
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
                success: function(response){
                    $("#edit-profile__status").removeClass('d-none');
                    $("#edit-profile__status").html(response);
                },
                error: function(error){
                    
                },
                complete: function(){
                    
                }
            })
        });
    })
}

function jsInHome(){
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