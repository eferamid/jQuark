# jQuark and Quark

[I'm still pulling this repo all together - please pop back in a day or so]

Quark is an unusual javascript library.  It is both a stand alone system as well as being an integrated jQuery plugin.

There are two compilations - jquark.js is a jQuery plugin whereas quark.js is a standalone library.


Quark was designed to be the rendering engine for a miniature cloud database and is particularly good at the fast iterative operations required when creating tables of data or data driven html.

The targets for that database includes small low powered hand held devices operating with poor connectivity.

To achieve this quark is small and fast. In table creation tests it can be up to 4 times faster than jQuery.  

Quark minimises to about 11k and gzips to less than 4k.

However quark, when loaded and compiled, is not small. Quark examines its host browsers capabilities and writes itself accordingly.  Whereas jQuery has 148 inline commands, quark is finer grained and has the equivalent of over 750.

When used as a jQuery plugin quark offers a highly compact, but easily recognisable, syntax which can be used inline with other jQuery commands.

Quark also offers several advanced features such as an internal namespace and reentry points and access to its database engine.

## To install

To install jQuark download jquark.js and add a link to it in the document head after the link to jQuery:

```html
	<script src="jquery-2.1.1.js"></script>
	<script src="jquark.js"></script>
```

To install Quark download quark.js and add a link to it in the document head.

```html
	<script src="jquark.js"></script>
```

## Quark syntax v jQuery syntax.

Quark syntax is similar to jQuerys but has most of the brackets, full stops and quotation marks left out.

Lets translate a peice of jQuery code into Quark.

```javascript
$(document).ready(function(){
	var a = document.createElement("input");
	$(a).attr("type","text").val("input element").css({border:"1px solid red";color:"blue"}).prop("disabled",true).attr("placeholder","input placeholder");
	$("body").append(a);
});
```

#### Step 1 is to translate the creation of the input box.

```javascript
$(document).ready(function(){
	var a=ú("ce,input|type,text|val,input element|border:1px solid red|color,blue|disabled,true|placeholder,input placeholder");
	$("body").append(a);
});
```

"ce" stands for "create element".

You will see that quark dispenses with the jQuery css, attr and prop commands and instead generates individual commands for each sub-property.

The variable "a" now points to a quark function. However it can be appended into the jQuery line as if it were an element or collection.

You will also notice that the whole set of commands is contained in a string.  This is an important feature of quark.  
When the string is first executed it is compiled.  If it is executed again the compiled version will be used.

The fact that quark is written as compilable strings means that the compiler has a "read ahead" ability.  
When quark loads it generates a small number of elements and examines their properties, attributes, events and css and writes itself accordingly. 
However other commands may slip through the net and not be generated.  If one of these is encountered then they will be generated on the fly.

#### Step 2 is to translate the rest

```javascript
ú.ready(function(){
	ú("body|ace,input|type,text|val,input element|border:1px solid red|color,blue|disabled,true|placeholder,input placeholder");
});
```

In this example, written entirely in Quark, the first command is now a selector which maps to document.querySelector and returns a single element.
"ace" stands for append create element and is one of a suit of commands that "step into" and return the created elements(s) so that further work can be done on them.

## Quark is a more explicit language than jQuery.

### Terminators - getters and setters.

Many jQuery commands have multiple signatures. The most frequently used are those that choose between returning or setting a value.

In this example:

```javascript
var a=$("input").attr("type","text").val("input value").css({border:"1px solid red"}),
	b=a.attr("type"),
	c=a.val(),
	d=a.css("border");
```

"a" will be a jQuery object containing the input element.
"b" will be set to "text"; the value of the type attribute and
"c" will be set to "input text",
"d" will be set to "1px solid red";

In the above example the "attr" command is used first as a setter - it sets the value of the type attribute.  In the second line it is used as a getter.

Many jQuery commands have multiple signatures and these are used to determine the context and required behaviour. The problem is that in some cases resolving the context is quite involved. 

Quark explicitly separates out getters and setters.  The code above can be rewritten in quark as follows:

```javascript
var a=$("input|type,text|val,input value|border,1px solid red"),
	b=a("type$"),
	c=a("val$"),
	d=a("border$");
```

###### 	Heads up:
Any *command* name that ends with a "$" is a terminator (a getter) and must be the last command in the string.
Any commands following the terminator will never be executed.

### Quark and Quirk

Quark is really two libraries that have become joined at the hip.  You could call the other one Quirk but that would probably be silly.
Quark (ú - alt 0250) is basically a wrapper around the browsers native querySelector command.
Quirk (í - alt 0237) is basically a wrapper around the browsers native querySelectorAll command.

When writing code you need to be clear about what results you are trying to achieve.

To illustrate this I need to jump ahead a little bit.  This code:

```javascript
ú("body|ace,table|mace,tr,3|addClass,row,~i|set,row,~i|mace,td,4|addClass,cell,~i|html,row:,~row, cell:,~i")
```

will generate a table looking something like this (ignore the blank header column):

                |                |                |                |
 -------------- | -------------- | -------------- | --------------- 
row:,0, cell:,0	|row:,0, cell:,1 |row:,0, cell:,2 |row:,0, cell:,3 
row:,1, cell:,0	|row:,1, cell:,1 |row:,1, cell:,2 |row:,1, cell:,3 
row:,2, cell:,0	|row:,2, cell:,1 |row:,2, cell:,2 |row:,2, cell:,3 

###### 	Heads up:
The code above uses quarks inbuilt iterator (i), the command mace (multi append create element) and adds classes "row0", "row1", "row2" to the tr elements and "cell0", "cell1", "cell2", "cell3" to the td elements.
Because the cell iterator will overwrite the row iterator the row number is stored temporarily with a different name.
The resulting cell html is a concatenation of text and namespace variables.

Using quark the command:

```javascript
ú("table tr");
```

will return a reference to the first row in the table.

whereas:

```javascript
ú("table tr|html$");
```

will return the text string:

```html
"<td class="cell0">row:,0, cell:,0</td><td class="cell1">row:,0, cell:,1</td><td class="cell2">row:,0, cell:,2</td><td class="cell3">row:,0, cell:,3</td>"
```

Using quirk the command:

```javascript
í("table tr");
```

will return a reference to all rows in the table.

whereas:

```javascript
í("table tr|html$");
```

will return an array containing the inner html of all three rows.

```html
[ "<td class="cell0">row:,0, cell:,0</…", "<td class="cell0">row:,1, cell:,0</…", "<td class="cell0">row:,2, cell:,0</…" ]
```

### Quark has no find command.

To quark the jQuery find command is ambiguous.  Instead quark uses its native syntax internally as well as externally.  
Just as `ú("table")` maps to `document.querySelector("table")` then `ú("table|ú,td")` can be considered equivalent to:

```javascript
var elem = document.querySelector("table");
elem.querySelector("td");
```

Quirk works in the same way but maps to querySelectorAll.

Hence `ú("table|ú,td|html$")`

will return:

```html
"row:,0, cell:,0"
```

And `ú("table|í,td|html$")`

will return an array of 12 strings:

```html
[ "row:,0, cell:,0", "row:,0, cell:,1", "row:,0, cell:,2", "row:,0, cell:,3", "row:,1, cell:,0", "row:,1, cell:,1", "row:,1, cell:,2", "row:,1, cell:,3", "row:,2, cell:,0", "row:,2, cell:,1", 2 more… ]
```

##### Targeting specific elements

Assume we want to target the third cell in the second row of the table we could use the following code:

```javascript
í("table tr|eq,1|í,td|eq,2|html$");
```

and this will return an *array* with one element:

```html
[ "row:,1, cell:,2" ]
```

However this could be very much more efficiently written as follows:

```javascript
ú("table tr:nth-child(2)|ú,td:nth-child(3)|html$");
```
and this will return a *string*:

```html
"row:,1, cell:,2"
```

And this could be further refined as follows:

```javascript
ú("table tr:nth-child(2) td:nth-child(3)|html$");
```

###### Heads up
For efficiency if you can use quark (ú) rather than quirk (í) then do so.
Lay off as much of the code as possible into the browsers native selector statement (the first command).

Quarks command "eq" is zero based for compatibility with jQuery.
The native css "nth-child" selector is 1 based.
Quarks internal iterator is zero based.
Its a pity that they are different but that's how it is.
As a result some of the return values shown above may seem wrong at first glance.

Any terminator command `([command]$)` that follows a quirk selector (í) will return an array containing 0 or more elements.
Any terminator command that terminates a command string that starts with and exclusively contains quark selectors (ú) will return the actual return value of the single chosen property.

## Quark primitives - events, style, class

Unlike jQuery Quark directly supports using the primitive attributes for style class and events. 
Primitives are not really suitable for multi level hierarchical systems but for simple apps they are sometimes the best way to lay off multi-stepped operations into the browsers rendering engine.

### Class

The following code:

```javascript
í("table tr|class,inactive pending");
```

will add the classes "inactive" and "pending" to all rows in the table.

Now the following code:

```javascript
ú("table tr:nth-child(2)|class,active");
```

will remove the classes "inactive" and "pending" (and any other classes that may have existed previously) from the second row and add the class "active";

### Style

A similar technique can be applied to the style attribute;

```javascript
í("table tr|style,opacity:0.5;background:#ccc");
```

Will "grey out" all rows in the table.

Now the following code:

```javascript
ú("table tr:nth-child(2)|style,color:red");
```

Will remove the "greyed out" effect from the second row (and any other previously applied css properties) and change the colour of the text to red.

Note that quark uses native css syntax (no {opacity:"0.5",background:"#ccc"} etc.)

The style command is unusual in that what you put in, a css string, is not what you get back, a CSS2Properties object.


This code:

```javascript
.ú("table tr|style$");
```

will return an object which when pasted into a text document will look like this:

```
CSS2Properties { opacity: "0.5", background-color: "rgb(204, 204, 204)", background-image: "none", background-repeat: "repeat", background-attachment: "scroll", background-position: "0% 0%", background-clip: "border-box", background-origin: "padding-box", background-size: "auto auto" }
```

### Events

```javascript
í("table td|onclick,alert('a primitive event')");
```

will alter the table in the example above so that when you click on any of the cells an alert box will appear.

The following code:

```javascript
function myfunction(ev,el){
	console.log("event:",ev);
	console.log("element:",el);
}
í("table td|onclick,javascript:myfunction(event,this)");
```

will overwrite the previous example so that when you click on any of the cells the event object and target element will be logged to the console.
There can only be one onclick attribute and so replacing this attribute has the effect of unbinding the previously attached event.

Finally the following code:

```javascript
function myfunction(ev,label,iterator,el){
	console.log(label,iterator);
	console.log("event:",ev);
	console.log("element:",el);
}
í("table td|onclick,javascript:myfunction(event,'cell number:',~i,this)");
```

will label each set of logs with the label "cell number: 0" through to "cell number: 11".

###### Gotcha
With the current code the substituted variable "~i" cannot be the first or the last variable passed to the function.
If you only want to pass in one variable and it is a substituted variable you have to pad your function as follows:

```javascript
function myfunction(a,iterator,b){
	//a and b are padding
	console.log("cell number:",iterator);
}
í("table td|onclick,javascript:myfunction('',~i,'')");
```

Sorry about this but to get over this issue it would be necessary to write "execute always" code into the inner most loop with only very occasional benefit from it.
If I can think of a better way round this then I'll let you know!

###### Heads up 
The examples above show late substitution taking place.  Every time the onclick attribute is added to an element the variable "~i" is requeried and so it is different for each cell.

There are 4 types of substitution 
* External
* Arguments
* Early 
* Late

They each perform in a slightly different way. More of this anon.
 
## Substitution - arguments

Quark also supports more conventional jQuery like events but in order to add these, the functions to be executed must be passed in as arguments.

Rewriting the first of the examples above:

```javascript
í("table td|click,%1",function(e){alert('an event')});
```

In this case the alert is contained within a function and the function is the *second* argument being passed into the quark function.  
The first argument (argument[0]) is the string `"table td|click,%1"`.  Arguments are zero based and so the second argument is referenced as "%1".
Attempts to simplify this actually end up making it more complicated so that's how it has to be!

###### Heads up
The following mixed jQuery and Quark code:

```javascript
var rows = $("table tr");
í(rows,"í,td|click,%2",function(e){alert('an event')});
```

produces exactly the same result as the previous example but note that the first argument is the jQuery object named "rows".
The second argument is the Quark string and the third argument is the function for the click command.  So that makes the javascript function %2! Gotit?

You can add any number of arguments.  However if a Quark string and the number of arguments gets too long it becomes unmanageable.
That is why the next section will discuss re-entry points.

###### continuing...

Rewriting the next example:

```javascript
var myfunction=function(e){
	console.log("event:",e);
	console.log("element:",this);
}
í("table td|click,%1",myfunction);
```

will log the event object as well as the target element.
It is optional whether to define the javascript function inline as an anonymous function or pass it in as a variable name.

###### I recommend...

You can do this:

```javascript
function myfunction(e){
	console.log("event:",e);
	console.log("element:",this);
}
í("table td|click,%1",myfunction);
```

but it would be much better to define "myfunction" the way I first showed you.  It's all about scope and embedding. You'll thank me in the long run.

###### continuing...

The third example can be rewritten as follows:

```javascript
var myfunction=function(e){
	var ns=ú.getns(this)
	console.log(ns.label,ns.i);
	console.log("event:",e);
	console.log("element:",this);
}
í("table td|embed,%2|dump|click,%1",myfunction,{label:"cell number:"});
```

In this example note that the arguments do not need to be referenced in the right order, %2 is referenced before %1.
Arguments can be referenced in any order and multiple times.

The embed command adds a "label" key and value to this quark instances internal namespace.
Multiple key:value pairs can be added.
The dump command enables the "getns" function within any event functions. *(could be made automatic in future)*.

The "gotcha" example is simply not a problem in this context:

```javascript
var myfunction=function(e){
	var ns=ú.getns(this)
	console.log("cell number:",ns.i);
}
í("table td|dump|click,%1",myfunction);
```

The dump command is still needed in order to pass the namespace iterator (i) into the getns function.

We will need to talk about namespaces later.




