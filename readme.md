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

```
	<script src="jquery-2.1.1.js"></script>
	<script src="jquark.js"></script>
```

To install Quark download quark.js and add a link to it in the document head.

```
	<script src="jquark.js"></script>
```

## Quark syntax v jQuery syntax.

Quark syntax is similar to jQuerys but has most of the brackets, full stops and quotation marks left out.

Lets translate a peice of jQuery code into Quark.

```
$(document).ready(function(){
	var a = document.createElement("input");
	$(a).attr("type","text").val("input element").css({border:"1px solid red";color:"blue"}).prop("disabled",true).attr("placeholder","input placeholder");
	$("body").append(a);
});
```

Step 1 is to translate the creation of the input box.

```
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
However other commands may slip through the net and not be generated.  
If one of these is encountered then they will be generated on the fly.
