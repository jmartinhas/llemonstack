import { Config } from '@/core/config/mod.ts'
import { Service } from '@/core/services/mod.ts'

export class RAGFlowService extends Service {
  override async loadEnv(
    envVars: Record<string, string>,
    { config }: { config: Config },
  ): Promise<Record<string, string>> {
    envVars['MACOS'] = (config.host.os === 'macOS') ? '1' : '0'
    return envVars
  }
}

export default RAGFlowService
