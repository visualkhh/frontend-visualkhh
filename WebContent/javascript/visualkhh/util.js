
/*
*	@constructor visualkhh@gmail.com, twitter : @visualkhh, facebook : http://www.facebook.com/visualkhh
*/


function ObjectK (){};
ObjectK.prototype = new Object();//상속
ObjectK.prototype.keys = function(type){
	var values = new Array();
	for(var key in this){
		if(!type || String((typeof this[key])).toUpperCase() == String(type).toUpperCase()){
			values.push(key);
		}
	}
	return values;
}
ObjectK.prototype.values = function(type){
	var values = new Array();
	for(var key in this){
		if(!type || String((typeof this[key])).toUpperCase() == String(type).toUpperCase()){
			values.push(this[key]);
		}
	}
	return values;
}
ObjectK.prototype.types = function(type){
	var values = new Array();
	for(var key in this){
		if(!type || String((typeof this[key])).toUpperCase() == String(type).toUpperCase()){
			values.push(typeof this[key]);
		}
	}
	return values;
}
ObjectK.prototype.keyValue = function(type){
	var values = new Array();
	for(var key in this){
		if(!type || String((typeof this[key])).toUpperCase() == String(type).toUpperCase()){
			values.push(
						{
							"key":key,
							"value":this[key]
						}
			);
		}
	}
	return values;
}
ObjectK.prototype.toJson = function(type){
	var jsonString="{";
	for(var key in this){
		if(!type || String((typeof this[key])).toUpperCase() == String(type).toUpperCase()){
			if(jsonString.length>1)
			jsonString+=",";
			var isString = (String((typeof this[key])).toUpperCase()=="STRING");
			jsonString+=("\""+key+ "\":" + (isString?"\"":"") + new Object(this[key]) + (isString?"\"":""));
		}
	}
	return jsonString+="}";
	//return JSON.stringify(this);
}
ObjectK.prototype.clone = function(){
	var return_obj=new Object();
    for (var property in this) {
    	return_obj[property] = this[property]; 
    }
	return  return_obj;
}

function Stack (){};
Stack.prototype = new Object();//상속
Stack.prototype.array = new Array();
Stack.prototype.pop = function(){
	return this.array.pop();
}
Stack.prototype.push = function(item){
	return this.array.push(item);
}
Stack.prototype.size = function(){
	return this.array.length;
}



function StringUtil(){};
StringUtil.prototype = new Object();

/**
 * inputStr 의 내용중    검색대상 StringArray(matchingSrtingArr) 가 매칭되는것이 있으면 매칭된 String의 Array  리턴 
 * @param {String} inputStr,  {StringArray} matchingSrtingArr
 * @returns {Array}.
*/  

StringUtil.isMatching=function(input_s, matchingSrting_arr_s){
	var result  = new Array();
	var arrindex = 0 ;
	if(JavaScriptUtil.isArray(matchingSrting_arr_s)){
		for(var i=0; i <matchingSrting_arr_s.length;i++){
			var index = input_s.indexOf(matchingSrting_arr_s[i]);
			if(index>=0){
				result[arrindex]=matchingSrting_arr_s[i];
				arrindex++;
			}
		}
	}else if(JavaScriptUtil.isString(matchingSrting_arr_s)){
		var index = input_s.indexOf(matchingSrting_arr_s);
		if(index>=0){
			result[arrindex]=matchingSrting_arr_s;
			arrindex++;
		}
	}
	//result.push();
	//result.pop();
	
	return result;
};

/*
var input = "'30' -> decimal: %20d / bin = %b / oct = %o / hex = %x / HEX = %X";
var output = format(input, 30, 30, 30, 30, 30);
var msg = "NUMBERS TEST (1/2)\n";
   msg += "---------------------------\n"
   msg += "Input...... " + input + "\n";
   msg += "Output.... " + output
alert(msg);
 */
