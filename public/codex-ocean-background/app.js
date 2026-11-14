(() => {
  'use strict';
  const canvas = document.querySelector('#ocean');
  const videoA = document.querySelector('#videoA');
  const videoB = document.querySelector('#videoB');
  const encounterVideo = document.querySelector('#encounterVideo');
  const overlayMode = new URLSearchParams(location.search).has('overlay');
  if (overlayMode) document.body.classList.add('overlay-mode');

  const STORE = 'codex-real-ocean-v4';
  const defaults = { clarity: .62, ripple: .92, speed: .78, density: 1.08 };
  let settings = { ...defaults, ...JSON.parse(localStorage.getItem(STORE) || '{}') };
  const backgrounds = [
    'assets/backgrounds/bg-01.mp4', 'assets/backgrounds/bg-02.mp4',
    'assets/backgrounds/bg-03.mp4', 'assets/backgrounds/bg-04.mp4'
  ];
  const fishLayer = { id:'fish-school', label:'真实热带鱼群正在水面上方游动' };

  let gl, program, textures = [], currentIndex = 0, mixValue = 0, transitioning = false;
  let sceneTimer, encounterActive = false, running = true, fishBurstTimer;
  const ripplePoints = [];
  let lastFrame = 0;

  const vertexSource = `
    attribute vec2 aPosition;
    varying vec2 vUv;
    void main(){vUv=(aPosition+1.0)*0.5;gl_Position=vec4(aPosition,0.0,1.0);}
  `;
  const fragmentSource = `
    precision mediump float;
    varying vec2 vUv;
    uniform sampler2D uTexA;
    uniform sampler2D uTexB;
    uniform float uMix;
    uniform float uAlpha;
    uniform float uRipple;
    uniform float uTime;
    uniform vec2 uResolution;
    uniform vec3 uPoints[8];
    vec2 coverUv(vec2 uv){
      float screenAspect=uResolution.x/uResolution.y;
      float mediaAspect=1.7777778;
      if(screenAspect>mediaAspect){float s=mediaAspect/screenAspect;uv.y=(uv.y-.5)*s+.5;}
      else{float s=screenAspect/mediaAspect;uv.x=(uv.x-.5)*s+.5;}
      return uv;
    }
    void main(){
      vec2 uv=vUv;
      vec2 px=uv*uResolution;
      vec2 offset=vec2(0.0);
      float shine=0.0;
      for(int i=0;i<8;i++){
        vec2 delta=px-uPoints[i].xy;
        float age=uPoints[i].z;
        float dist=length(delta);
        float ring=sin(dist*.095-age*10.5)*exp(-age*.95)*smoothstep(380.0,25.0,dist);
        offset+=normalize(delta+vec2(.001))*ring*.0018*uRipple;
        shine+=max(0.0,ring)*.055*uRipple;
      }
      offset+=vec2(sin(uv.y*38.0+uTime*.18),cos(uv.x*34.0-uTime*.14))*.00042*uRipple;
      vec2 sampleUv=coverUv(clamp(uv+offset,0.001,.999));
      vec4 a=texture2D(uTexA,sampleUv);
      vec4 b=texture2D(uTexB,sampleUv);
      vec3 color=mix(a.rgb,b.rgb,smoothstep(0.0,1.0,uMix));
      float luminance=dot(color,vec3(.299,.587,.114));
      color=mix(color,vec3(luminance),.08);
      color=pow(max(color,vec3(0.0)),vec3(.91));
      vec3 referenceTeal=vec3(.0,.35,.39)*(.68+luminance*.64);
      float preserveFoam=1.0-smoothstep(.60,.94,luminance);
      color=mix(color,referenceTeal,.60*preserveFoam);
      color*=vec3(.78,.94,1.04);
      color+=shine*vec3(.72,1.0,.94);
      gl_FragColor=vec4(color,uAlpha);
    }
  `;

  function shader(type, source) {
    const s=gl.createShader(type); gl.shaderSource(s,source); gl.compileShader(s);
    if(!gl.getShaderParameter(s,gl.COMPILE_STATUS)) throw new Error(gl.getShaderInfoLog(s));
    return s;
  }
  function initGL() {
    gl=canvas.getContext('webgl',{alpha:true,premultipliedAlpha:false,antialias:false});
    if(!gl) throw new Error('WebGL unavailable');
    program=gl.createProgram();gl.attachShader(program,shader(gl.VERTEX_SHADER,vertexSource));gl.attachShader(program,shader(gl.FRAGMENT_SHADER,fragmentSource));gl.linkProgram(program);gl.useProgram(program);
    const buffer=gl.createBuffer();gl.bindBuffer(gl.ARRAY_BUFFER,buffer);gl.bufferData(gl.ARRAY_BUFFER,new Float32Array([-1,-1,1,-1,-1,1,-1,1,1,-1,1,1]),gl.STATIC_DRAW);
    const pos=gl.getAttribLocation(program,'aPosition');gl.enableVertexAttribArray(pos);gl.vertexAttribPointer(pos,2,gl.FLOAT,false,0,0);
    textures=[makeTexture(0),makeTexture(1)];
    gl.uniform1i(gl.getUniformLocation(program,'uTexA'),0);gl.uniform1i(gl.getUniformLocation(program,'uTexB'),1);
    gl.enable(gl.BLEND);gl.blendFunc(gl.SRC_ALPHA,gl.ONE_MINUS_SRC_ALPHA);
    resize();
  }
  function makeTexture(unit) {
    const texture=gl.createTexture();gl.activeTexture(gl.TEXTURE0+unit);gl.bindTexture(gl.TEXTURE_2D,texture);
    gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_S,gl.CLAMP_TO_EDGE);gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_T,gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MIN_FILTER,gl.LINEAR);gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MAG_FILTER,gl.LINEAR);
    gl.texImage2D(gl.TEXTURE_2D,0,gl.RGBA,1,1,0,gl.RGBA,gl.UNSIGNED_BYTE,new Uint8Array([23,92,110,180]));return texture;
  }
  function resize() {
    const dpr=Math.min(devicePixelRatio||1,1.5);canvas.width=Math.round(innerWidth*dpr);canvas.height=Math.round(innerHeight*dpr);gl?.viewport(0,0,canvas.width,canvas.height);
  }
  function loadVideo(video, index) {
    return new Promise((resolve,reject)=>{
      const done=()=>{cleanup();video.playbackRate=settings.speed;video.play().then(resolve).catch(resolve)};
      const fail=()=>{cleanup();reject(new Error('video load failed'))};
      const cleanup=()=>{video.removeEventListener('canplay',done);video.removeEventListener('error',fail)};
      video.addEventListener('canplay',done);video.addEventListener('error',fail);video.src=backgrounds[index];video.load();
    });
  }
  async function startVideos() {
    await loadVideo(videoA,currentIndex);
    const next=(currentIndex+1)%backgrounds.length;
    await loadVideo(videoB,next);
    document.body.classList.add('ready');scheduleScene();requestAnimationFrame(render);
  }

  function startFishLayer() {
    encounterVideo.src='assets/encounters/fish-school.mp4';
    encounterVideo.playbackRate=settings.speed;
    encounterVideo.style.setProperty('--fish-opacity',String(.24+settings.density*.14));
    encounterVideo.load();
    encounterVideo.addEventListener('loadedmetadata',()=>{encounterVideo.currentTime=Math.random()*Math.max(1,encounterVideo.duration-1)},{once:true});
    encounterVideo.play().then(()=>{encounterActive=true}).catch(()=>{encounterActive=false});
  }
  function updateTexture(texture,unit,video){if(video.readyState<2)return;gl.activeTexture(gl.TEXTURE0+unit);gl.bindTexture(gl.TEXTURE_2D,texture);try{gl.texImage2D(gl.TEXTURE_2D,0,gl.RGBA,gl.RGBA,gl.UNSIGNED_BYTE,video)}catch{}}
  function render(now) {
    if(!running)return;const dt=Math.min(50,now-lastFrame||16);lastFrame=now;
    updateTexture(textures[0],0,videoA);updateTexture(textures[1],1,videoB);
    ripplePoints.forEach(p=>p.age+=dt/1000);while(ripplePoints.length&&ripplePoints[0].age>3.2)ripplePoints.shift();
    const points=new Float32Array(24);ripplePoints.slice(-8).forEach((p,i)=>{points[i*3]=p.x*(canvas.width/innerWidth);points[i*3+1]=(innerHeight-p.y)*(canvas.height/innerHeight);points[i*3+2]=p.age});
    gl.uniform1f(gl.getUniformLocation(program,'uMix'),mixValue);gl.uniform1f(gl.getUniformLocation(program,'uAlpha'),settings.clarity*.92);gl.uniform1f(gl.getUniformLocation(program,'uRipple'),settings.ripple);gl.uniform1f(gl.getUniformLocation(program,'uTime'),now/1000);gl.uniform2f(gl.getUniformLocation(program,'uResolution'),canvas.width,canvas.height);gl.uniform3fv(gl.getUniformLocation(program,'uPoints'),points);
    gl.clearColor(0,0,0,0);gl.clear(gl.COLOR_BUFFER_BIT);gl.drawArrays(gl.TRIANGLES,0,6);requestAnimationFrame(render);
  }

  function scheduleScene() { clearTimeout(sceneTimer);sceneTimer=setTimeout(nextScene,120000+Math.random()*120000); }
  async function nextScene() {
    if(transitioning)return;transitioning=true;mixValue=0;
    const duration=5000,start=performance.now();
    const fade=now=>{mixValue=Math.min(1,(now-start)/duration);if(mixValue<1)requestAnimationFrame(fade);else finishSceneSwap()};requestAnimationFrame(fade);
  }
  async function finishSceneSwap() {
    currentIndex=(currentIndex+1)%backgrounds.length;
    const oldA=videoA.src, oldTime=videoA.currentTime;
    videoA.src=videoB.src;videoA.currentTime=videoB.currentTime;await videoA.play().catch(()=>{});
    const next=(currentIndex+1)%backgrounds.length;await loadVideo(videoB,next).catch(()=>{});
    mixValue=0;transitioning=false;scheduleScene();
  }

  function ripple(x,y,burst=false){const count=burst?3:1;for(let i=0;i<count;i++)ripplePoints.push({x,y,age:i*.13});if(ripplePoints.length>8)ripplePoints.splice(0,ripplePoints.length-8)}
  let lastPointer=0;canvas.addEventListener('pointermove',e=>{if(performance.now()-lastPointer>55){lastPointer=performance.now();ripple(e.clientX,e.clientY)}});canvas.addEventListener('pointerdown',e=>ripple(e.clientX,e.clientY,true));

  function triggerEncounter() {
    clearTimeout(fishBurstTimer);encounterVideo.classList.add('fish-burst');showToast(fishLayer.label);
    fishBurstTimer=setTimeout(()=>encounterVideo.classList.remove('fish-burst'),10000);
  }
  function showToast(text){const toast=document.querySelector('#toast');toast.textContent=text;toast.classList.add('show');setTimeout(()=>toast.classList.remove('show'),3000)}

  function bind(id){const input=document.querySelector('#'+id),output=document.querySelector('#'+id+'Value');const show=()=>output.value=Math.round(settings[id]*100)+'%';input.value=settings[id];show();input.addEventListener('input',()=>{settings[id]=+input.value;show();videoA.playbackRate=settings.speed;videoB.playbackRate=settings.speed;encounterVideo.playbackRate=settings.speed;encounterVideo.style.setProperty('--fish-opacity',String(.24+settings.density*.14));localStorage.setItem(STORE,JSON.stringify(settings))})}
  Object.keys(defaults).forEach(bind);
  const panel=document.querySelector('#panel'),tab=document.querySelector('#panelTab');const panelVisible=on=>{panel.classList.toggle('hidden',!on);tab.classList.toggle('visible',!on)};document.querySelector('#collapse').onclick=()=>panelVisible(false);tab.onclick=()=>panelVisible(true);addEventListener('keydown',e=>{if(e.key.toLowerCase()==='h')panelVisible(panel.classList.contains('hidden'))});
  document.querySelector('#encounter').onclick=()=>triggerEncounter();document.querySelector('#reset').onclick=()=>{settings={...defaults};localStorage.setItem(STORE,JSON.stringify(settings));Object.keys(defaults).forEach(id=>{const el=document.querySelector('#'+id);el.value=settings[id];el.dispatchEvent(new Event('input'))})};
  document.addEventListener('visibilitychange',()=>{running=!document.hidden;for(const v of [videoA,videoB,encounterVideo])running?v.play().catch(()=>{}):v.pause();if(running){lastFrame=performance.now();requestAnimationFrame(render)}});
  window.oceanRipple=(x,y,burst=false)=>ripple(x,y,burst);
  window.oceanSettings=patch=>{settings={...settings,...patch};localStorage.setItem(STORE,JSON.stringify(settings));videoA.playbackRate=settings.speed;videoB.playbackRate=settings.speed;encounterVideo.playbackRate=settings.speed;encounterVideo.style.setProperty('--fish-opacity',String(.24+settings.density*.14))};
  window.oceanEncounter=()=>triggerEncounter();
  window.oceanNextScene=()=>nextScene();
  window.oceanSetActive=active=>{
    running=!!active;
    for(const v of [videoA,videoB,encounterVideo])running?v.play().catch(()=>{}):v.pause();
    if(running){lastFrame=performance.now();requestAnimationFrame(render)}
  };

  addEventListener('resize',resize,{passive:true});
  try{
    initGL();startVideos().catch(()=>document.querySelector('#fallback').textContent='真实浅海素材加载失败');startFishLayer();
  }catch(error){document.querySelector('#fallback').textContent='当前环境不支持写实水波渲染';console.error(error)}
})();
