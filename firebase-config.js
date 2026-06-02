/* =====================================================================
 *  Firebase 設定檔  —  ★ 這是你唯一需要手動填的地方 ★
 *
 *  做法（詳見 README_設定說明.md，約 5 分鐘）：
 *  1. 到 https://console.firebase.google.com 用 Google 帳號建立一個免費專案
 *  2. 建立一個「Realtime Database」(即時資料庫)，選「測試模式 test mode」
 *  3. 專案設定 → 一般 → 你的應用程式 → 註冊一個「網頁應用程式 </>」
 *  4. 把它給你的 firebaseConfig 物件「整段」貼到下面，取代範例值
 *  5. 確認 databaseURL 這一行存在（Realtime Database 才有，很重要！）
 * ===================================================================== */

const firebaseConfig = {
  apiKey: "AIzaSyDK-OOYZBSypB4nCHA_WOFavv0YddHIrrw",
  authDomain: "jc-tcrr-quiz.firebaseapp.com",
  databaseURL: "https://jc-tcrr-quiz-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "jc-tcrr-quiz",
  storageBucket: "jc-tcrr-quiz.firebasestorage.app",
  messagingSenderId: "1050427053085",
  appId: "1:1050427053085:web:87db880ea63527c160a2f4"
};

/* ---------------------------------------------------------------------
 *  主持人 PIN 碼：學員不知道這組碼就無法進入主持人控場畫面。
 *  上課前可自行改成你喜歡的數字。
 * ------------------------------------------------------------------- */
const HOST_PIN = "8067";

/* 房間代碼：一位講師一個班通常不用改。若同時開兩班可改成不同代碼。 */
const ROOM = "TCRR";

/* 每題作答秒數（時間到自動鎖定，答得越快分數越高）。 */
const QUESTION_SECONDS = 25;
