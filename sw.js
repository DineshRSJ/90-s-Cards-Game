const C='cg90-v7',OK=/(^|\.)(fonts\.googleapis\.com|fonts\.gstatic\.com|www\.gstatic\.com|cdn\.jsdelivr\.net|unpkg\.com|cdnjs\.cloudflare\.com|githubusercontent\.com)$/;
self.addEventListener('install',()=>self.skipWaiting());
self.addEventListener('activate',e=>e.waitUntil(self.clients.claim()));
self.addEventListener('fetch',e=>{const r=e.request,u=new URL(r.url);
if(r.method!=='GET'||r.headers.has('range')||!/^https?:$/.test(u.protocol)||/peerjs\.com/.test(u.host)||(u.origin!==location.origin&&!OK.test(u.host)))return;
e.respondWith(caches.open(C).then(async c=>{const hit=await c.match(r,{ignoreSearch:u.origin===location.origin&&r.mode==='navigate'});
const net=fetch(r).then(res=>{if(res&&(res.status===200||res.type==='opaque'))c.put(r,res.clone()).catch(()=>{});return res}).catch(()=>hit||(r.mode==='navigate'?c.match(location.pathname.replace(/sw\.js$/,'')):undefined));
return hit||net}))});
