function getMore() {
    'use strict';
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (xhttp.readyState === 4 && xhttp.status === 200) {
            document.getElementById("ajax_first_target").innerHTML = xhttp.responseText;
        }
    };

    xhttp.open("POST", "text.txt", true);
    xhttp.send();
}

function getImageSabi() {
    'use strict';
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (xhttp.readyState === 4 && xhttp.status === 200) {
            document.getElementById("sabi_cont").innerHTML = '<img id="img_cat" src="Sabi.jpg"></img><style>#img_cat {position: relative; left: 50%;} </style>' + xhttp.responseText;
        }
    };

    xhttp.open("POST", "text2.txt", true);
    xhttp.send();
}


function setColor() {
    'use strict';
    document.getElementById("butbut").style.opacity = 0.5;
}