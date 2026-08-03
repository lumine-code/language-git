; Ported from upstream by script/port-nvim-queries.js.
; Scopes end in ".git-rebase".
;
; 5 item(s) still need a human. Nothing ships with a ; PORT:
; marker left in it — `--verify` fails while any remain.
; Line numbers are the upstream file's, before this header was added.
; PORT: upstream line 12 [review] @comment — split into comment.line.<style> and comment.block by node type, and add punctuation.definition.comment
; PORT: upstream line 17 [review] @comment — split into comment.line.<style> and comment.block by node type, and add punctuation.definition.comment
; PORT: upstream line 25 [review] @comment — split into comment.line.<style> and comment.block by node type, and add punctuation.definition.comment
; PORT: upstream line 31 [review] @string — confirm the quoting style; single-quoted strings want string.quoted.single
; PORT: upstream line 36 [review] @comment — split into comment.line.<style> and comment.block by node type, and add punctuation.definition.comment

; a rough translation:
; * constant.builtin - git hash
; * constant - a git label
; * keyword - command that acts on commits commits
; * function - command that acts only on labels
; * comment - discarded commentary on a command, has no effect on the rebase
; * string - text used in the rebase operation
; * operator - a 'switch' (used in fixup and merge), either -c or -C at time of writing

(((command) @keyword.control.git-rebase
  (label) @constant.language.git-rebase
  (message)? @comment.line.git-rebase)
 (#match? @keyword.control.git-rebase "^(p|pick|r|reword|e|edit|s|squash|d|drop)$"))

(((command) @entity.name.function.git-rebase
  (label) @constant.other.git-rebase
  (message)? @comment.line.git-rebase)
 (#match? @entity.name.function.git-rebase "^(l|label|t|reset)$"))

((command) @keyword.control.git-rebase
 (#match? @keyword.control.git-rebase "^(x|exec|b|break)$"))

(((command) @entity.other.attribute-name.git-rebase
  (label) @constant.language.git-rebase
  (message)? @comment.line.git-rebase)
 (#match? @entity.other.attribute-name.git-rebase "^(f|fixup)$"))

(((command) @keyword.control.git-rebase
  (label) @constant.language.git-rebase
  (label) @constant.other.git-rebase
  (message) @string.quoted.double.git-rebase)
 (#match? @keyword.control.git-rebase "^(m|merge)$"))

(option) @keyword.operator.git-rebase

(comment) @comment.line.git-rebase
