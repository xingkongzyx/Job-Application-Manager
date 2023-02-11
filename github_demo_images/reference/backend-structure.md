#### 因为后端使用的是 ES6 module, 所以 import 的语法是与前端不同的, 导入 module 时必须要加上 js 后缀

### Auth Controller: register, login, updateUser

-   authRouter

    -   router.route('/register').post(register);
    -   router.route('/login').post(login);

        -   register 和 login 都是从 req.body 获取传入的 name/email/password, 然后进行 database side 的比对检验, 如果有问题 throw custom error. 如果没有 error, 最后返回

        ```js
        res.json({
            token,
            user: foundUser,
            location: foundUser.location,
        });
        ```

    -   router.route('/updateUser').patch(updateUser);

        -   对于这个 route 我们改为: `router.route("/updateUser").patch(authenticateUser, updateUser);` 代表在进入 updateUser route handler 之前必须检验 request 的 header 包含有正确的 token，否则不允许进入

        ```js
        res.status(200).json({
            token,
            user: updatedUser,
            location: updatedUser.location,
        });
        ```

    -   authenticateUser middleWare

        -   only the user who actually has the data can have access to view the profile and jobs page, etc, we will check the token.

        -   创建一个 middleware 叫做 authenticateUser, if the token is not valid, or it's not present, then we'll send back the error. And we will log out the user on a frontend as well.
        -   `router.route("/updateUser").patch(authenticateUser, updateUser);`

-   app.use('/api/v1/auth', authRouter);

### Jobs Controller: createJob, deleteJob, getAllJobs, updateJob, showStats

-   jobsRouter
    -   router.route('/').post(createJob).get(getAllJobs);
        -   createJob 返回的是
            ```json
                {
                    "job": {
                        "company": "Google",
                        "position": "software engineer",
                        "status": "Applied",
                        "jobType": "full-time",
                        "jobLocation": "US",
                        "createdBy": "63d99e85a980dcd927901634",
                        "_id": "63dcbc212b94fe197a6bd8ee",
                        "createdAt": "2023-02-03T07:47:45.542Z",
                        "updatedAt": "2023-02-03T07:47:45.542Z",
                        "__v": 0
                    }
                }
            ````
    -   // place before :id, 防止永远无法到达 ":id"
    -   router.route('/stats').get(showStats);
    -   router.route('/:id').delete(deleteJob).patch(updateJob);
-   app.use('/api/v1/jobs', jobsRouter);

### User model, collection name is User

-   contains: name, email, password, lastName, location
-   对于 password, 我们不希望将他发送到 frontend, 所以添加了 select: false.
-   添加 UserSchema.pre 确保在注册或者更新用户并保存在数据库之前将 password 进行 hash
-   添加了 instance method createJWT 对 password 进行 jwt 加密
-   添加了 instance method validatePassword 对 传入的 password 以及数据库中存储的 password 进行比较，从而判断是否能够正确登录

### Job model, collection name is Job

-   contains: company, position, status, jobType, jobLocation, createdBy

### Error handling:

```js
class CustomAPIError extends Error {
    constructor(message) {
        super(message);
    }
}
```

-   And we have BadRequestError, NotFoundError extends CustomAPIError, 并且可以自己定义 error message

### How do JSON Web Tokens work?

In authentication, when the user successfully logs in using their credentials, a JSON Web Token will be returned. Since tokens are credentials, great care must be taken to prevent security issues. In general, you should not keep tokens longer than required.

You also should not store sensitive session data in browser storage due to lack of security.

Whenever the user wants to access a protected route or resource, the user agent should send the JWT, typically in the "Authorization" header using the "Bearer" schema. The content of the header should look like the following:
`Authorization: Bearer <token>`
This can be, in certain cases, a stateless authorization mechanism. The server's protected routes will check for a valid JWT in the Authorization header, and if it's present, the user will be allowed to access protected resources. If the JWT contains the necessary data, the need to query the database for certain operations may be reduced, though this may not always be the case.
? https://jwt.io/introduction

from the front, and we'll have to implement some code grab token from our state, and then we'll set up a request that will go to our server. And we will check for authorization header on the server, if that header is present, if the token is still valid. We can access and modify the resources, if not, it will throw the authorization error

> https://kb.objectrocket.com/mongo-db/how-to-add-instance-methods-with-mongoose-236

### 前端中 local storage 的用处

-   当刷新界面后，很多 value 会重新 rerender, 导致我们获得的 values 无法长时间保存。所以当用户登录或者注册成功后就直接在 local storage 中进行保存
-   当点击 submit button, component 内部定义的 onSubmit 启动，首先通过 state values 读取刚刚提交的 name, email, password. 然后经过第一个检查，要确定一定要的 field(email, password) 不为空。然后根据 {Email, password, name} 创建 currentUser。之后根据目前用户在 login 界面 isMember==true, 在 register 界面 isMember==false, 来决定是调用 loginUser func 还是 registerUser func. 这两个 function 并不是在 Register page 定义的，而是在最外层的 AppProvider 中定义的，并通过 context 传入 Register.js 文件. 调用这两个方法是，需要传入上面定义的 currentUser, 因为在 axios.post(backend) 时要同时把 currentUser 传到后端进行存储
