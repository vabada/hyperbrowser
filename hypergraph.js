/**
  @author Daniel Abad

  HGraph Structure G = (V,E)
 */

/*
 * HGraph graph with tree structure
 */
function HGraph(){
  this.vertices = [];
}

/* Function to add a Vertex to the HGraph
 *
 * @param son vertex linked from the parent
 * @param parent vertex linking the son
 */
HGraph.prototype.addVertex = function(son,parent){
  this.vertices.push(son);
  parent.linksTo.push(son);
  son.linksFrom.push(parent);
}

/*
 * Function that sets the property processed to false for every vertex
 */
HGraph.prototype.resetProcessed = function(){
  for (var i = 0 ; i < this.vertices.length ; i++) {  
    this.vertices[i].processed=false;
  }
}

/*
 * Function to find out the number of nodes
 *
 * @return this.vertices.length number of nodes
 */
HGraph.prototype.numberOfNodes = function(){
  return this.vertices.length;
}

/* Function that evaluates the not processed (drawn) links for vertex
 *
 * @param id node for which we want to get the links
 * @return links array with the not processed links
 */
HGraph.prototype.linksNotProcessed = function(id){
  var links = [];
  for (var i = 0 ; i < this.vertices[id].linksTo.length ; i++) {
      if (! this.vertices[id].linksTo[i].processed){
          links.push(this.vertices[id].linksTo[i]);
      }
  }
  for (var i = 0 ; i < this.vertices[id].linksFrom.length ; i++) {
      if (! this.vertices[id].linksFrom[i].processed){
          links.push(this.vertices[id].linksFrom[i]);
      }
  }
  return links;
}

/* Constructor for Vertices, uniquely identifiable by id
 *
 * @param id identifier of the node
 */
function Vertex(id){
  this.id = id;
  this.linksTo = [];
  this.linksFrom = [];
  this.processed = false;
}

/* Function that creates a random Graph with
 *
 * @param maxChildren number of maximum children per node
 * @param minChildren number of minumum children per node
 * @param depthLevel maximum number of levels from the center
 * @return HGraph graph desired graph
 */
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

  /* Function that adds a child to a parent
   *
   * @param parent Vertex that has this child
   * @param depth level of depth where we are
   */
  function addChild(parent,depth){
    if (depth>=0){
      var vertex = new Vertex(id);
      graph.addVertex(vertex,parent);
      graph.vertices[id].id=id;
      id++;
      var numChildren = Math.floor(Math.random() * (maxChildren-minChildren+1) + minChildren);
      for (var i=0 ; i<numChildren ; i++){
        addChild(vertex,depth-1);                    
      }
    }
  }
  //console.log("Creating hypergraph with "+graph.vertices+" nodes");  
  return graph;
}