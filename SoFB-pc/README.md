# 项目说明

## 安装依赖

`npm install`

## 安装 Nginx 在 nginx.config 加入以下配置

```config
    server {
        listen 80;
        server_name localhost;
        location /sofb-online/ {
            proxy_pass http://10.152.200.201:10030;
            #Proxy Settings
            proxy_redirect     off;
            proxy_set_header   Host             $host;
            proxy_set_header   X-Real-IP        $remote_addr;
            proxy_set_header   X-Forwarded-For  $proxy_add_x_forwarded_for;
            proxy_next_upstream error timeout invalid_header http_500 http_502 http_503 http_504;
            proxy_max_temp_file_size 0;
            proxy_connect_timeout      90;
            proxy_send_timeout         90;
            proxy_read_timeout         90;
            proxy_buffer_size          4k;
            proxy_buffers              4 32k;
            proxy_busy_buffers_size    64k;
            proxy_temp_file_write_size 64k;
        }
        location / {
            proxy_pass  http://localhost:8080;
            #Proxy Settings
            proxy_redirect     off;
            proxy_set_header   Host             $host;
            proxy_set_header   X-Real-IP        $remote_addr;
            proxy_set_header   X-Forwarded-For  $proxy_add_x_forwarded_for;
            proxy_next_upstream error timeout invalid_header http_500 http_502 http_503 http_504;
            proxy_max_temp_file_size 0;
            proxy_connect_timeout      90;
            proxy_send_timeout         90;
            proxy_read_timeout         90;
            proxy_buffer_size          4k;
            proxy_buffers              4 32k;
            proxy_busy_buffers_size    64k;
            proxy_temp_file_write_size 64k;
        }
    }

```

## 修改 hosts

`127.0.0.1 sz.sofbtest.com`

## 启动项目

`npm run dev`

## 在浏览器中访问

`http://sz.sofbtest.com`

## 打包部署

`npm run build`
