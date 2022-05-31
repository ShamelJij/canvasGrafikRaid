var canvas = document.getElementById("grafik");
var partitionen = 4;
var platten = 4 ;
if (canvas && canvas.getContext){
    var context = canvas.getContext("2d");
    context.canvas.width = 80*platten;
    context.canvas.height = 80 + 40*partitionen;
    raid0(context, platten, partitionen);
    
}

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

function raid0(context, platten, partitionen){
    for (let p = 0; p < platten; p++){
                    for (let r = partitionen; r > 0; r--){
                            partitionZeichnen(context, p, r, "A"+ ((r-1)*platten + p));
                    }
            }
    verbindungsLinie(context, 0, platten-1, 1);
    context.fillStyle = "#000000";
    context.font = '15pt serif';
    context.fillText("Raid 1", 20 + 40*(platten-1), 50);
}