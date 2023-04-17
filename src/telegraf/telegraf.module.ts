import { DynamicModule, Global, Module, Provider } from '@nestjs/common';
import { TelegrafService } from './telegraf.service';
import { ITelegrafModuleAsyncOptions } from './telegraf.interface';
import { TELEGRAF_MODULE_OPTIONS } from './telegraf.consts';

@Global()
@Module({})
export class TelegrafModule {
	static forRootAsync(options: ITelegrafModuleAsyncOptions): DynamicModule {
		const asyncOptions = TelegrafModule.createAsyncOptionsProvider(options);
		return {
			module: TelegrafModule,
			imports: options.imports,
			providers: [TelegrafService, asyncOptions],
			exports: [TelegrafService],
		};
	}

	private static createAsyncOptionsProvider(
		options: ITelegrafModuleAsyncOptions
	): Provider {
		return {
			provide: TELEGRAF_MODULE_OPTIONS,
			useFactory: async (...args: any[]) => {
				const config = await options.useFactory(...args);
				return config;
			},
			inject: options.inject || [],
		};
	}
}
