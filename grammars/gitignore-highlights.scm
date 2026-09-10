((comment) @comment.line.gitignore @_IGNORE_.spell
  (#set! adjust.endBeforeFirstMatchOf "\\r?$"))

(pattern_char) @string.unquoted.path.gitignore

[
  (directory_separator)
  (directory_separator_escaped)
] @punctuation.separator.path.gitignore

[
  (wildcard_char_single)
  (wildcard_chars)
  (wildcard_chars_allow_slash)
] @constant.character.escape.gitignore

[
  (pattern_char_escaped)
  (bracket_char_escaped)
] @constant.character.escape.gitignore

; A leading `!` re-includes a path an earlier pattern excluded.
(negation) @keyword.operator.negation.gitignore

(bracket_negation) @keyword.operator.gitignore

; bracket expressions
"[" @punctuation.definition.character-class.begin.bracket.square.gitignore
"]" @punctuation.definition.character-class.end.bracket.square.gitignore

(bracket_char) @constant.other.gitignore

(bracket_range
  "-" @keyword.operator.gitignore)

(bracket_char_class) @constant.language.gitignore
