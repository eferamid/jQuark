ú.utils=function(ú){
	//ajax plugin -- do the lot
	ú.ajax = function(s) {
		//ú.register(5,'ajax')
		if(!s.type)s.type="GET";
		var xhr = new XMLHttpRequest();
		if ("withCredentials" in xhr) {
			// XHR for Chrome/Firefox/Opera/Safari.
		} else if (typeof XDomainRequest != "undefined") {
			// XDomainRequest for IE.
			xhr = new XDomainRequest();
		} else {
			// CORS not supported.
			alert('CORS not supported');
			return;
		}
		xhr.open(s.type, s.url, s.async);

		// Response handlers.
		xhr.onload = function() {
			var f=ú.ajax[s.contentType];
			if(f)
				s.success(f(xhr.responseText,s.contentType));
			else
				s.success(xhr.responseText);
		};

		xhr.onerror = function(e) {
			s.error(e);
		};

		xhr.send(s.data);
	};
	ú.ajax["application/xml"]=ú.ajax["text/xml"]=function(rt,ct){
		//ú.register(5,'ajaxxml ajax')
		return new DOMParser().parseFromString(rt,ct);
	};
	ú.ajax["application/json"]=ú.ajax["text/json"]=function(rt){
		//ú.register(5,'ajaxjson ajax')
		return JSON.parse(rt);
	};
	ú.get=function(a,b,c,d){
		//ú.register(5,'get ajax')
		if($.p.i(a)==="O"){
			ú.ajax(a);
		}
	};

	/*
	 * Created by julian on 07/04/2015.
	 */
	ú.in=function(a,b){
		// * adepends in
		var i;
		for(i=0;i< a.length;i++){
			if(a[i]===b)return true;
		}
		return false;
	};
	
/**
 * Created by julian on 29/03/2015.
 */
ú.listener=function(){
	//ú.register(5,'listener')
    var i=0, //incrementor
        e,//event
        f,//function iterator
        F,//function instance
        g,//group
        h,//event context
        li,//li=sidecar inner
        n,//function name
        z=function(h,F,f,n,a){//final apply - either singly or loop through group

            if((n && n == f)||(!n && !F[f].p)) {
                //it's a named function and it matches or its not named and not private
                if (F[f].d--===0) {
                    console.log("the listener finally functionality needs testing");
                    //time is up exec the f=finally function if it exists
                    if(F[f].f)F[f].f.apply(h, arguments);
                    delete F[f];
                    return;
                }
                F[f].apply(h, a);
            }
        },
        l=function(a){//sidecar outer
            if(!li)li = a;
            //main body follows
            e=arguments[0];
            for (f in li.fn) {
                h=this;
                if(e){
                    n=e.name;
                    g=e.group;
                    if(e.context)h=e.context;
                    if(n||g||h){
                        // * adepends listener
                    }
                }else{
                    n=g=h=undefined;
                }
                if(g){
                    if(f==g){
                        //console.log("GROUP")
                        for(var ff in li.fn[f]){
                            z(h,li.fn[f],ff,n,arguments);
                        }
                    }
                }else{
                    //console.log("SINGLE")
                    z(h,li.fn,f,n,arguments);
                }
            }
        };
    l(l);//first call - set the inner reference
    l.fn={};
    l.add=function(f,d,p,g,fi){//f=function,d=decrementor,p=private,g=group,fi=finally(function)
        if(!d)d=-1;f.d=d;
        if(p)f.p=p;
        if(fi)f.f=fi;
        n=(f.name)?f.name:"anon"+i++;
        if(g){
            if(!l.fn[g])l.fn[g]={};
            l.fn[g][n]=f;
        }else{
            l.fn[n]=f;
        }
    };
	l.remove=function(f){
		if(typeof(f)=="string"){
			delete l.fn[f];
		}
	};
    l.clear=function(){
        for(f in l.fn)delete l.fn[f];
    };
    return l;

};

ú.extend = function() {
	//ú.register(5,'extend')
    var p = function(d, s) {//destination source
        for (var k in s) {
            if (hasOwnProperty.call(s, k)) {
                if(d[k]&&d[k].constructor==Object&&s[k].constructor==Object){
                    p(d[k],s[k]);
                }else if(!d[k]&&s[k]&&s[k].constructor==Object){
                    d[k]={};
                    p(d[k],s[k]);
                }else if(s[k]!="undefined"){
                    d[k] = s[k];
                }
            }
        }
        return d;
    },
    r = arguments[0],i;
    for(i=1; i<arguments.length; i++) {
        r = p(r, arguments[i]);
    }
    return r;
};

};
ú.utils(ú);