/* =====================================================================
 *  代表人物頭像系統  —  手繪 SVG，kawaii 風格
 *  特徵由 spec 精確指定（髮型/鬍子/光頭/眼鏡/帽子/隊色/背號），
 *  每個人再給不同「表情 exp」，讓臉不會長一樣。
 *
 *  spec 欄位：
 *    id, name, cat            識別、顯示名、分類(bball/wl/baseball/star)
 *    skin, hairColor          膚色、髮色
 *    hair                     short/bald/cornrows/buzz/long/swoop/bun
 *    beard                    none/short/full/goatee
 *    band                     髮帶顏色 (null=無)
 *    cap                      帽子顏色 (null=無)
 *    glasses                  true/false
 *    jersey, trim             上衣主色、滾邊色
 *    bg:[上,下]               圓形背景漸層
 *    num                      背號 (null=無)
 *    prop                     ball/barbell/bat/mic (預設依 cat)
 *    exp                      表情: smile/grin/laugh/fierce/cool/calm
 * ===================================================================== */

function shade(hex, amt){
  let n = parseInt(hex.slice(1),16);
  let r = Math.max(0,Math.min(255,(n>>16)+amt));
  let g = Math.max(0,Math.min(255,((n>>8)&255)+amt));
  let b = Math.max(0,Math.min(255,(n&255)+amt));
  return "#"+((1<<24)+(r<<16)+(g<<8)+b).toString(16).slice(1);
}

// ---- 表情（眉毛 + 眼睛 + 嘴）----
function drawFace(c){
  const hc = c.hairColor||"#1a1208";
  const exp = c.exp||"smile";
  const ex=39, ex2=61, ey=48, dk=shade(c.skin||"#c98d4e",-22);
  const bigEyes =
    `<ellipse cx="${ex}" cy="${ey}" rx="6.4" ry="7.4" fill="#fff"/><ellipse cx="${ex2}" cy="${ey}" rx="6.4" ry="7.4" fill="#fff"/>`+
    `<circle cx="${ex+1}" cy="${ey+1}" r="3.5" fill="#2a1a0c"/><circle cx="${ex2-1}" cy="${ey+1}" r="3.5" fill="#2a1a0c"/>`+
    `<circle cx="${ex-1}" cy="${ey-2}" r="1.5" fill="#fff"/><circle cx="${ex2-1}" cy="${ey-2}" r="1.5" fill="#fff"/>`;
  const brow = {
    up:   `<path d="M33 42 Q39 38 45 41" stroke="${hc}" stroke-width="2.5" fill="none" stroke-linecap="round"/><path d="M55 41 Q61 38 67 42" stroke="${hc}" stroke-width="2.5" fill="none" stroke-linecap="round"/>`,
    soft: `<path d="M33 43 Q39 40 45 42" stroke="${hc}" stroke-width="2.5" fill="none" stroke-linecap="round"/><path d="M55 42 Q61 40 67 43" stroke="${hc}" stroke-width="2.5" fill="none" stroke-linecap="round"/>`,
    flat: `<path d="M33 43 L45 43" stroke="${hc}" stroke-width="2.6" stroke-linecap="round"/><path d="M55 43 L67 43" stroke="${hc}" stroke-width="2.6" stroke-linecap="round"/>`,
    angry:`<path d="M33 41 Q39 43 46 46" stroke="${hc}" stroke-width="2.9" fill="none" stroke-linecap="round"/><path d="M54 46 Q61 43 67 41" stroke="${hc}" stroke-width="2.9" fill="none" stroke-linecap="round"/>`
  };
  let b,e,m;
  if(exp==="grin"){ b=brow.up; e=bigEyes;
    m=`<path d="M41 57 Q50 67 59 57 Z" fill="#7a2e2e"/><path d="M43 57.5 Q50 60 57 57.5" fill="#fff"/>`; }
  else if(exp==="laugh"){ b=brow.up;
    e=`<path d="M33 50 Q39 44 45 50" stroke="#2a1a0c" stroke-width="2.6" fill="none" stroke-linecap="round"/><path d="M55 50 Q61 44 67 50" stroke="#2a1a0c" stroke-width="2.6" fill="none" stroke-linecap="round"/>`;
    m=`<path d="M40 56 Q50 70 60 56 Q50 62 40 56 Z" fill="#7a2e2e"/><path d="M42 56.5 Q50 59 58 56.5" fill="#fff"/><ellipse cx="50" cy="65" rx="3.4" ry="2.3" fill="#e06a6a"/>`; }
  else if(exp==="fierce"){ b=brow.angry;
    e=`<ellipse cx="${ex}" cy="${ey}" rx="6.2" ry="6" fill="#fff"/><ellipse cx="${ex2}" cy="${ey}" rx="6.2" ry="6" fill="#fff"/>`+
      `<circle cx="${ex+1}" cy="${ey+1}" r="3.4" fill="#2a1a0c"/><circle cx="${ex2-1}" cy="${ey+1}" r="3.4" fill="#2a1a0c"/>`;
    m=`<path d="M42 59 Q50 65 58 59 Z" fill="#6a2424"/><path d="M42 59 H58" stroke="#fff" stroke-width="1.4"/>`; }
  else if(exp==="cool"){ b=brow.flat;
    e=bigEyes+`<path d="M32.5 45.5 Q39 47.6 45.5 45.5" stroke="${dk}" stroke-width="3.4" fill="none" stroke-linecap="round"/><path d="M54.5 45.5 Q61 47.6 67.5 45.5" stroke="${dk}" stroke-width="3.4" fill="none" stroke-linecap="round"/>`;
    m=`<path d="M43 59 Q50 61 58 56" stroke="#3a1f0c" stroke-width="2.3" fill="none" stroke-linecap="round"/>`; }
  else if(exp==="calm"){ b=brow.soft; e=bigEyes;
    m=`<path d="M44 59 Q50 61 56 59" stroke="#3a1f0c" stroke-width="2.2" fill="none" stroke-linecap="round"/>`; }
  else { b=brow.soft; e=bigEyes;   // smile（預設）
    m=`<path d="M42 58 Q50 64 58 58" stroke="#3a1f0c" stroke-width="2.3" fill="none" stroke-linecap="round"/>`; }
  return b+e+m;
}

