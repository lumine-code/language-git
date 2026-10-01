const SCOPE = "text.git-commit";

exports.consumeHyperlinkInjection = (hyperlink) => {
  return hyperlink.addInjectionPoint(SCOPE, {
    types: ["comment", "message"],
  });
};

exports.consumeTodoInjection = (todo) => {
  return todo.addInjectionPoint(SCOPE, {
    types: ["comment", "message"],
  });
};
