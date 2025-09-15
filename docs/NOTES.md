# WIP Notes

This is just a scratchpad for WIP project notes to keep the main README clean.

## TODO

**Record Videos:**

- [x] Demo of llemonstack setup
- [ ] Import tutorials
- [ ] LiteLLM tutorial: n8n, flowise, viewing cost, viewing langfuse logs

**Code:**

- [ ] Mount a volume to crawl4ai for saving screenshots

- [ ] Replace zep with graphiti: https://github.com/getzep/graphiti and add MCP server

- [ ] Add support for .env.example for each service instead of using a global .env.example

- [ ] Update info command to show endpoints for running services

- [ ] Add LightRAG MCP server

- [ ] Add RAGFlow service

- [x] Remove the imports folder from repo, add to service.ts files
- [x] Add llmn version output to versions script
- [x] Remove all config.initialize() calls except for in cli.ts
- [x] Finish the new config script
- [x] Move enabled services from env vars to config.json
- [x] Create Flowise service subclass to set FLOWISE_API_KEY env var
- [x] Move ALL_COMPOSE_SERVICES to Config
  - [x] Load from yaml''s from services/ dir then cache in config.json
- [x] Create helper function in logger lib for outputting TryCatchResult messages
- [x] Test init script to make sure it's working with new Config lib
- [x] Create service lib
  - [x] Load & parse service llemonstack.yaml
- [x] Refactor to use Config lib
- [x] Add tryCatch to libs
- [x] Run `docker network create ${LLEMONSTACK_NETWORK_NAME}` before starting all services
- [x] In all services compose files, set the network to external, set the default network name
- [x] Rework start / stop scripts to run separate processes for each service. Loading of .env is only supported in the first docker-compose file dir and service names are merged which will lead to conflicts later on.
- [x] Cleanup settings.json and deno.jsonc after migrating to services/
- [x] Register llmn as bin alias for cli.ts
- [x] Create an install script that installs deno and git and checks for docker
- [x] Update README.md with `llmn` commands instead of `deno run`
- [x] Disable supabase-analytics, it eats memory and CPU & is not needed
- [x] Move supabase volumes to ./volumes to make backup easier and protect against .repos deletion
- [x] Add dozzle labels to services to group logging See https://dozzle.dev/guide/container-groups
- [x] Delete ./volumes dir during reset script
- [x] Disable Logflare in supabase docker; it hammers the disk
      https://www.reddit.com/r/Supabase/comments/1fw2g62/disable_or_adjust_logging_self_hosted/
- [x] SKIPPED: [Logflare replaced] Add docker/supabase.env passwords to init scripts
- [x] SKIPPED: Update versions script to get app versions from running containers
      `docker compose -p llemonstack ps --format '"{{.Name}}"'` ps is too slow, not implementing
      this
- [x] Add langfuse UI url to start output
- [x] Add LiteLLM UI url to start output
- [x] Add LiteLLM API url to start output
- [x] Configure LiteLLM to set UI_USERNAME and pass from .env
- [x] Configure LiteLLM to log to Langfuse
- [x] Configure LiteLLM to use redis as cache layer
- [x] Start services in parallel in start script
- [x] Add minio UI & API to start script: http://localhost:9091
- [x] Add Redis to the stack
- [x] Add Langfuse to the stack
- [x] Add LiteLLM to use as LLM proxy for all services
- [x] Switch n8n import to run command in existing container
- [x] Rebuild n8n examples with pre-configured credentials
- [x] Update the import script to replace all ${var} style strings with env vars before running
      import in the container
- [x] Switch to separate compose yml files & simplify process for adding new service
- [x] Show api endpoints for internal config on start
- [x] Create export script for n8n workflows to shared folder, use --decrypted flag
- [x] Always prep supabaseEnv before doing anything else
  - fixes issue with update script not pulling images
