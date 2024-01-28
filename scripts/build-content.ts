import { RelativeFs } from 'fs2/relativeFs'
import { join } from 'node:path'

const contentFs = new RelativeFs(join(import.meta.dir, '..', 'content'))
console.log(contentFs)