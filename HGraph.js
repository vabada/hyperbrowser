/**
  @author Daniel Abad

  HGraph Structure G = (V,E)
 */

function HGraph(){
  this.vertices = [];
  //this.edges = [];
}

//Method to add a Vertex to the Graph
HGraph.prototype.addVertex = function(son,parent){
  this.vertices.push(son);
  parent.linksTo.push(son);
  son.linksFrom.push(parent);
}

//Constructor for Vertices, need for an id to uniquely identify
function Vertex(id){
  this.id = id;
  this.linksTo = [];
  this.linksFrom = [];
}

//Method to add an Edge to the Graph
//HGraph.prototype.addEdge = function(son,parent){
  //var edge = new Edge(son,parent);
  //this.edges.push(edge);
  //vertex1.links.push(vertex2);
  
//}

//Constructor for Edges, simply a link between two vertices
//function Edge(vertex1,vertex2){
  //this.vertex1 = vertex1;
  //this.vertex2 = vertex2;
//}

//Function that creates a random Graph (to be modified when DB available)
function createRandomGraph(maxChildren,minChildren,depthLevel) {

  //default parameters
  var maxChildren = maxChildren || 4;
  var minChildren = minChildren || 2;
  var depthLevel = depthLevel || 4;

  //create the HGraph
  var graph = new HGraph();

  //create first vertex and add it to the HGraph
  var id = 0;
  var vertex = new Vertex(id);
  graph.vertices.push(vertex);
  graph.vertices[id].id=id;
  id++;

  //add random number of children to the node
  var numChildren = Math.floor(Math.random() * (maxChildren-minChildren+1) + minChildren);
  for (var i=0 ; i<numChildren ; i++){
    addChild(vertex,depthLevel-1);
  }

  //add a child to the parent
  function addChild(parent,prof){
    if (prof>=0){
      var vertix = new Vertex(id);
      graph.addVertex(vertix,parent);
      graph.vertices[id].id=id;
      id++;
      var numiChildren = Math.floor(Math.random() * (maxChildren-minChildren+1) + minChildren);
      for (var i=0 ; i<numiChildren ; i++){
        addChild(vertix,prof-1);                    
      }
    }
  }
  //console.log("Creating hypergraph with "+graph.vertices+" nodes");  
  return graph;
}