/**
  @author Daniel Abad

  HGraph Structure G = (V,E)
 */

function HGraph(){
  this.vertices = [];
  this.edges = [];
}

//Method to add a Vertex to the Graph
HGraph.prototype.addVertex = function(vertex){
  this.vertices.push(vertex);
}

//Method to add an Edge to the Graph
HGraph.prototype.addEdge = function(vertex1,vertex2){
  var edge = new Edge(vertex1,vertex2);
  this.edges.push(edge);
  vertex1.links.push(vertex2);
  vertex2.links.push(vertex1);
}

//Constructor for Vertices, need for an id to uniquely identify
function Vertex(id){
  this.id = id;
  this.links = [];
}

//Constructor for Edges, simply a link between two vertices
function Edge(vertex1,vertex2){
  this.vertex1 = vertex1;
  this.vertex2 = vertex2;
}