const path = require("path");

// The fixture beside this file is a plain sample of the language — the file to
// open when you want to look at the highlighting rather than assert on it. This
// spec is only what stops the sample quietly rotting: the grammar still claims
// it, and it still tokenizes.

describe("Git sample fixtures", () => {
  beforeEach(async () => {
    await atom.packages.activatePackage("language-git");
    atom.config.set("language.useTreeSitterParsers", true);
  });

  it("parses sample.gitconfig without error", async () => {
    const editor = await atom.workspace.open(path.join(__dirname, "fixtures", "sample.gitconfig"));
    const languageMode = editor.getBuffer().getLanguageMode();
    await languageMode.ready;

    expect(editor.getGrammar().scopeName).toBe("source.git-config");
    expect(languageMode.tree.rootNode.hasError).toBe(false);
  });

  it("parses sample.gitignore without error", async () => {
    const editor = await atom.workspace.open(path.join(__dirname, "fixtures", "sample.gitignore"));
    const languageMode = editor.getBuffer().getLanguageMode();
    await languageMode.ready;

    expect(editor.getGrammar().scopeName).toBe("source.gitignore");
    expect(languageMode.tree.rootNode.hasError).toBe(false);
  });

  it("parses sample.gitattributes without error", async () => {
    const editor = await atom.workspace.open(
      path.join(__dirname, "fixtures", "sample.gitattributes"),
    );
    const languageMode = editor.getBuffer().getLanguageMode();
    await languageMode.ready;

    expect(editor.getGrammar().scopeName).toBe("source.gitattributes");
    expect(languageMode.tree.rootNode.hasError).toBe(false);
  });

  it("parses git-rebase-todo without error", async () => {
    const editor = await atom.workspace.open(path.join(__dirname, "fixtures", "git-rebase-todo"));
    const languageMode = editor.getBuffer().getLanguageMode();
    await languageMode.ready;

    expect(editor.getGrammar().scopeName).toBe("text.git-rebase");
    expect(languageMode.tree.rootNode.hasError).toBe(false);
  });

  it("tokenizes COMMIT_EDITMSG", async () => {
    const editor = await atom.workspace.open(path.join(__dirname, "fixtures", "COMMIT_EDITMSG"));

    expect(editor.getGrammar().scopeName).toBe("text.git-commit");

    // Every token carries the root scope, so a sample the grammar matched
    // nothing in still tokenizes — it just comes back as one flat run of
    // "text.git-commit" and nothing else. That is what this rules out.
    const scopes = new Set();
    for (let row = 0; row < editor.getLineCount(); row++) {
      for (const token of editor.tokensForScreenRow(row)) {
        for (const name of token.scopes) scopes.add(name);
      }
    }
    scopes.delete("text.git-commit");
    expect(scopes.size).toBeGreaterThan(0);
  });
});