- [x] Convert to new runCommands API
- [x] Add [Browser-Use](https://github.com/browser-use/browser-use) to automate browsers
- [x] Rebuild browser-use image in update.ts script
- [x] Implement reset.ts script
- [x] Add n8n enabled/disabled support in .env and docker-compose.yml
- [x] Disable parallel starting of services, the output gets mangled
- [x] Re-enable parallel setupRepos
- [x] Get image version from `docker inspect` if not available in docker-compose.yml
- [x] Create a setup script to generate random passwords and JWT secrets
- [x] Update install instructions for deno

**Someday / low priority:**

- [ ] Create Flowise example templates of Web Scrape QnA configured with pgvector and LiteLLM See
      https://docs.flowiseai.com/use-cases/web-scrape-qna
- [ ] Configure OpenWeb UI to use postgres
- [ ] Rebuild example n8n templates to use LiteLLM, use env.LITELLM_API_KEY
- [ ] Publish llemonstack as a npm module to install globally
- [ ] Replace fs.existsSync with Deno.stat
- [ ] Rework Relayer to not instantiate InterfaceRelay, provide it during init
- [ ] Add verbose logging to each log level? or just to debug
- [ ] Replace silent option in scripts with relayer logging
- [ ] Add llemonstack labels to containers when started to make it easier to `docker ps` to inspect
  - Especiallly important when multiple services use the same service name in the future.
- [ ] Create preconfigured styles for showTable
- [ ] Add browser-use-bridge to broswer-use container to use in n8n
      https://github.com/draphonix/browser-n8n-local
      https://www.npmjs.com/package/n8n-nodes-browser-use
      Provides an API for n8n to connect to control browser-use
- [ ] Remove all container_name from docker-compose.yml to allow for multiple stacks to run at the
      same time
- [ ] During init, set a unique base port and then set all exposed (host) ports to an offset. This
      allows for multiple stacks to run simultaneously
- [ ] Use a global .llemonstack directory to manage all projects
  - [ ] Check for project name collisions since the docker volumes will collide if the project name
        is the same
- [ ] Refactor with [Repo Prompt](https://repoprompt.com/)?
- [ ] Patch n8n LangChain to auto config Langfuse for LangChain code nodes
- [ ] Ceate custom n8n node to use Langfuse to get prompts
- [ ] Create an install script that installs deno, docker, etc. See
      https://github.com/SigNoz/signoz/blob/main/deploy/install.sh as good example
- [ ] Configure LiteLLM to cache qdrant embeddings
      https://docs.litellm.ai/docs/proxy/config_settings
- [ ] Configure LiteLLM to use supabase for request logs:
      https://docs.litellm.ai/docs/observability/supabase_integration
- [ ] Switch to Open Router for LLM calls
- [ ] Switch to [execa](https://github.com/sindresorhus/execa) for running shell commands if needed on Windows
- [ ] Document how to use podman on mac to enable ollama GPU support

**Where to Promote:**

- [ ] Promote this stack
- https://thinktank.ottomator.ai/c/local-ai/18

<br />

## Notes on New Services Architecture

The goal is to make it incredibly simple to add new services to the stack that...

- safely reuse existing services (like supabase/postgres) without clobbering other services
- auto configure ports to avoid conflicts on the host
- auto manage dependency services (database etc)
- intuitively mount host folders to persist data, edit code, etc.

### General Service Actions Flow

1. Install - service is downloaded into services dir similar to npm install
2. Configure - interactive prompts to let user choose service options
3. Start - allow service level overriding of auto functions

- loadEnv - called before anything else, this is where the service can configure env vars based on the stack & service config
- start - allow for custom overriding of the start function for more complicated use cases
- post start - output relevant info to console like urls, credentials, etc.

4. Uninstall - remove the service directory and unregister the service from the project

The heart of it all is in loadEnv and how vars are expanded in the service docker-compose.yaml.
This allows for templates to be used that are auto configured per project and host machine.

The current challenge is how to handle dependency graphs in loadEnv. Services that depend on other
services need to be loaded after the dependency is already loaded and configured. The safest/easiest
want to handle this is probably in the llemonstack.yaml exposes key. API endpoints and credentials
can be exposed to the entire stack to allow each service to auto configure.

Out of scope: version specific dependencies. If a service needs a specific version of postgres (or whatever) than it will need to start a separate instance of it.

Right now, multiple services with the same container names can not be used in the same stack.
Short term, there will just be canonical service names and then if a service needs to start a separte
clone, it needs to manage it in it's own docker-compose.yaml. Eventually, contaier names should be
removed from the docker compose files or switched to variables for core services. Then let docker auto
assign names to avoid conflicts. But this leads to potential issues with starting many clones of the
same service if the start script is rerun before stopping.

## MacOS Silicon Setup

Docker Destop -> Settings -> General

- Select Docker VMM
- Select VirtioFS

See
[Supabase Self-Hosting Guide](https://supabase.com/docs/guides/self-hosting/docker#file-storage-backend-on-macos)

## Running Commands on Service Containers

```bash
# Exec a shell in a container, eg. in n8n
# Uses the default user for the container, in this case node
docker exec -it n8n sh

# Start a shell as root
docker exec -it --user root n8n sh
```

<br />

## Resources

- https://www.llm-prices.com/

**Local LLM Providers**

- Ollama
- LM Studio
- GPT4All
- [LocalAI](https://github.com/mudler/LocalAI)

**Additional Services:**

- https://github.com/chroma-core/chroma

- https://github.com/mendableai/open-lovable

- https://github.com/pmarreck/yt-transcriber

  - https://contentflow.megalabs.co/ - YouTube transcriber service

- https://github.com/mozilla-ai/any-llm
- https://github.com/BloopAI/vibe-kanban
- https://github.com/frdel/agent-zero
- https://github.com/airweave-ai/airweave
- https://github.com/tldraw/tldraw
- https://github.com/letta-ai/letta
- https://github.com/stanford-mast/blast
- https://github.com/Fosowl/agenticSeek
- https://github.com/simstudioai/sim
- https://github.com/onyx-dot-app/onyx
- https://github.com/getzep/graphiti - replaces zep ce
- https://github.com/khoj-ai/khoj
- https://github.com/trycua/cua
- https://github.com/rowboatlabs/rowboat - tool for building AI agents
- https://github.com/supercorp-ai/supergateway
- https://github.com/morphik-org/morphik-core - RAG for visual documents
- https://github.com/chroma-core/chroma
- https://github.com/Darwin-lfl/langmanus
- https://github.com/danielmiessler/fabric
- [MLFlow](https://github.com/mlflow/mlflow)
- Observability services, see [OTEL.md](OTEL.md)
- https://github.com/yoeven/ai-video-search-engine
- https://github.com/langflow-ai/langflow
  - visual agent builder generates LangChain code to run in production
- https://github.com/infiniflow/ragflow
- https://github.com/arc53/DocsGPT
- https://github.com/Mintplex-Labs/anything-llm
- https://github.com/langgenius/dify
- https://github.com/Skyvern-AI/skyvern/
  - https://www.youtube.com/watch?v=FhDYo2VKu5E
- https://github.com/windmill-labs/windmill
- https://github.com/activepieces/activepieces
- https://github.com/weaviate/weaviate
- https://github.com/Mintplex-Labs/vector-admin
- https://github.com/e2b-dev/fragments
  https://github.com/microsoft/OmniParser

  - https://github.com/shutootaki/bookwith

- https://github.com/automatisch/automatisch
- https://github.com/airbytehq/airbyte
- https://github.com/triggerdotdev/trigger.dev
- https://github.com/mem0ai/mem0
- https://github.com/lunary-ai/lunary

- https://github.com/FlowiseAI/FlowiseChatEmbed

- https://github.com/The-Pocket/PocketFlow

- https://github.com/opensearch-project/OpenSearch - elastic search replacement with better vector search?

- [open-health](https://github.com/OpenHealthForAll/open-health)

- [verifai](https://github.com/nikolamilosevic86/verifAI) - for detecting hallucinations in document
  based RAG, specifically biomed

- [Open Meter](https://docs.litellm.ai/docs/observability/openmeter) - Integrates with LiteLLM to
  auto charge LLM useage to clients

- https://github.com/hcengineering/platform - self hosted Notion + project management
- https://github.com/colanode/colanode - self hosted Notion alternative with Slack-like chat features

- https://github.com/dagger/dagger
- https://github.com/kpenfound/agents - dagger agents examples

Not AI, but potentially useful:

- [Leaflet](https://github.com/hyperlink-academy/leaflet) - easily create and share text docs
- https://github.com/jrz/container-shell/blob/main/shell
- https://github.com/elysiajs/elysia - typescript framework for web servers, has OAuth plugin
- https://github.com/omni-media/omniclip

**TTS:**

- https://github.com/resemble-ai/chatterbox
- https://github.com/KoljaB/RealtimeVoiceChat
- https://github.com/nari-labs/dia
- https://github.com/KittenML/KittenTTS - SOTA 25mb

**STT / Transcription:**

- https://github.com/jianfch/stable-ts
- https://github.com/kaixxx/noScribe
- https://github.com/ggml-org/whisper.cpp

**Misc of Interest**

- https://github.com/bilalonur/awesome-llm-os
- https://repoprompt.com/

**File Converters**

- https://github.com/VERT-sh/VERT - media files
- https://github.com/C4illin/ConvertX - 1,000+ file types, no explicit API but can be modified
- https://github.com/danvergara/morphos - UI + API

**Airtable alternatives:**

- https://github.com/nocodb/nocodb
- https://github.com/Budibase/budibase
- https://github.com/teableio/teable
- https://github.com/apitable/apitable

- [Agentic Memory](https://github.com/WujiangXu/AgenticMemory)

**Voice Chat**

- https://github.com/FunAudioLLM/CosyVoice
- https://github.com/CerebriumAI/examples/tree/master/6-voice/6-openai-realtime-api-comparison
- https://github.com/pipecat-ai/pipecat
- http://github.com/abus-aikorea/voice-pro

**Cloud Infrastructure & APIs:**

- https://trigger.dev/
- https://brave.com/search/api/
- https://rapidapi.com/zt4096/api/phindsearch-api - Phind Search API
- https://www.krea.ai/
- https://github.com/dstackai/dstack

**LLM Web Scrapers**

- https://github.com/jina-ai/reader
- https://github.com/mishushakov/llm-scraper
- https://scrapecreators.com/
- https://github.com/nottelabs/notte
- see Notion doc for full list of scraper APIs

**AI Tools Directories:**

- https://www.futuretools.io/
- https://www.futurepedia.io/ai-tools
- https://www.aimaster.me/blog/tags/automation

**MCP & Code Tools:**

- https://mcp.so/
- https://glama.ai/
- https://smithery.ai/

- https://github.com/czlonkowski/n8n-mcp

- https://github.com/All-Hands-AI/OpenHands
- https://github.com/synthetic-lab/octofriend

  - https://news.ycombinator.com/item?id=44828568 - interesting, but buggy

- https://github.com/mastanley13/GoHighLevel-MCP
- https://github.com/basicmachines-co/open-ghl-mcp

- https://desktopcommander.app/
- https://github.com/wonderwhy-er/DesktopCommanderMCP

- https://github.com/aperoc/toolkami
- https://github.com/Klavis-AI/klavis
- https://github.com/mcp-use/mcp-use
- https://github.com/mendableai/firecrawl-mcp-server
- https://browsermcp.io/ - automate the browser
- https://github.com/OpenAdaptAI/OmniMCP
- https://github.com/gumloop/guMCP
- https://github.com/modelcontextprotocol/inspector
- https://github.com/wild-card-ai/agents-json
- https://github.com/inngest/agent-kit
  - https://github.com/inngest/agent-kit/tree/main/examples/e2b-coding-agent
  - https://agentkit.inngest.com/llms-full.txt
- https://llmstxt.org/

- https://github.com/frdel/agent-zero

  - https://developers.cloudflare.com/agents/llms-full.txt example from cloudflare

- https://github.com/denolib/awesome-deno

  - https://github.com/littledivy/autopilot-deno

- https://github.com/neiltron/apple-health-mcp

**Prompts:**

- https://gamma.app/docs/10-INSANE-AI-Prompts-In-20-Minutes-f0epq82zvh5lz5e?mode=doc

**AI Code Documentation**

- https://github.com/The-Pocket/Tutorial-Codebase-Knowledge

## n8n

**n8n Templates:**

- https://benvansprundel.gumroad.com/l/content-repurposing-agent-team
- https://studio.ottomator.ai/
- https://github.com/coleam00/ai-agents-masterclass
- https://n8n.io/workflows/2339-breakdown-documents-into-study-notes-using-templating-mistralai-and-qdrant/
- https://n8n.io/workflows/2872-ai-agent-chatbot-long-term-memory-note-storage-telegram/

**n8n Communities:**

- https://thinktank.ottomator.ai/c/n8n/27

## Misc Videos & Articles

**YouTube Tutorials:**

See [Cole's YouTube video](https://www.youtube.com/watch?v=pOsO40HSbOo) for an in-depth walkthrough
of the original project that inspired LLemonStack.

[Cole Medin](https://www.youtube.com/@ColeMedin/videos)

- [n8n + supabase RAG](https://www.youtube.com/watch?v=PEI_ePNNfJQ) - Cole Medin
- **Misc:** [Browser-Use WebUI example video](https://www.youtube.com/watch?v=PRbCFgSvaco)

[Vector Store Evaluations](https://sanjmo.medium.com/vector-data-store-evaluation-criteria-6d7677ef3b60)

[Google Credentials Setup](https://pipedream.com/apps/gmail/#getting-started) - Pipedream doc

- [Weaviate article, Agentic RAG](https://weaviate.io/blog/what-is-agentic-rag)

<br />

## WIP Solutions

### Possible Log Streaming Solutions

Configure n8n logging https://docs.n8n.io/hosting/logging-monitoring/logging/

Maybe use something like rsyslog to watch the log file? Or use something to consolidate all the
docker logs?

- https://github.com/rsyslog/rsyslog
- https://betterstack.com/community/guides/logging/docker-compose-logs/

<br />

## Related Misc

- [NVidia Container Toolkit](https://github.com/NVIDIA/nvidia-container-toolkit) for running docker
  containers with gpu access
