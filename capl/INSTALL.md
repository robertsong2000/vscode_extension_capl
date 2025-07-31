# CAPL语法高亮扩展安装和使用指南

## 安装方法

### 方法一：通过VSIX文件安装（推荐）

1. 打开Visual Studio Code
2. 按 `Ctrl+Shift+P` (Windows/Linux) 或 `Cmd+Shift+P` (macOS) 打开命令面板
3. 输入 "Extensions: Install from VSIX..." 并选择该命令
4. 选择生成的 `capl-0.3.0.vsix` 文件
5. 重启VSCode以确保扩展正常加载

### 方法二：通过命令行安装

```bash
code --install-extension capl-0.3.0.vsix
```

## 功能特性

✅ **语法高亮支持**
- CAPL关键字高亮（if, else, while, for, on, message, timer等）
- 数据类型高亮（int, byte, word, dword, float, double等）
- 函数名高亮
- 字符串和数字高亮
- 注释高亮（行注释和块注释）
- 操作符高亮

✅ **文件支持**
- `.capl` 文件
- `.can` 文件
- `.cin` 文件

✅ **编辑器功能**
- 括号自动匹配和闭合
- 代码折叠
- 自动缩进
- 跳转到定义功能（包括#include文件跳转）

## 使用方法

1. 安装扩展后，创建或打开一个 `.capl`、`.can` 或 `.cin` 文件
2. VSCode会自动识别文件类型并应用CAPL语法高亮
3. 您可以在 `examples/example.can` 文件中查看语法高亮效果

### 跳转到定义功能

扩展支持多种跳转到定义功能：

1. **函数定义跳转**：按住 `Ctrl` (Windows/Linux) 或 `Cmd` (macOS) 并点击函数名
2. **变量定义跳转**：按住 `Ctrl` (Windows/Linux) 或 `Cmd` (macOS) 并点击变量名
3. **宏定义跳转**：按住 `Ctrl` (Windows/Linux) 或 `Cmd` (macOS) 并点击宏名
4. **#include文件跳转**：按住 `Ctrl` (Windows/Linux) 或 `Cmd` (macOS) 并点击#include语句中的文件名

对于#include文件跳转功能，扩展支持相对路径和绝对路径的文件搜索，同时支持正斜杠和反斜杠路径分隔符。例如：

```capl
#include "../common/test.cin"
#include "..\..\common\test.cin"
#include <canlib.cin>
#include "./local_file.cin"
```

按住 `Cmd` (macOS) 或 `Ctrl` (Windows/Linux) 并点击文件名，即可跳转到对应的文件。

## 示例代码

扩展包含了一个完整的CAPL示例文件 (`examples/example.can`)，展示了：
- 变量定义
- 消息处理
- 定时器使用
- 函数定义
- 条件判断和循环
- 注释使用

## 支持的CAPL语法元素

### 关键字
- 控制流：`if`, `else`, `while`, `do`, `for`, `return`, `switch`, `case`, `default`, `break`, `continue`, `goto`
- CAPL特有：`on`, `message`, `timer`, `key`, `start`, `envvar`, `msTimer`, `includes`, `variables`, `void`, `this`

### 数据类型
- `int`, `byte`, `word`, `dword`, `long`, `float`, `double`, `char`, `message`, `timer`, `msTimer`

### 常用函数
- 输出函数：`write`, `writeEx`, `output`, `outputEx`
- 定时器函数：`setTimer`, `cancelTimer`, `resetTimer`, `getTimerState`
- 系统函数：`getSystemTime`, `getSystemVar`, `putSystemVar`
- 环境变量：`getEnvVar`, `putEnvVar`
- 信号处理：`getSignal`, `setSignal`, `getValue`, `setValue`

## 故障排除

### 扩展未生效
1. 确认文件扩展名为 `.capl`、`.can` 或 `.cin`
2. 重启VSCode
3. 检查扩展是否已启用：`Ctrl+Shift+X` → 搜索 "capl"

### 语法高亮不正确
1. 确认使用的是标准CAPL语法
2. 检查文件编码是否为UTF-8
3. 如发现问题，请在GitHub仓库提交issue

## 版本信息

- 当前版本：0.3.0
- 支持的VSCode版本：1.60.0及以上
- 许可证：MIT

## 贡献和反馈

如果您发现任何问题或有改进建议，请：
1. 在GitHub仓库提交issue
2. 提供具体的代码示例和期望的高亮效果
3. 描述您的VSCode版本和操作系统

感谢您使用CAPL语法高亮扩展！