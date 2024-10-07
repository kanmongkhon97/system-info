import {BindingScope, injectable} from '@loopback/core';
import * as si from 'systeminformation';
import {exec} from 'child_process';

@injectable({scope: BindingScope.TRANSIENT})
export class SystemInfoService {
  constructor() { }

  async getCPUInfo() {
    return await si.cpu();
  }

  async getMemoryInfo() {
    return await si.mem();
  }

  async getDiskInfo() {
    return await si.fsSize();
  }

  async getOSInfo() {
    return await si.osInfo();
  }

  async getGPUInfo() {
    return await si.graphics();
  }
  async getNvidiaGPUInfo(): Promise<string> {
    return new Promise((resolve, reject) => {
      exec(
        'nvidia-smi --query-gpu=name,memory.total,memory.used,temperature.gpu --format=csv,noheader,nounits',
        (error, stdout, stderr) => {
          if (error) {
            reject(`Error executing nvidia-smi: ${error.message}`);
            return;
          }

          if (stderr) {
            reject(`Error: ${stderr}`);
            return;
          }

          resolve(stdout);
        },
      );
    });
  }

}
