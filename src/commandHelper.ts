import * as vscode from 'vscode';

export class CommandHelper {
    command: string;
    args: any;
    terminal: { name: string };
    flag: number;

    constructor(commandObject: any) {
        this.command = commandObject['command'];
        this.args = commandObject['args'];
        this.terminal = commandObject['terminal'];
        this.flag = 1;
    }

    async execute() {
        let command = await this.processCommandArgs();
        if (this.flag) {
            let terminal = this.processTerminal();
            terminal.sendText(command);
            terminal.show();
        }
    }

    async processCommandArgs(): Promise<string>
    {
        let command = this.command;

        if (!this.args) {
            return command;
        }

        let key: string;
        let value: string | Array<string>;
        for (key in this.args) {
            if (!this.flag) {
                return command;
            }

            value = this.args[key];
            let replace;

            if (Array.isArray(value)) {
                replace = await vscode.window.showQuickPick(
                    value, 
                    {
                        canPickMany: false, 
                        placeHolder: `${command} | choose for ${key}`,
                    },
                );
            } else if (value === 'INPUT') {
                replace = await vscode.window.showInputBox(
                    {
                        prompt: `${command} | type for ${key}` 
                    }
                );
            } else {
                replace = value;
            }

            if(!replace) {
                this.flag = 0;
                replace = '';
            }

            command = command.replace(`{${key}}`, replace);
        }

        return command;
    }

    processTerminal(): vscode.Terminal
    {
        let terminals: any[] | readonly vscode.Terminal[];
        let terminal: vscode.Terminal | undefined;
        let customTerminalName = '';

        if (this.terminal) {
            customTerminalName = this.terminal.name;
            if (!customTerminalName) {
                terminal = vscode.window.activeTerminal;
            }
            terminals = vscode.window.terminals;
            terminals.forEach(terminalObject => {
				if (terminalObject.name === customTerminalName) {
					terminal = terminalObject;
				}
			});
        } else {
            terminal = vscode.window.activeTerminal;
        }

        if (!terminal) {
            terminal = vscode.window.createTerminal(customTerminalName);
        }

        return terminal;
    }
}