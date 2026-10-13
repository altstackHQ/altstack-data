# Incident register

Factual record of incidents that affected this dataset, what was lost, what was
restored, and what now prevents a repeat. Written for contributors, not for
cover: the fault was ours, in our automation, and the losses were real.

---

## 2026-09-21 and 2026-10-05 — community entries deleted by automated data sync

**Status:** resolved (all affected entries restored and verified) · **Severity:** high (community work deleted) · **Data affected:** `data/tools.json`

### What happened

Two separate incidents, one shared mechanism.

This repository accepts community contributions as pull requests. The
application repository (`aa-humaaan/thealtstack`) also held a copy of `data/`.
A scheduled workflow in that application repository mirrored **its own** copy of
`data/` back over this repository using `rsync --delete` and pushed straight to
`main`. Anything merged here that had not yet made it back into the application
repository's copy was therefore deleted within hours, by a bot commit, with no
review and no warning.

**Incident A — 2026-09-21.** Seven community pull requests were merged between
16:02 and 16:03 UTC. Every one of their entries was removed at 17:46:14 UTC by
commit `e71a45e` ("🤖 Sentinel: Data sync from thealtstack — 2026-09-21-17").
Ten catalog slugs disappeared.

| PR | Contributor | Contribution | Merged |
|---|---|---|---|
| #31 | @BlueSkyID666 | Orkas | 2026-09-21 16:03:36Z |
| #33 | @sosidudku1 | Atomic Agent (+ Copilot cross-link) | 2026-09-21 16:02:41Z |
| #36 | @arsalann | DAC (+ Tableau cross-link) | 2026-09-21 16:02:45Z |
| #38 | @sridharkalaibala | Posnic | 2026-09-21 16:03:44Z |
| #40 | @mikececco | Jasper + AltoRank | 2026-09-21 16:03:49Z |
| #41 | @JesusPaz | Warden (+ Statuspage cross-link) | 2026-09-21 16:03:54Z |
| #42 | @cevheri | DataGrip alternative + LibreDB Studio | 2026-09-21 16:02:49Z |

**Incident B — 2026-10-05.** Three pull requests were merged between 12:19:32
and 12:19:48 UTC. At 13:36:36 UTC commit `5e02aff` deleted their content.

| PR | Contributor | Contribution | Merged |
|---|---|---|---|
| #43 | @imshashank | Orbit, plus a Jira cross-link | 2026-10-05 12:19:46Z |
| #44 | @unjica | Telemetry Tracker, plus a Sentry cross-link | 2026-10-05 12:19:41Z |
| #47 | @benjiwagner | four corrected `customermates` fields (description, pros, cons, licensing) | 2026-10-05 12:19:32Z |

Issue [#51](https://github.com/altstackHQ/altstack-data/issues/51) is where
@unjica reported it. He was right, and his diagnosis pointed at the correct
commit.

### Why the safeguard that should have caught it did not

A second workflow was supposed to propagate merged data-repo changes **back** to
the application repository first. It never succeeded with real content: its
pushes failed on authentication (before 2026-09-22) and then on a
`403 Write access to repository not granted` token error. Those runs still ended
"green" because the content had become equal to the application repository's
copy, so the sync reported *"💤 Dataset remains optimal. No sync required."* A
broken channel and a correctly no-op channel produced the same log line, which is
how the failure stayed invisible for weeks.

### What was restored

| Restored | Where | Verified |
|---|---|---|
| the 9 Incident A tools | PR [#53](https://github.com/altstackHQ/altstack-data/pull/53) → squash `07e90b9` (2026-10-13 09:07:49Z) | byte-identical blob `3d9302e0`; 155 tools |
| Incident B: orbit, telemetry-tracker, customermates corrections | PR [#54](https://github.com/altstackHQ/altstack-data/pull/54) → squash `2822a8e` (2026-10-13 10:51:24Z) | 157 tools; blob `bc4f8b40`; the three entries present in the raw catalog and served by the live site API |
| same content in the application repository | PRs [#198](https://github.com/aa-humaaan/thealtstack/pull/198) and [#199](https://github.com/aa-humaaan/thealtstack/pull/199) | trees byte-identical across both repositories |

No community contribution was deleted to reach parity, and nothing was
synthesised: each restore was replayed from the original merged commit's own
diff.

### What now prevents a repeat

1. **The mirror is stopped.** `🔄 Sentinel: Sync to altstack-data` in the
   application repository is disabled (`disabled_manually`). It is not silently
   deleting anything today, and re-enabling it is a deliberate, separate
   decision.
2. **A hard guard runs before any mirror can write.** PR
   [#55](https://github.com/altstackHQ/altstack-data/pull/55) (this repository)
   and PR
   [#200](https://github.com/aa-humaaan/thealtstack/pull/200) (application,
   squash `0478e8a0`) added a pre-copy guard that aborts the sync instead of
   writing when it detects: invalid JSON, a destination catalog that diverged
   from the source's own history, **any entry the sync would delete** (naming the
   slugs), and — after #200 — **any file in any mirrored path** (`data/` and
   `docker-deploy/`) that the copy would overwrite or remove.
   The override is an explicit, opt-in `force_mirror` dispatch flag whose default
   is off.
3. **The propagation channel is proven, not assumed.** The
   data-repository→application write path had never landed a commit. A controlled
   probe (PR
   [#56](https://github.com/altstackHQ/altstack-data/pull/56), reverted by PR
   [#57](https://github.com/altstackHQ/altstack-data/pull/57)) demonstrated the
   first real synchronisation commit end to end and returned both repositories to
   byte parity.
4. **Patrol automation can no longer write to `main`.** The Sentinel night
   patrol previously pushed directly to `main` with ten critical steps marked
   `continue-on-error`. It now commits to a `sentinel/*` branch and opens a pull
   request, and a failing step aborts the run instead of hiding it.

### What is still true, stated plainly

- The application→data mirror is **disabled**, so changes made only in the
  application repository are not currently propagated here. The public dataset is
  the source of truth for the catalog.
- The data→application sync still guards only `data/tools.json` in depth; the
  wider per-file guard from #200 is being backported.
- Deployments whose commit author has no linked Git account are **blocked by
  Vercel**. Bot-authored sync commits therefore cannot promote a production
  build, which is a real constraint on re-enabling the mirror.
- Required status checks cannot be enforced on the private application repository
  on its current plan, so CI is a strong signal there rather than a hard gate.

### For contributors

Your pull requests in this repository are now the authoritative way to change the
dataset. A bot cannot delete them behind your back any more: if a future sync
would remove a catalog entry or a mirrored file, the run aborts and says exactly
what it objected to.
