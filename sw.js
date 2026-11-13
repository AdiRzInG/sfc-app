// Offline cache: network first, falling back to the last cached copy.
// Bump VERSION to drop old caches after a release.
const VERSION = 'rebarscan-20261113201300'

// Every file of the application (scripts, styles, samples), filled in by scripts/stamp-sw.mjs after the build, so the whole of it is on the device
// after the first visit and nothing waits for the network on a site with no signal. The big optional OCR data is fetched when first used.
const PRECACHE = ["./assets/Account-DcKaVejt.js","./assets/AgentPanel-LYeTZf2M.js","./assets/AllScreens-3rZvatvK.js","./assets/AuditPrint-PoK-xSku.js","./assets/BackupPanel-CCl9o5_2.js","./assets/BarImport-D7kQS6fe.js","./assets/barimport-Ddb_Qmrx.js","./assets/browser-pZ2VzV5p.js","./assets/BufferGeometryUtils-CX12s5Cq.js","./assets/catalog-DdI7eNdu.js","./assets/classify-C_ruxGyJ.js","./assets/CloseProject--JWUOQK2.js","./assets/CorpusPicker-iCX3-S4D.js","./assets/discipline-Jp-6YMM9.js","./assets/ElectricalPanel-C7Qj9c4G.js","./assets/ElectricalPlan-CWyLjeJx.js","./assets/engine-TeXHjzwl.js","./assets/handler-BoN7Fhp6.js","./assets/HistoryPanel-B_p4Vpaj.js","./assets/html2canvas.esm-QH1iLAAe.js","./assets/index-BDE3N3Bz.css","./assets/index-ChIJXMZz.js","./assets/index-Crn4Ae5r.js","./assets/index-Qaz69FoV.js","./assets/index.es-CNDgYNqw.js","./assets/Intro-DB7nYXS2.css","./assets/Intro-DFCpgKF4.js","./assets/jspdf.es.min-DzBE575J.js","./assets/jsQR-DptgMdxR.js","./assets/Library-C5Xt_Zx1.js","./assets/MarketTab-CIBobpR-.js","./assets/MarkMap-DXnX4_18.js","./assets/MarkReview-BQRKqY94.js","./assets/markreviewDemo-R4tPwKnI.js","./assets/Model3D-7r5pRQzi.js","./assets/OfficePack-BacVLyOn.js","./assets/OrbitControls-BJG1UU-V.js","./assets/Order-CHw1Z9en.js","./assets/parseWorker-C-XSdwdH.js","./assets/pdf-C1MA50Ix.js","./assets/pdf-Cvioo_bN.js","./assets/pdf.worker.min-DEsOkvhm.js","./assets/pdf.worker.min-GB3t0DcA.mjs","./assets/planclient-DOSV6Jh1.js","./assets/PlannerAnswers-BlQph_vM.js","./assets/PriceBook-HVcNvueb.js","./assets/pricing-Cyi_tB6P.js","./assets/ProjectStatus-DPk6wNzE.js","./assets/purify.es-CAi2OJFm.js","./assets/Receive-C4_3-j_M.js","./assets/sample_plan-DYCyb6ir.js","./assets/sample_plan_rev2-CC-UuFlP.js","./assets/scanread-76mbTzG3.js","./assets/ScanReader-BKFZSOpk.js","./assets/scanrun-D_QTQG1U.js","./assets/section_callouts-BWz5q_UH.js","./assets/section_with_list-CVtepcuw.js","./assets/setups-Dcktq2A4.js","./assets/sharepage-CKi1CCVU.js","./assets/Snapshots-NUjU0qCB.js","./assets/steelTypes-CLzCt_xj.js","./assets/supplierFile-mgpgnnDn.js","./assets/Suppliers-Bx9pw-2R.js","./assets/three.module-BtCAaDxU.js","./assets/Variables-5_tYDXqT.js","./assets/WhatsNew-DP_VIkjE.js","./assets/xlsx-D9UGuzH6.js","./assets/__vite-browser-external-BIHI7g3E.js","./samples/drawing_set_2_pages.pdf","./samples/sample_plan.dxf","./samples/sample_plan_rev2.dxf","./samples/section_callouts.dxf","./samples/section_with_list.dxf","./samples/section_with_list.pdf","./icons/icon-192.png","./icons/icon-32.png","./icons/icon-512-maskable.png","./icons/icon-512.png","./icons/icon.ico"]

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
