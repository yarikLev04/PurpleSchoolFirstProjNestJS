import { ModuleMetadata } from '@nestjs/common';

export interface ITelegrafOptions {
	chatId: string;
	token: string;
}

export interface ITelegrafModuleAsyncOptions
	extends Pick<ModuleMetadata, 'imports'> {
	useFactory: (...args: any[]) => Promise<ITelegrafOptions> | ITelegrafOptions;
	inject?: any[];
}
