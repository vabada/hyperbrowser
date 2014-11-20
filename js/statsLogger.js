/*
  StatsLogger, send periodically fps stats to the server

  @param sampling_period sampling time in milliseconds
  @param post_interval period in milliseconds to send stats to server
  @param type type of rendering, for proper evaluation

  @return setInteraction function to save interactivity
*/

function StatsLogger( sampling_period, post_interval, type ){

  //minimum number of samples to send stats to server
  var minSamples = ( 1/2 ) * ( post_interval/ sampling_period);

  //whether the user was interacting with the screen or not
  var interaction = false;

  //array to store the fps samples before sending to server
  var fps_samples = [];

  //check browser name and version:
  var browserVersion = (function(){
    var ua= navigator.userAgent, tem,
    M= ua.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || [];
    if(/trident/i.test(M[1])){
        tem=  /\brv[ :]+(\d+)/g.exec(ua) || [];
        return 'IE '+(tem[1] || '');
    }
    if(M[1]=== 'Chrome'){
        tem= ua.match(/\bOPR\/(\d+)/)
        if(tem!= null) return 'Opera '+tem[1];
    }
    M= M[2]? [M[1], M[2]]: [navigator.appName, navigator.appVersion, '-?'];
    if((tem= ua.match(/version\/(\d+)/i))!= null) M.splice(1, 1, tem[1]);
    return M.join(' ');
  })();


  //save fps samples every sampling_period milliseconds
  setInterval(function(){

    fps_samples.push( stats.getFPS( ) );

  }, sampling_period);

  //send the samples every post_interval seconds
  setInterval( function( ){

    if ( fps_samples.length > minSamples ){

      var xmlhttp = new XMLHttpRequest();   // new HttpRequest instance
      xmlhttp.open("POST", "/statsHandler");
      xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
      xmlhttp.send(JSON.stringify({

        version: "0.0.5", //version:version
        type: type,
        numbernodes:hgraph.vertices.length,
        interaction: interaction,
        fps: fps_samples,
        period: sampling_period+"ms",
        OS: navigator.platform,
        browser: browserVersion

      }));
    }

    fps_samples = [];

    interaction = false;

  }, post_interval);

  return{

    setInteraction: function () {

      interaction = true;

    }
  }
};

if ( typeof module === 'object' ) {

	module.exports = StatsLogger;

}
