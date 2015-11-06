jQuery.fn.í=function(){
	var f=this,g,h,
		b=í(f);
	if(f.ns){
		b("embed,%1",f.ns);
	}else{
		b("embed,%1",{"^":f,xs:jQuery});
	}
	g=b.apply(null,arguments);
	if(typeof(g)=="function"){
		h=$(g());
		h.ns=g(-1);
		return h;
	}else{
		return g;
	}
};

jQuery.fn.ú=function(){
	var f=this,g,h,
		b=ú(f[0]);
	if(f.ns){
		b("embed,%1",f.ns);
	}else{
		b("embed,%1",{"^":f[0],xs:jQuery});
	}
	g=b.apply(null,arguments);
	if(typeof(g)=="function"){
		h=$(g());
		h.ns=g(-1);
		return h;
	}else{
		return g;
	}
};