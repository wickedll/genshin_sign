本项目为[Adachi-BOT](https://github.com/SilveryStar/Adachi-BOT)衍生插件，用于米游社原神自动签到（按配置文件中的cookie轮询签到）

# 1.使用方法

进入 `Adachi-BOT/src/plugins` 目录下，执行如下命令 
  
 ```bash 
 git clone https://github.com/wickedll/genshin_sign 
 ``` 
  
 或通过本项目仓库左上角 `code -> Download.zip` 下载压缩包，解压至 `Adachi-BOT/src/plugins` 目录内 
  
 > 注意：若使用下载压缩包方式，请务必删除解压后目录名字中的 `-master`，否则插件无法启动

然后将genshin_sign/config文件夹下的genshin_sign.yml文件拷贝到[原项目](https://github.com/SilveryStar/Adachi-BOT)config目录下即可

# 2.genshin_sign.yml配置说明

```yml
openTiming: false #是否开启定时功能
cron: "0 0 7 * * *" #自动签到时间 每天7点
serverPort: 58613 #对外开放api端口号
```

openTiming 是否开启定时签到功能，若为true，则按cron配置时间签到（cron表达式可自行百度）；false关闭定时签到功能

serverPort为对外开放签到api端口号，若openTiming为true，则不创建该服务，false创建该服务。即用户可直接访问http://127.0.0.1:58613/api/sign 完成签到； 可配合其他定时任务系统，完成定时签到

签到后会将签到结果推送给setting配置文件中的master

# 3.命令触发方式

命令触发方式为配置的 header+mysSign 若需修改可自行修改

命令scope为私聊 权限需bot管理员

# 4.功能更新

- 支持插件热更新	2022/8/14
- 新增米游社签到私人服务 命令 header+sub_mys_sign（编号）	2021/12/08

# 5.LICENSE

[LICENSE](https://github.com/wickedll/genshin_sign/blob/main/LICENSE)
