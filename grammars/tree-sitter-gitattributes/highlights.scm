(dir_sep) @punctuation.separator.path.gitattributes

(quoted_pattern
  "\"" @punctuation.special)

(range_notation) @string.other.gitattributes

(range_notation
  [ "[" "]" ] @punctuation.bracket)

(wildcard) @string.regexp.gitattributes

(range_negation) @keyword.operator.gitattributes

(character_class) @constant.other.gitattributes

(class_range "-" @keyword.operator.gitattributes)

[
  (ansi_c_escape)
  (escaped_char)
] @escape

(attribute
  (attr_name) @variable.parameter.gitattributes)

(attribute
  (builtin_attr) @variable.language.gitattributes)

[
  (attr_reset)
  (attr_unset)
  (attr_set)
] @keyword.operator.gitattributes

(boolean_value) @constant.language.boolean.gitattributes

(string_value) @string.quoted.double.gitattributes

(macro_tag) @keyword.control.gitattributes

(macro_def
  macro_name: (_) @variable.other.member.gitattributes)

[
  (pattern_negation)
  (redundant_escape)
  (trailing_slash)
  (ignored_value)
] @invalid.illegal.gitattributes

(comment) @comment.line.gitattributes
