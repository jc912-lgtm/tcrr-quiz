/* =====================================================================
 *  代表人物頭像清單 —— 自動產生（請勿手動編輯）
 *  規則：avatars/ 裡每一張 .png = 一個角色。
 *  要增減角色：在 avatars/ 加或刪圖檔，再執行  python _建清單.py
 * ===================================================================== */
const CHARACTERS = [
  {id:"alin", img:"avatars/alin.png"},
  {id:"amei", img:"avatars/amei.png"},
  {id:"baby", img:"avatars/baby.png"},
  {id:"boy", img:"avatars/boy.png"},
  {id:"curry", img:"avatars/curry.png"},
  {id:"elon", img:"avatars/elon.png"},
  {id:"jay", img:"avatars/jay.png"},
  {id:"jensen", img:"avatars/jensen.png"},
  {id:"kobe", img:"avatars/kobe.png"},
  {id:"lasha", img:"avatars/lasha.png"},
  {id:"lebron", img:"avatars/lebron.png"},
  {id:"lisa", img:"avatars/lisa.png"},
  {id:"liww", img:"avatars/liww.png"},
  {id:"lu", img:"avatars/lu.png"},
  {id:"ohtani", img:"avatars/ohtani.png"},
  {id:"oneal", img:"avatars/oneal.png"},
  {id:"tia", img:"avatars/tia.png"},
  {id:"tpe_male", img:"avatars/tpe_male.png"},
  {id:"wang", img:"avatars/wang.png"},
  {id:"yan", img:"avatars/yan.png"}
];
function getChar(id){ return CHARACTERS.find(c => c.id === id) || CHARACTERS[0]; }
function avatarImg(c, size){
  size = size || 34;
  if(typeof c === "string") c = getChar(c);
  if(!c) return "";
  let hsum = 0; for(const ch of c.id) hsum += ch.charCodeAt(0);
  const delay = (hsum % 13) / 10, dur = 2.4 + (hsum % 5) * 0.2;
  return '<img class="avt" src="' + c.img + '" width="' + size + '" height="' + size + '" alt="" ' +
         'style="border-radius:18%;object-fit:cover;object-position:center;background:transparent;' +
         'animation:avtBob ' + dur + 's ease-in-out ' + delay + 's infinite">';
}
