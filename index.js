const MAX_RETRY = 3;
const RETRY_INTERVAL = 5000;
const MAX_DELAY = 120 * 1000;
function randomDelay(ms) { return Math.floor(Math.random() * ms); }
async function sendTG(title, message, TG_TOKEN, TG_USER_ID) {
  if (!TG_TOKEN || !TG_USER_ID) return;
  await fetch(`https://api.telegram.org/bot${TG_TOKEN}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ chat_id: TG_USER_ID, text: message, parse_mode: "Markdown" }),
  });
}
async function checkin(acc, retry = MAX_RETRY) {
  try {
    const res = await fetch("https://nodeloc.cc/checkin", {
      method: "POST",
      headers: {
        cookie: acc.COOKIE,
        origin: "https://nodeloc.cc",
        referer: "https://nodeloc.cc/latest",
        "user-agent": "Mozilla/5.0",
        "x-csrf-token": acc.CSRF,
        "x-requested-with": "XMLHttpRequest",
        accept: "*/*",
      },
    });
    const data = await res.json();
    let title = `📢 签到【${acc.ALIAS}】 `;
    let msg = data.success === true
      ? `✅ 成功，获得能量 ${(data.message?.match(/(\d+)\s*个能量/)?.[1]||"10")}`
      : data.success === false
        ? `☑️ 已签到：${data.message}`
        : `🆖 失败：${data.message}`;
    await sendTG(title, `${title}\n${msg}`, acc.TG_TOKEN, acc.TG_USER_ID);
  } catch (e) {
    if (retry > 0) return await new Promise(r => setTimeout(r, RETRY_INTERVAL)).then(() => checkin(acc, retry - 1));
    await sendTG(`📢 签到【${acc.ALIAS}】失败`, "重试已达最大次数", acc.TG_TOKEN, acc.TG_USER_ID);
  }
}
function getAccounts(env) {
  const arr = [];
  for (let i = 1; i <= 10; i++) {
    const COOKIE = env[`NODELOC_COOKIE_${i}`];
    const CSRF = env[`NODELOC_CSRF_${i}`];
    if (!COOKIE || !CSRF) continue;
    const TG_TOKEN = env[`TG_BOT_TOKEN_${i}`] || env[`TG_BOT_TOKEN`];
    const TG_USER_ID = env[`TG_USER_ID_${i}`] || env[`TG_USER_ID`];
    arr.push({ ALIAS: `账号${i}`, COOKIE, CSRF, TG_TOKEN, TG_USER_ID });
  }
  return arr;
}

export default {
  async scheduled(e, env) {
    await new Promise(r => setTimeout(r, randomDelay(MAX_DELAY)));
    const accs = getAccounts(env);
    for (const acc of accs) await checkin(acc);
  },
};