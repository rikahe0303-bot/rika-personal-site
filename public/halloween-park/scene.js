import * as THREE from 'three';
import {OrbitControls} from 'three/addons/controls/OrbitControls.js';
import {EffectComposer} from 'three/addons/postprocessing/EffectComposer.js';
import {RenderPass} from 'three/addons/postprocessing/RenderPass.js';
import {UnrealBloomPass} from 'three/addons/postprocessing/UnrealBloomPass.js';
import {OutputPass} from 'three/addons/postprocessing/OutputPass.js';
import {SSAOPass} from 'three/addons/postprocessing/SSAOPass.js';

const scene=new THREE.Scene(); scene.background=new THREE.Color(0x030410); scene.fog=new THREE.FogExp2(0x0b0718,.018);
const camera=new THREE.PerspectiveCamera(48,innerWidth/innerHeight,.1,150); camera.position.set(0,8.5,32);
const renderer=new THREE.WebGLRenderer({antialias:true,powerPreference:'high-performance'}); renderer.setPixelRatio(Math.min(devicePixelRatio,1.7)); renderer.setSize(innerWidth,innerHeight); renderer.shadowMap.enabled=true; renderer.shadowMap.type=THREE.PCFSoftShadowMap; renderer.toneMapping=THREE.ACESFilmicToneMapping; renderer.toneMappingExposure=1.04; document.body.prepend(renderer.domElement);
const controls=new OrbitControls(camera,renderer.domElement); controls.enableDamping=true; controls.dampingFactor=.045; controls.target.set(0,5,-7); controls.minDistance=10; controls.maxDistance=45; controls.maxPolarAngle=Math.PI*.58; controls.minPolarAngle=Math.PI*.2; controls.enablePan=false;
scene.add(new THREE.HemisphereLight(0x7484c8,0x160611,.72));
const key=new THREE.SpotLight(0xaec8ff,290,60,.52,.58,1); key.position.set(-12,22,8); key.target.position.set(0,5,-10); key.castShadow=true; key.shadow.mapSize.set(2048,2048); scene.add(key,key.target);
const rim=new THREE.PointLight(0xc938ff,104,30,2); rim.position.set(8,9,-6); scene.add(rim); const cyan=new THREE.PointLight(0x4eeeff,60,20,2); cyan.position.set(-9,5,4); scene.add(cyan); const fill=new THREE.PointLight(0x8f77ff,72,28,2); fill.position.set(0,7,13); scene.add(fill);

