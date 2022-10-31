## 字体文件生成服务--整理版本

### 简介

    这是一个提供字体文件.ttf生成的服务，通过本地static/svg/中的 svg图片生成包含用户指定字符串中的对应字体。例如访问：[接口:  /createFont?text=𠈱𠈲𠈳𠈴𠈵𠈶𠈷𠈸𠈹𠈺𠈻𠈼𠈽𠈾𠈿𠉀𠉁𠉂𠉃𠉄𠉅𠉆𠉇𠉈𠉉𠉊𠉋𠉌𠉍𠉎𠉏𠉐𠉑](/createFont?text=𠈱𠈲𠈳𠈴𠈵𠈶𠈷𠈸𠈹𠈺𠈻𠈼𠈽𠈾𠈿𠉀𠉁𠉂𠉃𠉄𠉅𠉆𠉇𠉈𠉉𠉊𠉋𠉌𠉍𠉎𠉏𠉐𠉑) 即可得到包含"𠈱𠈲𠈳𠈴𠈵𠈶𠈷𠈸𠈹𠈺𠈻𠈼𠈽𠈾𠈿𠉀𠉁𠉂𠉃𠉄𠉅𠉆𠉇𠉈𠉉𠉊𠉋𠉌𠉍𠉎𠉏𠉐𠉑"字符的ttf文件。

### 缘起

    我是一个从事文字内容的应用的开发者，某一天发现用户提交的内容中出现了一些很少见的生僻字在前端却展示不了，查询了原因发现是用户提交的文字是输出非常见的 unicode编码中的文字，k扩展区F、G、H 一般用户电脑上是没有安装对应字体的。所以在前端展示不了如图：![1667230691609](image/README/1667230691609.png)

解决方案：

    问题都根源在于客户端的操作系统中并未安装对应的字体文件，只要用户安装了对应的字体文件那么就能正常展示了。但是问题又来了，不可能要求每个用户都手动安装对应的字体文件。

1. 方案一：在浏览器通过 css 来加载一个服务端的 ttf 文件，这样用户就临时有了一个对应的 ttf 文件，这样就能展示了。大致代码如下：

```css
   <style>
   	@font-face {
   		font-family: 'custom-font';
   		src: url('/static/allfont.ttf');
   	}
   	body {
   f		ont-family: custom-font;
   	}
   </style>
```

    弊端：加载一个大而全的 ttf文件浪费带宽且收益并不高，因为先有汉字7w+属于非扩展区的字有5w+，这5w+字的字体文件至少有几十 MB,为了能正确显示需要把这5w+字对应的字体全部加载到客户端，而一篇文章中真正使用的可能才不到几个字无疑对服务器和带宽是一个巨大的挑战和浪费。

3. 方案二：仅请求本次打开网页中在非常见 unicode 编码中的汉字的 ttf 即可，例如：本网页中"姓名"属于非常见 unicode 编码的汉字，单独请求接口[接口: /createFont?text=姓名](/createFont?text=姓名) 来单独拉取"姓名"二字的 ttf 文件。从而在网页中使用

### 应用场景

    可应用于一些文字居多的，且文字有出现生僻字(非常见的 unicode 编码内的字)，或对文字完全显示需求较高的应用，例如：知乎，掘金，百科等以文字为主，且文字显示要求较高。

### 实现方式

    ttf字体文件是从过 svg 矢量图于 unicode 码中做的一个对应关系。所以我们要想做到可以生成所有的汉字的 ttf文件，我们需要收集到所有的汉字的 unicode和对应字形的svg图，从而生成它们的映射关系来制作 ttf文件。

1. 收集所有的字，我在[字海网](http://www.rendao.com/zsts.htm)通过爬虫爬取所有扩展区中的字，并能转成其 unicode 码
2. 收集所有字的 svg 图，我在[字形维基](http://zhs.glyphwiki.org/)上通过爬去对应字形的 svg 图片并已 其字 unicode 码.svg 保存。
3. 基于 svg 和字生成 ttf 文件
4. 做成一个 web 服务，供外部调用。

### 友情链接

1. [字海网](http://www.rendao.com/zsts.htm) 提供字形
2. [字形维基](http://zhs.glyphwiki.org/) 提供 svg 图片
3. [font-carrier](https://github.com/purplebamboo/font-carrier) 制作 ttf 文件的 JavaScript 库
4. [cheerio](https://github.com/cheeriojs/cheerio) 一个运行在 node 端的 jquery，可以在爬去数据的时候快速获取元素
5. [koa](https://github.com/koajs/koa) 一个运行在 node.js 的轻量级 http 服务器

### 运行方式

注意需要 node 版本 14 以上

```bash
npm install // 安转依赖

npm run start // 启动http服务

// 然后便是在使用方调用接口 "/createFont?text=文字" 便可得到想要的 ttf文件

```

### TODO(排期未定，人员未定)：

1. 提供查询服务，查询可生成哪些字已有 svg 文件可直接生成 ttf 文件
2. 提供可上传 svg 图片和对应字形接口，以便扩展现没有的字
3. 提供一个字可对应不同风格的 svg 图片，生成时可供用户选择，例如：「一」这个字选择楷体风格的 svg 图片，「二」这个字选择行书风格的 svg 图片
4. 提供使用用户上传 svg 图片和字来生成 ttf 文件
5. 提供 ttf 字体文件拆分 svg 图片服务
6. 提供合并两个 ttf 文件服务
