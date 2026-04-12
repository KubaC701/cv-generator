import puppeteer from 'puppeteer';
import { resolve } from 'path';
import { existsSync } from 'fs';

const A4_HEIGHT_MM = 297;
const A4_WIDTH_MM = 210;
const MM_PER_PX = 25.4 / 96;

function pxToMm(px) {
  return Math.round(px * MM_PER_PX * 10) / 10;
}

async function measureSections(page) {
  return page.evaluate(() => {
    const cv = document.querySelector('.cv');
    if (!cv) return { error: 'No .cv element found' };

    const pxPerMm = 96 / 25.4;
    const pageHeightPx = Math.round(297 * pxPerMm);

    // Temporarily remove height constraint to measure natural content height
    const origHeight = cv.style.height;
    const origOverflow = cv.style.overflow;
    const origMaxHeight = cv.style.maxHeight;
    cv.style.height = 'auto';
    cv.style.overflow = 'visible';
    cv.style.maxHeight = 'none';

    const naturalHeight = cv.scrollHeight;

    // Measure individual sections
    const sections = [];
    const measure = (selector, label) => {
      const el = cv.querySelector(selector);
      if (!el) return;
      const rect = el.getBoundingClientRect();
      sections.push({
        label,
        selector,
        heightPx: Math.round(rect.height),
      });
    };

    // Common section patterns — try multiple selectors
    measure('header, .header', 'Header');
    measure('.summary, section:has(.summary__text)', 'Summary');

    // Measure each role/experience entry individually
    const roles = cv.querySelectorAll('article.role, .role, .experience article');
    roles.forEach((role, i) => {
      const title = role.querySelector('h3, .role__title');
      const label = title ? title.textContent.trim() : `Role ${i + 1}`;
      const rect = role.getBoundingClientRect();
      sections.push({
        label: `Role: ${label}`,
        selector: `role[${i}]`,
        heightPx: Math.round(rect.height),
      });
    });

    // Measure sidebar and main column
    const sidebar = cv.querySelector('.cv__sidebar, [class*="sidebar"]');
    const main = cv.querySelector('.cv__main, [class*="main"]');
    const sidebarHeight = sidebar ? Math.round(sidebar.scrollHeight) : null;
    const mainHeight = main ? Math.round(main.scrollHeight) : null;

    // Measure remaining sections generically
    const allSections = cv.querySelectorAll('section');
    allSections.forEach((sec) => {
      const heading = sec.querySelector('h2');
      if (!heading) return;
      const label = heading.textContent.trim();
      // Skip if already measured (summary, experience)
      if (sections.some((s) => s.label.toLowerCase().includes(label.toLowerCase()))) return;
      const rect = sec.getBoundingClientRect();
      sections.push({
        label,
        selector: `section:${label}`,
        heightPx: Math.round(rect.height),
      });
    });

    // Restore constraints
    cv.style.height = origHeight;
    cv.style.overflow = origOverflow;
    cv.style.maxHeight = origMaxHeight;

    return {
      pageHeightPx,
      naturalHeightPx: naturalHeight,
      overflowPx: Math.max(0, naturalHeight - pageHeightPx),
      remainingPx: Math.max(0, pageHeightPx - naturalHeight),
      fits: naturalHeight <= pageHeightPx,
      sidebarHeightPx: sidebarHeight,
      mainHeightPx: mainHeight,
      sections,
    };
  });
}

function printReport(m) {
  const mmPerPx = 25.4 / 96;
  const toMm = (px) => (px * mmPerPx).toFixed(1);

  console.log('');
  console.log('=== CV Page Fit Report ===');
  console.log('');
  console.log(`Page height:    ${toMm(m.pageHeightPx)}mm (${m.pageHeightPx}px)`);
  console.log(`Content height: ${toMm(m.naturalHeightPx)}mm (${m.naturalHeightPx}px)`);
  console.log('');

  if (m.fits) {
    console.log(`STATUS: FITS — ${toMm(m.remainingPx)}mm (${m.remainingPx}px) remaining`);
  } else {
    console.log(`STATUS: OVERFLOW by ${toMm(m.overflowPx)}mm (${m.overflowPx}px)`);
  }

  if (m.sidebarHeightPx || m.mainHeightPx) {
    console.log('');
    console.log('--- Column Heights ---');
    if (m.sidebarHeightPx) console.log(`  Sidebar: ${toMm(m.sidebarHeightPx)}mm (${m.sidebarHeightPx}px)`);
    if (m.mainHeightPx) console.log(`  Main:    ${toMm(m.mainHeightPx)}mm (${m.mainHeightPx}px)`);
  }

  if (m.sections.length > 0) {
    console.log('');
    console.log('--- Section Breakdown ---');
    for (const s of m.sections) {
      console.log(`  ${s.label.padEnd(30)} ${toMm(s.heightPx).padStart(6)}mm  (${String(s.heightPx).padStart(4)}px)`);
    }
  }

  console.log('');
}

async function run(htmlPath, outputPath, { validateOnly = false } = {}) {
  const absolutePath = resolve(htmlPath);
  if (!existsSync(absolutePath)) {
    console.error(`File not found: ${absolutePath}`);
    process.exit(1);
  }

  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.goto(`file://${absolutePath}`, { waitUntil: 'networkidle0' });

  const measurement = await measureSections(page);

  if (measurement.error) {
    console.error(measurement.error);
    await browser.close();
    process.exit(1);
  }

  printReport(measurement);

  if (!validateOnly) {
    if (!outputPath) {
      outputPath = absolutePath.replace(/\.html$/, '.pdf');
    }

    await page.pdf({
      path: resolve(outputPath),
      width: `${A4_WIDTH_MM}mm`,
      height: `${A4_HEIGHT_MM}mm`,
      printBackground: true,
      margin: { top: 0, right: 0, bottom: 0, left: 0 },
    });

    console.log(`PDF saved: ${resolve(outputPath)}`);
  }

  await browser.close();

  // Output JSON for programmatic consumption (agent can parse this)
  if (process.env.JSON_OUTPUT) {
    console.log('\n---JSON---');
    console.log(JSON.stringify(measurement, null, 2));
  }

  return measurement;
}

// --- CLI ---
const args = process.argv.slice(2);
const validateOnly = args.includes('--validate');
const paths = args.filter((a) => !a.startsWith('--'));
const [htmlPath, outputPath] = paths;

if (!htmlPath) {
  console.error('Usage: node scripts/generate-pdf.mjs [--validate] <input.html> [output.pdf]');
  console.error('  --validate   Only check fit, do not generate PDF');
  process.exit(1);
}

run(htmlPath, outputPath, { validateOnly }).then((result) => {
  process.exit(result.fits ? 0 : 1);
});
