import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import test from 'node:test';

const root = path.resolve(process.env.PPT_SKILL_ROOT || '.');

function read(file) {
  return fs.readFileSync(path.join(root, file), 'utf8');
}

function pngHeader(file) {
  const data = fs.readFileSync(path.join(root, file));
  assert.deepEqual([...data.subarray(0, 8)], [137, 80, 78, 71, 13, 10, 26, 10]);
  return {
    width: data.readUInt32BE(16),
    height: data.readUInt32BE(20),
    bitDepth: data[24],
    colorType: data[25],
  };
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
  assert.match(skill, /^---\nname: ppt-page-image-director\ndescription: Use when /);

  for (const file of textFiles(root).filter((file) => file.endsWith('.md'))) {
    const body = fs.readFileSync(file, 'utf8');
    for (const match of body.matchAll(/\]\(([^)#]+\.md)(?:#[^)]+)?\)/g)) {
      const target = path.resolve(path.dirname(file), match[1]);
      assert.ok(fs.existsSync(target), `missing Markdown link: ${file} -> ${match[1]}`);
    }
  }
});

test('Logo variants use the same normalized RGBA canvas', () => {
  const light = pngHeader('assets/guliai-logo-on-light.png');
  const dark = pngHeader('assets/guliai-logo-on-dark.png');
  assert.deepEqual(light, dark);
  assert.equal(light.bitDepth, 8);
  assert.equal(light.colorType, 6);
  assert.ok(light.width > light.height * 2.5);
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

test('Open-source and brand boundaries are explicit', () => {
  assert.match(read('LICENSE'), /MIT License/);
  assert.match(read('BRAND-ASSETS.md'), /不授予.*商标权/);
  assert.match(read('README.md'), /不等于可编辑 PPTX/);
});
