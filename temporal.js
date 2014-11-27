/*TGraph

  Defines the graph structure with temporality
  Originally implemented for tree structure

  class TGraph
  methods:
    TGraph() //Constructor
    addNode(node)
    addSon(son,parent)
    addEdge(son,parent)
    resetProcessed()
    getDepth(id)
    getNumberOfChildren(id)
    linksNotProcessed(id)
    calculateNewDepth(newCenter)

  class Node
  methods:
    Node(id) //Constructor

  class Edge
  methods:
    Edge(node1,node2) //Constructor

  createRandomGraph(maxChildren,minChildren,depthLevel)
  importGraph(file)
 */

function TGraph(){
  this.vertices = [];
  this.edges = [];
  //define changes:
  // {timeslot:t,(newNodes:[Node]),(newEdges:[Edge]),(deletedNodes:[Node]),(deletedEdges:[Edge])}
  this.changes = [];
  this.changes.push("{'timeslot':0}");
  console.log(this.changes);
}

/* Function to create a new node in a new timeslot
 *
 * @param name name of the new node
 * @param timeslot //TODO
 */
TGraph.prototype.newNode = function(name,timeslot){
  var newId = this.vertices.length;
  var node = new Node(newId)
  node.name = name;
  this.addNode(node);
  this.changes.push("{'timeslot':"+this.changes.length+",'newNodes':"+node.id+"}");
  console.log(this.changes);
}

/* Function to delete a node in a new timeslot
 *
 * @param id of the deleted node
 * @param timeslot //TODO
 */
TGraph.prototype.deleteNode = function(nodeID,timeslot){
  this.changes.push("{'timeslot':"+this.changes.length+",'deletedNodes':"+nodeID+"}");
  console.log(this.changes);
}

//TODO
/*TGraph.prototype.newEdge = function(edge){
  changes.push({added:edge.id,********})
}*/

//TODO
/*TGraph.prototype.deleteEdge = function(edge){
  changes.push({deleted:edge.id,********})
  uff (igual no)
  delete this.vertices[id]
}*/

//TODO
/*TGraph.prototype.getGraphInTimeslot = function(timeslot){
  return
}*/

/* Function to add a Node to the TGraph
 *
 * @param node node to add
 */
TGraph.prototype.addNode = function(node){
  if (node instanceof Node) {
    this.vertices.push(node);
  }
}
/* Function to add a Child to a Node of the TGraph
 *
 * @param son Node linked from the parent
 * @param parent Node linking the son
 */
TGraph.prototype.addSon = function(son,parent){
  if (son instanceof Node && parent instanceof Node) {
    this.vertices.push(son);
    this.addEdge(son,parent);
  }
}

/* Function to add an Edge to the TGraph
 *
 * @param son destination node
 * @param parent origin node
 */
TGraph.prototype.addEdge = function(son,parent){
  if (son instanceof Node && parent instanceof Node) {
    parent.linksTo.push(son);
    son.linksFrom.push(parent);
    this.edges.push(new Edge(son.id,parent.id));
  }
}

/* Function that sets the property processed to false for every Node
 */
TGraph.prototype.resetProcessed = function(){
  for (var i = 0 ; i < this.vertices.length ; i++) {
    this.vertices[i].processed=false;
  }
}

/* Function to get the depth of a node
 *
 * @param id node for which we want to get the depth
 * @return this.vertices[id].depth depth
 */
TGraph.prototype.getDepth = function(id){
  return this.vertices[id].depth;
}

/* Function to get the number of children of a node
 *
 * @param id node for which we want to get the depth
 * @return this.vertices[id].linksTo.length number of children
 */
TGraph.prototype.getNumberOfChildren = function(id){
  return this.vertices[id].linksTo.length;
}

/* Function that evaluates the not processed (drawn) links for Node
 *
 * @param id node for which we want to get the links
 * @return links array with the not processed links
 */
TGraph.prototype.linksNotProcessed = function(id){ //@deprecated
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
TGraph.prototype.calculateNewDepth = function(newCenter){ //@deprecated
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
 * @param type node's type
 */
function Node(id, type){
  this.id = id;
  this.linksTo = [];
  this.linksFrom = [];
  this.processed = false;
  this.depth = -1;
  this.type = type || "blue";
  //TODO define enum of Node Types (person, document, etc) (onthologies)
}

/* Constructor for Edges
 *
 * @param id1 id of the origin
 * @param id2 id of the destination
 * @param type edge's type
 */
function Edge(id1, id2, type){
  this.id1 = id1;
  this.id2 = id2;
  this.type = type || "strong";
  //TODO define enum of Edge Types (author, editor, collaborator) (onthologies)
}

/* Function that creates a random Graph with
 *
 * @param maxChildren number of maximum children per node
 * @param minChildren number of minumum children per node
 * @param depthLevel maximum number of levels from the center
 * @return TGraph graph desired graph
 */
function createRandomGraph(maxChildren,minChildren,depthLevel) {

  //default parameters
  var maxChildren = maxChildren || 4;
  var minChildren = minChildren || 2;
  var depthLevel = depthLevel || 4;

  //create the TGraph
  var graph = new TGraph();

  //create first Node and add it to the TGraph
  var id = 0;
  var node = new Node(id);
  node.depth = 0;
  node.id = id;
  node.name = "My name is: "+id;
  graph.vertices.push(node);
  id++;

  //add random number of children to the node
  var numChildren = Math.floor(Math.random() * (maxChildren-minChildren+1) + minChildren);
  for (var i=0 ; i<numChildren ; i++){
    addChild(node,depthLevel-1);
  }

  /* Function that adds a child to a parent
   *
   * @param parent Node that has this child
   * @param depth level of depth where we are
   */
  function addChild(parent,depth){
    if (depth>=0){
      var node = new Node(id);
      node.name = "My name is: "+id;
      //node.depth = X;
      node.id = id;
      graph.addSon(node,parent);
      id++;
      var numChildren = Math.floor(Math.random() * (maxChildren-minChildren+1) + minChildren);
      for (var i=0 ; i<numChildren ; i++){
        addChild(node,depth-1);
      }
    }
  }
  //console.log("Creating hypergraph with "+graph.vertices+" nodes");
  return graph;
}

/* Function that creates a graph from a JSON file
 *
 * @param file JSON file with the graph data
 * @return TGraph graph
 */
function importGraph(file) {

  //TODO load file, put into var loadedGraph
  //fs.read (NODE)
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

  //create the TGraph
  var graph = new TGraph();

  var node = new Node(0);
  node.name = obj.phylo[0].name;
  node.id = 0
  graph.vertices.push(node);

  for (var i = 1; i<obj.phylo.length; i++){
    var node = new Node(i);
    node.name = obj.phylo[i].name;
    node.id = i;

    for (var j = 0; j<graph.vertices.length; j++){
      if (graph.vertices[j].name == obj.phylo[i].parent){
        var parent = graph.vertices[j];
      }
    }
    graph.addSon(node,parent);
  }
  return graph;
}
