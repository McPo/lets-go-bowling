# Background
Based on the game logic as defined in [dius_bowling](https://github.com/DiUS/coding-tests/blob/master/dius_bowling.md), with further clarification sought [here](https://bowling.sport/universal-playing-rules-chapter-2/).

# Install
`npm install`

# Run
To run the game script in _./src/main.ts_ execute `npm start`.

# Run Tests
`npm test`

# Notes
- Node v22.14.0 was used.
- Utilises ts-node with the most minimal configuration changes as its just a toy project.
- Would normally add a proper build system, linter, Docker etc. etc.
- Normally when I write tests, I wouldn't be too concerned about the purity of unit tests. As such I believe I over-thought this exercise, trying to write "unit tests" which I feel the reviewers wanted to see, rather than the ones I normally would write. This was even more apparent in the following commit [333559d](https://github.com/McPo/lets-go-bowling/commit/333559dbc0acf0d0fa34352181c1b0029d156023). I was not happy with them and ended up changing track into a style I normally would write. A few may not be considered pure unit tests depending on your definition, I have added relevant comments. Happy to adjust to whatever standards the existing codebase has.
- I have left some integration tests that I found helpful.
- May have overused getters, not sure I'm a fan of `isStrike` etc. being a getter. It should have just been a normal method.
- I've added some comments throughout the codebase, about areas to nitpick. Generally I would keep comments to documenting business logic.
- Looking forward to having the chance to discuss the codebase with you.
