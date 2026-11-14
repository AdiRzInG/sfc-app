// Offline cache: network first, falling back to the last cached copy.
// Bump VERSION to drop old caches after a release.
const VERSION = 'rebarscan-20261114134014'

// Every file of the application (scripts, styles, samples), filled in by scripts/stamp-sw.mjs after the build, so the whole of it is on the device
// after the first visit and nothing waits for the network on a site with no signal. The big optional OCR data is fetched when first used.
const PRECACHE = ["./assets/Account-Dhx_PEEw.js","./assets/AgentPanel-BCglwWhh.js","./assets/AllScreens-CbjCwjTf.js","./assets/AuditPrint-De_yFf6h.js","./assets/BackupPanel-B6oNjNxU.js","./assets/barimport-CcBBIVeo.js","./assets/BarImport-DtcIlzw0.js","./assets/browser-lSOXwog1.js","./assets/BufferGeometryUtils-CX12s5Cq.js","./assets/catalog-DdI7eNdu.js","./assets/classify-DO540mSy.js","./assets/CloseProject-DPNhirEI.js","./assets/CorpusPicker-CH-RCxFz.js","./assets/discipline-BTwa3-Z1.js","./assets/ElectricalPanel-CjJEeqmq.js","./assets/ElectricalPlan-BlNAkZ2o.js","./assets/engine-Bg6XxfW_.js","./assets/handler-BoN7Fhp6.js","./assets/HistoryPanel-D2mojsdC.js","./assets/html2canvas.esm-QH1iLAAe.js","./assets/index-BDE3N3Bz.css","./assets/index-Bm0YYopo.js","./assets/index-Crn4Ae5r.js","./assets/index-Qaz69FoV.js","./assets/index.es-DKWDT3sr.js","./assets/Intro-blDQMuVT.js","./assets/Intro-DB7nYXS2.css","./assets/jspdf.es.min-VHrNx0bR.js","./assets/jsQR-Br7RWiXE.js","./assets/Library-D-K5nL-S.js","./assets/MarketTab-CPT5QXw1.js","./assets/MarkMap-B3yQnCZj.js","./assets/MarkReview-D6RRAClR.js","./assets/markreviewDemo-R4tPwKnI.js","./assets/Model3D-C9QatpWa.js","./assets/OfficePack-DTiegwDI.js","./assets/OrbitControls-BJG1UU-V.js","./assets/Order-Bas3NQKq.js","./assets/parseWorker-C-XSdwdH.js","./assets/pdf-BNx_0Uut.js","./assets/pdf-KBrDY-4j.js","./assets/pdf.worker.min-DEsOkvhm.js","./assets/pdf.worker.min-GB3t0DcA.mjs","./assets/planclient-DOStfVZq.js","./assets/PlannerAnswers-Bo6pi5UU.js","./assets/PriceBook-B4II4z1F.js","./assets/pricing-BrUGooy_.js","./assets/ProjectStatus-DmomsSGv.js","./assets/purify.es-CAi2OJFm.js","./assets/Receive-BzdtPatV.js","./assets/sample_plan-DYCyb6ir.js","./assets/sample_plan_rev2-CC-UuFlP.js","./assets/scanread-BmAX2iSR.js","./assets/ScanReader-C6x5q06f.js","./assets/scanrun-BYYqds60.js","./assets/section_callouts-BWz5q_UH.js","./assets/section_with_list-CVtepcuw.js","./assets/setups-CL3kDJO5.js","./assets/sharepage-CKi1CCVU.js","./assets/Snapshots-COnX7_DQ.js","./assets/steelTypes-CLzCt_xj.js","./assets/supplierFile-DZC4qFu_.js","./assets/Suppliers-1vAudjxy.js","./assets/three.module-BtCAaDxU.js","./assets/Variables-C62Xlz5L.js","./assets/WhatsNew-CjIIF-CH.js","./assets/xlsx-D9UGuzH6.js","./assets/__vite-browser-external-BIHI7g3E.js","./samples/drawing_set_2_pages.pdf","./samples/sample_plan.dxf","./samples/sample_plan_rev2.dxf","./samples/section_callouts.dxf","./samples/section_with_list.dxf","./samples/section_with_list.pdf","./icons/icon-192.png","./icons/icon-32.png","./icons/icon-512-maskable.png","./icons/icon-512.png","./icons/icon.ico"]

self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(VERSION).then(async (c) => {
      await c.addAll(['./', './index.html', './manifest.webmanifest'])
      // one file that fails to load must not stop the rest, or the install
      await Promise.allSettled(PRECACHE.map((u) => c.add(u)))
    }),
  )
  self.skipWaiting()
})

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keys) => Promise.all(keys.filter((k) => k !== VERSION).map((k) => caches.delete(k)))),
  )
  self.clients.claim()
})

self.addEventListener('fetch', (e) => {
  if (e.request.method !== 'GET' || !e.request.url.startsWith(self.location.origin)) return
  e.respondWith(
    fetch(e.request)
      .then((res) => {
        const copy = res.clone()
        caches.open(VERSION).then((c) => c.put(e.request, copy))
        return res
      })
      .catch(() => caches.match(e.request).then((r) => r ?? caches.match('./index.html'))),
  )
})
