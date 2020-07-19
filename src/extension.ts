import vscode = require('vscode');
import { CommandHelper } from "./commandHelper";

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context: { subscriptions: any[]; }) {

	let disposable = vscode.commands.registerCommand('commandhelper.start', async function () {
		let commands: any;
		const config = vscode.workspace.getConfiguration('command-helper');
		commands = config.get('commands');

		let selected = await vscode.window.showQuickPick(Object.keys(commands), {
			canPickMany: false,
			placeHolder: 'choose command'
		});

		if (selected) {
			let commandHelper = new CommandHelper(commands[String(selected)]);
			commandHelper.execute();
		}
	});

	context.subscriptions.push(disposable);
}
exports.activate = activate;

function deactivate() {}

module.exports = {
	activate,
	deactivate
};
