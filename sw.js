const C="bp-v14";const A=["./","./index.html","./manifest.webmanifest","./icon-192.png","./icon-512.png","./poster.webp"];
self.addEventListener("install",e=>{e.waitUntil(caches.open(C).then(c=>c.addAll(A)));self.skipWaiting()});
self.addEventListener("activate",e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!=C).map(x=>caches.delete(x)))));self.clients.claim()});
self.addEventListener("fetch",e=>{const r=e.request;if(r.method!="GET"||new URL(r.url).origin!=location.origin||r.headers.has("range"))return;
const u=new URL(r.url);const fresh=r.mode=="navigate"||/\.(html|js|webmanifest|svg)$/.test(u.pathname)||u.pathname.endsWith("/");e.respondWith(fetch(fresh?new Request(r,{cache:"no-store"}):r).then(res=>{if(res.status===200){const c=res.clone();caches.open(C).then(x=>x.put(r,c))}return res}).catch(()=>caches.match(r).then(m=>m||caches.match("./index.html"))))});
