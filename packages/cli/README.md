# scriptkavi-hooks

A CLI for adding hooks to your project.

## Usage

Use the `init` command to initialize configuration and dependencies for a new project.

The `init` command configures the project.

```bash
npx scriptkavi-hooks init
```

## add

Use the `add` command to add hooks to your project.

The `add` command adds a hook to your project and installs all required dependencies.

```bash
npx scriptkavi-hooks add [hook]
```

### Example

```bash
npx scriptkavi-hooks add debounce
```

You can also run the command without any arguments to view a list of all available components:

```bash
npx scriptkavi-hooks add
```

## Documentation

Visit https://hooks.scriptkavi.com/docs/cli to view the documentation.

## License

Licensed under the [MIT license](https://github.com/scriptkavi/hooks/blob/main/LICENSE.md).
