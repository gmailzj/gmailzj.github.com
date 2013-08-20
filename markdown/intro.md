#前言
之前有了解过markdown，但一直没实际使用，今天试用了下，感觉很爽，推荐给大家，特别是在编写规范、接口文档等方面非常适合，因为其简单易用也有很多人用来写网络小说。

**本文也是采用markdown语法书写而成的**

#介绍
Markdown 的目标是实现**易读易写**，可以直接在问编辑器书写和保存，除本身具有非常好的可读写外，还可以生存格式非常好看的html代码发布在互联网中。

如链接：[码农](http://www.itcoder.me/)，其书写格式为：
	
	[码农](http://www.itcoder.me/)
 

>Markdown 不是想要取代 HTML，甚至也没有要和它相近，它的语法种类很少，只对应 HTML 标记的一小部分。Markdown 的构想不是要使得 HTML 文档更容易书写。在我看来， HTML 已经很容易写了。Markdown 的理念是，能让文档更容易读、写和随意改。HTML 是一种发布的格式，Markdown 是一种书写的格式。就这样，Markdown 的格式语法只涵盖纯文本可以涵盖的范围。

#语法介绍
##区块元素
*	段落和换行
	
	一个 Markdown 段落是由一个或多个连续的文本行组成，它的前后要有一个以上的空行（空行的定义是显示上看起来像是空的，便会被视为空行。比方说，若某一行只包含空格和制表符，则该行也会被视为空行）。普通段落不该用空格或制表符来缩进。

	「由一个或多个连续的文本行组成」这句话其实暗示了 Markdown 允许段落内的强迫换行（按入两个以上的空格然后回车）

*	标题
	
	Markdown 支持两种标题的语法，类 Setext 和类 [atx](http://www.aaronsw.com/2002/atx/) 形式，我们这里只介绍我建议使用的Atx 形式.
	类 Atx 形式则是在行首插入 1 到 6 个 `#` ，对应到标题 1 到 6 阶,例如：

		# 这是H1
    	## 这是 H2
    	###### 这是H6
*	区块引用 Blockquotes

	Markdown 标记区块引用是使用类似 email 中用 `>` 的引用方式,如：

	    >这是一个区块引用  
    	>这是一个区块引用
    展现形式为：
	>这是一个区块引用  
    >这是一个区块引用
	
*	列表
	Markdown 支持有序列表和无序列表。

	无序列表使用星号、加号或是减号作为列表标记：如：

	    *   Red
    	*   Green
    	*   Blue
    有序列表则使用数字接着一个英文句点：

	    1.  Bird
    	2.  McHale
    	3.  Parish


*	代码区块
	这功能应该是我们程序员最喜欢的功能，在 Markdown 中建立代码区块很简单，只要简单地缩进 4 个空格或是 1 个制表符就可以，有些还支持代码高亮。

	    这是一个普通段落
    
    		这是一个代码区块。
*	分隔线
	你可以在一行中用三个以上的星号、减号、底线来建立一个分隔线，行内不能有其他东西。你也可以在星号或是减号中间插入空格。下面每种写法都可以建立分隔线：

        * * *
    
    	***
    	
   		*****
    
    	- - -
    
    	---------------------------------------
*************************
##区段元素
*	###链接

	Markdown 支持两种形式的链接语法： 行内式和参考式两种形式

	不管是哪一种，链接文字都是用 [方括号] 来标记。

	这里只介绍行内式，参考式可以访问本文后面的参考链接详细了解。

	要建立一个行内式的链接，只要在方块括号后面紧接着圆括号并插入网址链接即可，如果你还想要加上链接的 title 文字，只要在网址后面，用双引号把 title 文字包起来即可，例如：

		This is [an example](http://example.com/ "Title") inline link.

		[This link](http://example.net/) has no title attribute.

*	###强调

	Markdown 使用星号（*）和底线（_）作为标记强调字词的符号，被 * 或 _ 包围的字词会被转成用 `<em>` 标签包围，用两个 * 或 _ 包起来的话，则会被转成 `<strong>`，例如：
	
		*single asterisks*
	
		_single underscores_
		
		**double asterisks**
		
		__double underscores__
		
*	###代码
	如果要标记一小段行内代码，你可以用反引号把它包起来（`），例如：
	
		则会被转成 `<strong>`

*	###图片
	很明显地，要在纯文字应用中设计一个「自然」的语法来插入图片是有一定难度的。
	Markdown 使用一种和链接很相似的语法来标记图片，同样也允许两种样式： 行内式和参考式。
	这里也只介绍行内式：

		![Alt text](/path/to/img.jpg)

		![Alt text](/path/to/img.jpg "Optional title")

	详细叙述如下：

	*	一个惊叹号 !
	*	接着一个方括号，里面放上图片的替代文字
	*	接着一个普通括号，里面放上图片的网址，最后还可以用引号包住并加上 选择性的 'title' 文字。
*******************************
##其它

*	###自动链接
	Markdown 支持以比较简短的自动链接形式来处理网址和电子邮件信箱，只要是用方括号包起来， Markdown 就会自动把它转成链接。一般网址的链接文字就和链接地址一样，例如：

		<http://example.com/>
		<address@example.com>
	Markdown 会转为：

		<a href="http://example.com/">http://example.com/</a>
		<a href="mailto:address@example.com">address@example.com</a>

*	###反斜杠
	Markdown 可以利用反斜杠来插入一些在语法中有其它意义的符号，例如：如果你想要用星号加在文字旁边的方式来做出强调效果（但不用 `<em>` 标签），你可以在星号的前面加上反斜杠：
		\*literal asterisks\*
	Markdown 支持以下这些符号前面加上反斜杠来帮助插入普通的符号：

		\   反斜线
		`   反引号
		*   星号
		_   底线
		{}  花括号
		[]  方括号
		()  括弧
		#   井字号
		+   加号
		-   减号
		.   英文句点
		!   惊叹号


#markdown编辑器
markdown的编辑器基本都支持实时预览功能，下面介绍几个我在用的。

*	我自己在用的woidows markdown编辑器是[markdownpad 2](http://www.markdownpad.com/),觉还不错
*	在线编辑器有[mahua](http://mahua.jser.me/)
*	wordpress编辑器：[wp-markdown](http://wordpress.org/plugins/wp-markdown/)


#参考链接

Markdown 语法说明 (简体中文版):[http://wowubuntu.com/markdown/](http://wowubuntu.com/markdown/ "Markdown 语法说明 (简体中文版)")

