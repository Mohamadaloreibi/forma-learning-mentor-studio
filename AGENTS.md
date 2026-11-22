<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.

## What Lovable manages

Rules outside this block are the project's own. Change the pieces below in
Lovable, not by hand. With the [Lovable MCP](https://mcp.lovable.dev)
connected, `send_message` asks Lovable to do it; otherwise ask the user to
use the editor.

- **Database.** Do not add or edit `supabase/migrations/` or `drizzle/`.
  Ask Lovable to change the schema.
- **Generated files.** Do not edit a file whose header says it is automatically
  generated.
- **AI gateway.** Keep model calls on Lovable's gateway, and keep
  `LOVABLE_API_KEY` out of browser code.
- **Connectors.** Lovable provides native connectors. `list_connectors` shows
  which are enabled; `add_connector` only returns the dashboard link. When a
  connector is enabled, calls go through the connector gateway and need
  `LOVABLE_API_KEY`. When Lovable does not provide one, users can bring their
  own key and store it in Secrets.
- **Secrets.** Lovable manages them. Do not put secret values in the repo.
<!-- LOVABLE:END -->

## Application architecture
- Keep demo workplace state in a shared React provider above the route outlet so learning, mentor, and agent views share one session without production infrastructure.
- Define workplace context and its consumer hook in a non-component module; keep the provider component's module component-only so hot refresh cannot split context identity.
- Give every module its own TanStack content route; share the workplace shell and semantic visual system across them.
- Keep mentor and agent test responses explicitly fictional and deterministic; do not perform model calls, real integrations, or external actions in the prototype.
- Compose the mentor transcript and composer with installed AI Elements primitives for accessible, maintainable conversation controls.
- Keep practice evaluation in a pure browser-safe module and store attempts/handoffs in shared session state; this isolates demo rules from future model and persistence integrations without placing practice text in URLs.
- Keep public content on /home, /product, /solutions, /about, and /contact with a pathname-selected root shell; preserve the existing demo URLs and keep the shared workplace provider mounted across both shells.
- Keep public product scenes browser-only and fictional; save validated contact and early-access enquiries via an insert-only server function to a service-role-only Cloud table for private owner review in Lovable Database, separate from demo workplace state.
- Use shared BrandLogo and BrandSymbol components backed by uploaded asset pointers, with light/dark lettering variants and a local small favicon; this keeps branding consistent without duplicating or redrawing artwork.
- Mount next-themes in the root shell with class-based Light/Dark/System selection and pre-hydration initialization; share one theme preference across public and workplace pages, and switch logo assets through CSS to avoid hydration flashes.
