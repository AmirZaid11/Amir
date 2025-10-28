// script.js
// Handles canvas bursting background, welcome flow, UI interactions, modals, and mock trending.

// ---------- Data (channels + mock posts) ----------
const CHANNELS = [
  { id: 'silent', title:'Silent Author', tagline:'Where I tell your story in Pen, my crying pen', imgSeed:'writing', link:'https://chat.whatsapp.com/YOUR_INVITE_1' },
  { id: 'motivate', title:'Motivational & Inspiration', tagline:'Go hard or Go home', imgSeed:'motivation', link:'https://chat.whatsapp.com/YOUR_INVITE_2' },
  { id: 'funny', title:'Funny Chats', tagline:'Hilarious Responses, Laugh with us', imgSeed:'funny', link:'https://chat.whatsapp.com/YOUR_INVITE_3' },
  { id: 'girlchild', title:'Maseno Girlchild empowerment', tagline:'If not Ladies, who else', imgSeed:'girlchild', link:'https://chat.whatsapp.com/YOUR_INVITE_4' },
  { id: 'classy', title:'Not Sassy, Just Classy', tagline:'Story Za jaba reloaded', imgSeed:'classy', link:'https://chat.whatsapp.com/YOUR_INVITE_5' },
  { id: 'maseno', title:'Maseno University', tagline:'All updates From our University', imgSeed:'campus', link:'https://chat.whatsapp.com/YOUR_INVITE_6' },
  { id: 'feel', title:'These Feelings', tagline:'Expressing My Heart in wild form', imgSeed:'feelings', link:'https://chat.whatsapp.com/YOUR_INVITE_7' }
];

const MOCK_POSTS = {
  silent: [{ title:'Episode 1: After the goodbye', excerpt:'I write with a pen that cries, telling the story of him...', time:'2025-10-17' }],
  motivate: [{ title:'Rise & Grind: Day 1', excerpt:'Small steps create mountains — start today.', time:'2025-10-10' }],
  funny: [{ title:'Meme drop: Monday', excerpt:'When your code runs on the first try — impossible.', time:'2025-10-20' }],
  girlchild: [{ title:'Mentorship meetup', excerpt:'Join us this Saturday for CV building & mentorship.', time:'2025-10-12' }],
  classy: [{ title:'Short: Jaba Reloaded', excerpt:'Elegance with a twist — new chapter live.', time:'2025-09-28' }],
  maseno: [{ title:'Term Dates 2025', excerpt:'The senate approved new term dates for 2024-2025', time:'2025-07-14' }],
  feel: [{ title:'Confession: I loved and lost', excerpt:'It was a river of reasons and quiet nights.', time:'2025-08-28' }]
};

let TRENDING = [
  { title:'Episode 1: After the goodbye', channel:'Silent Author', time:'2025-10-17' },
  { title:'Rise & Grind: Day 1', channel:'Motivational & Inspiration', time:'2025-10-10' },
  { title:"Mentorship meetup", channel:'Maseno Girlchild empowerment', time:'2025-10-12' },
  { title:'Meme drop: Monday', channel:'Funny Chats', time:'2025-10-20' }
];

// ---------- Utilities ----------
const qs = s => document.querySelector(s);
const qsa = s => Array.from(document.querySelectorAll(s));

// DOM refs
const cardsEl = qs('#cards');
const trendListEl = qs('#trendList');
const modalBackdrop = qs('#channelModal');
const modalTitle = qs('#modalTitle');
const modalTag = qs('#modalTag');
const modalImg = qs('#modalImg');
const modalBody = qs('#modalBody');
const modalJoin = qs('#modalJoin');
const modalClose = qs('#modalClose');
const contactModal = qs('#contactModal');
const contactClose = qs('#contactClose');
const contactStatus = qs('#contactStatus');
const welcomeScreen = qs('#welcomeScreen');
const mainEl = qs('#main');
const yearEl = qs('#year');

yearEl.textContent = new Date().getFullYear();

