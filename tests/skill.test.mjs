import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import test from 'node:test';

const root = path.resolve(process.env.PPT_SKILL_ROOT || '.');

function read(file) {
  return fs.readFileSync(path.join(root, file), 'utf8');
}

function textFiles(directory) {
  return fs.readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const target = path.join(directory, entry.name);
    if (entry.isDirectory() && entry.name !== '.git') return textFiles(target);
    if (entry.isFile() && /\.(md|yaml|yml|mjs|json|txt)$/.test(entry.name)) return [target];
    return [];
  });
}

test('Skill is discoverable and all local Markdown links resolve', () => {
  const skill = read('SKILL.md');
  assert.match(skill, /^---\nname: ppt-page-content-director\ndescription: Use when /);
  assert.match(read('agents/openai.yaml'), /\$ppt-page-content-director/);

  for (const file of textFiles(root).filter((file) => file.endsWith('.md'))) {
    const body = fs.readFileSync(file, 'utf8');
    for (const match of body.matchAll(/\]\(([^)#]+\.md)(?:#[^)]+)?\)/g)) {
      const target = path.resolve(path.dirname(file), match[1]);
      assert.ok(fs.existsSync(target), `missing Markdown link: ${file} -> ${match[1]}`);
    }
  }
});

test('Repository is portable and excludes legacy execution dependencies', () => {
  const content = textFiles(root)
    .filter((file) => !file.endsWith(path.join('tests', 'skill.test.mjs')))
    .map((file) => fs.readFileSync(file, 'utf8'))
    .join('\n');
  const legacyPopup = ['Ask', 'UserQuestion'].join('');
  const legacyScript = ['gen', '_images', '.js'].join('');
  const tokenPrefix = ['gh', 'p_'].join('');
  assert.doesNotMatch(content, /\/Users\/[^/]+\//);
  assert.doesNotMatch(content, new RegExp(`${legacyPopup}|${legacyScript}|node scripts/`));
  assert.doesNotMatch(content, new RegExp(`BEGIN (RSA |OPENSSH )?PRIVATE KEY|${tokenPrefix}[A-Za-z0-9]+`));
});

test('Open-source boundary and editable-PPTX boundary are explicit', () => {
  assert.match(read('LICENSE'), /MIT License/);
  assert.match(read('README.md'), /不等于可编辑 PPTX/);
});

test('Produces a visual-neutral page-content package for downstream rendering', () => {
  const skill = read('SKILL.md');
  const packageGuide = read('references/page-content-package.md');

  assert.match(skill, /逐页内容包/);
  assert.match(skill, /guliai-visual-design/);
  assert.doesNotMatch(skill, /DeckDesignSystem|visual_anchor|native-one-shot|imagegen/);
  assert.match(packageGuide, /page_no/);
  assert.match(packageGuide, /page_title/);
  assert.match(packageGuide, /core_message/);
  assert.match(packageGuide, /bullets/);
  assert.match(packageGuide, /key_terms/);
  assert.match(packageGuide, /must_preserve/);
  assert.match(packageGuide, /structure_hint.*可选/);
  assert.doesNotMatch(packageGuide, /标题轨道|卡片圆角|视觉锚点|Logo 安全区/);
});
