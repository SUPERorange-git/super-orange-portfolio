(()=>{
 const head=document.getElementById('site-header');
 const scroll=()=>head?.classList.toggle('scrolled',scrollY>24);
 window.addEventListener('scroll',scroll,{passive:true});scroll();
 const toggle=document.getElementById('menu-toggle'),menu=document.getElementById('mobile-nav');
 toggle?.addEventListener('click',()=>{const open=toggle.getAttribute('aria-expanded')==='true';toggle.setAttribute('aria-expanded',String(!open));toggle.setAttribute('aria-label',open?'打开导航菜单':'关闭导航菜单');menu?.classList.toggle('open',!open)});
 menu?.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{toggle?.setAttribute('aria-expanded','false');menu.classList.remove('open')}));
 const filters=document.querySelectorAll('.filter-btn');filters.forEach(btn=>btn.addEventListener('click',()=>{filters.forEach(b=>b.classList.toggle('active',b===btn));document.querySelectorAll('.filter-card').forEach(c=>c.classList.toggle('hidden',btn.dataset.filter!=='all'&&c.dataset.category!==btn.dataset.filter))}));
 const query=new URLSearchParams(location.search);const service=query.get('service');if(service){const select=document.getElementById('service-select');if(select){const option=Array.from(select.options).find(o=>o.value===service);if(option)select.value=service;else select.value='定制整合项目';}}
 const form=document.getElementById('contact-form');form?.addEventListener('submit',ev=>{ev.preventDefault();if(!form.reportValidity())return;const v=Object.fromEntries(new FormData(form));const subject=`SUPER ORANGE 项目咨询 - ${v.client}`;const body=`称呼/企业：${v.client}\n联系邮箱：${v.email}\n服务领域：${v.service}\n预算：${v.budget}\n预期时间：${v.timeline||'待沟通'}\n\n项目需求：\n${v.message}`;const href=`mailto:1754501408@qq.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;const note=document.getElementById('form-note');if(note)note.textContent='已尝试打开默认邮箱应用。请在邮件中确认内容并点击发送。如未打开，请使用页面显示的商务邮箱。';location.href=href;});
 if('IntersectionObserver'in window&&!matchMedia('(prefers-reduced-motion: reduce)').matches){const io=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('visible');io.unobserve(entry.target)}}),{threshold:.06});document.querySelectorAll('.reveal').forEach(el=>io.observe(el));}else document.querySelectorAll('.reveal').forEach(el=>el.classList.add('visible'));
})();
