# CommandHelper README

Run custom shell command

# Command Options
## Minimal configuration
Minimal configuration to use for custom command.
```
{
    "command-helper.commands: {
        "command title": {
            "command": "command to run"
        }
    }
}
```

## Use args
You can use argument.
```
{
    "command-helper.commands": {
        "ls": {
            "command": "ls {path}",
            "args": {
                "path": "/root"
            }
        }
    }
}
```
with above configuration the executed command will be `ls /root`.

## Use user inputed args
You can use user inputed arguments by specifying the value of the args as `INPUT`.
```
{
    "command-helper.commands": {
        "ls": {
            "command": "ls {path}",
            "args": {
                "path": "INPUT"
            }
        }
    }
}
```
if the `path` value is set as `INPUT`, when you select the command it will show an input box to be used as replacement of `{path}`. 

If you type `/home` as the input, the executed command will be `ls /home`.

## Use choice args
You can specify to choose a specific value for the arguments by specifying the value of the args as an array.
```
{
    "command-helper.commands": {
        "ls": {
            "command": "ls {choice}",
            "args": {
                "choice": ["/root", "/home"]
            }
        }
    }
}
```
if the `choice` value is set as an array, when you select the command it will show a drop down based on the values you have provided.

## Use terminal settings
You can specify custom terminal name when executing the command
```
{
    "command-helper.commands": {
        "ls": {
            "command": "ls",
            "terminal": {
                "name": "Name this terminal"
            }
        }
    }
}
```

## Complete configuration example
```
{
    "command-helper.commands": {
        "ls": {
            "command": "ls {args1} {args2}",
            "args": {
                "args1": ["-a", "-l"],
                "args2": "INPUT",
            },
            "terminal": {
                "name": "run ls"
            }
        }
    }
}
```
note:
- the `args1` and `args2` in command `ls {args1} {args2}` is completely custom.
- the key in `args` should be the same with the one in the command.

With the example above, if you choose `-a` for args1 and type `/root` for args2 the command will be `ls -a /root` and the command will be executed in terminal with name `run ls`

# Usage
1. Define shell command in vs code configuration
2. use shortcut `ctrl + shift + Q` to select custom commands

# FAQ
how to open vs code configuration for this extension?
1. Open Extension tabs (`Ctrl+Shift+X`)
2. Find Command Helper extension
3. Click the cogwheel icon
4. Select `Extension Settings`
5. Click `Edit in settings.json`