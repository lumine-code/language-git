# language-git

Git editing support.

## Features

- **Grammars**: provides Tree-sitter grammars built from [tree-sitter-git-commit](https://github.com/the-mikedavis/tree-sitter-git-commit), [tree-sitter-git-config](https://github.com/the-mikedavis/tree-sitter-git-config), [tree-sitter-git-rebase](https://github.com/the-mikedavis/tree-sitter-git-rebase), [tree-sitter-gitattributes](https://github.com/ObserverOfTime/tree-sitter-gitattributes), and [tree-sitter-gitignore](https://github.com/shunsambongi/tree-sitter-gitignore).
- **Syntax highlighting**: full grammar coverage for Git commit, merge, and rebase messages.
- **Commit message hints**: warning and error highlighting for common commit message convention violations.
- **Snippets**: shortcut for scaffolding a commit message.

## Installation

To install `language-git` search for it in the Install pane of the Lumine settings, or run the command `lumine --install lumine-code/language-git`.

## Services

- `hyperlink.injection`: consumed to highlight links in commit messages and generated comments.
- `todo.injection`: consumed to highlight task annotations in commit messages and generated comments.

## Contributing

Got ideas to make this package better, found a bug, or want to help add new features? Just drop your thoughts on GitHub. Any feedback is welcome!
