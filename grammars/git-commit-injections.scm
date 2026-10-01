((rebase_command) @injection.owner @injection.content
  (#set! injection.language "git-rebase")
  (#set! injection.include-children))

((comment) @injection.owner @injection.content
  (#set! injection.language "hyperlink")
  (#set! injection.language-scope "none")
  (#set! injection.include-children))

((message) @injection.owner @injection.content
  (#set! injection.language "hyperlink")
  (#set! injection.language-scope "none"))
((comment) @injection.owner @injection.content
  (#set! injection.language "todo")
  (#set! injection.language-scope "none")
  (#set! injection.include-children))

((message) @injection.owner @injection.content
  (#set! injection.language "todo")
  (#set! injection.language-scope "none"))
