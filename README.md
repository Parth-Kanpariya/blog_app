# url-shortner-backend

### Authorization Required is Bearer token (Take it from login api)

---

## Auth apis

---

# Registration

```

Method : POST
URL : http://localhost:7000/api/user/signup
Request : {
    "firstname": "Parth",
    "lastname": "Padhiar",
    "email": "parthpadhiar@foxbrains.com",
    "password": "12345678",
    "confirmPassword": "12345678",
    "phone_number": "12345678"
}

Success Result
{data : { message: "succ_1" }}

Error result

{error : { message: "err_1" }}
{error : { message: "err_2" }}
{error : { message: "err_7" }}
{error : { message: "err_8" }}
{error : { message: "err_9" }}

```

# Login

```

Method : POST
URL : http://localhost:7000/api/user/login
Request : {
    "email": "parthpadhiar@foxbrains.com",
    "password": "12345678"
}

Success Result
{
    "data": {
        "message": "succ_2",
        "data": {
            "id": 1,
            "user_id": "5f46116b-2825-4d52-9df6-ea43619ad2d0",
            "email": "parthpadhiar@foxbrains.com",
            "role": "user",
            "accessToken": ""
        }
    }
}

Error result

{error : { message: "err_7" }}
{error : { message: "err_8" }}
{error : { message: "err_11" }}
{error : { message: "err_13" }}
{error : { message: "err_14" }}
{error : { message: "err_15" }}
{error : { message: "err_16" }}
{error : { message: "err_17" }}

```

# Email Verification

```

Method : POST
URL : http://localhost:7000/api/user/login
Request : {
    "email": "parthpadhiar@foxbrains.com",
    "otp": "926181"
}

Success Result
{data : { message: "succ_5" }}
{data : { message: "succ_0" }}

Error result

{error : { message: "err_15" }}
{error : { message: "err_0" }}

```

# Forget Password

```

Method : GET
URL : http://localhost:7000/api/user/forgot_password/email/parthpadhiar@foxbrains.com
Request : {
    "email": "parthpadhiar@foxbrains.com",
    "otp": "926181"
}

Success Result
{data : { message: "succ_3" }}

Error result

{error : { message: "err_7" }}
{error : { message: "err_11" }}
{error : { message: "err_14" }}
{error : { message: "err_15" }}
{error : { message: "err_16" }}
{error : { message: "err_17" }}

```

# Reset Password

```

Method : POST
URL : http://localhost:7000/api/user/change_password_otp
Request : {
	"email": "parthpadhiar@foxbrains.com",
    "password_reset_otp": "385125",
    "newPassword": "12345678",
    "confirmPassword": "12345678"
}

Success Result
{data : { message: "succ_4" }}

Error result

{error : { message: "err_8" }}
{error : { message: "err_9" }}
{error : { message: "err_18" }}

```

# My Account Details

```

Method : GET
URL : http://localhost:7000/api/user/me
Authentication: Required

Success Result
{
    "data": {
        "message": "succ_6",
        "data": {
            "status": 1,
            "profile_image": "http://localhost:7000/static/profile/5f46116b-2825-4d52-9df6-ea43619ad2d0-Free Shipping.png",
            "_id": 1,
            "firstname": "Parth",
            "lastname": "Padhiar",
            "email": "parthpadhiar@foxbrains.com",
            "phone_number": "12345567",
            "otp": "711642",
            "user_id": "5f46116b-2825-4d52-9df6-ea43619ad2d0",
            "password_reset_otp": "384408",
            "id": "1"
        }
    }
}

Error result

{error : { message: "err_401" }}

```

# Update Account

```

Method : PUT
URL : http://localhost:7000/api/user/me
Authentication: Required
Request: {
    "firstname": "Parth",
    "lastname": "Padhiar",
    "oldPassword": "123456",
    "newPassword": "123456"
}

Success Result
{data : { message: "succ_7" }}

Error result

{error : { message: "err_11" }}
{error : { message: "err_19" }}

```

# Update Profile Picture

```

Method : PUT
URL : http://localhost:7000/api/user/profile
Authentication: Required
Request: Form Data
profile_image: Select Image

Success Result
{
    "data": {
        "error": false,
        "message": "succ_7",
        "data": "http://localhost:7000/static/profile/5f46116b-2825-4d52-9df6-ea43619ad2d0-Free Shipping.png"
    }
}
```

