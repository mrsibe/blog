---
title: HTML 简介
description: HTML 的基本概念、元素与常见标签。
---

## HTML 是什么

**HTML**（HyperText Markup Language，超文本标记语言）是一种**标记语言**，一般编写在后缀名为 `.html` 的 **HTML 文档**之中。

它和 Markdown 类似，通过各种标记描述网页内容的结构和语义。至于具体的颜色、字体、大小、布局等样式，一般交给 CSS 处理。

## HTML 元素是什么

HTML 的基本单位是**元素（Element）**，普通元素由开始标签、内容和结束标签构成：

```
<p>这是一段文字</p>
```

其中 `<p>` 是开始标签，`</p>` 是结束标签，整个 `<p>这是一段文字</p>` 才叫元素。标签不区分大小写，不过为了规范一般都使用小写。

元素可以放置在其他元素内部，被称为**嵌套**。

有些元素只有一个标签，被称为**空元素（Void Element）**：`<img src="firefox.png" alt="Firefox 图标" />`。常见的空元素还有 `<br>`、`<hr>`、`<meta>`、`<link>`、`<input>` 等。

元素可以拥有**属性（Attribute）**，用于提供额外的信息或配置，可以简单理解为键值对：

```
<a href="https://example.com">Example</a>
<img src="cat.png" alt="一只猫" width="300" />
```

一个元素可以有多个属性，属性之间使用空格分隔。属性值一般使用双引号或单引号包起来。

有些属性是**布尔属性**，只要存在就表示 true：

```
<!-- 这是一段注释 -->
<!-- 即使写成 `disabled="false"`，`disabled` 仍然会生效。 -->
<input type="text" disabled />
```

HTML 中连续的普通空格和换行通常会被折叠成一个空格，所以不要通过堆空格或者换行控制页面布局。

`<`、`>`、`&` 等字符具有 HTML 语法含义，如果想作为普通文本显示，可以使用**字符引用（Character Reference）**：

```
&lt;    <!-- < -->
&gt;    <!-- > -->
&amp;   <!-- & -->
&quot;  <!-- " -->
```

## 常用 HTML 元素

- HTML 提供了 `<h1>` 到 `<h6>` 六级标题，主要用于表示文档的层级关系，而不是控制字体大小。普通段落使用 `<p>`。
- `<em>` 和 `<strong>` 都表示强调：`<em>` 表示强调，浏览器默认一般显示为斜体；`<strong>` 表示内容具有较高的重要性，默认一般显示为粗体。
- `<ul>` 表示无序列表，`<ol>` 表示有序列表，列表项都使用 `<li>`，列表内部还可以继续嵌套列表。
- `<dl>` 表示描述列表，其中 `<dt>` 表示术语，`<dd>` 表示对应的描述，适合术语和定义、问题和答案、名称和描述等内容。
- 超链接使用 `<a>`，比如 `<a href="https://developer.mozilla.org/">MDN</a>`。`<a>` 不只能包文字，也可以包图片等其他内容。
- 内部链接可以通过元素的 `id` 跳转到当前页面中的某个位置：

```
<h2 id="html-element">HTML 元素</h2>

<a href="#html-element">跳转到 HTML 元素</a>
```

- 图片使用 `<img>`，其中 `src` 表示图片地址，`alt` 表示图片的文本描述：

```
<img src="cat.jpg" alt="一只趴在桌子上的橘猫" />
```

图片无法加载或者用户使用屏幕阅读器时，会使用 `alt` 描述图片内容。如果图片只是装饰，没有实际语义，可以设置 `alt=""`。

### 一些其他文本语义元素

- `<blockquote>` 用于较长的块级引用，`<q>` 用于较短的行内引用。
- `<abbr>` 用于表示缩写，比如 `<abbr title="HyperText Markup Language">HTML</abbr>`，可以通过 `title` 属性标记缩写的完整含义。
- `<sup>` 表示上标，比如 `x<sup>2</sup>`；`<sub>` 表示下标，比如 `H<sub>2</sub>O`。
- `<code>` 用于表示代码，比如 `<code>System.out.println()</code>`。多行代码一般配合 `<pre>` 使用，`<pre>` 会保留内容中的空格和换行。
- `<time>` 用于表示时间和日期，比如 `<time datetime="2026-10-06">2026 年 10 月 6 日</time>`，`datetime` 属性用于提供机器可识别的时间信息。

## HTML 文档结构

一个最基础的 HTML 文档：

```
<!doctype html>
<html lang="zh-CN">
  <head>
    <meta charset="utf-8" />
    <title>我的测试页面</title>
  </head>
  <body>
    <p>这是我的页面</p>
  </body>
</html>
```

