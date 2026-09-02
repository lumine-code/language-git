const path = require("path");

// The fixture beside this file is a plain sample of the language — the file to
// open when you want to look at the highlighting rather than assert on it. This
// spec is only what stops the sample quietly rotting: the grammar still claims
// it, and it still tokenizes.

describe("Git sample fixtures", () => {
  beforeEach(async () => {
    await lumine.packages.activatePackage("language-git");
  });

  it("parses sample.gitconfig without error", async () => {
    const editor = await lumine.workspace.open(
      path.join(__dirname, "fixtures", "sample.gitconfig"),
    );
    const languageMode = editor.getBuffer().getLanguageMode();
    await languageMode.ready;

    expect(editor.getGrammar().scopeName).toBe("source.git-config");
    expect(languageMode.tree.rootNode.hasError).toBe(false);
  });

  it("parses sample.gitignore without error", async () => {
    const editor = await lumine.workspace.open(
      path.join(__dirname, "fixtures", "sample.gitignore"),
    );
    const languageMode = editor.getBuffer().getLanguageMode();
    await languageMode.ready;

    expect(editor.getGrammar().scopeName).toBe("source.gitignore");
    expect(languageMode.tree.rootNode.hasError).toBe(false);
  });

  it("parses sample.gitattributes without error", async () => {
    const editor = await lumine.workspace.open(
      path.join(__dirname, "fixtures", "sample.gitattributes"),
    );
    const languageMode = editor.getBuffer().getLanguageMode();
    await languageMode.ready;

    expect(editor.getGrammar().scopeName).toBe("source.gitattributes");
    expect(languageMode.tree.rootNode.hasError).toBe(false);
  });

  it("parses git-rebase-todo without error", async () => {
    const editor = await lumine.workspace.open(path.join(__dirname, "fixtures", "git-rebase-todo"));
    const languageMode = editor.getBuffer().getLanguageMode();
    await languageMode.ready;

    expect(editor.getGrammar().scopeName).toBe("text.git-rebase");
    expect(languageMode.tree.rootNode.hasError).toBe(false);
  });

  it("parses and highlights COMMIT_EDITMSG", async () => {
    const editor = await lumine.workspace.open(path.join(__dirname, "fixtures", "COMMIT_EDITMSG"));
    const languageMode = editor.getBuffer().getLanguageMode();
    await languageMode.ready;

    expect(editor.getGrammar().scopeName).toBe("text.git-commit");
    expect(languageMode.tree.rootNode.hasError).toBe(false);
    expect(editor.scopeDescriptorForBufferPosition([0, 2]).getScopesArray()).toContain(
      "markup.heading.git-commit",
    );
    expect(editor.scopeDescriptorForBufferPosition([9, 2]).getScopesArray()).toContain(
      "comment.line.number-sign.git-commit",
    );
    expect(editor.scopeDescriptorForBufferPosition([16, 15]).getScopesArray()).toContain(
      "string.unquoted.path.git-commit",
    );
  });
});
