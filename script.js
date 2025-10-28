/* script.js
   - Canvas cosmic particle network with neon cycling colors
   - UI: welcome auto-fade, channel modals, trending, contact modal
*/

// ---------- Data ----------
// ---------- Data ----------
const CHANNELS = [
  {
    id: 'silent',
    title: 'Silent Author',
    tagline: 'Where I tell your story in Pen, my crying pen',
    img: 'assets/SA.jpg',
    link: 'https://whatsapp.com/channel/0029VabdMbW2kNFrX96GjU0X'
  },
  {
    id: 'motivate',
    title: 'Motivational & Inspiration',
    tagline: 'Go hard or Go home',
    img: 'assets/MOT.jpg',
    link: 'https://whatsapp.com/channel/0029Vb6b3bIIXnlzwhoO9s2S'
  },
  {
    id: 'funny',
    title: 'Funny Chats',
    tagline: 'Hilarious Responses, Laugh with us',
    img: 'assets/FUNNY.jpg',
    link: 'https://whatsapp.com/channel/0029Vb78xvK9RZAeYJ1vZ52Y'
  },
  {
    id: 'girlchild',
    title: 'Maseno Girlchild Empowerment',
    tagline: 'If not Ladies, who else',
    img: 'assets/MGCE.jpg',
    link: 'https://whatsapp.com/channel/0029Vac4qi7I7BeEmwRCGT2n'
  },
  {
    id: 'classy',
    title: 'Not Sassy, Just Classy',
    tagline: 'Story Za Jaba Reloaded',
    img: 'assets/NOT NASTY.jpg',
    link: 'https://whatsapp.com/channel/0029VagrgeW7Noa9WMoww430'
  },
  {
    id: 'maseno',
    title: 'Maseno University',
    tagline: 'All updates From our University',
    img: 'assets/maseno_university.jpg',
    link: 'https://whatsapp.com/channel/0029VaF4Qeu4Y9ljNjoOdA02'
  },
  {
    id: 'feel',
    title: 'These Feelings',
    tagline: 'Expressing My Heart in wild form, hating and loving love.',
    img: 'assets/THESE.jpg',
    link: 'https://whatsapp.com/channel/0029ValMOK2KbYME1O03Bn3l'
  }
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
const modalClose = qs('#modalClose');
const contactModal = qs('#contactModal');
const contactClose = qs('#contactClose');
const contactStatus = qs('#contactStatus');
const welcomeScreen = qs('#welcomeScreen');
const mainEl = qs('#main');
const yearEl = qs('#year');

yearEl.textContent = new Date().getFullYear();

// ---------- Canvas: cosmic particle network ----------
(function createParticleNetwork(){
  const canvas = qs('#bgCanvas');
  const ctx = canvas.getContext('2d');
  let W = canvas.width = innerWidth;
  let H = canvas.height = innerHeight;

  window.addEventListener('resize', () => {
    W = canvas.width = innerWidth;
    H = canvas.height = innerHeight;
  });

  // particles
  const PARTICLE_COUNT = Math.max(40, Math.floor((W*H)/90000));
  const particles = [];

  // color hue cycle
  const hues = [
    [144, 152, 255], // purple-blue
    [0, 180, 255],   // cyan
    [255, 102, 204], // pink
    [0, 200, 150]    // green-teal
  ];
  let hueIndex = 0;
  let hueLerp = 0;
  const HUE_CYCLE_TIME = 12.0; // seconds to complete a cycle between pairs

  function rand(min, max){ return Math.random()*(max-min)+min; }

  class Particle {
    constructor(){
      this.reset(true);
    }
    reset(init=false){
      this.x = rand(0, W);
      this.y = rand(0, H);
      this.vx = rand(-12,12)/10;
      this.vy = rand(-12,12)/10;
      this.r = rand(3, 12) + (Math.random()*6);
      this.noiseOffset = Math.random()*1000;
      this.life = rand(8, 22);
      this.age = init ? rand(0, this.life) : 0;
    }
    step(dt){
      this.noiseOffset += dt*0.1;
      this.x += this.vx + Math.sin(this.noiseOffset)*0.15;
      this.y += this.vy + Math.cos(this.noiseOffset)*0.15;
      this.age += dt;
      if(this.x < -50 || this.x > W+50 || this.y < -50 || this.y > H+50 || this.age > this.life){
        this.reset(false);
        // place back within screen
        this.x = rand(0, W); this.y = rand(0, H);
      }
    }
    draw(ctx, colorA, colorB){
      const g = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.r*6);
      g.addColorStop(0, `rgba(${colorA.join(',')}, 0.95)`);
      g.addColorStop(0.2, `rgba(${colorA.join(',')}, 0.55)`);
      g.addColorStop(0.6, `rgba(${colorB.join(',')}, 0.22)`);
      g.addColorStop(1, `rgba(${colorB.join(',')}, 0.0)`);
      ctx.globalCompositeOperation = 'lighter';
      ctx.fillStyle = g;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.r, 0, Math.PI*2);
      ctx.fill();
    }
  }

  for(let i=0;i<PARTICLE_COUNT;i++) particles.push(new Particle());

  // draw loop
  let last = performance.now();
  function loop(now){
    const dt = (now - last)/1000;
    last = now;

    // update hue lerp
    hueLerp += dt / HUE_CYCLE_TIME;
    if(hueLerp >= 1.0){
      hueLerp = 0;
      hueIndex = (hueIndex + 1) % hues.length;
    }
    const aIdx = hueIndex;
    const bIdx = (hueIndex+1) % hues.length;
    // interpolate colors between a and b by hueLerp
    const colorA = [
      Math.round( hues[aIdx][0] * (1-hueLerp) + hues[bIdx][0] * hueLerp ),
      Math.round( hues[aIdx][1] * (1-hueLerp) + hues[bIdx][1] * hueLerp ),
      Math.round( hues[aIdx][2] * (1-hueLerp) + hues[bIdx][2] * hueLerp )
    ];
    const colorB = [
      Math.round( (hues[aIdx][0]+60) * (1-hueLerp) + (hues[bIdx][0]+60) * hueLerp ),
      Math.round( (hues[aIdx][1]+20) * (1-hueLerp) + (hues[bIdx][1]+20) * hueLerp ),
      Math.round( (hues[aIdx][2]+40) * (1-hueLerp) + (hues[bIdx][2]+40) * hueLerp )
    ];

    // clear
    ctx.clearRect(0,0,W,H);
    // subtle darker overlay for contrast
    ctx.fillStyle = 'rgba(7, 16, 33, 0.35)';
    ctx.fillRect(0,0,W,H);

    // update & draw particles
    particles.forEach(p => {
      p.step(dt);
      p.draw(ctx, colorA, colorB);
    });

    // connect close particles with lines
    const maxDist = 160;
    ctx.beginPath();
    for(let i=0;i<particles.length;i++){
      for(let j=i+1;j<particles.length;j++){
        const p = particles[i], q = particles[j];
        const dx = p.x - q.x, dy = p.y - q.y;
        const d2 = dx*dx + dy*dy;
        if(d2 < maxDist*maxDist){
          const alpha = 1 - (Math.sqrt(d2)/maxDist);
          ctx.strokeStyle = `rgba(${colorA.join(',')},${(alpha*0.22).toFixed(3)})`;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(q.x, q.y);
          ctx.stroke();
        }
      }
    }

    requestAnimationFrame(loop);
  }
  requestAnimationFrame(loop);

  // click ripple / burst effect
  window.addEventListener('pointerdown', (ev) => {
    const x = ev.clientX, y = ev.clientY;
    // spawn a few transient particles near click
    for(let i=0;i<8;i++){
      const p = new Particle();
      p.x = x + (Math.random()-0.5)*40;
      p.y = y + (Math.random()-0.5)*40;
      p.vx = (Math.random()-0.5)*3;
      p.vy = (Math.random()-0.5)*3;
      p.r = 8 + Math.random()*16;
      p.life = 0.9 + Math.random()*1.4;
      particles.push(p);
      // remove after life time
      setTimeout(()=> {
        const idx = particles.indexOf(p);
        if(idx>=0) particles.splice(idx,1);
      }, (p.life+0.1)*1000);
    }
  });
})();

