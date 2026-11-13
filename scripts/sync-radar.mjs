import { writeFile, rename } from 'node:fs/promises';

const origin = 'https://rika-global-market-radar.helpfulbike4.chatgpt.site';
const target = 'public/market-radar/data/snapshot.json';

async function read(path) {
  for (let attempt = 1; ; attempt++) {
    try {
      const response = await fetch(origin + path, {
        signal: AbortSignal.timeout(20000),
        headers: { Accept: 'application/json' },
      });
      if (!response.ok) throw new Error(`${path}: HTTP ${response.status}`);
      return await response.json();
    } catch (error) {
      if (attempt === 3) throw error;
      await new Promise(resolve => setTimeout(resolve, 2000));
    }
  }
}

const [reports, live, research, schedule, first] = await Promise.all([
  '/api/reports', '/api/live', '/api/research', '/api/schedule', '/api/flash?days=7',
].map(read));
const items = [...first.items];
const cursors = new Set();
for (let cursor = first.nextCursor; cursor;) {
  if (cursors.has(cursor) || cursors.size >= 500) throw new Error('Invalid flash pagination');
  cursors.add(cursor);
  const page = await read('/api/flash?days=7&cursor=' + encodeURIComponent(cursor));
  items.push(...page.items);
  cursor = page.nextCursor;
}

const events = [
  ...reports.reports.flatMap(report => report.events),
  ...live.items.map(item => item.event),
  ...research.items,
  ...items.map(item => item.event),
];
for (const event of events) {
  if (event?.serverVerification?.version !== 1 || !event.serverVerification.sourceChecks?.length ||
      !event.audit?.factsChecked || !event.audit?.conflictsResolved || !event.publishedAtISO ||
      !event.sources?.length || !event.aShareImpact || !event.risks) {
    throw new Error('Unverified radar event');
  }
}
if (live.items.length > 10 || live.items.some(item => item.pushEligible !== true) ||
    items.some(item => item.marketRelated !== true || item.analysisComplete !== true || !item.marketRelevance)) {
  throw new Error('Incomplete radar publication');
}

const snapshot = {
  schema: 1, syncedAt: new Date().toISOString(), reports, live, research, schedule,
  flash: { ...first, items, nextCursor: null },
};
await writeFile(target + '.tmp', JSON.stringify(snapshot));
await rename(target + '.tmp', target);
console.log(`Synced ${live.items.length} curated items and ${items.length} flashes at ${snapshot.syncedAt}`);
