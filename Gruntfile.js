module.exports = function(grunt) {
	var skip;
    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        concat: {
            jq: {
                options: {
                    //separator: ';',
                    process:function(src,filepath) {
                        var io = 0;
                        var dirnumber=filepath.split("/")[0].replace("aq","");
                        //grunt.log.writeln([src]);
						//grunt.log.writeln(["----------------------------"]);
						var ssrc=src.split("\n");
						var nsrc=[];
						for(var i=0;i<ssrc.length;i++){
							if(ssrc[i].indexOf("validation block start")!=-1)skip=true;
							if(skip){
								grunt.log.writeln(["skipping"]);
							}else{
								if(ssrc[i].indexOf("etrap")==-1){//cut out redundant errortapping
									nsrc.push(ssrc[i]);
								}else{
									grunt.log.writeln(["removing etrap"]);
								}
							}
							if(ssrc[i].indexOf("validation block end")!=-1)skip=false;
						}
						src=nsrc.join("\n");
						return src;

                        while (io != -1) {
                            io=src.indexOf("// * adepends");

                            if (io != -1) {
                                var eol=src.substr(io).indexOf("\n");
                                //we have processing to do
                                var ioeol=src.substr(io,eol-1).replace("// * adepends","").substr(1);
                                src=src.substr(0,io)+"$.register("+dirnumber+",'"+ioeol+"')"+src.substr(io+eol);
                            }

                        }
                        io=0;
                        while (io != -1) {
                            io=src.indexOf("// es adepends");
                            if (io != -1) {
                                var eol=src.substr(io).indexOf("\n");
                                //we have processing to do
                                var ioeol=src.substr(io,eol-1).replace("// es adepends","").substr(1);

                                src=src.substr(0,io)+"$.register.es(a)"+src.substr(io+eol);
                            }
                        }

                        return src;
                    }
                },
				src: ['lib/quark.so.js','lib/jq.js'],
				dest: 'lib.base/jquark.js'
            },
            q: {
                options: {
                    //separator: ';',
                    process:function(src,filepath) {
                        var io = 0;
                        var dirnumber=filepath.split("/")[0].replace("aq","");
                        //grunt.log.writeln([src]);
						//grunt.log.writeln(["----------------------------"]);
						var ssrc=src.split("\n");
						var nsrc=[];
						for(var i=0;i<ssrc.length;i++){
							if(ssrc[i].indexOf("validation block start")!=-1)skip=true;
							if(skip){
								grunt.log.writeln(["skipping"]);
							}else{
								if(ssrc[i].indexOf("etrap")==-1){//cut out redundant errortapping
									nsrc.push(ssrc[i]);
								}else{
									grunt.log.writeln(["removing etrap"]);
								}
							}
							if(ssrc[i].indexOf("validation block end")!=-1)skip=false;
						}
						src=nsrc.join("\n");
						return src;

                        while (io != -1) {
                            io=src.indexOf("// * adepends");

                            if (io != -1) {
                                var eol=src.substr(io).indexOf("\n");
                                //we have processing to do
                                var ioeol=src.substr(io,eol-1).replace("// * adepends","").substr(1);
                                src=src.substr(0,io)+"$.register("+dirnumber+",'"+ioeol+"')"+src.substr(io+eol);
                            }

                        }
                        io=0;
                        while (io != -1) {
                            io=src.indexOf("// es adepends");
                            if (io != -1) {
                                var eol=src.substr(io).indexOf("\n");
                                //we have processing to do
                                var ioeol=src.substr(io,eol-1).replace("// es adepends","").substr(1);

                                src=src.substr(0,io)+"$.register.es(a)"+src.substr(io+eol);
                            }
                        }

                        return src;
                    }
                },
				src: ['lib/quark.so.js','lib/utils.js'],
				dest: 'lib.base/quark.js'
            }
        },
        uglify: {
                options: {
                    //banner: '/*! zzzz<%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n',
                    compress: {
                        drop_console: true
                    },
                    sourceMap: false
                },
                jq: {
					//src: ['lib/quark.so.js','lib/jq.js'],
                    src: ['lib.base/jquark.js'],
                    dest: 'jquark.js'
                },
                q: {
					//src: ['lib/quark.so.js','lib/jq.js'],
                    src: ['lib.base/quark.js'],
                    dest: 'quark.js'
                }
        },
		jshint: {
			src:['lib/quark.so.js','lib/jq.js']
			//src: 'lib.base/quark.js'

			}
    });


    // Load the plugin that provides the "uglify" task.
    grunt.loadNpmTasks('grunt-contrib-jshint');

    grunt.loadNpmTasks('grunt-contrib-uglify');

    grunt.loadNpmTasks('grunt-contrib-concat');

    //grunt.loadNpmTasks('grunt-groundskeeper');

    //grunt.loadNpmTasks('grunt-serve');

    // Default task(s).
    grunt.registerTask('default', ['concat','uglify','jshint']);
	
	//grunt.registerTask('default', ['jshint']);



};