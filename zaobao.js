const parse = require('taskpaper');
const dayjs = require('dayjs');
const assert = require('assert');
const { get } = require('./lib/taskpaper');

const ast = parse(get());
const today = dayjs().format('YYYY-MM-DD');
const todayProject = ast.children.filter(project => {
  return project.type === 'project' && project.value === today;
})[0];

assert(
  todayProject,
  `Can not found project of ${today}`,
);

let readings = [];
let stars = [];
let releases = [];
let tweets = [];
todayProject.children.forEach(task => {
  if (task.type !== 'task') return;
  if (!task.tags) return;
  if (task.tags.includes('reading')) {
    readings.push(task);
  }
  if (task.tags.includes('star')) {
    stars.push(task);
  }
  if (task.tags.includes('release')) {
    releases.push(task);
  }
  if (task.tags.includes('tweet')) {
    tweets.push(task);
  }
});

function formatTasks(tasks) {
  if (!tasks.length) return '无';
  return tasks.map(task => {
    return `
- **${task.value}** ${task.tags.map(t => `\`@${t}\``).join(' ')}
  ${task.children[0] ? task.children[0].value : ''}
    `.trim();
  }).join('\n');
}

const output = `
# 早报 @ ${dayjs().format('YYYY.MM.DD')}

## 发布

${formatTasks(releases)}

## 文章

${formatTasks(readings)}

## Star

${formatTasks(stars)}

## Tweets

${formatTasks(tweets)}

---

往期早报：https://github.com/sorrycc/zaobao/issues 。
`.trim();
console.log(output);
