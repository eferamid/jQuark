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

Quark also offers several advanced features such as an internal namespace and reentry points and access to its database engine, all of which I could demonstrate from within jQuery.


