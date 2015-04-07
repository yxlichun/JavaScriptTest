var Combobox = {
	/*
	 * combobox数据字典下拉框
	 * itemCode 查No.2文档
	 * selectorId combobox的id 唯一且不带#
	 * type 可选，为1时表示使用了jquery easyUI的combobox控件，为空或为0表示使用了原生的select
	 * 
	 * 生成的下拉框以字典编号由小到大排序
	 */
	getDictAllItems: function(itemCode, selectorId, type){
		$.ajax({ 
			url: 'data_dict/listAllByCode.action?itemCode=' + itemCode, 
			async: false, 
			success: function(data){
				if(type == 0 || type == null){
					var optionsList = [];
					var option = '<option value="">---请选择---</option>';					
					optionsList.push(option);
					for (var i = 0; i < data.length; i++) {						
						option = '<option value="' + data[i]["itemCode"] + '">' + data[i]["itemName"] + '</option>';
						optionsList.push(option);
					}
					//按照字典序排序
					optionsList = optionsList.sort(function(a,b){
						var re = /value="(\d*)"/;
						re.test(a);
						a = parseInt(RegExp.$1);
						re.test(b);
						b = parseInt(RegExp.$1);
						return a-b;
					});	
					$("#" + selectorId).html(optionsList.join(""));
				}else if(type == 1){
					$("#" + selectorId).combobox({   
						valueField:'id',   
						textField:'text'  
					});  
					var dataItems = [];
					dataItems.push({ "text": "---请选择---", "id": "" });
					for (var i = 0; i < data.length; i++) {
						dataItems.push({ "text": data[i]["itemName"], "id": data[i]["itemCode"] });
					}
					//按照字典序排序
					dataItems = dataItems.sort(function(a,b){
						a = parseInt(a.id);
						b = parseInt(b.id);
						return a-b;
					});	
					$("#" + selectorId).combobox("loadData", dataItems);
				}		
			}
		});
	}
}