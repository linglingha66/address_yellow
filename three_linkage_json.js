var tit = getNode(getId("tit").childNodes);
var wrap = getId("wrap");
var pic = getId("pic");
var text_top = getId("text_top");
var tab_con = getNode(getId("tab_con").childNodes);
var con0 = getId("con0");
var con1 = getId("con1");
var con2 = getId("con2");
function nodeValue(dom){
	dom1 = dom.childNodes[0].childNodes[0].nodeValue;
	return dom1;
}
window.onload = function(){
	//ajax部分
	var xhr = new XMLHttpRequest();
	//如何处理服务器的返回数据
	xhr.open("get","address.json",false);//同步的方式，打算向address.json发送'get'类型的请求
	xhr.send(null);//发送请求
	if((xhr.status >= 200&&xhr.status<300) || xhr.status == 304){//响应成功
		var data = JSON.parse(xhr.responseText);//解码，data为包含所有省市区名称的数组
		// console.log(xhr.responseText);//响应的结果-类型是文本,即address.json文件的全部内容
	}else{//响应失败
		console.log("对不起，响应失败！");
	}
	

	//tab卡功能，来回切换页面（利用的Tab_self_json.js中的函数）
	tab(tit,tab_con);
	//默认显示首页
	tit[0].setAttribute("class","hover");
	/*此函数是创建<ul id="con_dom" class="con_dom" >
					 <li class=li_class>
						<a href="#none">此处为从json库中获得的省/市/区的名称</a>
					 </li>
				 </ul>*/
	function tagBuild(num,con_dom,li_class){
		var a = document.createElement("a");
		var txt = document.createTextNode(data[num].item_name);
		var li = document.createElement("li");
		a.appendChild(txt);
		li.appendChild(a);
		con_dom.appendChild(li);
		li.setAttribute("class",li_class);
		a.setAttribute("href","#none");
	}
	//此函数用于清空con_dom下的所有节点
	function clearDom(con_dom){
		if(con_dom.childNodes[0]){
				for(var h=con_dom.childNodes.length-1;h>-1;h--){
				con_dom.removeChild(con_dom.childNodes[h]);
				} 
			}
	}
	//隐藏所有标题和内容,显示想显示的内容
	function hideTC(tit_dom,con_dom,i){
		for(var j =0;j<con_dom.length;j++){
				hide(con_dom[j]);
				tit_dom[j].setAttribute("class","");
			}
		show(con_dom[i]);
		tit_dom[i].setAttribute("class","hover");
	}
	//获取省
	for(var i=0;i<35;i++){
		tagBuild(i,con0,"li_con0");
	}
	//注意此句的位置，在此处得到con0的全部元素节点
	var con0_child = getNode(getId("con0").childNodes);
	//获取市
	for(var i=0;i<con0_child.length;i++){
		con0_child[i].onclick = function(){
			//先清空con1下的所有节点，便于每次切换省份时可实时获取相对应的市，不出现附加情况
			clearDom(con1);
			//获取相应省份的城市
			var count = getIndex(this);
			for(var j=0;j<35;j++){
				//判断如果（json数组中的有省份名字 == 鼠标点击的省份名称），
				//则判断如果市代码的前两位和省代码的前两位相等，就表示该市是属于该省份的，
				//于是就把这些市的名字存入a标签，进而存入con1的内容中去
				if(data[j].item_name == nodeValue(con0_child[count])){
					for(var k=35;k<375;k++){
						if(parseInt(data[k].item_code/10000) == (data[j].item_code/10000)){
							tagBuild(k,con1,"li_con1");
						}
					}
				}
			}
	//联动效果：把标题1的文字换为所点击的省份名，标题2的文字立即显示为“请选择”，标题3先暂时隐藏
			tit[0].childNodes[1].innerHTML = con0_child[count].childNodes[0].childNodes[0].nodeValue;
			tit[1].childNodes[1].innerHTML = "请选择";
			tit[2].setAttribute("style","display: none;");
			//先把所有内容和标题隐藏,再显示内容1的内容，并将标题1的样式设为“hover”
			hideTC(tit,tab_con,1);

			var con1_child = getNode(getId("con1").childNodes);	
			//获取区（思路同上）
			for(var m=0;m<con1_child.length;m++){
				con1_child[m].onclick = function(){
				clearDom(con2);
				//获取相应城市的区
				var count = getIndex(this);
				for(var j=35;j<375;j++){
					if(data[j].item_name == nodeValue(con1_child[count])){
						for(var k=375;k<3254;k++){
							if(parseInt(data[k].item_code/100) == (data[j].item_code/100)){
								tagBuild(k,con2,"li_con2");
							}
						}
					}
				}
				//先清空标题1和标题2的style属性内容，为了将标题1和2显示
				tit[1].setAttribute("style","");
				tit[2].setAttribute("style","");
				//联动效果
				tit[1].childNodes[1].innerHTML = con1_child[count].childNodes[0].childNodes[0].nodeValue;
				tit[2].childNodes[1].innerHTML = "请选择";
				hideTC(tit,tab_con,2);

				var con2_child = getNode(getId("con2").childNodes);	
				//选择区
				for(var i=0;i<con2_child.length;i++){
					con2_child[i].onclick = function(){
					var count = getIndex(this);
					tit[2].childNodes[1].innerHTML = con2_child[count].childNodes[0].childNodes[0].nodeValue;
					hideTC(tit,tab_con,2);
					var name1 = tit[0].childNodes[1].childNodes[0].nodeValue;
					var name2 = tit[1].childNodes[1].childNodes[0].nodeValue;
					var name3 = tit[2].childNodes[1].childNodes[0].nodeValue;
					//选完省市区后，头栏框内的内容随之改变
					text_top.childNodes[0].nodeValue = name1+name2+name3;
					//选址栏自动收起
					wrap.setAttribute("style","none");
					}	
				}
				}
			}
		}
	}	
}
