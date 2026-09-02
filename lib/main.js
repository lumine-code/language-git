const SCOPE = "text.git-commit";

exports.activate = function () {
  lumine.grammars.addInjectionPoint(SCOPE, {
    type: "rebase_command",
    language: () => "git-rebase",
    content: (node) => node,
  });
};

exports.consumeHyperlinkInjection = (hyperlink) => {
  hyperlink.addInjectionPoint(SCOPE, {
    types: ["comment", "message"],
  });
};

exports.consumeTodoInjection = (todo) => {
  todo.addInjectionPoint(SCOPE, {
    types: ["comment", "message"],
  });
};
