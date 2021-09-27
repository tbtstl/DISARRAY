const baseHtml = `<html>
      <head>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/0.6.0/p5.min.js"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/0.6.0/addons/p5.dom.min.js"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/0.6.0/addons/p5.sound.min.js"></script>
        <link rel="stylesheet" type="text/css" href="style.css"/>
        <meta charset="utf-8"/>

      </head>
      <body>
        <script>
        var NEW_SCRIPT = 'newScript'
        var POST_IMAGE = 'postImage'
        function clearCanvases() {
          var canvases = Array.prototype.slice.call(document.getElementsByTagName('canvas'));
          for(var i = 0; i < canvases.length; i++) {
            canvases[i].remove();
          }
        }
        function handleNewScript(newScriptContent) {
          var script;
            if(document.getElementById("userScript")) {
              document.getElementById("userScript").remove();
              clearCanvases();
            }
            
            
            script = document.createElement('script')
            script.src = newScriptContent;
            script.id = 'userScript'
            document.body.appendChild(script);
            // Pass back the HTML to save
            // NOTE: This is insecure, but since we're just passing back our own html and rendering it later in a new iframe it should be ok
            window.parent.postMessage([NEW_SCRIPT, document.documentElement.outerHTML], "*");
        }
        function handlePostImage() {
          var canvases = document.getElementsByTagName('canvas')
          var image = "data:"
          if(canvases.length) {
            image = canvases[canvases.length - 1].toDataURL()
          }
          window.parent.postMessage([POST_IMAGE, image], "*");
        }
        window.onload = (function() {
          clearCanvases();
          window.addEventListener('message', function(e) {
            if(e.origin !== "${process.env.NEXT_PUBLIC_VERCEL_URL}") {
              return;
            }
            
            if(!e.data || !e.data.length === 2) {
              console.log('invalid payload, must be array with length 2')
              return;
            }
            if(e.data[0] === NEW_SCRIPT) {
              handleNewScript(e.data[1], e.origin)
            } else if(e.data[0] === POST_IMAGE) {
              handlePostImage()
            }
          });
        });
        </script>
      </body>
      </html>`;

export const encodedBaseHtml = `data:text/html;base64,${Buffer.from(
  baseHtml
).toString('base64')}`;

export const testScript = `
// All your code should be inside this function!
var sketch = function (p) {
  var x = 100;
  var y = 100;
  var w = 200;
  var h = 300;

  p.setup = function () {
    // Leave this as 500px x 500px for best rendering 
    p.createCanvas(500, 500);
    p.background('red');
  };

  p.draw = function () {
    variableEllipse(p.mouseX, p.mouseY, p.pmouseX, p.pmouseY);
  };

  function variableEllipse(x, y, px, py) {
    let speed = p.abs(x - px) + p.abs(y - py);
    p.stroke(speed);
    p.ellipse(x, y, speed, speed);
  }
};

// DO NOT TOUCH
new p5(sketch);`;

export const encodedScript = Buffer.from(testScript).toString('base64');
