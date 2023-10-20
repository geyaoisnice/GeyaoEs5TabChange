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