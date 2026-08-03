// Pins which files `source.gitignore` wins.
//
// `.dockerignore`, `.eslintignore`, `.npmignore` and `.prettierignore` are all
// gitignore syntax — glob patterns, `!` re-inclusion, `#` comments — whoever
// reads them. `.dockerignore` in particular was claimed by
// language-dockerfile, where a pattern line is not an instruction.
//
// Assert on `fileTypes`, not only on who wins. Two grammars claiming the same
// type score identically and `selectGrammar` picks on strict `>`, so an exact
// tie falls through to enumeration order — package activation order, which is
// not stable across platforms. A "wins the file" assertion can therefore pass
// on load-order luck while the stray claim is still there.

const IGNORE_FILES = [".dockerignore", ".eslintignore", ".npmignore", ".prettierignore"];

describe("Gitignore grammar selection", () => {
  beforeEach(async () => {
    await atom.packages.activatePackage("language-git");
    await atom.packages.activatePackage("language-dockerfile");
  });

  it("is the only grammar claiming the ignore-file types", () => {
    const grammars = atom.grammars.getGrammars({ includeTreeSitter: true });

    for (const file of IGNORE_FILES) {
      const type = file.slice(1);
      const claimants = grammars
        .filter((grammar) =>
          (grammar.fileTypes ?? []).some((fileType) => fileType.replace(/^\./, "") === type),
        )
        .map((grammar) => grammar.scopeName);

      expect(claimants.length).toBeGreaterThan(0);
      for (const scopeName of claimants) expect(scopeName).toBe("source.gitignore");
    }
  });

  it("wins every ignore file", () => {
    for (const file of IGNORE_FILES) {
      expect(atom.grammars.selectGrammar(file).scopeName).toBe("source.gitignore");
    }
    expect(atom.grammars.selectGrammar(".gitignore").scopeName).toBe("source.gitignore");
  });

  it("still leaves Dockerfile to language-dockerfile", () => {
    expect(atom.grammars.selectGrammar("Dockerfile").scopeName).toBe("source.dockerfile");
    expect(atom.grammars.selectGrammar("Containerfile").scopeName).toBe("source.dockerfile");
  });

  it("tokenizes a .prettierignore as ignore patterns", async () => {
    const editor = await atom.workspace.open(".prettierignore");
    editor.setText("# generated\nnode_modules/\n!keep.js\n");
    await editor.languageMode.ready;

    expect(editor.scopeDescriptorForBufferPosition([0, 2]).scopes).toContain(
      "comment.line.gitignore",
    );
    expect(editor.scopeDescriptorForBufferPosition([2, 0]).scopes).toContain(
      "keyword.operator.negation.gitignore",
    );
  });
});
