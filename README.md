# lambda-template

A Yeoman generator for basic lambda functions following the instructions below.

----

## Setup

1) Create a new blank github repository named after your to-be lambda function.
2)
```
npm i -g yo
```
3) Clone `generator-lambda-template` to your local machine.
4)
```
cd generator-lambda-template
npm i
npm link
```
5) Create a new directory named after your to-be lambda function.
5)
```
cd [directory-name]
yo lambda-template:create
```
6) Follow the prompts
8)
```
git add .
git commit -m 'First commit with lambda template'
git push origin [branch name]
```
9) To get the function uploaded to AWS you need to create a zip file by running `./build.sh` this may require you run `chmod +x build.sh` first.

10) Head over to the AWS console, create your lambda function and add the zip file.

---

## Notes

If your function requires any configs please create a `config.json` file and add them to that.

The `sample.json` file is to be filled in with a payload of what your lambda will receive.
