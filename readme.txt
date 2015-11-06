


Quark is an unusual javascript library.  It is both a stand alone system as well as being an integrated jQuery plugin.
Quark was designed to be the rendering engine for a miniature cloud database and is particularly good at the fast iterative operations required when creating tables of data or data driven html.
The targets for that database includes small low powered hand held devices operating with poor connectivity.
To achieve this quark is small and fast. In table creation tests it can be up to 4 times faster than jQuery.  
Quark minimises to about 11k and gzips to less than 4k.
However quark, when loaded and compiled, is not small. Quark examines its host browsers capabilities and writes itself accordingly.  Whereas jQuery has 148 inline commands, quark is finer grained and has the equivalent of over 750.
When used as a jQuery plugin quark offers a highly compact, but easily recognisable, syntax which can be used inline with other jQuery commands.
Quark also offers several advanced features such as an internal namespace and reentry points and access to its database engine, all of which I could demonstrate from within jQuery.




Quark is quite clearly a son of jQuery and so Render is the natural place to discuss it.  
Quark attempts to get back to the raw simplicity of earlier jQuery versions but by being interoperable with the latest 
versions it means that you do not have to abandon your favourite advanced plugins and features of jQuery.  
Oddly I didn't write quark, I merely wrote the engine that writes quark.  Quark itself remains a bit of a mystery to me.  
It does what I need from it but I also keep discovering things that it can do that I had never considered.  
I would love to see the uses other people could put it to and to discuss how to develop it further.

Does being a madman who spends his spare time and evenings writing his favourite pet project make me part of a minority?  I'm not sure.
Whilst I am employed as a programmer/contractor by a large organisation this project is entirely separate.  
This gives it the advantage of being internally consistent, it wasn't designed by a committee, it had no budget or time constraints, 
and yes it has taken for ever. I'm not sure if this library could have been written any other way.  

I currently work as a contractor at the Open University, where I have been employed in different capacities for the last 9 years 
developing learning systems and interactive content.
I was an Architect for many years before becoming involved with CAD systems and subsequently became a full time programmer 17 years ago.
I had been involved in back end database systems until arriving at the OU where the emphasis became more front end and browser based.