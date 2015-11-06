/**
 * Created by julian on 02/07/2015.
 */
  
//qúark 0250 quírk 0237
(function(A,a,i){

function getúí(m){
	var z=(m)?"querySelectorAll":"querySelector",
		x=(m)?"wrex":"exec";
	return function (a) {
		var c,d,e,r,ns={};
		if(!a)return fnull;
		switch(typeof(a)){
			case "object":
			case "function":
				d=ú.úin(a);
				//console.log("26",d,arguments[1]);
				if(arguments[1]){
					c=ú.compile(arguments[1]);
				}else{
					return ú.xend(d,ns,0,arguments);
				}	
			break;
			default: //it's a string
				//console.log("it's a string");
				c=ú.compile(a);
				if(c[0][0]=="ce"){//starts with a create element
					d=ú.ce(c[0][1],ns);
				}else{
					d=ú.úin(document[z](c[0][0]));//it's a selector
					ns["^"]=d;
				}
				c[0]=undefined;
		}
		ns.xs=this;//set external scope
		c=ú.substitute(c,ns,arguments);
		if(Array.isArray(d)&&x=="exec")d=d[0];
		if(d)d=ú[x](d,c,ns,arguments);
		return ú.xend(d,ns,c.isterm,arguments);
	};
}

var ú=A[a]=getúí(),
	í=A[i]=getúí(true),
	fnull=ú.fnull=function(n){
		if(n&&n.match(/\$$/))return null;
		return fnull;
	};
	
ú.exec=function(e,a,ns){
	//console.log("EXEC",e,a,ns);
	
	var b,d,i;
	//e must by now be an htmlElement, 
	//a must be an instruction array, 
	
    for(i=0;i< a.length;i++){
		b=a[i];
		if(!b)continue;//necessary to leave undefined substituted markers as placeholders
		if(!b[0])continue;
		d=b.slice(1);
		//validation block start
		//validation block end
		ns.a=a;
		ns.e=e;
		d.push(ns);
		
		
		if(!ú.fn[b[0]])ú.fn[b[0]]=ú.gaf(b[0]);
		
		
		//try{//etrap
			//console.log("75",e,i,b,a);
			e=ú.fn[b[0]].apply(e,d);
			//console.log("75",e,i,b,a);
		//}catch(ee){//etrap
			//console.log(ee.message)
			//console.error(ee.message);
			//console.log(b);
			//console.error(e);
			//console.log(d);
			//console.trace();
		//}//etrap
		
		if(Array.isArray(e)){
			a=a.slice(i+1);
			if(a.length)e=ú.wrex(e,a,ns);
			if(Array.isArray(e))return e;
		}
		if(!e)return e;
    }
	return e;
};

ú.wrex=function(e,a,ns){
	var ee=[],eo;
	for(var j=0;j<e.length;j++){
		ns.i=j;
		if(a.length){
			eo=ú.exec(e[j],a,ns);
			if(a.isterm){
				ee.push(eo);
			}else if(eo){//odds and evens will return alternate undefineds			
				if(eo.tagName){
					ee.push(eo);
				}else{
					if(eo)ee=ee.concat(eo);
				}
			}
		}
	}
	delete ns.i;
	return ee;
};

ú.xend=function(e,ns,t,ar){//element, namespace, terminator
	//console.log("XEND -----------",e)
	if(e===undefined)return fnull;//no elements
	if(e===null)return undefined;//terminator from an fnull

	if(t)return e;
	var sw2=function(c,ar){//swipswap was the first argument a reentry point?
		var	d=ns[c[0][0]];
			if(d){
				//console.log("first argument was a reentry point g",c.isreen)
				delete c[0][0];
				if(Array.isArray(d))return xi(d,ns,c,ar);
				return xu(d,ns,c,ar);
			}
			return false;
	};
	if(Array.isArray(e)){
		return function(b){
			//console.log("choosing XI",e,arguments)
			if(!b)return e;
			if(b==-1)return ns;
			var c=ú.compile(b);
			if(c.isreen)return sw2(c,arguments);
			return xi(e,ns,c,arguments);
		};	
	}else{
		return function(b){
			//console.log("choosing XU",e,arguments)
			if(!b)return e;
			if(b==-1)return ns;
			var c=ú.compile(b);
			if(c.isreen)return sw2(c,arguments);
			return xu(e,ns,c,arguments);
		};
	}
};

var xu=ú.xu=function(e,ns,a,ar){
	//console.log("REENTRY XU --------------------------",e,ns,a,ar)
	e=ú.exec(e,ú.substitute(a,ns,ar),ns);
	//console.log("ENDING XU --------------------------",e,ns)
	var b=(a[a.length-1][0])?a[a.length-1][0].match(/\$$/):false;
	return ú.xend(e,ns,a.isterm,ar);
};

ú.isterm=function(c){//is terminator
	return c[c.length-1][0].match(/\$$/);
};

ú.isreen=function(a){//is reenter
	return a.match(/^\^/);
};

var xi=ú.xi=function(e,ns,a,ar){
	//console.log("REENTRY XI --------------------------",e,ns,a,ar)
	e=ú.wrex(e,ú.substitute(a,ns,ar),ns,ar);
	//console.log("ENDING XI --------------------------",e,ns,a)
	return ú.xend(e,ns,a.isterm,ar);
};



var ag=ú.ag=function(a){//getarguments actually this is getns from arguments really
	return a[a.length-1];
};

ú.nsi=function(ns){
	var nsi={},a;
	for(a in ns)nsi[a]=ns[a];
	return nsi;
};

ú.úin=function(a){
	//we know a is an object but what sort? htmlElement, Collection, NodeList
	if(!a)return;
	if(a.tagName)return a;
	if(typeof(a)=="function")return a();
	var d=[],i;
	if(a.length>0)for(i=0;i<a.length;i++)d.push(a[i]);
	return d;
};

ú.fn={};

ú.ready=function(a){
    // * adepends ready
    window.addEventListener("load",a);
};

ú.ce = function (a,ns) {
    // * adepends ce
		var b=document.createElement(a);
		if(ns){
			ns["^"]=b;//actually is this still necessary??
			ú.fn["^"]=function(ns){
				return ns["^"];
			};
		}
		return b;
};

/**
 * Created by jcl256 on 07/04/2015.
 */
ú.ga = function (a,b) {//get a
    // * adepends ga
    if(a) {
		if(typeof(a)=="function")a=a();
		if(!a.tagName)if(a.length >= 1)if(a[0])a=a[0];else return;
		console.log("226 cloning",b);
        return(b)?a.cloneNode(b):a;
    }
};

ú.fn.ú = function (a) {
    // * adepends ú ob
	try{//etrap
		var t=(this.length)?this[0]:this;
		return t.querySelector(a);
	}catch(e){//etrap
		console.log("error in ú.fn.ú",this,a);
		console.trace();
	}//etrap
};

ú.cmp={};//compiled code

ú.compile=function(a){
	try{//etrap u
		var c=a.split("|"),
		g={s:{},v:{},p:[]},i,k,j;
		for(i=0;i< c.length;i++){
			c[i]=c[i].split(",");
			for(j=0;j<c[i].length;j++){
				k=c[i][j];
				if(k!==undefined){
					k=k.toLowerCase();
					if(k=="true")c[i][j]=true;
					if(k=="false")c[i][j]=false;
				}
				if(k.substr(0,2)=="$$"){//in scope variables
					if(!g.s[k.substr(2)])g.s[k.substr(2)]=[];
					g.s[k.substr(2)].push([i,j]);
				}else if(k.substr(0,1)=="$"){//embedded parameters
					if(!g.v[k.substr(1)])g.v[k.substr(1)]=[];
					g.v[k.substr(1)].push([i,j]);
				}else if(k.substr(0,1)=="%"){//arguments added at end of quark string
					g.p.push([i,j,parseInt(k.substr(1))]);
				}
			}
		}
		c.g=g;
		//console.log("COMPILE END",c);
		c.isterm=ú.isterm(c);
		c.isreen=ú.isreen(a);
		
		return c;
	}catch(e){//etrap
		console.log("ú.compile",e.message);
		//console.log("ú.compile",a,e.message,c);
		//console.trace();
	}//etrap

};

ú.substitute=function(a,ns,ar){
	//console.log("SUBSTITUTE",a,ns,ar)
	var b=JSON.parse(JSON.stringify(a)),i,j;
	//console.log("SUBSTITUTE line6d b",a,ns)

	for(i in a.g.v){//embedded parameters
		for(j in a.g.v[i]){
			//console.log("SUBSTITUTE line6e b",i,ns[i])
			b[a.g.v[i][j][0]][a.g.v[i][j][1]]=ns[i];
		}
	}
	for(i in a.g.s){//in scope variables
		for(j in a.g.s[i]){
			b[a.g.s[i][j][0]][a.g.s[i][j][1]]=ns.xs[i];
		}
	}
	for(i=0;i<a.g.p.length;i++){//arguments added at end of quark string
		if(!a[a.g.p[i][0]])continue;
		b[a.g.p[i][0]][a.g.p[i][1]]=ar[a.g.p[i][2]];
	}

	//console.log("SUBSTITUTE line6c return",b)
	b.isterm=a.isterm;
	b.isreen=a.isreen;
	return b;
};

/*
ú.managedevents=false;
if(ú.managedevents){
	//managed events
	ú.cb=function(g){
		//console.log("creating quark plugin for event type",g);
		var fi,
		f=function(a,b) {
			// * depends events
			// es depends
			var e=(typeof(window.CustomEvent)=="function")?new CustomEvent(g):document.createEvent("event"),
				ns=ag(arguments),
				l,c="data-pq"+g;
			//***********what was this line here for - it blanks out the ns argument but arguments is not passed on???/
			//arguments[arguments.length-1]=undefined;
			//***********resolve review before deleting
            if(this[c]){
                l=this[c];
            }else{
                l=ú.listener.apply(this);
                this[c]=l;
                this.addEventListener(g,l);
            }
            if(!a){
                this[g](e);//fire all functions whether managed or not
                return;
            }

            if(typeof(a)=="function"){
                l.add(a,b);
            }else{
                l.fn[a](e);//fire named function
            }
			return this;
		};
		return f;
	};

}else{
*/
	//simple non managed events
	ú.cb=function(a){
		return function(b){
			if(Array.isArray(b)||!b){//b is the ns
				var event = new CustomEvent(a);
				this.dispatchEvent(event);
			}else{
				//if(typeof(b)=="string")eval("b="+b);//not sure I want to do this.
				this.addEventListener(a,b);
			}
			return this;
		};
	};

//}

ú.isev=function(a){//isevent
	ú.ei=0;
	var c="on"+a,b=ú.ce("input");	
	if(c.indexOf("$")!==-1)return false;//not sure why this is necessary in quirk but not in quark

	try{
		b.setAttribute(c,"ú.ei++;");
	}catch(e){
		return false;//do not remove these error traps. They is part of the logic.
	}
	
	if(b[c]){
		ú.ei=1;
	}else{
		try{
			//most depricated, isContentEditable crashes Edge
			if(["isContentEditable","createShadowRoot","requestFullscreen","webkitRequestFullscreen","webkitRequestFullScreen","mozRequestFullScreen"].indexOf(a)==-1){
				b[a]();
			}
		}catch(e){
			//do not remove these error traps. They is part of the logic.
		}
	}
	
	if(ú.ei>0){
		ú.fn[a]=ú.cb(a);
	}
	return (ú.ei>0)?true:false;
};

ú.addEvent=function(es){
	if(typeof(es)=="string")es=[es];
    for(var i=0;i<es.length;i++) {
        ú.fn[es[i]]=ú.cb(es[i]);
    }
};

ú.gaf=function(a){//getattributefunction
	if(a.substr(0,2)!="on"&&ú.isev(a)){
		//EVENT DETECTED
		return ú.fn[a];
	}
	
	//should be getters and setters
	if(a.match(/\$$/)){
		return function(b){
			try{//etrap
				return this.getAttribute(a.replace(/\$$/,""));
			}catch(e){//etrap
				console.log("ú.gaf getter",a,b,e.message);	
				console.trace()	;	
			}//etrap
		};	
	}else{
		return function(b){
			try{//etrap
				this.setAttribute(a,b);
				return this;
			}catch(e){//etrap
				console.log("ú.gaf setter",a,b,e.message);	
				console.trace();		
			}//etrap
		};
	}
	
};

ú.gps=function(a){//getpropstr
    return function(b){
		this[a]=b;
		return this;
    };
};

ú.gps$=ú.gpb$=ú.gob$=ú.gob=function(a){//getpropstr
    return function(){
        return this[a];
    };
};

ú.gpb=function(a){//getpropbool
    return function(b){
        var c=typeof(b);
            if(c=="string")b=(b.toLowerCase()==="true");
			this[a]=b?true:false;
            return this;
    };
};

ú.gpf=function(a){
	return function(){
		try{//etrap
			for(var i=0;i<arguments.length;i++){
				if(arguments[i].o)arguments[i]=arguments[i].o;
				if(typeof(arguments[i])!="string"&&arguments[i].length>0)arguments[i]=arguments[i][0];
			}
			this[a].apply(this,arguments);
			return this;
		}catch(e){//etrap
			console.log("gpf error",a);
			console.trace();
		}//etrap
	};
};

ú.gpf$=function(a){
	return function(){
		return this[a].apply(this,arguments);
	};
};
	
var b=[ú.ce("input"),ú.ce("td"),ú.ce("table"),ú.ce("a")],
getcsf=function(a){//get computed style function
    ú.fn[a]=function(b){
            this.style[a]=b;
            return this;
    };
	ú.fn[a+"$"]=function(){
        return window.getComputedStyle(this)[a];
    };
};

for(i=0;i<b.length;i++){
	var c=window.getComputedStyle(b[i]);
	for (a in c){
		if(parseInt(a)>0||typeof(c[a])=="function")continue;
		if(!ú.fn[a])getcsf(a);
	}
	for (a in b[i]){
		//console.log("item ",a)
		if(!ú.fn[a]){
			var g=typeof(b[i][a]),d,f;
			if(a.substr(0,1).replace(/[A-Z]/g,"")===""){
				//filter out constants -- maybe put back later
				continue;
			}else{
				d=a.substr(0,1)+a.replace(/[a-z]/g,"");
			}
			if(d.length==1)d="null";
			//is it an event?
			if(a.substr(0,2)=="on"){
				ú.fn[a]=ú.gaf(a);
				continue;
			}else if(ú.isev(a)){
				//console.log("EVENT DETECTED",a);
				continue;
			}
			switch(g){
				case "string":
					f="gps";
					break;
				case "boolean":
					f="gpb";
					break;
				case "function":
					f="gpf";
					break;
				case "object":
					f="gob";
			}	
			ú.fn[a]=ú.fn[d]=ú[f](a);
			ú.fn[a+"$"]=ú.fn[d+"$"]=ú[f+"$"](a);
		}
	}
}

ú.fn.append=function (a,b) {
	var ns=ag(arguments);
	if(b===ns)b=false;
	console.log("APPEND cloning", b);
	this.appendChild(ú.ga(a,b));
	return this;
};

ú.fn.prepend=function(a,b){//step
    // * adepends prepend ga
    this.insertBefore(ú.ga(a,b), this.firstChild);
    return this;
};

ú.fn.after=function(a){
    this.parentNode.insertBefore(ú.ga(a), this.nextSibling);
    return this;
};

ú.fn.before=function(a){
    this.parentNode.insertBefore(ú.ga(a), this);
    return this;
};

ú.fn.replaceWith=function(a){
    this.parentNode.replaceChild(ú.ga(a), this);
    return this;
};

ú.fn.datao=function(a) {
	var b="data-q³",c;
	if(!this[b])this[b]={};
	if(typeof(a)=="object"){
		for(c in a)this[b][c]=a[c];
	}else{
		for(c=0;c<arguments.length-1;c+=2){//trim off the namespace
			this[b][arguments[c]]=arguments[c+1];
		}
	}
    return this;
};

ú.fn.datao$=function() {
	//if(a)return this["data-q³"][a];
	//console.log("datao$",this["data-q³"]);
	var a=this["data-q³"];
    return (a)?a:{};
};

ú.fn.empty=function(){
    // * adepends empty
    while(this.childNodes.length) {
        this.removeChild(this.firstChild);
    }
    return this;
};

ú.fn.removeClass=function(a,ns) {
    // * adepends removeClass
	console.log(this,this.tagName);
	if(!this.tagName){
		console.error("removeClass this is not an element",this);
		return false;
	}
	a=a.split(" ");
	for(i=0;i<a.length;i++){
		this.classList.remove(a[i]);
	}
    return this;
};

ú.fn.addClass=function(a) {//level
	try{//etrap
		if(!this)return this;//trapped upstream???
		var c,b=a.split(" ");
		for(c=0;c<b.length;c++){
			if(b[c])this.classList.add(b[c]);
		}
		return this;
	}catch(e){//etrap
		console.log("addClass error",a,this,e.message);
	}//etrap
};

ú.fn.removeAttr=function(a) {
    this.removeAttribute(a);
    return this;
};

ú.fn.text=function (a) {
    this.textContent=a;
    return this;
};

ú.fn.val = function (a) {
    this.value = a;
    return this;
};
ú.fn.clone = function () {
    // * adepends clone ob
    return this.cloneNode(!0);
};

/*
ú.fn.css = function (a, b) {
	if(typeof(b)=="string"){
		a=a+","+b;
	}else{
		a=a.replace(/;/g,"|").replace(/:/g,",");
	}
	ú(this,a);
    return this;
};
*/

ú.fn.data=function(a,b) {
    this.setAttribute("data-"+a,b);
    return this;
};

ú.fn.hasClass$=function(a) {
    return this.classList.contains(a);
};

ú.fn.toggleClass=function(a,b) {
    this.classList.toggle(a,b);
    return this;
};

/*
fn.prop=function (a, b) {
    this[a] = b;
    return this;
};
*/

ú.fn.prev=function(){//step
    return this.previousSibling;
};

ú.setrep=function(n,d,ns){//set reentry point
	if(ns[n]){
		if(ns[n].tagName){
			ns[n]=[ns[n]].concat(d);
		}else{
			ns[n]=ns[n].concat(d);
		}
	}else{
		ns[n]=d;
	}
};
ú.fn.ace=function(a,ns) {
	var b=ú.ce(a);
	ú.setrep("^"+a,b,ns);
		return this.appendChild(b);
};

ú.fn.mace = function (a,b,ns) {// multiple append create element
    // * adepends mace ne all
    var d=[],c,i;
    for(i=0;i<b;i++) {
        c = ú.ce(a);
        this.appendChild(c);
        d.push(c);
    }
	ú.setrep("^"+a,d,ns);
	return d;
};

ú.fn.remove=ú.fn.detach=function(){//not actually a step
    this.parentNode.removeChild(this);
    return this;
};

ú.fn.ae = function (a,b) {// append element
    // * udepends ae ga
	var ns=ú.ag(arguments),c=(ns!==b);
	a=ú.ga(a,c);
	return (a)?this.appendChild(a):this;
};

ú.fn.mae = function (a,b) {// append elements: a=elements, b=clone, implicit ns as last
    // * udepends
	var i,ns=ú.ag(arguments),c=!(ns===b),d,e=[];//if c = true then clone
	a=ú.úin(a);
		if(Array.isArray(a)){
			for(i=0;i<a.length;i++){
				d=(c)?a[i].cloneNode():a[i];
				e.push(d);
				this.appendChild(d);
			}			
		}else{
			d=(c)?a.cloneNode():a;
			e.push(d)
			this.appendChild(d);
		}
    return e;
};

//do a test on siblings and sibling
ú.fn.sibling=function(a){
    // * adepends sibling ob
	//var b=this.parentNode.querySelector(a);
	var b=ú.fn.siblings.call(this,a);
    return (b&&b[0])?b[0]:false;
};

ú.fn.siblings=function(a){
	var ns=ú.ag(arguments),
		p=this.parentNode,b,e,c,d=[];
	if(!p)return false;
	if(a!==ns){
		e=p.querySelectorAll(a);
		b=ú.both(p.children,p.querySelectorAll(a));
	}else{
		b=p.children;
	}
	for(c in b){
		if(b[c]===this)continue;
		d[c]=b[c];
	}//unwrap html collection
    return d;
};

ú.fn.children=function(a){
	var b=this.children,c,d=[];
	for(c in b)d[c]=b[c];//unwrap html collection
	if(arguments.length==2)return d[a];
	return d;
};

ú.fn.val$=function(){
	return this.value;
};

ú.fn.í=function(a){
	var b=[],
	    c=this.querySelectorAll(a),i;
	for(i=0;i<c.length;i++){b.push(c[i]);}
	return b;
};

ú.fn.href = function (a) {// href, title, alt
    // * adepends href
	a=typeof(a)=="string"?a:"javascript:void(0)";
    this.setAttribute("href",a);
    return this;
};

ú.fn.html=function(){
	var a=[],b;
	for(b=0;b<arguments.length-1;b++)a.push(arguments[b]);
	
	if(typeof(a[0])=="function"){
		a=a[0].apply(this,a.slice(1));
	}else{
		a=a.join(",");
	}
	this.innerHTML=a;
	return this;
};
ú.fn.html$=function(){
	return this.innerHTML;
};
ú.fn.parent=ú.fn.pN$;

ú.fn.parents=function(a){
    //á.register(21,'parents root all both')
    var w=this.parentNode,e=[];
    while(w){
        e.push(w);
        w=w.parentNode;
        if(w&&w.constructor===HTMLDocument)w=undefined;
    }
    if(a){
        return ú.both(e,e[e.length-1].querySelectorAll(a));
    }else{
        return e;
    }
};

ú.fn.odd=function(ns){
	if(ns.i % 2)return this;
	return false;
};

ú.fn.even=function(b){
	if(!(b.i % 2))return this;
	return false;
};

ú.fn.eq=function(a,ns){
	if(ns.i == a-1)return this;
	return false;
};

ú.both=function(a,b){
    //ú.register(5,'both, parents')
    var i,j,c=[];
    for(i=0;i< a.length;i++){
        for(j=0;j< b.length;j++) {
            if (a[i] === b[j])c.push(b[j]);
        }
    }
    return c;
};

})(window, "ú" ,"í"); //0250 0237