// ---------- Canvas bursting background ----------
(function createBurstCanvas(){
  const canvas = qs('#bgCanvas');
  const ctx = canvas.getContext('2d');
  let W = canvas.width = innerWidth;
  let H = canvas.height = innerHeight;
  window.addEventListener('resize', () => {
    W = canvas.width = innerWidth;
    H = canvas.height = innerHeight;
  });

  // Particle / blob class
  class Blob {
    constructor(x,y,r, hueA, hueB, speed, drift){
      this.x = x; this.y = y; this.r = r;
      this.hueA = hueA; this.hueB = hueB;
      this.speed = speed;
      this.drift = drift;
      this.t = Math.random()*1000;
    }
    step(dt){
      this.t += dt * this.speed;
      // small orbit + drift
      this.x += Math.sin(this.t*0.2)*0.15 + this.drift.x * dt;
      this.y += Math.cos(this.t*0.15)*0.12 + this.drift.y * dt;
      // bounce edges softly
      if(this.x < -this.r) this.x = W + this.r;
      if(this.x > W + this.r) this.x = -this.r;
      if(this.y < -this.r) this.y = H + this.r;
      if(this.y > H + this.r) this.y = -this.r;
    }
    draw(ctx){
      // radial gradient with two hues
      const g = ctx.createRadialGradient(this.x, this.y, this.r*0.05, this.x, this.y, this.r);
      g.addColorStop(0, `rgba(${this.hueA.join(',')},0.95)`);
      g.addColorStop(0.35, `rgba(${this.hueA.join(',')},0.6)`);
      g.addColorStop(0.65, `rgba(${this.hueB.join(',')},0.35)`);
      g.addColorStop(1, `rgba(${this.hueB.join(',')},0.0)`);
      ctx.globalCompositeOperation = 'screen';
      ctx.fillStyle = g;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.r, 0, Math.PI*2);
      ctx.fill();
    }
  }

  // helper to pick color pairs
  function pickPair(i){
    // some pleasant color pairs (RGB arrays)
    const pairs = [
      [[255,107,107],[255,198,113]],
      [[123,97,255],[52,211,153]],
      [[255,90,145],[255,195,180]],
      [[100,200,255],[150,120,255]],
      [[255,160,100],[240,100,180]]
    ];
    return pairs[i % pairs.length];
  }

  // create blobs
  const blobs = [];
  const count = Math.max(5, Math.floor((W*H)/150000)); // scale by screen area
  for(let i=0;i<count;i++){
    const r = 160 + Math.random()*220;
    const x = Math.random()*W;
    const y = Math.random()*H;
    const [a,b] = pickPair(i);
    const speed = 0.06 + Math.random()*0.14;
    const drift = { x: (Math.random()-0.5)*0.04, y: (Math.random()-0.5)*0.04 };
    blobs.push(new Blob(x,y,r,a,b,speed,drift));
  }

  let last = performance.now();
  function loop(now){
    const dt = (now - last) / 1000;
    last = now;
    // clear
    ctx.clearRect(0,0,W,H);
    // subtle dark overlay to keep contrast
    ctx.fillStyle = 'rgba(7,16,33,0.35)';
    ctx.fillRect(0,0,W,H);
    // draw blobs
    for(const b of blobs){
      b.step(dt);
      b.draw(ctx);
    }
    requestAnimationFrame(loop);
  }
  requestAnimationFrame(loop);
})();

// ---------- UI: render channels and trending ----------
function renderChannels(){
  cardsEl.innerHTML = '';
  CHANNELS.forEach((c,i) => {
    const img = `https://picsum.photos/seed/${encodeURIComponent(c.imgSeed)}${i}/900/600`;
    const card = document.createElement('article'); card.className='card'; card.tabIndex=0;
    card.innerHTML = `
      <img class="card-img" src="${img}" alt="${c.title}">
      <div class="card-body">
        <div class="card-title">${c.title}</div>
        <div class="card-tag">${c.tagline}</div>
        <div class="card-desc">${(MOCK_POSTS[c.id] && MOCK_POSTS[c.id][0]) ? MOCK_POSTS[c.id][0].excerpt : c.tagline}</div>
        <div class="card-actions">
          <button class="btn join" data-id="${c.id}">Open Channel</button>
          <button class="btn copy" data-link="${c.link}">Copy Link</button>
        </div>
      </div>`;
    // events
    card.querySelector('.btn.join').addEventListener('click', (e)=>{ e.stopPropagation(); openChannelModal(c.id); });
    card.querySelector('.btn.copy').addEventListener('click', async (e)=>{ e.stopPropagation(); try { await navigator.clipboard.writeText(c.link); showToast('Link copied', `${c.title} link copied.`);} catch { showToast('Copy failed','Open the link manually.'); }});
    card.addEventListener('click', ()=> openChannelModal(c.id));
    card.addEventListener('keydown', (ev)=> { if(ev.key==='Enter') openChannelModal(c.id) });
    cardsEl.appendChild(card);
  });
}

function renderTrending(){
  trendListEl.innerHTML = '';
  TRENDING.forEach((t,idx) => {
    const it = document.createElement('div'); it.className='trend-item';
    it.innerHTML = `<div class="trend-dot">${idx+1}</div>
      <div class="trend-info"><div class="t-title">${t.title}</div><div class="t-src">${t.channel} • ${t.time}</div></div>`;
    it.addEventListener('click', ()=> showToast(t.title, `From ${t.channel}`));
    trendListEl.appendChild(it);
  });
}

function pushRandomTrend(){
  const all = Object.keys(MOCK_POSTS).flatMap(k => (MOCK_POSTS[k]||[]).map(p => ({...p, channel: CHANNELS.find(c=>c.id===k)?.title || k})));
  if(!all.length) return;
  const pick = all[Math.floor(Math.random()*all.length)];
  TRENDING.unshift({ title: pick.title, channel: pick.channel, time: pick.time || new Date().toISOString().slice(0,10) });
  if(TRENDING.length>8) TRENDING.pop();
  renderTrending();
  showToast('New trending', `${pick.title} • ${pick.channel}`);
}

