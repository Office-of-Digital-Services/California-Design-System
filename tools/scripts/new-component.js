import { promises as fs } from 'fs';
import chalk from 'chalk';
import prompts from 'prompts';

const css = `
.example {
  color: red;
}
`.trim();

const html = (name) => `
<!-- Your new component's markup goes below. -->
<h1>${name}</h1>
<p>Welcome to your new ${name} component.
<p>See <em>src/${name}</em> for the new code.</p>
<p>You'll need to add a reference to your new CSS file into <em>src/_bundles/bundle.css</em>.
<p>If this is <span class="example">red</span>, you're ready to go.</p>
`.trim();

const questions = [
  {
    type: 'text',
    name: 'name',
    message: "What's the name of your new component? (Use dash-case, no spaces.)"
  }
];

const getResponses = async () => prompts(questions);
const responses = await getResponses();
const { name } = responses;

const newDir = `src/${name}`;
await fs.mkdir(newDir, { recursive: true });

const newHtmlPath = `${newDir}/${name}.html` 
console.log(`${chalk.blue("[Eureka]")} Writing ./${newHtmlPath}`);
await fs.writeFile(newHtmlPath, html(name));

const newCssPath = `${newDir}/${name}.css` 
console.log(`${chalk.blue("[Eureka]")} Writing ./${newCssPath}`);
await fs.writeFile(newCssPath, css);




