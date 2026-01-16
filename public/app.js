const mount = document.getElementById('app');

const state = {
  posts: [
    { id: 1, title: "DeepMind’s new AlphaFold update predicts protein structures", image: "https://picsum.photos/seed/ai1/1200/600", url: "https://deepmind.com", desc: "The latest version improves accuracy by 40% and covers nearly the entire protein universe." },
    { id: 2, title: "James Webb spots oldest galaxy jet", image: "https://picsum.photos/seed/space1/1200/600", url: "https://nasa.gov", desc: "Observations reveal a galaxy formed just 280 million years after the Big Bang." },
    { id: 3, title: "New solid-state battery promises 1000 cycles", image: "https://picsum.photos/seed/energy1/1200/600", url: "https://example.com", desc: "A breakthrough electrolyte boosts stability without sacrificing capacity." }
  ]
};

const el = (tag, cls, text) => {
  const e = document.createElement(tag);
  if (cls) e.className = cls;
  if (text) e.textContent = text;
  return e;
};

const renderCard = (p) => {
  const card = el('article', 'card');
  const media = el('div', 'media');
  const img = document.createElement('img');
  img.src = p.image;
  media.appendChild(img);
  const body = el('div', 'body');
  const meta = el('div', 'meta');
  const tag = el('span', 'tag', 'AI BREAKTHROUGH');
  const time = el('span', '', '2h ago');
  const source = el('span', '', new URL(p.url).hostname);
  meta.append(tag, time, source);
  const h3 = el('h3', '', p.title);
  const desc = el('p', 'desc', p.desc);
  const actions = el('div', 'actions');
  ['♥','💬','↗','🔖'].forEach(s=>{
    const b = el('button','btn',s); actions.appendChild(b);
  });
  body.append(meta, h3, desc, actions);
  card.append(media, body);
  return card;
};

const layout = () => {
  const app = el('div','app');
  // sidebar
  const sidebar = el('aside','sidebar');
  const brand = el('div','brand');
  brand.append(el('div','logo','N'), el('div','title','Stitch'));
  const nav = el('nav','nav');
  const mk = (t,a)=>{ const l = document.createElement('a'); l.href='#'; l.className='item'+(a?' active':''); l.textContent=t; return l; };
  nav.append(mk('Home',true), mk('Explore'), mk('Bookmarks'), mk('Settings'));
  const secTitle = el('div','section-title','My Feeds');
  const list = el('ul','list');
  ['Artificial Intelligence','Space Exploration','Clean Energy','Quantum Computing'].forEach(n=>{
    const li = document.createElement('li'); const a = document.createElement('a'); a.href='#'; a.textContent=n; li.appendChild(a); list.appendChild(li);
  });
  const user = el('div','user'); user.append(el('div','avatar','A'), el('div','name','Alex Morgan'));
  sidebar.append(brand, nav, secTitle, list, user);
  // main
  const main = el('div','main');
  const topbar = el('div','topbar');
  topbar.append(el('div','title','Stitch - Design with AI'));
  const input = document.createElement('input'); input.className='search'; input.placeholder='Search articles, topics, or sources...';
  topbar.append(input);
  const chips = el('div','chips');
  ['All','Artificial Intelligence','Space Exploration','Biotech','Quantum Computing'].forEach((c,i)=>{
    const b = el('button','chip'+(i===0?' active':''),c); chips.appendChild(b);
  });
  topbar.append(chips);
  const content = el('div','content');
  const feed = el('section','feed');
  const h2 = document.createElement('h2'); h2.textContent='Unified Feed'; feed.appendChild(h2);
  state.posts.forEach(p=>feed.appendChild(renderCard(p)));
  const rail = el('aside','rail');
  const mkRail = (title, body) => { const c = el('div','rail-card'); c.append(el('div','rail-title',title), body); return c; };
  const progress = el('div','progress'); progress.append(el('div','bar'));
  rail.append(mkRail('Daily Digest', progress));
  const tlist = el('ul','rail-list');
  const li = (cls,txt)=>{ const i=document.createElement('li'); const d=el('span','dot '+cls); i.append(d, document.createTextNode(txt)); return i; };
  tlist.append(li('ai','GPT-5 rumors swirl as schedule shifts'), li('space','Starship reaches orbit on 4th attempt'), li('env','Ocean cleanup removes 1000 tons of plastic'));
  rail.append(mkRail('Trending Now', tlist));
  const links = el('ul','links'); const l = (href,txt)=>{ const i=document.createElement('li'); const a=document.createElement('a'); a.href=href; a.target='_blank'; a.textContent=txt; i.appendChild(a); return i; };
  links.append(l('https://arstechnica.com','Ars Technica'), l('https://www.theverge.com','The Verge'));
  rail.append(mkRail('Recommended Sources', links));
  content.append(feed, rail);
  main.append(topbar, content);
  app.append(sidebar, main);
  return app;
};

mount.appendChild(layout());