const gold=new THREE.MeshStandardMaterial({color:0x9a5b13,metalness:1,roughness:.18});
const paleGold=new THREE.MeshStandardMaterial({color:0xffd77b,metalness:.85,roughness:.22,emissive:0x8a3b0b,emissiveIntensity:.16});
const midnight=new THREE.MeshPhysicalMaterial({color:0x12072d,metalness:.75,roughness:.2,clearcoat:1,clearcoatRoughness:.12});
const glass=new THREE.MeshPhysicalMaterial({color:0xb77cff,transmission:.76,opacity:.72,transparent:true,roughness:.08,metalness:.08,thickness:.8,ior:1.45,emissive:0x3b0d76,emissiveIntensity:.24});
const neonPurple=new THREE.MeshBasicMaterial({color:0xe45cff,toneMapped:false}); const neonGold=new THREE.MeshBasicMaterial({color:0xffcb59,toneMapped:false});
const carousel=new THREE.Group();carousel.position.set(-7,0,1);carousel.scale.setScalar(.43); scene.add(carousel);const carouselLight=new THREE.PointLight(0xff7a20,70,18,2);carouselLight.position.set(-7,4.2,4);scene.add(carouselLight);
function mesh(g,m,y=0){const x=new THREE.Mesh(g,m);x.position.y=y;x.castShadow=true;x.receiveShadow=true;return x}
function horizontalRing(g,m,y=0){const x=mesh(g,m,y);x.rotation.x=Math.PI/2;return x}
const base=mesh(new THREE.CylinderGeometry(6.25,6.6,.72,96),midnight,.5); carousel.add(base);
carousel.add(horizontalRing(new THREE.TorusGeometry(6.18,.17,12,128),neonGold,.85));
carousel.add(mesh(new THREE.CylinderGeometry(5.78,6.1,.3,96),gold,1.0));
// engraved medallions
for(let i=0;i<20;i++){const a=i/20*Math.PI*2; const med=mesh(new THREE.TorusGeometry(.34,.08,8,24),paleGold,.56);med.rotation.y=-a;med.position.set(Math.sin(a)*6.37,.58,Math.cos(a)*6.37);carousel.add(med)}
const platform=mesh(new THREE.CylinderGeometry(5.72,5.72,.25,96),new THREE.MeshPhysicalMaterial({color:0x24144d,metalness:.55,roughness:.22,clearcoat:1}),1.18);carousel.add(platform);
const pole=mesh(new THREE.CylinderGeometry(.52,.65,8.1,48),gold,5.18);carousel.add(pole);
for(let k=0;k<3;k++)carousel.add(horizontalRing(new THREE.TorusGeometry(.62+k*.03,.055,8,72),k%2?neonPurple:neonGold,2.7+k*2));
// canopy
const canopy=mesh(new THREE.ConeGeometry(6.65,2.25,96,1,true),glass,9.0);carousel.add(canopy);
carousel.add(mesh(new THREE.CylinderGeometry(6.72,6.72,.32,96),midnight,8.02));
carousel.add(horizontalRing(new THREE.TorusGeometry(6.7,.18,12,128),neonPurple,8.18));
carousel.add(horizontalRing(new THREE.TorusGeometry(5.45,.1,10,128),neonGold,8.46));
const crown=mesh(new THREE.SphereGeometry(.72,32,20),glass,10.2);crown.scale.y=1.65;carousel.add(crown);
carousel.add(horizontalRing(new THREE.TorusGeometry(.85,.12,8,64),neonGold,9.92));

function horse(){const h=new THREE.Group();const body=mesh(new THREE.SphereGeometry(.62,28,18),glass);body.scale.set(1.45,.82,.62);h.add(body);const neck=mesh(new THREE.CylinderGeometry(.22,.34,1.05,18),glass,.52);neck.rotation.z=-.48;neck.position.x=.72;h.add(neck);const head=mesh(new THREE.SphereGeometry(.31,20,14),glass,1.07);head.scale.set(1.2,.75,.72);head.position.x=1.02;h.add(head);for(const [x,z] of [[-.55,.28],[-.55,-.28],[.42,.28],[.42,-.28]]){const leg=mesh(new THREE.CylinderGeometry(.075,.12,.95,12),paleGold,-.63);leg.position.set(x,0,z);leg.rotation.z=x>0?-.18:.14;h.add(leg)}const mane=mesh(new THREE.TorusGeometry(.42,.08,8,24,Math.PI),neonPurple,.7);mane.rotation.set(Math.PI/2,0,.3);mane.position.x=.5;h.add(mane);return h}
const horses=[];for(let i=0;i<12;i++){const a=i/12*Math.PI*2,r=i%2?4.45:3.05;const rig=new THREE.Group();rig.position.set(Math.sin(a)*r,3.3+Math.sin(i)*.25,Math.cos(a)*r);rig.rotation.y=a;const p=mesh(new THREE.CylinderGeometry(.055,.055,6.2,10),paleGold,1.6);rig.add(p);const h=horse();h.position.y=.1;rig.add(h);carousel.add(rig);horses.push({rig,phase:i*.9})}
// bulbs around canopy and base
for(let ring=0;ring<2;ring++)for(let i=0;i<64;i++){const a=i/64*Math.PI*2,r=ring?5.45:6.68,y=ring?8.47:8.15;const b=mesh(new THREE.SphereGeometry(.055,8,8),i%3===0?neonPurple:neonGold,y);b.position.set(Math.sin(a)*r,y,Math.cos(a)*r);carousel.add(b)}

