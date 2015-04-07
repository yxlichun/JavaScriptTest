public static List<JSONObject> listToJsonStringList(List<Contract> contracts){
		Iterator<Contract> it = contracts.iterator(); 
		List<JSONObject> jsonList = new ArrayList<JSONObject>();		
		while(it.hasNext()){   
            jsonList.add(objectToJson(Contract.class,it.next()));   
        }  
    	return jsonList;
	}
	
	public static JSONObject objectToJson(Class model, Contract contract){
		JSONObject jsonObj  = new JSONObject();
		Map<String, String> fieldAndGetMethodMap = getObjectAllField(model);
		for (String key : fieldAndGetMethodMap.keySet()) {
			Method m;
			try {
				m = model.getClass().getMethod(fieldAndGetMethodMap.get(key));
				jsonObj.put(key, m.invoke(model));
			} catch (NoSuchMethodException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			} catch (SecurityException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			} catch (IllegalAccessException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			} catch (IllegalArgumentException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			} catch (InvocationTargetException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
						   
		}		
    	return	jsonObj;
	}
	public static Map<String, String> getObjectAllField(Class model){
		Field[] field = model.getClass().getDeclaredFields(); // 获取实体类的所有属性，返回Field数组
		Map<String, String> fieldAndGetMethodMap = new HashMap<String,String>();
		String name = "";
		String methodName = "";
        try {
            for (int j = 0; j < field.length; j++) { // 遍历所有属性
                name = field[j].getName(); // 获取属性的名字
                methodName = "get" + name.substring(0, 1).toUpperCase() + name.substring(1); // 将属性的首字符大写，方便构造get，set方法
                String type = field[j].getGenericType().toString(); // 获取属性的类型
                if (type.equals("class java.lang.String")||
                		type.equals("class java.lang.Integer")||
                		type.equals("class java.lang.Boolean")||
                		type.equals("class java.util.Date")) {
                	fieldAndGetMethodMap.put(name, methodName);
                }
                              
            }
        } catch (Exception e) {
            e.printStackTrace();
        } 
        return fieldAndGetMethodMap;
	}


	public static List<JSONObject> listToJsonStringList(List<Contract> contracts,List<String> list ){
		Iterator<Contract> itContract = contracts.iterator(); 
		List<JSONObject> jsonList = new ArrayList<JSONObject>();		
		while(itContract.hasNext()){   
            jsonList.add(objectToJson(itContract.next(),list));   
        }		
    	return jsonList;
	}
	public static JSONObject objectToJson(Contract contract, List<String> list){
		JSONObject jsonObj  = new JSONObject();
		jsonObj.put("contract",contract);
		Iterator<String> it = list.iterator(); 
		while(it.hasNext()){   
			jsonObj.put(it.next(),"劳动合同"); 
        }
		return jsonObj;
	}
	