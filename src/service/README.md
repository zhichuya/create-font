### 注意:

font-carrier 库其中生成的 unicode 码有问题，需要修改，
修改位置：font-carrier/lib/class/font.js setGlyph()方法的

```javascript
setGlyph: function() {
    var self = this
    var map = null
    if (arguments.length == 2) {
      map = {}
      map[arguments[0]] = arguments[1]
    }

    if (arguments.length == 1 && _.isObject(arguments[0])) {
      map = arguments[0]
    }

    if (!map) return
    var glyph
    _.each(map, function(value, unicode) {
      unicode = helper.normalizeUnicode(unicode)
      glyph = _generateGlyph.call(self, value)

      if (glyph) {
          //重写unicode
        glyph.set('unicode', arguments[0].unicode)
          //如果发现没有设置name,就使用unicode
        if (!glyph.get('glyphName')) glyph.set('glyphName', 'uni' + unicode.replace(/(&#x)|(;)/g, ''))
          //设置对应的新字体，进行各种适配转换
        glyph.setFont(self)
      }
    })
  },
```

### notice：

    考虑到不能每次都修改 node_modules 中包的代码，于是修改之后上传到了 npm，后续使用 wiki-font-carrier 这个包