// ---------- Channel modal ----------
function openChannelModal(id){
  const channel = CHANNELS.find(c=>c.id===id);
  if(!channel) return;
  qs('#modalTitle').textContent = channel.title;
  qs('#modalTag').textContent = channel.tagline;
  qs('#modalImg').src = `https://picsum.photos/seed/${encodeURIComponent(channel.imgSeed + 'modal')}/1200/800`;
  qs('#modalJoin').href = channel.link;
  const body = qs('#modalBody');
  body.innerHTML = '';
  const posts = MOCK_POSTS[id] || [];
  if(!posts.length) body.innerHTML = `<div style="color:var(--muted)">No recent posts yet.</div>`;
  else posts.forEach(p => {
    const pEl = document.createElement('div'); pEl.className='post';
    pEl.innerHTML = `<div style="width:74px;height:74px;border-radius:8px;overflow:hidden"><img src="https://picsum.photos/seed/${encodeURIComponent(channel.imgSeed + p.title)}/200/140" alt="" style="width:100%;height:100%;object-fit:cover"></div>
      <div style="flex:1"><div style="font-weight:700">${p.title}</div><div class="meta" style="font-size:12px;color:var(--muted)">${p.time} • ${channel.title}</div><div style="margin-top:8px;color:var(--muted)">${p.excerpt}</div><div style="margin-top:8px"><button class="btn" onclick="showToast('Open Post','This would open the full post (mock)')">Read More</button></div></div>`;
    body.appendChild(pEl);
  });
  modalBackdrop.style.display='flex';
  modalBackdrop.setAttribute('aria-hidden','false');
  modalClose.focus();
}

function closeModal(){
  modalBackdrop.style.display='none';
  modalBackdrop.setAttribute('aria-hidden','true');
}
modalClose.addEventListener('click', closeModal);
modalBackdrop.addEventListener('click', (e)=> { if(e.target===modalBackdrop) closeModal(); });

// ---------- Contact modal ----------
function openContactModal(){
  contactModal.style.display='flex';
  contactModal.setAttribute('aria-hidden','false');
  qs('#contactName').focus();
}
function closeContact(){
  contactModal.style.display='none';
  contactModal.setAttribute('aria-hidden','true');
  contactStatus.textContent='';
}
qs('#openContact').addEventListener('click', openContactModal);
qs('#navContact').addEventListener('click', openContactModal);
qs('#contactClose').addEventListener('click', closeContact);
contactModal.addEventListener('click', (e)=> { if(e.target===contactModal) closeContact(); });
qs('#sendContact').addEventListener('click', () => {
  const name = qs('#contactName').value.trim();
  const msg = qs('#contactMsg').value.trim();
  if(!name || !msg){ contactStatus.textContent='Please provide name and message.'; return; }
  contactStatus.textContent='Sending...';
  setTimeout(()=> { contactStatus.textContent='Message sent — Amir will get back to you.'; qs('#contactName').value=''; qs('#contactEmail').value=''; qs('#contactMsg').value=''; setTimeout(closeContact,1200); }, 900);
});

// ---------- Small UI helpers (toasts, nav, welcome) ----------
function showToast(title, body, timeout=5200){
  const t = document.createElement('div'); t.style.position='fixed'; t.style.right='18px'; t.style.bottom='18px'; t.style.zIndex=9999;
  t.style.background='linear-gradient(90deg, rgba(255,255,255,0.02), rgba(255,255,255,0.01))'; t.style.padding='12px'; t.style.borderRadius='10px'; t.style.boxShadow='0 20px 60px rgba(0,0,0,0.6)';
  t.innerHTML = `<div style="font-weight:700;margin-bottom:6px">${title}</div><div style="color:var(--muted);font-size:13px">${body}</div>`;
  document.body.appendChild(t);
  setTimeout(()=> t.style.opacity='0', timeout-400);
  setTimeout(()=> t.remove(), timeout);
}

// Welcome enter flow
qs('#enterBtn').addEventListener('click', () => {
  welcomeScreen.style.display='none';
  mainEl.style.display='block';
  renderChannels();
  renderTrending();
  setInterval(pushRandomTrend, 14000);
});

// nav helpers
qs('#navChannels').addEventListener('click', ()=> qs('#cards').scrollIntoView({behavior:'smooth'}));
qs('#navTrending').addEventListener('click', ()=> qs('#trendList').scrollIntoView({behavior:'smooth'}));
qs('#navHome').addEventListener('click', ()=> window.scrollTo({top:0,behavior:'smooth'}));
qs('#openAll').addEventListener('click', ()=> { showToast('Opening channels','Each link will open in a new tab.'); CHANNELS.forEach(c=> window.open(c.link,'_blank')); });
qs('#shuffleTrends').addEventListener('click', ()=> { TRENDING = TRENDING.sort(()=>Math.random()-0.5); renderTrending(); showToast('Trends shuffled','Showing updated trending items'); });

// close on Esc
document.addEventListener('keydown', (e)=> { if(e.key==='Escape'){ closeModal(); closeContact(); } });

// initial renders (so content is available to assistive tech even if welcome is visible)
renderChannels();
renderTrending();