ú.lib={icons:{}};

ú.ns=function(ú){

ú.fn.clear=function(){
	var ns=ú.ag(arguments);
	for(var i=0;i<arguments.length-1;i++){
		delete ns["^"+arguments[i]];
	}
};

ú.fn.embed=function(a,b){
    // * adepends embed
	var ns=ú.ag(arguments),c,i;
	if(typeof(b)=="string"){
		if(b.match(/^~/)){//the i iterator 
			ns[a]=ns[b.substr(1)];
		}else{
			ns[a]=b;	
		}
		return this;
	}
	for(i=0;i<arguments.length;i++){
		a=arguments[i];
		for(c in a){
			ns[c]=a[c];
		}
	}
    return this;
};

ú.fn.global=function(a,ns){
    // * adepends global
	if(!ns[a])ns[a]={};
	ú.fn[a+"+"]=function (b,ns){
		ns[a][b]=ú.qz.call(this,ns);
		return this;
	};
    return this;
};

ú.fn.local=function(a,o,ns){
    // * adepends global
	ns[a]=o;
	ú.fn[a+"+"]=function (b,ns){
		ns[a][b]=this;
		return this;
	};
    return this;
};

ú.fn.dump=function(a) {//if called without arguments this will dump the namespace
    // * udepends dump datao
	ú(this,"datao,%2",a);
    return this;
};

ú.fn.dump$=function(){
	// * udepends dump$
	return this["data-q³"];
};

ú.getns=function(t){
	// * udepends getns
	return t["data-q³"];
};

ú.fn.var=function (a,ns){//different for aq and pq
    // * udepends var
	ns[a]=this;
	//console.log("VAR",a,ns)
	return this;
};

};
ú.ns(ú);