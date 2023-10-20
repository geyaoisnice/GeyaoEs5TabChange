# 原生js实现tab切换
#  前言

> 我是歌谣 最好的种树是十年前 其次是现在 今天继续给大家带来的是原生js实现tab切换的讲解

# 环境配置
```
npm init -y
yarn add vite -D
```

# 修改page.json配置端口

```
{
  "name": "demo1",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "dev": "vite --port 3002"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "devDependencies": {
    "vite": "^4.4.9"
  }
}
```
# 目录结构
![在这里插入图片描述](https://img-blog.csdnimg.cn/095538fb29834595aff6d8233d8ec2f9.png)

# index.html

```
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Tab</title>
    <link rel="stylesheet" href="./index.css">
</head>

<body>
    <div class="tab J_tab"></div>
        <!-- <div class="nav">
            <div class="nav-item current">选项1</div>
            <div class="nav-item">选项2</div>
            <div class="nav-item">选项3</div>
        </div> -->
        <script type="text/html" id="J_navItemTpl">
            <div class="{{navStyleClass}}">{{navItemTitle}}</div>
        </script>
        <!-- <div class="page">
            <div class="page-item current">页面1</div>
            <div class="page-item">页面2</div>
            <div class="page-item">页面3</div>
        </div> -->
        <script type="text/html" id="J_pageItemTpl">
            <div class="{{pageStyleClass}}">
                <p>{{city_name}}</p>
                <p>{{intro}}</p>
            </div>
        </script>
        <div style="display: none;" id="J_cityData">
            [{
            "id":"1",
            "city_name":"北京",
            "intro":"北京很棒"
            },
            {
            "id":"2",
            "city_name":"上海",
            "intro":"上海很棒"
            },
            {
            "id":"3",
            "city_name":"天津",
            "intro":"天津很棒"
            }]
        </div>
  
    <script src="./tools.js"></script>
    <script src="./index.js"></script>
    <script type="text/javascript">
        var tab = new Tab({
            classObject: {
                el: '.J_tab'
            }
        }).init()
    </script>
</body>

</html>
```

# index.js
; (function (doc, initTools) {
    var Tab = function (options) {
        this.oTab = doc.getElementsByClassName('J_tab')[0];
        this.oNav = doc.createElement("div")
        this.oPage = doc.createElement("div")
        this.oNav.className = 'nav'
        this.oPage.className = 'page'
        // this.oPage = oTab.getElementsByClassName('page')[0]
        // this.oNav = oTab.getElementsByClassName('nav')[0]
        // this.oNavItems = this.oNav.getElementsByClassName('nav-item')
        // this.oPageItem = this.oPage.getElementsByClassName('page-item')
        this.navItemTpl = doc.getElementById("J_navItemTpl").innerHTML;
        this.pageItemTpl = doc.getElementById("J_pageItemTpl").innerHTML;
        var cityDataDom = doc.getElementById('J_cityData').innerHTML
        console.log(cityDataDom)
        this.cityData = JSON.parse(doc.getElementById('J_cityData').innerHTML);

        this.curIdx = 0
        // this.classObject=options.classObject
    }

    Tab.prototype.init = function () {
        this.render()
        this.bindEvent()
    }
    Tab.prototype.renderNav = function (data) {
        var list = ''
        data.forEach((item, index) => {
            list += this.navItemTpl.replace(/{{(.*?)}}/g, function (node, key) {
                return {
                    navStyleClass: !index ? 'nav-item current' : 'nav-item',
                    navItemTitle: item.city_name
                }[key];
            })
        }, this);
        console.log(list)
        return list
    }
    Tab.prototype.renderPage = function (data) {
        var list = ''
        data.forEach((item, index) => {
            list += this.pageItemTpl.replace(/{{(.*?)}}/g, function (node, key) {
                return {
                    pageStyleClass: !index ? 'page-item current' : 'page-item',
                    city_name: item.city_name,
                    intro: item.intro
                }[key];
            })
        }, this);
        console.log(list)
        return list
    }
    Tab.prototype.render = function () {

        var oFrag = doc.createDocumentFragment()
        this.oNav.innerHTML = this.renderNav(this.cityData)
        this.oPage.innerHTML = this.renderPage(this.cityData)
        oFrag.append(this.oNav)
        oFrag.append(this.oPage)
        this.oTab.appendChild(oFrag)
    }
    Tab.prototype.bindEvent = function () {
        this.oNavItems = this.oNav.getElementsByClassName('nav-item')
        this.oPageItem = this.oPage.getElementsByClassName('page-item')
        this.oNav.addEventListener('click', this.onNavClick.bind(this), false)
    }
    Tab.prototype.onNavClick = function (ev) {

        var tar = initTools.getTarget(ev)
        var className = tar.className
        if (className === 'nav-item') {
            this.setCurrent(this.curIdx, 'remove')
            // this.oNavItems[this.curIdx].className = 'nav-item'
            // this.oPageItem[this.curIdx].className = 'page-item'
            this.curIdx = [].indexOf.call(this.oNavItems, tar)
            // this.oNavItems[this.curIdx].className += ' current'
            // this.oPageItem[this.curIdx].className += ' current'
            this.setCurrent(this.curIdx, 'add')
        }
    }
    Tab.prototype.setCurrent = function (index, field) {
        // var navItemClass = this.classObject.navItem
        // var pageItemClass = this.classObject.pageItem
        switch (field) {
            case 'add':
                this.oNavItems[index].className = 'nav-item current';
                this.oPageItem[index].className = 'page-item current';
                break;
            case 'remove':
                this.oNavItems[index].className = 'nav-item'
                this.oPageItem[index].className = 'page-item'
                break;
            default:
                break;

        }
    }
    window.Tab = Tab
})(document, initTools)


# index.css

```
.tab{
    width: 500px;
    height: 500px;
    margin:50px auto;
    border: 1px solid #000;
}
.tab .nav{
    height: 50px;
    border-bottom: 1px solid #000;
}
.tab .nav-item{
    float: left;
    width: 33.33%;
    height: 100%;
    text-align: center;
    line-height: 50px;
}
.tab .nav-item.current{
    background-color: #000;
    color: #fff;
}
.tab .page{
    position: relative;
    height: 450px;
}
.tab .page-item{
    display: none;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    text-align: center;
    /* line-height: 450px; */
    font-size: 100px;
}
.tab .page-item.current{
    display: block;
}
```

# 运行结果
![在这里插入图片描述](https://img-blog.csdnimg.cn/f6e51cdc9fe54935bc90a930a45a34ea.png)

![在这里插入图片描述](https://img-blog.csdnimg.cn/138ce347a28c403594c2fde782088923.png)
![在这里插入图片描述](https://img-blog.csdnimg.cn/2749f24e54c14dabbc5c4b213f30cf44.png)
