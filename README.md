# lambda-template

A Yeoman generator for basic lambda functions following the instructions below.

----

## Setup

1) Create a new blank github repository named after your to-be lambda function.
2)
```
npm i -g yo
```
3) Clone `generator-semios-lambda-template` to your local machine.
4)
```
cd generator-semios-lambda-template
npm i
npm link
```
5) Create a new directory named after your to-be lambda function.
5)
```
cd [directory-name]
yo semios-lambda-template:create
```
6) Follow the prompts
8)
```
git add .
git commit -m 'First commit with lambda template'
git push origin [branch name]
```
9) If you have selected yes to the generators question `Is this lambda hooked up to All Meta?` you must also go into your `.bashrc` and set these env variables.
```
export AWS_ACESS_KEY_ID=
export AWS_SECRET_ACCESS_KEY=
export AWS_REGION=
export ALL_META_PROD=(s3 bucket name)
export ALL_META_STAGE=(s3 bucket name)
```
