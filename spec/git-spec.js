describe("Git Tree-sitter grammars", () => {
  beforeEach(async () => {
    await lumine.packages.activatePackage("language-git");
  });

  async function editorFor(scopeName, text) {
    const editor = await lumine.workspace.open();
    editor.setGrammar(lumine.grammars.grammarForScopeName(scopeName));
    editor.setText(text);
    await editor.languageMode.ready;
    return editor;
  }

  it("registers only Tree-sitter grammars", () => {
    for (const scopeName of [
      "source.git-config",
      "text.git-commit",
      "text.git-rebase",
      "source.gitattributes",
      "source.gitignore",
    ]) {
      expect(lumine.grammars.grammarForScopeName(scopeName).type).toBe("tree-sitter");
    }
  });

  it("highlights commit subjects and trailers", async () => {
    const editor = await editorFor(
      "text.git-commit",
      "Refine parser selection\n\nSigned-off-by: Ada Lovelace <ada@example.com>\n",
    );

    expect(editor.getBuffer().getLanguageMode().tree.rootNode.hasError).toBe(false);
    expect(editor.scopeDescriptorForBufferPosition([0, 2]).getScopesArray()).toContain(
      "markup.heading.git-commit",
    );
    expect(editor.scopeDescriptorForBufferPosition([2, 2]).getScopesArray()).toContain(
      "entity.name.tag.trailer.git-commit",
    );
  });

  it("highlights rebase commands", async () => {
    const editor = await editorFor("text.git-rebase", "pick c0ffeee Refine parser selection\n");

    expect(editor.getBuffer().getLanguageMode().tree.rootNode.hasError).toBe(false);
    expect(editor.scopeDescriptorForBufferPosition([0, 1]).getScopesArray()).toContain(
      "keyword.control.git-rebase",
    );
  });

  it("registers the rebase injection with a canonical target", () => {
    const registrations = [];
    const previous = lumine.grammars.addInjectionPoint;
    lumine.grammars.addInjectionPoint = (scopeName, options) => {
      registrations.push({ scopeName, options });
      return { dispose() {} };
    };

    try {
      require("../lib/main").activate();
    } finally {
      lumine.grammars.addInjectionPoint = previous;
    }

    const injection = registrations.find(({ options }) => options.type === "rebase_command");
    expect(injection.scopeName).toBe("text.git-commit");
    expect(injection.options.language()).toBe("git-rebase");
  });
});
