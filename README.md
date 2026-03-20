# Blink Merchant Docs

Merchant-facing documentation site powered by [Mintlify](https://mintlify.com). Deployed automatically on push to `main`.

## Structure

```
introduction.mdx                 # Overview of Blink for merchants
quickstart.mdx                   # 5-minute getting started guide
integration/                     # Step-by-step integration guide
  architecture.mdx               # Architecture overview + sequence diagram
  key-generation.mdx             # Generate ECDSA P-256 key pair
  merchant-registration.mdx      # Register with Blink
  signer-endpoint.mdx            # Build the signer endpoint (Node.js + Python)
  checkout-sdk.mdx               # Integrate the Transfer SDK
  testing.mdx                    # Testing and staging setup
  production-checklist.mdx       # Go-live checklist
sdk-reference/                   # Transfer SDK API reference
  checkout-class.mdx             # Transfer class API
  react-hook.mdx                 # useBlinkTransfer hook API
  types.mdx                      # TypeScript types reference
  errors.mdx                     # Error codes and getDisplayMessage
  events.mdx                     # Events, status transitions, lifecycle
openapi.yaml                     # OpenAPI spec (copied from swype monorepo)
```

## Local development

```bash
npm i -g mintlify
mintlify dev
```

## OpenAPI spec sync

The `openapi.yaml` file is a copy of `core-api/swype-api.yaml` from the main [swype monorepo](https://github.com/swype-org/swype). When the API spec changes, copy the updated file here:

```bash
cp /path/to/swype/core-api/swype-api.yaml openapi.yaml
```

## AI readability

Mintlify automatically generates `llms.txt` and `llms-full.txt` at the root of the docs domain for LLM consumption.
