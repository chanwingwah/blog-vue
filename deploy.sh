#!/usr/bin/env sh

# 确保脚本抛出遇到的错误
set -e

rm -rf dist

# 生成静态文件
npm run build

# 进入生成的文件夹
cd dist

# 如果是发布到自定义域名
# echo 'www.example.com' > CNAME

git init
git add -A
git commit -m 'deploy'

git remote add origin root@svr:/home/huahua/git_repos/blog-vue.git
git push -f root@svr:/home/huahua/git_repos/blog-vue.git

cd -