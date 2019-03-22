function depositQuantity() {
    var agentDetails = sessionStorage.getItem('userId');
    var quantity = document.getElementById("depositAmt").value;
    if (quantity.length === 0) {
        alert("Please enter some quantity");
    } else {
        $.post('/deposit', { userId: agentDetails, stock: quantity },
            function (data, textStatus, jqXHR) {
                window.location.href="/stock";
            },
            'json');
    }
}

function requestQuantity(){
    var agentDetails = sessionStorage.getItem('userId');
    var beneficiary = document.getElementById('beneficiaryUserId').value;
    var quantity = document.getElementById("transferQty").value;
    if (quantity.length === 0) {
        alert("Please enter quantity");
	}
    if(beneficiary.length === 0){
        alert("Please Enter the beneficiary"); 
	}
    if(quantity.length != 0 && beneficiary.length != 0) {
        $.post('/request', { userId: agentDetails, beneficiary: beneficiary, stock: quantity },
            function (data, textStatus, jqXHR) {
                window.location.href="/stock";
            },
            'json');
    }
}

function transferQuantity() {
    var agentDetails = sessionStorage.getItem('userId');
    var beneficiary = document.getElementById('beneficiaryUserId').value;
    var quantity = document.getElementById("transferQty").value;
    if (quantity.length === 0) {
        alert("Please enter quantity");
	}
    if(beneficiary.length === 0){
        alert("Please Enter the beneficiary"); 
	}
    if(quantity.length != 0 && beneficiary.length != 0) {
        $.post('/transfer', { userId: agentDetails, beneficiary: beneficiary, stock: quantity },
            function (data, textStatus, jqXHR) {
                window.location.href="/stock";
            },
            'json');
    }
}

function showStock() {
    $(".nav").find(".active").removeClass("active");
    $('#balance').addClass("active");    

    var userId = sessionStorage.getItem('userId');
    $.post('/stock', { userId: userId },
         function (data, textStatus, jqXHR) {
              document.getElementById("stockCheck").innerHTML ="Your stock is:" + "<br />" + data.stock; 
            },
            'json'); 
}

function homePageLoaded() {
    $(".nav").find(".active").removeClass("active");
    $('#home').addClass("active");    
}


function wholesalePageLoaded() {
    $(".nav").find(".active").removeClass("active");
    $('#transfer').addClass("active");    
}

function retailerPageLoaded() {
    $(".nav").find(".active").removeClass("active");
    $('#transfer').addClass("active");    
}


function retailPageLoaded() {
    $(".nav").find(".active").removeClass("active");
    $('#deposit').addClass("active");    
}
