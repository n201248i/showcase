import { lstat, opendir } from 'node:fs/promises'
import type { Dirent } from 'node:fs'
import { join } from 'node:path'

export type OpenDirRecursiveCallback = (dirent: any, path: string) => Promise<unknown>

export type OpenDirRecursiveoptions = {
	onFile?: OpenDirRecursiveCallback,
	onDir?: OpenDirRecursiveCallback
}

async function _processDirent(dirent: Dirent, path: string, options?: OpenDirRecursiveoptions) {
	if (dirent.isDirectory()) {
		await openDirRecursive(join(path, dirent.name), options)
	} else {
		options?.onFile && await options?.onFile(dirent, join(path, dirent.name))
	}
}

/**
 * Iterates dir recursively call onFile callback for each file and onDir after all nested onFile callbacks are processed.
 */
export async function openDirRecursive(
	path: string, 
	options?: OpenDirRecursiveoptions
) {
	const dir = await opendir(path)

	for await (const dirent of dir) {
		await _processDirent(dirent, path, options)
	}
	
	const dirent = await lstat(path)
	if (dirent.isDirectory() && options?.onDir) {
		await options.onDir(dirent, path)
	}
}