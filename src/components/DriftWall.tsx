import { useEffect, useMemo, useRef, useState } from 'react';
import type { CSSProperties } from 'react';
import { Play } from 'lucide-react';
import './DriftWall.css';

// Adapted from the React Bits DriftWall source supplied with this request.
export type DriftItem = { image: string; title: string; src: string; poster?: string; source?: string };
type Props = { items: DriftItem[]; onSelect: (item: DriftItem) => void; paused?: boolean; columns?: number; tileWidth?: number; tileHeight?: number; gap?: number; tilt?: number; turn?: number; perspective?: number; depth?: number; speed?: number; variance?: number; parallax?: number; lift?: number; fade?: number; dim?: number; overlayColor?: string };
export default function DriftWall({items,onSelect,paused=false,columns=5,tileWidth=220,tileHeight=290,gap=18,tilt=12,turn=-12,perspective=1200,depth=80,speed=32,variance=.45,parallax=.6,lift=48,fade=.35,dim=.85,overlayColor='#080818'}:Props){
 const root=useRef<HTMLDivElement>(null),plane=useRef<HTMLDivElement>(null),tracks=useRef<(HTMLDivElement|null)[]>([]);
 const pointer=useRef({x:0,y:0}),hover=useRef(false),focused=useRef(false),visible=useRef(true);
 const [height,setHeight]=useState(640),[width,setWidth]=useState(1100),[reduced,setReduced]=useState(false);
 useEffect(()=>{const mq=matchMedia('(prefers-reduced-motion: reduce)');const update=()=>setReduced(mq.matches);update();mq.addEventListener('change',update);return()=>mq.removeEventListener('change',update)},[]);
 useEffect(()=>{if(!root.current)return;const ro=new ResizeObserver(([e])=>{setHeight(e.contentRect.height);setWidth(e.contentRect.width)});ro.observe(root.current);const io=new IntersectionObserver(([e])=>{visible.current=e.isIntersecting});io.observe(root.current);return()=>{ro.disconnect();io.disconnect()}},[]);
 const count=Math.min(columns,width<600?3:columns);
 const cols=useMemo(()=>{const result=Array.from({length:count},()=>[] as DriftItem[]);items.forEach((item,i)=>result[i%count].push(item));return result.map(c=>c.length?c:items.slice(0,1))},[items,count]);
 const actualWidth=width<600?155:tileWidth,actualHeight=width<600?210:tileHeight;
 const meta=useMemo(()=>cols.map(c=>{const copyHeight=Math.max(1,c.length)*(actualHeight+gap);return {copyHeight,copies:Math.max(3,Math.ceil(height*2/copyHeight)+2)}}),[cols,actualHeight,gap,height]);
 useEffect(()=>{if(reduced)return;let raf=0,last=0;const offsets=meta.map((m,c)=>m.copyHeight*((c*.37)%1)),velocities=meta.map(()=>0);let px=0,py=0;
 const animate=(ts:number)=>{const dt=Math.min(.05,last?(ts-last)/1000:0);last=ts;
 if(visible.current&&!document.hidden){const stop=paused||hover.current||focused.current;const damping=1-Math.exp(-dt/.12);px+=(pointer.current.x*parallax*8-px)*damping;py+=(-pointer.current.y*parallax*8-py)*damping;
 if(plane.current)plane.current.style.transform=`translate(-50%, -50%) scale(1.18) rotateX(${tilt+py}deg) rotateY(${turn+px}deg) translateZ(${-depth}px)`;
 meta.forEach((m,c)=>{const pseudo=((c*.6180339887+.35)%1)*2-1;const target=stop?0:speed*(1+variance*pseudo)*(c%2?-1:1);velocities[c]+=(target-velocities[c])*(1-Math.exp(-dt/(stop?.16:.28)));offsets[c]=((offsets[c]+velocities[c]*dt)%m.copyHeight+m.copyHeight)%m.copyHeight;const el=tracks.current[c];if(el)el.style.transform=`translate3d(0,${-offsets[c]}px,0)`})}
 raf=requestAnimationFrame(animate)};raf=requestAnimationFrame(animate);return()=>cancelAnimationFrame(raf)
 },[meta,paused,reduced,speed,variance,parallax,tilt,turn,depth]);
 const css={'--dw-tile-w':`${actualWidth}px`,'--dw-tile-h':`${actualHeight}px`,'--dw-gap':`${gap}px`,'--dw-perspective':`${perspective}px`,'--dw-lift':`${lift}px`,'--dw-dim':dim,'--dw-overlay':overlayColor,'--dw-edge':`${(1-fade)*100}%`} as CSSProperties;
 const tile=(item:DriftItem,id:string,duplicate=false)=><button key={id} className="drift-wall__tile" tabIndex={duplicate?-1:0} aria-hidden={duplicate?true:undefined} aria-label={'播放'+item.title} onClick={()=>onSelect(item)}><span className="drift-wall__inner"><img src={item.image} alt="" loading="lazy" draggable={false}/><span className="drift-wall__overlay"/><span className="drift-wall__caption">{item.title}<Play size={16} fill="currentColor"/></span></span></button>;
 return <div ref={root} className={'drift-wall'+(reduced?' drift-wall--reduced':'')} style={css} onPointerEnter={()=>{hover.current=true}} onPointerMove={e=>{if(e.pointerType==='touch')return;const r=e.currentTarget.getBoundingClientRect();pointer.current={x:(e.clientX-r.left)/r.width-.5,y:(e.clientY-r.top)/r.height-.5}}} onPointerLeave={()=>{hover.current=false;pointer.current={x:0,y:0}}} onFocusCapture={()=>{focused.current=true}} onBlurCapture={e=>{if(!e.currentTarget.contains(e.relatedTarget))focused.current=false}} aria-label="拍摄案例动态影像墙">
 {reduced?<div className="drift-wall__static">{items.map((item,i)=>tile(item,String(i)))}</div>:<div ref={plane} className="drift-wall__plane">{cols.map((col,c)=><div key={c} className="drift-wall__col"><div className="drift-wall__track" ref={el=>{tracks.current[c]=el}}>{Array.from({length:meta[c].copies},(_,copy)=>col.map((item,i)=>tile(item,`${c}-${copy}-${i}`,copy!==1)))}</div></div>)}</div>}
 </div>
}

