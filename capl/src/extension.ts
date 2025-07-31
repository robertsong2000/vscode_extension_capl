// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

// CAPL Definition Provider class
class CaplDefinitionProvider implements vscode.DefinitionProvider {
	
	provideDefinition(
		document: vscode.TextDocument,
		position: vscode.Position,
		token: vscode.CancellationToken
	): vscode.ProviderResult<vscode.Definition | vscode.LocationLink[]> {
		return this.provideDefinitionAsync(document, position, token);
	}

	private async provideDefinitionAsync(
		document: vscode.TextDocument,
		position: vscode.Position,
		token: vscode.CancellationToken
	): Promise<vscode.Definition | vscode.LocationLink[] | null> {
		
		// 检查是否在#include语句上
		const includeDefinition = await this.findIncludeDefinition(document, position);
		if (includeDefinition) {
			return includeDefinition;
		}

		const wordRange = document.getWordRangeAtPosition(position);
		if (!wordRange) {
			return null;
		}

		const word = document.getText(wordRange);
		
		// 搜索定义位置
		const definition = this.findDefinition(document, word);
		if (definition) {
			return new vscode.Location(document.uri, definition);
		}

		// 如果在当前文件中没有找到，搜索工作区中的其他CAPL文件
		return this.findDefinitionInWorkspace(word);
	}

	private findDefinition(document: vscode.TextDocument, word: string): vscode.Position | null {
		const text = document.getText();
		const lines = text.split('\n');

		// 搜索函数定义
		const functionPattern = new RegExp(`^\\s*(void|int|byte|word|dword|float|double|char|message|timer)\\s+${word}\\s*\\(`, 'i');
		
		// 搜索变量定义
		const variablePattern = new RegExp(`^\\s*(int|byte|word|dword|float|double|char|message|timer|msTimer)\\s+${word}\\s*[;=]`, 'i');
		
		// 搜索宏定义
		const macroPattern = new RegExp(`^\\s*#define\\s+${word}\\b`, 'i');
		
		// 搜索消息定义
		const messagePattern = new RegExp(`^\\s*on\\s+message\\s+${word}\\b`, 'i');
		
		// 搜索定时器定义
		const timerPattern = new RegExp(`^\\s*on\\s+(timer|msTimer)\\s+${word}\\b`, 'i');

		for (let i = 0; i < lines.length; i++) {
			const line = lines[i];
			
			if (functionPattern.test(line) || 
				variablePattern.test(line) || 
				macroPattern.test(line) ||
				messagePattern.test(line) ||
				timerPattern.test(line)) {
				return new vscode.Position(i, 0);
			}
		}

		return null;
	}

	private async findIncludeDefinition(document: vscode.TextDocument, position: vscode.Position): Promise<vscode.Location | null> {
		// 获取当前行文本
		const line = document.lineAt(position.line).text;
		
		// 检查是否为#include语句
		const includePattern = /^\s*#include\s+[<"](.+?)[>"]$/;
		const match = line.match(includePattern);
		
		if (match) {
			let includePath = match[1];
			
			// 处理反斜杠路径
			includePath = includePath.replace(/\\/g, '/');
			
			// 获取当前文件的目录路径
			const currentDir = vscode.Uri.joinPath(document.uri, '..');
			
			// 构建目标文件的完整路径
			let targetUri: vscode.Uri;
			if (includePath.startsWith('./') || includePath.startsWith('../')) {
				// 相对路径
				targetUri = vscode.Uri.joinPath(currentDir, includePath);
			} else {
				// 绝对路径或文件名，使用优化的排除模式
				const excludePattern = '{**/node_modules/**,**/build/**,**/dist/**,**/out/**,**/.git/**,**/.vscode/**,**/coverage/**,**/temp/**,**/tmp/**,**/*.log,**/*.min.js}';
				const files = await vscode.workspace.findFiles(`**/${includePath}`, excludePattern, 1);
				if (files && files.length > 0) {
					return new vscode.Location(files[0], new vscode.Position(0, 0));
				}
				return null;
			}
			
			// 检查文件是否存在
			try {
				await vscode.workspace.fs.stat(targetUri);
				return new vscode.Location(targetUri, new vscode.Position(0, 0));
			} catch (error) {
				// 文件不存在，使用优化的排除模式继续搜索
				const excludePattern = '{**/node_modules/**,**/build/**,**/dist/**,**/out/**,**/.git/**,**/.vscode/**,**/coverage/**,**/temp/**,**/tmp/**,**/*.log,**/*.min.js}';
				const files = await vscode.workspace.findFiles(`**/${includePath}`, excludePattern, 1);
				if (files && files.length > 0) {
					return new vscode.Location(files[0], new vscode.Position(0, 0));
				}
			}
		}
		
		return null;
	}

	private async findDefinitionInWorkspace(word: string): Promise<vscode.Location[]> {
		const locations: vscode.Location[] = [];
		
		// 优化的排除模式，减少搜索范围
		const excludePattern = '{**/node_modules/**,**/build/**,**/dist/**,**/out/**,**/.git/**,**/.vscode/**,**/coverage/**,**/temp/**,**/tmp/**,**/*.log,**/*.min.js}';
		
		// 搜索工作区中的CAPL文件，限制结果数量
		const files = await vscode.workspace.findFiles('**/*.{capl,can,cin}', excludePattern, 50);
		
		// 并行处理文件，提高性能
		const promises = files.map(async (file) => {
			try {
				const document = await vscode.workspace.openTextDocument(file);
				const position = this.findDefinition(document, word);
				return position ? new vscode.Location(file, position) : null;
			} catch (error) {
				console.log(`无法打开文件: ${file.fsPath}`);
				return null;
			}
		});
		
		const results = await Promise.all(promises);
		return results.filter((location): location is vscode.Location => location !== null);
	}
}

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('CAPL语法高亮扩展已激活');

	// 注册跳转到定义功能
	const definitionProvider = vscode.languages.registerDefinitionProvider(
		{ scheme: 'file', language: 'capl' },
		new CaplDefinitionProvider()
	);

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	const disposable = vscode.commands.registerCommand('capl.helloWorld', () => {
		// The code you place here will be executed every time your command is executed
		// Display a message box to the user
		vscode.window.showInformationMessage('CAPL语法高亮扩展已加载，支持跳转到定义功能');
	});

	context.subscriptions.push(definitionProvider);
	context.subscriptions.push(disposable);
}

// This method is called when your extension is deactivated
export function deactivate() {}