const skyMat=new THREE.ShaderMaterial({side:THREE.BackSide,depthWrite:false,uniforms:{top:{value:new THREE.Color(0x09122f)},bottom:{value:new THREE.Color(0x210713)}},vertexShader:'varying vec3 vPos;void main(){vPos=position;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0);}',fragmentShader:'uniform vec3 top;uniform vec3 bottom;varying vec3 vPos;void main(){float h=normalize(vPos).y*.5+.5;gl_FragColor=vec4(mix(bottom,top,smoothstep(.08,.92,h)),1.0);}'});scene.add(new THREE.Mesh(new THREE.SphereGeometry(90,32,20),skyMat));
const floor=mesh(new THREE.CircleGeometry(48,128),new THREE.MeshPhysicalMaterial({color:0x07102a,metalness:.55,roughness:.2,clearcoat:1,clearcoatRoughness:.12}),0);floor.rotation.x=-Math.PI/2;floor.receiveShadow=true;scene.add(floor);
for(let i=1;i<7;i++){const ring=mesh(new THREE.RingGeometry(7+i*2.5,7.03+i*2.5,128),new THREE.MeshBasicMaterial({color:i%2?0x43136e:0x4a3511,transparent:true,opacity:.28}),.015);ring.rotation.x=-Math.PI/2;scene.add(ring)}
const water=mesh(new THREE.CircleGeometry(34,96),new THREE.MeshPhysicalMaterial({color:0x081b50,metalness:.42,roughness:.06,transparent:true,opacity:.72,clearcoat:1,clearcoatRoughness:.04}),.025);water.rotation.x=-Math.PI/2;water.receiveShadow=true;scene.add(water);
for(let i=0;i<18;i++){const z=13-i*1.45,w=3.7+i*.13;const step=mesh(new THREE.BoxGeometry(w,.08,1.05),new THREE.MeshStandardMaterial({color:i%2?0x30235d:0x412869,metalness:.35,roughness:.3,emissive:0x18082b,emissiveIntensity:.25}),.1);step.position.set(0,.1,z);scene.add(step)}
for(const side of [-1,1])for(let i=0;i<7;i++){const z=10-i*3.6,x=side*(3.2+i*.22);const post=mesh(new THREE.CylinderGeometry(.055,.08,2.35,10),paleGold,1.18);post.position.set(x,1.18,z);scene.add(post);const lamp=mesh(new THREE.SphereGeometry(.18,12,10),neonGold,2.38);lamp.position.set(x,2.38,z);scene.add(lamp)}

// A complete midnight amusement park: distant castle and ferris wheel.
const parkGold=new THREE.MeshStandardMaterial({color:0x9d5620,metalness:.82,roughness:.32,emissive:0x431503,emissiveIntensity:.18});
const castleStone=new THREE.MeshStandardMaterial({color:0x15141d,metalness:.2,roughness:.62,emissive:0x07050b,emissiveIntensity:.14});
const windowGlow=new THREE.MeshBasicMaterial({color:0xff7a18,toneMapped:false});
const castle=new THREE.Group();castle.position.set(0,0,-14);castle.scale.setScalar(1.18);scene.add(castle);const castleLight=new THREE.PointLight(0xff6c16,180,28,2);castleLight.position.set(0,6,-8);scene.add(castleLight);const castleRim=new THREE.PointLight(0x718cff,140,30,2);castleRim.position.set(0,13,-18);scene.add(castleRim);
const keep=mesh(new THREE.BoxGeometry(5.6,5.5,3.8),castleStone,2.75);castle.add(keep);
const gate=mesh(new THREE.BoxGeometry(1.5,2.5,.22),midnight,1.25);gate.position.z=2.02;castle.add(gate);
for(const x of [-2.6,2.6]){const tower=mesh(new THREE.CylinderGeometry(1.45,1.65,7,24),castleStone,3.5);tower.position.x=x;castle.add(tower);const roof=mesh(new THREE.ConeGeometry(1.75,3.5,24),glass,8.65);roof.position.x=x;castle.add(roof);const finial=mesh(new THREE.SphereGeometry(.16,12,8),neonGold,10.45);finial.position.x=x;castle.add(finial)}
const centerTower=mesh(new THREE.CylinderGeometry(1.2,1.45,7.3,24),castleStone,6.6);castle.add(centerTower);const centerRoof=mesh(new THREE.ConeGeometry(1.5,4.2,24),glass,12.3);castle.add(centerRoof);
for(const [x,y] of [[-2.6,3.5],[-2.6,5.3],[2.6,3.5],[2.6,5.3],[-1.4,3.4],[0,3.4],[1.4,3.4],[0,7.2]]){const w=mesh(new THREE.BoxGeometry(.38,.8,.15),windowGlow,y);w.position.set(x,y,2.02);castle.add(w)}
for(let i=0;i<13;i++){const crenel=mesh(new THREE.BoxGeometry(.42,.55,.55),parkGold,5.78);crenel.position.set(-2.7+i*.45,5.78,1.7);castle.add(crenel)}
for(const side of [-1,1]){const wing=mesh(new THREE.BoxGeometry(4.2,3.7,3.2),castleStone,1.85);wing.position.set(side*4.4,1.85,.2);castle.add(wing);for(let j=0;j<3;j++){const w=mesh(new THREE.BoxGeometry(.35,.7,.12),windowGlow,2.2+j*.15);w.position.set(side*(3.3+j*1.05),2.2+j*.15,1.86);castle.add(w)}}
const clockFace=mesh(new THREE.CircleGeometry(.82,48),new THREE.MeshStandardMaterial({color:0xe4c07c,metalness:.8,roughness:.25,emissive:0x8b3b08,emissiveIntensity:.45}),7.6);clockFace.position.set(0,7.6,2.18);castle.add(clockFace);const hourHand=mesh(new THREE.BoxGeometry(.08,.48,.06),midnight,7.78);hourHand.position.set(0,7.78,2.25);castle.add(hourHand);const minuteHand=mesh(new THREE.BoxGeometry(.065,.68,.06),midnight,7.92);minuteHand.position.set(0,7.92,2.27);castle.add(minuteHand);