---

## URL Shortner apis

---

# Add Long URL (Login Required)

```

Method : POST
URL : http://localhost:7000/api/user/url_shortner
Authentication: Required
Request : {
    "long_url": "https://google.com"
}
OR
Request: { "long_url": "https://google.com", "custom_code":"myUrl" }

Success Result
{
    "data": {
        "error": false,
        "message": "succ_21",
        "data": "http://localhost:7000/9RReplwTt"
    }
}

Error result
{error : { message: "err_26" }}
{error : { message: "err_21" }}

```

# Edit Long URL

```

Method : PUT
URL : http://localhost:7000/api/user/url_shortner?short_code=nhcKQ9uXF
Request : {
    "long_url": "https://google.com"
}
Authentication: Required

Success Result
{
    "data": {
        "error": false,
        "message": "succ_24"
    }
}

Error result

{error : { message: "err_25" }}
{error : { message: "err_21" }}
{error : { message: "err_27" }}

```

# Delete Url

```

Method : DELETE
URL : http://localhost:7000/api/user/url_shortner?short_code=aB7X5hbHx
Authentication: Required

Success Result
{
    "data": {
        "error": false,
        "message": "succ_25"
    }
}

Error result
{error : { message: "err_27" }}
{error : { message: "err_25" }}

```

# Get URL List

```

Method : GET
URL : http://localhost:7000/api/user/url_shortner?page=1&limit=10
Authentication: Required

Success Result
{
    "data": {
        "message": "succ_23",
        "count": 1,
        "data": [
            {
                "_id": 3,
                "user_id": "5f46116b-2825-4d52-9df6-ea43619ad2d0",
                "long_url": "https://github.com/jshttp/content-disposition#readme",
                "short_code": "aB7X5hbHx",
                "short_url": "http://localhost:7000/aB7X5hbHx",
                "url_shortner_id": "39269d4e-f4e7-42a3-ae15-dc9022c5ee45",
                "created_at": "2021-08-25T09:38:26.146Z",
                "totalRequests": 2
            }
        ]
    }
}

```

# Get URL Details (Shows Urls analytics)

```

Method : GET
URL : http://localhost:7000/api/user/url_shortner/details?page=1&limit=10&short_code=zYoEyhZb3
Authentication: Required

Success Result
{
    "data": {
        "error": false,
        "message": "succ_23",
        "count": 2,
        "data": [
            {
                "_id": 2,
                "user_id": "5f46116b-2825-4d52-9df6-ea43619ad2d0",
                "short_code": "zYoEyhZb3",
                "analytics_id": "fadc3a97-77bc-48f1-9c33-2517416a8d82",
                "created_at": "2021-08-25T09:37:32.752Z",
                "long_url": "https://www.npmjs.com/package/content-disposition",
                "short_url": "http://localhost:7000/zYoEyhZb3",
                "url_shortner_id": "7978f096-d636-4826-a542-b78fe682d88a"
            },
            {
                "_id": 1,
                "user_id": "5f46116b-2825-4d52-9df6-ea43619ad2d0",
                "short_code": "zYoEyhZb3",
                "analytics_id": "1e2198ae-2029-4810-a48b-8cd7ab0d5233",
                "created_at": "2021-08-25T09:37:27.354Z",
                "long_url": "https://www.npmjs.com/package/content-disposition",
                "short_url": "http://localhost:7000/zYoEyhZb3",
                "url_shortner_id": "7978f096-d636-4826-a542-b78fe682d88a"
            }
        ]
    }
}

Error result
{error : { message: "err_25" }}
{error : { message: "err_27" }}


```

---

### Authentication Not Required

---

# Add Long URL (Login Not Required)

```

Method : POST
URL : http://localhost:7000/api/user/url_shortner/add
Authentication: Not Required
Request : {
    "long_url": "https://google.com"
}
OR
Request: { "long_url": "https://google.com", "custom_code":"myUrl" }

Success Result
{
    "data": {
        "error": false,
        "message": "succ_21",
        "data": "http://localhost:7000/9RReplwTt"
    }
}

Error result

{error : { message: "err_26" }}
{error : { message: "err_21" }}

```

# Get Short Url Result

```

Method : GET
URL : http://localhost:7000/:shortUrl
Authentication: Not Required

Success Result
Opens Added Long Url in browser

Error result
{error : { message: "err_23" }}

```
Denis Vithani
