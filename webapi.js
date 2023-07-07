const express = require('express');
const app = express();	// app為express的應用實例
const bodyParser = require('body-parser');
app.use(bodyParser.json());//用來解析req的body
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');// 設置允許的來源
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');// 設置允許的請求方法
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');// 設置允許的請求標頭
  res.setHeader('Access-Control-Allow-Credentials', 'true');// 允許跨域請求攜帶認證資訊（如 cookie）
  next();// 繼續處理下一個中介軟體或路由處理函式
});

const { MongoClient, ServerApiVersion } = require("mongodb");
const uri = "mongodb://127.0.0.1:27017";//localhost會出錯
const client = new MongoClient(uri);

app.get('/',function(req,res){//http://localhost:3001/會看到的資料
	res.status(200).send('JS server is running');
})

app.get('/api/member',function(req,res){//全查 完成
	async function run() {//非同步程式async/await
  		try {
    		await client.connect();//連接
    		const database = client.db("ntut");//db名
    		const coll = database.collection("members");//集合名
    		const findResult =await coll.find({},{}).toArray();//查詢所有 沒有條件 轉成array
			//await findResult.forEach(console.dir);//結果一一塞進console.dir
			res.status(200).send(findResult);//直接丟回用戶端
		} 
		finally {
    		await client.close();//結束連線
  		}
	}
	run().catch(console.dir);//catch 在try後處理例外情況 這裡真正調用run
})

app.get('/api/member/:uid',function(req,res){//單查 完成
	async function run() {
        try {
            await client.connect();
            const database = client.db("ntut");
            const coll = database.collection("members");
            const findOneResult = await coll.findOne({uid: req.params.uid}); // 使用req.params.uid獲取路由參數
            if (findOneResult) { // 成功找到該成員
            	res.status(200).send(findOneResult); // 返回該成員
        	} else { // 找不到該成員
        	const errorMessage = `uid ${req.params.uid} member not found.`;	
        	const errorResponse = { error: errorMessage };
            res.status(404).send(JSON.stringify(errorResponse));
        	}  
        } 
        finally {
            await client.close();
        }
    }
    run().catch(console.dir);
})

app.post('/api/member/',function(req,res){//新增 完成
	async function run() {
    	try {
      		await client.connect(); //連接
      		const database = client.db("ntut"); //db名
      		const coll = database.collection("members"); //集合名
      		const member = req.body; //從request中獲取新增的文件
      		const uid = member.uid;
      		const findOneResult = await coll.findOne({uid: uid}); // 使用req.params.uid獲取路由參數
            if (findOneResult) { // 成功找到該成員
            	const errorMessage = `uid ${uid} member already exists.`;
				const errorResponse = { error: errorMessage };
      			res.status(409).send(JSON.stringify(errorResponse));
        	} 
        	else { // 找不到該成員
            	const result = await coll.insertOne(member); //插入文檔並獲取結果
      			res.status(200).send(result); //發送結果給客戶端
        	}  
    	} 
    	finally {
      		await client.close(); //關閉連接
    	}
  }
  run().catch(console.dir); //執行異步函數
})

app.delete('/api/member/:uid',function(req,res){//刪
	async function run() {
        try {
            await client.connect();
            const database = client.db("ntut");
            const coll = database.collection("members");
            const deleteResult = await coll.deleteOne({uid: req.params.uid}); // 使用req.params.uid獲取路由參數
            if (deleteResult.deletedCount === 1) {
                const successResponse = { success: 1 };
                res.status(200).send(JSON.stringify(successResponse));
            } else {
            	const errorMessage = `uid ${req.params.uid} member not found.`;
				const errorResponse = { error: errorMessage };
      			res.status(404).send(JSON.stringify(errorResponse));
            }
        } 
        finally {
            await client.close();
        }
    }
    run().catch(console.dir);
})

app.put('/api/member/',function(req,res){//修改 完成
	const member = req.body;
  	const uid = member.uid;
  	const name = member.name;
  	const phone = member.phone;
  	async function run() {
    	try {
      		await client.connect();
      		const database = client.db("ntut");
      		const coll = database.collection("members");
      		const findOneResult = await coll.findOne({uid: uid}); // 使用req.params.uid獲取路由參數
            if (findOneResult) { // 成功找到該成員
            	const result = await coll.updateOne({uid: uid}, {$set: {name: name, phone: phone }});//
      			const successResponse = { success: 1 };
                res.status(200).send(JSON.stringify(successResponse));
        	} 
        	else { // 找不到該成員
            	const errorMessage = `uid ${uid} member not found.`;
				const errorResponse = { error: errorMessage };
      			res.status(404).send(JSON.stringify(errorResponse));
        	}  
    	} 
    	finally {
      		await client.close();
    	}
  	}
  	run().catch(console.dir);
})	

app.listen('3001',function(){
	console.log('Server Running...')//顯示在下面視窗
})