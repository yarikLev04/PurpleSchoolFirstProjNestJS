import { ITelegrafOptions } from '../telegraf/telegraf.interface';
import { ConfigService } from '@nestjs/config';

export const getTelegrafConfig = async (
	configService: ConfigService
): Promise<ITelegrafOptions> => {
	const token = configService.get('TELEGRAF_TOKEN');
	if (!token) {
		throw new Error('TELEGRAF_TOKEN не задан');
	}
	return {
		token: token,
		chatId: configService.get('CHAT_ID') ?? '',
	};
};
