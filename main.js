const WIDTH_VIS_1 = 300;
const HEIGHT_VIS_1 = 200;

const SVG1 = d3.select("#vis-1").append("svg")
    .attr("width", WIDTH_VIS_1)
    .attr("height", HEIGHT_VIS_1);

SVG1
.append("image")
    .attr("x", 0) // Posición X de la imagen
    .attr("y", 0) // Posición Y de la imagen
    .attr("width", 300) // Ancho de la imagen
    .attr("height", 200) // Altura de la imagen
    .attr("xlink:href", "pikachu.jpg"); // Ruta de la imagen PNG