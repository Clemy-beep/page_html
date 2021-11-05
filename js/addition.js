function showAddition() {
    $.ajax({
        url: "../vues/addition.html",
        type: "GET",
        success: function(response) {
            document.getElementById("container").innerHTML = response;
        },
        error: function(response) {
            console.log(response);
        },
    });
}

// creer une fonction qui reçois deux chiffres et qui renvoit le resultat de leur multiplication
// mettez ce resultat dans une varaible nommée <resultat>
// appeler la fonction et afficher le resultat dans une div avec l'id <resultat>
// Afficher le resultat de la fonction dans un élément html

function addition(a = 0, b = 0) {
    let numero1 = document.getElementById("number_1").value;
    let numero2 = document.getElementById("number_2").value;
    let resultat = parseInt(numero1) + parseInt(numero2);
    // return $resultat;
    document.getElementById("resultat").innerHTML = "<small>" + numero1 + '+' + numero2 + " = " + "</small>" + "<p style='font-size:5rem'>" + resultat + "</p>";
}