// Warm jack-o'-lanterns line the plaza while the clock tower stays in cold moonlight.
const pumpkinMat=new THREE.MeshStandardMaterial({color:0x8f2407,roughness:.42,metalness:.08,emissive:0x5f1301,emissiveIntensity:.32});
const pumpkinGlow=new THREE.MeshBasicMaterial({color:0xff9b28,toneMapped:false});
function pumpkin(x,z,s=1){const g=new THREE.Group();g.position.set(x,.48*s,z);g.scale.setScalar(s);const body=mesh(new THREE.SphereGeometry(.58,20,14),pumpkinMat);body.scale.y=.78;g.add(body);for(const ex of [-.2,.2]){const eye=mesh(new THREE.CircleGeometry(.1,3),pumpkinGlow,.12);eye.position.set(ex,.12,.54);g.add(eye)}const mouth=mesh(new THREE.BoxGeometry(.42,.08,.03),pumpkinGlow,-.17);mouth.position.set(0,-.17,.55);g.add(mouth);const stem=mesh(new THREE.CylinderGeometry(.06,.09,.28,8),castleStone,.58);g.add(stem);scene.add(g);return g}
[[ -4,9,.8],[4,9,.8],[-5,5,1],[5,5,1],[-6,1,.85],[6,1,.85],[-8,-3,.75],[8,-3,.75],[-5,-8,.7],[5,-8,.7]].forEach(p=>pumpkin(...p));

const moon=mesh(new THREE.SphereGeometry(2.1,32,24),new THREE.MeshBasicMaterial({color:0xc9d8ff,toneMapped:false}),17);moon.position.set(-11,17,-28);scene.add(moon);const moonLight=new THREE.DirectionalLight(0xa9c5ff,2.2);moonLight.position.set(-11,18,2);moonLight.target.position.set(0,4,-10);moonLight.castShadow=true;scene.add(moonLight,moonLight.target);

const bulbWarm=new THREE.MeshBasicMaterial({color:0xffa23c,toneMapped:false,transparent:true,opacity:.95});const bulbCold=new THREE.MeshBasicMaterial({color:0xa9d9ff,toneMapped:false,transparent:true,opacity:.9});
function lightString(points,offset=0){const curve=new THREE.CatmullRomCurve3(points);const cable=mesh(new THREE.TubeGeometry(curve,64,.025,6,false),new THREE.MeshBasicMaterial({color:0x17121f}));scene.add(cable);for(let i=0;i<32;i++){const p=curve.getPoint(i/31);const bulb=mesh(new THREE.SphereGeometry(.075,8,8),(i+offset)%3?bulbWarm:bulbCold);bulb.position.copy(p);scene.add(bulb)}}
lightString([new THREE.Vector3(-13,10,-5),new THREE.Vector3(-7,12,-10),new THREE.Vector3(0,11,-13)]);lightString([new THREE.Vector3(0,11,-13),new THREE.Vector3(7,12,-10),new THREE.Vector3(13,10,-5)],1);

