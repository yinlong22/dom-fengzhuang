window.dom = {
    create(string) {//创建对象
        const container = document.createElement("template");
        container.innerHTML = string.trim();
        return container.content.firstChild;
    },/*使用：const test=dom.create("<div>newDiv</div>");
            console.log(test)       显示时加这行，后面都一样
    */
    after(node, node2) {//换成弟弟
        node.parentNode.insertBefore(node2, node.nextSibling);
    },//dom.after(test)
    before(node, node2) {//换成哥哥
        node.parentNode.insertBefore(node2, node);
    },
    append(parent, node) {//在parent对现象里添加子节点node
        parent.appendChild(node)
    },
    wrap(node, parent) {//插入node到parent
        dom.before(node, parent)//先把新爸爸放到当前node的前面
        dom.append(parent, node)//再将node放到新爸爸里面---完成插入
    },//dom.wrap(test,div1)
    remove(node) {//删node节点
        node.parent.removeChild(node)
        return node
    },
    empty(node) {//清空node节点，包括其子节点
        //const { childNodes } = node
        // ↑ const childNodes=node.childNodes的简写
        const array = []
        let x = node.firstChild
        while (x) { //清空时需要遍历node所有子节点
            array.push(dom.remove(node.firstChild))
            x = node.firstChild
        }
        return array
    },//const test=dom.empty(window.empty)
    attr(node, name, value) {//改变test里面的属性和值
        if (arguments.length === 3) {//长度为3 set属性和值
            node.setAttribute(name, value)
        } else if (arguments.length === 2) {//长度为2就读取
            return node.getAttribute(name)
        }
        //dom.attr(test,'title','hi,I am frank')
        //const title=dom.attr(test,'title')读取title里的属性和值 
        //console.log(`title:&{title}`) 
    },
    text(node, string) {
        if (arguments.length = 2) {//写
            if ('innerText in node') {
                node.innerText = string//ie支持的
            } else {
                node.textContent = string//其他浏览器适配
            }
        } else if (arguments.length == 1) {//读
            if ('innerText in node') {
                return node.innerText
            } else {
                return node.textContent
            }
        }
    },//写：dom.text(test,'你好，这是新的内容')
    //读：dom.test(test)
    html(node, string) {
        if (arguments.length === 2) {//写
            node.innerHTML = string
        } else if (arguments.length.length === 1) {//读
            return node.innerHTML
        }
    },//dom.html和上面相似
    style(node, name, value) {
        if (arguments.length === 3) {
            node.style[name] = value
            //写：dom.style(test,'color','red')
        } else if (arguments.length === 2) {
            if (typeof name === 'string') {
                //读：dom.style(test,'color')
                return node.style[name]//因为border，color等属性不确定是否存在，所以用变量[name]
            } else if (name instanceof object) {
                //写:dom.style(test,{color:'red'})
                const object = name
                for (let key in object) {
                    node.style[key] = object[key]//不是变量为object.key
                }
            }
        }
    },
    class: {
        add(node, className) {
            node.classList.add(className)
        },
        remove(node, className) {
            node.classList.remove(className)
        },
        has(node, className) {
            return node.classList.contains(className)
        }
    },
    on(node, eventName, fn) {//监听点击事件
        node.addEventListener(eventName, fn)
    },
    off(node, eventName, fn) {//移除点击事件
        node.removeEventListener(eventName, fn)
    },
    /* 
    let fn=()=>{
        console.log('点击了')
    }
    dom.on(test,'click',fn)
    dom.off(test,'click',fn)
    */
    find(selector, scope) {
        return (scope || document).querySelectorAll(selector)
    },//const testDiv=dom.find('#test')[0]const test2=dom.find('#test2')[0]
    //console.log(testDiv)/console.log(dom.find('.red',test2)[0])
    parent(node) {
        return node.parentNode
    },
    //console.log(dom.parent(test))
    children(node) {
        return node.children
    },
    siblings(node) {//查姐妹
        return Array.from(node.parentNode.children).filter(n => n !== node)
    },//先将伪数组变成数组，再过滤掉自己
    //console.log(dom.siblings(dom.find('#s2')[0]))
    next(node) {//找弟弟
        let x = node.nextSibling
        while (x && x.nodeType === 3) {//如果下一个节点是文本，跳过
            x = x.nextSibling
        }
        return x
    },//console.log(dom.next(dom.find('#s2')[0]))
    previous(node) {//找姐姐
        let x = node.previousSibling
        while (x && x.nodeType === 3) {//如果下一个节点是文本，跳过
            x = x.previousSibling
        }
        return x
    },//console.log(dom.previous(dom.find('#s2')[0]))
    each(nodeList, fn) {//nodeList所有元素进行操作
        for (let i = 0; i < nodeList.length; i++) {
            fn.call(null, nodeList[i])
        }
    },
    //const t =dom.find('#travel')[0]
    //dom.each(dom.children(t),(n)=>dom.style(n,'color','red'))
    //对每个travel元素进行style操作color=red
    index(node) {//找到node节点排老几
        const list = dom.children(node.parentNode)
        let i
        for (leti = 0; i < list; i++) {
            if (list[i] === node) {
                break
            }
        }
        return i + 1
    }//console.log(dom.index('#s2'))
};

