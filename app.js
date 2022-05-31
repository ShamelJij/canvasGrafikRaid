//-------------------------------RAID RECHNER----------------------
let kapazitaeten = [500, 1000, 2000, 5000, 10000];
let kText = ["500GB", "1TB", "2TB", "5TB", "10TB"];
let anzahl = document.getElementById("anzahl");
let kapazitaet = document.getElementById("kapazitaet");
let nichtErlaubt = [[]]
let effizienz;
let rest;

function erfassen(){
    $(`#myChart`).remove();
    $(`#pieChart`).append('<canvas id="myChart"></canvas>');
    document.getElementById("anzahlText").innerHTML = anzahl.value;
    document.getElementById("kapazitaetText").innerHTML = kText[kapazitaet.value];
    document.getElementById("anzahlText").classList = "text-dark";

    var partitionen = 4;
    var canvas = document.getElementById("grafik");
    var platten = anzahl.value;
    var context = canvas.getContext("2d");
    context.canvas.width = 80*platten;
    context.canvas.height = 80 + 60*partitionen;
    context.clearRect(0, 0, canvas.width, canvas.height);

    switch (document.getElementById("level").value){
        case "0":
            raid0(context, platten, partitionen);
        break;
        case "1":
            if(anzahl.value % 2 == 0){
                //document.getElementById("anzahl").value = Math.round(document.getElementById("anzahl").value*0.5)*2;
                //document.getElementById("anzahlText").value  += Math.round(document.getElementById("anzahl").value*0.5)*2;
                //todo: nur grade Zahlen . alert (red alert) darf nur gerade Zahlen
                raid1(context, platten, partitionen);
            }
        break;
        case "5":
            partitionen = platten;
            if(anzahl.value <= 3){
                document.getElementById("anzahlText").classList = "text-danger";
            }else{
                raid5(context, platten, partitionen);
            }
        break;
        case "6":
            if(anzahl.value <= 4){
                document.getElementById("anzahlText").classList = "text-danger";
            }
        break;
        case "10":
            if(anzahl.value % 2 != 0){
                document.getElementById("anzahlText").classList = "text-danger";
            }
        break;
        default:
    }
    
}

function ausrechnen(){
    $(`#myChart`).remove();
    $(`#pieChart`).append('<canvas id="myChart"></canvas>');
    let brutto = anzahl.value * kapazitaeten[kapazitaet.value];
    document.getElementById("brutto").innerHTML = brutto;
    switch (document.getElementById("level").value){
        case "0":
            netto = brutto;
        break;
        case "1":
            netto = brutto/2;
        break;
        case "5":
            if(anzahl.value >= 3){
                netto = (anzahl.value-1) * kapazitaeten[kapazitaet.value];
            }
            else{
                netto = 0;
            }
        break;
        case "6":
            if(anzahl.value >= 4){
                netto = (anzahl.value-2) * kapazitaeten[kapazitaet.value];
            }
            else{
                netto = 0;
            }
        break;
        case "10":
            netto = brutto/2;
        break;
        default:
            netto = brutto;
    }
        if(netto > 0 )
        {
            document.getElementById("netto").innerHTML = netto + " TB"
        }else{
            document.getElementById("netto").innerHTML = "Nicht genügend Platten!";
        }
    effizienz = netto/brutto*100;
    effizienz = effizienz.toFixed(2);
    document.getElementById("effizienz").innerHTML = effizienz +" %";
    rest = 100-effizienz;
    console.log(rest);
}

// Canvas Chart
function chart(){
    var ctx = document.getElementById("myChart").getContext('2d');
    var myChart = new Chart(ctx, {
    type: 'pie',
    data: {
        labels: ['Effizient', 'nicht verwendet'],
        datasets: [{
        data: [effizienz, rest],
        backgroundColor: [
            'rgba(41, 121, 255, 1)',
            'rgba(38, 198, 218, 1)',
            'rgba(138, 178, 248, 1)',
            'rgba(255, 100, 200, 1)',
            'rgba(116, 96, 238, 1)',
            'rgba(215, 119, 74, 1)',
            'rgba(173, 92, 210, 1)',
            'rgba(255, 159, 64, 1)',
            'rgba(247, 247, 247, 1)',
            'rgba(227, 247, 227, 1)',
        ],
        }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            cutoutPercentage: 80,
            tooltips: {
            callbacks: {
                label: function(tooltipItem, data) {
                return data['labels'][tooltipItem['index']] + ': ' + data['datasets'][0]['data'][tooltipItem['index']] + '%';
                }
            }
            }
        }
    });
}

//-------------------------------RAID CANVAS------------------------

function raid1(context, platten, partitionen){
    for (let p = 0; p < platten; p++){
                    for (let r = partitionen; r > 0; r--){
                            partitionZeichnen(context, p, r, "A"+r);
                    }
            }
    verbindungsLinie(context, 0, platten-1, 1);
    context.fillStyle = "#000000";
    context.font = '15pt serif';
    context.fillText("Raid 1", 20 + 40*(platten-1), 50);
}

function raid0(context, platten, partitionen){
    for (let p = 0; p < platten; p++){
                    for (let r = partitionen; r > 0; r--){
                            partitionZeichnen(context, p, r, "A"+ ((r-1)*platten + p));
                    }
            }
    verbindungsLinie(context, 0, platten-1, 1);
    context.fillStyle = "#000000";
    context.font = '15pt serif';
    context.fillText("Raid 0", 20 + 40*(platten-1), 50);
}

function verbindungsLinie(context, x1, x2, y){
    context.beginPath();
    context.moveTo(35+80*x1, 40+24*y);
    context.lineTo(35+80*x2, 40+24*y);
    for(let i = x1; i <= x2; i++){
        context.moveTo(35+80*i, 40+24*y);
        context.lineTo(35+80*i, 40+24*y+25);
    }
    context.stroke();
}

function partitionZeichnen(context, x, y, text, farbe = "#9999ff", farbe2 = "#0000ff"){
    context.fillStyle = farbe;
    context.fillRect(10+80*x, 70+24*y, 50, 20);
    context.beginPath();
    context.ellipse(35+80*x, 88+24*y, 25, 10, 0, 0, Math.PI*2);
    //context.stroke();
    context.fill();

    context.fillStyle = farbe2;
    context.beginPath();
    context.ellipse(35+80*x, 70+24*y, 25, 10, 0, 0, Math.PI*2);
    //context.stroke();
    context.fill();

    context.fillStyle = "#000000";
    context.font = '12pt serif';
    context.fillText(text, 25+80*x, 92+24*y);
}

//---------------------RAID5----------------

function raid5(context, platten, partitionen){
    
    for (let p = 0; p < platten; p++){
                    for (let r = partitionen; r > 0; r--){
                        if((r - 1) != p){
                            partitionZeichnen(context, p, r, String.fromCharCode(64 + r) + p);
                        }
                    }
            }
    verbindungsLinie(context, 0, platten-1, 1);
    context.fillStyle = "#000000";
    context.font = '15pt serif';
    context.fillText("Raid 1", 20 + 40*(platten-1), 50);
}