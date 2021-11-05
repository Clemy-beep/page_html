function showSubstraction() {
    $.ajax({
        url: "../vues/substraction.html",
        type: "GET",
        success: function(response) {
            document.getElementById("container").innerHTML = response;
        },
        error: function(response) {
            console.log(response);
        },
    });
}

function substraction(a = 0, b = 0) {
    let numero1 = document.getElementById("number_1").value;
    let numero2 = document.getElementById("number_2").value;
    let resultat = parseInt(numero1) - parseInt(numero2);
    // return $resultat;
    document.getElementById("resultat").innerHTML = "<small>" + numero1 + '-' + numero2 + " = " + "</small>" + "<p style='font-size:5rem'>" + resultat + "</p>";
}