const ferris=new THREE.Group();ferris.position.set(8.5,6.7,-9);ferris.scale.setScalar(.78);scene.add(ferris);const ferrisLight=new THREE.PointLight(0xff6b22,105,24,2);ferrisLight.position.set(8.5,8,-4);scene.add(ferrisLight);
const wheel=new THREE.Group();ferris.add(wheel);wheel.add(mesh(new THREE.TorusGeometry(6.2,.16,10,96),neonPurple));wheel.add(mesh(new THREE.TorusGeometry(5.7,.08,8,96),neonGold));
for(let i=0;i<12;i++){const a=i/12*Math.PI*2;const spoke=mesh(new THREE.CylinderGeometry(.035,.035,5.8,8),i%2?neonGold:neonPurple);spoke.rotation.z=a;spoke.position.set(Math.cos(a)*2.9,Math.sin(a)*2.9,0);wheel.add(spoke)}
const ferrisCabins=[];for(let i=0;i<12;i++){const a=i/12*Math.PI*2;const hanger=new THREE.Group();hanger.position.set(Math.cos(a)*6.2,Math.sin(a)*6.2,0);const cabin=mesh(new THREE.BoxGeometry(1.05,.75,.8),i%2?glass:new THREE.MeshPhysicalMaterial({color:0xffb85a,transmission:.45,transparent:true,opacity:.8,roughness:.1}),-.7);hanger.add(cabin);wheel.add(hanger);ferrisCabins.push(hanger)}
for(const x of [-3.8,3.8]){const support=mesh(new THREE.CylinderGeometry(.14,.28,10,12),parkGold,-3.2);support.position.x=x;support.rotation.z=x<0?-.35:.35;ferris.add(support)}
const hub=mesh(new THREE.CylinderGeometry(.45,.45,.8,24),paleGold);hub.rotation.x=Math.PI/2;wheel.add(hub);

// Code-generated fireworks repeat above the skyline without video assets.
const fireworks=[];const fwColors=[0xffcc65,0xd85cff,0x62d9ff];
for(let f=0;f<3;f++){const count=200,p=new Float32Array(count*3),dirs=[];for(let i=0;i<count;i++){const v=new THREE.Vector3().randomDirection().multiplyScalar(.45+Math.random()*.75);v.y*=.78;dirs.push(v)}const g=new THREE.BufferGeometry();g.setAttribute('position',new THREE.BufferAttribute(p,3));const m=new THREE.PointsMaterial({color:fwColors[f],size:.4,transparent:true,opacity:0,blending:THREE.AdditiveBlending,depthWrite:false,depthTest:false});const pts=new THREE.Points(g,m);pts.renderOrder=5;pts.position.set((f-1)*9,14+f*1.5,-15-f*2);scene.add(pts);fireworks.push({pts,dirs,delay:f*2.7})}

