let injectionRegistrations = [];

const SCOPE = "text.git-commit";

exports.activate = function () {
  injectionRegistrations.push(
    lumine.grammars.addInjectionPoint(SCOPE, {
      type: "rebase_command",
      language: () => "git-rebase",
      content: (node) => node,
    }),
  );
};

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

exports.deactivate = function () {
  for (const registration of injectionRegistrations.splice(0)) registration.dispose();
};
