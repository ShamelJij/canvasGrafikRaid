var canvas = document.getElementById("grafik");
var partitionen = 4;
var platten = 2;
if (canvas && canvas.getContext){
    var context = canvas.getContext("2d");
    partitionZeichnen(context, 0, 3, "A4");
    partitionZeichnen(context, 0, 2, "A3");
    partitionZeichnen(context, 0, 1, "A2");
    partitionZeichnen(context, 0, 0, "A1");
    partitionZeichnen(context, 1, 3, "A4");
    partitionZeichnen(context, 1, 2, "A3");
    partitionZeichnen(context, 1, 1, "A2");
    partitionZeichnen(context, 1, 0, "A1");
    partitionZeichnen(context, 2, 0, "A1");
    verbindungsLinie(context, 0, 2, 0);
}

function verbindungsLinie(context, x1, x2, y){
    context.beginPath();
    context.moveTo(35+80*x1, 40+24*y);
    context.lineTo(35+80*x2, 40+24*y);
    context.stroke();
}

function partitionZeichnen(context, x, y, text){
    context.fillStyle = "#9999ff";
    context.fillRect(10+80*x, 70+24*y, 50, 20);
    context.beginPath();
    context.ellipse(35+80*x, 88+24*y, 25, 10, 0, 0, Math.PI*2);
    //context.stroke();
    context.fill();

    context.fillStyle = "#0000ff";
    context.beginPath();
    context.ellipse(35+80*x, 70+24*y, 25, 10, 0, 0, Math.PI*2);
    //context.stroke();
    context.fill();

    context.fillStyle = "#000000";
    context.font = '12pt serif';
    context.fillText(text, 25+80*x, 92+24*y);
}

// var services = ["paragraphs", "paragraphs", "paragraphs", "paragraphs", "paragraphs", "paragraphs", "paragraphs"];

//   function serviceCircle() {
//     var canvas = document.getElementById("wheelcanvas");
//     if (canvas.getContext) {
//       var outsideRadius = 360;
//       var textRadius = 280;
//       var insideRadius = 220;

//       ctx = canvas.getContext("2d");
//       ctx.clearRect(0,0,720,720); // 720 - 360 - 180 (500 - 250)


//       ctx.strokeStyle = "#fff";
//       ctx.lineWidth = 5;

//       ctx.font = 'bold 18px Tahoma';

//       for(var i = 0; i < 7; i++) {
//         var angle = startAngle + i * arc;
//         ctx.fillStyle = "#ffc000";

//         ctx.translate(360 + Math.cos(angle + arc / 2) * textRadius, 360 + Math.sin(angle + arc / 2) * textRadius);
//         // ctx.rotate(angle + arc / 2 + Math.PI / 2);
//         var text = services[i];
//         ctx.fillText(text, -ctx.measureText(text).width / 2, 0);
//         ctx.restore();
//       } 

//       //Arrow
//       ctx.fillStyle = "#fff";
//       ctx.beginPath();
//       ctx.moveTo(250 - 4, 250 - (outsideRadius + 5));
//       ctx.lineTo(250 + 4, 250 - (outsideRadius + 5));
//       ctx.lineTo(250 + 4, 250 - (outsideRadius - 5));
//       ctx.lineTo(250 + 9, 250 - (outsideRadius - 5));
//       ctx.lineTo(250 + 0, 250 - (outsideRadius - 13));
//       ctx.lineTo(250 - 9, 250 - (outsideRadius - 5));
//       ctx.lineTo(250 - 4, 250 - (outsideRadius - 5));
//       ctx.lineTo(250 - 4, 250 - (outsideRadius + 5));
//       ctx.fill();
//     }
//   }

// var canvas = document.getElementById("cylinder");
// var ctx = canvas.getContext("2d");
// drawCylinder(canvas, ctx, "lightblue", "black", 2);
// function drawCylinder(canvas, ctx, fill, border, lineWidth)
// {
// 		canvas.width = 160;
//     canvas.height = 175;
//     ctx.translate(25,0);
//     ctx.fillStyle = fill;
//     ctx.lineWidth = lineWidth;
//     ctx.lineCap = "round";
//     ctx.lineJoin = "round";
//     ctx.beginPath();
//     ctx.moveTo(97.0, 156.7);
//     ctx.lineTo(97.0, 17.7);
//     ctx.lineTo(1.0, 17.7);
//     ctx.lineTo(1.0, 156.7);
//     ctx.lineTo(97.0, 156.7);
//     ctx.closePath();
//     ctx.fill();
//     ctx.stroke();
    
//     // layer1/Group/Path
//     ctx.beginPath();
//     ctx.moveTo(96.7, 156.2);
//     ctx.bezierCurveTo(96.7, 165.3, 75.4, 172.7, 49.0, 172.7);
//     ctx.bezierCurveTo(22.7, 172.7, 1.4, 165.3, 1.4, 156.2);
//     ctx.bezierCurveTo(1.4, 147.2, 22.7, 139.8, 49.0, 139.8);
//     ctx.bezierCurveTo(75.4, 139.8, 96.7, 147.2, 96.7, 156.2);
//     ctx.closePath();
//     ctx.fill();
//     ctx.stroke();

//     // layer1/Group/Path
//     ctx.beginPath();
//     ctx.moveTo(96.7, 17.4);
//     ctx.bezierCurveTo(96.7, 26.5, 75.4, 33.8, 49.0, 33.8);
//     ctx.bezierCurveTo(22.7, 33.8, 1.4, 26.5, 1.4, 17.4);
//     ctx.bezierCurveTo(1.4, 8.4, 22.7, 1.0, 49.0, 1.0);
//     ctx.bezierCurveTo(75.4, 1.0, 96.7, 8.4, 96.7, 17.4);
//     ctx.closePath();
//     ctx.fill();
//     ctx.stroke();
// }