// fireflies
const N=14000,pos=new Float32Array(N*3),seed=new Float32Array(N),col=new Float32Array(N*3);const c1=new THREE.Color(0xffcf64),c2=new THREE.Color(0xd665ff);
for(let i=0;i<N;i++){const r=7+Math.pow(Math.random(),.65)*30,a=Math.random()*Math.PI*2;pos[i*3]=Math.cos(a)*r;pos[i*3+1]=Math.random()*17-.5;pos[i*3+2]=Math.sin(a)*r;seed[i]=Math.random()*10;const c=Math.random()>.84?c2:c1;col.set([c.r,c.g,c.b],i*3)}
const pg=new THREE.BufferGeometry();pg.setAttribute('position',new THREE.BufferAttribute(pos,3));pg.setAttribute('color',new THREE.BufferAttribute(col,3));const pm=new THREE.PointsMaterial({size:.04,vertexColors:true,transparent:true,opacity:.58,blending:THREE.AdditiveBlending,depthWrite:false,sizeAttenuation:true});const particles=new THREE.Points(pg,pm);scene.add(particles);
// volumetric light cones
const beamMat=new THREE.MeshBasicMaterial({color:0xc99cff,transparent:true,opacity:.009,blending:THREE.AdditiveBlending,depthWrite:false,side:THREE.DoubleSide});for(let i=0;i<4;i++){const a=i/4*Math.PI*2+Math.PI/4;const beam=mesh(new THREE.ConeGeometry(.8,12,32,1,true),beamMat,3.45);beam.rotation.z=Math.PI*.4;beam.rotation.y=a;beam.position.set(Math.sin(a)*5.2,4.2,Math.cos(a)*5.2);scene.add(beam)}

