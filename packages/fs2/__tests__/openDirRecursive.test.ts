import { join } from 'node:path'
import assert from 'node:assert'
import { test } from 'bun:test'
import { openDirRecursive } from '../openDirRecursive'
import type { Dirent } from 'node:fs'

test('openDirRecursive', async done => {
	const expected = [ 
		'/openDirRecursive/level0-1-file.txt', 
		'/openDirRecursive/level0-2-file.txt', 
		'/openDirRecursive/level1-1/level-2-2/level-2-2.txt'
	]
	const actual: string[] = []
	const path = join(import.meta.dir, 'openDirRecursive')
	const onFile = async (dirent: Dirent, path: string) => {
		const [,relativePath] = path.split('__tests__')
		actual.push(relativePath)
	}
	const onDir = async (dirent: Dirent, path: string) => {
		const [,relativePath] = path.split('__tests__')
	}
	await openDirRecursive(path, { onFile, onDir })
	assert.deepStrictEqual(expected, actual)
	done()
})
