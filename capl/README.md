# CAPL 语法高亮扩展

这是一个为CAPL（CAN Access Programming Language）语言提供语法高亮支持的Visual Studio Code扩展。CAPL是一种用于CAN总线网络测试和模拟的编程语言，主要用于汽车电子系统开发和测试。

## 功能特性

该扩展为CAPL语言提供了以下功能：

* 语法高亮支持，包括CAPL关键字、数据类型、函数、操作符等
* 跳转到定义功能 (Go to Definition)
  - 支持函数定义跳转
  - 支持变量定义跳转
  - 支持宏定义跳转
  - 支持消息处理函数跳转
  - 支持定时器处理函数跳转
  - 支持跨文件跳转功能
  - 支持#include语句的文件跳转（支持正斜杠和反斜杠路径）
* 括号匹配
* 代码折叠
* 注释支持（行注释和块注释）

该扩展支持`.capl`、`.can`和`.cin`文件扩展名。

## 使用方法

### 跳转到定义
- 按住 `Ctrl` (Windows/Linux) 或 `Cmd` (macOS) 并点击函数名、变量名或宏名
- 或者右键点击并选择"转到定义"
- 或者按 `F12` 键跳转到光标所在符号的定义

## 系统要求

- Visual Studio Code 1.60.0 或更高版本

## 扩展设置

目前该扩展没有额外的设置选项。

## 已知问题

* 目前没有已知问题。如果您发现任何问题，请在GitHub仓库中提交issue。

## 版本历史

### 0.3.0

* 版本升级至0.3.0
* 修复#include语句中反斜杠路径无法正确解析的问题
* 修复相对路径#include语句无法正确跳转的问题

### 0.2.0

* 支持#include语句的文件跳转功能

### 0.1.0

* 新增跳转到定义功能 (Go to Definition)
* 添加对 `.cin` 文件扩展名的支持
* 新增测试示例文件和扩展的示例代码
* 改进了扩展的整体功能性

### 0.0.1

* 初始版本
* 添加CAPL语言的基本语法高亮支持
* 支持`.capl`、`.can`和`.cin`文件扩展名

---

## Following extension guidelines

Ensure that you've read through the extensions guidelines and follow the best practices for creating your extension.

* [Extension Guidelines](https://code.visualstudio.com/api/references/extension-guidelines)

## Working with Markdown

You can author your README using Visual Studio Code. Here are some useful editor keyboard shortcuts:

* Split the editor (`Cmd+\` on macOS or `Ctrl+\` on Windows and Linux).
* Toggle preview (`Shift+Cmd+V` on macOS or `Shift+Ctrl+V` on Windows and Linux).
* Press `Ctrl+Space` (Windows, Linux, macOS) to see a list of Markdown snippets.

## For more information

* [Visual Studio Code's Markdown Support](http://code.visualstudio.com/docs/languages/markdown)
* [Markdown Syntax Reference](https://help.github.com/articles/markdown-basics/)

**Enjoy!**
