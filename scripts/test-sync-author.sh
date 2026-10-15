#!/usr/bin/env bash
# Fixture test for the "Sentinel: Push updates to thealtstack" step of
# .github/workflows/sync-to-main-app.yml.
#
# Why this exists: Vercel will not deploy a commit whose author email is not
# linked to a GitHub account, so an unlinked sync author silently leaves
# production serving the previous build while the sync itself reports success
# (private 42210cad and ef2c26ee are both real instances). The step body is
# lifted out of the live workflow and actually executed against a local bare
# remote, so this suite fails if the shipped workflow ever regresses that.
#
# Run: bash scripts/test-sync-author.sh [repo-root]
set -uo pipefail

REPO_ROOT="${1:-$(pwd)}"
WF="$REPO_ROOT/.github/workflows/sync-to-main-app.yml"
TMP="$(mktemp -d)"
trap 'rm -rf "$TMP"' EXIT

fail=0
ok()  { echo "PASS - $1"; }
bad() { echo "FAIL - $1"; fail=1; }
[ -f "$WF" ] || { echo "no workflow at $WF"; exit 1; }

LINKED_RE='@users\.noreply\.github\.com$|@noreply\.github\.com$'

# ---- lift the step body, dedented to column 0 --------------------------------
awk "/Push updates to thealtstack/ { stepline = 1 }
     stepline && /^[[:space:]]*run: \|[[:space:]]*\$/ { inbody = 1; next }
     inbody {
         if (\$0 ~ /^[[:space:]]*\$/) { print \"\"; next }
         n = match(\$0, /[^[:space:]]/)
         if (n - 1 < 10) { exit }
         print substr(\$0, 11)
     }" "$WF" > "$TMP/push_step.sh"

STEP_LINES=$(grep -c . "$TMP/push_step.sh" || true)
if [ "${STEP_LINES:-0}" -lt 10 ] || ! grep -q 'git push origin main' "$TMP/push_step.sh"; then
    bad "could not extract the push step (got ${STEP_LINES:-0} lines) — the workflow shape changed"
    echo "SYNC-AUTHOR FIXTURES FAILED"
    exit 1
fi
ok "extracted the push step from the live workflow ($STEP_LINES lines)"

# ---- a throwaway workspace: <dir>/target-repo + <dir>/origin.git -------------
# The step begins with `cd target-repo`, so the layout has to match the real
# job's working directory or the test would be proving a different script.
make_repo() {
    local dir="$1"
    mkdir -p "$TMP/$dir"
    git init -q --bare "$TMP/$dir/origin.git"
    local repo="$TMP/$dir/target-repo"
    mkdir -p "$repo/data" "$repo/docker-deploy"
    git -C "$repo" init -q
    git -C "$repo" config user.email probe@example.invalid
    git -C "$repo" config user.name Probe
    printf '[{"slug":"tool-a"}]
' > "$repo/data/tools.json"
    printf 'services: {}
' > "$repo/docker-deploy/keep.compose.yml"
    git -C "$repo" add -A
    git -C "$repo" commit -qm seed
    git -C "$repo" branch -M main
    git -C "$repo" remote add origin "$TMP/$dir/origin.git"
    # The step only stages these two paths, so a real change must live in one.
    printf '[{"slug":"tool-a"},{"slug":"tool-b"}]
' > "$repo/data/tools.json"
}

run_step() { # run_step <dir> [VAR=VALUE...] -> prints output, exit code is the step's
    local dir="$1"; shift
    ( cd "$TMP/$dir" && env "$@" bash "$TMP/push_step.sh" ) 2>&1
}

echo "--- default identity ---"
make_repo default
OUT=$(run_step default); RC=$?
printf '%s\n' "$OUT" | sed 's/^/    /'
if [ "$RC" -ne 0 ]; then bad "the step failed under its own defaults"; else ok "the step pushes under its default identity"; fi

AUTHOR_EMAIL=$(git -C "$TMP/default/target-repo" log -1 --format=%ae)
COMMITTER_EMAIL=$(git -C "$TMP/default/target-repo" log -1 --format=%ce)
AUTHOR_NAME=$(git -C "$TMP/default/target-repo" log -1 --format=%an)
MSG=$(git -C "$TMP/default/target-repo" log -1 --format=%s)

if printf '%s' "$AUTHOR_EMAIL" | grep -qE "$LINKED_RE"; then
    ok "author email $AUTHOR_EMAIL is GitHub-linked, so Vercel will deploy it"
else
    bad "author email $AUTHOR_EMAIL is NOT linked — this is exactly the blocked-deploy bug"
fi
if printf '%s' "$COMMITTER_EMAIL" | grep -qE "$LINKED_RE"; then
    ok "committer email $COMMITTER_EMAIL is linked too (Actions sets both from git config)"
else
    bad "committer email $COMMITTER_EMAIL is not linked"
fi
[ "$AUTHOR_NAME" = "Sovereign Sentinel (AI)" ] && ok "provenance keeps the Sentinel name" || bad "author name changed to '$AUTHOR_NAME'"
[ "$MSG" = "🤖 Sentinel: Synchronization from altstackHQ/altstack-data" ] && ok "commit message unchanged" || bad "commit message changed to '$MSG'"

# The bare repo's HEAD follows its default branch, which is not necessarily the
# `main` the step pushes, so name the ref instead of trusting HEAD.
PUSHED=$(git -C "$TMP/default/origin.git" log -1 --format=%ae main 2>/dev/null)
[ "$PUSHED" = "$AUTHOR_EMAIL" ] && ok "the commit actually reached origin/main" || bad "origin/main does not carry the synced commit (got '${PUSHED:-nothing}')"

echo "--- an unlinked identity must be refused, not silently shipped ---"
make_repo unlinked
OUT=$(run_step unlinked SYNC_AUTHOR_EMAIL=sentinel@thealtstack.com); RC=$?
printf '%s\n' "$OUT" | sed 's/^/    /'
if [ "$RC" -ne 0 ]; then ok "an unlinked override exits non-zero"; else bad "an unlinked override was accepted"; fi
printf '%s\n' "$OUT" | grep -q "not linked to a GitHub account" && ok "and it says why" || bad "the failure carries no explanation"
# The refusal must happen before any commit exists: HEAD is still the seed.
SEED_COUNT=$(git -C "$TMP/unlinked/target-repo" rev-list --count HEAD)
SEED_MSG=$(git -C "$TMP/unlinked/target-repo" log -1 --format=%s)
if [ "$SEED_COUNT" = "1" ] && [ "$SEED_MSG" = "seed" ]; then
    ok "no sync commit was created under an unlinked identity"
else
    bad "a commit was still made (count=$SEED_COUNT msg=$SEED_MSG)"
fi
git -C "$TMP/unlinked/origin.git" rev-parse --verify -q main >/dev/null     && bad "origin received a branch under the bad identity" || ok "origin was left untouched"

echo "--- an explicitly linked override still works ---"
make_repo override
OUT=$(run_step override SYNC_AUTHOR_EMAIL="41898282+github-actions[bot]@users.noreply.github.com"); RC=$?
[ "$RC" -eq 0 ] && [ "$(git -C "$TMP/override/target-repo" log -1 --format=%ae)" = "41898282+github-actions[bot]@users.noreply.github.com" ] \
    && ok "a linked override identity is honoured" || bad "linked override failed (rc=$RC): $OUT"

echo "--- no dataset change stays a no-op ---"
make_repo noop
git -C "$TMP/noop/target-repo" checkout -q -- data/tools.json   # undo the pending change
OUT=$(run_step noop); RC=$?
if [ "$RC" -eq 0 ] && printf '%s\n' "$OUT" | grep -q "Dataset remains optimal"; then
    ok "an identical dataset still produces the documented no-op, not an empty commit"
else
    bad "no-op path changed: rc=$RC $OUT"
fi
[ "$(git -C "$TMP/noop/target-repo" rev-list --count HEAD)" = "1" ] && ok "no commit was created" || bad "the no-op created a commit"

[ "$fail" -eq 0 ] && echo "ALL SYNC-AUTHOR FIXTURES PASSED" || echo "SYNC-AUTHOR FIXTURES FAILED"
exit "$fail"
