import { Inject, Injectable } from '@nestjs/common';
import { Telegraf } from 'telegraf';
import { ITelegrafOptions } from './telegraf.interface';
import { TELEGRAF_MODULE_OPTIONS } from './telegraf.consts';

@Injectable()
export class TelegrafService {
	private bot: Telegraf;
	private options: ITelegrafOptions;

	constructor(@Inject(TELEGRAF_MODULE_OPTIONS) options: ITelegrafOptions) {
		this.bot = new Telegraf(options.token);
		this.options = options;
	}

	async sendMessage(message: string, chatId: string = this.options.chatId) {
		await this.bot.telegram.sendMessage(chatId, message);
	}
}
