const path = require("path");

// The fixture beside this file is a plain sample of the language — the file to
// open when you want to look at the highlighting rather than assert on it. This
// spec is only what stops the sample quietly rotting: the grammar still claims
// it, and it still tokenizes.

describe("Git sample fixtures", () => {
  beforeEach(async () => {
    await lumine.packages.activatePackage("language-git");
    lumine.config.set("editor.useTreeSitterParsers", true);
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

  it("tokenizes COMMIT_EDITMSG", async () => {
    const editor = await lumine.workspace.open(path.join(__dirname, "fixtures", "COMMIT_EDITMSG"));

    expect(editor.getGrammar().scopeName).toBe("text.git-commit");

    // Read the grammar rather than the editor: a TextMate language mode
    // tokenizes lazily in the background, so scanning rows through the editor
    // reports whatever happened to be done by then — green on a fast machine
    // and red on a slow one. `tokenizeLines` is synchronous and complete.
    const text = require("fs").readFileSync(
      path.join(__dirname, "fixtures", "COMMIT_EDITMSG"),
      "utf8",
    );
    const scopes = new Set();
    for (const tokens of editor.getGrammar().tokenizeLines(text)) {
      for (const token of tokens) {
        for (const name of token.scopes) scopes.add(name);
      }
    }

    // Every token carries the root scope, so a sample the grammar matched
    // nothing in still tokenizes — it just comes back as one flat run of
    // "text.git-commit" and nothing else. That is what this rules out.
    scopes.delete("text.git-commit");
    expect(scopes.size).toBeGreaterThan(0);
  });
});