1. `<!doctype html>`：文档类型声明，让浏览器按照现代 HTML 标准解析页面。
2. `<html>`：HTML 文档的根元素，`lang` 属性表示页面的主要语言。
3. `<head>`：存放 HTML 文档的元信息和配置，一般不会直接展示给用户。
4. `<body>`：存放网页展示给用户的主要内容。

### 头元素

常见的 `<head>` 内容：

```
<head>
  <meta charset="utf-8" />
  <title>我的测试页面</title>
  <meta name="author" content="MrSibe" />
  <meta name="description" content="这里是描述页面的内容" />
  <link rel="stylesheet" href="style.css" />
  <script src="main.js" defer></script>
</head>
```

- `<title>`：HTML 文档的标题，一般显示在浏览器标签页上。
- `<meta>`：描述文档的元信息，比如字符编码、作者、页面描述等。
- `<link>`：描述当前文档和其他资源的关系，最常见的是引入 CSS，也可以配置 favicon。
- `<script>`：加载或编写 JavaScript，`src` 指定文件地址，`defer` 表示等 HTML 解析完成后再执行。注意，`<script> `不是空元素，需要写结束标签。

## 语义化 HTML

`<body>` 中除了标题、段落、列表等内容元素之外，还有一些用于组织页面结构的**语义化元素**：

- `<header>`：页面或者某个区块的页眉。
- `<nav>`：主要的导航区域。
- `<main>`：当前页面最主要的内容，一个页面通常只有一个。
- `<article>`：相对独立、完整的一块内容，比如博客文章、新闻、论坛帖子等。
- `<section>`：按照主题划分出来的一个内容区段，一般会有自己的标题。
- `<aside>`：和主要内容相关但不属于主要内容本身的信息，比如侧边栏、相关阅读等。
- `<footer>`：页面或者某个区块的页脚。

`<header>` 和 `<footer>` 不一定只能出现一次，`<article>` 等元素也可以拥有自己的 `<header>` 和 `<footer>`。

`<article>` 和 `<section>` 比较容易混淆：`<article>` 更强调内容可以相对独立存在，`<section>` 更强调一段内容内部按照主题进行划分。

比如：

```
<main>
  <article>
    <header>
      <h1>HTML 学习笔记</h1>
    </header>

    <section>
      <h2>HTML 是什么</h2>
      <p>...</p>
    </section>

    <section>
      <h2>HTML 元素</h2>
      <p>...</p>
    </section>
  </article>

  <aside>
    <h2>相关阅读</h2>
  </aside>
</main>
```

### `<div>` 和 `<span>`

如果没有合适的语义元素，可以使用 `<div>` 和 `<span>` 这两个没有特殊语义的通用容器：

```
<div class="card">
  <h2>HTML</h2>
  <p>...</p>
</div>

<p>当前状态：<span class="status">运行中</span></p>
```

`<div>` 一般用于包裹一块内容，`<span>` 一般用于包裹一小段行内内容。如果有 `<nav>`、`<article>`、`<section>` 等更合适的语义元素，优先使用这些元素。

### `<br>` 和 `<hr>`

- `<br>` 表示换行，不要使用大量 `<br>` 控制间距，间距应该交给 CSS。
- `<hr>` 表示内容在主题上的分隔，浏览器默认一般显示为一条横线。

## 一个比较规范的 HTML 页面

```
<!doctype html>
<html lang="zh-CN">
  <head>
    <meta charset="utf-8" />
    <title>HTML 学习笔记</title>
    <meta name="description" content="HTML 基础学习笔记" />
    <link rel="stylesheet" href="style.css" />
    <script src="main.js" defer></script>
  </head>

  <body>
    <header>
      <h1>MrSibe Notes</h1>
    </header>

    <nav>
      <a href="/">首页</a>
      <a href="/html">HTML</a>
      <a href="/css">CSS</a>
    </nav>

    <main>
      <article>
        <h2>HTML 学习笔记</h2>

        <section>
          <h3>HTML 是什么</h3>
          <p>HTML 是一种<strong>标记语言</strong>，用于描述网页的结构和语义。</p>
        </section>

        <section>
          <h3>HTML 元素</h3>
          <p>HTML 文档由大量 HTML 元素组成。</p>
        </section>
      </article>

      <aside>
        <h2>相关阅读</h2>
      </aside>
    </main>

    <footer>
      <p>Copyright © MrSibe</p>
    </footer>
  </body>
</html>
```

HTML 主要负责描述内容的**结构和语义**，具体的颜色、字体、大小、间距和布局等样式一般交给 CSS。
