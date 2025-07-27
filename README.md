nodeloc青龙脚本
鸣谢:s根据SerokVip  ryty1的loon脚本修改得来，再经本人在-土韭青龙脚本上diy.

## 现已在此基础上用github工作流/CF wks 运行 自行签到！喜欢的小伙伴麻烦给我点下小星星！

参数：
<img width="502" height="306" alt="image" src="https://github.com/user-attachments/assets/7d827016-251a-4528-9fee-2080ce2ada5a" />

NODELOC_COOKIE_1	第 1 个账号 Cookie

NODELOC_CSRF_1	第 1 个账号 CSRF Token

TG_BOT_TOKEN 或 TG_BOT_TOKEN_1	第 1 个账号 Bot Token

TG_USER_ID 或 TG_USER_ID_1	第 1 个账号 Telegram 用户 ID

TG_PROXY（可选）	Telegram 推送代理设置

依此类推，可添加 _2, _3, _4 等账号组。支持混合使用统一 Token 或各账号独立 Bot。

## 实利图：对于一些小白按图操作请，我也是一名小白深技没有技术的操作很痛苦！
![logo](https://raw.githubusercontent.com/dj56959566/nodeloc/refs/heads/main/PixPin_2025-07-27_11-36-50.png)

![logo](https://raw.githubusercontent.com/dj56959566/nodeloc/refs/heads/main/PixPin_2025-07-27_11-37-21.png)

# 说明使用书

配置 GitHub Secrets（存储用户名和密码）
为了避免将用户名和密码直接暴露在代码中，你可以使用 GitHub Secrets 来存储它们：

进入 GitHub 仓库的 Settings > Secrets > New repository secret。

添加两个 Secrets：

USER_NAME：你的用户名。

PASSWORD：你的密码。

定时任务：

cron: '0 1 * * *' 表示每天 UTC 时间 1 点（即北京时间 9 点）执行。

workflow_dispatch 允许你手动触发工作流。

# CF自动签到NL WKS

1.复制index.js里面代码去CF

2.设置变量值 
你需要先准备好以下变量（从浏览器中获取）：
变量名	描述
NODELOC_COOKIE_1	NodeLoc 登录后浏览器的 Cookie
NODELOC_CSRF_1	浏览器页面中的 CSRF Token
TG_BOT_TOKEN	Telegram Bot 的 Token
TG_USER_ID	你的 Telegram 用户 ID

3.表达式说明：
0 1 * * * = 每天 UTC 时间 01:00 = 北京时间 09:00
