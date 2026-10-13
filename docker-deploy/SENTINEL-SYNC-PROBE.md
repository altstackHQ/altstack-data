# Sentinel Sync Probe — controlled test artifact

This file is a **temporary experiment artifact**, not documentation.

Purpose: verify the write path of the `🔄 Sentinel: Sync to thealtstack` workflow
(altstackHQ/altstack-data → aa-humaaan/thealtstack) end to end — specifically that the
workflow's GH_PAT can push a commit into the private repository. The workflow has only
ever run to a no-op at parity, so this write path is unproven.

- Experiment ID: G3-WRITEPATH-2026-10-13
- Created: 2026-10-13
- Inert: nothing in either repository reads this directory.
- Expected effect: this file is copied into `thealtstack` by the sync workflow,
  creating the first `🤖 Sentinel: Synchronization from altstackHQ/altstack-data`
  commit there.
- Removal: a revert PR in this repository deletes this file; the next sync run
  removes it from `thealtstack`. Both repositories return to parity.
