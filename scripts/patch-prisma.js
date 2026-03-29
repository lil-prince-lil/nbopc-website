// Patch the generated Prisma client to include datasource URL
// This is needed because Prisma 7 removed url from schema but the runtime still needs it
const fs = require('fs')
const path = require('path')

const filePath = path.join(__dirname, '..', 'src', 'generated', 'prisma', 'internal', 'class.ts')

if (!fs.existsSync(filePath)) {
  console.log('Prisma client not generated yet, skipping patch')
  process.exit(0)
}

let content = fs.readFileSync(filePath, 'utf-8')

const oldDatasource = 'datasource db {\\n  provider = \\"sqlite\\"\\n}'
const newDatasource = 'datasource db {\\n  provider = \\"sqlite\\"\\n  url      = env(\\"DATABASE_URL\\")\\n}'

if (content.includes(oldDatasource)) {
  content = content.replace(oldDatasource, newDatasource)
  fs.writeFileSync(filePath, content)
  console.log('Patched Prisma client: added datasource url')
} else if (content.includes('env(\\"DATABASE_URL\\")')) {
  console.log('Prisma client already patched')
} else {
  console.log('Could not find datasource to patch')
}
