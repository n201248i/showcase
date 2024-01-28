/**
 * RelativeFs.
 * TODO: Add description.
 */

import { join } from "node:path"
import { existsSync, mkdirSync } from 'node:fs'
import { exists, mkdir } from 'node:fs/promises'
import { openDirRecursive, type OpenDirRecursiveoptions } from './openDirRecursive'

interface RelativeFsOptions {
	allowWrite?: boolean 
}

export class RelativeFs {
	baseDir: string
	options: RelativeFsOptions = {
		allowWrite: false
	}

	constructor(baseDir: string, options?: RelativeFsOptions) {
		this.baseDir = baseDir
		options && Object.assign(this.options, options)
		if (existsSync(this.baseDir)) {
			mkdirSync(this.baseDir, { recursive: true })
		}
	}

	// Async methods

	async mkdir(uri: string) {
		const path = this.join(uri)
		if (!await exists(path)) {
			await mkdir(path, { recursive: true })
		}
	}

	openDirRecursive(uri: string, options?: OpenDirRecursiveoptions) {
		const path = this.join(uri)
		openDirRecursive(path, options)
	}

	// Sync methods

	mkdirSync(uri: string) {
		const path = this.join(uri)
		if (!existsSync(path)) {
			mkdirSync(path, { recursive: true })
		}
	}

	join(...args: string[]) {
		return join(this.baseDir, ...args)
	}
}