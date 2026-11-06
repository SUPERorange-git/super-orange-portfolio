const CampusAttachments=(()=>{
  const open=()=>new Promise((resolve,reject)=>{const r=indexedDB.open('campus-attachments',1);r.onupgradeneeded=()=>r.result.createObjectStore('files');r.onsuccess=()=>resolve(r.result);r.onerror=()=>reject(Error('附件存储不可用'));});
  async function save(files){
    if(files.length>10||files.some(f=>!f.size)||files.reduce((n,f)=>n+f.size,0)>50*1024*1024)throw Error('每次最多10个非空文件，总计不超过50MB');
    if(files.some(f=>!/\.(pdf|docx?|xlsx?|pptx?|txt|csv|png|jpe?g|webp|gif|mp4|mov|mp3|wav|zip|rar|7z|psd|ai)$/i.test(f.name)))throw Error('请选择文档、图片、影音、设计源文件或ZIP/RAR/7Z压缩包');
    if(!files.length)return [];
    const db=await open(),items=files.map(f=>({id:crypto.randomUUID(),name:f.name,size:f.size}));
    try{await new Promise((resolve,reject)=>{const tx=db.transaction('files','readwrite');files.forEach((f,i)=>tx.objectStore('files').put(f,items[i].id));tx.oncomplete=resolve;tx.onerror=()=>reject(Error('附件保存失败，可能存储空间不足'));tx.onabort=()=>reject(Error('附件保存中断'));});return items;}finally{db.close();}
  }
  async function download(id){const db=await open();try{const file=await new Promise((resolve,reject)=>{const r=db.transaction('files').objectStore('files').get(id);r.onsuccess=()=>resolve(r.result);r.onerror=reject;});if(!file)throw Error('本机没有此附件，可能已清理浏览器数据或来自其他设备');const url=URL.createObjectURL(file),a=document.createElement('a');a.href=url;a.download=file.name;a.click();setTimeout(()=>URL.revokeObjectURL(url),30000);}finally{db.close();}}
  return {save,download};
})();
