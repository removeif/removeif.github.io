eval(function(p,a,c,k,e,r){e=function(c){return(c<62?'':e(parseInt(c/62)))+((c=c%62)>35?String.fromCharCode(c+29):c.toString(36))};if('0'.replace(0,e)==0){while(c--)r[e(c)]=k[c];k=[function(e){return r[e]||e}];e=function(){return'([23568b-dfhj-mo-ruvx-zA-Z]|1\\w)'};c=1};while(c--)if(k[c])p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c]);return p}('5 E="1b://api.1c.com/repos/W/blog_comment/issues";5 r="46a9f3481b46ea0129d8";5 u="79c7c9cb847e141757d7864453bcbf89f0655b24";5 1d=E+"?F="+r+"&G="+u+"&t="+H I().J()+"&labels=Gitalk,";8 1e(v){$.K(1d+v,8(b){1f{$("#"+v).L(b[0].M)}1g(e){d.1h(e)}})}8 1i(m){$.X.Y=x;$.K(E+"/M?1j=created&direction=desc&1k=7&page=1&F="+r+"&G="+u,8(b){$.1l(b,8(i,3){5 2=3.y.trim();5 z=1m;2=2.A(" ","");2=2.A("&B;","");2=2.A(/(-)+>/g," to ");while(z){6(2.Z(">")!=-1){5 N=2.o(2.Z(">")+1);6(N==O||N==""){z=1m;2=2.o(0,2.Z(">")-1)}f{z=x;2=N}}f{z=x}}6(2==O||2==""){2="内容为空！"}2=2.A(/![\\s\\w\\](?:1n(s)?:\\/\\/)+[\\w.-]+(?:\\.[\\w\\.-]+)+[\\w\\-\\._~:/?#[\\]@!\\$&\'\\*\\+,;=.]+\\)/g, "[图片]");\n            // 替换网址\n            2 = 2.A(/(?:1n(s)?:\\/\\/)+[\\w.-]+(?:\\.[\\w\\.-]+)+[\\w\\-\\._~:/?#[\\]@!\\$&\'\\*\\+,;=.]+/g,"[网址]");6(2.j>50){2=2.o(0,60);2+="..."}5 11="";$.X.Y=x;$.K(3.issue_url+"?F="+r+"&G="+u,8(b){11=b.y.o(0,b.y.12("\\n")-1)});5 h=3["13"].login;6(h!=O&&h==\'W\'){h=h+\'[博主]\'}m.push({"14":2,"P":3.created_at,"h":h,"1p":3["13"].html_url,"1q":3["13"].avatar_url,"1r":11})})})}8 1s(){5 p="";5 Q="";6($("#1t").j>0){5 R=$("#1t");$.X.Y=x;$.K(E+"?1k=10&1j=M&F="+r+"&G="+u,8(b){$.1l(b,8(i,3){6(i>=0&i<4){p="c=\\"3 level3\\""}f 6(i>=4&i<7){p="c=\\"3 level2\\""}f 6(i>=7&i<9){p="c=\\"3 level1\\""}f{p="c=\\"3 level0\\""}Q+="<a 15 =\\""+3.y.o(0,3.y.12("\\n")-1)+"\\"16=\\"17\\""+p+">"+3.1u.o(0,3.1u.12("-")-1)+"&B;🔥"+(3.M*101)+"</a>&B;&B;"});R.L("");6(Q==""){R.1v("无数据记录，刷新试试！")}f{R.1v(Q)}})}}$(1w).ready(setTimeout(8(){5 18="commentKey";5 k={};5 l=1x.getItem(18);5 S={};6(l!=\'\'||l!=1y){1f{S=1z.parse(l);k=S["T"]}1g(e){l=\'\';d.1h(e)}}6(l==\'\'||l==1y||H I().J()-S["P"]>60*1A*1){d.C("req T...");5 U={};5 m=[];1i(m);U["P"]=H I().J();U["T"]=m;k=m;6(k.j>0){1x.setItem(18,1z.stringify(U))}}f{d.C("load cache T...")}6(k.j>0){5 V="<q c=\'19-14\'>";1B(5 i=0;i<k.j;i++){5 3=k[i];5 2=3.14;V+="<q c=\'card-19-3\'><a 15=\\""+3.1p+"\\"16=\\"17\\"><img c=\'ava\' src=\'"+3.1q+"\'><q c=\\"3\\">"+3.h+"</a>&B;发表于"+getDateDiff(H I(3.P).J())+"<br><a 15 =\\""+3.1r+\'#19-container\'+"\\"16=\\"17\\">"+2+"</a></q></q><br>"}V+="</q>";$("#1D").L(V)}f{$("#1D").L("无数据记录，刷新试试！")}1s();5 D=1w.getElementsByClassName(\'display-none-c\');6(D!=O&&D.j>0){1B(i=0;i<D.j;i++){5 v=D[i].innerText;1e(v)}}d.clear();d.C("~~~~1a 1a 1a 欢迎光临~~~");d.C("~~~~唉，控制台太多报错了，呜呜呜呜~~~");d.C("~~~~记得有时间多来看看哦，1b://W.1c.io/")},1A));',[],102,'||contentStr|item||var|if||function|||result|class|console||else||userName||length|COMMENT_ARR|COMMENT_CACHE|resultArr||substr|classDiv|div|clientId|||clientSecret|id||false|body|isSubStr|replace|nbsp|log|gitalkIdsArr|repoIssuesUrl|client_id|client_secret|new|Date|getTime|getJSON|html|comments|temp|undefined|date|hotContent|hotDiv|COMMENT|data|resultMap|htmlContentWidget|removeif|ajaxSettings|async|lastIndexOf||itemUrl|indexOf|user|content|href|target|_blank|COMMENT_CACHE_KEY|comment|xiu|https|github|reqCommentCountUrl|writeHtmlCommentCountValueById|try|catch|error|loadCommentData|sort|per_page|each|true|http||userUrl|userAvatar|url|loadIndexHotData|index_hot_div|title|append|document|localStorage|null|JSON|1000|for||body_hot_comment'.split('|'),0,{}))