/*HGraph

  Defines the graph structure
  Originally implemented for tree structure
  Now supporting any type of graph (uncomment edge related lines)

  class HGraph
  methods:
    HGraph() //Constructor
    addVertex(son,parent)
    addUnlinkedVertex(vertex)
    addEdge(son,parent)
    resetProcessed()
    numberOfNodes()
    linksNotProcessed(id)
    calculateNewDepth(newCenter)

  class Vertex
  methods:
    Vertex(id) //Constructor

  class Edge
  methods:
    Edge(node1,node2) //Constructor

  createRandomGraph(maxChildren,minChildren,depthLevel)
  importGraph(file)
 */

function HGraph(){
  this.vertices = [];
  //this.edges = [];
}

/* Function to add a Vertex to the HGraph
 *
 * @param son vertex linked from the parent
 * @param parent vertex linking the son
 */
HGraph.prototype.addVertex = function(son,parent){
  if (son != undefined && parent != undefined) {
    this.vertices.push(son);
    this.addEdge(son,parent);
    //son.depth =
  }
}

/* Function to add a Vertex (without links)
 *
 * @param vertex node to add
 */
HGraph.prototype.addUnlinkedVertex = function(vertex){
  this.vertices.push(vertex);
}

/* Function to add an Edge to the HGraph
 *
 * @param son destination node
 * @param parent origin node
 */
HGraph.prototype.addEdge = function(son,parent){
  parent.linksTo.push(son);
  son.linksFrom.push(parent);
  //this.edges.push(new Edge(son,parent));
}

/* Function that sets the property processed to false for every vertex
 */
HGraph.prototype.resetProcessed = function(){
  for (var i = 0 ; i < this.vertices.length ; i++) {
    this.vertices[i].processed=false;
  }
}

/* Function to find out the number of nodes
 *
 * @return this.vertices.length number of nodes
 */
HGraph.prototype.numberOfNodes = function(){
  return this.vertices.length;
}

/* Function to get the depth of a node
 *
 * @param id node for which we want to get the depth
 * @return this.vertices[id].depth depth
 */
