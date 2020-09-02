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
| id         | bigint | 
| userName   | string | 
| moviesName | string | 
| moviesLink | string |