const composer=new EffectComposer(renderer);composer.addPass(new RenderPass(scene,camera));const ssao=new SSAOPass(scene,camera,innerWidth,innerHeight);ssao.kernelRadius=10;ssao.minDistance=.005;ssao.maxDistance=.13;composer.addPass(ssao);composer.addPass(new UnrealBloomPass(new THREE.Vector2(innerWidth,innerHeight),.42,.26,.66));composer.addPass(new OutputPass());
let mx=0,my=0,introActive=true,fireworkEpoch=-3;addEventListener('pointermove',e=>{mx=(e.clientX/innerWidth-.5)*2;my=(e.clientY/innerHeight-.5)*2});
addEventListener('pointerdown',()=>{introActive=false;fireworkEpoch=clock.elapsedTime});addEventListener('wheel',()=>introActive=false,{passive:true});
const keys=new Set();addEventListener('keydown',e=>{keys.add(e.key.toLowerCase());introActive=false});addEventListener('keyup',e=>keys.delete(e.key.toLowerCase()));
const moveForward=new THREE.Vector3(),moveRight=new THREE.Vector3();
const clock=new THREE.Clock();function animate(){requestAnimationFrame(animate);const dt=Math.min(clock.getDelta(),.03),t=clock.elapsedTime;if(introActive){const p=Math.min(1,t/8),ease=1-Math.pow(1-p,3);camera.position.z=32-ease*7;if(p===1)introActive=false}carousel.rotation.y=t*.105;horses.forEach((o,i)=>o.rig.position.y=3.3+Math.sin(t*1.25+o.phase)*.34);wheel.rotation.z=-t*.075;ferrisCabins.forEach(c=>c.rotation.z=-wheel.rotation.z);hourHand.rotation.z=-t*.025;minuteHand.rotation.z=-t*.13;bulbWarm.opacity=.7+Math.sin(t*3.1)*.25;bulbCold.opacity=.65+Math.sin(t*2.4+1.7)*.3;fireworks.forEach((fw,f)=>{const age=(t-fireworkEpoch-fw.delay+12)%12,burst=Math.max(0,Math.min(1,age/1.1)),fade=age<1.1?Math.sin(burst*Math.PI):0;const pa=fw.pts.geometry.attributes.position.array;for(let i=0;i<fw.dirs.length;i++){const v=fw.dirs[i];pa[i*3]=v.x*burst*7;pa[i*3+1]=v.y*burst*7-burst*burst*1.5;pa[i*3+2]=v.z*burst*7}fw.pts.geometry.attributes.position.needsUpdate=true;fw.pts.material.opacity=fade*.85});const a=pg.attributes.position.array;for(let i=0;i<N;i++){a[i*3+1]+=.006+seed[i]*.0005;a[i*3]+=(mx*.0025)*Math.sin(seed[i]+t);a[i*3+2]+=(my*.0025)*Math.cos(seed[i]+t);if(a[i*3+1]>17)a[i*3+1]=-.5}pg.attributes.position.needsUpdate=true;particles.rotation.y=-t*.008;key.intensity=275+Math.sin(t*.7)*15;rim.intensity=92+Math.sin(t*1.1)*10;if(keys.size){camera.getWorldDirection(moveForward);moveForward.y=0;moveForward.normalize();moveRight.crossVectors(moveForward,camera.up).normalize();const step=dt*5.2,delta=new THREE.Vector3();if(keys.has('w')||keys.has('arrowup'))delta.addScaledVector(moveForward,step);if(keys.has('s')||keys.has('arrowdown'))delta.addScaledVector(moveForward,-step);if(keys.has('a')||keys.has('arrowleft'))delta.addScaledVector(moveRight,-step);if(keys.has('d')||keys.has('arrowright'))delta.addScaledVector(moveRight,step);camera.position.add(delta);controls.target.add(delta)}if(!updateRide(t))controls.update();composer.render(dt)}
// Rebuild the square around a stone belfry and a moonlit approach.
const stone=new THREE.MeshStandardMaterial({color:0x514459,roughness:.78});
const slate=new THREE.MeshStandardMaterial({color:0x201b34,roughness:.58});
function detail(parent,g,m,x,y,z){const o=mesh(g,m,y);o.position.set(x,y,z);parent.add(o);return o}
const belfry=new THREE.Group();belfry.position.set(0,0,-11.35);scene.add(belfry);
centerRoof.visible=false;
clockFace.visible=hourHand.visible=minuteHand.visible=false;
detail(belfry,new THREE.BoxGeometry(3.25,10.7,1.1),stone,0,5.35,0);
for(let i=0;i<8;i++)detail(belfry,new THREE.BoxGeometry(3.55,.11,1.25),slate,0,1.25+i*1.29,.08);
for(const x of [-1.4,1.4]){
 detail(belfry,new THREE.BoxGeometry(.3,10.5,.45),stone,x,5.25,.68);
 detail(belfry,new THREE.BoxGeometry(.24,1.75,.28),stone,x,11.55,.45);
}
detail(belfry,new THREE.ConeGeometry(2.6,4.1,4),slate,0,14.25,0).rotation.y=Math.PI/4;
detail(belfry,new THREE.CylinderGeometry(.49,.76,.79,24),paleGold,0,11.48,.52);
const dial=document.createElement('canvas');dial.width=dial.height=512;
const ink=dial.getContext('2d');ink.fillStyle='#ffda91';ink.fillRect(0,0,512,512);ink.fillStyle='#321b28';ink.font='33px Georgia';ink.textAlign='center';ink.textBaseline='middle';
'XII I II III IV V VI VII VIII IX X XI'.split(' ').forEach((n,i)=>{const a=i*Math.PI/6;ink.fillText(n,256+198*Math.sin(a),256-198*Math.cos(a))});
const dialTexture=new THREE.CanvasTexture(dial);dialTexture.colorSpace=THREE.SRGBColorSpace;
detail(belfry,new THREE.CircleGeometry(1.04,64),new THREE.MeshBasicMaterial({map:dialTexture}),8.6,.82);
detail(belfry,new THREE.TorusGeometry(1.06,.055,12,64),paleGold,8.6,.84);
for(const [angle,length] of [[.7,.56],[-.36,.8]]){
 const hand=new THREE.Group();hand.position.set(0,8.6,.9);hand.rotation.z=angle;belfry.add(hand);
 detail(hand,new THREE.BoxGeometry(.058,length,.045),slate,0,length/2,0);
}
const paving=new THREE.BoxGeometry(.94,.075,.58);
const cobbles=new THREE.InstancedMesh(paving,stone,420);cobbles.receiveShadow=true;
const tile=new THREE.Object3D();
for(let i=0;i<420;i++){
 const row=Math.floor(i/10);tile.position.set((i%10-4.5)*.99+(row%2)*.18,.176,16-row*.63);
 tile.rotation.y=.07*Math.sin(i*13);tile.updateMatrix();cobbles.setMatrixAt(i,tile.matrix);
 cobbles.setColorAt(i,new THREE.Color().setScalar(.62+.36*(.5+.5*Math.sin(i*127.1))));
}
scene.add(cobbles);
for(const [x,z,s] of [[-3.4,13,1.35],[3.6,12,1.2],[-4.3,10,.68],[4.6,8,.76]]){
 const lantern=pumpkin(x,z,s);
 const grin=new THREE.Shape();
 grin.moveTo(-.34,-.1);grin.lineTo(-.17,-.2);grin.lineTo(-.09,-.15);grin.lineTo(0,-.22);grin.lineTo(.11,-.14);grin.lineTo(.18,-.18);grin.lineTo(.34,-.1);
 grin.quadraticCurveTo(0,-.43,-.34,-.1);
 lantern.children[3].visible=false;
 detail(lantern,new THREE.ShapeGeometry(grin),pumpkinGlow,0,0,.56);
}
// The loop circles the rides outside their footprints.
const track=new THREE.CatmullRomCurve3([
 [8,1.8,15],[17,3,9],[21,8,-4],[18,5,-16],[8,9,-23],
 [-8,6,-24],[-19,3,-14],[-20,7,2],[-13,4,15],[-3,2,19]
].map(v=>new THREE.Vector3(...v)),true,'centripetal');
track.arcLengthDivisions=800;
const up=new THREE.Vector3(0,1,0);
const sideAt=u=>new THREE.Vector3().crossVectors(track.getTangentAt(u),up).normalize();
for(const side of [-1,1]){
 const samples=Array.from({length:180},(_,i)=>track.getPointAt(i/180).addScaledVector(sideAt(i/180),side*.4));
 scene.add(mesh(new THREE.TubeGeometry(new THREE.CatmullRomCurve3(samples,true),300,.047,6,true),parkGold));
}
for(let i=0;i<120;i++){
 const u=i/120,p=track.getPointAt(u),tangent=track.getTangentAt(u);
 const tie=detail(scene,new THREE.BoxGeometry(1.12,.09,.16),slate,p.x,p.y-.07,p.z);
 tie.rotation.y=Math.atan2(tangent.x,tangent.z);
 if(i%8===0)detail(scene,new THREE.CylinderGeometry(.09,.16,p.y,8),stone,p.x,p.y/2,p.z);
}
const car=new THREE.Group();scene.add(car);
detail(car,new THREE.BoxGeometry(.92,.34,1.36),paleGold,0,.24,0);
detail(car,new THREE.BoxGeometry(.84,.46,.14),midnight,0,.53,-.49);
detail(car,new THREE.BoxGeometry(.78,.12,.06),neonPurple,0,.29,.69);
const rideButton=document.createElement('button');
rideButton.textContent='乘坐过山车';
rideButton.style.cssText='position:fixed;z-index:5;right:16px;top:20px;padding:9px 14px;border:1px solid #d8aa68;border-radius:20px;background:#19122bea;color:#fff1ca;cursor:pointer';
document.body.append(rideButton);
const savedPosition=new THREE.Vector3(),savedTarget=new THREE.Vector3();
let rideStart=null;
function stopRide(){
 if(rideStart===null)return;
 rideStart=null;camera.position.copy(savedPosition);controls.target.copy(savedTarget);
 controls.enabled=true;rideButton.textContent='乘坐过山车';
}
rideButton.addEventListener('pointerdown',event=>event.stopPropagation());
rideButton.addEventListener('click',()=>{
 if(rideStart!==null){stopRide();return}
 introActive=false;keys.clear();controls.update();savedPosition.copy(camera.position);savedTarget.copy(controls.target);
 rideStart=clock.elapsedTime;controls.enabled=false;rideButton.textContent='退出乘坐';
});
addEventListener('keydown',event=>{if(event.key==='Escape')stopRide()});
function updateRide(t){
 const progress=rideStart===null?0:(t-rideStart)/26;
 if(progress>=1){stopRide();return false}
 const point=track.getPointAt(progress),tangent=track.getTangentAt(progress);
 car.position.copy(point);car.lookAt(point.clone().add(tangent));
 if(rideStart===null)return false;
 camera.position.copy(point).addScaledVector(up,.86);
 const ahead=track.getPointAt((progress+.012)%1).addScaledVector(up,.78);
 camera.lookAt(ahead);
 return true;
}
animate();setTimeout(()=>document.body.classList.add('ready'),700);
addEventListener('resize',()=>{camera.aspect=innerWidth/innerHeight;camera.updateProjectionMatrix();renderer.setSize(innerWidth,innerHeight);composer.setSize(innerWidth,innerHeight)});