// ---------- UI: render channels and trending ----------
function renderChannels(){
  const cardsEl = document.getElementById('cards');
  cardsEl.innerHTML = '';
  CHANNELS.forEach((c,i) => {
      const img = c.img;
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
    card.querySelector('.btn.join').addEventListener('click', (e)=>{ e.stopPropagation(); openChannelModal(c.id); });
    card.querySelector('.btn.copy').addEventListener('click', async (e)=>{ e.stopPropagation(); try { await navigator.clipboard.writeText(c.link); showToast('Link copied', `${c.title} link copied.`);} catch { showToast('Copy failed','Open the link manually.'); }});
    card.addEventListener('click', ()=> openChannelModal(c.id));
    card.addEventListener('keydown', (ev)=> { if(ev.key==='Enter') openChannelModal(c.id) });
    cardsEl.appendChild(card);
  });
}

function renderTrending(){
  const trendListEl = document.getElementById('trendList');
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
  const body = qs('#modalBody'); body.innerHTML = '';
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
function closeModal(){ modalBackdrop.style.display='none'; modalBackdrop.setAttribute('aria-hidden','true'); }
modalClose.addEventListener('click', closeModal);
modalBackdrop.addEventListener('click', (e)=> { if(e.target===modalBackdrop) closeModal(); });

// ---------- Contact modal ----------
function openContactModal(){ contactModal.style.display='flex'; contactModal.setAttribute('aria-hidden','false'); qs('#contactName').focus(); }
function closeContact(){ contactModal.style.display='none'; contactModal.setAttribute('aria-hidden','true'); contactStatus.textContent=''; }
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

// ---------- Small UI helpers ----------
function showToast(title, body, timeout=5200){
  const t = document.createElement('div'); t.style.position='fixed'; t.style.right='18px'; t.style.bottom='18px'; t.style.zIndex=9999;
  t.style.background='linear-gradient(90deg, rgba(255,255,255,0.02), rgba(255,255,255,0.01))'; t.style.padding='12px'; t.style.borderRadius='10px'; t.style.boxShadow='0 20px 60px rgba(0,0,0,0.6)';
  t.innerHTML = `<div style="font-weight:700;margin-bottom:6px">${title}</div><div style="color:var(--muted);font-size:13px">${body}</div>`;
  document.body.appendChild(t);
  setTimeout(()=> t.style.opacity='0', timeout-400);
  setTimeout(()=> t.remove(), timeout);
}

// ---------- Welcome flow (auto hide after 5s OR Enter) ----------
qs('#enterBtn').addEventListener('click', () => {
  welcomeScreen.style.display='none';
  mainEl.style.display='block';
  renderChannels();
  renderTrending();
  setInterval(pushRandomTrend, 14000);
});

// auto fade after 5 seconds
setTimeout(()=> {
  if(welcomeScreen && welcomeScreen.style.display !== 'none'){
    welcomeScreen.style.display='none';
    mainEl.style.display='block';
    renderChannels();
    renderTrending();
    setInterval(pushRandomTrend, 14000);
  }
}, 5000);

// nav helpers
qs('#navChannels').addEventListener('click', ()=> qs('#cards').scrollIntoView({behavior:'smooth'}));
qs('#navTrending').addEventListener('click', ()=> qs('#trendList').scrollIntoView({behavior:'smooth'}));
qs('#navHome').addEventListener('click', ()=> window.scrollTo({top:0,behavior:'smooth'}));
qs('#openAll').addEventListener('click', ()=> { showToast('Opening channels','Each link will open in a new tab.'); CHANNELS.forEach(c=> window.open(c.link,'_blank')); });
qs('#shuffleTrends').addEventListener('click', ()=> { TRENDING = TRENDING.sort(()=>Math.random()-0.5); renderTrending(); showToast('Trends shuffled','Showing updated trending items'); });

// ESC closes modals
document.addEventListener('keydown', (e)=> { if(e.key==='Escape'){ closeModal(); closeContact(); } });

// initial render for accessibility
renderChannels();
renderTrending();


// ---------- STORY MODE ----------
const storyOverlay = document.getElementById('storyOverlay');
const storyTitle = document.getElementById('storyTitle');
const storyContent = document.getElementById('storyContent');
const storyImage = document.getElementById('storyImage');
const prevStory = document.getElementById('prevStory');
const nextStory = document.getElementById('nextStory');
const closeStory = document.getElementById('closeStory');

let stories = [];
let currentStory = 0;

async function loadStories() {
  const res = await fetch('stories.json');
  stories = await res.json();
}

function showStory(index) {
  if (index < 0 || index >= stories.length) return;
  const s = stories[index];
  storyTitle.textContent = s.title;
  storyImage.src = s.image;
  storyContent.innerHTML = '';
  storyOverlay.setAttribute('aria-hidden', 'false');
  typeWriter(s.content);
  currentStory = index;
}

function typeWriter(lines) {
  let i = 0;
  let text = '';
  storyContent.innerHTML = '';
  const all = lines.join('\n\n');
  function type() {
    if (i < all.length) {
      text += all.charAt(i);
      storyContent.textContent = text;
      i++;
      setTimeout(type, 25);
    }
  }
  type();
}

// Navigation
prevStory.onclick = () => showStory(currentStory - 1);
nextStory.onclick = () => showStory(currentStory + 1);
closeStory.onclick = () => storyOverlay.setAttribute('aria-hidden', 'true');

// Launch Story Mode from “Silent Author” card
document.addEventListener('DOMContentLoaded', async () => {
  await loadStories();
  document.querySelectorAll('.card').forEach(card => {
    if (card.textContent.includes('Silent Author')) {
      card.addEventListener('click', () => showStory(0));
    }
  });
});

