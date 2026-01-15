---
name: btca-bknd-repo-learn
description: Use btca (Better Context App) to efficiently query and learn from the bknd backend framework via learning directly from the bknd-io/bknd repo
---

# Using btca to Query bknd-io/bknd

Learn how to use btca (Better Context App) to efficiently query and learn from the bknd backend framework.

## What is btca?

btca is a CLI tool for asking questions about codebases. It clones git repositories, indexes them, and lets you query them using AI.

## Quick Setup

### 1. Install btca
```bash
bun add -g btca opencode-ai
```

### 2. Configure AI Model
```bash
# Recommended: Claude Haiku 4.5 (fast, affordable)
btca config model -p opencode -m claude-haiku-4-5

# Or use free Big Pickle model
btca config model -p opencode -m big-pickle
```

### 3. Add bknd as a Resource
```bash
btca config resources add \
  -n bknd \
  -t git \
  -u https://github.com/bknd-io/bknd \
  -b main
```

Or create `btca.config.jsonc` in your project:
```jsonc
{
  "$schema": "https://btca.dev/btca.schema.json",
  "model": "claude-haiku-4-5",
  "provider": "opencode",
  "providerTimeoutMs": 300000,
  "resources": [
    {
      "type": "git",
      "name": "bknd",
      "url": "https://github.com/bknd-io/bknd",
      "branch": "main",
      "specialNotes": "Backend framework with data, auth, media, and flows modules"
    }
  ]
}
```

## Core Commands

### Single Question Mode
Ask a quick question without entering interactive mode:
```bash
btca ask -r bknd -q "How does the data module work?"
```

### Interactive TUI
Launch the full interface:
```bash
btca
```
Then type questions with @mentions:
```
@bknd How do I implement authentication?
```

### Chat Mode
Multi-turn conversation with a specific resource:
```bash
btca chat -r bknd
```

### Server Mode
Run an HTTP server for programmatic access:
```bash
btca serve --port 3000
```

## Querying bknd Specific Topics

### Data Module
```bash
# Schema definition
btca ask -r bknd -q "How do I define a schema in bknd?"

# Query system
btca ask -r bknd -q "How does the query builder work in the data module?"

# Entity operations
btca ask -r bknd -q "What entity operations are available in bknd?"
```

### Authentication
```bash
# Auth strategies
btca ask -r bknd -q "What authentication strategies are supported?"

# Implement auth
btca ask -r bknd -q "How do I implement password authentication?"

# Auth flow
btca ask -r bknd -q "How does the authentication flow work?"
```

### Adapters
```bash
# Available adapters
btca ask -r bknd -q "Which database adapters does bknd support?"

# Node adapter
btca ask -r bknd -q "How do I use the Node adapter?"

# Cloudflare adapter
btca ask -r bknd -q "How do I deploy bknd to Cloudflare Workers?"
```

### Media Management
```bash
# Media module
btca ask -r bknd -q "How do I handle file uploads in bknd?"

# Storage options
btca ask -r bknd -q "What storage adapters are available for media?"

# Media operations
btca ask -r bknd -q "How do I serve media files through bknd?"
```

### Framework Integration
```bash
# Next.js integration
btca ask -r bknd -q "How do I integrate bknd with Next.js?"

# React Router
btca ask -r bknd -q "How do I use bknd with React Router?"

# Standalone CLI
btca ask -r bknd -q "How do I run bknd as a standalone CLI application?"
```

## Advanced Queries

### Understanding Architecture
```bash
# Module system
btca ask -r bknd -q "How does the module system work in bknd?"

# Core concepts
btca ask -r bknd -q "What are the core architectural patterns in bknd?"

# Type system
btca ask -r bknd -q "How is TypeScript typing structured in bknd?"
```

### Implementation Patterns
```bash
# Custom strategies
btca ask -r bknd -q "How do I create a custom auth strategy?"

# Custom adapter
btca ask -r bknd -q "How do I create a custom database adapter?"

# Extending bknd
btca ask -r bknd -q "How do I extend bknd with custom modules?"
```

### Real-World Usage
```bash
# Production setup
btca ask -r bknd -q "What are best practices for deploying bknd to production?"

# Security
btca ask -r bknd -q "How do I secure a bknd application?"

# Performance
btca ask -r bknd -q "How do I optimize bknd performance?"
```

