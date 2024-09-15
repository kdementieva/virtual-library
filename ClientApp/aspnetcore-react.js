import * as fs from 'fs';
import * as path from 'path';

const packageJsonPath = path.resolve('package.json');
const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf-8'));
const appName = packageJson.name;

const baseFolder =
  process.env.APPDATA !== undefined && process.env.APPDATA !== ''
    ? `${process.env.APPDATA}/ASP.NET/https`
    : `${process.env.HOME}/.aspnet/https`;

const certificateArg = process.argv.map(arg => arg.match(/--name=(?<value>.+)/i)).filter(Boolean)[0];
const certificateName = certificateArg ? certificateArg.groups.value : appName;

if (!certificateName) {
  console.error('Invalid certificate name. Run this script in the context of an npm/yarn script or pass --name=<<app>> explicitly.');
  process.exit(-1);
}

const certFilePath = path.join(baseFolder, `${certificateName}.pem`);
const keyFilePath = path.join(baseFolder, `${certificateName}.key`);

const envFilePath = '.env.development.local';

if (!fs.existsSync(envFilePath)) {
  fs.writeFileSync(
    envFilePath,
    `VITE_SSL_CRT_FILE=${certFilePath}\nVITE_SSL_KEY_FILE=${keyFilePath}`
  );
} else {
  let lines = fs.readFileSync(envFilePath)
    .toString()
    .split('\n');

  let hasCert = false, hasCertKey = false;
  for (const line of lines) {
    if (/^VITE_SSL_CRT_FILE=.*/i.test(line)) {
      hasCert = true;
    }
    if (/^VITE_SSL_KEY_FILE=.*/i.test(line)) {
      hasCertKey = true;
    }
  }
  if (!hasCert) {
    fs.appendFileSync(
      envFilePath,
      `\nVITE_SSL_CRT_FILE=${certFilePath}`
    );
  }
  if (!hasCertKey) {
    fs.appendFileSync(
      envFilePath,
      `\nVITE_SSL_KEY_FILE=${keyFilePath}`
    );
  }
}