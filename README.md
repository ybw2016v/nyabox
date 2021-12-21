# nyabox

一个基于flask、sqlite、redis、jquery、bootstrap4的提问箱。

## 特点

* ~~单页~~三页应用，手搓pjax
* 前后端分离，兼顾og标签
* 使用类Oauth2.0认证，能且仅能通过[DMI](https://m.dogcraft.top)账号登录，登录插件[mkauth](https://github.com/ybw2016v/mkauth)

## Todo

- [x] ~~删除功能~~
- [x] ~~退出登录~~
- [x] ~~简单的用户设置~~ 添加了一个可供用户不再接受提问的功能
- [ ] 单页应用
- [ ] 浏览器通知
- [ ] 管理页面
- [x] ~~邮件通知~~邮件通知功能不搞了，没意思，容易被滥用、封号，改成misskey内部的message通知
- [x] ~~支持Markdown~~ 通过[marked](https://github.com/markedjs/marked)进行markdown转换
- [x] ~~XSS防止~~ 通过[DOMPurify](https://github.com/cure53/DOMPurify)
- [ ] 回答页面markdown预览功能
- [x] ~~添加一个回答后可以直接分享到DMI的功能~~ 完成，并添加了一个分享按钮

## 安装

1. 下载

```shell
git clone https://github.com/ybw2016v/nyabox.git
```

2. 安装必要的依赖

```
pip install -r requirements.txt
```

如果没有redis，可以先安装一个redis。

3. 升级数据库结构到最新版本

```
alembic upgrade head
```

4. 配置文件

```
cp config_example.py config.py
```

5. 启动服务

```
python3 api.py
```

## 使用nginx+uwsgi部署（推荐）

1. uwsgi 配置文件

```ini
[uwsgi]
module = api:app
master = true
processes = 1
plugins = python3
pythonpath = ~/nyabox/
chdir = ~/nyabox/
socket = ~/nyabox/nyabox.sock
chmod-socket = 777
vacuum = true
touch-reload=/home/yu/nyabox/reload.txt
pidfie=/home/yu/nyabox/nyabox.pid
enable-threads=True
```


2. nginx 配置文件

```nginx
server {
    listen 443 ssl http2;
    listen 12443 ssl http2;
    listen [::]:443 ssl http2;
    ssl_certificate     /root/key/dog.pem;
    ssl_certificate_key /root/key/dog.key;
    server_name nya.neko.red;
        location / {
        include uwsgi_params;
        uwsgi_send_timeout 600;
        uwsgi_connect_timeout 600;   
        uwsgi_read_timeout 600;
        uwsgi_pass unix:/home/nya/nyabox/nyabox.sock;
    }
    location /static/ {
    root /home/nya/nyabox/;
}
}
```

3. systemctl安排上

```ini
[Unit]
Description=Nyabox

[Service]
Type=simple
User=yu     
ExecStart=/usr/bin/uwsgi -i /home/nya/nyabox/nyabox.ini    
WorkingDirectory=/home/nya/nyabox/         
TimeoutSec=60
StandardOutput=syslog
StandardError=syslog
SyslogIdentifier=nyabox
Restart=always
[Install]
WantedBy=multi-user.target

```