## Resource Management

### List Resources
```bash
btca config resources list
```

### Remove Resource
```bash
btca config resources remove -n bknd
```

### Clear Cached Repos
```bash
btca clear
```

## Multi-Resource Queries

Add related resources and query them together:
```bash
# Add related projects
btca config resources add -n react -t git -u https://github.com/facebook/react -b main
btca config resources add -n nextjs -t git -u https://github.com/vercel/next.js -b canary

# Query multiple resources
btca ask -r bknd -r nextjs -q "How do I integrate bknd with Next.js?"
```

## Interactive Workflows

### Deep Dive Session
```bash
# Start interactive mode
btca

# Example session:
> @bknd Explain the data module architecture
> How do I create a schema?
> Show me an example of querying data
> What about filtering?
> How do I handle relations?
```

### Problem-Solving Flow
```bash
# Start chat mode
btca chat -r bknd

# Example session:
> I need to implement file uploads
> How do I set up the media module?
> What storage options work best for S3?
> How do I secure the upload endpoint?
```

## Configuration Options

### Search Paths
If you want to focus on specific parts of the repo:
```jsonc
{
  "resources": [
    {
      "type": "git",
      "name": "bknd",
      "url": "https://github.com/bknd-io/bknd",
      "branch": "main",
      "searchPaths": ["src/data", "src/auth", "examples/nextjs"]
    }
  ]
}
```

### Special Notes
Add hints for the AI:
```jsonc
{
  "resources": [
    {
      "type": "git",
      "name": "bknd",
      "url": "https://github.com/bknd-io/bknd",
      "branch": "main",
      "specialNotes": "Backend framework. Key files: src/App.ts, src/data/schema.ts, src/auth/strategies/"
    }
  ]
}
```

## Tips for Effective Queries

### Be Specific
```bash
# Good
btca ask -r bknd -q "How do I define a schema with a one-to-many relation?"

# Vague (less helpful)
btca ask -r bknd -q "How do I use the data module?"
```

### Provide Context
```bash
# Better
btca ask -r bknd -q "I'm using Cloudflare Workers. How do I configure the database adapter?"

# Good
btca ask -r bknd -q "How do I configure the database adapter for Cloudflare Workers?"
```

### Ask for Examples
```bash
btca ask -r bknd -q "Show me a complete example of setting up password authentication in bknd"
```

### Reference Specific Files
```bash
btca ask -r bknd -q "How does src/App.ts initialize the modules?"
```

## Learning Workflow

### 1. Explore High-Level
```bash
btca ask -r bknd -q "What is the overall architecture of bknd?"
btca ask -r bknd -q "What are the main modules and their purposes?"
```

### 2. Module Deep-Dive
```bash
btca chat -r bknd
# Focus on one module at a time
```

### 3. Implementation Details
```bash
btca ask -r bknd -q "Show me the implementation of [specific feature]"
```

### 4. Examples & Patterns
```bash
btca ask -r bknd -q "What are the best practices shown in the examples directory?"
```

## Troubleshooting

### Resource Not Found
```bash
# Check resources list
btca config resources list

# Re-add if missing
btca config resources add -n bknd -t git -u https://github.com/bknd-io/bknd -b main
```

### Slow Responses
```bash
# Try a faster model
btca config model -p opencode -m big-pickle

# Reduce search scope
# Edit config to use searchPath instead of full repo
```

### Outdated Information
```bash
# Clear cache to force fresh clone
btca clear

# Run query again
btca ask -r bknd -q "What's new in the latest version?"
```

## Common Use Cases

### Quick Reference
```bash
# Look up API
btca ask -r bknd -q "What's the API for creating an entity?"

# Find function
btca ask -r bknd -q "Where is the create function defined in the data module?"
```

### Debugging
```bash
# Understand error
btca ask -r bknd -q "What causes the 'connection failed' error in bknd?"

# Find similar patterns
btca ask -r bknd -q "Show me other examples of auth configuration"
```

### Learning New Features
```bash
# Explore feature
btca ask -r bknd -q "How does the flows module work?"

# Get started guide
btca ask -r bknd -q "What's the quickest way to get started with bknd?"
```

## Reference

- btca docs: https://btca.dev
- btca commands: https://btca.dev/commands
- bknd docs: https://docs.bknd.io
- bknd repo: https://github.com/bknd-io/bknd
