import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { ArrowUpRight, ArrowRight, ArrowLeft, Play, X, Expand, Check, Copy } from 'lucide-react';
import films from './data/shoot.json';
import './styles/shoot.css';

type Media = { title: string; src: string; poster?: string; source?: string };
const intro = films.find(f => f.category === '自我介绍')!;
const works = films.filter(f => f.category !== '自我介绍');
export default function App() {
 const [page,setPage]=useState(location.hash === '#about' ? 1 : 0);
 const [category,setCategory]=useState('全部');
 const [media,setMedia]=useState<Media|null>(null);
 const [copied,setCopied]=useState(false);
 const [failed,setFailed]=useState(false);
 const dialog=useRef<HTMLDialogElement>(null);
 const previousFocus=useRef<HTMLElement|null>(null);
 const reduce=useReducedMotion();
 useEffect(()=>{const change=()=>{setPage(location.hash==='#about'?1:0);window.scrollTo({top:0,behavior:'instant'})};window.addEventListener('hashchange',change);return()=>window.removeEventListener('hashchange',change)},[]);
 useEffect(()=>{if(media){previousFocus.current=document.activeElement as HTMLElement;setFailed(false);dialog.current?.showModal();document.body.style.overflow='hidden'}else{dialog.current?.close();document.body.style.overflow='';previousFocus.current?.focus()}return()=>{document.body.style.overflow=''}},[media]);
 const navigate=(next:number)=>{location.hash=next?'about':'work';setPage(next);window.scrollTo({top:0,behavior:'instant'})};
 async function copy(){try{await navigator.clipboard.writeText('Super-orange-_-');setCopied(true);setTimeout(()=>setCopied(false),2500)}catch{setCopied(false)}}
 const reveal={initial:{opacity:1,y:reduce?0:24},whileInView:{opacity:1,y:0},viewport:{once:true},transition:{duration:reduce?0:0.9}};
 return <><a className="skip" href="#main">跳至正文</a><header className="nav"><a className="brand" href="#work" aria-label="超级橘橘首页">橘橘<span>SUPER ORANGE</span></a><nav aria-label="页面导航"><button aria-current={page===0?'page':undefined} onClick={()=>navigate(0)}>影像作品<span>01</span></button><button aria-current={page===1?'page':undefined} onClick={()=>navigate(1)}>关于我<span>02</span></button></nav><a className="contact-nav" href="mailto:1754501408@qq.com">拍摄合作 <ArrowUpRight size={15}/></a></header>
 <main id="main"><AnimatePresence mode="wait"><motion.div key={page} initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} transition={{duration:reduce?0:0.3}}>
 {page===0?<>
 <section className="hero" aria-labelledby="hero-title"><div className="hero-copy"><h1 id="hero-title">超级<span>橘橘</span><i>In the frame.</i></h1><p className="roles">演员 / 模特 / 主播 <span>武汉</span></p><p className="hero-line">用影像，<br/>记录更好的生活。</p><div className="measurements"><span><strong>177<small>cm</small></strong>身高</span><span><strong>60<small>kg</small></strong>体重</span><span><strong>43</strong>鞋码</span></div><button className="text-link" onClick={()=>setMedia({title:'橘橘 · 完整模卡',src:'/shoot/model.jpg'})}>查看完整模卡 <Expand size={16}/></button></div><button className="hero-photo" onClick={()=>setMedia({title:'橘橘 · 完整模卡',src:'/shoot/model.jpg'})} aria-label="放大查看模卡"><img src="/shoot/model.jpg" alt="橘橘模卡中的人物照片"/><span className="photo-caption">阳光 · 青春 · 自然 · 亲和 · 活力 <Expand size={17}/></span></button><div className="hero-bottom"><span>PERSONAL PORTFOLIO</span><a href="#introduction" onClick={e=>{e.preventDefault();document.getElementById('introduction')?.scrollIntoView({behavior:reduce?'instant':'smooth'})}}>向下探索 <ArrowRight size={15}/></a></div></section>
 <motion.section {...reveal} className="intro section" id="introduction"><div><h2>先认识一下。<em>A little introduction.</em></h2><p>镜头里的我，从这里开始。</p><button className="text-link" onClick={()=>setMedia(intro)}>播放自我介绍 <Play size={15}/></button></div><button className="intro-preview" onClick={()=>setMedia(intro)} aria-label="播放自我介绍视频"><img src={intro.poster} alt="自我介绍视频封面" loading="lazy"/><span className="play"><Play fill="currentColor" size={22}/></span><span className="video-caption">自我介绍 <ArrowUpRight size={18}/></span></button></motion.section>
 <section className="section works" id="cases"><div className="section-top"><h2>拍摄案例<em>Selected work.</em></h2><div className="filters" role="group" aria-label="案例分类">{['全部','口播','信息流','宣传片'].map(c=><button key={c} aria-pressed={category===c} onClick={()=>setCategory(c)}>{c}<sup>{c==='全部'?works.length:works.filter(f=>f.category===c).length}</sup></button>)}</div></div><div className="film-grid">{works.filter(f=>category==='全部'||f.category===category).map((f,i)=><motion.button {...reveal} className={'film '+(f.category==='宣传片'?'wide':'')} key={f.src} onClick={()=>setMedia(f)} aria-label={'播放'+f.title}><div className="film-image"><img src={f.poster} alt={f.title+'视频封面'} loading="lazy"/><span className="small-play"><Play size={18} fill="currentColor"/></span><span className="film-category">{f.category}</span></div><div className="film-title"><span><small>{String(i+1).padStart(2,'0')} / </small>{f.title}</span><ArrowUpRight size={18}/></div></motion.button>)}</div></section>
 <button className="next-page" onClick={()=>navigate(1)}><span>继续了解<small>个人简介 · 合作联系</small></span><strong>关于我 <ArrowRight/></strong></button>
 </>:<>
 <section className="about section"><div className="about-heading"><h1>镜头之外，<br/><span>也是橘橘。</span></h1><p>演员 / 模特 / 主播 · 武汉</p></div><div className="about-layout"><button className="profile-image" onClick={()=>setMedia({title:'超级橘橘 · 个人简介',src:'/shoot/profile.png'})}><img src="/shoot/profile.png" alt="超级橘橘个人简介原图"/><span>查看资料原图 <Expand size={16}/></span></button><div className="bio"><h2>自然入镜，<br/>认真表达。</h2><p className="keywords">阳光 / 青春 / 自然 / 亲和 / 活力</p><article><h3>代表经历</h3><p>武汉市市场监督管理局、武汉市公安局、武汉市检察院、武汉市中级人民法院、武汉光谷知识产权研究院等宣传片男主角。</p></article><article><h3>商业经验</h3><p>家居、美妆、酒水、商超、豆包、抖音。<br/>品牌广告、剧情、口播、信息流均有拍摄经验。</p></article><article><h3>个人技能</h3><p>普通话一乙 / 唱歌 / 吉他 / 滑雪</p></article><article><h3>合作方向</h3><p>品牌广告 / 商业宣传片 / 剧情短片 / 口播 / 信息流</p></article></div></div></section>
 <section className="contact section"><h2>期待与你，<br/><span>一起入镜。</span></h2><div className="contact-details"><a href="tel:13797037491"><span>电话</span><strong>137 9703 7491</strong><ArrowUpRight/></a><button onClick={copy}><span>微信</span><strong>Super-orange-_-</strong>{copied?<Check/>:<Copy size={19}/>}</button><span className="copy-status" role="status">{copied?'微信号已复制':'点击微信号复制'}</span><a href="mailto:1754501408@qq.com"><span>邮箱</span><strong>1754501408@qq.com</strong><ArrowUpRight/></a></div></section><button className="back-page text-link" onClick={()=>navigate(0)}><ArrowLeft size={18}/> 返回影像作品</button>
 </>}
 </motion.div></AnimatePresence></main><footer><span>超级橘橘</span><span>演员 · 模特 · 主播</span><span>{page===0?'01':'02'} / 02</span></footer>
 <dialog ref={dialog} className="media-dialog" onCancel={()=>setMedia(null)} onClick={e=>{if(e.target===e.currentTarget)setMedia(null)}} aria-label={media?.title}><div className="modal-head"><span>{media?.title}</span><button onClick={()=>setMedia(null)} aria-label="关闭预览"><X/></button></div>{media&&(media.src.endsWith('.mp4')?<video key={media.src} src={media.src} poster={media.poster} autoPlay controls playsInline preload="metadata" onError={()=>setFailed(true)}/>:<img src={media.src} alt={media.title}/>)}{failed&&<p role="alert">视频加载失败，请<a href={media?.src}>直接打开视频</a>重试。</p>}{media?.source?.startsWith('出品单位')&&<p className="source-credit">{media.source.replace(/\.$/,'')}</p>}</dialog>
 </>;
}