function avatarSVG(c, size){
  size = size || 100;
  const id = c.id, skin = c.skin, hc = c.hairColor||"#1a1208";
  const prop = c.prop || ({bball:"ball",wl:"barbell",baseball:"bat",star:"mic"})[c.cat] || null;

  function torso(){
    let s = `<path d="M22 100 V84 Q22 70 50 70 Q78 70 78 84 V100 Z" fill="${c.trim}"/>`+
            `<path d="M28 100 V85 Q28 74 50 74 Q72 74 72 85 V100 Z" fill="${c.jersey}"/>`;
    if(c.cat==="bball"||c.cat==="wl") s += `<path d="M40 74 Q44 65 47 73" stroke="${c.trim}" stroke-width="3" fill="none" stroke-linecap="round"/><path d="M60 74 Q56 65 53 73" stroke="${c.trim}" stroke-width="3" fill="none" stroke-linecap="round"/>`;
    else if(c.cat==="baseball") s += `<path d="M44 72 L50 80 L56 72" stroke="${c.trim}" stroke-width="2.5" fill="none"/><line x1="50" y1="74" x2="50" y2="100" stroke="${c.trim}" stroke-width="1.6"/>`;
    else s += `<path d="M40 73 L50 82 L60 73" fill="${c.trim}"/>`;
    if(c.num) s += `<text x="50" y="95" text-anchor="middle" font-family="Arial Black,Arial,sans-serif" font-size="12.5" font-weight="900" fill="#fff">${c.num}</text>`;
    return s;
  }
  function hair(){
    const H=c.hair||"short";
    if(H==="bald") return `<ellipse cx="44" cy="29" rx="9" ry="4" fill="#fff" opacity=".10"/>`;
    if(H==="cornrows"){ let g=`<path d="M24 40 Q26 14 50 13 Q74 14 76 40 Q68 26 50 25 Q32 26 24 40 Z" fill="${hc}"/>`;
      [30,38,46,54,62,70].forEach(x=> g+=`<path d="M${x} 16 Q${x} 26 ${x} 35" stroke="#000" stroke-width="1.4" opacity=".35" fill="none"/>`); return g; }
    if(H==="buzz") return `<path d="M26 38 Q28 20 50 19 Q72 20 74 38 Q66 30 50 29 Q34 30 26 38 Z" fill="${hc}" opacity=".92"/>`;
    if(H==="long") return `<path d="M22 66 Q18 30 50 14 Q82 30 78 66 Q74 44 70 40 Q72 28 50 26 Q28 28 30 40 Q26 44 22 66 Z" fill="${hc}"/><path d="M24 40 Q26 14 50 13 Q74 14 76 40 Q68 27 50 26 Q32 27 24 40 Z" fill="${hc}"/>`;
    if(H==="bun") return `<circle cx="50" cy="13" r="8" fill="${hc}"/><path d="M25 40 Q26 16 50 15 Q74 16 75 40 Q68 28 50 27 Q32 28 25 40 Z" fill="${hc}"/>`;
    if(H==="swoop") return `<path d="M24 40 Q24 16 50 15 Q76 16 76 38 Q70 24 46 26 Q34 27 32 40 Q28 36 24 40 Z" fill="${hc}"/><path d="M46 26 Q66 22 74 36" stroke="${hc}" stroke-width="6" fill="none" stroke-linecap="round"/>`;
    return `<path d="M24 40 Q26 15 50 14 Q74 15 76 40 Q68 26 50 25 Q32 26 24 40 Z" fill="${hc}"/>`;
  }
  function cap(){ if(!c.cap) return "";
    return `<path d="M22 36 Q24 14 50 13 Q76 14 78 36 Q60 28 50 28 Q40 28 22 36 Z" fill="${c.cap}"/>`+
           `<path d="M18 37 Q40 33 56 36 L58 41 Q40 39 20 42 Z" fill="${c.cap}"/>`+
           `<circle cx="50" cy="18" r="2" fill="${c.trim||'#fff'}"/>`; }
  function beard(){ const B=c.beard||"none";
    if(B==="full") return `<path d="M28 47 Q28 80 50 82 Q72 80 72 47 Q72 72 50 72 Q28 72 28 47 Z" fill="${hc}"/>`;
    if(B==="short") return `<path d="M31 50 Q33 69 50 70 Q67 69 69 50 Q64 64 50 64 Q36 64 31 50 Z" fill="${hc}" opacity=".30"/>`;
    if(B==="goatee") return `<path d="M43 62 Q50 73 57 62 Q50 67 43 62 Z" fill="${hc}"/><path d="M42 55 Q50 53 58 55" stroke="${hc}" stroke-width="3" fill="none" stroke-linecap="round" opacity=".8"/>`;
    return ""; }
  function gadget(){
    if(prop==="ball") return `<g transform="translate(80,82)"><circle r="11" fill="#e8862e"/><path d="M-11 0H11 M0 -11V11 M-8 -7 Q0 0 8 7 M8 -7 Q0 0 -8 7" stroke="#3a1f0c" stroke-width="1.3" fill="none"/></g>`;
    if(prop==="barbell") return `<g transform="translate(78,84)"><rect x="-16" y="-2.5" width="32" height="5" rx="2" fill="#cfd6e0"/><rect x="-16" y="-8" width="5" height="16" rx="2" fill="#e2453c"/><rect x="11" y="-8" width="5" height="16" rx="2" fill="#1469c7"/></g>`;
    if(prop==="bat") return `<g transform="translate(80,80) rotate(38)"><rect x="-3" y="-15" width="6" height="30" rx="3" fill="#b5763a"/><rect x="-2.4" y="9" width="4.8" height="6" rx="2" fill="#7a4a1e"/></g>`;
    if(prop==="mic") return `<g transform="translate(80,82)"><rect x="-2" y="-2" width="4" height="16" rx="2" fill="#444"/><circle cx="0" cy="-6" r="7" fill="#9aa3c7"/><circle cx="0" cy="-6" r="7" fill="none" stroke="#2b3566" stroke-width="1"/><path d="M-4 -8H4 M-4 -6H4 M-4 -4H4" stroke="#2b3566" stroke-width=".8"/></g>`;
    return ""; }

  const inner =
    `<rect width="100" height="100" fill="url(#bg_${id})"/>`+
    `<circle cx="50" cy="60" r="40" fill="#fff" opacity=".08"/>`+
    torso()+
    `<rect x="43" y="58" width="14" height="14" rx="6" fill="${shade(skin,-12)}"/>`+
    `<circle cx="50" cy="42" r="26" fill="${skin}"/>`+
    `<circle cx="25" cy="44" r="5" fill="${skin}"/><circle cx="75" cy="44" r="5" fill="${skin}"/>`+
    hair()+ cap()+
    (c.band ? `<rect x="24" y="33" width="52" height="7" rx="3" fill="${c.band}"/><rect x="24" y="33" width="52" height="2.4" rx="1" fill="#fff" opacity=".35"/>` : "")+
    beard()+
    drawFace(c)+
    (c.glasses ? `<g stroke="#222" stroke-width="2" fill="rgba(255,255,255,.12)"><circle cx="39" cy="48" r="8.5"/><circle cx="61" cy="48" r="8.5"/></g><line x1="47.5" y1="48" x2="52.5" y2="48" stroke="#222" stroke-width="2"/>` : "")+
    `<ellipse cx="31" cy="54" rx="4.5" ry="2.6" fill="#ef9a9a" opacity=".45"/><ellipse cx="69" cy="54" rx="4.5" ry="2.6" fill="#ef9a9a" opacity=".45"/>`+
    gadget();

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="${size}" height="${size}">`+
    `<defs><radialGradient id="bg_${id}" cx="50%" cy="36%" r="72%"><stop offset="0" stop-color="${c.bg[0]}"/><stop offset="1" stop-color="${c.bg[1]}"/></radialGradient>`+
    `<clipPath id="cl_${id}"><circle cx="50" cy="50" r="48"/></clipPath></defs>`+
    `<g clip-path="url(#cl_${id})">${inner}</g>`+
    `<circle cx="50" cy="50" r="48" fill="none" stroke="${c.band||c.trim}" stroke-width="3.5"/></svg>`;
}

// 先試 avatars/<id>.png（你用 Gemini 生的圖）；找不到就 fallback 到可愛卡通 SVG。
function avatarImg(c, size){
  size = size || 34;
  const fb = "data:image/svg+xml;charset=utf-8," + encodeURIComponent(avatarSVG(c, size));
  // 每個人錯開動畫時間，看起來更活潑
  let hsum = 0; for(const ch of c.id) hsum += ch.charCodeAt(0);
  const delay = (hsum % 13) / 10;          // 0 ~ 1.2s
  const dur = 2.4 + (hsum % 5) * 0.2;      // 2.4 ~ 3.2s
  return `<img class="avt" src="avatars/${c.id}.png" width="${size}" height="${size}" alt="${c.name}" `+
         `onerror="this.onerror=null;this.src='${fb}'" `+
         `style="border-radius:24%;object-fit:cover;object-position:center;background:${c.bg?c.bg[0]:'#222a52'};`+
         `animation:avtBob ${dur}s ease-in-out ${delay}s infinite">`;
}

