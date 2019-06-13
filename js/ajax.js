
//$("#all-result").click(function () {

        //$("#result").hide();
    /*$(function(){
        var $datas = $('#all-result');
        
        $.ajax({
            type: 'GET',
            url: '/database.php',
            success: function(datas){
                //console.log('success');
                //$.each(datas, function(i, data){
                    //$datas.append('<li>Liste</li>')
                });
            }
            
        });
    }); */


     /*$(function(){
        $.ajax({
           type: 'GET',
            url: 'database.php',
            data: {'author': author, 'message': message},
            success: function(){
                console.log('Success');
            }
        });
     });*/   
        


        
/*$(function(){
        $.ajax({
            url: 'database.php',
            type: 'GET',
            data: {
                'pseudo': pseudo, 'score': score, 'chrono' : stopChrono, 'date' : date,  //global variable
            },
            success: function (response) {

                $("#all-result").show();
                console.log("Connexion Ajax établie avec succès!");

                var result = JSON.parse(response);

                document.getElementById("pseudoResult").innerHTML = result.pseudo;
                document.getElementById("scoreResult").innerHTML = result.score;
                //document.getElementById("timeResult").innerHTML = result.time;
                // document.getElementById("dateResult").innerHTML = response.date;

            },

            error: function () {

                console.log("Quelque chose a échoué avec Ajax! ");
            }


        });  //end ajax request
    });*/

/*function encodingScore(){
    var
    $.ajax({
        url : "insert.php",
        type : "POST",
        data: {"pseudo" : player, "score" : this.score, "chrono": game.stopChrono}, //joueur, scoreFinal, chronoArret sont les variables
        success: function(response){
            
        },
    });
}*/
/*function Send_Data(){
    var input=document.getElementById('input').value;
    
    var httpr = new XMLHttpRequest();
    httpr.open('POST', '../database.php', true);
    httpr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    httpr.onreadystatechange = function(){
        if (httpr.readyState == 4 && httpr.status == 200){
            document.getElementById('response').innerHTML=httpr.responseText;
        }
    httpr.send('input' + input);
 }*/


/*Ajax
var ajax = new XMLHttpRequest();
var method = 'GET';
var url = '../database.php';
var asynchronous = true;

ajax.open(method, url, asynchronous);

Ajax request//
ajax.send();

//Response//
ajax.onreadystatechange = function(){
    if (this.readyState == 4 && this.status == 200){
        alert(this.responseText);
    }
}*/

/*$.ajax({
    url: '../database.php',
    type: 'GET',
    data: {'pseudo' : player, 'score' : score, 'chrone' : stopChrono},
    success: function (response){
        
        $('#button-r').click(function(){
            $('#result').hide(1000);
            $('#all-result').show();
        });
        
    }
});*/
/*var HttpRequest = new XMLHttpRequest();

HttpRequest.onreadystatechange = function(){
    console.log(HttpRequest);
}

HttpRequest.open('GET',  '/./databas.php', true);*/
