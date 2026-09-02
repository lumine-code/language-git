(comment) @comment.line.number-sign.git-commit

((comment) @punctuation.definition.comment.git-commit
  (#set! adjust.startAndEndAroundFirstMatchOf "^#"))

(subject) @markup.heading.git-commit
(message) @meta.paragraph.git-commit
(header) @keyword.other.header.git-commit
(path) @string.unquoted.path.git-commit
(branch) @markup.underline.link.git-commit
(commit) @constant.other.commit.git-commit
(item) @markup.list.unnumbered.git-commit

(change
  kind: "new file" @markup.inserted.git-commit)

(change
  kind: "deleted" @markup.deleted.git-commit)

(change
  kind: ["modified" "renamed"] @markup.changed.git-commit)

(trailer
  key: (trailer_key) @entity.name.tag.trailer.git-commit
  value: (trailer_value) @string.unquoted.git-commit)

":" @punctuation.separator.key-value.git-commit
"=" @keyword.operator.assignment.git-commit
"->" @punctuation.separator.key-value.git-commit
(scissors) @comment.line.number-sign.git-commit
