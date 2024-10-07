
import {get} from '@loopback/rest';
import {SystemInfoService} from '../services/system-info.service';
import {service} from '@loopback/core';

export class SystemInfoController {
  constructor(
    @service(SystemInfoService)
    public systemInfoService: SystemInfoService,
  ) { }

  @get('/cpu')
  async getCPUInfo() {
    return this.systemInfoService.getCPUInfo();
  }

  @get('/memory')
  async getMemoryInfo() {
    return this.systemInfoService.getMemoryInfo();
  }

  @get('/disk')
  async getDiskInfo() {
    return this.systemInfoService.getDiskInfo();
  }

  @get('/os')
  async getOSInfo() {
    return this.systemInfoService.getOSInfo();
  }

  @get('/gpu')
  async getGPUInfo() {
    return this.systemInfoService.getGPUInfo();
  }

  @get('/nvidia-gpu')
  async getNvidiaGPUInfo() {
    try {
      const result = await this.systemInfoService.getNvidiaGPUInfo();
      return {info: result};
    } catch (error) {
      return {error};
    }
  }

}
