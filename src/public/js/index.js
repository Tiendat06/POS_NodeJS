
function jsInProfile() {
    // edit, ajax
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
            var old_email = $("#old_email").val();
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
            formData.append('old_email', old_email);
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

function jsInEveryPage() {
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

function jsInProduct(){
    // add
    $(document).ready(() => {
        $("#btn_add").click(function(){
            $("#overlay").removeClass('d-none');
            var name = $("#name_add").val();
            var import_price = $("#import_price_add").val();
            var retail_price = $("#retail_add").val();
            var category = $("#category_add").val();
            var quantity = $("#quantity_add").val();
            var description = $("#description_add").val();
            var img = document.getElementById("img_add");

            var formData = new FormData();
            formData.append('name', name);
            formData.append('import_price', import_price);
            formData.append('retail_price', retail_price);
            formData.append('category', category);
            formData.append('quantity', quantity);
            formData.append('description', description);
            formData.append('img', img.files[0]);

            $.ajax({
                url: '/product/add',
                type: 'POST',
                data: formData,
                contentType: false,
                processData: false,
                success: function(response){
                    $("#add-product__status").removeClass('d-none');
                    $("#add-product__status").addClass('alert-primary');
                    $("#add-product__status").html(response);
                },
                error: function(error){
                    $("#add-product__status").removeClass('d-none');
                    $("#add-product__status").addClass('alert-danger');
                    $("#add-product__status").html(error);
                },
                complete: function(){
                    $("#overlay").addClass('d-none');
                }
            })
        })
    });

    // edit
    $(document).ready(() => {
        $(".btn-show-details").click(function() {
            var product_id = $(this).data('product_id');
            var product_name = $(this).data('product_name');
            var real_price = $(this).data('real_price');
            var retail_price = $(this).data('retail_price');
            var category_id = $(this).data('category_id');
            var product_description = $(this).data('product_description');
            var product_image = $(this).data('product_image');
            var public_id = $(this).data('image_public_id');
            var quantity = $(this).data('quantity')

            $("#product_id_edit").val(product_id);
            $("#product_img_edit").val(product_image);
            $("#public_id_edit").val(public_id);
            $("#name_edit").val(product_name);
            $("#import_price_edit").val(real_price);
            $("#retail_edit").val(retail_price);
            $("#category_edit").val(category_id);
            $("#quantity_edit").val(quantity);
            $("#description_edit").val(product_description);
        })
    });

    // edit, ajax
    $(document).ready(() => {
        $("#btn_edit").click(function() {
            $('#overlay').removeClass('d-none');
            var id = $("#product_id_edit").val();
            var img = $("#product_img_edit").val();
            var public_id_edit = $("#public_id_edit").val();
            var name = $("#name_edit").val();
            var import_price = $("#import_price_edit").val();
            var retail_price = $("#retail_edit").val();
            var category = $("#category_edit").val();
            var quantity = $("#quantity_edit").val();
            var description = $("#description_edit").val();
            var new_img = document.getElementById('img_edit');

            var formData = new FormData();
            formData.append('id', id);
            formData.append('old_img', img);
            formData.append('public_id', public_id_edit);
            formData.append('name', name);
            formData.append('import_price', import_price);
            formData.append('retail_price', retail_price);
            formData.append('category', category);
            formData.append('quantity', quantity);
            formData.append('description', description);
            formData.append('img', new_img.files[0]);

            $.ajax({
                url: '/product/edit?_method=PUT',
                type: 'POST',
                data: formData,
                contentType: false,
                processData: false,
                success: function(response){
                    $("#edit-product__status").removeClass('d-none');
                    $("#edit-product__status").addClass('alert-primary');
                    $("#edit-product__status").html(response);
                },
                error: function(error){
                    $("#edit-product__status").removeClass('d-none');
                    $("#edit-product__status").addClass('alert-danger');
                    $("#edit-product__status").html(error);
                },
                complete: function(){
                    $('#overlay').addClass('d-none');
                }
            })
        })
    });

    // delete
    $(document).ready(() => {
        $('.btn-show-delete').click(function() {
            var product_id = $(this).data('product_id');
            var product_name = $(this).data('product_name');

            $('#product_id_delete').val(product_id);
            $('.product-delete__para').html(`Are you sure to delete '${product_name}' ?`);
        })
    });

    // delete, ajax
    $(document).ready(() => {
        $('#btn_delete').click(function(){
            var product_id = $('#product_id_delete').val();

            $.ajax({
                url: '/product/delete?_method=DELETE',
                type: 'POST',
                data: JSON.stringify({
                    product_id: product_id,
                }),
                contentType: 'application/json',
                success: function(response){
                    $("#delete-product__status").removeClass('d-none');
                    $("#delete-product__status").addClass('alert-primary');
                    $("#delete-product__status").html(response);
                },
                error: function(error){
                    $("#delete-product__status").removeClass('d-none');
                    $("#delete-product__status").addClass('alert-danger');
                    $("#delete-product__status").html(error);
                },
                complete: function(){

                }
            })

        })
    })
}

function jsInCustomer(){
    // show customer order
    $(document).ready(() => {
        $('.btn-show-customer-order').click(function() {
            var customer_id = $(this).data('customer_id');
            // console.log(customer_id);
            $.ajax({
                url: '/customer/view_order',
                type: 'POST',
                data: JSON.stringify({
                    customer_id: customer_id,
                }),
                contentType: 'application/json',
                success: function(response){
                    // console.log(response);
                    // console.log('hi world');
                    $('#customer-order__tbody').html(response);
                },
                error: function(error){
                    console.log(error);
                    // $('#customer-order__tbody').html(error);
                },
                complete: function(){
                    ajaxCompleteInCustomer();
                }
            })
        })
    });

    // edit customer
    $(document).ready(() => {
        $('.btn-show-details').click(function() {
            var customer_id = $(this).data('customer_id');
            var customer_first_name = $(this).data('customer_first_name');
            var customer_last_name = $(this).data('customer_last_name');
            var customer_email = $(this).data('customer_email');
            var customer_phone_number = $(this).data('customer_phone_number');
            var customer_address = $(this).data('customer_address');
            var customer_dob = $(this).data('customer_dob');
            var customer_gender = $(this).data('customer_gender');

            $('#customer_id_edit').val(customer_id);
            $('#firstName_edit').val(customer_first_name);
            $('#lastName_edit').val(customer_last_name);
            $('#email_edit').val(customer_email);
            $('#phone_edit').val(customer_phone_number);
            $('#address_edit').val(customer_address);
            $('#dob_edit').val(customer_dob);
            $('#gender_edit').val(customer_gender);
            $('#old_phone_edit').val(customer_phone_number);
        })
    });

    //edit customer ajax
    $(document).ready(() => {
        $('#btn_edit-customer').click(function() {
            var customer_id = $('#customer_id_edit').val();
            var customer_first_name = $('#firstName_edit').val();
            var customer_last_name = $('#lastName_edit').val();
            var customer_email = $('#email_edit').val();
            var customer_phone = $('#phone_edit').val();
            var customer_address = $('#address_edit').val();
            var customer_dob = $('#dob_edit').val();
            var customer_gender = $('#gender_edit').val();
            var customer_old_phone = $('#old_phone_edit').val();

            $.ajax({
                url: '/customer/edit?_method=PUT',
                type: 'POST',
                data: JSON.stringify({
                    customer_id: customer_id,
                    customer_first_name: customer_first_name,
                    customer_last_name: customer_last_name,
                    customer_email: customer_email,
                    customer_phone: customer_phone,
                    customer_address: customer_address,
                    customer_dob: customer_dob,
                    customer_gender: customer_gender,
                    customer_old_phone: customer_old_phone
                }),
                contentType: 'application/json',
                success: function(response){
                    $('#edit-customer__status').removeClass('d-none');
                    $('#edit-customer__status').addClass('alert-primary');
                    $('#edit-customer__status').html(response);
                },
                error: function(error){
                    $('#edit-customer__status').removeClass('d-none');
                    $('#edit-customer__status').addClass('alert-danger');
                    $('#edit-customer__status').html(error);
                },
                complete: function(){

                }
            })
        })
    });
}

function ajaxCompleteInCustomer(){

    // view customer order detail
    $(document).ready(() => {
        $('.btn-show-order-details').click(function() {
            var order_id = $(this).data('order_id');
            // console.log(order_id);

            $.ajax({
                url: '/customer/view_order_details',
                type: 'POST',
                data: JSON.stringify({
                    order_id: order_id
                }),
                contentType: 'application/json',
                success: function(response){
                    $('#customer-order-details__tbody').html(response);
                },
                error: function(error){
                    $('#customer-order-details__tbody').html(error);
                },
                complete: function(){

                }
            })
        })
    })
}

function jsInHome(){

    // choose quan
    $(document).ready(() => {
        $('.card-outer').click(function() {
            var product_id = $(this).data('product_id');
            $('#product_id_choose-quan').val(product_id);
        })
    });

    // delete oreder
    $(document).ready(() => {
        $('.home-delete_order').click(function() {
            var order_details_id = $(this).data('order_list_id');
            var order_No = $(this).data('order_no');

            $('#order_list_id_delete').val(order_details_id);
            $('#order_No_delete').val(order_No);
            $('.order-delete__para').html(`Are you sure to delete order ${order_No} ?`);
        })
    });

    // on input customer given
    $(document).ready(() => {
        $('#customer-given__inp').on('input', function() {
            var totalBill = $('#customer-given__total-bill').val();
            var customer_given = $('#customer-given__inp').val();
            var given_change = 0;
            // console.log(customer_given);
            if(customer_given !== undefined && customer_given !== ''){
                given_change = parseFloat(customer_given) - parseFloat(totalBill);
            }
            $('#given-change__inp').val(given_change);
            $('.given-change__price').html(`${given_change} $`);
        })
    });

    // add customer
    $(document).ready(() => {
        $('#btn_add-customer').click(function() {
            var firstname = $('#firstNameBackdrop').val();
            var lastname = $('#lastNameBackdrop').val();
            var phone = $('#phoneBackdrop').val();
            var email = $('#emailBackdrop').val();
            var gender = $('#genderBackdrop').val();
            var dob = $('#dobBackdrop').val();
            var address = $('#addressBackdrop').val();
    
            $.ajax({
                url: '/home/add_customer',
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
                contentType: 'application/json',
                success: function(response){
                    $("#add-customer__status").removeClass('d-none');
                    $("#add-customer__status").addClass('alert-primary');
                    $("#add-customer__status").html(response);            },
                error: function(error){
                    $("#add-customer__status").removeClass('d-none');
                    $("#add-customer__status").addClass('alert-danger');
                    $("#add-customer__status").html(error);   
                },
                complete: function(){
    
                }
            })
        })
    });
    
    // find customer by phone
    $(document).ready(() => {
        $('#button__find-customer').click(function() {
            var customer_phone_number = $('#customer-phone__inp').val();

            $.ajax({
                url: '/home/find_customer_by_phone',
                type: 'POST',
                data: JSON.stringify({
                    customer_phone: customer_phone_number
                }),
                contentType: 'application/json',
                success: function(response){
                    // console.log(response);
                    // $('#customer-info-home').removeClass('d-none');
                    $('#customer-info-home').html(response);
                },
                error: function(error){
                    // $('#customer-info-home').removeClass('d-none');
                    console.log(error);
                    console.log('error');
                    $('#customer-info-home').html(error);
                },
                complete: function(){
                    ajaxCompleteInHome()

                }
            })
        })
    });

    // fill payment info
    $(document).ready(() => {
        $('#btn_payment').click(function(){
            var payemnt_method = $('[name="btnradio"]:checked').val();
            var totalBill = $('#customer-given__total-bill').val();
            var customer_given = $('#customer-given__inp').val();
            var given_change = 0;

            if(customer_given !== undefined && customer_given !== ''){
                given_change = parseFloat(customer_given) - parseFloat(totalBill);
            } else{
                customer_given = 0;
            }
            $('.backdrop__total-bill').html(`Total bill: ${totalBill} $`);
            $('.backdrop__customer-given').html(`Customer given: ${customer_given} $`);
            $('.backdrop__given-change').html(`Given change: ${given_change} $`);
            $('.backdrop__payment-method').html(`Payment method: ${payemnt_method}`);
            // console.log(payemnt_method);
        })
    });

    // save payment
    $(document).ready(() => {
        $('#btn_save-pay').click(function(){
            var payemnt_method = $('[name="btnradio"]:checked').val();
            var customer_phone_number = $('#customer-phone__inp').val();
            var totalBill = $('#customer-given__total-bill').val();
            var customer_given = $('#customer-given__inp').val();
            if(customer_phone_number == undefined || customer_phone_number == ''){
                customer_phone_number = '';
            }
            if(customer_given == undefined || customer_given == '' || parseFloat(customer_given) < parseFloat(totalBill)){
                $('#toast').removeClass('d-none');
                $('#toast').addClass('bg-danger');
                setTimeout(function(){
                    $('#toast').addClass('d-none');
                    $('#toast').removeClass('bg-danger');
                }, 5000);
            }else{
                var given_change = parseFloat(customer_given) - parseFloat(totalBill);
                $.ajax({
                    url: '/home/home_payment',
                    type: 'POST',
                    data: JSON.stringify({
                        customer_phone_number: customer_phone_number,
                        totalBill: totalBill,
                        given_change: given_change,
                        customer_given: customer_given,
                        payemnt_method: payemnt_method
                    }),
                    contentType: 'application/json',
                    success: function(response){
                        $("#pay-order__status").removeClass('d-none');
                        $("#pay-order__status").addClass('alert-primary');
                        $("#pay-order__status").html(response);
                        setTimeout(function(){
                            location.reload();
                        }, 5000);
                    },
                    error: function(error){
                        $("#pay-order__status").removeClass('d-none');
                        $("#pay-order__status").removeClass('alert-danger');
                        $("#pay-order__status").html(error);
                    },
                    complete: function(){

                    }
                })
            }
        })
    });


    // order after choose quan
    // $(document).ready(() => {
    //     $("#btn_choose-quan").click(function() {
    //         var quantity = $('#chooseQuantityBackdrop').val();
    //         var product_id = $('#product_id_choose-quan').val();

    //         $.ajax({
    //             url: '/home/order',
    //             type: 'POST',
    //             data: JSON.stringify({
    //                 product_id: product_id,
    //                 quantity: quantity
    //             }),
    //             contentType: 'application/json',
    //             success: function(response){
    //                 $('#payment-info__order-list').html(response);
    //             },
    //             error: function(error){

    //             },
    //             complete: function(){

    //             }
    //         })
    //     })
    // })
}

function ajaxCompleteInHome(){

}