# Change Log

All notable changes to the "capl" extension will be documented in this file.

Check [Keep a Changelog](http://keepachangelog.com/) for recommendations on how to structure this file.

## [0.3.0] - 2024-12-21

### Added
- 版本升级至0.3.0

### Fixed
- 修复相对路径#include语句无法正确跳转的问题
- 修复#include文件路径解析逻辑，支持正确的相对路径计算

## [0.2.0] - 2024-12-20

### Added
- 支持#include语句的文件跳转功能，包括相对路径和绝对路径的跳转，通过本地文件系统搜索目标文件。
- 修复#include语句中反斜杠路径无法正确解析的问题。

## [0.1.0] - 2024-12-19

### Added
- 跳转到定义功能 (Go to Definition)
  - 支持函数定义跳转
  - 支持变量定义跳转
  - 支持宏定义跳转
  - 支持消息处理函数跳转
  - 支持定时器处理函数跳转
  - 支持跨文件跳转功能
- 添加对 `.cin` 文件扩展名的支持
- 新增测试示例文件 `test_definitions.can`
- 扩展了 `canlib.cin` 示例文件

### Changed
- 更新了所有文档，反映对 `.cin` 文件的支持
- 改进了扩展激活消息

## [0.0.1] - 2024-12-18

### Added
- 初始版本发布
- CAPL语法高亮支持
- 支持 `.capl` 和 `.can` 文件扩展名
- 基本的编辑器功能（括号匹配、代码折叠等）