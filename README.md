# CAPL VSCode Extension Workspace

这个工作区包含了 CAPL 语言的 VSCode 扩展项目。

## 项目结构

```
├── capl/                    # VSCode 扩展项目（主要内容）
│   ├── package.json         # 扩展配置
│   ├── src/                 # 源代码
│   ├── syntaxes/           # 语法定义
│   ├── examples/           # 示例文件
│   └── ...                 # 其他扩展文件
└── README.md               # 本文件
```

## 主要项目

**capl/** - 这是实际的 VSCode 扩展项目，包含：
- CAPL 语言语法高亮支持
- 文件关联（.capl, .can, .cin）
- 编辑器功能（括号匹配、代码折叠等）
- 完整的文档和示例

## 使用说明

1. 进入 `capl/` 目录
2. 查看 `README.md` 和 `INSTALL.md` 了解详细使用方法
3. 使用 `capl-0.0.1.vsix` 文件安装扩展

## 开发

如需开发或修改扩展：

```bash
cd capl
npm install
npm run compile
npm run package
```

更多详细信息请查看 `capl/` 目录中的文档。