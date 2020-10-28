# 2.6.0

Features:

- Add inner configuration support via `.sharecrc.json` or `sharec` field in
configuration package's `package.json` file

# 2.5.3

Fixes:

- Apply fomatting parameter name fix (#156)

# 2.5.2

Fixes:

- Prevent tabs in `yaml` files formatting (#156)

# 2.5.1

Fixes:

- Handle commands merge when duplicates eixist (#142)

# 2.5.0

Features:

- Add special logic for npm scripts merging (#61)

# v2.4.0

This release includes interactive mode for better UX.

Features:

- Add `interactive` mode (#117)

# v2.3.0

This release includes formattings with `editorconfig` and `prettier`.

It is not formats all the code, but can handle indent style and width.

Features:

- `prettier` standalone configuration files support
- Add ability to format configs with `.editorconfig` (#104)
- Add ability to format configs with `prettier` (#104)
- Also add step for applying unified format, which can be received from `.editorconfig` or different configs (#104)

Fixes:

- `json` comments support. Parser just removes all comments from result (#124)

Refactor:

- EOF inserts only if `.editorconfig` is provided with `insert_final_newline` option

# v2.2.2

Fixes:

- Add support of `overrides` field for `eslint`

# v2.2.1

Fixes:

- Crush when `package.json` not exist in upcoming configs

# v2.2.0

This release includes new step types - processors. These steps transforms data
passed through them. It is better solution for any configuration post-procession,
like meta injecting or formatting.

Features:

- `writeMeta` now is pure step
- Inserting EOL wrap to each file (now it is not configurable)
- Add `--include-cache` option for storing configuration cache outside of `node_modules`

# v2.1.2

Chore:

- Move all linters and other tools to the root of project

Fix:

- Removed configuration files now not rewrites by upcoming package

# v2.1.1

Fix:

- Nested configs paths fix if target directory is not exist

# v2.1.0

Features:

- Sharec skip fields removed by user (#78)

Fix:

- Aliases for configs pipes (#107)

# v2.0.3

Fix:

- Remove error if target package is dependent of sharec
- Quotes processing in YAML files

# v2.0.2

Fix:

- Handling internal errors

CI:

- Add linters
- Add node 14

# v2.0.1

Fix:

- Add `nanomatch`

# v2.0.0

Finally, `sharec` looks like it should be! :)

Features:

- Save fields order after configuration apply (#48)
- New logo

# v2.0.0-rc.0

This release should contain new strategies and composition API.

Also it includes strategies and pipes (new term of "strategy") for
many new tools, like - `lint-staged` or `jest`.

Features:

- Implements atomic strategies conception (#66)
- Adds strategies for `husky`, `lint-staged`, `jest`, `stylelint`, `browserslist`, `postcss`, `commitlint` etc.
- Better support for `package.json` fields
- Disappear mode
- Logger and debug mode

Beaking changes:

- `remove` command was deprecated
- `tester` and `extractor` were deprecated and removed

CI:

- Remove Travis CI
- Remove appveyor

# v2.14.0-beta

Features:

- Add local test config with current version of `sharec`

Fixes:

- Windows support (#81)
- CI builds on windows and node 13

# v2.13.0-beta

This release includes updated installing flow and fixes a lot of bugs with
cache handing and updating.

The new algorithm should works as expected in the beggining:

- Removes cached configs
- Saves fields changed by user
- Apply upcoming changes without user-changes overwriting

Features:

- Add double qoutes style supporting in YAML files (#76)
- Backward compatibility for old meta format

Fixes:

- `overwrite` mode now correctly works with `package.json` configs
- `.gitignore` and `.travis.yml` ereasing during update (#75)
- Another fix for dependencies merging

Docs:

- Add CHANGELOG.md

# v2.12.1-beta

Features:

- Add sharec.ignore property handling for target projects

Fixes:

- Correctly handling cases when package is not dependent of sharec core (#72)

# v2.11.0-beta

Features:

- Forcing filename through strategies alias constructor option (#60)
- browserslist strategy (#57)
- postcss strategy (#56)

Refactoring:

- mergeLines and unappllyLines methods logic change

# v2.10.0-beta

Very important release, because it is fully changes updating flow.
Remember, it is not stable version and API certainly would be changed!

Features:

- Upcoming configuration caching
- Merging without cache (#47)
- Much simple installing flow
- Refactored tests and fixtures
- version command that prints sharec and current config version

Fixes:

- Remove command now not calls on each install or re-install event
- Some bugs with paths and fixtures on windows

Breaking changes:

- Remove command now calls only from CLI

# v2.9.0-beta

Features:

- Tester now has pretty output for diff

Refactor:

- Split tester to little modules

# v2.8.0-beta

Very important release! 🙂
Includes test utils for configuration which based on sharec. Everyone can test configuration with fixtures (static files) like with snapshots.

Features:

- Implement extractor package
- Implement tester package

⚠️ Extractor works only on systems with shell support!

# v2.7.0-beta

Features:

- Linear strategies for working with
- Strategy for package.json file fields
- Strategy for .gitignore and .npmignore (#45)
- Dependencies merging and unapplying moved to package.json strategy (#49)
- Scripts merging and unapplying moved to package.json strategy (#46, #47)

Fixes:

- package.json scripts and dependencies merging (#46, #47, #49)

# v2.6.0-beta

A huge documentation update.

Features:

- Add errors logging on configuration merge for better debugging and UX.

# v2.5.0-beta

Features:

- Add yaspeller strategy
- Add silent option for install command
- Add some docs and fixes to packages.json files

# v2.4.0-beta

Features:

- Remove task now always silent

# v2.3.0-beta

This version includes the most refactoring things instead features or fixes.

Features:

- sharec meta-data includes current configuration version

Fixes:

- `postinstall` command and init task were removed

# v2.2.0-beta

Fixes:

- Critical fix for package.json merging. Versions below – works incorrect.

# v2.0.0-beta

This release includes fully rewritten package. The main changes have affect architecture and made it simpler.
commands now are the most upper abstraction and uses tasks as entry point for core API.

Features:

- Auto-installing scripts to target configuration package (postinstall, preuninstall) and creating configs directory. User remains just place files into configs directory and publish package.
- Removing command, it allows users to remove configuration without any pain.
- Updating configuration. After installing configuration with new version – previous configuration will be fully removed and upcoming configs will be applied instead.

Fixes:

- Common strategy merge algorithm now is working correctly.

# v1.3.2

Fixes:

- Package dependencies extracting

# v1.3.1

Update core docs and READMEs of all packages.
Also includes web-site updates.

# v1.3.0

The first version of Sharec. Includes all core features and provides
some environment configuration.