//finger
StringUtil.format1= (function() {
	function get_type(variable) {
		return Object.prototype.toString.call(variable).slice(8, -1).toLowerCase();
	}
	function str_repeat(input, multiplier) {
		for (var output = []; multiplier > 0; output[--multiplier] = input) {/* do nothing */}
		return output.join('');
	}

	var str_format = function() {
		if (!str_format.cache.hasOwnProperty(arguments[0])) {
			str_format.cache[arguments[0]] = str_format.parse(arguments[0]);
		}
		return str_format.format.call(null, str_format.cache[arguments[0]], arguments);
	};

	str_format.format = function(parse_tree, argv) {
		var cursor = 1, tree_length = parse_tree.length, node_type = '', arg, output = [], i, k, match, pad, pad_character, pad_length;
		for (i = 0; i < tree_length; i++) {
			node_type = get_type(parse_tree[i]);
			if (node_type === 'string') {
				output.push(parse_tree[i]);
			}
			else if (node_type === 'array') {
				match = parse_tree[i]; // convenience purposes only
				if (match[2]) { // keyword argument
					arg = argv[cursor];
					for (k = 0; k < match[2].length; k++) {
						if (!arg.hasOwnProperty(match[2][k])) {
							throw(sprintf('[sprintf] property "%s" does not exist', match[2][k]));
						}
						arg = arg[match[2][k]];
					}
				}
				else if (match[1]) { // positional argument (explicit)
					arg = argv[match[1]];
				}
				else { // positional argument (implicit)
					arg = argv[cursor++];
				}

				if (/[^s]/.test(match[8]) && (get_type(arg) != 'number')) {
					throw(sprintf('[sprintf] expecting number but found %s', get_type(arg)));
				}
				switch (match[8]) {
					case 'b': arg = arg.toString(2); break;
					case 'c': arg = String.fromCharCode(arg); break;
					case 'd': arg = parseInt(arg, 10); break;
					case 'e': arg = match[7] ? arg.toExponential(match[7]) : arg.toExponential(); break;
					case 'f': arg = match[7] ? parseFloat(arg).toFixed(match[7]) : parseFloat(arg); break;
					case 'o': arg = arg.toString(8); break;
					case 's': arg = ((arg = String(arg)) && match[7] ? arg.substring(0, match[7]) : arg); break;
					case 'u': arg = Math.abs(arg); break;
					case 'x': arg = arg.toString(16); break;
					case 'X': arg = arg.toString(16).toUpperCase(); break;
				}
				arg = (/[def]/.test(match[8]) && match[3] && arg >= 0 ? '+'+ arg : arg);
				pad_character = match[4] ? match[4] == '0' ? '0' : match[4].charAt(1) : ' ';
				pad_length = match[6] - String(arg).length;
				pad = match[6] ? str_repeat(pad_character, pad_length) : '';
				output.push(match[5] ? arg + pad : pad + arg);
			}
		}
		return output.join('');
	};

	str_format.cache = {};

	str_format.parse = function(fmt) {
		var _fmt = fmt, match = [], parse_tree = [], arg_names = 0;
		while (_fmt) {
			if ((match = /^[^\x25]+/.exec(_fmt)) !== null) {
				parse_tree.push(match[0]);
			}
			else if ((match = /^\x25{2}/.exec(_fmt)) !== null) {
				parse_tree.push('%');
			}
			else if ((match = /^\x25(?:([1-9]\d*)\$|\(([^\)]+)\))?(\+)?(0|'[^$])?(-)?(\d+)?(?:\.(\d+))?([b-fosuxX])/.exec(_fmt)) !== null) {
				if (match[2]) {
					arg_names |= 1;
					var field_list = [], replacement_field = match[2], field_match = [];
					if ((field_match = /^([a-z_][a-z_\d]*)/i.exec(replacement_field)) !== null) {
						field_list.push(field_match[1]);
						while ((replacement_field = replacement_field.substring(field_match[0].length)) !== '') {
							if ((field_match = /^\.([a-z_][a-z_\d]*)/i.exec(replacement_field)) !== null) {
								field_list.push(field_match[1]);
							}
							else if ((field_match = /^\[(\d+)\]/.exec(replacement_field)) !== null) {
								field_list.push(field_match[1]);
							}
							else {
								throw('[sprintf] huh?');
							}
						}
					}
					else {
						throw('[sprintf] huh?');
					}
					match[2] = field_list;
				}
				else {
					arg_names |= 2;
				}
				if (arg_names === 3) {
					throw('[sprintf] mixing positional and named placeholders is not (yet) supported');
				}
				parse_tree.push(match);
			}
			else {
				throw('[sprintf] huh?');
			}
			_fmt = _fmt.substring(match[0].length);
		}
		return parse_tree;
	};

	return str_format;
})();



StringUtil.format2=function()
{
	if (!arguments || arguments.length < 1 || !RegExp)
	{
		return;
	}
	var str = arguments[0];
	var re = /([^%]*)%('.|0|\x20)?(-)?(\d+)?(\.\d+)?(%|b|c|d|u|f|o|s|x|X)(.*)/;
	var a = b = [], numSubstitutions = 0, numMatches = 0;
	while (a = re.exec(str))
	{
		var leftpart = a[1], pPad = a[2], pJustify = a[3], pMinLength = a[4];
		var pPrecision = a[5], pType = a[6], rightPart = a[7];
		
		//alert(a + '\n' + [a[0], leftpart, pPad, pJustify, pMinLength, pPrecision);

		numMatches++;
		if (pType == '%')
		{
			subst = '%';
		}else
		{
			numSubstitutions++;
			if (numSubstitutions >= arguments.length)
			{
				alert('Error! Not enough function arguments (' + (arguments.length - 1) + ', excluding the string)\nfor the number of substitution parameters in string (' + numSubstitutions + ' so far).');
			}
			var param = arguments[numSubstitutions];
			var pad = '';
			       if (pPad && pPad.substr(0,1) == "'") pad = leftpart.substr(1,1);
			  else if (pPad) pad = pPad;
			var justifyRight = true;
			       if (pJustify && pJustify === "-") justifyRight = false;
			var minLength = -1;
			       if (pMinLength) minLength = parseInt(pMinLength);
			var precision = -1;
			       if (pPrecision && pType == 'f') precision = parseInt(pPrecision.substring(1));
			var subst = param;
			       if (pType == 'b') subst = parseInt(param).toString(2);
			  else if (pType == 'c') subst = String.fromCharCode(parseInt(param));
			  else if (pType == 'd') subst = parseInt(param) ? parseInt(param) : 0;
			  else if (pType == 'u') subst = Math.abs(param);
			  else if (pType == 'f') subst = (precision > -1) ? Math.round(parseFloat(param) * Math.pow(10, precision)) / Math.pow(10, precision): parseFloat(param);
			  else if (pType == 'o') subst = parseInt(param).toString(8);
			  else if (pType == 's') subst = param;
			  else if (pType == 'x') subst = ('' + parseInt(param).toString(16)).toLowerCase();
			  else if (pType == 'X') subst = ('' + parseInt(param).toString(16)).toUpperCase();
		}
		str = leftpart + subst + rightPart;
	}
	return str;
};

StringUtil.rsubString = function(data_s,blen_n){
	return data_s.substring(data_s.length-blen_n,data_s.length);
};
StringUtil.lsubString = function(data_s,alen_n){
	return data_s.substring(0,alen_n);
};

StringUtil.lpad=function(fill_s,len_n,full_s){
	while (len_n > full_s.length) {
		full_s=fill_s+full_s;
	};
	return this.rsubString(full_s,len_n);
};
StringUtil.rpad=function(fill_s,len_n,full_s){
	while (len_n > full_s.length) {
		full_s+=fill_s;
	};
	return this.lsubString(full_s,len_n);
};

StringUtil.lappend=function(count_n,input_s){
	var s = '', i = 0; 
	while (i++ < count_n){ 
		s += input_s; 
	}
	return s;
};
StringUtil.rAppend=function(count_n,input_s){
	var s = '', i = 0; 
	while (i++ < count_n){ 
		s = input_s+s; 
	}
	return s;
};
StringUtil.trim=function(input_s){
	//return input_s.replace(/(^\s*)|(\s*$)/g, "");
	return input_s.replace(/(^\s*)|(\s*$)/gi, "");
};
StringUtil.ltrim=function(input_s){
	return input_s.replace(/(^\s*)/, "");
};
StringUtil.rtrim=function(input_s){
	return input_s.replace(/(\s*$)/, "");
};
StringUtil.nvl=function(input_s,replace_s){
    if (input_s == null)
        return replace_s != null ? replace_s : "";
    else
        return input_s;
};
StringUtil.deleteSpace=function(input_s){
	return input_s.replace(/\s/g,'');
};
StringUtil.deleteChar=function(input_s,del_s){
	return StringUtil.replaceAll(input_s,del_s,'');
};
StringUtil.replaceAll=function(msg_s,before_s,after_s){
	var regexp = new RegExp(before_s,"gi");
	return msg_s.replace(regexp,after_s);
};

StringUtil.isEmpty =function(input_s) {
	
    if ( !input_s || input_s == null || input_s.replace(/ /gi,"") == "") {
        return true;
    }
    return false;
};

StringUtil.isInSpecialChar = function(input_s) {
/*    var deny_pattern = /[^(-Ra-zA-Z0-9-R\s-R\u3131-\u314e\u314f-\u3163\uac00-\ud7a3)]/;
    if(deny_pattern.test(input_s))
    {
        return true;
    }
    return false;
    */
	
	   re = /[~!@\#$%^&*\()\=+_']/gi;
       if(re.test(input_s)){
    	   return true;;
       }
       return false;


};

StringUtil.isOnlySpecialChar = function(input_s) {
	  var deny_pattern = /[^~!@\#$%^&*\()\=+_']+/g;
	  if(deny_pattern.test(input_s))
	    {
	        return false;
	    }
	    return true;
};
StringUtil.removeComma=function(input_s) {
    return input_s.replace(/,/gi,"");
};
//금액 입력시 "," 자동 입력
StringUtil.addComma = function( number_s  ){
	return this.raddGroupChar(number_s,3,",");
};
StringUtil.raddGroupChar = function( number_s , jumpsize_n,addchar_s ){
	
	/*
	 var reg = /(^[+-]?\d+)(\d{3})/;   // 정규식
	  n += '';                          // 숫자를 문자열로 변환

	  while (reg.test(n))
	    n = n.replace(reg, '$1' + ',' + '$2');

	  return n;
	  */
/*	if(!jumpsize_n){
		jumpsize_n=3;
	}
	*/
	
	//number_s = this.delComma( number_s );
	number_s = StringUtil.deleteChar(number_s, addchar_s);
    var src;
    var i; 
    var	factor; 
    var	su; 

    factor = number_s.length % jumpsize_n; 
    su     = (number_s.length - factor) / jumpsize_n;
    src    =  number_s.substring(0,factor);

    for(i=0; i < su ; i++)
    {
		if((factor == 0) && (i == 0))       // "XXX" 인경우
		{
			src += number_s.substring(factor+(jumpsize_n*i), factor+jumpsize_n+(jumpsize_n*i));  
		}
	    else
		{
		    src += addchar_s  ;
			src += number_s.substring(factor+(jumpsize_n*i), factor+3+(jumpsize_n*i));  
		}
    }
    number_s = src; 

    return number_s; 
};



/*
function isNumber(input) {
    var chars = "0123456789";
    return isCharsOnly(input,chars);
}*/
StringUtil.isInNumber =function(string_s) {
    var deny_pattern = /[0-9]/;
    if(deny_pattern.test(string_s))
    {
        return true;
    }
    return false;
};
StringUtil.isOnlyNumber =function(string_s) {
  /*  var deny_pattern = /[^(0-9)]/gi;
    if(deny_pattern.test(string_s))
    {
        return false;
    }
    return true;
    */
	  var deny_pattern = /[^\d]+/g;
	    if(deny_pattern.test(string_s))
	    {
	        return false;
	    }
	    return true;
};
StringUtil.getOnlyNumber=function(msg_s){
	return msg_s.replace(/[^\d]+/g, ''); 
};
StringUtil.getOnlyString=function(msg_s){
	return msg_s.replace(/[\d]+/g, ''); 
};


StringUtil.isInAlphabet=function(input_s) {
	var pattern = /[a-zA-Z]/g;
	return (pattern.test(input_s)) ? true: false ;
};
StringUtil.isOnlyAlphabet=function(input_s) {
    var pattern = /^[a-zA-Z]+$/;
    return (pattern.test(input_s)) ? true : false;
};

StringUtil.isInAlphabetUpper=function (input_s) {
    var pattern = /[A-Z]/g;
    return (pattern.test(input_s)) ? true : false;
};
StringUtil.isOnlyAlphabetUpper=function (input_s) {
    var pattern = /^[A-Z]+$/;
    return (pattern.test(input_s)) ? true : false;
};

StringUtil.isInAlphabetLower = function(input_s) {
	var pattern = /[a-z]/g;
	return (pattern.test(input_s)) ? true : false;
};
StringUtil.isOnlyAlphabetLower = function(input_s) {
    var pattern = /^[a-z]+$/;
    return (pattern.test(input_s)) ? true : false;
};


//자바스크립트 한글 깨지는 게있어서 한글로 정규식은 못만듬  그래서 유니코드로 
StringUtil.isInHangeul = function(input_s) {
	//var pattern= /[ㄱ-ㅎ|ㅏ-ㅣ|가-힝]/;
	var pattern = /[\u3131-\u314e|\u314f-\u3163|\uac00-\ud7a3]/g;
	return (pattern.test(input_s)) ? true : false;
    //var pattern= /[ㄱ-ㅎ|ㅏ-ㅣ|가-힝]/;
    //return (pattern.test(input_s)) ? true : false;
  /*
    var tempStr = "";
    var temp = 0;
    var onechar;
    tempStr = new String(input_s);
    temp = tempStr.length;
    for(var k=0; k<temp;k++){
        onechar = tempStr.charAt(k);
        if(escape(onechar).length > 4){
           return true;
        }
    }
    return false;
    */
    //if((event.keyCode < 12592) || (event.keyCode > 12687))
    //event.returnValue = false
};
StringUtil.isOnlyHangeul=function(input_s) {
   // var pattern= /[ㄱ-ㅎㅏ-ㅣ가-힝]+/g;
   // return (pattern.test(input_s)) ? true : false;
	var pattern = /^[\u3131-\u314e|\u314f-\u3163|\uac00-\ud7a3]*$/g;
	return (pattern.test(input_s)) ? true : false;
};
//var chars = "abcdefghijklmnopqrstuvwxyz";
//return isCharsOnly(input_s,chars);
StringUtil.isOnlyChars = function(input_s,chars) {
    for (var inx = 0; inx < input_s.length; inx++) {
       if (chars.indexOf(input_s.charAt(inx)) == -1)
           return false;
    }
    return true;
};



StringUtil.encodeURI=function(url_s){
	return encodeURI(url_s);
};
StringUtil.decodeURI=function(url_s){
	return decodeURI(url_s);
};
StringUtil.getUnicode = function(input_s){
	return escape(input_s);
};

StringUtil.upper=function(inputStr_s){
	return String(inputStr_s).toUpperCase();
};
StringUtil.lower=function(inputStr_s){
	return  String(inputStr_s).toLowerCase();
};
StringUtil.getByteLength=function(inputStr_s){
		  var byteLength = 0;
		  var c;
		  for(var i = 0; i < inputStr_s.length; i++) {
		    c = escape(inputStr_s.charAt(i));

		    if (c.length == 1) {
		      byteLength ++;
		    } else if (c.indexOf("%u") != -1)  {
		      byteLength += 2;
		    } else if (c.indexOf("%") != -1)  {
		      byteLength += c.length/3;
		    }
		  }
		  return byteLength;
};





/*
 * msg		템플릿되어진 문자열
 * param	Object  키값으로 해당 프로퍼티찾아서 값넣어줌
 * openChar 키시작을 알리는 값   ,기본값{
 * closeChar 키끝을 알리는 값 ,기본값}
 */
 /* 예
 var msg ="dd{d{g{visu}g}d}dggagasdgdf{gd}fg{visu}gasdad{visu}";
 var param =  new Object();  
 param["visu"] = "show";
 var sss = StringUtil.injection(msg,param);
 alert(sss); 
 결과 ddshowdggagasdgdffgshowgasdadshow
 */
 StringUtil.inJection = function(msg, openChar, closeChar, param){

	if(openChar==undefined){openChar="{";};
	if(closeChar==undefined){closeChar="}";};
	
	var openIndex = msg.lastIndexOf(openChar);
	var closeIndex = msg.indexOf(closeChar,openIndex);
	
	if(openIndex < 0 || closeIndex < 0 || openIndex > closeIndex){
		return msg;
	}
	
	var key 	= msg.substring(openIndex+1, closeIndex);
	var fullKey	= msg.substring(openIndex, closeIndex+1);
	var regexp	= new RegExp(fullKey,"gi");
	
	if(param[key]!=undefined && param[key]!=null){
		msg = msg.replace(regexp,param[key]);
	}else{
		msg = msg.replace(regexp,"");
	}
	
	return StringUtil.injection(msg, param, openChar, closeChar);
}


function RegExpUtil(){};
RegExpUtil.prototype = new Object();
RegExpUtil.is=function(regexp,msg){
	return regexp.test(msg);
};



function DateUtil(){};
DateUtil.prototype = new Object();
DateUtil.getFullMilliSecond=function(){
	return new Date().getTime();
};
DateUtil.getFullSecond=function(){
	return new Date().getTime()/1000;
};
DateUtil.getMilliSecond=function(){
	return new Date().getMilliseconds();
};
//finger
//yyyy yy ,    MM ,dd  ,e , HH hh , mm, ss ,a/p
DateUtil.getDate  = function(format_s,date_o){
	if(!date_o){
		date_o = new Date();
	}
	
	//var weekName = ["일요일", "월요일", "화요일", "수요일", "목요일", "금요일", "토요일"];
	//var timeType = ["오전", "오후"];
	var weekName = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
	var timeType = ["AM", "PM"];
	
	return format_s.replace(/(yyyy|SSS|yy|MM|dd|E|hh|mm|ss|a\/p)/gi, function($1) {
        switch ($1) {
            case "yyyy": return date_o.getFullYear();
            case "yy": return StringUtil.lpad("0",2,(date_o.getFullYear() % 1000).toString());
            case "MM": return StringUtil.lpad("0",2,(date_o.getMonth() + 1).toString());
            case "dd": return StringUtil.lpad("0",2, date_o.getDate().toString());
            case "E": return weekName[d.getDay()];
            case "HH": return StringUtil.lpad("0",2, date_o.getHours().toString());
            case "hh": return StringUtil.lpad("0",2, ((h = date_o.getHours() % 12) ? h : 12).toString());
            case "mm": return StringUtil.lpad("0",2, date_o.getMinutes().toString());
            case "ss": return StringUtil.lpad("0",2, date_o.getSeconds().toString());
            case "SSS": return StringUtil.lpad("0",3, date_o.getMilliseconds().toString());
            case "a/p": return date_o.getHours() < 12 ? timeType[0] : timeType[1];
            default: return $1;
        }
    });
	
	
	
	
	
	
	
	
	
	//var sdf = khh.date.SimpleDateFormat('yyyy-MM-dd hh시 mm분 ss초'); 
	//var sdf = new khh.date.SimpleDateFormat(format_s); 
	//포맷지정    
	//return (sdf.format(date_o)); //출력

};



/**
 * 해당년월의 마지막 일자를 계산
 * @param y
 * @param m
 * @return
 * @author xuny
 */
DateUtil.getLastDay = function(y, m) {
    y = parseInt(y, 10);
    m = parseInt(m, 10);

    var end = new Array(31,28,31,30,31,30,31,31,30,31,30,31);
    if (isLeapYear(y)) {
        end[1] = 29;
    }
    return end[m - 1];
};

/**
 * 윤년인지 아닌년인지
 * @param year
 * @return
 * @author xuny
 */
DateUtil.isLeapYear = function(year) {
    if ((year % 4) == 0) {
        if ((year % 100) != 0) return true;
        if ((year % 400) == 0) return true;
    }
    return false;
};

/**
 * 유효한 날짜인지
 * @param year
 * @param month
 * @param day
 * @return
 * @author xuny
 */
DateUtil.isValidDate = function(year, month, day) {
    year  = parseInt(year  ,10);
    month = parseInt(month ,10);
    day   = parseInt(day   ,10);

    if (year < 0 || year > 9999) return false;
    if (month < 1 || month > 12) return false;

    var endDay = getEndDay(year, month);
    if (day < 1 || day > endDay) return false;

    return true;
};
/**
 * 유효한 년월인지
 * @param year
 * @param month
 * @return
 * @author xuny
 */
DateUtil.isYYYYMM = function(year, month){
    var yy, mm;

    if (isNull(year) || isNull(month)) {
        return false;
    }
    if (year.length != 4 || month.length != 2) {
        return false;
    }
    if (!isNumeric(year) || !isNumeric(month)) {
        return false;
    }

    yy = parseInt(year, 10);
    mm = parseInt(month, 10);
    if (yy < 1900 )
        return false;
    if (mm < 1 || mm > 12)
        return false;

    return true;
};

/**
 * 유효한 시분인지
 * @param hour, minute
 */
DateUtil.isHHMI = function(hour, minute){
    var hh, mi;

    if (isNull(hour) || isNull(minute)) {
        return false;
    }
    if (hour.length != 2 || minute.length != 2) {
        return false;
    }
    if (!isNumeric(hour) || !isNumeric(minute)) {
        return false;
    }

    hh   = parseInt(hour, 10);
    mi = parseInt(minute, 10);
    if (hh < 0  || hh > 24 )
        return false;
    if (mi < 0 || mi > 60)
        return false;

    return true;
};
/**
 * 년월일을 입력 받은 년도 ,월, 일자 만큼 증가/감소 시킨다.
 * @param   dateStr     원래날짜 String ("YYYYMMDD")
 * @param   year        원래날짜에 더할 년
 * @param   month       원래날짜에 더할 월
 * @param   day         원래날짜에 더할 일
 * @return              연산결과의 날짜 String ("YYYYMMDD")
 * @author  xuny
 */
DateUtil.shiftDate = function(dateStr, year, month, day) {
    var date = toDateObject(dateStr);
    date.setFullYear(date.getFullYear() + year);
    date.setMonth(date.getMonth() + month);
    date.setDate(date.getDate() + day);

    return this.toDateString(date);
};
/**
 * 날짜String("YYYYMMDD") ==> Date(object)
 * @param dateStr
 * @return
 */
DateUtil.toDateObject = function(dateStr) {
    return new Date(dateStr.substr(0, 4),
                    dateStr.substr(4, 2) - 1,
                    dateStr.substr(6, 2));
};

/**
 * Date(object) ==> 날짜String("YYYYMMDD")
 * @param date
 * @return
 */
DateUtil.toDateString = function(date) {
    var y = date.getFullYear();
    var m = date.getMonth() + 1;
    var d = date.getDate();
    y = String(y);
    m = (String(m).length == 1 ? "0" : "") + m;
    d = (String(d).length == 1 ? "0" : "") + d;

    return y + m + d;
};
/**
 * 두개의 일자를 입력받아 두 날짜의 차이일수를 리턴한다.
 * @param   fromDateStr 시작일자("YYYYMMDD")
 * @param   toDateStr   종료일자("YYYYMMDD")
 * @return
 * @author  xuny
 */
DateUtil.getBetweenDay = function(fromDateStr, toDateStr) {
    var fDate = toDateObject(fromDateStr);
    var tDate = toDateObject(toDateStr);
    var day = 1000 * 3600 * 24;

    return parseInt((tDate - fDate) / day);
};









function Validate(){};
Validate.prototype = new Object();
Validate.isPersonalNumber=function(personalNumber_s){
	  var personal_no = personalNumber_s.replace(/[^\d]+/g, ''); 
	    pattern = /^[0-9]{6}[1-8][0-9]{6}$/; 

	    if(!pattern.test(personal_no)) { 
	        return false; 
	    } 
	    var birth = new Array(); 
	    birth[0] = personal_no.substr(0, 2); 
	    switch(personal_no.charAt(6)) { 
	    case '1': 
	    case '2': 
	        birth[0] = ('19' + birth[0]) * 1; 
	        birth[3] = false; 
	        break; 
	    case '3': 
	    case '4': 
	        birth[0] = ('20' + birth[0]) * 1; 
	        birth[3] = false; 
	        break; 
	    case '5': 
	    case '6': 
	        birth[0] = ('19' + birth[0]) * 1; 
	        birth[3] = true; 
	        break; 
	    case '7': 
	    case '8': 
	        birth[0] = ('20' + birth[0]) * 1; 
	        birth[3] = true; 
	        break; 
	     
	    } 

	    birth[1] = personal_no.substr(2, 2) * 1; 
	    birth[2] = personal_no.substr(4, 2) * 1; 

	    if(birth[1] < 1 || birth[1] > 12) { 
	        return false; 
	    } 
	    if(birth[2] < 1 || birth[2] > 31) { 
	        return false; 
	    } 
	    var check = 0; 
	    var mul = 2; 

	    if(birth[3]) { 
	        if(((personal_no.charAt(7) * 10 + personal_no.charAt(8)) % 2) != 0) { 
	            return false; 
	        } 
	    } 
	    for(var i = 0; i < 12; i ++) { 
	        check += personal_no.charAt(i) * mul; 
	        mul ++; 
	        if(mul > 9) { 
	            mul = 2; 
	        } 
	    } 

	    check = 11 - (check % 11); 

	    if(check > 9) { 
	        check %= 10; 
	    } 
	    if(birth[3]) { 
	        check += 2; 
	        if(check > 9) { 
	            check %= 10; 
	        } 
	    } 
	    if(check != personal_no.charAt(12)) { 
	        return false; 
	    } 
	    //return birth; 
	    return true;
};
Validate.isBusinessNumber=function(businessNumber_s){
	 var strNumb = ConvertingUtil.replaceAll(businessNumber_s,"-","");
	 strNumb = ConvertingUtil.replaceAll(businessNumber_s," ","");
	 
	 
	 if (strNumb.length != 10) { 
	 //alert("사업자등록번호가 잘못되었습니다."); 
	 return false; 
	 } 
	 
	 sumMod = 0; 
	 sumMod += parseInt(strNumb.substring(0,1)); 
	 sumMod += parseInt(strNumb.substring(1,2)) * 3 % 10; 
	 sumMod += parseInt(strNumb.substring(2,3)) * 7 % 10; 
	 sumMod += parseInt(strNumb.substring(3,4)) * 1 % 10; 
	 sumMod += parseInt(strNumb.substring(4,5)) * 3 % 10; 
	 sumMod += parseInt(strNumb.substring(5,6)) * 7 % 10; 
	 sumMod += parseInt(strNumb.substring(6,7)) * 1 % 10; 
	 sumMod += parseInt(strNumb.substring(7,8)) * 3 % 10; 
	 sumMod += Math.floor(parseInt(strNumb.substring(8,9)) * 5 / 10); 
	 sumMod += parseInt(strNumb.substring(8,9)) * 5 % 10; 
	 sumMod += parseInt(strNumb.substring(9,10)); 
	 
	 if (sumMod % 10 != 0) { 
	 //alert("사업자등록번호가 잘못되었습니다."); 
	 return false; 
	 } 
	 return true; 
};
Validate.isPassWordHigh=function(msg,minlen,maxlen){
	if(!minlen){
		minlen=12;
	}
	if(!maxlen){
		maxlen=99999;
	}
	var chk1 = /[\{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"]/i;  //특수문자
	//var chk1 = new RegExp("^[a-z\\d\{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"]{"+minlen+","+maxlen+"}$","i");;  //a-z와 0-9이외의 문자가 있는지 확인
//	var chk1 = new RegExp("^[a-z\\d]{"+minlen+","+maxlen+"}$","i");;  //a-z와 0-9이외의 문자가 있는지 확인
	// var chk0 = /^[a-z\d]{1,12}$/i;  //a-z와 0-9이외의 문자가 있는지 확인
	//var chk1 = new RegExp("^[a-z\\d~!#$^&*\\=+|:;?\"<,.>%']{"+minlen+","+maxlen+"}$","i"); 
   // var chk1 = /^[a-z\d~!#$^&*\=+|:;?"<,.>%']{12,999999999999}$/i;  //a-z와 0-9이외의 문자가 있는지 확인
				 //  /^[a-z\d~!#$^&*\=+|:;?"<,.>%']{12,99999}$/i
    var chk2 = /[a-z]/i;  //적어도 한개의 a-z 확인
    var chk3 = /\d/;  //적어도 한개의 0-9 확인
   // var chk4 = /[~!#$^&*\=+|:;?"<,.>']/;

    
    var range = msg.length>=minlen && msg.length<=maxlen?true:false;
    
	return  RegExpUtil.is(chk1, msg) && RegExpUtil.is(chk2, msg) && RegExpUtil.is(chk3, msg) && range;
};

Validate.isEmail = function (str){
	//    var format = /^((\w|[\-\.])+)@((\w|[\-\.])+)\.([A-Za-z]+)$/;
    var exclude=/[^@\-\.\w]|^[_@\.\-]|[\._\-]{2}|[@\.]{2}|(@)[^@]*\1/;
    var check=/@[\w\-]+\./;
    var checkend=/\.[a-zA-Z]{2,3}$/;
    try{
        if(((str.search(exclude) != -1)||(str.search(check)) == -1)||(str.search(checkend) == -1)){
            return false;
        }else{
            return true;
        }
    }catch (error){}
    return false;
};

Validate.isPhoneFormat=function(input_s) {
    var format = /^(\d+)-(\d+)-(\d+)$/;
    return isValidFormat(input_s,format);
};

/*
Validate.isHangeul=function(input_s) {
	    var tempStr = "";
	    var temp = 0;
	    var onechar;
	    tempStr = new String(input_s);
	    temp = tempStr.length;
	    for(var k=0; k<temp;k++){
	        onechar = tempStr.charAt(k);
	        if(escape(onechar).length > 4){
	           return true;
	        }
	    }
	    return false;
};
Validate.isNoHangeul=function(input_s) {
	var AlphaDigit;
	var IDLength;
	var NumberChar, CompChar;
	var ChkFlag;

	AlphaDigit= "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
	IDLength = input_s.length;

	for (var i = 0; i < IDLength; i++) {
		NumberChar = input_s.charAt(i);
 		ChkFlag = false;
 		for (var j = 0; j < AlphaDigit.length ; j++) {
    		CompChar = AlphaDigit.charAt(j);
   			if (NumberChar.toLowerCase() == CompChar.toLowerCase()){
      			ChkFlag = true;
   			}
 		}
   		if (ChkFlag == false) return false;
	}
	return true;
};
*/

//쓰지말것
/*
Validate.isSpecialChar=function(input_s) {
	var AlphaDigit;
	var IDLength;
	var NumberChar, CompChar;
	var ChkFlag;

	AlphaDigit= "'<>!@#$%^&*" + '"';

	IDLength = input_s.length;

	for (var i = 0; i < IDLength; i++) {
		NumberChar = input_s.charAt(i);
 		ChkFlag = true;
 		for (var j = 0; j < AlphaDigit.length ; j++) {
    		CompChar = AlphaDigit.charAt(j);
   			if (NumberChar.toLowerCase() == CompChar.toLowerCase()){
      			ChkFlag = false;
   			}
 		}
   		if (ChkFlag == false) return false;
	}
	return true;
}
*/






//////////Converting Util

function ConvertingUtil(){};
ConvertingUtil.prototype = new Object();

/**
 * 키보드 키코드를 케릭터로 반환한다     
 * 없으면 -1을 리턴
 * @param {String} inputStr_s
 * @returns {Char}
*/  
//유니코드 또는 아스키 코드 번호를, 문자로 변환
ConvertingUtil.fromCharCode=function(inputStr_s){
	return String.fromCharCode(inputStr_s);
};
ConvertingUtil.keyCodeToCharcode=function(inputStr_s){
	return String.fromCharCode(inputStr_s);
};
//한글은 유니코드 번호로 나옴
//십진수인 44032 를 16진수로는 AC00
//A 같은 영문자는 그냥 10진수 아스키 코드로 나옵니다
ConvertingUtil.charToCode=function(inputStr_c){
	return inputStr_c.charCodeAt(0);
};
/*
ConvertingUtil.toUpperCase=function(inputStr_s){
	return String(inputStr_s).toUpperCase();
};
ConvertingUtil.toLowerCase=function(inputStr_s){
	return  String(inputStr_s).toLowerCase();
};
*/
ConvertingUtil.concatenateToAttribute=function(object_o){
	return ConvertingUtil.concatenateToString(object_o,"="," ","'");
};
ConvertingUtil.concatenateToParameter=function(object_o){
	return ConvertingUtil.concatenateToString(object_o,"=","&","");
};
ConvertingUtil.concatenateToString=function(object_o,unionString_s,spilString_s,pairString_s){
	if(!unionString_s){
		unionString_s="=";
	}
	if(!spilString_s){
		spilString_s=" ";
	}
	if(!pairString_s){
		pairString_s="";
	}
	
    var results = [];
    for (var property in object_o) {
        var value = object_o[property];
        if (value){
            results.push(property.toString() +unionString_s+ pairString_s + value+pairString_s);
        }
    }
                 
    return results.join(spilString_s);
};

//쓰지말것
/*ConvertingUtil.trim=function(msg_s){
	return msg_s.replace(/^\s*|\s*$/g,'');
};
ConvertingUtil.onlyNumber=function(msg_s){
	return msg_s.replace(/[^\d]+/g, ''); 
};

ConvertingUtil.encodeURI=function(url_s){
	return encodeURI(url_s);
};
ConvertingUtil.decodeURI=function(url_s){
	return decodeURI(url_s);
};
*/
//쓰지말것
/*
ConvertingUtil.replaceAll=function(msg_s,before_s,after_s){
var regexp = new RegExp(before_s,"gi");
	return msg_s.replace(regexp,after_s);
	
};
*/


/*  파라미터 넘어오는거 보는 방법  가변파라미터 처리 가능 
function MM_preloadImages() { // v3.0
	var d = document;
	if (d.images) {
		if (!d.MM_p)
			d.MM_p = new Array();
		var i, j = d.MM_p.length, a = MM_preloadImages.arguments;
		for (i = 0; i < a.length; i++)
			if (a[i].indexOf("#") != 0) {
				d.MM_p[j] = new Image;
				d.MM_p[j++].src = a[i];
			}
	}
}
*/
/*
ConvertingUtil.domToJson=function(obj){
		var oAr =Array();
		dom.find("item").each(function(index){
			var o = new Object;
			$(this).children().each(function(i) {
				var value = $.trim($(this).text());
				value = (value=='null'?'-':value);
				o[$(this).get(0).tagName] =value;
		    });
			oAr[index] = o;
		});
		return oAr;
}
*/

//finger
/*
ConvertingUtil.delComma=function(number_s){
	return  this.replaceAll(number_s, ",", "");
};
//금액 입력시 "," 자동 입력
ConvertingUtil.addComma = function( number_s  ){
	return this.addChar(number_s,3,",");
};
ConvertingUtil.addChar = function( number_s , jumpsize_n,addchar_s )
{
//	if(!jumpsize_n){
//		jumpsize_n=3;
//	}
	
	//number_s = this.delComma( number_s );
	number_s = StringUtil.deleteChar(number_s, addchar_s);
    var src;
    var i; 
    var	factor; 
    var	su; 

    factor = number_s.length % jumpsize_n; 
    su     = (number_s.length - factor) / jumpsize_n;
    src    =  number_s.substring(0,factor);

    for(i=0; i < su ; i++)
    {
		if((factor == 0) && (i == 0))       // "XXX" 인경우
		{
			src += number_s.substring(factor+(jumpsize_n*i), factor+jumpsize_n+(jumpsize_n*i));  
		}
	    else
		{
		    src += addchar_s  ;
			src += number_s.substring(factor+(jumpsize_n*i), factor+3+(jumpsize_n*i));  
		}
    }
    number_s = src; 

    return number_s; 
};
*/


//////////Window Util
function WindowUtil(){};
WindowUtil.prototype = new Object();

WindowUtil.newWindow=function(url){
    window.open(url);
};
//params_s_name_s 까지만 넣으면 이름으로 관주 name_s 넣으면  params_s_name_s 파라미터로 인정
WindowUtil.newPopup=function(url,width_n,height_n,params_s_name_s,name_s){
    var winl = ScreenUtil.getCenterWidth();
    var wint = ScreenUtil.getCenterHeight();
    var name_v="";
    var params_v="";
    /*
     if(!name_s){
    	name_v		= 'new_WindowName';
    	params_v	= "scrollbars=NO,resizable = YES, status=yes";
    }else{
    	name_v=name_s;
    	params_v=params_s_name_s;
    }
     */    
    
    if(!params_s_name_s){
    	name_v 		= "new_WindowName";
    	params_v	= "scrollbars=NO,resizable = YES, status=yes";
    }else{
    	if(!name_s){
    		name_v		= params_s_name_s;
    		params_v	= "scrollbars=NO,resizable = YES, status=yes";
    	}else{
    		name_v		= name_s;
    		params_v	= params_s_name_s;
    	}
    }
    winl -= (width_n/2);
    wint -= (height_n/2);
    
    
    
    var location_v="";
    var result_arr = StringUtil.isMatching(StringUtil.upper(params_s_name_s), "WIDTH");
    if(result_arr.length<=0){
    	location_v+=",width="+width_n;
    }
    result_arr = StringUtil.isMatching(StringUtil.upper(params_s_name_s), "HEIGHT");
    if(result_arr.length<=0){
    	location_v+=",height="+height_n;
    }
    result_arr = StringUtil.isMatching(StringUtil.upper(params_s_name_s), "TOP");
    if(result_arr.length<=0){
    	location_v+=",top="+wint;
    }
    result_arr = StringUtil.isMatching(StringUtil.upper(params_s_name_s), "LEFT");
    if(result_arr.length<=0){
    	location_v+=",left="+winl;
    }
    
    
    //toolbar=no,menubar=no,location=no,scrollbars=no,status=no
    var winprops = location_v+","+params_v;
    window.open(url,name_v,winprops);
};


WindowUtil.resize=function(window_o_width_n,width_n_height_n,height_n){
	if(JavaScriptUtil.isNumber(window_o_width_n)){
		self.resizeTo(window_o_width_n,width_n_height_n);
		return;
	}
	
	if(!window_o_width_n){
		window_o_width_n=self;
	}
	window_o_width_n.resizeTo(width_n_height_n,height_n);
};
	/*
	// 버전이 6.x 이거나 5.x 일때
	if (appVer=="5" || appVer=="6") {
		self.opener=self;
		opener.close();
	} 
	else {
		top.window.opener=top;
		top.window.open('', '_parent', '');
		top.window.close();
	}
	*/
WindowUtil.close=function(window_o){
	if(!window_o){
		window_o = self;
	}
	window_o.open('', '_parent', '');
	window_o.close();
};
WindowUtil.closeOpener=function(window_o){
	if(!window_o){
		window_o = self;
	}
		var op = WindowUtil.getOpener(window_o);
	try{
		if(op){
			op.close();
		};
	}catch(e){
	}
};

WindowUtil.getOpener=function(window_o){
	if(!window_o){
		window_o = self;
	}
	return window_o.opener;
};


WindowUtil.getWindowWidth=function(window_o){
	if(!window_o){
		window_o =  self;
	}
	if(JavaScriptUtil.isNetscape()){
		window_o.outerWidth;
	}else if(JavaScriptUtil.isInternetExplorer()){
		window_o.document.documentElement.offsetWidth;
	}
};

WindowUtil.getWindowHeight=function(window_o){
	if(!window_o){
		window_o =  self;
	}
	if(JavaScriptUtil.isNetscape()){
		window_o.outerHeight;
	}else if(JavaScriptUtil.isInternetExplorer()){
		window_o.document.documentElement.offsetHeight;
	}
};


WindowUtil.getWindowTop=function(window_o){
	if(!window_o){
		window_o =  self;
	}
	if(JavaScriptUtil.isNetscape()){
		window_o.screenX;
	}else if(JavaScriptUtil.isInternetExplorer()){
		window_o.screenTop;
	}
};

WindowUtil.getWindowLeft=function(window_o){
	if(!window_o){
		window_o =  self;
	}
	if(JavaScriptUtil.isNetscape()){
		window_o.screenY;
	}else if(JavaScriptUtil.isInternetExplorer()){
		window_o.screenLeft;
	}
};


//finger
function DocumentUtil(){};
DocumentUtil.prototype = new Object();
DocumentUtil.getWidth=function(window_o){
	if(!window_o){
		window_o =  self;
	}
	if(JavaScriptUtil.isNetscape()){
		return window_o.innerWidth;
	}else if(JavaScriptUtil.isInternetExplorer()){
		return window_o.document.documentElement.clientWidth;
	}
	
};
DocumentUtil.getHeight=function(window_o){
	if(!window_o){
		window_o =  self;
	}
	if(JavaScriptUtil.isNetscape()){
		return window_o.innerHeight;
	}else if(JavaScriptUtil.isInternetExplorer()){
		return window_o.document.documentElement.clientHeight;
	}
};


DocumentUtil.getCenterWidth=function(window_o){
	return this.getWidth(window_o)/2;
	
};
DocumentUtil.getCenterHeight=function(window_o){
	return this.getHeight(window_o)/2;
};


DocumentUtil.newPopup=function(element_o,width_n_s,height_n_s,left_n_s,top_n_s){
    var dcl = DocumentUtil.getCenterWidth();
    var dct = DocumentUtil.getCenterHeight();
    
    var style = StyleUtil.getStyle(element_o);
    style.position='absolute';
    
    
    if(!width_n_s){
    	style.width="100px";
    }else{
    	if(JavaScriptUtil.isNumber(width_n_s)){
    		style.width=width_n_s+"px";
    	}else{
    		style.width=width_n_s;
    	}
    }
    
    if(!height_n_s){
    	style.height="100px";
    }else{
    	if(JavaScriptUtil.isNumber(width_n_s)){
    		style.height=height_n_s+"px";
    	}else{
    		style.height=height_n_s;
    	}
    }
    
    
    
    
    if(!left_n_s){
    	var left = dcl - ( StringUtil.getOnlyNumber(style.width) / 2 );
    	dcl = left+ StringUtil.getOnlyString(style.width);
    }else{
    	if(JavaScriptUtil.isNumber(left_n_s)){
    		style.left=left_n_s+"px";
    	}else{
    		style.left=left_n_s;
    	}
    }
    
    if(!top_n_s){
    	var height = dct - ( StringUtil.getOnlyNumber(style.height) / 2 );
    	dct = height+ StringUtil.getOnlyString(style.height);
    }else{
    	if(JavaScriptUtil.isNumber(top_n_s)){
    		style.top=top_n_s+"px";
    	}else{
    		style.top=top_n_s;
    	}
    }
    
    
    
  
    style.left=dcl;
    style.top=dct;
   // style.display='block';  //'none'
};

DocumentUtil.show=function(element_o){
    var style = StyleUtil.getStyle(element_o);
    style.display='block';  //'none'
};
DocumentUtil.close=function(element_o){
    var style = StyleUtil.getStyle(element_o);
    style.display='none';  //'block'
};










function ScreenUtil(){};
ScreenUtil.prototype = new Object();
ScreenUtil.getWidth=function(){
	return screen.width;
};
ScreenUtil.getCenterWidth=function(){
	return this.getWidth()/2;
};
ScreenUtil.getHeight =function(){
	return screen.height;
};
ScreenUtil.getCenterHeight =function(){
	return  this.getHeight()/2;
};
ScreenUtil.getAvailWidth=function(){
	return screen.availWidth;
};
ScreenUtil.getCenterAvailWidth=function(){
	return this.getAvailWidth()/2;
};
ScreenUtil.getAvailHeight =function(){
	return screen.availHeight;
};
ScreenUtil.getCenterAvailHeight =function(){
	return  this.getAvailHeight()/2;
};


///////////Location..유틸
function LocationUtil(){};
LocationUtil.prototype = new Object();
LocationUtil.getHost=function(window_o){
	if(!window_o){
		 window_o = window;
	}
	return window_o.location.host;
};

LocationUtil.getHostName=function(window_o){
	if(!window_o){
		window_o = window;
	}
	return window_o.location.hostname;
};
LocationUtil.getHref=function(window_o){
	if(!window_o){
		window_o = window;
	}
	return window_v.location.href;
};
LocationUtil.getPathName=function(window_o){
	if(!window_o){
		window_o = window;
	}
	return window_v.location.pathname;
};
LocationUtil.getPort=function(window_o){
	if(!window_o){
		window_o = window;
	}
	return window_o.location.port;
};
LocationUtil.getProtocol=function(window_o){
	if(!window_o){
		window_o = window;
	}
	return window_o.location.protocol;
};
LocationUtil.getSearch=function(window_o){
	if(!window_o){
		 window_o = window;
	}
	return window_o.location.search;
};
LocationUtil.reLoad=function(window_o,optionalArg_b){
	if(!window_o){
		window_o = window;
	}
	window_o.location.reload(optionalArg_b);
};

//style util
function StyleUtil(){};
StyleUtil.prototype = new Object();
StyleUtil.getStyle=function(element_o_s) {
	if(JavaScriptUtil.isString(element_o_s)){
		element_o_s = Selector.ei(element_o_s);
	}
	return element_o_s.style;
};
StyleUtil.getCSS=function(element_o_s) {
	if(JavaScriptUtil.isString(element_o_s)){
		element_o_s = Selector.ei(element_o_s);
	}
	return element_o_s.style.cssText;
};
StyleUtil.setStyle= function(element_o_s,style_s){
	if(JavaScriptUtil.isString(element_o_s)){
		element_o_s = Selector.ei(element_o_s);
	}
	element_o_s.style = style_s;
	return element_o_s;
};
StyleUtil.setCSS= function(element_o_s,css_s){
	if(JavaScriptUtil.isString(element_o_s)){
		element_o_s = Selector.ei(element_o_s);
	}
	element_o_s.style.cssText = css_s;
	return element_o_s;
};


///////////쿠키..유틸
function CookieUtil(){};
CookieUtil.prototype = new Object();
/*CookieUtil.getCookie = function( name_s ){
	var nameOfCookie = name_s + "=";
	var x = 0;
	while(x <= document.cookie.length){
			var y = (x+nameOfCookie.length);
			if ( document.cookie.substring( x, y ) == nameOfCookie ) {
					if ( (endOfCookie=document.cookie.indexOf( ";", y )) == -1 )
							endOfCookie = document.cookie.length;
					return unescape( document.cookie.substring( y, endOfCookie ) );
			}
			x = document.cookie.indexOf( " ", x ) + 1;
			if ( x == 0 )
			break;
	}
	return "";
};
*/



CookieUtil.getCookie=function(name_s) {
   // var first;
   // var str = name_s + "=";
   var ar = document.cookie.split("; ");
   for(var i=0; i<ar.length; i++) {
         var c = ar[i];
         var nv = c.split("=");
         if(nv[0] == name_s)
             return unescape(nv[1]);
   }
   return null;
};	

CookieUtil.setCookie = function (name_s, value_s, expireSecond_n) {
	 var expireDate = new Date ();
	 expireDate.setTime(expireDate.getTime() + (expireSecond_n * 1000)); //mmsecond -> second
    var cookieStr = name_s + "=" + escape(value_s) + 
     ((expireDate == null)?"":("; expires=" + expireDate.toGMTString()));
     document.cookie = cookieStr;
};


//finger
CookieUtil.delCookie = function (name_s) {
	CookieUtil.setCookie(name_s, null, -1);
	
	/*
	//var today = new Date();
    //today.setDate(today.getDate() - 1);
    var value = CookieUtil.getCookie(name_s);
    if(value){
    		var expireDate = new Date();
    		expireDate.setDate( expireDate.getDate() - 1 );
    		document.cookie = name_s + "= " + "; expires=" + expireDate.toGMTString() + "; path=/";
    }
        //document.cookie = name + "=; expires=" + today.toGMTString();
        */
};



//////////event Util

function EventUtil(){};
EventUtil.prototype = new Object();
EventUtil.TYPE_CLICK="click";
EventUtil.TYPE_ONLOAD="onload";
EventUtil.TYPE_MOUSEDOWN="mousedown";
EventUtil.TYPE_MOUSEUP="mouseup";
EventUtil.TYPE_MOUSEOUT="mouseout";
EventUtil.TYPE_MOUSEOVER="mouseover";
EventUtil.TYPE_MOUSEMOVE="mousemove";
EventUtil.TYPE_MOUSEWHEEL="mousewheel";
EventUtil.TYPE_CHANGE="change";
EventUtil.TYPE_KEYPRESS="keypress";
EventUtil.TYPE_KEYDOWN="keydown";
EventUtil.TYPE_KEYUP="keyup";
EventUtil.TYPE_PASTE="paste";//클립 보드의 내용을 문서에 붙여 넣기 전에 발생합니다.
EventUtil.TYPE_COPY="copy";//선택이 클립 보드에 복사 oncopy 이벤트 전에되기 전에 발생합니다.
EventUtil.TYPE_CUT="cut";//선택이 클립 보드에 복사 cut 이벤트 전에되기 전에 발생합니다.
EventUtil.TYPE_UNLOAD="unload";
EventUtil.TYPE_SELECT="select";
EventUtil.TYPE_SCROLL="scroll";
EventUtil.TYPE_DRAG="drag";
EventUtil.TYPE_DRAGEND="dragend";
EventUtil.TYPE_RESIZE="resize";
EventUtil.getEventName=function(type_event_s){
	var accept_event="";
	 if (window.addEventListener) {   // all browsers except IE before version 9
	
		 if(type_event_s==this.TYPE_CLICK){
			 accept_event="click";
		 }else if(type_event_s==this.TYPE_ONLOAD){
			 accept_event="load";
		 }else if(type_event_s==this.TYPE_MOUSEDOWN){
			 accept_event="mousedown";
		 }else if(type_event_s==this.TYPE_MOUSEUP){
			 accept_event="mouseup";
		 }else if(type_event_s==this.TYPE_MOUSEMOVE){
			 accept_event="mousemove";
		 }else if(type_event_s==this.TYPE_CHANGE){
			 accept_event="change";
		 }else if(type_event_s==this.TYPE_KEYPRESS){
			 accept_event="keypress";
		 }else if(type_event_s==this.TYPE_KEYDOWN){
			 accept_event="keydown";
		 }else if(type_event_s==this.TYPE_KEYUP){
			 accept_event="keyup";
		 }else if(type_event_s==this.TYPE_MOUSEOUT){
			 accept_event="mouseout";
		 }else if(type_event_s==this.TYPE_MOUSEOVER){
			 accept_event="mouseover";
		 }else if(type_event_s==this.TYPE_MOUSEWHEEL){
			 accept_event="mousewheel";
		 }else if(type_event_s==this.TYPE_PASTE){
			 accept_event="paste";
		 }else if(type_event_s==this.TYPE_COPY){
			 accept_event="copy";
		 }else if(type_event_s==this.TYPE_CUT){
			 accept_event="cut";
		 }else if(type_event_s==this.TYPE_UNLOAD){
			 accept_event="unload";
		 }else if(type_event_s==this.TYPE_SELECT){
			 accept_event="select";
		 }else if(type_event_s==this.TYPE_SCROLL){
			 accept_event="scroll";
		 }else if(type_event_s==this.TYPE_DRAG){
			 accept_event="drag";
		 }else if(type_event_s==this.TYPE_DRAGEND){
			 accept_event="dragend";
		 }else if(type_event_s==this.TYPE_RESIZE){
			 accept_event="resize";
		 }
	 
		 
    }else {
        if (window.attachEvent) {    // IE before version 9
   		 if(type_event_s==this.TYPE_CLICK){
			 accept_event="onclick";
		 }else if(type_event_s==this.TYPE_ONLOAD){
			 accept_event="onload";
		 }else if(type_event_s==this.TYPE_MOUSEDOWN){
			 accept_event="onmousedown";
		 }else if(type_event_s==this.TYPE_MOUSEUP){
			 accept_event="onlosecapture";
		 }else if(type_event_s==this.TYPE_MOUSEMOVE){
			 accept_event="onmousemove"; //의심.
		 }else if(type_event_s==this.TYPE_CHANGE){
			 accept_event="onchange";
		 }else if(type_event_s==this.TYPE_KEYPRESS){
			 accept_event="onkeypress";
		 }else if(type_event_s==this.TYPE_KEYDOWN){
			 accept_event="onkeydown";
		 }else if(type_event_s==this.TYPE_KEYUP){
			 accept_event="onkeyup";
		 }else if(type_event_s==this.TYPE_MOUSEOUT){
			 accept_event="onmouseout";
		 }else if(type_event_s==this.TYPE_MOUSEOVER){
			 accept_event="onmouseover";
		 }else if(type_event_s==this.TYPE_MOUSEWHEEL){
			 accept_event="onmousewheel";
		 }else if(type_event_s==this.TYPE_PASTE){
			 accept_event="onpaste";
		}else if(type_event_s==this.TYPE_COPY){
			accept_event="copy";
		}else if(type_event_s==this.TYPE_CUT){
			accept_event="cut";
		}else if(type_event_s==this.TYPE_UNLOAD){
			 accept_event="onunload";
		}else if(type_event_s==this.TYPE_SELECT){
			 accept_event="onselect";
		}else if(type_event_s==this.TYPE_SCROLL){
			 accept_event="onscroll";
		}else if(type_event_s==this.TYPE_DRAG){
			 accept_event="ondrag";
		 }else if(type_event_s==this.TYPE_DRAGEND){
			 accept_event="ondragend";
		 }else if(type_event_s==this.TYPE_RESIZE){
			 accept_event="onresize";
		 }
   		 
   		 
        }
    }
	 return accept_event;
};
EventUtil.addEventListener=function(obj_o ,type_event_s,function_f){
	var accept_eventname = this.getEventName(type_event_s);
	var sw = false;
	if(type_event_s==this.TYPE_MOUSEUP ||type_event_s==this.TYPE_MOUSEMOVE){
		sw=true;
	}

	 if (obj_o.addEventListener) {   // all browsers except IE before version 9
		 obj_o.addEventListener (accept_eventname, function_f, sw);
     } 
     else {
         if (obj_o.attachEvent) {    // IE before version 9
        	 obj_o.attachEvent (accept_eventname, function_f);
         }
     }
};


EventUtil.removeEventListener=function(obj_o ,type_event_s,function_f){
	var accept_eventname = this.getEventName(type_event_s);
	var sw = false;
	if(type_event_s==this.TYPE_MOUSEUP ||type_event_s==this.TYPE_MOUSEMOVE){
		sw=true;
	}

	 if (obj_o.removeEventListener) {   // all browsers except IE before version 9
		 obj_o.removeEventListener (accept_eventname, function_f, sw);
     } 
     else {
         if (obj_o.detachEvent ) {    // IE before version 9
        	 obj_o.detachEvent  (accept_eventname, function_f);
         }
     }
};

EventUtil.addOnloadEventListener=function(object_o_function_f,function_f){
	if(!object_o_function_f){
		object_o_function_f=window;
	}
	//alert(object_o_function_f+"      "+JavaScriptUtil.isObject(object_o_function_f));
	if(JavaScriptUtil.isObject(object_o_function_f)){
		this.addEventListener(object_o_function_f, this.TYPE_ONLOAD, function_f);
	}else if(JavaScriptUtil.isFunction(object_o_function_f)){
		this.addEventListener(window, this.TYPE_ONLOAD, object_o_function_f);
	};
};
EventUtil.addUnloadEventListener=function(object_o_function_f,function_f){
	if(!object_o_function_f){
		object_o_function_f=window;
	}
	//alert(object_o_function_f+"      "+JavaScriptUtil.isObject(object_o_function_f));
	if(JavaScriptUtil.isObject(object_o_function_f)){
		this.addEventListener(object_o_function_f, this.TYPE_UNLOAD, function_f);
	}else if(JavaScriptUtil.isFunction(object_o_function_f)){
		this.addEventListener(window, this.TYPE_UNLOAD, object_o_function_f);
	};
};

EventUtil.isEnter=function(event_o){
	if(!event_o){
		event_o=window.event;
	}
	if(event_o.keyCode == 13){
		return true;
	}else{
		return false;
	}
};


EventUtil.srcElement=function(event_o){
	if(!event_o){
		event_o=event;
	}
	return event.srcElement;
};
//keypress쪽에걸면..ㅎㅎ
/*
 *  onkeypress="javascript:onlyNumber()";
 *     위와같이 사용했을 경우 숫자만 입력가능하게 한다.
 */
EventUtil.onlyNumber=function(event_o){
	if(!event_o){
		event_o=window.event;
	}
	var lkeycode = event_o.keyCode;
	var sOrg = String.fromCharCode(lkeycode);

  	if(!sOrg.match(/^[\d|\.]/))			// New Code
		window.event.keyCode = 0;
};

EventUtil.onlyNumberMinus=function(event_o){
	if(!event_o){
		event_o=window.event;
	}
	var lkeycode = event_o.keyCode;
	var sOrg = String.fromCharCode(lkeycode);

  	if(!sOrg.match(/^[\d|\.\-]/))			// New Code
		window.event.keyCode = 0;
};
EventUtil.onlyAlpaNumber = function () {
	var lkeycode = window.event.keyCode;
	//var sOrg = String.fromCharCode(lkeycode);
	//alert ( sOrg ) ;
	//alert ( "lkeycode:" + lkeycode + ";sOrg" + sOrg ) ;


	if  ( lkeycode < 48 )
	{
		window.event.keyCode = 0;
	} else if ( lkeycode >= 48 && lkeycode <= 57 )
	{
		// 통과
	} else if ( lkeycode > 57 && lkeycode < 65 )
	{
		window.event.keyCode = 0;
	} else if ( lkeycode >= 65 && lkeycode <= 90 )
	{
		// 통과
	} else if ( lkeycode > 90 && lkeycode < 97 )
	{
		window.event.keyCode = 0;
	} else if ( lkeycode >= 97 && lkeycode <= 122 )
	{
		// 통과
	} else
	{
		window.event.keyCode = 0;
	}
};



//////////RequestUtil
function RequestUtil(){};
RequestUtil.prototype = new Object();
RequestUtil.getParameter=function(parametername_s){
	var strParamName= parametername_s;
    var arrResult = null;
    if (strParamName) 
            arrResult = location.search.match(new RegExp("[&?]" + strParamName+"=(.*?)(&|$)"));
    return arrResult && arrResult[1] ? arrResult[1] : null;
};
RequestUtil.getParameters=function(window_o){
	if(!window_o){
		window_o = window;
	}
	        var return_o =null;
	        var nowAddress = unescape(window_o.location.href);
	        var parameters = (nowAddress.slice(nowAddress.indexOf('?')+1,nowAddress.length)).split('&');

	        if(parameters[0]==nowAddress){
	        	return null;
	        }
	        
	        for(var i = 0 ; i < parameters.length ; i++)
	        {
	        	if(!return_o)
	        		return_o = new Object();
	        	
	            var varName = parameters[i].split('=')[0];
	            return_o[varName] = parameters[i].split('=')[1];
	        }
	
	        return return_o;
};


//////////rex Util
function RexUtil(){};
RexUtil.prototype = new Object();




function ColorUtil (){};
ColorUtil.prototype = new Object();
ColorUtil.prototype.getRandomColor = function(){
    var letters = '0123456789ABCDEF'.split('');
    var color = '#';
    for (var i = 0; i < 6; i++ ) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}
/////////// 기본적인..유틸

function JavaScriptUtil (){};
JavaScriptUtil.prototype = new Object();
JavaScriptUtil.UNIQUEID=0;
JavaScriptUtil.getNextNumber=function(object_o){
	return  JavaScriptUtil.UNIQUEID++;
};



//isEmptyObject({}) // true
//isEmptyObject({ foo: "bar" }) // false
JavaScriptUtil.isEmptyObject = function(object_o) {
	if(object_o==undefined ||object_o==null ) {
		return true;
	}
	if(JavaScriptUtil.isObject(object_o)){
	    for (var property in object_o) {
	    	return false;
	    };
	    return true;
	};
	
	
	return false;
};

//  Null 값 Check  

JavaScriptUtil.isNull = function(object_o) {
	if(object_o==null) {
		return true;
	}
	return false;
};

JavaScriptUtil.isArray=function(object_o){
	return  Object.prototype.toString.call(object_o)=='[object Array]	';
};
JavaScriptUtil.isNumber=function(object_o){
	return  Object.prototype.toString.call(object_o)=='[object Number]';
};
JavaScriptUtil.isString=function(object_o){
	return  Object.prototype.toString.call(object_o)=='[object String]';
};
JavaScriptUtil.isFunction=function(object_o){
	return  Object.prototype.toString.call(object_o)=='[object Function]';
};
JavaScriptUtil.isObject=function(object_o){
	if(JavaScriptUtil.getTypeOf (object_o)=='object'){
		return true;
	}else{
		return false;
	}
	
	
	// g browser ...
	var sw=false;
	if(JavaScriptUtil.isNetscape()){
		sw  = Object.prototype.toString.call(object_o)=='[object Object]' || Object.prototype.toString.call(object_o)=='[object global]';
	}else if(JavaScriptUtil.isInternetExplorer()){
		sw  = Object.prototype.toString.call(object_o)=='[object Object]';
	}
	return sw ;
};
JavaScriptUtil.isBoolean=function(object_o){
	return  Object.prototype.toString.call(object_o)=='[object Boolean]';
};
JavaScriptUtil.isRegExp=function(object_o){
	return  Object.prototype.toString.call(object_o)=='[object RegExp]';
};
JavaScriptUtil.isRegExp=function(elem){
		// documentElement is verified for cases where it doesn't yet exist
		// (such as loading iframes in IE - #4833)
		var documentElement = (elem ? elem.ownerDocument || elem : 0).documentElement;
		return documentElement ? documentElement.nodeName !== "HTML" : false;
};
JavaScriptUtil.getType=function(object_o){
	return  Object.prototype.toString.call(object_o);
};

JavaScriptUtil.copyObject=function(object_o){
	var return_obj=new Object();
    for (var property in object_o) {
    	return_obj[property] = object_o[property]; 
    }
	return  return_obj;
};

// 왠만하면 copyObject쓰세요  이건 제이슨 값만 복사됨

JavaScriptUtil.copyJson=function(object_o){
	return  JSON.parse(JSON.stringify(object_o));
};

JavaScriptUtil.getBrowserType=function(navigator_o){
	if(!navigator_o){
		navigator_o = navigator;
	}  //Netscape , Microsoft Internet Explorer
	return  navigator_o.appName;
};
JavaScriptUtil.getBrowserVersion=function(navigator_o){
	if(!navigator_o){
		navigator_o = navigator;
	}
	return  navigator_o.appVersion;
};
JavaScriptUtil.isNetscape=function(){
	return JavaScriptUtil.getBrowserType()=='Netscape';
};

JavaScriptUtil.isInternetExplorer=function(){
	return  JavaScriptUtil.getBrowserType()=='Microsoft Internet Explorer';
};

JavaScriptUtil.extendClass =function(superClass,subClass){
	  var F = function (){};
	  F.prototype = superClass.prototype;
	  subClass.prototype = new F ();
	  subClass.prototype.constructor = subClass;
	  subClass.superClass = superClass.prototype;
	  if(superClass.prototype.constructor == Object.prototype.constructor){
		  superClass.prototype.constructor = superClass;
	  };
};
		
JavaScriptUtil.extendClone = function(superreobject_o,childobject_o){
	var return_obj = JavaScriptUtil.copyObject(childobject_o);
    for (var property in superreobject_o) {
    	return_obj[property] = JavaScriptUtil.isEmptyObject(return_obj[property])?superreobject_o[property]:return_obj[property]; 
    }
	return return_obj;
};
JavaScriptUtil.extend = function(superreobject_o,childobject_o){
	var return_obj = childobject_o;
    for (var property in superreobject_o) {
    	return_obj[property] = JavaScriptUtil.isEmptyObject(return_obj[property])?superreobject_o[property]:return_obj[property]; 
    }
	return return_obj;
};


//for (var prop in obj) 
//	  if (!$.isFunction (obj[prop])) $content.append (
//	          "<b>" + prop + "</b>  = " + obj[prop] + "<br />");

JavaScriptUtil.getRandomInt=function(size_n){
//	 var result = Math.floor(Math.random() * 10) + 1;
	 return Math.floor(Math.random() * size_n);
};
JavaScriptUtil.hasOwnProperty=function(object_o,propertyName_s){
	return object_o.hasOwnProperty(propertyName_s);
};
JavaScriptUtil.getTypeOf=function(object_o){
	return typeof object_o;
};
JavaScriptUtil.sleep=function(milliseconds){
	  var start = new Date().getTime();
	  for (var i = 0; i < 1e7; i++) {
	    if ((new Date().getTime() - start) > milliseconds){
	      break;
	    }
	  }
};



function MathUtil(){};
MathUtil.prototype = new Object();
MathUtil.round=function(numValue_n,precision_n){
	var wholeNum = Math.floor(numValue_n);
	var tempNum =numValue_n-wholeNum;
	var multiplier=Math.pow(10,precision_n);
	var precNum = Math.round(tempNum*multiplier);
	precNum= precNum/multiplier;
	return wholeNum+precNum;	
};



//format util
function FormatUtil(){};
FormatUtil.prototype = new Object();
//alert(FormatUtil.format("####/##", "20120203showmethenoney"));
FormatUtil.format= function(format_s,data_s,matchPattern_s){
	if(!matchPattern_s){
		matchPattern_s = "#";
	}	
	var return_val="";
	var position=0;
	for ( var i = 0; i < format_s.length; i++) {
		if(format_s.charAt(i)==matchPattern_s){
			return_val+=data_s.charAt(position++);
		}else{
			return_val+=format_s.charAt(i);
		}
	}
	//if(data_s.length>format_s.length){
		return_val+=data_s.substring(position, data_s.length);
	//}
	return return_val;
};

/**
 * mask형식으로 문자열을 변환한다.
 * 예) 우편번호일경우 <input type="text" ..... omblur="format_mask(this, '999-999')">
 * 예) 날짜일경우 <input type="text" ..... omblur="format_mask(this, '9999-99-99')">
 * @create 2004-07-28
 * @param obj : 형식을 변환하고자 하는 객체
          mask : 변환할 타입 ex)'9999-99-99'
 * @return 
 * @browser IE6, NS7
 */

FormatUtil.format_mask=function(obj, mask){
    var str = obj.value;
    if(str == "" || str.length == 0) return;
    var sStr = str.replace( /(\$|\^|\*|\(|\)|\+|\.|\?|\\|\{|\}|\||\[|\]|-|:)/g,"");
    var tStr="";
    var i;
    var j=0;
    //var tLen = sStr.length +1 ;
    for(i=0; i< sStr.length; i++){
        tStr += sStr.charAt(i);
        j++;
        if (j < mask.length && mask.charAt(j)!="9") tStr += mask.charAt(j++);
    }
    obj.value = tStr;
} ;









// finger
function Selector(){};
Selector.prototype = new Object();
Selector.ei = function (eid_s,document_o){
	if(!document_o){
		document_o=document;
	}
	return document_o.getElementById(eid_s);
};
Selector.ec = function (eclassname_s,document_o){
	if(!document_o){
		document_o=document;
	}
	return document_o.getElementsByClassName(eclassname_s);
};
Selector.en = function (ename_s,document_o){
	if(!document_o){
		document_o=document;
	}
	return document_o.getElementsByName(ename_s);
	//	obj = (IE4 == 1) ? eval("document.all." + objName) : document.forms[0].elements[objName];
	//return obj;
};
Selector.etn = function (tagname_s,document_o){
	if(!document_o){
		document_o=document;
	}
	return document_o.getElementsByTagName(tagname_s);
};




function FocusUtil(){};
FocusUtil.prototype = new Object();
FocusUtil.lengthChk= function(object_o_s,length_n,focusObject_o,selecte_b){
	if(!selecte_b){
		selecte_b=false;
	}
	var input_data_s ="";
	if(JavaScriptUtil.isObject(object_o_s)){
		input_data_s = object_o_s.value;
	}else if(JavaScriptUtil.isString(object_o_s)){
		input_data_s = object_o_s;
	}
	if(input_data_s.length >= length_n){
		focusObject_o.focus();
		if(selecte_b){
			focusObject_o.select();
		}
	}
};







function Debug(){};
Debug.prototype = new Object();
//var Debug = new Object();
//Debug.prototype=Object.prototype;

//이거바꾸면aler로도 가능함니다.

//console.log;
Debug.loger			= null;
Debug.LEVEL_OFF		= "OFF";
Debug.LEVEL_ALL		= "ALL";
Debug.LEVEL_DEBUG	= "DEBUG";
Debug.LEVEL_INFO	= "INFO";
Debug.LEVEL_WARN	= "WARN";
Debug.LEVEL_ERROR	= "ERROR";
Debug.LEVEL			= Debug.LEVEL_ALL;

Debug.dateformat	= "yyyy-MM-dd HH:mm:ss,SSS";
Debug.format		= "%d [%l]   >>  %m";
//<logformat>%d [%l] %c(%f)(line %n)  >>  %m   %e  </logformat>
/*
%d : date
%l : priority (level)
//%c : class,name  category (where the log is from)
%m : message
//%n : line_
//%e : exception message
//%f : MethodName
//%r : EnterChar
 */

try{
	Debug.loger = function(msg){
		console.log(msg);
	};
/*	if(!this.console){//Console global variable fix for IE
		window.console={
				log:function(){}
		};
	};*/
}catch(e){
/*	Debug.LEVEL=Debug.LEVEL_OFF;
	Debug.loger = function(){};
*/
};


/*
	Debug.loger=function(msg_s){
	Debug.output(msg_s);
	};

	Debug.setOutPutObject = function(obj_o){
		Debug.output = obj_o;
	};
*/




Debug.debug = function (msg_s) {
	this.log(this.LEVEL_DEBUG, msg_s);
};

Debug.info = function (msg_s) {
	this.log(this.LEVEL_INFO, msg_s);
};
Debug.warn = function (msg_s) {
	this.log(this.LEVEL_WARN, msg_s);
};
Debug.error = function (msg_s) {
	this.log(this.LEVEL_ERROR, msg_s);
};


Debug.log = function (level_s,msg_s) {
	var sw=false;
	if(this.LEVEL==this.LEVEL_ALL){
		sw = true;
	}
	else if(this.LEVEL==this.LEVEL_OFF){
		sw = false;
	}
	else if(this.LEVEL==level_s){
		sw = true;
	};
	if(sw){
			if(this.loger){
				var logmsg_s = 	this.format.replace(/(%d|%m|%l)/gi, function($1) {
					        switch ($1) {
					        	case "%m": return msg_s;
					            case "%d": return DateUtil.getDate(Debug.dateformat);
					            case "%l": return level_s;
					         /*   
					          	case "yy": return StringUtil.lpad("0",2,(date_o.getFullYear() % 1000).toString());
					            case "MM": return StringUtil.lpad("0",2,(date_o.getMonth() + 1).toString());
					            case "dd": return StringUtil.lpad("0",2, date_o.getDate().toString());
					            case "E": return weekName[d.getDay()];
					            case "HH": return StringUtil.lpad("0",2, date_o.getHours().toString());
					            case "hh": return StringUtil.lpad("0",2, ((h = date_o.getHours() % 12) ? h : 12).toString());
					            case "mm": return StringUtil.lpad("0",2, date_o.getMinutes().toString());
					            case "ss": return StringUtil.lpad("0",2, date_o.getSeconds().toString());
					            case "SSSS": return StringUtil.lpad("0",4, date_o.getMilliseconds().toString());
					            case "a/p": return date_o.getHours() < 12 ? timeType[0] : timeType[1];
					            */
					            default: return $1;
					        }
					    });
				
				
					try{
						//(function(){this.loger("a")})();
						//(eval(function(){Debug.loger.call(logmsg_s)}))();
						if(Debug.loger){
							eval(Debug.loger(logmsg_s));
						}
					}catch (e) {
					}
			}
	}
};

/*
Debug.good='a';
Debug.prototype.gogo='gogo';
Debug.prototype.setName = function (name) {
    alert(this.gogo+"-----"+this.good+name);
};
Debug.hetName = function (name) {
    alert(this.gogo+this.good+name);
};
*/




//var CallStackUtil = new Object();
function CallStackUtil (){};
CallStackUtil.prototype = new Object();
CallStackUtil.getFunctionName = function(caller_o){
		var f = arguments.callee.caller; 
		if(caller_o) f = f.caller; 
		
		var pat = /^function\s+([a-zA-Z0-9_]+)\s*\(/i; 
		pat.exec(f); 
		return RegExp.$1; 
};

CallStackUtil.getCallFunctionStack = function(caller_o){
	var arr = new Array();
	var caller_at=arguments.callee.caller;
	if(caller_o) caller_at = caller_o; 
	
	
	
	while(true){
		if(caller_at){
			arr.push(caller_at);
			caller_at = caller_at.caller;
		}else{
			return arr;
		}
	}
	return arr;
	
};
CallStackUtil.getCallFunctionNameStack = function(caller_o){
	var arr = CallStackUtil.getCallFunctionStack(caller_o);
	var arr_n = new Array();
	
	var pat = /^function\s+([a-zA-Z0-9_]+)\s*\(/i; 
	for ( var i = 0; i < arr.length; i++) {
		pat.exec(arr[i]); 
		if(RegExp.$1 && RegExp.$1!=""){
			arr_n.push(RegExp.$1); 
		}
	}
	return arr_n;
};







//var ReflectionUtil = new Object();
function ReflectionUtil (){};
ReflectionUtil.prototype = new Object();
ReflectionUtil.execute=function(str_s){
	eval(str_s);
};


function ElementUtil (){};
ElementUtil.prototype = new Object();
ElementUtil.getAttribute = function(element_o,attributename_s){
	return element_o.getAttribute(attributename_s);
};
ElementUtil.setAttribute = function(element_o,attributename_s,attributeval_s){
	return element_o.setAttribute(attributename_s, attributeval_s);
};
//createElement
ElementUtil.createE = function(string_s,document_o){
	if(!document_o){
		document_o=document;
	}
	return document_o.createElement(string_s);
};
ElementUtil.elementToString= function(element_o){
    if(!element_o || !element_o.tagName) return '';
   // var txt, ax, el= document.createElement("div");
    var txt, el= document.createElement("div");
    el.appendChild(element_o.cloneNode(false));
    txt= el.innerHTML;
   /* if(deep){
        ax= txt.indexOf('>')+1;
        txt= txt.substring(0, ax)+element_o.innerHTML+ txt.substring(ax);
    }*/
    el= null;
    return txt;
};

//var ActiveUtil = new Object();
function ActiveUtil (){};
ActiveUtil.prototype = new Object();
ActiveUtil.getObjectStr=function(id_s,clsid_s,codebase_s,version_s){
	var str ='<object ID="'+id_s+'" classid="clsid:' + clsid_s + '" width=0 height=0  codebase='+ codebase_s + '#version=' + version_s +'> </object>';	
	return str;
};
ActiveUtil.getObject=function(id_s,clsid_s,codebase_s,version_s,document_o){
	var str = this.getObjectStr(id_s, clsid_s, codebase_s, version_s);
	return ElementUtil.createE(str,document_o);
};
ActiveUtil.installActive=function(id_s,clsid_s,codebase_s,version_s,document_o){
	if(!document_o){
		document_o=document;
	};
	var str = this.getObjectStr(id_s, clsid_s, codebase_s, version_s);
	document.writeln(str);
	//document.writeln('<object ID="'+id_s+'" classid="clsid:' + clsid_s + '" width=0 height=0 ');
	//document.writeln('codebase='+ codebase_s + '#version=' + version_s +'>');
	//document.writeln('</object>');	
};

function ClipBoardUtil (){};
ClipBoardUtil.prototype = new Object();
ClipBoardUtil.copy= function(string_s){
	window.clipboardData.setData('Text',string_s);
};

function HistoryUtil (){};
HistoryUtil.prototype = new Object();
HistoryUtil.back =function(back_n,histroy_o){
	if(!histroy_o){
		histroy_o=history;
	}
	histroy_o.back();
};


///////////
function XMLUtil (){};
XMLUtil.prototype = new Object();
XMLUtil.getXMLObj = function(data_s){ //쓰지마세요
//	var doc;
//	if (JavaScriptUtil.isInternetExplorer()){
//		doc = new ActiveXObject('Microsoft.XMLDOM');
//		doc.async = 'false';
//		doc.loadXML(data_s);
//	} else {
//	doc = (new DOMParser()).parseFromString(data_s, 'text/xml');
//	}
//	return doc;
};

XMLUtil.getDocument = function(dataOrFileSrc){
	var isFile=true;
	if(dataOrFileSrc.indexOf("<")>=0){  //앞부분이 <시작하면 파일이 아니다.
		isFile=false;
	}
	
	
	// code for IE
	if (window.ActiveXObject) {
		xmlDoc=new ActiveXObject("Microsoft.XMLDOM");
		
		if(isFile){ //파일
			xmlDoc.async=false;
			xmlDoc.load(dataOrFileSrc);
		}else{//아닐경우
			xmlDoc.async = false;
			xmlDoc.loadXML(dataOrFileSrc);
		}
		
		
	}

	// code for Mozilla, Firefox, Opera, etc.
	else if (document.implementation && document.implementation.createDocument) {
		xmlDoc=document.implementation.createDocument("","",null);
		
		if(isFile){ //파일
			xmlDoc.async=false;
			xmlDoc.load(dataOrFileSrc);
		}else{//아닐경우
			xmlDoc = (new DOMParser()).parseFromString(dataOrFileSrc, 'text/xml');
		}
	}
	else {
		//alert('Your browser cannot handle this script');
	}
	return xmlDoc;
};


XMLUtil.transform = function(xml,xsl){
	// code for IE
	if (window.ActiveXObject) {
		ex=xml.transformNode(xsl);
		return ex;
	}
	// code for Mozilla, Firefox, Opera, etc.
	else if (document.implementation && document.implementation.createDocument) {
		xsltProcessor=new XSLTProcessor();
		xsltProcessor.importStylesheet(xsl);
		resultDocument = xsltProcessor.transformToFragment(xml,document);
		var dev = document.createElement("div");
		dev.appendChild(resultDocument);
		return dev.innerHTML;
	}
};



//노드타입(notdType)
//1:ELEMENT_NODE, 2:ATTRIBUTE_NODE, 3:TEXT_NODE, 4:CDATA_SECTION_NODE, 5:NTITY_REFERENCE_NODE,
//6:ENTITY_NODE, 7:PROCESSING_INStrUCTION_NODE, 8:COMMENT_NODE, 9:DOCUMENT_NODE, 10:DOCUMENT_TYPE_NODE
//11:DOCUMENT_FRAGMENT_NODE, 12:NOTATION_NODE
XMLUtil.setAttribute = function(atE,attrName,value){
	var setE = null;
	if(atE.nodeType==9){//document
		setE = atE.documentElement;
	}else if(atE.nodeType==1){
		setE = atE;
	}
	setE.setAttribute(attrName,value);
	return atE;
	
}
XMLUtil.getAttribute = function(atE,attrName){
	var setE = null;
	if(atE.nodeType==9){//document
		setE = atE.documentElement;
	}else if(atE.nodeType==1){
		setE = atE;
	}
	return setE.getAttribute(attrName);
}
XMLUtil.setString = function(doc,elName,value){
	var baseDoc = doc.documentElement;
	var nodes = baseDoc.childNodes;
	var isCreate = true;
	for ( var i = 0; i < nodes.length; i++) {
		var atNode = nodes[i];//atNode.nodeName, atNode.nodeType, atNode.nodeValue atNode.text, atNode.xml
		if(atNode.nodeName==elName && atNode.nodeType==1){
			setAttribute(atNode,"value",value);
			isCreate=false;
			//nodes[i].setAttribute("value",value);//nodes[i].nodeValue=value; 
		}
	}
		
	if(isCreate){
		var ce = doc.createElement(elName);
		setAttribute(ce,"value",value);
		//ce.setAttribute("value",value);//ce.nodeValue=value;	
		baseDoc.appendChild(ce);
	}
	return doc;
};
XMLUtil.getString = function(doc,elName){
	var baseDoc = null;
	if(doc.nodeType==9){//document
		baseDoc = doc.documentElement;
	}else if(doc.nodeType==1){
		baseDoc = doc;
	}
	var nodes = baseDoc.childNodes;
	var getValue=undefined;
	for ( var i = 0; i < nodes.length; i++) {
		var atNode = nodes[i];//atNode.nodeName, atNode.nodeType, atNode.nodeValue atNode.text, atNode.xml
		if(atNode.nodeName==elName && atNode.nodeType==1){
			getValue = getAttribute(atNode,"value");
		}
	}
	return getValue;
}


Vector.prototype = new Object();
Vector.prototype.list = new Array();
Vector.prototype.type = "Vector";
Vector.prototype.size = 0;//사이즈
//Vector.prototype.capacity = 10;//용량  기본용량
Vector.prototype.scaleCapacity = 10;//초가시 늘어나는 용량

function Vector(capacity_size,scale_capacity_size){
	var capacity = 10;
	if(capacity_size!=undefined){
		capacity = capacity_size;
	}
	if(scale_capacity_size!=undefined){
		this.scaleCapacity = scale_capacity_size;
	}
	
};

//Vector 내의 index 위치에 element 객체를 저장한다. 
//o 객체를 Vector 내에 저장하고 그 결과 여부를 true, false로 반환한다. 
Vector.prototype.add = function(indexOrelement,element) {//int index, Object element
	if(arguments.length==2){
		if(this.list.length<=indexOrelement){
			throw "IndexOutOfBoundsException";
		}
		this.list.splice(indexOrelement,0, element); //끼워넣기
	}else if(arguments.length==1){
		this.addElement(indexOrelement)
	}
	//this.size++;
};

//obj 객체를 Vector에 저장한다. 
Vector.prototype.addElement = function(obj){
	this.list.push(obj);
	//this.size++;
};

//Vector의 용량을 반환한다. 
Vector.prototype.capacity = function(){
	if(this.list.length<this.scaleCapacity){
		return this.scaleCapacity;
	}
	//자바스크립트는 별도로 미리 만들어놀필요가 없어서..
	//용량은 는 그냥 맞춰서 그때그때 
	//  (현재크기/스케일) * 스케일 
	// if (현재크기%스케일)>0 +스케일
	var capacity = Math.floor(this.list.length/this.scaleCapacity) * this.scaleCapacity
	if((this.list.length%this.scaleCapacity)>0){
		capacity+=this.scaleCapacity;
	}
	return capacity;
};

//현재 Vector에 elem의 요소가 있는지 검사하여, 있으면 true, 아니면 false를 반환한다. 
Vector.prototype.contains = function(elem){
	for ( var i = 0; i < this.size(); i++) {
		if(elem==this.elementAt(i)){
			return true;
		}
	}
	return false;
};
//Vector 내용을 Object 배열로 복사한다. 
Vector.prototype.copyInto = function(anArray){
	for ( var i = 0; i < this.size(); i++) {
		anArray[i] = this.elementAt(i);
	}
	return anArray;
};

//index 위치의 객체를 반환한다. 
Vector.prototype.elementAt = function(index){
	return this.list[index];
};

//Enumeration elements() 
//이 Vector의 Enumeration을 생성한다. 

//Vector의 내용이 같은지 비교한다. 
Vector.prototype.equals = function(vector){
	if(this.size() == vector.size()){
		for ( var i = 0; i < this.size(); i++) {
			if(this.elementAt(i)!=vector.elementAt(i)){
				return false;
			}
		}
	}else{
		return false;
	}
	
	return true;
};

//Vector의 첫 번째 요소를 Object 형태로 반환한다. 
Vector.prototype.firstElement = function(){
	return this.elementAt(0);
};
//Object get(int index) 
//Vector의 index 번째 요소를 Object 형태로 반환한다. 
//int indexOf(Object elem) 
//elem 객체의 위치를 반환한다. 
//int indexOf(Object elem, int index) 
//index 위치로부터 elem 객체의 위치를 반환한다. 
//void insertElementAt(Object obj, int index) 
//index 위치에 obj를 삽입한다. 
//boolean isEmpty() 
//Vector가 비어 있는지 체크하여 true, false로 반환한다. 

//Vector의 마지막 요소를 Object 형태로 반환한다. 
Vector.prototype.firstElement.lastElement = function(){
	return this.elementAt(this.size());	
};
//int lastIndexOf(Object elem) 
//elem 객체의 마지막 위치로 반환한다. 
//int lastIndexOf(Object elem, int index) 
//index로부터 시작하여 elem객체의 마지막 위치로 반환한다. 
//Object remove(int index) 
//index 위치의 객체를 Vector에서 제거한다. 
//boolean remove(Object o) 
//o 객체를 찾아서 Vector에서 제거한다. 
//void removeAllElements() 
//Vector의 모든 요소를 제거한다. 
//boolean removeElement(Object obj) 
//obj 객체를 Vector에서 제거하고 그 결과를 true, false로 반환한다. 
//void removeElementAt(int index) 
//index 위치의 요소를 제거한다. 
//protected void removeRange(int fromIndex, int toIndex) 
//fromIndex 위치에서부터 toIndex 위치까지의 Vector의 일부 객체에 요소를 제거한다. 
//Object set(int index, Object element) 
//index 위치에 element 객체로 설정하고, 설정 후에는 설정된 객체를 반환한다. 
//void setElementAt(Object obj, int index) 
//index 위치에 element 객체로 설정한다. 
//Vector의 size를 새로 설정한다. 
Vector.prototype.setSize = function(newSize){
	this.list.length=newSize;
};
//Vector의 현재 size를 반환한다. 
Vector.prototype.size = function(){
	return this.list.length;
};

//Vector를 Object 배열로 생성하여 반환한다. 
Vector.prototype.toArray = function(){
	var newArray = new Array();
	for ( var i = 0; i < this.size(); i++) {
		newArray.push(this.elementAt[i]);
	};
	return newArray;
};










function AjaxUtil (){};
AjaxUtil.prototype = new Object();
AjaxUtil.READYSTATE_UNINITIALIZED		= 0;   //객체만 생성되고 아직 초기화 되지 않은 상태(open 메서드가 호출되지 않음)
AjaxUtil.READYSTATE_LOADING				= 1;   //open 메서드가 호출되고 아직 send 메서드가 불리지 않은상태
AjaxUtil.READYSTATE_LOADED				= 3 ;   //send 메서드가 불렸지만 status와 헤더는 도착하지 않은상태
AjaxUtil.READYSTATE_INTERACTIVE			= 4;   //데이터의 일부를 받은상태
AjaxUtil.READYSTATE_COMPLETED			= 5;   //데이터를 전부 받은 상태 완전한 데이터의 이용가능
AjaxUtil.STATE_OK						= 200  ;   //요청성공
AjaxUtil.STATE_FORBIDDEN				= 403  ;   //접근거브
AjaxUtil.STATE_NOTFOUND					= 404  ;   //페이지없어
AjaxUtil.STATE_INTERNALSERVERERROR		= 500  ;   //서버 오류 발생

AjaxUtil.getAjaxObj = function(window_o){
	if(!window_o){
		window_o=window;
	}
  if(window_o.ActiveXObject) {
      try{
    	  return new ActiveXObject("Msxml2.XMLHTTP"); //윈도우 익스플로러일경우
      } catch(e){
             try {
                   return new ActiveXObject("Microsoft.XMLHTTP"); //윈도우 익스플로러 옛날 버전경우
             } catch(e1) {
                   return null;
             }
      }
   } else if (window_o.XMLHttpRequest) {
          return new XMLHttpRequest(); //윈도우 익스플로러 외 다른         익스플로러 일경우!!

   } else {
          return null;
   }
};

AjaxUtil.getAjaxClass = function(window_o){
	if(!window_o){
		window_o=window;
	}
  if(window_o.ActiveXObject) {
      try{
    	  return ActiveXObject; //윈도우 익스플로러일경우
      } catch(e){
             try {
                   return ActiveXObject; //윈도우 익스플로러 옛날 버전경우
             } catch(e1) {
                   return null;
             }
      }
   } else if (window_o.XMLHttpRequest) {
          return XMLHttpRequest; //윈도우 익스플로러 외 다른         익스플로러 일경우!!

   } else {
          return null;
   }
};

//이거쓰지마세요-_- 별로 객체적이지 않음   아래 prototype으로 만들어논  AjaxK 사용하길
/*
AjaxUtil.ajax=function(param_o){
	var dparam = {
			url : '',
			type :'POST',
			data : null,
			dataType:"TEXT",
			async:true,
			autoStart:true,
			loop:false,
			onBeforeProcess:function(){},
			onSuccess:function(data,readyState,status){},
			onError:function(data,readyState,status){},
			onComplete:function(){},
			onMonitor:function(data,readyState,status){}
		};
	var param 		= JavaScriptUtil.extend(dparam,param_o);
	param.type 		= StringUtil.upper(param.type);
	param.dataType 	= StringUtil.upper(param.dataType);
	param.response	= false;
	param.success	= 0;
	param.error		= 0;
	param.onReceive	= function(){
		if(this.response ){//한번했는데 두번 들어올수있으니.
			return;
		}
		if (this.request.readyState == AjaxUtil.READYSTATE_INTERACTIVE || this.request.readyState == AjaxUtil.READYSTATE_COMPLETED) {
            if (this.request.status == AjaxUtil.STATE_OK) {
            	var indata =null;
            	if(this.dataType=='TEXT'){
            		indata = this.request.responseText;
            	}else if(this.dataType=='JSON'){
            		indata = eval("(" + this.request.responseText + ")");
            	}else if(this.dataType=='XML'){
            		//indata = XMLUtil.getXMLObj(this.request.responseText);
            		indata = this.request.responseXML;
            		//var xdoc = request.responseXML;
            		//var value = xdoc.getElementsByTagName("value");
            	}
            	this.success++;
            	this.onSuccess(indata,this.request.readyState,this.request.status);
            }else{
            	this.error++;
            	this.onError(this.request.responseText,this.request.readyState,this.request.status);
            }
            this.onComplete();
            param.response=true;
            if(this.loop){
            	this.start();
            }
		}
		//loop!~~
		if(this.request.readyState>3){
			this.onMonitor(this.request.responseText,this.request.readyState,this.request.status);
		}else{
			this.onMonitor(null,this.request.readyState,null);
		}
		
	};
	
	if(!JavaScriptUtil.isInternetExplorer()){
		param.request 	= AjaxUtil.getAjaxObj();
		//this를 위해.
		param.request.onreadystatechange = function(){
			param.onReceive.apply(param);
		};
	}

	param.start = function(){
		this.response = false;
		this.onBeforeProcess();
		var concatenateData = null;
		var applyURL=null;
		if(this.type=='GET' && this.data){
			concatenateData=null;
			applyURL = this.url + '?'+ConvertingUtil.concatenateToParameter(this.data);
		}else if(this.type=='POST' && this.data){
			applyURL=this.url;
			concatenateData=ConvertingUtil.concatenateToParameter(this.data);
			// var param = "userid="+userid+"&passwd="+passwd; //POST방식으로 넘길 파라미터 설정 (키1=값1&키2=값3&키3=값3.....key=value식으로 여러개일 겨우 '&;구분하여 설정함)
		};
		if(JavaScriptUtil.isInternetExplorer()){
			this.request 	= AjaxUtil.getAjaxObj();
			param.request.onreadystatechange = function(){
				Receive.onRequest.apply(param);
			};
		}
		this.request.open(this.type, applyURL, this.async);
		this.request.setRequestHeader("Content-Type","application/x-www-form-urlencoded;charset=UTF-8");
		this.request.setRequestHeader("Cache-Control", "no-cache, must-revalidate");
		this.request.setRequestHeader("Pragma", "no-cache");
		this.request.send(concatenateData);
	};
	param.stop=function(){
		this.response=true;
	};
	if(param.autoStart){
		param.start();
	}
	return param;
};

*/
/*
애플릿
    <Applet code="CertUploaderApplet" MAYSCRIPT width="666" height="150" >
		<PARAM NAME = ARCHIVE VALUE = "/common/popup/AdminLogin/CertUploaderApplet.jar" >
		<PARAM NAME = "sel0_size" VALUE="35">
		<PARAM NAME = "sel1_size" VALUE="500">
		<PARAM NAME = "sel2_size" VALUE="105">
		<PARAM NAME = "appSize_w" VALUE="666">
		<PARAM NAME = "appSize_h" VALUE="150">

		<PARAM NAME = "ServerName" VALUE="bptest.shinhan.com">
		<PARAM NAME = "ServerPort" VALUE="80">
		<PARAM NAME = "action" VALUE="/admin.pb">
		<PARAM NAME = "a" VALUE="mng.user.CertBPUploadApp">
		<PARAM NAME = "c" VALUE="1002">
		<PARAM NAME = "gubun" VALUE="Real"><!-- 반영시에는 Real로 수정 -->
	</Applet>


 */





////////// 객체 prototype




//creatClass
AjaxK.prototype = new Object();
//AjaxK.prototype	= AjaxUtil.getAjaxObj();
//AjaxK.prototype.constructor	=AjaxK;

AjaxK.READYSTATE_UNINITIALIZED 			= 0; //객체만 생성되고 아직 초기화 되지 않은 상태(open 메서드가 호출되지 않음)
AjaxK.READYSTATE_LOADING 				= 1; //open 메서드가 호출되고 아직 send 메서드가 불리지 않은상태
AjaxK.READYSTATE_LOADED 					= 3; //send 메서드가 불렸지만 status와 헤더는 도착하지 않은상태
AjaxK.READYSTATE_INTERACTIVE 			= 4; //데이터의 일부를 받은상태
AjaxK.READYSTATE_COMPLETED				= 5; //데이터를 전부 받은 상태 완전한 데이터의 이용가능
AjaxK.STATE_OK									= 200; //요청성공
AjaxK.STATE_FORBIDDEN						= 403; //접근거브
AjaxK.STATE_NOTFOUND						= 404; //페이지없어
AjaxK.STATE_INTERNALSERVERERROR		= 500; //서버 오류 발생



AjaxK.prototype.context					= null;
AjaxK.prototype.name					= null;
AjaxK.prototype.requestObj				= null;

//param-----start
AjaxK.prototype.url						= "";
AjaxK.prototype.type					= "POST";
AjaxK.prototype.data					= null,
AjaxK.prototype.dataType				= "TEXT";
AjaxK.prototype.async					= true;
AjaxK.prototype.autoStart				= true;
AjaxK.prototype.loop					= false;
AjaxK.prototype.onBeforeProcess			= function(){};
AjaxK.prototype.onSuccess				= function(data,readyState,status){};
AjaxK.prototype.onError					= function(data,readyState,status){};
AjaxK.prototype.onComplete				= function(){};
AjaxK.prototype.onMonitor				= function(readyState,status,data){};
AjaxK.prototype.outparam				= {
		url : '',
		type :'POST',
		data : null,
		dataType:"TEXT",
		async:true,
		autoStart:true,
		loop:false,
		onBeforeProcess:function(){},
		onSuccess:function(data,readyState,status){},
		onError:function(data,readyState,status){},
		onComplete:function(){},
		onMonitor:function(data,readyState,status){}
};
//param------end

AjaxK.prototype.successCnt 	= 0;
AjaxK.prototype.errorCnt 	= 0;
AjaxK.prototype.responsed 	= false;

/* 익스경우 이렇게 상속자체를 못한다 -_-8에서 아오ㅉ댜ㅓㅁ자ㅣㅇㅁㅇ
AjaxRequest.prototype=AjaxUtil.getAjaxObj();
AjaxRequest.prototype.constructor = AjaxRequest;
AjaxRequest.prototype.ajaxk=null;
AjaxRequest.prototype.onreadystatechange=function(){
	alert(1);
};

function AjaxRequest(ajaxk_o){
	this.ajaxk=ajaxk_o;
};
*/
AjaxK.prototype.onreadystatechange = function(){};
function AjaxK(param_o,name_s){
	
	if(param_o){
		this.setParam(param_o);
	}else{
		throw "no input param obj";
		return;
	}
	if(name_s){
		this.setName(name_s);
	}
	
	this.context = this;
	this.outparam.ajaxk = this;//리터널을위해
	this.requestObj = AjaxUtil.getAjaxObj();//new AjaxRequest(this);
	this.requestObj.onreadystatechange = this.onreadystatechange = function(){
		param_o.ajaxk.onReceive.call(param_o.ajaxk);//여기서 this를알수가없으니.ㅠㅠ
	};

	if(this.autoStart){
		this.start();
	}
	
	
}
AjaxK.prototype.onReceive = function(){
	if(this.responsed){//한번했는데 두번 들어올수있으니.
		return;
	}

	if (this.requestObj.readyState == AjaxK.READYSTATE_INTERACTIVE || this.requestObj.readyState == AjaxK.READYSTATE_COMPLETED) {
        if (this.requestObj.status == AjaxK.STATE_OK) {
        	var indata = null;
        	if(StringUtil.upper(this.dataType) == "TEXT"){
        		indata = this.requestObj.responseText;
        	}else if(StringUtil.upper(this.dataType) == "JSON"){
        		indata = eval("(" + this.requestObj.responseText + ")");
        	}else if(StringUtil.upper(this.dataType) == "XML"){
        		//indata = XMLUtil.getXMLObj(this.request.responseText);
        		indata = this.requestObj.responseXML;
        	}
        	this.successCnt++;
        	this.onSuccess(indata,this.requestObj.readyState,this.requestObj.status);
        }else{
        	this.errorCnt++;
        	this.onError(this.requestObj.responseText,this.requestObj.readyState,this.requestObj.status);
        }
        this.onComplete();
        this.responsed = true;
        if(this.loop){
        	this.start();
        }
	}
	
	
	//loop!~~
	if(this.requestObj.readyState > 3){
		this.onMonitor(this.requestObj.readyState,this.requestObj.status,this.requestObj.responseText);
	}else{
		this.onMonitor(this.requestObj.readyState,null,null);
	}
};

AjaxK.prototype.start = function(){
	this.responsed = false;
	this.onBeforeProcess();
	var concatenateData = null;
	var applyURL = this.url;
	if(StringUtil.upper(this.type)=="GET" && this.data){
		applyURL += "?"+ConvertingUtil.concatenateToParameter( JavaScriptUtil.isFunction(this.data)?this.data(): this.data );
	}else if(StringUtil.upper(this.type)=="POST" && this.data){
		concatenateData=ConvertingUtil.concatenateToParameter( JavaScriptUtil.isFunction(this.data)?this.data(): this.data );
	};
	

	//익스경우 다시 생성해줘야된다 그지같다  크롬같은경우 재사용가능한데-_-
	if(JavaScriptUtil.isInternetExplorer() && this.requestObj.readyState > AjaxK.READYSTATE_UNINITIALIZED  ){
		this.requestObj = AjaxUtil.getAjaxObj(); 
		this.requestObj.onreadystatechange = this.onreadystatechange;
	}
	
	
	this.requestObj.open(this.type, applyURL, this.async);
	this.requestObj.setRequestHeader("Content-Type","application/x-www-form-urlencoded;charset=UTF-8");
	this.requestObj.setRequestHeader("Cache-Control", "no-cache, must-revalidate");
	this.requestObj.setRequestHeader("Pragma", "no-cache");
	this.requestObj.send(concatenateData);
};
AjaxK.prototype.send = function(param_o){
	if(param_o){
		this.setParam(param_o);
	}
	this.start();
};


AjaxK.prototype.stop = function(){
	this.responsed = true;
};
AjaxK.prototype.setName = function(name_s){
	this.name = name_s;
};
AjaxK.prototype.setParam = function(param_o){
    for (var property in param_o) {
    	this[property] = param_o[property]; 
    };
    this.outparam = JavaScriptUtil.extend(this.outparam,param_o);
};
AjaxK.prototype.setData = function(data_o){
	this.data = data_o;
};









//include Sizzle.js
SelectorK.prototype = new Object();
SelectorK.prototype.context = null;
SelectorK.prototype.selector = null;
SelectorK.prototype.list = new Array();
function SelectorK(selector_s,context_e){
	if(selector_s){
		this.engin(selector_s,context_e);
	}
};
SelectorK.prototype.find = function(selector_s,context_e){
	var findlist = new Array();
	this.each(function(index){
		findlist = findlist.concat(Sizzle(selector_s,this));
	});
	var  selectork = new SelectorK();
	selectork.list = findlist;
	selectork.selector = this.selector+" "+selector_s;
	return selectork;
};
SelectorK.prototype.engin = function(selector_s,context_e){
	this.selector = selector_s;
	this.context = context_e;
	this.list = Sizzle(this.selector,this.context);
};
SelectorK.prototype.each = function(function_f){
	for ( var i = 0; i < this.list.length; i++){
		function_f.call(this.list[i],i);
	}
};
SelectorK.prototype.get = function(index_n){
	this.list[i];
};





//오토블 짱인듯.
Autoble.prototype = new Object();
Autoble.prototype.list = new Array();
Autoble.prototype.val= undefined;
Autoble.prototype.beforeCallBack =  function(object,value){};;
Autoble.prototype.afterCallBack = function(object,value){};
Autoble.prototype.filter = function(object,value){  object.value = value};
function Autoble(list){
	if(list){
		this.list = list;
	}
};
Autoble.prototype.value = function(value){
	
	this.val=value;
	if(this.list){
		for ( var i = 0; i < this.list.length; i++){
			var object = this.list[i];
			if(this.beforeCallBack){
				this.beforeCallBack(object, this.val);
			}
			
			this.filter(object,this.val);
			
			if(this.afterCallBack){
				this.afterCallBack(object, this.val);
			}
		}
	}
};






///////////prototype 확장
Array.prototype.distinct = function(){
	 var a = {};
	 for(var i=0; i <this.length; i++){
	  if(typeof a[this[i]] == "undefined")
	   a[this[i]] = 1;
	 }
	 this.length = 0;
	 for(var i in a)
	  this[this.length] = i;
	 return this;
};









//uiflow

//creatClass
UiFlow.prototype = new Object();
//param-----start
UiFlow.prototype.context			= undefined;
UiFlow.prototype.name				= undefined;
UiFlow.prototype.onBeforeProcess	= function(){};
UiFlow.prototype.onViewSetting		= function(){};
UiFlow.prototype.onDataSetting		= function(){};
UiFlow.prototype.onAddListener		= function(){};
UiFlow.prototype.onAction			= function(){};
UiFlow.prototype.onAfterProcess		= function(){};
UiFlow.prototype.dispose			= function(){};
UiFlow.prototype.autoStart			= function(){};
UiFlow.prototype.outparam				= {
		onBeforeProcess : function() {
		},
		onViewSetting : function() {
		},
		onDataSetting : function() {
		},
		onAddListener : function() {
		},
		onAction : function(gb) {
		},
		onAfterProcess : function() {
		},
		dispose : function() {
		},
		autoStart : false
	};
//param------end
UiFlow.prototype.onreadystatechange = function(){};
function UiFlow(param_o,name_s){
	
	if(param_o){
		this.setParam(param_o);
	}else{
		throw "no input param obj";
		return;
	}
	if(name_s){
		this.setName(name_s);
	}
	
	this.context = this;
	if(this.autoStart){
		this.start();
	}
}


UiFlow.prototype.start = function(){
	EventUtil.addUnloadEventListener(this.dispose);
	this.onBeforeProcess();
	this.onViewSetting();
	this.onDataSetting();
	this.onAddListener();
	this.onAfterProcess();
};
UiFlow.prototype.setName = function(name_s){
	this.name = name_s;
};
UiFlow.prototype.setParam = function(param_o){
  for (var property in param_o) {
  	this[property] = param_o[property]; 
  };
  this.outparam = JavaScriptUtil.extend(this.outparam,param_o);
};




















/*
Date.prototype.format = function(f) {
    if (!this.valueOf()) return " ";
 
    var weekName = ["일요일", "월요일", "화요일", "수요일", "목요일", "금요일", "토요일"];
    var d = this;
     
    return f.replace(/(yyyy|yy|MM|dd|E|hh|mm|ss|a\/p)/gi, function($1) {
        switch ($1) {
            case "yyyy": return d.getFullYear();
            case "yy": return (d.getFullYear() % 1000).zf(2);
            case "MM": return (d.getMonth() + 1).zf(2);
            case "dd": return d.getDate().zf(2);
            case "E": return weekName[d.getDay()];
            case "HH": return d.getHours().zf(2);
            case "hh": return ((h = d.getHours() % 12) ? h : 12).zf(2);
            case "mm": return d.getMinutes().zf(2);
            case "ss": return d.getSeconds().zf(2);
            case "a/p": return d.getHours() < 12 ? "오전" : "오후";
            default: return $1;
        }
    });
};
 
String.prototype.string = function(len){var s = '', i = 0; while (i++ < len) { s += this; } return s;};
String.prototype.zf = function(len){return "0".string(len - this.length) + this;};
Number.prototype.zf = function(len){return this.toString().zf(len);};

 */


/////////class
/**
 * Javascript SimpleDateFormat Class
	 yyyy(year) MM(month) dd(date) HH or hh(24hours/12hours) mm(minutes) ss(seconds)
	 
	 ex) alert(new com.kdarkdev.util.SimpleDateFormat('yyyy-MM-dd HH:mm:ss').format(new Date()));
 */
/* use 
var sdf = com.kdarkdev.util.SimpleDateFormat('yyyy-MM-dd hh시 mm분 ss초'); 
//포맷지정    
alert(sdf.format(new Date())); //출력
*/
/*
var khh = (khh == undefined)?{}:khh;
khh.date = (khh.date == undefined)?{}:khh.date; 
//khh.date.util = (com.date.util == undefined)?{}:khh.date.util;


khh.date.SimpleDateFormat = function(formatString_) {
	if(formatString_ == undefined || formatString_ == '') {
		formatString = 'yyyyMMdd';
	} else {
		formatString = formatString_;
	}
	
	//private Method
	plusZero = function (value_, zeroNumber) {
		var zero = '';
		var value = value_.toString();
		if(value.length<zeroNumber) {
			for(var i=0; i<zeroNumber-value.length; i++) {
				zero+='0';
			}
			
		}
		return zero+value;
	};
};

khh.date.SimpleDateFormat.prototype = {
	 
	format: function(date){
		var dateRegex = /(y{0,4})([^yMdHhms]*)(M{0,2})([^yMdHhms]*)(d{0,2})([^yMdHhms]*)([Hh]{0,4})([^yMdHhms]*)(m{0,2})([^yMdHhms]*)(s{0,2})([^yMdHhms]*)/g;
		var dateRegexArray = dateRegex.exec(formatString);
		
		var yearFormat = dateRegexArray[1];
		var monthFormat = dateRegexArray[3];
		var dayFormat = dateRegexArray[5];
		var hourFormat = dateRegexArray[7];
		var minuteFormat = dateRegexArray[9];
		var secondFormat = dateRegexArray[11];
		
		var space1 = dateRegexArray[2].toString();
		var space2 = dateRegexArray[4].toString();
		var space3 = dateRegexArray[6].toString();
		var space4 = dateRegexArray[8].toString();
		var space5 = dateRegexArray[10].toString();
		var space6 = dateRegexArray[12].toString();
		
		var year = plusZero(date.getFullYear(), yearFormat.length);
		var month = plusZero(date.getMonth() + 1, monthFormat.length);
		var day = plusZero(date.getDate(), dayFormat.length);
		var hour = '';
		if (hourFormat == 'HH' || hourFormat == 'H') {
			hour = plusZero(date.getHours(), hourFormat.length);
		}
		else 
			if ((hourFormat == 'hh' || hourFormat == 'h') && date.getHours() > 12) {
				hour = plusZero(date.getHours() - 12, hourFormat.length);
			}
			else 
				if (hourFormat == 'hhHH') {
					hour = plusZero(date.getHours() - 12, hourFormat.length - 2) + plusZero(date.getHours(), hourFormat.length - 2);
				}
				else 
					if (hourFormat == 'HHhh') {
						hour = plusZero(date.getHours(), hourFormat.length - 2) + plusZero(date.getHours() - 12, hourFormat.length - 2);
					}
					else {
						hour = plusZero(date.getHours(), hourFormat.length);
					}
		
		var minute = plusZero(date.getMinutes(), minuteFormat.length);
		var second = plusZero(date.getSeconds(), secondFormat.length);
		
		var toDay = '';
		if (yearFormat.length > 0) {
			toDay += year;
		}
		if (space1.length > 0) {
			toDay += space1;
		}
		if (monthFormat.length > 0) {
			toDay += month;
		}
		if (space2.length > 0) {
			toDay += space2;
		}
		if (dayFormat.length > 0) {
			toDay += day;
		}
		if (space3.length > 0) {
			toDay += space3;
		}
		if (hourFormat.length > 0) {
			toDay += hour;
		}
		if (space4.length > 0) {
			toDay += space4;
		}
		if (minuteFormat.length > 0) {
			toDay += minute;
		}
		if (space5.length > 0) {
			toDay += space5;
		}
		if (secondFormat.length > 0) {
			toDay += second;
		}
		if (space6.length > 0) {
			toDay += space6;
		}
		
		return toDay;
	} 
};

*/




