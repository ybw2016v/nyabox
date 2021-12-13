# nyabox

一个基于flask、sqlite、redis、jquery、bootstrap4的提问箱。

## 特点

* ~~单页~~三页应用，手搓pjax
* 前后端分离，兼顾og标签
* 使用类Oauth2.0认证，能且仅能通过[DMI](https://m.dogcraft.top)账号登录，登录插件[mkauth](https://github.com/ybw2016v/mkauth)

## Todo

- [x] ~~删除功能~~
- [ ] 退出登录
- [x] ~~简单的用户设置~~ 添加了一个可供用户不再接受提问的功能
- [ ] 单页应用
- [ ] 浏览器通知
- [ ] 管理页面
- [x] ~~邮件通知~~邮件通知功能不搞了，没意思，容易被滥用、封号，改成misskey内部的message通知
- [x] ~~支持Markdown~~ 通过[marked](https://github.com/markedjs/marked)进行markdown转换
- [x] ~~XSS防止~~ 通过[DOMPurify](https://github.com/cure53/DOMPurify)
- [ ] 回答页面markdown预览功能

