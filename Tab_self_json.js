/*
  2016.07.08 ver.01
  本插件用于Tab卡功能。
  要求：1、有标题
        2、有内容
*/
//获取Id
function getId(id_dom){
	return document.getElementById(id_dom);
}
//把符合条件的元素节点放在一个数组里
function getNode(dom){
	var arr = [];
	for(var i=0;i<dom.length;i++){
		if(dom[i].nodeType == 1){
			arr.push(dom[i]);
		}
	}
	return arr;
}

//返回点击的位置
function getIndex(obj){
	var that = obj,count=0;//例：标题3
	while(that.previousSibling)//判断是否有标题2：即判断that前是否有别的元素
	{
		if(that.previousSibling.nodeType == 1){
			count++;
		}
		that = that.previousSibling;//把标题2给参照点	
	}
	return count;//此时返回2
}
//隐藏内容
function hide(dom){
	return dom.style.display="none";
}
//显示内容
function show(dom){
	return dom.style.display="block";
}
pic.onclick = function(){
	wrap.setAttribute("style","display: block;")
}
//点击显示相应标题下内容，隐藏其他标题下内容
function tab(li_dom,con_dom){
	for(var i=0;i<li_dom.length;i++){
		li_dom[i].onclick = function(){
			var count = getIndex(this);
			for(var j =0;j<con_dom.length;j++){
				hide(con_dom[j]);
				li_dom[j].setAttribute("class","");
			}
			show(con_dom[count]);
			li_dom[count].setAttribute("class","hover");
		}
	}	
}

