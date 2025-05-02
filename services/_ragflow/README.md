# RAGFlow

RAGFlow supports different backends.

Inifinity doesn't currently support arm64, so we use ElasticSearch instead to work on macOS.
Inifinity release notes shows it supports arm64:
https://github.com/infiniflow/infinity/blob/main/docs/release_notes.md?plain=1#L25
But they're not building and pushing the images to docker hub:
https://hub.docker.com/r/infiniflow/infinity/tags

Postgres instead of MySQL.

Reuses existing MinIO, Redis, and Postgres (Supabase) services.

## TODO

- [ ] Build ragflow from scratch to support macos
  - See https://ragflow.io/docs/dev/build_docker_image
  - [ ] Change xgboost version in pyproject.toml to 1.6.0
  - [ ] Download deps: `uv run download_deps.py`
  - [ ] Build Dockerfile.deps: `docker build -f Dockerfile.deps -t infiniflow/ragflow_deps .`
  - [ ] Build main Dockerfile

`download_deps.py` downloads tiktoken, huggingface models, etc.
Probably better to replace with a script inside of service.ts that parses the URLs from
the download_deps.py file and then downloads to a self contained dir instead of root of
ragflow repo? Repo pull will fail since untracked files are present after the download.
