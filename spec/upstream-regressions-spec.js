describe("Git rebase upstream parser regressions", () => {
  let editor;

  beforeEach(async () => {
    await lumine.packages.activatePackage("language-git");
    editor = await lumine.workspace.open();
    editor.setGrammar(lumine.grammars.grammarForScopeName("text.git-rebase"));
  });

  afterEach(() => editor?.destroy());

  it("accepts semicolon comments alongside hash comments", async () => {
    editor.setText("; Choose commits\n# Another comment\npick 6a635bd Example\n");
    expect(await editor.whenGrammarSettled()).toBe(true);
    const root = editor.getSyntaxNodeAtBufferPosition([0, 0], (node) => !node.parent);
    expect(root.hasError).toBe(false);
    expect(editor.scopeDescriptorForBufferPosition([0, 2]).getScopesArray()).toContain(
      "comment.line.git-rebase",
    );
  });
});
