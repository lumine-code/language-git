describe("Git Tree-sitter grammars", () => {
  beforeEach(async () => {
    await lumine.packages.activatePackage("language-git");
  });

  async function editorFor(scopeName, text) {
    const editor = await lumine.workspace.open();
    editor.setGrammar(lumine.grammars.grammarForScopeName(scopeName));
    editor.setText(text);
    await editor.languageMode.ready;
    await editor.languageMode.atTransactionEnd();
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

    expect(editor.languageMode.tree.rootNode.hasError).toBe(false);
    expect(editor.scopeDescriptorForBufferPosition([0, 2]).getScopesArray()).toContain(
      "markup.heading.git-commit",
    );
    expect(editor.scopeDescriptorForBufferPosition([2, 2]).getScopesArray()).toContain(
      "entity.name.tag.trailer.git-commit",
    );
  });

  it("highlights rebase commands", async () => {
    const editor = await editorFor("text.git-rebase", "pick c0ffeee Refine parser selection\n");

    expect(editor.languageMode.tree.rootNode.hasError).toBe(false);
    expect(editor.scopeDescriptorForBufferPosition([0, 1]).getScopesArray()).toContain(
      "keyword.control.git-rebase",
    );
  });

  it("injects independent rebase commands inside commit comments", async () => {
    const editor = await editorFor(
      "text.git-commit",
      [
        "Refine parser selection",
        "",
        "# interactive rebase in progress; onto c0ffeee",
        "# Last command done (1 command done):",
        "# pick abc1234 Previous change",
        "# Next command to do (1 remaining command):",
        "# pick def5678 Next change",
        "# You are currently rebasing branch 'master' on 'c0ffeee'.",
        "#",
        "",
      ].join("\n"),
    );
    const layers = editor.languageMode
      .getAllInjectionLayers()
      .filter((layer) => layer.grammar.scopeName === "text.git-rebase");
    expect(layers.length).toBe(2);
    for (const row of [4, 6]) {
      expect(editor.scopeDescriptorForBufferPosition([row, 3]).getScopesArray()).toContain(
        "keyword.control.git-rebase",
      );
      expect(editor.scopeDescriptorForBufferPosition([row, 0]).getScopesArray()).not.toContain(
        "text.git-rebase",
      );
    }
  });
});
