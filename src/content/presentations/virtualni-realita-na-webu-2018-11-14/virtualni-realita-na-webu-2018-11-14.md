# Virtuální realita na webu

## [Pavol Hejný](https://www.pavolhejny.com/)

![](https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=https://www.pavolhejny.com/virtualni-realita-na-webu-2018-11-14)

https://www.pavolhejny.com/virtualni-realita-na-webu-2018-11-14

---

![](/content/presentations/virtualni-realita-na-webu/hackuj-stat-clanek.png)

---

# Maps

![](/content/presentations/virtualni-realita-na-webu/map.jpg)

---

# Spherical 36O° photo/video

![](/content/presentations/virtualni-realita-na-webu/spherical-photo.jpg)

---

<iframe src="https://www.facebook.com/plugins/post.php?href=https%3A%2F%2Fwww.facebook.com%2Fhangingpixels%2Fposts%2F2066998440026880&width=400" width="400" height="1011" style="border:none;overflow:hidden" scrolling="no" frameborder="0" allowTransparency="true" allow="encrypted-media"></iframe>

<!--
<iframe src="https://www.facebook.com/plugins/post.php?href=https%3A%2F%2Fwww.facebook.com%2Fhangingpixels%2Fposts%2F2066998440026880&width=400" width="400" height="1011" style="border:none;overflow:hidden" scrolling="no" frameborder="0" allowTransparency="true" allow="encrypted-media"></iframe>
-->

---

# Games

![](/content/presentations/virtualni-realita-na-webu/babylon-js-game.jpg)


---

# Web
![](https://proxy.duckduckgo.com/iur/?f=1&image_host=http%3A%2F%2Fhqwalls.com%2Fwp-content%2Fuploads%2F2012%2F11%2FSpiderwebs-wallpapers-9.jpg&u=http://www.hqwalls.com/wp-content/uploads/2012/11/Spiderwebs-wallpapers-9.jpg)

---

# Web 1.0
## “readable”

- Wikipedia, Business websites

--


- HTML, CSS

---


# Web 2.0
## “writable”

- Social networks, Forums, E-shops

--


- PHP, Python, Java,...

---

# Web 3.0?
## “executable”

- Apps, Google drive, Maps

--


- JavaScript

---

# “Fat” client

--

- JavaScript

--

- API (REST API, GraphQL API)

--

- WebSockets

---

# JavaScript

--

- EcmaScript
    - ECMAScript5 (2011) (IE11)
    - ECMAScript6 (2015)
    ...
    - ECMAScript 2018

--

- Browser ( vs. Node.js )


---

# Transpilers
Source-to-source compilers

--

 - [CoffeeScript](https://coffeescript.org/)

--

 - [TypeScript]()

--

 - [Babel]()


---

# Polyfills
Adding new features in runtime

--

 - [Polyfill.io](https://polyfill.io/v2/docs/)

--

 - [Modernizr](https://github.com/Modernizr/Modernizr/wiki/HTML5-Cross-browser-Polyfills)


---

# Polyfills

```javascript
Number.isNaN = Number.isNaN || function(value) {     
    return value !== value;
}
```

--

```javascript
if (Number.parseInt === undefined) {
    Number.parseInt = window.parseInt;
}
```

---

# Modules

```html
<script type="module">
    import main from './main.js';
    main();
</script>
```

--

```javascript
import { factorize } from './math/factorize.js';

export default async function main() {
    const input = 2 * 3 * 5 * 7 * 11 * 13;
    try {
        const primes = await factorize(input);
        console.log(`${input} = ${primes.join(' * ')}`);
    } catch (error) {
        logError(error);
    }
}
```

---

# Async

![](https://proxy.duckduckgo.com/iur/?f=1&image_host=http%3A%2F%2Fmtcss.co.uk%2Fwp-content%2Fuploads%2F2017%2F01%2FServer-Room.jpg&u=https://mtcss.co.uk/wp-content/uploads/2017/01/Server-Room.jpg)

---

```javascript
function main() {
    getController(
        (error) => {
            logError(error);
        },
        (controller) => {
            getModel(
                controller,
                (error) => {
                    logError(error);
                },
                (modelObj) => {
                    convertToShapes(
                        modelObj,
                        (error) => {
                            logError(error);
                        },
                        (modelShapes) => {
                            //...
                        },
                    );
                },
            );
        },
    );
}
```

---

# Promises

```javascript
async function main() {
    try {
        const controller = await getController();
        const modelObj = await getModel(controller);
        const modelShapes = await convertToShapes(model3DObj);
    } catch (error) {
        logError(error);
    }
}
```



---

# Canvas

```html
<canvas id="scene"></canvas>
```  

--


```javascript
const sceneElement = document.getElementById('scene');
const ctx = sceneElement.getContext('2d');
```

https://codepen.io/hejny/

---


# Canvas WebGL

```html
<canvas id="scene"></canvas>
```  

```javascript
const sceneElement = document.getElementById('scene');
const ctx = sceneElement.getContext('webgl');
```  

---

# WebGL

![](https://proxy.duckduckgo.com/iu/?u=https%3A%2F%2Fdavidwalsh.name%2Fdemo%2Fwebgl-water.jpg&f=1)

---

# WebGL
How it works?

--

## 3D shader
 - Vertex shader

--

## 2D shader
 - Pixel (fragment) shader

---

# Shader sample
High Level Shader Language

```hlsl
precision mediump float;

varying vec2 position;
uniform sampler2D webcam;

float wave(float x, float amount) {
  return (sin(x * amount) + 1.) * .5;
}

void main() {
  vec4 color = texture2D(webcam, position);
  gl_FragColor.r = wave(color.r, 10.);
  gl_FragColor.g = wave(color.g, 20.);
  gl_FragColor.b = wave(color.b, 40.);
  gl_FragColor.a = 1.;
}
```

---


# WebGL
More articles and links

 - [How WebGL works](https://webglfundamentals.org/webgl/lessons/webgl-how-it-works.html)
 - [Shaders](https://en.wikipedia.org/wiki/Shader)
 - [Pixel shaders on WebCam](http://pixelshaders.com/examples/)

---

# (Game) Browser APIs

--

 - [KeyboardEvent](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent)

--

 - [Pointer events](https://developer.mozilla.org/en-US/docs/Web/API/Pointer_events)

--

 - [Pointer Lock API](https://developer.mozilla.org/en-US/docs/Web/API/Pointer_Lock_API)

--

 - [Fullscreen API](https://developer.mozilla.org/en-US/docs/Web/API/Fullscreen_API)

---


#WebGL Frameworks

--

- [Three.js](https://threejs.org/)

--

- [Babylon.js](https://www.babylonjs.com/) *(TypeScript)*

--

- [And a lot of others](https://en.wikipedia.org/wiki/List_of_WebGL_frameworks)

---

# WebVR
![](/content/presentations/virtualni-realita-na-webu/vr-helmet.jpg)

---

# WebVR
- [WebVR API](https://webvr.info/)
- [WebVR Rocks (Support of browsers and platforms)](https://webvr.rocks/)
- [Mozilla Mixed Reality](https://mixedreality.mozilla.org/)

---

# Gamepad API

- [Gamepad API](https://developer.mozilla.org/en-US/docs/Web/API/Gamepad_API)
- [Online tester](http://html5gamepad.com/)

---

# Orientation APIs

- [DeviceOrientation API](https://developer.mozilla.org/en-US/docs/Web/API/Detecting_device_orientation)
- [DeviceAcceleration API](https://developer.mozilla.org/en-US/docs/Web/API/DeviceAcceleration)
- [Geolocation API](https://developer.mozilla.org/en-US/docs/Web/API/Geolocation_API)

--

![](https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=https://fiddle.jshell.net/phejny/4j8w5g3q/15/show/)

https://fiddle.jshell.net/phejny/4j8w5g3q/15/show/



---

# WebVR Frameworks

--

- [Three.js](https://threejs.org/)

--

- [Babylon.js (TS)](https://www.babylonjs.com/)

--

- [A-Frame](https://aframe.io/)

---

# A-Frame

codesample:html:phejny/n2Le0za8/

---

# Physics
![](https://proxy.duckduckgo.com/iur/?f=1&image_host=http%3A%2F%2Ftvo.org%2Fsites%2Fdefault%2Ffiles%2Farticle-thumbnails%2FParticle-collision-LHC-artist-impression.jpg&u=https://tvo.org:443/sites/default/files/article-thumbnails/Particle-collision-LHC-artist-impression.jpg)

---

# Physics


sample-background:webappgames.github.io/3d-project/

---

# Physics
Destroy the building!

![](https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=https://webappgames.github.io/collapse-game/)


https://webappgames.github.io/collapse-game/ ←Mobile

https://webappgames.github.io/3d-project/ ←PC


---

# Physics

- [WebWorkers](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Using_web_workers)

## Frameworks

- [Oimo.js](https://lo-th.github.io/Oimo.js/)
- [Cannon.js](http://www.cannonjs.org/)

---


#Augmented reality
![](https://proxy.duckduckgo.com/iu/?u=http%3A%2F%2Fwww.digitalmeetsculture.net%2Fwp-content%2Fuploads%2F2014%2F08%2FIMG_8.jpg&f=1)

---

# [MediaDevices API](https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices)
- Camera
- Microphone

---

![](https://scontent-vie1-1.xx.fbcdn.net/v/t1.0-9/34015806_10155680999028590_541623400687206400_o.jpg?_nc_cat=101&_nc_ht=scontent-vie1-1.xx&oh=47a2b02408a5976aa2f399207b9aab09&oe=5C75584C)


---

# WebXR Device API
*Draft from 2018-11-09*

<!--![](https://developers.google.com/web/updates/images/2018/06/sunflowers.jpg)-->

 - [WebXR Device API](https://immersive-web.github.io/webxr/)
 - https://developers.google.com/web/updates/2018/06/ar-for-the-web

 

---


# 3D Formáty

--

- [.babylon](https://bit.ly/2qJmXv1)

--

- [.obj](https://fileinfo.com/extension/obj)

--

- [.glb](https://fileinfo.com/extension/glb)

--

- [.stl](https://fileinfo.com/extension/stl)


---

#Feature

- [Facebook (.glb)](https://www.facebook.com/groups/facebook360community/)

--

- WebVR, WebAR

--

- MS Paint 3D

--


- E-shops


---

## Díky za pozornost!

![](https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=https://www.pavolhejny.com/virtualni-realita-na-webu-2018-11-14)


https://www.pavolhejny.com/virtualni-realita-na-webu

