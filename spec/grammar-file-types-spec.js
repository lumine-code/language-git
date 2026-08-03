// Pins the file types the Gitignore grammar claims.
//
// `.dockerignore`, `.eslintignore`, `.npmignore` and `.prettierignore` are all
// gitignore syntax — glob patterns, `!` re-inclusion, `#` comments — whoever
// reads them. Only `.dockerignore` had a grammar before, language-dockerfile's,
// where a pattern line is not an instruction; the other three had none.
//
// This suite deliberately asserts only what this package controls. Whether
// `.dockerignore` actually *resolves* here depends on language-dockerfile no
// longer claiming it, and a sibling's grammars reach the integration job from
// whichever Lumine build it checks out — not from this repository. Asserting
// that here made this package's CI fail for a fix that had already landed. The
// cross-package assertion belongs where the bundled set is defined, so it lives
// in the editor's own `check:grammar-file-types`.

const IGNORE_TYPES = [
  ".gitignore",
  "gitignore",
  ".dockerignore",
  "dockerignore",
  ".eslintignore",
  "eslintignore",
  ".npmignore",
  "npmignore",
  ".prettierignore",
  "prettierignore",
];

describe("Gitignore grammar file types", () => {
  beforeEach(async () => {
    await atom.packages.activatePackage("language-git");
  });

  it("claims every ignore file that uses gitignore syntax", () => {
    const grammar = atom.grammars.grammarForScopeName("source.gitignore");
    expect(grammar).toBeTruthy();
    expect(grammar.fileTypes.slice().sort()).toEqual(IGNORE_TYPES.slice().sort());
  });

  it("scopes ignore patterns, comments and negation", async () => {
    const editor = await atom.workspace.open();
    editor.setText("# generated\nnode_modules/\n!keep.js\n");
    atom.grammars.assignLanguageMode(editor.getBuffer(), "source.gitignore");
    await editor.languageMode.ready;

    expect(editor.scopeDescriptorForBufferPosition([0, 2]).scopes).toContain(
      "comment.line.gitignore",
    );
    expect(editor.scopeDescriptorForBufferPosition([2, 0]).scopes).toContain(
      "keyword.operator.negation.gitignore",
    );
  });
});
