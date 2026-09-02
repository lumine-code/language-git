(section_name) @entity.name.tag.git-config

((section_name) @support.function.builtin.git-config
 (#eq? @support.function.builtin.git-config "include"))

((section_header
   (section_name) @support.function.builtin.git-config
   (subsection_name))
 (#eq? @support.function.builtin.git-config "includeIf"))

(variable (name) @variable.other.member.git-config)
[(true) (false)] @constant.language.git-config
(integer) @constant.numeric.git-config

[(string) (subsection_name)] @string.quoted.double.git-config

((string) @string.unquoted.path.git-config
 (#match? @string.unquoted.path.git-config "^(~|./|/)"))

; `[section "subsection"]` — the brackets delimit the section header, the
; quotes the subsection name.
"[" @punctuation.definition.section.begin.bracket.square.git-config
"]" @punctuation.definition.section.end.bracket.square.git-config
"\"" @punctuation.definition.string.git-config

"=" @punctuation.separator.key-value.git-config

(comment) @comment.line.git-config
