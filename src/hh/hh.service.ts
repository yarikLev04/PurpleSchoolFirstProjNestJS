import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HttpService } from '@nestjs/axios';
import { HhResponse } from './hh.models';
import {
	API_DEV_HH_URLS,
	CLUSTER_FIND_ERROR,
	SALARY_CLUSTER_ID,
} from './hh.consts';
import { HhData } from '../top-page/top-page.model';
import { AxiosResponse } from 'axios';

@Injectable()
export class HhService {
	private token: string;

	constructor(
		private readonly configService: ConfigService,
		private readonly httpService: HttpService
	) {
		this.token = configService.get('DEV_HH_TOKEN') ?? '';
	}

	async getData(text: string) {
		try {
			const { data } = (await this.httpService
				.get<HhResponse>(API_DEV_HH_URLS.vacancies, {
					params: {
						text,
						clusters: true,
					},
					headers: {
						'User-Agent': 'OwlTop/1.0 (yl30042004@gmail.com)',
						Authorization: 'Bearer ' + this.token,
					},
				})
				.toPromise()) as AxiosResponse<HhResponse>;

			return this.parseData(data);
		} catch (e) {
			Logger.log(e);
		}
	}

	private parseData(data: HhResponse): HhData {
		const salaryCluster = data.clusters.find((c) => c.id === SALARY_CLUSTER_ID);

		if (!salaryCluster) {
			throw new Error(CLUSTER_FIND_ERROR);
		}

		const juniorSalary = this.getSalaryFromString(salaryCluster.items[1].name);
		const middleSalary = this.getSalaryFromString(
			salaryCluster.items[Math.ceil(salaryCluster.items.length / 2)].name
		);
		const seniorSalary = this.getSalaryFromString(
			salaryCluster.items[salaryCluster.items.length - 1].name
		);

		return {
			count: data.found,
			juniorSalary,
			middleSalary,
			seniorSalary,
			updatedAt: new Date(),
		};
	}

	private getSalaryFromString(string: string): number {
		const numberRegExp = /(\d+)/g;

		const result = string.match(numberRegExp);

		if (!result) {
			return 0;
		}

		return Number(result[0]);
	}
}
