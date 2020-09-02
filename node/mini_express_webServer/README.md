## 需求  
展示豆瓣评分最高的电影  
用户从中选取最喜欢的电影并展示  
## 前端  
以列表的形式展示  
## 后端  
### 设计接口  
1. 查  
    + 获取所有的电影  
    ```js
    "/api/v1/getAllMovies?page=1&size=10"
    ```
    + 获取用户最喜欢的电影 
    ```js
    "/api/v1/getUserLike/:id"
    ``` 
2. 增  
    + 增加用户喜欢的电影  
    ```js
    "/api/v1/addUserLike"
    ``` 
3. 改  
    + 修改用户喜欢的电影  
    ```js
    "/api/v1/motifyUserLike"
    ``` 
4. 删  
    + 删除用户喜欢的电影 
    ```js
    "/api/v1/deleteUserLike"
    ```  
### 数据库表设计

表名 userLike  
| 字段名      | 类型
| :-----     | ----:  |
| userName   | string | 
| moviesName | string | 
| moviesLink | string |


## 启动开发

1.  前置条件 node 版本12.18,npm 版本6.14，MongoDB版本4.4
2.  安装body-parser，express，mongoose，nodemon
    + body-parser：用于解析URL
    + express：使用最广泛的node.js框架
    + mongoose：用于操作MongoDB
    + nodemon：用于本地开发时的热更新，不用每次修改后重启服务
3. 后端项目目录结构如下
    model---------用于存放数据库模型
    routes--------用于存放api
    index.js---------项目入口
    
