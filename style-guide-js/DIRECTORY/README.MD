# SFB Directory Guide

---

静态资源目录规范指南。

---

**【强制】** 所有资源类型必须按以下目录放置；

## 工作流默认目录

```html
src/                                # static resource directory
|
|-- css/                            # all generated CSS
|   |-- global.sss                  # the global stylesheet
|   ...
|
|-- img/                            # all images
|   |-- bg-body.jpg                 # body background
|   ...
|
|-- js/                             # all javascript files
|   |-- main.js                     # general documentation
|   |-- vendor                      # third-party plugins
|       |-- modernizr-2.8.3.min.js
|       |-- ...
|   ...
|
|-- sass/                           # all SASS files
|   |-- global.scss                 # the global SASS
|   |-- _slice.scss                 # automatic img to css
|   |-- base                        # the base SASS
|       |-- _base.scss
|       |-- _mixins.scss
|       |-- _normalize.scss
|   |-- lego                        # the LEGO UI SASS
|       |-- _lego.scss
|       |-- _ui-box.scss
|       |-- _ui-tab.scss
|       |-- ...
|   |-- biz1                        # the business SASS
|       |-- ...
|   |-- biz2                        # the business SASS
|       |-- ...
|
|-- tpl/                            # the templates
|   |-- ...
|
`-- index.html                      # the html file
```


## 完整目录

* 当该项目为中大型项目或长期维护项目时，请手动添加README.md填写相关文档，[文档参考模板](https://github.com/duowan/document-template)；
* 当该项目有需要使用web字体时时，请手动添加**font**目录放置字体文件，如有多个字体，请分开文件夹存放；
* 当该项目有需要使用flash文件时，请手动添加**swf**目录放置flash文件；

```html
src/                                # static resource directory
|
|-- css/                            # all generated CSS
|   |-- global.sss                  # the global stylesheet
|   ...
|
|-- img/                            # all images
|   |-- bg-body.jpg                 # body background
|   ...
|
|-- js/                             # all javascript files
|   |-- main.js                     # general documentation
|   |-- vendor                      # third-party plugins
|       |-- modernizr-2.8.3.min.js
|       |-- ...
|   ...
|
|-- sass/                           # all SASS files
|   |-- global.scss                 # the global SASS
|   |-- _slice.scss                 # automatic img to css
|   |-- base                        # the base SASS
|       |-- _base.scss
|       |-- _mixins.scss
|       |-- _normalize.scss
|   |-- lego                        # the LEGO UI SASS
|       |-- _lego.scss
|       |-- _ui-box.scss
|       |-- _ui-tab.scss
|       |-- ...
|   |-- biz1                        # the business SASS
|       |-- ...
|   |-- biz2                        # the business SASS
|       |-- ...
|
|-- font/                           # all web fonts
|   ...
|
|-- swf/                            # the flash files
|   |-- logo-duowan.swf
|   |-- ...
|
|-- tpl/                            # the templates
|   |-- ...
|
`-- README.md                       # the project document
`-- index.html                      # the html file
```