/* ===================== 角色資料（35，待刪成 25）===================== */
const CHARACTERS = [
  // ---------- 🏀 籃球 (6) ----------
  {id:"kobe", name:"Kobe", cat:"bball", skin:"#c2853f", hair:"short", hairColor:"#15110f", band:"#FDB927", jersey:"#552583", trim:"#FDB927", bg:["#7b3fb0","#3a1a5c"], num:"24", exp:"cool"},
  {id:"curry", name:"Stephen Curry", cat:"bball", skin:"#caa06a", hair:"short", hairColor:"#1a1208", jersey:"#1d428a", trim:"#ffc72c", bg:["#2a5bb8","#11294f"], num:"30", exp:"grin"},
  {id:"shaq", name:"O'Neal", cat:"bball", skin:"#7a4a23", hair:"bald", beard:"goatee", hairColor:"#1a1208", jersey:"#552583", trim:"#FDB927", bg:["#7b3fb0","#3a1a5c"], num:"34", exp:"laugh"},
  {id:"lebron", name:"LeBron James", cat:"bball", skin:"#7c4a22", hair:"short", beard:"short", hairColor:"#0e0a06", band:"#FDB927", jersey:"#552583", trim:"#FDB927", bg:["#7b3fb0","#3a1a5c"], num:"23", exp:"cool"},

  // ---------- 🏋️ 舉重 (11) ----------
  {id:"kuo", name:"郭婞淳", cat:"wl", skin:"#e8b27c", hair:"long", hairColor:"#1a1208", band:"#d62828", jersey:"#0b3d91", trim:"#ffffff", bg:["#2a6fd6","#0b2e66"], exp:"laugh"},
  {id:"tiantao", name:"田濤", cat:"wl", skin:"#efc08a", hair:"short", hairColor:"#1a1208", band:"#ffde00", jersey:"#de2910", trim:"#ffde00", bg:["#e8413a","#7a0f0a"], exp:"fierce"},
  {id:"lasha", name:"Lasha Talakhadze", cat:"wl", skin:"#e3b48a", hair:"short", beard:"full", hairColor:"#221a12", band:"#da291c", jersey:"#da291c", trim:"#ffffff", bg:["#e8463a","#7a120c"], exp:"fierce"},
  {id:"lvjun", name:"呂小軍", cat:"wl", skin:"#e8b27c", hair:"short", hairColor:"#1a1208", band:"#ffde00", jersey:"#de2910", trim:"#ffde00", bg:["#e8413a","#7a0f0a"], exp:"fierce"},
  {id:"wangsy", name:"王信淵", cat:"wl", skin:"#e8b27c", hair:"buzz", hairColor:"#1a1208", band:"#d62828", jersey:"#0b3d91", trim:"#ffffff", bg:["#2a6fd6","#0b2e66"], exp:"smile"},
  {id:"shizy", name:"石智勇", cat:"wl", skin:"#e8b27c", hair:"buzz", hairColor:"#1a1208", band:"#ffde00", jersey:"#de2910", trim:"#ffde00", bg:["#e8413a","#7a0f0a"], exp:"fierce"},
  {id:"nasar", name:"Karlos Nasar", cat:"wl", skin:"#e3b488", hair:"short", hairColor:"#2a1c10", band:"#00966e", jersey:"#00966e", trim:"#d62612", bg:["#2fae84","#0c5a3f"], exp:"grin"},
  {id:"liww", name:"李雯雯", cat:"wl", skin:"#efc08a", hair:"bun", hairColor:"#1a1208", band:"#ffde00", jersey:"#de2910", trim:"#ffde00", bg:["#ff5a4d","#a01510"], exp:"laugh"},
  {id:"mutlu", name:"Halil Mutlu", cat:"wl", skin:"#e0ad7a", hair:"short", hairColor:"#15110f", band:"#e30a17", jersey:"#e30a17", trim:"#ffffff", bg:["#e8413a","#7a0f0a"], exp:"smile"},

  // ---------- ⚾ 棒球 (7) ----------
  {id:"ohtani", name:"大谷翔平", cat:"baseball", skin:"#f0d0a8", hair:"short", hairColor:"#1a1208", cap:"#005A9C", jersey:"#005A9C", trim:"#ffffff", bg:["#1e6fc4","#0b3d6b"], num:"17", exp:"smile"},
  {id:"chenjx", name:"陳傑憲", cat:"baseball", skin:"#e8b27c", hair:"short", hairColor:"#1a1208", cap:"#1a1a1a", glasses:true, jersey:"#E35205", trim:"#1a1a1a", bg:["#f07a2e","#8a3a12"], num:"24", exp:"smile"},

  // ---------- 🎤 明星 (11) ----------
  {id:"lu", name:"盧廣仲", cat:"star", skin:"#efc08a", hair:"swoop", hairColor:"#1a1208", glasses:true, jersey:"#f4c430", trim:"#ffffff", bg:["#ffe27a","#6fcf57"], exp:"laugh"},
  {id:"fong", name:"方大同", cat:"star", skin:"#e8b27c", hair:"short", beard:"short", hairColor:"#1a1208", glasses:true, jersey:"#8b5a2b", trim:"#e8d8b0", bg:["#caa472","#5c3d23"], exp:"smile"},
  {id:"lisa", name:"LISA", cat:"star", skin:"#f0c89a", hair:"long", hairColor:"#caa24a", jersey:"#1a1a1a", trim:"#ff4d8d", bg:["#ff8fc7","#1a1a1a"], exp:"cool"},
  {id:"alin", name:"A-LIN", cat:"star", skin:"#e3a86f", hair:"long", hairColor:"#1a1208", jersey:"#8e2d4a", trim:"#f3c6d4", bg:["#c14b6e","#5a1f33"], exp:"grin"},
  {id:"amei", name:"張惠妹", cat:"star", skin:"#cf9356", hair:"long", hairColor:"#2a1d12", jersey:"#c1121f", trim:"#ffd24a", bg:["#ff5e3a","#7a0e1e"], exp:"grin"},
  {id:"wangjie", name:"王傑", cat:"star", skin:"#dca873", hair:"short", hairColor:"#241a12", jersey:"#2c3e66", trim:"#9fb4d8", bg:["#4a6488","#1c2740"], exp:"calm"},
  {id:"hugua", name:"胡瓜", cat:"star", skin:"#e0a96d", hair:"short", hairColor:"#1f1710", jersey:"#e08a1e", trim:"#fff0c2", bg:["#ffb347","#c8651a"], exp:"laugh"},
  {id:"handian", name:"陳漢典", cat:"star", skin:"#ecb87f", hair:"short", hairColor:"#181009", jersey:"#2eb872", trim:"#ffffff", bg:["#5fe08a","#1f8f5a"], exp:"laugh"},
  {id:"jay", name:"周杰倫", cat:"star", skin:"#e8b27c", hair:"short", hairColor:"#15110f", cap:"#111111", jersey:"#1a1a1a", trim:"#d4af37", bg:["#4a4a4a","#0d0d0d"], exp:"cool"},
  {id:"leehom", name:"王力宏", cat:"star", skin:"#e8b27c", hair:"short", hairColor:"#1a1208", jersey:"#1f6fb2", trim:"#ffffff", bg:["#5bb8ff","#1f5fa0"], exp:"grin"},
];

function getChar(id){ return CHARACTERS.find(c=>c.id===id) || CHARACTERS[0]; }
