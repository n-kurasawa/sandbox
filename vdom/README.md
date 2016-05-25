##前提
例えば以下のようなアプリケーションがあったとする。

1. サーバサイドでhtmlを動的に生成
1. 1のhtmlを文字列としてjsonに突っ込む
1. そのjsonをクライアントに返す
  * こんなの

    ```:json
    "data": {
      "html": '<div id="hoge">hoge<div id="foo">foo</div></div>'
    }
    ```
1. クライアンは受け取ったjsonのhtmlをinnerHtmlとかでぶっこむ
  * こんな感じ

    ```:js
      $("body").html(data.html);

    ```

1. 毎リクエストごと、こんな感じで全htmlごと返す


##問題
この場合、現在のhtmlの状態が

```:html
<div id="hoge">hoge<div id="foo">foo</div></div>
```

であって次のリクエストで

```:html
<div id="hoge">hoge<div id="change">change!</div></div>
```

みたいなhtmlが返ってきた場合、`<div id="hoge">`の部分は変わらなくても
全DOMに更新がかかる。

##解決案
Virtual Dom で更新してしまえばこっちで何もしなくても
勝手に差分更新になるのでは。

##雑な実装イメージ
1. 文字列htmlをvirtual-domに変換
  - html-to-vdom
2. diffとってpatch
  - virtual-dom


```:js
// 1回目のリクエスト
var html = '<div id="hoge">hoge<div id="foo">foo</div></div>';
var vtree = convertHTML(html);
var el = createElement(vtree);
document.body.appendChild(el);

// 2回目のリクエスト
var html2 = '<div id="hoge">hoge<div id="change">change!</div></div>';
var vtree2 = convertHTML(html2);
var patches = diff(vtree, vtree2);
patch(document.body, patches);

```