HGraph.prototype.getDepth = function(id){
  return this.vertices[id].depth;
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

/* Function that calculates the new depth (distance from center to furthest path) TODO
 *
 * @param newCenter central node
 * @return maximumDepth level of depth
 */
HGraph.prototype.calculateNewDepth = function(newCenter){
  var maximumDepth = 0;
  var that = this;

  that.resetProcessed();
  that.vertices[newCenter].processed=true;
  var links = that.linksNotProcessed(newCenter);
  for (var i=0 ; i<links.length ; i++){
    processChild(links[i].id,0);
  }
  function processChild(childId ,prof){
    if (++prof >= maximumDepth){
        maximumDepth = prof;
    }
    var id = that.vertices[childId].id;
    that.vertices[id].processed = true;

    var links = that.linksNotProcessed(id);
    for (var i=0 ; i<links.length ; i++){
        processChild(links[i].id,prof);
    }
  }
  return maximumDepth;
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

/* Constructor for Edges
 *
 * @param node1 node
 * @param node2 node
 */
function Edge(node1, node2){
  this.node1 = node1;
  this.node2 = node2;
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
  vertex.id = id;
  vertex.name = "My name is: "+id;
  graph.vertices.push(vertex);
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
      vertex.name = "My name is: "+id;
      vertex.id = id;
      graph.addVertex(vertex,parent);
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

/* Function that creates a graph from a JSON file
 *
 * @param file JSON file with the graph data
 * @return HGraph graph
 */
function importGraph(file) {

  //TODO load file, put into var loadedGraph
  //we have insted the JSON directly here TODO load the JSON from file
  switch (file) {
    case "life":
      var loadedGraph = '{"phylo":[{"name":"life",  "parent":null},{  "name":"animalia",  "parent":"life"},{  "name":"plantae",  "parent":"life"},{  "name":"fungi",  "parent":"life"},{  "name":"protoctista",  "parent":"life"},{  "name":"monera",  "parent":"life"},{  "name":"vertebrates",  "parent":"animalia"},{  "name":"invertebrates",  "parent":"animalia"},{  "name":"fish",  "parent":"vertebrates"},{  "name":"amphibians",  "parent":"vertebrates"},{  "name":"reptiles",  "parent":"vertebrates"},{  "name":"birds",  "parent":"vertebrates"},{"name":"dragons","parent":"birds"},{  "name":"mammals",  "parent":"vertebrates"},{  "name":"Glaucophyta",  "parent":"plantae"},{  "name":"Rhodophyta",  "parent":"plantae"},{  "name":"Chlorophyta",  "parent":"Viridiplantae"},{  "name":"Streptophyta",  "parent":"Viridiplantae"},{  "name":"Charophyta",  "parent":"Streptophyta"},{  "name":"Embryophyta",  "parent":"Streptophyta"}]}';
      break;
    case "languages":
      var loadedGraph = '{"phylo":[{"name":"blabla","parent":null},  {"name":"Niger-Congo","parent":"blabla"},  {"name":"Austronesian","parent":"blabla"},  {"name":"Trans–New Guinea","parent":"blabla"},  {"name":"Sino-Tibetan","parent":"blabla"},  {"name":"Indo-European","parent":"blabla"},  {"name":"Afro-Asiatic","parent":"blabla"},  {"name":"Nilo-Saharan","parent":"blabla"},  {"name":"Albanian","parent":"Indo-European"},  {"name":"Armenian","parent":"Indo-European"},  {"name":"Balto-Slavic","parent":"Indo-European"},  {"name":"Celtic","parent":"Indo-European"},  {"name":"Germanic","parent":"Indo-European"},  {"name":"Hellenic","parent":"Indo-European"},  {"name":"Indo-Iranian","parent":"Indo-European"},  {"name":"Romance","parent":"Indo-European"},  {"name":"Ibero-Romance","parent":"Romance"},  {"name":"Spanish","parent":"Ibero-Romance"},  {"name":"Poruguese","parent":"Ibero-Romance"},  {"name":"Occitano-Romance","parent":"Romance"},  {"name":"Gallo-Romance","parent":"Romance"},  {"name":"Italo-Romance","parent":"Romance"},  {"name":"Sardinian","parent":"Romance"},  {"name":"Romanian","parent":"Romance"},  {"name":"Slavic","parent":"Balto-Slavic"},  {"name":"Baltic","parent":"Balto-Slavic"},  {"name":"West-Baltic","parent":"Baltic"},  {"name":"East-Baltic","parent":"Baltic"},  {"name":"Latvian","parent":"East-Baltic"},  {"name":"Lithuanian","parent":"East-Baltic"},  {"name":"South-Slavic","parent":"Slavic"},  {"name":"Western-Slavic","parent":"South-Slavic"},  {"name":"Serbo-Croatian","parent":"Western-Slavic"},  {"name":"Slovene","parent":"Western-Slavic"} ]}';
      break;
    default:
      break;
  }

  obj = JSON.parse(loadedGraph);

  //create the HGraph
  var graph = new HGraph();

  var vertex = new Vertex(0);
  vertex.name = obj.phylo[0].name;
  vertex.id = 0
  //graph.vertices[0].id=0;
  graph.vertices.push(vertex);

  for (var i = 1; i<obj.phylo.length; i++){
    var vertex = new Vertex(i);
    vertex.name = obj.phylo[i].name;
    vertex.id = i;
    //graph.vertices[i].id=i;

    for (var j = 0; j<graph.vertices.length; j++){
      if (graph.vertices[j].name == obj.phylo[i].parent){
        var parent = graph.vertices[j];
      }
    }
    graph.addVertex(vertex,parent);
  }
  return graph;
}

//------------------------GENERATOR-------------------------

var fs = require('fs');

console.log("generating the start of the JSON file:");

fs.appendFileSync("randomGraphX.json", "'{\"phylo\":[");/*, function (err) {
  if (err) throw err;
  console.log('Header saved to file');
});*/

//hgraph = createRandomGraph(MAX_CHILDREN_PER_NODE,MIN_CHILDREN_PER_NODE,DEPTH_LEVEL);
var hgraph = createRandomGraph(4,2,5);

for (var i = 0 ; i < hgraph.vertices.length ; i++){
  //let x = i;
  if (hgraph.vertices[i].linksFrom.length == 0){
    console.log("I am the root");
    var parent = "";
    parent += '{"name":"';
    parent += hgraph.vertices[i].name;
    parent += '","parent":null}'
    fs.appendFileSync("randomGraphX.json", parent);/*, function (err) {
      if (err) throw err;
      console.log('Root saved to file');
    });*/
  } else {
    var son = ",";
    son += '{"name":"';
    son += hgraph.vertices[i].name;
    son += '","parent":"';
    son += hgraph.vertices[i].linksFrom[0].name;
    son += '"}';
    fs.appendFileSync("randomGraphX.json", son);/*, function (err) {
      if (err) throw err;
      console.log('Node '+ x +' saved to file');
    });*/
  }
}

fs.appendFileSync("randomGraphX.json", "]}';\n");/*, function (err) {
  if (err) throw err;
  console.log('End saved to file');
});*/


//OUTPUT:
//'{"phylo":[{"name":"life",  "parent":null},{  "name":"Embryophyta",  "parent":"Streptophyta"}]}';
