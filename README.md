hyperbrowser
============

Scalable Hyperbolic Browser for Information Visualization with [three.js](http://threejs.org/)

Check stable versions here:
* Working with [shaders code](http://hyperbrowser.herokuapp.com/shaders.html)
* Working with [javascript code](http://hyperbrowser.herokuapp.com/javascript.html)
* First sketches adding [temporality](http://hyperbrowser.herokuapp.com/temporal.html)

Some parameters may be set in the query string:
* graph = random || languages || life (default is random)
* depth = int within [1,15] - (default is 4)

For example:
```
/javascript.html?graph=random&depth=5
```
To view it locally simply open hyperbrowser.html

And to play around check the interactivity:

* Click on a node to redraw the graph with this node in the center
* Press shift and drag and drop the mouse anywhere to explore the graph
* Drag and drop the mouse to change the point of view
* Swap between graphs in the upper right list

Example graphs
------------------
Check the provided examples:

* Random generated graph
* Tree of Life
* Languages of the world
* Countries of the world (TODO)
* Linux filesystem (TODO)

How to use the hyperbolic browser
------------------
Here you can see all modifieble things, and some examples of its use

### Load external data

To load your data, various methods are supported:

* JSON (TODO define formats, check for standards)
* CSV (TODO)

### Appearance:

To change the colour of every node //TODO

### Transformations:

At the moment, transformations can be executed both in:
* JavasCript code
* Shader code

To change between both, you need to define the material as follows:

Shaders:
```js
var material = new THREE.ShaderMaterial({
      vertexShader: document.getElementById( 'vertexShader' ).textContent,
      fragmentShader: document.getElementById( 'fragmentShader' ).textContent,
      uniforms: uniforms,
      vertexColors: true
    });
```
JavaScript:
```js
var material = new THREE.PointCloudMaterial({size:0.1,vertexColors:true});
```

And in the drag and drop event (onDocumentMouseDown + document.onmousemove), use the appropriate code:

Shaders:
```js
initialTrans.set(clickedX-initialPointX,clickedY-initialPointY);
//then pass the transformation to the shaders
uniforms.trans.value = initialTrans;
```
JavaScript:
```js
var p = math.complex(clickedX-initialPointX,clickedY-initialPointY);
var recalculatedGraph = moveGraph(p);
hgraph = recalculatedGraph;

//Update the rendered system on the screen
for (var i=0 ; i<system.geometry.vertices.length ; i++){
  system.geometry.vertices[i].set(recalculatedGraph.vertices[i].position.x, recalculatedGraph.vertices[i].position.y, 0);
}
```
Credits
------------------
This project uses makes use of the following libraries:
* [three.js](http://threejs.org/) (thanks to @mrdoob and the rest of collaborators)
* TODO
