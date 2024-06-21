## 分区域 route  
在全局xxx生效的情况下，将中国大陆的路由指向本地直连路由  

## 使用方法  
```
npm i  
npm start
```  

将`run_route_add.bat`的快捷方式，创建到 `C:\Users\Administrator\AppData\Roaming\Microsoft\Windows\Start Menu\Programs\Startup`  
实现开机自动加路由  

## 其它  
需要定期手动更新`china.txt`  
来源1： https://github.com/gaoyifan/china-operator-ip/blob/ip-lists/china.txt  
来源2： https://github.com/misakaio/chnroutes2/blob/master/chnroutes.txt  

经常访问国外的浏览器 DNS设置为 https://8.8.8.8/dns-query 或1.1.1.1  
经常访问国内的浏览器 DNS设置为 https://doh.pub/dns-query  